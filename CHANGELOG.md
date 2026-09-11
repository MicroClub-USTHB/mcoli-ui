# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.3.0](https://github.com/MicroClub-USTHB/mcoli-ui/releases/tag/v0.3.0) - 2026-09-11

Components now install to `components/ui/` instead of `components/`, and composed components pull in the components they depend on. Both are breaking changes to where files land in your project, so this is a minor bump rather than a patch (in `0.x`, the minor slot is the breaking slot).

### Changed

- **BREAKING** — Registry items are typed `registry:ui` instead of `registry:component`, so `mcoli-ui add <component>` now writes to your `components/ui` directory (the `aliases.ui` path in `components.json`) rather than `components`. This matches what the documentation has always described, and what `shadcn/ui` itself does for its own primitives.
- **BREAKING** — `mc-alert-dialog`, `mc-calendar`, `mc-carousel`, `mc-dialog` and `mc-sidebar` now declare `registryDependencies`, so adding any of them also installs the components they import. Previously they installed alone and left an unresolvable import behind.

### Fixed

- `list` no longer depends on a single item type; it accepts both `registry:ui` and `registry:component`, so the command keeps working against registries deployed before this release.
- Cross-component imports in distributed source are now written uniformly as `@/registry/ui/<name>`, which the shadcn CLI rewrites to your configured alias on install. Previously some components shipped a hardcoded `@/components/ui/<name>` that was never rewritten and pointed at a directory nothing was installed into.
- Removed a stale `mc-drawer-card.json` from the served registry; it had no corresponding component.

### Migration

Existing files are not moved or deleted for you. If you added components with `0.2.x`, they are in `components/` and re-running `add` will place a second copy in `components/ui/`. To migrate:

```bash
rm components/mc-*.tsx          # remove the old copies
npx mcoli-ui@latest add mc-button   # re-add what you use
```

Then update imports from `@/components/mc-<name>` to `@/components/ui/mc-<name>`.

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
