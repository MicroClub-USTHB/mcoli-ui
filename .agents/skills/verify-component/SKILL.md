---
name: verify-component
description: Audits one mcoli-ui component against its Figma design (the source of truth), then fixes it on a fix/mc-<name> branch and opens a PR to dev. Checks pixel accuracy, theme token and typography utility usage, props API, Storybook stories and the docs page. Use when the user runs /verify-component or asks to verify, audit or align an mc-* component with Figma.
argument-hint: <mc-component-name> <figma-dev-mode-url>
arguments: [component, figma_url]
disable-model-invocation: true
---

# Verify component

Audit `$component` against the Figma design at `$figma_url`, then fix every anomaly found.

The Figma file is the source of truth for visuals, states, variants and naming. The repo is the source of truth for tokens, utilities and conventions.

## Inputs

- `$component`: registry name with the `mc-` prefix, for example `mc-badge`.
- `$figma_url`: Figma Dev Mode link to the component set or frame.

Stop and ask the user if:

- either input is missing,
- `packages/web/registry/ui/$component.tsx` does not exist,
- the URL has no `node-id`,
- the Figma MCP tools are not connected or need authentication.

## Repo state

- Branch: !`git branch --show-current`
- Uncommitted changes: !`git status --short | head -20`

If there are uncommitted changes, stop and ask the user before you continue.

## Files in scope

All paths are relative to `packages/web/`. `<Name>` is the PascalCase name without the prefix, for example `Badge`. In the reference files, `$component` means the component name passed in.

| Role                    | Path                                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| Component (distributed) | `registry/ui/$component.tsx`                                                                      |
| Registry entry          | `registry/registry-ui.ts`                                                                         |
| Docs demos              | `registry/examples/$component/` (or `registry/examples/$component-demo.tsx` if there is one demo) |
| Demo registry entries   | `registry/registry-examples.ts`                                                                   |
| Story                   | `stories/Mc<Name>.stories.tsx`                                                                    |
| Docs page               | `content/docs/components/$component.mdx`                                                          |
| Shipped tokens          | `registry/themes/*.ts`, `registry/themes/common/colors.ts`                                        |
| Shipped utilities       | `registry/consts/index.ts` (`commonCSS`)                                                          |
| Docs-site tokens        | `app/globals.css`, `app/themes/*.css`                                                             |
| Consumers               | `grep -rn "$component" packages/web --include=*.tsx` (exclude above)                              |

## Workflow

Copy this checklist into your reply and update it as you go:

```
verify-component progress:
- [ ] 1. Extract the full Figma spec
- [ ] 2. Audit visuals and tokens
- [ ] 3. Audit the props API
- [ ] 4. Audit Storybook stories
- [ ] 5. Audit the docs page (research included)
- [ ] 6. Report anomalies and confirm the plan
- [ ] 7. Branch, fix and commit step by step
- [ ] 8. Verify everything
- [ ] 9. Push and open the PR to dev
```

### 1. Extract the full Figma spec

Follow [reference/figma.md](reference/figma.md). Output: a written spec of every variant, size, state, slot, measurement and token, plus screenshots. Do not read the component code before the spec is written. This keeps the code from biasing what you see in the design.

### 2. Audit visuals and tokens

Follow [reference/design-system.md](reference/design-system.md). Compare the spec with the component, value by value. Then render the component in Storybook and compare it side by side with the Figma screenshots in all 5 themes, light and dark.

### 3. Audit the props API

Follow [reference/api.md](reference/api.md). Derive the ideal API from the Figma component properties first, then compare it with the current API.

### 4. Audit Storybook stories

Follow [reference/storybook.md](reference/storybook.md).

### 5. Audit the docs page

Follow [reference/docs.md](reference/docs.md). Research how 2–3 well-regarded libraries document the same component before you plan the new page.

### 6. Report anomalies and confirm the plan

Write a report with this structure:

```markdown
## $component audit

### Visual and tokens

- [severity] what is wrong — Figma value vs code value — file:line

### API

- ...

### Storybook

- ...

### Docs

- ...

### Breaking changes

- prop renamed or removed, default changed (or "None")

### Planned commits

1. fix($component): ...
2. ...
```

Severity is `critical` (wrong visuals, broken behaviour, a11y failure), `major` (wrong token, bad API, missing state) or `minor` (naming, cleanup).

Show the report and the planned commits to the user. Ask for confirmation before step 7 if there are breaking changes or if a fix touches other components. Otherwise continue.

### 7. Branch, fix and commit step by step

```bash
git switch dev
git pull --ff-only origin dev
git switch -c fix/$component
```

If `fix/$component` already exists, stop and ask the user.

Fix in this order, one concern per commit:

1. Component visuals and tokens
2. Props API, plus every consumer of a changed prop
3. Registry entries (`registry-ui.ts`, `registry-examples.ts`) if demos or dependencies change
4. Storybook stories
5. Docs page and demos

Commit rules (from AGENTS.md and CONTRIBUTING.md):

- One-line Conventional Commit, for example `fix(mc-badge): use theme tokens for the border`.
- Types: `fix` for visual or behaviour bugs, `refactor` for API cleanup with no visual change, `docs` for the docs page, `test` or `chore` for stories.
- No body. No `Co-Authored-By` trailer. No AI attribution of any kind.
- Run `pnpm run format` before each commit.

### 8. Verify everything

Run from the repo root. Every command must pass:

```bash
pnpm run typecheck
pnpm run lint
pnpm run format:check
pnpm run build:registry
```

Then verify in a browser:

- Storybook (`pnpm run storybook`, port 6006): every story renders, every control changes the component, and no console errors appear. Check all 5 themes in light and dark mode. Compare with the Figma screenshots again.
- Docs (`pnpm run dev`, port 3000): open `/docs/components/$component`. Every preview renders, every code tab shows the right source, and no console errors appear.
- Install: run `pnpm cli:dev add $component` in a scratch Next.js project with `shadcn` initialised and the mcoli-ui theme installed. Confirm the component compiles and renders. Skip this check only if the dev server cannot start, and say so in the PR.

If a check fails, fix it, commit the fix, and run all checks again. Continue only when every check passes.

### 9. Push and open the PR to dev

```bash
git push -u origin fix/$component
gh pr create --base dev --head fix/$component --title "fix($component): align with the design" --body-file <file>
```

The PR body is a short Markdown list of what changed, grouped by area. Follow [reference/pr-template.md](reference/pr-template.md). Do not add any "Generated with" line or AI attribution.

Return the PR URL and a summary of the anomalies that were fixed and any that were left unfixed (with the reason).

## Rules

- Figma decides visuals. If Figma and a repo convention conflict, follow Figma and record the conflict in the PR.
- Never hardcode a hex, rgb or raw pixel value when a shipped token or utility exists.
- `registry/ui/*` files are copied into user projects. They can only import from `@/lib/utils`, `@/registry/ui/*`, React, `@base-ui/react` and the packages listed in the registry entry `dependencies`.
- Keep `'use client'` on any component that uses hooks, refs, context or event handlers.
- Do not change other components except to update consumers of a changed API, or to fix a token that is shared with this component. List those changes in the PR.
- Do not edit `__registry__/` by hand. It is generated by `build:registry`.
