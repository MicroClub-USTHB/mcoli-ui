# Visual and token audit

## Read the current tokens first

Token values change. Read the files every time, do not rely on memory:

- `packages/web/registry/themes/common/colors.ts`: raw palette (`baby-blue-800`, `blue-primary-200`, and so on).
- `packages/web/registry/themes/primaryTheme.ts` (and the other 4 themes): semantic tokens (`primary`, `muted-foreground`, `border`, `ring`, …) and radius tokens, for light and dark.
- `packages/web/registry/consts/index.ts` (`commonCSS`): shipped utilities (`header-xl` … `header-xs`, `paragraph-xl` … `paragraph-xs`, `bg-it-gradient`) and base styles.
- `packages/web/app/globals.css`: the docs-site copy, plus shadows, blur and spacing tokens.

A component installed in a user project only gets what the theme ships: `registry/themes/*` and `commonCSS`. Anything defined only in `app/globals.css` works on the docs site but breaks after install. Flag every class that depends on a docs-only token.

## Mapping Figma to code

| Figma                                | Code                                                                                          |
| ------------------------------------ | --------------------------------------------------------------------------------------------- |
| Semantic color variable              | Semantic Tailwind class: `bg-primary`, `text-muted-foreground`, `border-border`, `ring-ring`  |
| Palette color with no semantic match | Palette class (`bg-baby-blue-800`) only if it is the same in every theme. Otherwise flag it   |
| Text style `Header/*`                | `header-xl` … `header-xs` utility                                                             |
| Text style `Paragraph/*`             | `paragraph-xl` … `paragraph-xs` utility, plus a weight class (`font-medium`, `font-semibold`) |
| Radius variable                      | `rounded-sm` … `rounded-2xl`, or `rounded-full` for pills and circles                         |
| Shadow style                         | `shadow-xs` … `shadow-3xl` if the values match                                                |
| Spacing, size                        | Tailwind scale (`px-2.5`, `h-8`, `gap-1`). Arbitrary values (`h-[22px]`) only off the scale   |

Text styles: compare font size, line height, weight and letter spacing. If a `paragraph-*` or `header-*` utility matches, use it instead of separate `text-[14px] leading-[20px]` classes. If Figma uses a text style with no matching utility, flag it.

## Anomalies to look for

- Hardcoded colors (`#E6E9FF`, `rgb(...)`, `bg-[#...]`) where a token exists. These break theming and dark mode.
- Classes that reference tokens which do not exist (for example `bg-card-background`). Tailwind drops them silently. Check every color class against the token list.
- Invalid or misspelled Tailwind classes. Tailwind drops them silently too.
- A value that matches Figma in the primary theme but uses a palette color, so it is wrong in the other 4 themes.
- Wrong font: headings use Plus Jakarta Sans (`header-*`), body uses DM Sans.
- Missing states: hover, focus-visible ring, disabled, invalid, open.
- Dark mode: Figma rarely shows it. Semantic tokens handle it. Palette classes and hex values do not.
- Icons: size and stroke match Figma, and the icon color follows the text color.
- Inline `style={{...}}` objects that duplicate what classes can do.
- Leftover classes from shadcn or Radix (`data-[state=...]` instead of Base UI `data-[open]`, `data-[closed]`, and so on).

## Visual comparison

1. Start Storybook: `pnpm run storybook` (port 6006).
2. Open each story in the built-in browser, at the same zoom as the Figma screenshot.
3. Compare each variant, size and state with its screenshot: dimensions, spacing, colors, typography, radius, shadow, icon placement.
4. Measure in the browser with `getBoundingClientRect()` and `getComputedStyle()` instead of estimating from screenshots.
5. Repeat in all 5 themes (`primary`, `secondary`, `game-dev`, `robotics`, `it`) and in light and dark mode, using the Storybook toolbar.

Record each mismatch as: element, Figma value, rendered value, cause (file:line).
