# Storybook audit

Story file: `packages/web/stories/Mc<Name>.stories.tsx`. Match the conventions of the existing stories (imports from `@storybook/nextjs`, `title: 'Components/Mc<Name>'`).

The global decorator (`.storybook/withTheme.tsx`) already provides the theme and mode toolbar. Do not add theme switching inside stories.

## Required stories

1. **Playground** (first story). Every public prop that has a visible effect is a control, so a user can reach every Figma variant by changing controls alone.
2. **One story per Figma variant axis** (for example `Variants`, `Sizes`), showing all options side by side.
3. **One story per meaningful state or slot** that controls cannot show alone (for example `WithIcon`, `Disabled`, `Invalid`, `Open`, `Controlled`).
4. **Composition stories** for compound components (for example a dialog with a form), only if Figma shows that composition.

Do not add stories that duplicate another story with one prop changed. That belongs in the Playground controls.

## Controls

- `argTypes` for every prop:
  - enum: `control: 'select'` (or `'inline-radio'` for 2–3 options) with `options` matching the `cva` keys exactly,
  - boolean: `control: 'boolean'`,
  - text: `control: 'text'`,
  - `ReactNode` (icons): a select over a small map of choices, mapped in `render`,
  - callbacks: `action` or `fn()` from `storybook/test`, so events show in the Actions panel,
  - not useful as a control (`render`, `className`, refs): `control: false`.
- `args` set to the component defaults.
- `description` in `argTypes` for props whose purpose is not obvious from the name.
- In stories where a control has no effect, hide it with `parameters.controls.exclude`.
- The `options` list must match the component. Flag options that do not exist (for example a removed variant) and variants that have no option.

## Checks in the browser

- Every story renders with no console errors.
- Changing each control changes the rendered component immediately.
- The canvas gives enough room: popovers and tooltips are not clipped, and white components are visible on the background.
- Each story looks correct in all 5 themes and in light and dark mode.
