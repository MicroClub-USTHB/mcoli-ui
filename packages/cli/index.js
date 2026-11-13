#!/usr/bin/env node

import { spawnSync } from 'node:child_process';
import { appendFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import ansis from 'ansis';

// Load .env from the current working directory if there is one.
// process.loadEnvFile throws when the file is missing, which is the normal case.
try {
  process.loadEnvFile();
} catch {
  // No .env file - environment variables can still be set directly.
}

// =============================================================================
// CONSTANTS
// =============================================================================

const { version: VERSION } = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8')
);

const REGISTRY_URL = (
  process.env.MCOLI_UI_REGISTRY_URL || 'https://mcoli-ui.microclub.info'
).replace(/\/+$/, '');
const NAMESPACE = '@mcoli';
const SKILL_SOURCE = 'MicroClub-USTHB/mcoli-ui';
const SKILL_NAME = 'mcoli-ui';
const DOCS_URL = 'https://mcoli-ui.microclub.info/docs';
const SHADCN_DOCS_URL = 'https://ui.shadcn.com/docs/installation';

// Pin the shadcn major so a future breaking shadcn release cannot break mcoli-ui
// without a mcoli-ui release.
const SHADCN = 'shadcn@4';

// Registry item names are lowercase kebab-case. Checking this up front keeps
// arbitrary input away from URLs and child processes.
const ITEM_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const FETCH_TIMEOUT_MS = 15_000;
const COMMANDS = ['init', 'add', 'list', 'help'];

const EXIT = { OK: 0, FAILURE: 1, USAGE: 2 };

const AGENTS_MARKER = '<!-- mcoli-ui:design -->';

// =============================================================================
// ERRORS AND OUTPUT
// =============================================================================

class CliError extends Error {
  constructor(message, { code = EXIT.FAILURE, hint } = {}) {
    super(message);
    this.code = code;
    this.hint = hint;
  }
}

const usageError = (message, hint) => new CliError(message, { code: EXIT.USAGE, hint });

const isInteractive = () => Boolean(process.stdin.isTTY && process.stdout.isTTY);

function info(message) {
  console.log(message);
}

function success(message) {
  console.log(`${ansis.green('✓')} ${message}`);
}

function warn(message) {
  console.error(`${ansis.yellow('warning:')} ${message}`);
}

// Spinners only make sense on a terminal: they would garble piped output and logs.
function spinner(text) {
  if (!process.stderr.isTTY) {
    return { success: () => {}, error: () => {}, stop: () => {} };
  }
  return createSpinner(text, { stream: process.stderr }).start();
}

// =============================================================================
// UTILITIES
// =============================================================================

function levenshtein(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}

function suggest(input, candidates) {
  let best;
  let bestDistance = Infinity;
  for (const candidate of candidates) {
    const distance = levenshtein(input, candidate);
    if (distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  if (best && bestDistance <= Math.max(2, Math.floor(input.length / 3))) return best;
  return candidates.find((candidate) => candidate.includes(input) || input.includes(candidate));
}

function swatch(colors = []) {
  return colors.map((hex) => ansis.bgHex(hex)('  ')).join('');
}

function itemUrl(name) {
  return `${REGISTRY_URL}/r/${name}.json`;
}

// Run the package runner the user invoked mcoli-ui with (pnpm dlx, bunx, ...).
function packageRunner() {
  const agent = process.env.npm_config_user_agent ?? '';
  if (agent.startsWith('pnpm/')) return ['pnpm', ['dlx']];
  if (agent.startsWith('bun/')) return ['bunx', []];
  return ['npx', ['--yes']];
}

// Arguments are passed as an array, so no shell parses them. Windows needs a
// shell to start .cmd shims; item names are validated against ITEM_NAME before
// they reach this point.
function run(command, args) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  });
  if (result.error) {
    throw new CliError(`Could not start ${command}: ${result.error.message}`);
  }
  return result.status ?? EXIT.FAILURE;
}

function runPackage(pkg, args) {
  const [command, runnerArgs] = packageRunner();
  return run(command, [...runnerArgs, pkg, ...args]);
}

function shadcn(args, cwd) {
  return runPackage(SHADCN, [...args, '--cwd', cwd]);
}

// =============================================================================
// REGISTRY
// =============================================================================

async function fetchRegistry() {
  const url = `${REGISTRY_URL}/r/registry.json`;
  const progress = spinner('Fetching the mcoli-ui registry...');
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    if (!response.ok) {
      throw new Error(
        `HTTP ${response.status}${response.statusText ? ` ${response.statusText}` : ''}`
      );
    }
    const data = await response.json();
    progress.stop();
    return data.items ?? [];
  } catch (error) {
    progress.error({ text: 'Could not fetch the mcoli-ui registry' });
    const reason = error?.name === 'TimeoutError' ? 'request timed out' : error.message;
    throw new CliError(`Could not fetch ${url} (${reason})`, {
      hint: 'Check your network connection, or set MCOLI_UI_REGISTRY_URL to a reachable registry.',
    });
  }
}

const byType = (items, type) => items.filter((item) => item.type === type);

function findItems(items, names, type, label) {
  const available = byType(items, type).map((item) => item.name);
  for (const name of names) {
    if (!ITEM_NAME.test(name)) {
      throw usageError(
        `Invalid ${label} name "${name}"`,
        'Names use lowercase letters, digits and hyphens.'
      );
    }
    if (!available.includes(name)) {
      const guess = suggest(name, available);
      throw usageError(
        `Unknown ${label} "${name}"`,
        guess
          ? `Did you mean "${guess}"? Run \`mcoli-ui list\` to see all.`
          : 'Run `mcoli-ui list` to see all.'
      );
    }
  }
}

// =============================================================================
// PROJECT
// =============================================================================

function requireShadcn(cwd) {
  const componentsJson = join(cwd, 'components.json');
  if (!existsSync(componentsJson)) {
    throw new CliError(`shadcn/ui is not initialized in ${cwd} (no components.json).`, {
      hint: `Run \`npx shadcn@latest init\` first. See ${SHADCN_DOCS_URL}`,
    });
  }
  return componentsJson;
}

function hasNamespace(componentsJson) {
  try {
    const config = JSON.parse(readFileSync(componentsJson, 'utf8'));
    return Boolean(config.registries?.[NAMESPACE]);
  } catch {
    return false;
  }
}

// Point existing agent instructions at DESIGN.md. Writes to AGENTS.md, or to
// CLAUDE.md when that is the only instructions file, and creates AGENTS.md
// when there is none. Running it again changes nothing.
function linkAgentInstructions(cwd, themeTitle, dryRun) {
  const agents = join(cwd, 'AGENTS.md');
  const claude = join(cwd, 'CLAUDE.md');
  const target = existsSync(agents) || !existsSync(claude) ? agents : claude;
  const name = target === agents ? 'AGENTS.md' : 'CLAUDE.md';

  if (existsSync(target) && readFileSync(target, 'utf8').includes(AGENTS_MARKER)) {
    info(`${name} already points to DESIGN.md`);
    return;
  }

  const block = [
    AGENTS_MARKER,
    '## Design system',
    '',
    `This project uses the mcoli-ui ${themeTitle} theme. Read \`DESIGN.md\` before building or styling UI, and follow its tokens and rules.`,
    '',
  ].join('\n');

  if (dryRun) {
    info(`Would add a DESIGN.md pointer to ${name}`);
    return;
  }

  if (existsSync(target)) {
    const current = readFileSync(target, 'utf8');
    appendFileSync(target, `${current.endsWith('\n') ? '\n' : '\n\n'}${block}`);
  } else {
    writeFileSync(target, `# Agent instructions\n\n${block}`);
  }
  success(`Added a DESIGN.md pointer to ${name}`);
}

// =============================================================================
// PROMPTS
// =============================================================================

async function promptTheme(themes) {
  const width = Math.max(...themes.map((theme) => (theme.title ?? theme.name).length));
  const { theme } = await inquirer.prompt([
    {
      type: 'select',
      name: 'theme',
      message: 'Select an mcoli-ui theme:',
      loop: false,
      choices: themes.map((theme) => ({
        name: `${(theme.title ?? theme.name).padEnd(width)}  ${swatch(theme.meta?.colors)}  ${theme.description ?? ''}`,
        value: theme.name,
        short: theme.title ?? theme.name,
      })),
    },
  ]);
  return theme;
}

async function confirm(message, defaultValue = true) {
  const { answer } = await inquirer.prompt([
    { type: 'confirm', name: 'answer', message, default: defaultValue },
  ]);
  return answer;
}

// =============================================================================
// COMMANDS
// =============================================================================

const COMMON_OPTIONS = {
  cwd: { type: 'string', short: 'c' },
  help: { type: 'boolean', short: 'h' },
};

const COMMAND_OPTIONS = {
  init: {
    ...COMMON_OPTIONS,
    theme: { type: 'string', short: 't' },
    yes: { type: 'boolean', short: 'y' },
    input: { type: 'boolean', default: true },
    design: { type: 'boolean', default: true },
    overwrite: { type: 'boolean', short: 'o' },
    agents: { type: 'boolean' },
    skill: { type: 'boolean' },
    'dry-run': { type: 'boolean' },
  },
  add: {
    ...COMMON_OPTIONS,
    overwrite: { type: 'boolean', short: 'o' },
    'dry-run': { type: 'boolean' },
  },
  list: {
    help: { type: 'boolean', short: 'h' },
    json: { type: 'boolean' },
  },
};

async function handleInit(values, positionals) {
  if (positionals.length > 1) {
    throw usageError(
      `Too many arguments: ${positionals.join(' ')}`,
      'Usage: mcoli-ui init [theme] [options]'
    );
  }
  const requested = values.theme ?? positionals[0];
  if (values.theme && positionals[0] && values.theme !== positionals[0]) {
    throw usageError(`Conflicting themes "${positionals[0]}" and --theme "${values.theme}"`);
  }

  const cwd = resolve(values.cwd ?? '.');
  const componentsJson = requireShadcn(cwd);
  const dryRun = Boolean(values['dry-run']);
  const canPrompt = isInteractive() && values.input && !values.yes;

  const items = await fetchRegistry();
  const themes = byType(items, 'registry:theme');
  const themeNames = themes.map((theme) => theme.name);

  let themeName = requested?.toLowerCase();
  if (themeName) {
    findItems(items, [themeName], 'registry:theme', 'theme');
  } else if (canPrompt) {
    themeName = await promptTheme(themes);
  } else {
    throw usageError(
      'No theme given and prompts are disabled',
      `Pass one: mcoli-ui init --theme <${themeNames.join('|')}>`
    );
  }
  const theme = themes.find((item) => item.name === themeName);
  const themeTitle = theme.title ?? theme.name;

  const urls = [itemUrl(themeName)];

  // DESIGN.md
  const designItem = `design-${themeName}`;
  const designPath = join(cwd, 'DESIGN.md');
  let writeDesign = values.design;
  if (writeDesign && !items.some((item) => item.name === designItem)) {
    warn(`This registry has no DESIGN.md for the ${themeTitle} theme yet. Skipping it.`);
    writeDesign = false;
  }
  if (writeDesign && existsSync(designPath) && !values.overwrite) {
    const current = readFileSync(designPath, 'utf8').match(/^name: ["']mcoli-ui (.+)["']$/m)?.[1];
    warn(
      current && current !== themeTitle
        ? `DESIGN.md describes the ${current} theme, not ${themeTitle}, and was kept. Pass --overwrite to regenerate it.`
        : 'DESIGN.md already exists and was kept. Pass --overwrite to replace it.'
    );
    writeDesign = false;
  }
  if (writeDesign && canPrompt) {
    writeDesign = await confirm('Write a DESIGN.md that describes this theme to coding agents?');
  }
  if (writeDesign) urls.push(itemUrl(designItem));

  // Register the @mcoli namespace so `shadcn add @mcoli/<item>` works too.
  if (!hasNamespace(componentsJson)) {
    if (dryRun) {
      info(`Would register ${NAMESPACE} in components.json`);
    } else {
      const status = shadcn(['registry', 'add', `${NAMESPACE}=${REGISTRY_URL}/r/{name}.json`], cwd);
      if (status !== 0) {
        warn(`Could not register ${NAMESPACE} in components.json. \`mcoli-ui add\` still works.`);
      }
    }
  }

  const args = ['add', ...urls, '--yes'];
  if (values.overwrite) args.push('--overwrite');
  if (dryRun) args.push('--dry-run');
  if (shadcn(args, cwd) !== 0) {
    throw new CliError(`Failed to add the ${themeTitle} theme`, {
      hint: 'See the shadcn output above for the cause.',
    });
  }

  if (values.agents) {
    if (writeDesign || existsSync(designPath)) {
      linkAgentInstructions(cwd, themeTitle, dryRun);
    } else {
      warn('Skipped --agents because the project has no DESIGN.md.');
    }
  }

  if (values.skill) {
    if (dryRun) {
      info(`Would install the ${SKILL_NAME} agent skill from ${SKILL_SOURCE}`);
    } else {
      const skillArgs = ['add', SKILL_SOURCE, '--skill', SKILL_NAME];
      if (!canPrompt) skillArgs.push('--yes');
      if (runPackage('skills', skillArgs) !== 0) {
        throw new CliError('Failed to install the mcoli-ui agent skill', {
          hint: `Install it later with: npx skills add ${SKILL_SOURCE} --skill ${SKILL_NAME}`,
        });
      }
    }
  }

  if (dryRun) {
    info(`\nDry run: nothing was written.`);
    return;
  }

  info('');
  success(
    `mcoli-ui is set up with the ${ansis.cyan(themeTitle)} theme${writeDesign ? ' and DESIGN.md' : ''}`
  );
  info(
    `\nNext: ${ansis.cyan('npx mcoli-ui add mc-button')}  ${ansis.gray(`or  npx shadcn@latest add ${NAMESPACE}/mc-button`)}`
  );
}

async function handleAdd(values, positionals) {
  const names = positionals.map((name) => name.trim()).filter(Boolean);
  if (names.length === 0) {
    throw usageError(
      'No components given',
      'Usage: mcoli-ui add <component...>   e.g. mcoli-ui add mc-button'
    );
  }

  const cwd = resolve(values.cwd ?? '.');
  requireShadcn(cwd);

  const items = await fetchRegistry();
  findItems(items, names, 'registry:ui', 'component');

  // One shadcn call for all components: one install step and one dependency resolution.
  const args = ['add', ...names.map(itemUrl), '--yes'];
  if (values.overwrite) args.push('--overwrite');
  if (values['dry-run']) args.push('--dry-run');
  if (shadcn(args, cwd) !== 0) {
    throw new CliError(`Failed to add ${names.join(', ')}`, {
      hint: 'See the shadcn output above for the cause.',
    });
  }
  if (!values['dry-run']) success(`Added ${names.map((name) => ansis.cyan(name)).join(', ')}`);
}

async function handleList(values, positionals) {
  if (positionals.length > 0) {
    throw usageError(`Unexpected argument: ${positionals[0]}`, 'Usage: mcoli-ui list [--json]');
  }

  const items = await fetchRegistry();
  const themes = byType(items, 'registry:theme').map(({ name, title, description }) => ({
    name,
    title,
    description,
  }));
  const fonts = byType(items, 'registry:font').map(({ name, font }) => ({
    name,
    family: font?.family,
    variable: font?.variable,
  }));
  const components = byType(items, 'registry:ui').map(({ name, title, description }) => ({
    name,
    title,
    description,
  }));

  if (values.json) {
    process.stdout.write(
      `${JSON.stringify({ registry: REGISTRY_URL, themes, fonts, components }, null, 2)}\n`
    );
    return;
  }

  const section = (heading, rows) => {
    if (rows.length === 0) return;
    const width = Math.max(...rows.map(([name]) => name.length));
    info(`\n${ansis.bold(heading)}\n`);
    for (const [name, detail] of rows) info(`  ${ansis.cyan(name.padEnd(width))}  ${detail ?? ''}`);
  };

  section(
    'Themes',
    themes.map((theme) => [theme.name, theme.description])
  );
  section(
    'Fonts',
    fonts.map((font) => [font.name, font.family])
  );
  section(
    'Components',
    components.map((component) => [component.name, component.description])
  );
  info(
    `\n${ansis.gray('Use:')} mcoli-ui init --theme <theme>   ${ansis.gray('|')}   mcoli-ui add <component...>\n`
  );
}

// =============================================================================
// HELP
// =============================================================================

const HELP = {
  main: () => `${ansis.bold('mcoli-ui')} ${VERSION} - add Micro Club UI themes and components to a shadcn/ui project

${ansis.bold('Usage')}
  npx mcoli-ui <command> [options]

${ansis.bold('Examples')}
  npx mcoli-ui init                          ${ansis.gray('# pick a theme, write DESIGN.md')}
  npx mcoli-ui init --theme game-dev --yes   ${ansis.gray('# no prompts (CI, agents)')}
  npx mcoli-ui add mc-button mc-input        ${ansis.gray('# add components')}
  npx mcoli-ui list --json                   ${ansis.gray('# machine-readable list')}

${ansis.bold('Commands')}
  init [theme]          Install a theme, DESIGN.md and the ${NAMESPACE} namespace
  add <component...>    Add one or more components
  list                  List themes, fonts and components
  help [command]        Show help for a command

${ansis.bold('Options')}
  -h, --help            Show help
  -v, --version         Show the version
  --no-color            Disable colors (NO_COLOR is honored too)

${ansis.bold('Environment')}
  MCOLI_UI_REGISTRY_URL Registry to use (default: https://mcoli-ui.microclub.info)

Docs: ${DOCS_URL}`,

  init: () => `${ansis.bold('Usage')}
  npx mcoli-ui init [theme] [options]

Installs an mcoli-ui theme, writes a DESIGN.md that describes it to coding
agents, and registers the ${NAMESPACE} namespace in components.json.

${ansis.bold('Examples')}
  npx mcoli-ui init
  npx mcoli-ui init --theme robotics --yes
  npx mcoli-ui init --theme it --overwrite --agents --skill
  npx mcoli-ui init --theme primary --dry-run

${ansis.bold('Options')}
  -t, --theme <name>    primary, secondary, game-dev, robotics or it
  -y, --yes             Accept defaults, never prompt
  --no-input            Never prompt; fail if a required value is missing
  --no-design           Do not write DESIGN.md
  -o, --overwrite       Replace an existing DESIGN.md and existing files
  --agents              Point AGENTS.md (or CLAUDE.md) at DESIGN.md
  --skill               Install the mcoli-ui agent skill (via npx skills)
  --dry-run             Show what would change without writing files
  -c, --cwd <dir>       Project directory (default: current directory)`,

  add: () => `${ansis.bold('Usage')}
  npx mcoli-ui add <component...> [options]

${ansis.bold('Examples')}
  npx mcoli-ui add mc-button
  npx mcoli-ui add mc-button mc-input mc-card
  npx mcoli-ui add mc-dialog --dry-run

${ansis.bold('Options')}
  -o, --overwrite       Replace existing files
  --dry-run             Show what would change without writing files
  -c, --cwd <dir>       Project directory (default: current directory)`,

  list: () => `${ansis.bold('Usage')}
  npx mcoli-ui list [--json]

${ansis.bold('Options')}
  --json                Print stable JSON: { registry, themes, fonts, components }`,
};

// =============================================================================
// MAIN
// =============================================================================

const HANDLERS = { init: handleInit, add: handleAdd, list: handleList };

async function main(argv) {
  // --no-color / --color are read by ansis itself; strip them before parsing.
  const args = argv.filter((arg) => arg !== '--no-color' && arg !== '--color');
  const [first, ...rest] = args;

  if (first === undefined || first === '-h' || first === '--help') {
    info(HELP.main());
    return;
  }
  if (first === '-v' || first === '--version') {
    info(VERSION);
    return;
  }
  if (first === 'help') {
    const topic = rest[0];
    if (topic && !HELP[topic]) throw usageError(`Unknown command "${topic}"`);
    info((HELP[topic] ?? HELP.main)());
    return;
  }
  if (!HANDLERS[first]) {
    const guess = first.startsWith('-') ? undefined : suggest(first, COMMANDS);
    throw usageError(
      `Unknown ${first.startsWith('-') ? 'option' : 'command'} "${first}"`,
      guess
        ? `Did you mean \`mcoli-ui ${guess}\`? Run \`mcoli-ui --help\` for usage.`
        : 'Run `mcoli-ui --help` for usage.'
    );
  }

  let parsed;
  try {
    parsed = parseArgs({
      args: rest,
      options: COMMAND_OPTIONS[first],
      allowPositionals: true,
      allowNegative: true,
      strict: true,
    });
  } catch (error) {
    const unknown =
      error.code === 'ERR_PARSE_ARGS_UNKNOWN_OPTION' && error.message.match(/'(-[^']*)'/)?.[1];
    if (unknown) {
      const options = Object.keys(COMMAND_OPTIONS[first]).map((name) => `--${name}`);
      const guess = suggest(unknown.replace(/=.*/, ''), options);
      throw usageError(
        `Unknown option "${unknown}"`,
        guess
          ? `Did you mean \`${guess}\`? Run \`mcoli-ui help ${first}\` for usage.`
          : `Run \`mcoli-ui help ${first}\` for usage.`
      );
    }
    throw usageError(error.message, `Run \`mcoli-ui help ${first}\` for usage.`);
  }

  if (parsed.values.help) {
    info(HELP[first]());
    return;
  }
  await HANDLERS[first](parsed.values, parsed.positionals);
}

try {
  await main(process.argv.slice(2));
} catch (error) {
  // Ctrl-C inside a prompt.
  if (error?.name === 'ExitPromptError') {
    process.exit(130);
  }
  if (error instanceof CliError) {
    console.error(`${ansis.red('error:')} ${error.message}`);
    if (error.hint) console.error(`  ${error.hint}`);
    process.exit(error.code);
  }
  console.error(`${ansis.red('error:')} ${error?.stack ?? error}`);
  console.error(`  Please report this at https://github.com/${SKILL_SOURCE}/issues`);
  process.exit(EXIT.FAILURE);
}
