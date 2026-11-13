# mcoli-ui CLI

Add [mcoli-ui](https://mcoli-ui.microclub.info) themes and components to a shadcn/ui project.

## Requirements

- Node.js 20.17 or later
- [shadcn/ui](https://ui.shadcn.com) initialized in your project (`npx shadcn@latest init`)

## Usage

### Initialize a theme

```bash
npx mcoli-ui init
```

Pick a theme interactively. `init` then:

- installs the theme's CSS variables and fonts through shadcn
- writes a `DESIGN.md` that describes the theme to coding agents
- registers the `@mcoli` namespace in `components.json`

Pass the theme to skip the prompt. Add `--yes` in CI or from an agent so the command never prompts:

```bash
npx mcoli-ui init --theme game-dev --yes
```

Themes: `primary`, `secondary`, `game-dev`, `robotics`, `it`. The old form `npx mcoli-ui init primary` still works.

| Option               | Description                                         |
| -------------------- | --------------------------------------------------- |
| `-t, --theme <name>` | Theme to install                                    |
| `-y, --yes`          | Accept defaults and never prompt                    |
| `--no-input`         | Never prompt; fail if a required value is missing   |
| `--no-design`        | Do not write `DESIGN.md`                            |
| `-o, --overwrite`    | Replace an existing `DESIGN.md` and existing files  |
| `--agents`           | Point `AGENTS.md` (or `CLAUDE.md`) at `DESIGN.md`   |
| `--skill`            | Install the mcoli-ui agent skill (via `npx skills`) |
| `--dry-run`          | Show what would change without writing files        |
| `-c, --cwd <dir>`    | Project directory (default: current directory)      |

### Add components

```bash
npx mcoli-ui add mc-button
npx mcoli-ui add mc-button mc-input mc-card
npx mcoli-ui add mc-dialog --dry-run
```

`add` accepts `--overwrite`, `--dry-run` and `--cwd`. After `init`, plain shadcn works too:

```bash
npx shadcn@latest add @mcoli/mc-button
```

### List themes and components

```bash
npx mcoli-ui list
npx mcoli-ui list --json
```

`--json` prints a stable `{ registry, themes, fonts, components }` object for scripts and agents.

### Help and version

```bash
npx mcoli-ui --help
npx mcoli-ui help init
npx mcoli-ui --version
```

## DESIGN.md

`DESIGN.md` follows the [DESIGN.md format](https://github.com/google-labs-code/design.md): YAML tokens (colors for light and dark mode, typography, radii, spacing, component variants) followed by prose that explains when to use them. It is generated from the same values as the theme CSS, so it always matches the installed theme. Re-run `init --theme <name> --overwrite` to regenerate it.

## Agent skill

```bash
npx skills add MicroClub-USTHB/mcoli-ui --skill mcoli-ui
```

The skill teaches coding agents to read `DESIGN.md`, prefer `mc-*` components and use the theme's semantic tokens.

## Exit codes

| Code | Meaning                                       |
| ---- | --------------------------------------------- |
| 0    | Success                                       |
| 1    | Failure (network, registry or shadcn error)   |
| 2    | Usage error (unknown command, option or name) |
| 130  | Cancelled with Ctrl-C                         |

## Environment variables

- `MCOLI_UI_REGISTRY_URL`: registry to use (default: `https://mcoli-ui.microclub.info`)
- `NO_COLOR`: disable colors (or pass `--no-color`)

## License

MIT
