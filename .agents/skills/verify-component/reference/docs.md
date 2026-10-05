# Docs page audit and rewrite

Docs page: `packages/web/content/docs/components/$component.mdx` (Fumadocs MDX).

## Research first

Before you plan the page, read how 2–3 well-regarded libraries document the same component. Start with:

- shadcn/ui: `https://ui.shadcn.com/docs/components/<name>`
- Base UI: `https://base-ui.com/react/components/<name>`

Add one more if useful (for example Radix Themes, Mantine, Untitled UI). Note which sections and examples they use, and which examples are really needed for this component. Keep only what applies to this component and its Figma variants.

## Page structure

Use this order. Omit a section only if it does not apply to the component.

1. **Frontmatter**: `title: MC <Name>`, one-sentence `description`.
2. **Preview**: `Tabs` with `preview` and `code`, showing **one default instance** of the component (`<ComponentPreview name="$component-demo" />` and `<ComponentSource name="$component-demo" />`). Never a grid of every variant.
3. **Installation**: the CLI tabs (npm, pnpm, yarn, bun) and the Manual Setup steps. Copy them from an existing page and keep the dependency list in sync with the registry entry.
4. **Usage**: import line and the minimal JSX.
5. **Examples**: one `###` heading per example. Each example has its own preview and code tabs, and shows **one thing**: a variant axis (`Variants`, `Sizes`), a slot (`With icon`), a state (`Disabled`), or a real use case (`Controlled`, `With form`). Add an example only if it teaches something the previous ones do not.
6. **Accessibility** (interactive components): keyboard behaviour and labelling requirements, for example `aria-label` on icon-only triggers.
7. **API Reference**: one props table per exported part, with `Prop`, `Type`, `Default`, `Description`. Types and defaults must match the code exactly. Mention which Base UI part each one extends and link to its Base UI docs page.

## One preview, one demo file

Demo file location:

- **One demo**: `packages/web/registry/examples/$component-demo.tsx`.
- **More than one demo**: all demos of the component go in a folder, `packages/web/registry/examples/$component/` (see `examples/mc-badge/`). Move the existing `$component-demo.tsx` into it as well. Import the component with `../../ui/$component`, and set each registry `path` to `examples/$component/<file>.tsx`.

`ComponentPreview` renders a single registered example. For each example with a preview:

1. Create `$component-<example>-demo.tsx` (for example `mc-badge-sizes-demo.tsx`). It default-exports one small component. Keep it short: the file is shown as the code tab.
2. Register it in `packages/web/registry/registry-examples.ts`, copying an existing entry (`type: 'registry:example'`, `registryDependencies` pointing to `$component`). The `path` must match the file location.
3. Run `pnpm run build:registry` so `__registry__` picks it up.
4. Use it in the page with `ComponentPreview` and `ComponentSource`.

The main demo (`$component-demo.tsx`) shows the default instance only. Move the extra variants it contains today into the example demos.

Code-only examples (no preview) are fine for API details that have no visual result, such as a controlled `onOpenChange` handler.

## Checks

- Every `name` in `ComponentPreview` and `ComponentSource` exists in the registry. A missing name renders "Preview component … was not found in registry".
- Imports in usage snippets use `@/components/ui/$component`.
- Prop names, types and defaults in tables and snippets match the code after your fixes.
- The page renders at `http://localhost:3000/docs/components/$component` with no console errors, and each preview shows one thing.
- Write in plain, short sentences, the same tone as the other docs pages.
