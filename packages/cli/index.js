#!/usr/bin/env node

import { config } from "dotenv";
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import ansis from "ansis";

config({ quiet: true });

// =============================================================================
// CONSTANTS
// =============================================================================

const REGISTRY_URL = process.env.MCOLI_UI_REGISTRY_URL || "https://mcoli-ui.microclub.info";

const THEMES = [
  {
    name: "Primary",
    value: "primary",
    description: "Professional and modern",
    colors: ["#0006B1", "#E6E9FF"],
  },
  {
    name: "Secondary",
    value: "secondary",
    description: "Creative and bold",
    colors: ["#6A0DAD", "#FDDDFF"],
  },
  {
    name: "GameDev",
    value: "game-dev",
    description: "Fun and energetic",
    colors: ["#D04F99", "#FACC15"],
  },
  {
    name: "Robotics",
    value: "robotics",
    description: "Technical and precise",
    colors: ["#001EFF", "#0006B1"],
  },
  {
    name: "IT",
    value: "it",
    description: "Clean and professional",
    colors: ["#34D399", "#BEFFD4"],
  },
];

const VALID_THEMES = THEMES.map((t) => t.value);
const SHADCN_DOCS_URL = "https://ui.shadcn.com/docs/installation";

// =============================================================================
// UTILITIES
// =============================================================================

function createColorSwatch(hexColors) {
  return hexColors.map((hex) => ansis.bgHex(hex)("  ")).join("");
}

function logError(message) {
  console.error(`${ansis.red("Error:")} ${message}`);
}

function logSuccess(message) {
  console.log(`${ansis.green("✓")} ${message}`);
}

function checkShadcnInitialized() {
  const componentsJsonPath = join(process.cwd(), "components.json");

  if (!existsSync(componentsJsonPath)) {
    logError(`${ansis.bold("shadcn/ui")} is required but not initialized.`);
    console.log("\nPlease initialize shadcn/ui first:");
    console.log(`  ${ansis.cyan("npx shadcn@latest init")}\n`);
    console.log(`For more information, visit: ${ansis.underline(SHADCN_DOCS_URL)}`);
    process.exit(1);
  }

  return componentsJsonPath;
}

// =============================================================================
// HELPERS
// =============================================================================

async function promptThemeSelection() {
  const choices = THEMES.map((theme, index) => ({
    name: `${index + 1}. ${theme.name.padEnd(10)} ${createColorSwatch(theme.colors)}  ${theme.description}`,
    value: theme.value,
    short: theme.name,
  }));

  const answer = await inquirer.prompt([
    {
      type: "select",
      name: "theme",
      message: "Select an mcoli-ui theme:",
      choices,
      default: "primary",
      loop: false,
    },
  ]);

  return answer.theme;
}

function showHelp() {
  console.log(`${ansis.bold("Usage:")} npx mcoli-ui <command> ${ansis.gray("[options]")}`);
  console.log();
  console.log(`${ansis.bold("Commands:")}`);
  console.log(`  ${ansis.cyan("init")} [theme]     ${ansis.gray("Initialize mcoli-ui theme (requires shadcn/ui)")}`);
  console.log(`  ${ansis.cyan("add")} <component>  ${ansis.gray("Add mcoli-ui component(s) to your project)")}`);
  console.log(`  ${ansis.cyan("list")}             ${ansis.gray("List all available mcoli-ui components")}`);
  console.log();
  console.log(`${ansis.bold("Options:")}`);
  console.log(`  ${ansis.cyan("--help")}, -h        ${ansis.gray("Show this help message")}`);
  console.log();
  console.log(`${ansis.bold("Examples:")}`);
  console.log(`  ${ansis.gray("# Initialize with a specific theme")}`);
  console.log(`  npx mcoli-ui init primary`);
  console.log();
  console.log(`  ${ansis.gray("# Add a component")}`);
  console.log(`  npx mcoli-ui add mc-button`);
  console.log();
  console.log(`  ${ansis.gray("# Add multiple components")}`);
  console.log(`  npx mcoli-ui add mc-button mc-input`);
  console.log();
  console.log(`  ${ansis.gray("# List available components")}`);
  console.log(`  npx mcoli-ui list`);
  console.log();
  console.log(`${ansis.bold("Available themes:")}`);
  THEMES.forEach((theme) => {
    console.log(`  ${ansis.cyan(theme.value.padEnd(12))} ${theme.description}`);
  });
  console.log();
  console.log(`Registry URL: ${ansis.gray(REGISTRY_URL)}`);
}

function showAvailableThemes() {
  console.log("\nAvailable themes:");
  THEMES.forEach((theme, index) => {
    console.log(
      `  ${ansis.cyan(String(index + 1).padStart(2) + ".")} ${ansis.bold(theme.name.padEnd(12))} ${createColorSwatch(theme.colors)}  ${theme.description}`,
    );
  });
  console.log("\nOr run without arguments for interactive selection.");
}

// =============================================================================
// COMMAND HANDLERS
// =============================================================================

function handleInit(themeArgs) {
  checkShadcnInitialized();

  const spinner = createSpinner(`${ansis.green("✓")} shadcn/ui found, proceeding with mcoli-ui theme...`).start();
  spinner.success({ text: "shadcn/ui configuration detected" });

  const selectedTheme = themeArgs[0]?.toLowerCase();

  // Theme provided as argument
  if (selectedTheme && VALID_THEMES.includes(selectedTheme)) {
    const theme = THEMES.find((t) => t.value === selectedTheme);
    const themeName = theme?.name || selectedTheme;
    spinner.info({ text: `Theme selected: ${ansis.cyan(themeName)}` });
    addTheme(selectedTheme, themeName);
    return;
  }

  // Invalid theme provided
  if (selectedTheme && !VALID_THEMES.includes(selectedTheme)) {
    logError(`Invalid theme "${ansis.bold(selectedTheme)}"`);
    showAvailableThemes();
    process.exit(1);
  }

  // No theme provided - interactive mode
  promptThemeSelection()
    .then((selectedTheme) => {
      const theme = THEMES.find((t) => t.value === selectedTheme);
      const themeName = theme?.name || selectedTheme;
      addTheme(selectedTheme, themeName);
    })
    .catch((error) => {
      console.error("Error during theme selection:", error);
      process.exit(1);
    });
}

function addTheme(themeValue, themeName) {
  const spinner = createSpinner(`Adding ${ansis.yellow(themeName)} mcoli-ui theme...`).start();

  try {
    execSync(`npx shadcn@latest add ${REGISTRY_URL}/r/${themeValue}.json`, {
      stdio: "inherit",
    });
    spinner.success({
      text: `Successfully added ${ansis.green(themeName)} mcoli-ui theme`,
    });
  } catch (error) {
    spinner.error({ text: `Failed to add ${ansis.red(themeName)} theme` });
    console.error(`Error adding ${themeName} theme:`, error);
    process.exit(1);
  }

  const completeSpinner = createSpinner("Finalizing mcoli-ui setup...").start();
  completeSpinner.success({ text: "mcoli-ui theme setup complete!" });
}

function handleAdd(componentNames) {
  checkShadcnInitialized();

  if (componentNames.length === 0) {
    console.log("Usage: npx mcoli-ui add [...packages]");
    process.exit(1);
  }

  for (const componentName of componentNames) {
    if (!componentName.trim()) continue;

    const spinner = createSpinner(`Adding ${ansis.yellow(componentName)} mcoli-ui component...`).start();

    try {
      const url = new URL(`r/${componentName}.json`, REGISTRY_URL);
      execSync(`npx shadcn@latest add ${url.toString()}`, {
        stdio: "inherit",
      });
      spinner.success({
        text: `Successfully added ${ansis.green(componentName)} component`,
      });
    } catch (error) {
      spinner.error({
        text: `Failed to add ${ansis.red(componentName)} component`,
      });
      console.error(
        `Error adding ${ansis.red(componentName)}:`,
        error instanceof Error ? error.message : String(error),
      );
    }
  }
}

async function handleList() {
  const spinner = createSpinner("Fetching registry...").start();

  try {
    const registryUrl = new URL("r/registry.json", REGISTRY_URL);
    const response = await fetch(registryUrl.toString());

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();
    spinner.stop();

    displayRegistry(data);
  } catch (error) {
    spinner.error({ text: `Failed to fetch registry: ${error.message}` });
    showListError();
  }
}

function displayRegistry(data) {
  const items = data.items || [];

  const themes = items.filter((item) => item.type === "registry:theme");
  const fonts = items.filter((item) => item.type === "registry:font");
  const components = items.filter((item) => item.type === "registry:component");

  if (themes.length > 0) {
    console.log();
    console.log(`${ansis.bold("Available themes:")}`);
    console.log();

    const maxNameLength = Math.max(...themes.map((t) => (t.title || t.name).length), 12);

    themes.forEach((theme) => {
      const name = theme.title || theme.name;
      console.log(`  ${ansis.cyan(name.padEnd(maxNameLength))}  ${theme.description || ""}`);
    });
  }

  if (fonts.length > 0) {
    console.log();
    console.log(`${ansis.bold("Available fonts:")}`);
    console.log();

    const maxNameLength = Math.max(...fonts.map((f) => (f.font?.family || f.name).length), 8);

    fonts.forEach((font) => {
      const name = font.font?.family || font.name;
      console.log(`  ${ansis.cyan(name.padEnd(maxNameLength))}  ${font.font?.variable || ""}`);
    });
  }

  if (components.length > 0) {
    console.log();
    console.log(`${ansis.bold("Available components:")}`);
    console.log();

    const maxNameLength = Math.max(...components.map((c) => c.name.length), 12);

    components.forEach((comp) => {
      console.log(`  ${ansis.cyan(comp.name.padEnd(maxNameLength))}  ${comp.description || ""}`);
    });
  }

  console.log();
  console.log(`${ansis.bold("Usage:")}`);
  console.log(`  ${ansis.gray("Initialize a theme:")} npx mcoli-ui init <theme>`);
  console.log(`  ${ansis.gray("Add a component:")} npx mcoli-ui add <component>`);
  console.log();
}

function showListError() {
  console.log(`${ansis.red("Error:")} Could not fetch component list from registry`);
  console.log(`  ${ansis.gray("Registry URL:")} ${REGISTRY_URL}`);
  console.log();
  console.log(`${ansis.yellow("Note:")} Registry may not be deployed or accessible.`);
  console.log(`  ${ansis.gray("You can manually add components using:")} npx mcoli-ui add <component-name>`);
  process.exit(1);
}

// =============================================================================
// MAIN
// =============================================================================

const args = process.argv.slice(2);

// Show help if no args or help flag
if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  showHelp();
  process.exit(0);
}

const command = args[0];

switch (command) {
  case "init":
    handleInit(args.slice(1));
    break;
  case "add":
    handleAdd(args.slice(1));
    break;
  case "list":
    handleList();
    break;
  default:
    console.log(`${ansis.red("Error:")} Unknown command: ${ansis.bold(command)}`);
    console.log();
    showHelp();
    process.exit(1);
}
