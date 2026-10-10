# Props API audit

## Derive the ideal API from Figma

Map Figma component properties to props:

| Figma property         | Prop                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------- |
| Variant property       | `cva` variant (`variant`, `size`, …) with the Figma option names in kebab or camel case |
| Boolean "show X"       | Usually a slot that renders when content is passed, not a boolean                       |
| Instance swap (icon)   | `ReactNode` prop or composed child, never a string icon name                            |
| Text property          | `children` for the main label. Named `ReactNode` props for secondary text               |
| State (hover, focus)   | CSS only. Never a prop                                                                  |
| State (disabled, open) | The Base UI prop (`disabled`, `open`/`defaultOpen`/`onOpenChange`)                      |

Prefer Figma's names when they are clear. Rename when a Figma name clashes with an HTML attribute (`title`, `color`) or a common convention.

## Compare with the current API

Check each item and record failures:

- **Composition matches the library.** Compound components (`McDialog`, `McDialogTrigger`, `McDialogContent`, …) follow the same naming and split as other mcoli-ui components and Base UI. Look at 2–3 sibling components for the pattern.
- **Base UI first.** Interactive components wrap the matching `@base-ui/react` primitive and forward its props, so users get its full API (controlled and uncontrolled state, `render` prop, accessibility).
- **Native props pass through.** Props are spread to the root element, and `className` is merged with `cn()` last, so users can override.
- **`render` prop** is supported where the component renders a single element (via `useRender` or the Base UI part).
- **`data-slot`** attributes on each part, for styling from outside.
- **Variants exported.** `Mc<Name>Variants` (the `cva` result) is exported when the component has variants.
- **Defaults** match the Figma default variant.
- **No dead props.** Every prop has a visible effect. No props that only some variant combinations use, without a guard or type that prevents invalid combinations.
- **No boolean explosion.** Several booleans that are mutually exclusive should be one enum prop.
- **Types.** No `any`. Props types extend the primitive's props type. Unions for enums, not `string`.
- **Accessibility.** Correct roles and labels, `aria-*` passed through, keyboard support from Base UI kept, visible focus ring, icon-only usage documented as needing `aria-label`.
- **Naming.** Consistent with other mcoli-ui components (`icon`/`iconPosition`, `size`, `variant`). No typos, no French or leftover comments.
- **Server safety.** `'use client'` present if hooks, refs, context or handlers are used.

## Breaking changes

A renamed or removed prop, or a changed default, breaks users. For each one:

- Update every consumer in the repo (other components, demos, stories, docs, landing page).
- If the old prop was public and widely used, keep it as a deprecated alias for one release, with a `@deprecated` JSDoc tag.
- List it under "Breaking changes" in the report and the PR.
