# PR description

Title: `fix($component): align with the design`

Body: a short Markdown list, grouped by area. One line per change, saying what changed and, if not obvious, why. Omit empty sections. No "Generated with" line and no AI attribution.

```markdown
## Summary

Audit of `$component` against the Figma design.

### Visual

- Border uses `border-border` instead of `#E6E9FF`, so it follows the theme and dark mode
- Sizes match Figma: sm 22px, md 24px, lg 28px

### API

- New `size` values `sm | md | lg` (replaces `small`)

### Storybook

- Playground controls cover every variant, size and icon position
- New **Disabled** story

### Docs

- Top preview shows the default badge only; each example has its own preview
- Props table matches the code

### Breaking changes

- `size="small"` is now `size="sm"`

## Test plan

- [x] `typecheck`, `lint`, `format:check`, `build:registry`
- [x] Storybook compared with Figma in all 5 themes, light and dark
- [x] Docs page previews render with no console errors
- [x] `pnpm cli:dev add $component` installs and renders in a fresh Next.js project
```
