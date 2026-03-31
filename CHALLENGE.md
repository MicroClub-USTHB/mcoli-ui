# Challenge: Build the mc-checkbox Component

## Welcome

This challenge guides you through creating a component for **mcoli-ui** (MicroClub UI), a design system built with modern React and Tailwind CSS.

---

## What You'll Build

**Checkbox** is a component for user selections with optional label and support text.

**Issue:** https://github.com/MicroClub-USTHB/mcoli-ui/issues/6

---

## Key Concepts You'll Learn

### What is CVA (Class Variance Authority)?

CVA is a tiny TypeScript library that helps you create different "variants" of a component. Instead of writing multiple components for different styles, you define variants once.

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const checkboxVariants = cva("base-styles", {
  variants: {
    size: {
      sm: "small-styles",
      md: "medium-styles",
    },
  },
});
```

**Resources:**

- Official Docs: https://www.mintlify.com/joe-bell/cva/getting-started/quickstart
- Tutorial: https://medium.com/@indrajitsaha7597/a-practical-guide-to-cva-in-react-building-reusable-flexible-ui-components-21e98b2eba1a

---

### What is StoryBook?

StoryBook is a tool for building UI components in isolation. It lets you view and interact with your component without running your whole app.

- Each "story" shows your component in a different state
- **IMPORTANT: Test your component in Storybook to verify it looks correct in all themes**
- Run with: `npm run storybook`

**Resources:**

- Official Tutorial: https://storybook.js.org/tutorials/intro-to-storybook/react/en/get-started/
- StoryBook Docs: https://storybook.js.org/docs/react/get-started/setup

---

### How to Read Figma as a Developer

Figma is where designers create the visual designs. Here's how to translate designs to code:

1. **Inspect Panel** (right side) shows CSS properties
2. **Layers Panel** (left side) shows component structure
3. **Design Specs** click on elements to see exact:
   - Colors (in the Inspector)
   - Spacing/margins
   - Typography (font, size, weight)
   - Border radius

**Quick Tips:**

- Look for **auto-layout** to understand spacing
- Colors often come from the **Design System** (local tokens)
- Check the **Code** tab in the Inspector for CSS
- **Test exact values in Storybook** do not guess!

**Color Reference:**

When you see a color in Figma (e.g., "Muted Foreground"), check the theming docs at https://mcoli-ui.microclub.info/docs/theming to find the matching Tailwind class. For example, "Muted Foreground" becomes `text-muted-foreground`, "Primary" becomes `bg-primary`, etc.

**Resources:**

- Figma for Developers: https://www.arbazmurme.info/blog/figma-for-developers-a-realworld-example-of-turning-design-into-code
- Figma Dev Mode: https://help.figma.com/hc/en-us/sections/23512714336151-Turn-designs-to-code

---

## Your Mission

### Step 1: Fork & Clone

```bash
# Fork on GitHub, then clone YOUR fork
git clone https://github.com/YOUR_USERNAME/mcoli-ui.git
cd mcoli-ui
git remote add upstream https://github.com/MicroClub-USTHB/mcoli-ui.git
```

### Step 2: Create Branch

```bash
git switch dev
git pull upstream dev
git checkout -c component/mc-checkbox
```

### Step 4: Copy Environment File

```bash
cp .env.example .env
```

### Step 5: Implement the Component

A starter file exists at: `packages/ui/registry/ui/mc-checkbox.tsx`

This uses `@base-ui/react/checkbox`. Adapt it to match the MC Design System.

**Your Component Props:**

- `text` — string, the label text next to the checkbox
- `support-text` — string, optional helper text below the checkbox
- `size` — "sm" | "md", controls the overall size

**Key Requirements:**

- Use CVA for the `size` variant (sm, md)
- Implement the label and support text layout
- Make it accessible (ARIA attributes)
- Match Figma design exactly (colors, spacing, typography)

### Step 6: Register the Component

Edit: `packages/ui/registry/registry-ui.ts`

```ts
{
  name: 'mc-checkbox',
  type: 'registry:component',
  title: 'MicroClub Checkbox',
  description: 'A checkbox component with label and support text',
  files: [{ path: 'ui/mc-checkbox.tsx', type: 'registry:component' }],
  dependencies: ['@base-ui/react'],
},
```

### Step 7: Create Demo

Create: `packages/ui/registry/examples/mc-checkbox-demo.tsx`

Shows the component in action with different configurations.

### Step 8: Create StoryBook Story

Create: `packages/ui/stories/McCheckbox.stories.tsx`

Create stories for:

- Default checkbox with text
- Checkbox with support-text
- Size variants (sm, md)
- Checked/unchecked/indeterminate states
- **ALL 5 themes in light/dark modes** — test every combination!

### Step 9: Create Documentation

Create: `packages/ui/content/docs/components/mc-checkbox.mdx`

Document props, variants, and usage examples.

### Step 10: Test & Build

```bash
# Run Storybook to visually test — VERIFY ALL THEMES
npm run storybook

# Build registry
npm run build:registry
```

**CRITICAL: Test your component in Storybook for all themes before submitting!**

### Step 11: Add to Registry Examples

Edit: `packages/ui/registry/registry-examples.ts`

Add your demo to the `examples` array to link it with the registry.

### Step 12: Submit PR

```bash
git add .
git commit -m "feat: add mc-checkbox component"
git push -u origin component/mc-checkbox
```

Create a PR targeting `dev` and link issue #6.

---

## File Structure Summary

| File                                                  | Purpose             |
| ----------------------------------------------------- | ------------------- |
| `packages/ui/registry/ui/mc-checkbox.tsx`             | Main component code |
| `packages/ui/registry/registry-ui.ts`                 | Registry metadata   |
| `packages/ui/registry/registry-examples.ts`           | Links demo to registry |
| `packages/ui/registry/examples/mc-checkbox-demo.tsx`  | Live demo           |
| `packages/ui/stories/McCheckbox.stories.tsx`          | StoryBook stories   |
| `packages/ui/content/docs/components/mc-checkbox.mdx` | Documentation       |

---

## Need Help?

- Check existing components (e.g., `mc-button.tsx`) for patterns
- Refer to CONTRIBUTING.md for detailed specs

Good luck!
