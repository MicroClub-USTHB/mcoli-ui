# Contributing to mcoli-ui

This guide covers how to add a new registry item (component, hook, or theme) to the MicroClub registry.

## Our Priority

**At this stage, our focus is explicitly on implementing remaining planned registry items (components).** We ask that you prioritize these before proposing other features or architectural changes.

## How to Run

```bash
# Install dependencies
pnpm install

# Run development server (Next.js docs site)
pnpm run dev

# Run Storybook for component development
pnpm run storybook

# Build the registry (required before submitting PR)
pnpm run build:registry

# Format code (required before submitting PR)
pnpm run format

# Check code formatting
pnpm run format:check
```

## Commit Conventions

We use **Conventional Commits** for all commit messages. This enables automated changelog generation and semantic versioning.

### Format

```
<type>[optional scope]: <description>

[optional body]
```

### Types

| Type       | Description                                                                    |
| ---------- | ------------------------------------------------------------------------------ |
| `feat`     | A new feature                                                                  |
| `fix`      | A bug fix                                                                      |
| `docs`     | Documentation only changes                                                     |
| `style`    | Changes that don't affect code meaning (formatting, missing semi-colons, etc.) |
| `refactor` | Code change that neither fixes a bug nor adds a feature                        |
| `perf`     | A code change that improves performance                                        |
| `test`     | Adding or correcting tests                                                     |
| `chore`    | Changes to build process, dependencies, or auxiliary tools                     |
| `ci`       | Changes to CI configuration files and scripts                                  |

### Breaking Changes

Add `!` after type/scope or include `BREAKING CHANGE:` in footer:

```
feat!: remove legacy API

BREAKING CHANGE: The old API endpoint has been removed.
```

### Examples

```bash
git commit -m "feat: add mc-button component"
git commit -m "fix: resolve input focus issue"
git commit -m "docs: update mc-button documentation"
git commit -m "refactor: simplify button styles"
```

## Testing CLI Locally

```bash
# First, run the dev server
pnpm run dev

# In another terminal, test CLI commands
pnpm cli:dev init primary
pnpm cli:dev add mc-button
pnpm cli:dev list
```

## Choosing Your Path

- **[Internal Contributors](#internal-contributors)**: You have push access to the repository.
- **[External Contributors](#external-contributors)**: You are an open-source contributor. Fork the repository first, then follow the external guide.

---

# Internal Contributors

If you have push access to the repository, follow these steps.

## Workflow

1. Find an issue labeled with `component` that includes a Figma link
2. Create a branch from `dev` (naming: `component/mc-<name>`)
3. Implement the item (e.g., component using `@base-ui/react` primitives)
4. Create stories, examples, and documentation
5. Test with Storybook and verify registry build (`pnpm run build:registry`)
6. Create a pull request targeting `dev`

## Step-by-Step

### Step 1: Find an Issue

Browse the GitHub issues to find an item to implement. Each issue includes a Figma link with the design specifications. **Please stick to these designs to maintain MicroClub's identity.**

### Step 2: Create a Branch

```bash
git switch dev
git pull origin dev
git switch -c component/mc-<name>
```

Example: `git switch -c component/mc-button`

### Step 3: Create the Registry Item

Create your component file in `packages/web/registry/ui/mc-<name>.tsx`.

- Prefix with `mc-` (e.g., `mc-button.tsx`)
- Use `@base-ui/react` primitives for high-quality, accessible building blocks
- Utilize Tailwind CSS v4 for styling

Example file: [`packages/web/registry/ui/mc-button.tsx`](packages/web/registry/ui/mc-button.tsx)

### Step 4: Register the Item

Edit [`packages/web/registry/registry-ui.ts`](packages/web/registry/registry-ui.ts) and add your entry. This metadata allows the shadcn-based CLI to discover and distribute your code.

### Step 5: Add to Registry Examples

Edit [`packages/web/registry/registry-examples.ts`](packages/web/registry/registry-examples.ts) and add your example to the `examples` array. This links the demo to the registry.

### Step 6: Create Demo

Create a demo for the documentation in `packages/web/registry/examples/mc-<name>-demo.tsx`.

Example file: [`packages/web/registry/examples/mc-button-demo.tsx`](packages/web/registry/examples/mc-button-demo.tsx)

### Step 7: Create Storybook Story

Create a story in `packages/web/stories/Mc<Name>.stories.tsx` for visual testing and regression checks.

Example file: [`packages/web/stories/McButton.stories.tsx`](packages/web/stories/McButton.stories.tsx)

### Step 8: Create Documentation

Create an MDX file in `packages/web/content/docs/components/mc-<name>.mdx` using Fumadocs components.

Example file: [`packages/web/content/docs/components/mc-button.mdx`](packages/web/content/docs/components/mc-button.mdx)

### Step 9: Build and Test

Build and test:

```bash
# Build the registry metadata (registry.json)
pnpm run build:registry

# Run storybook for visual verification
pnpm run storybook
```

### Step 10: Create a Pull Request

```bash
git add .
git commit -m "feat: add mc-<name> component"
git push -u origin component/mc-<name>
```

Create a PR targeting `dev`. Link the issue (e.g., `Closes #42`) in your description.

---

# External Contributors

External contributors should follow the same technical steps but start with a fork.

## Workflow

1. Fork the repository on GitHub
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/mcoli-ui.git`
3. Add upstream: `git remote add upstream https://github.com/MicroClub-USTHB/mcoli-ui.git`
4. Follow the **Internal Contributors** steps from Step 2 onwards, using `upstream` to pull.

---

# Registry Item Summary

When adding a new item, you will create/edit these files:

| File                                                                                                       | Purpose                       |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------- |
| [`packages/web/registry/ui/mc-<name>.tsx`](packages/web/registry/ui/mc-button.tsx)                         | The actual code to distribute |
| [`packages/web/registry/registry-ui.ts`](packages/web/registry/registry-ui.ts)                             | Metadata for CLI discovery    |
| [`packages/web/registry/registry-examples.ts`](packages/web/registry/registry-examples.ts)                 | Links demos to registry       |
| [`packages/web/registry/examples/mc-<name>-demo.tsx`](packages/web/registry/examples/mc-button-demo.tsx)   | Live demo for documentation   |
| [`packages/web/stories/Mc<Name>.stories.tsx`](packages/web/stories/McButton.stories.tsx)                   | Visual testing in Storybook   |
| [`packages/web/content/docs/components/mc-<name>.mdx`](packages/web/content/docs/components/mc-button.mdx) | Markdown documentation        |

### Planned Components

| Component            | Design State | Dev State |
| -------------------- | ------------ | --------- |
| `mc-button`          | ✅           | ✅        |
| `mc-input`           | ✅           |           |
| `mc-textarea`        | ✅           |           |
| `mc-input-otp`       | ✅           | ✅        |
| `mc-checkbox`        | ✅           | ✅        |
| `mc-radio-group`     | ✅           |           |
| `mc-card`            | ✅           |           |
| `mc-select`          | ✅           |           |
| `mc-combobox`        | ✅           |           |
| `mc-switch`          | ✅           | ✅        |
| `mc-navigation-menu` | ✅           |           |
| `mc-sidebar`         | ✅           |           |
| `mc-tabs`            | ✅           |           |
| `mc-breadcrumb`      | ✅           | ✅        |
| `mc-pagination`      | ✅           |           |
| `mc-dialog`          |              |           |
| `mc-alert-dialog`    |              |           |
| `mc-alert`           |              |           |
| `mc-sonner`          |              |           |
| `mc-tooltip`         |              |           |
| `mc-popover`         |              |           |
| `mc-dropdown-menu`   |              |           |
| `mc-context-menu`    |              |           |
| `mc-data-table`      |              |           |
| `mc-accordion`       |              |           |
| `mc-collapsible`     |              |           |
| `mc-separator`       |              |           |
| `mc-progress`        |              |           |
| `mc-calendar`        |              |           |
| `mc-scrollarea`      |              |           |
| `mc-skeleton`        |              |           |
| `mc-badge`           |              |           |
| `mc-tag`             |              |           |
| `mc-avatar`          |              |           |
| `mc-drawer`          |              |           |
| `mc-hover-card`      |              |           |
| `mc-slider`          |              |           |
| `mc-carousel`        |              |           |

# Important Notes

- **Format Before Committing**: Always run `pnpm run format` before committing your changes.
- **Distribution First**: Remember that this code will be copied into user's projects. Keep it clean and self-contained.
- **Figma First**: Always refer to the designs in Figma for colors, spacing, and variants.
- **Prefix Everything**: All registry items MUST use the `mc-` prefix.
- **Base UI**: Use `@base-ui/react` for underlying logic to ensure accessibility.
- **Themes and Modes**: Every item must be tested in all 5 themes in both light and dark modes.
- **Build Verification**: Ensure `pnpm run build:registry` passes before submitting.
