# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.3.1](https://github.com/MicroClub-USTHB/mcoli-ui/releases/tag/v0.3.1) - 2026-09-11

### Fixed

- `init` passes `--yes` to shadcn, so the theme is actually installed instead of being skipped at a confirmation prompt while the command reported success
- `add` passes `--yes` as well, so it no longer stalls on a prompt in non-interactive shells (existing files are still left untouched)
- `add` exits with a non-zero code when a component fails, so CI and `&&` chains can see it
- `mc-progress` and `mc-slider` declare `'use client'`, so they no longer crash the build when used from a server component

## [v0.3.0](https://github.com/MicroClub-USTHB/mcoli-ui/releases/tag/v0.3.0) - 2026-09-11

### Changed

- **Breaking**: components are typed `registry:ui` instead of `registry:component`, so `add` installs to `components/ui` instead of `components`
- **Breaking**: `mc-alert-dialog`, `mc-calendar`, `mc-carousel`, `mc-dialog` and `mc-sidebar` declare `registryDependencies`, so adding them also installs the components they import

### Fixed

- Cross-component imports ship as `@/registry/ui/<name>` so the shadcn CLI rewrites them to your alias (some previously shipped a hardcoded `@/components/ui/<name>` that resolved nowhere)
- Removed stale `mc-drawer-card.json` from the served registry

### Migration

- Delete the old copies (`rm components/mc-*.tsx`), re-add the components you use, and update imports from `@/components/mc-<name>` to `@/components/ui/mc-<name>`

## [v0.2.1](https://github.com/MicroClub-USTHB/mcoli-ui/releases/tag/v0.2.1) - 2026-03-30

### Fixed

- Removed peer dependency on `@mcoli/ui` - CLI is now completely independent and can be used without the main UI package

## [v0.2.0](https://github.com/MicroClub-USTHB/mcoli-ui/releases/tag/v0.2.0) - 2026-03-30

### Added

- `list` command to show all available mcoli-ui components (fetches from registry, falls back to local registry if unavailable)
- `--help` / `-h` flags to display comprehensive help with commands, options, examples, and available themes
- CLI now shows help by default when run without arguments

### Changed

- Refactored CLI code for better readability and maintainability (organized into constants, utilities, helpers, and command handlers sections)
- Consolidated error messages and spinner patterns across commands

### Dependencies

- Removed: `chalk`, `ora`
- Added: `ansis`, `nanospinner`

## [v0.1.0](https://github.com/MicroClub-USTHB/mcoli-ui/releases/tag/v0.1.0) - 2026-03-29

### Added

- Interactive theme selection menu with visual color swatches
- `init` command to initialize mcoli-ui theme in projects (supports CLI argument and interactive selection, validates shadcn/ui dependency, automatic theme JSON injection from registry)
- `add` command to add mcoli-ui components to projects (supports multiple components, direct integration with shadcn CLI, per-component progress tracking)
- Theme preview with color swatches in terminal
- Error handling with helpful suggestions (detects missing shadcn/ui setup, validates theme names, clear usage instructions)
- Support for 5 themes: Primary (Professional blue #0006B1), Secondary (Creative purple #6A0DAD), GameDev (Fun pink & yellow #D04F99, #FACC15), Robotics (Technical blue #001EFF), IT (Clean green #34D399)

### Dependencies

- `inquirer`: Interactive command-line prompts
- `ora`: Elegant terminal spinners
- `chalk`: Terminal string styling
- `dotenv`: Environment variable loading

### Usage

```bash
# Initialize with a specific theme
npx mcoli-ui init primary

# Initialize with interactive selection
npx mcoli-ui init

# Add components
npx mcoli-ui add mc-button

# Add multiple components
npx mcoli-ui add mc-button mc-input

# List available components
npx mcoli-ui list

# Show help
npx mcoli-ui --help
```

### Registry

Components are fetched from the mcoli-ui registry (default: https://mcoli-ui.microclub.info, configurable via MCOLI_UI_REGISTRY_URL environment variable)
