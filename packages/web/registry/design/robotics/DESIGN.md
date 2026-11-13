---
version: 'alpha'
name: 'mcoli-ui Robotics'
description: 'Blue Primary with Accent Blue accents - Technical and precise.'
colors:
  primary: '#001eff'
  primary-foreground: '#ffffff'
  secondary: '#0006b1'
  secondary-foreground: '#ffffff'
  accent: '#00d3ff'
  accent-foreground: '#0b0e24'
  background: '#ffffff'
  foreground: '#000000'
  surface: '#f0f0f0'
  surface-foreground: '#000000'
  card: '#ffffff'
  card-foreground: '#000000'
  popover: '#ffffff'
  popover-foreground: '#000000'
  muted: '#f0f0f0'
  muted-foreground: '#333333'
  border: '#000000'
  input: '#ffffff'
  ring: '#00d3ff'
  success: '#22c55e'
  success-foreground: '#e6f9ee'
  warning: '#ff6900'
  warning-foreground: '#fff7ed'
  destructive: '#e7000b'
  destructive-foreground: '#ffffff'
  info: '#007aff'
  info-foreground: '#ffffff'
  primary-dark: '#2563ef'
  primary-foreground-dark: '#ffffff'
  secondary-dark: '#001eff'
  secondary-foreground-dark: '#ffffff'
  accent-dark: '#00b8cc'
  accent-foreground-dark: '#ffffff'
  background-dark: '#000000'
  foreground-dark: '#ffffff'
  card-dark: '#262626'
  card-foreground-dark: '#ffffff'
  muted-dark: '#1a1a1a'
  muted-foreground-dark: '#cccccc'
  border-dark: '#676767'
  input-dark: '#676767'
  ring-dark: '#00b8cc'
typography:
  header-xl:
    fontFamily: 'Plus Jakarta Sans'
    fontSize: '72px'
    lineHeight: '90px'
    letterSpacing: '-0.02em'
  header-lg:
    fontFamily: 'Plus Jakarta Sans'
    fontSize: '60px'
    lineHeight: '72px'
    letterSpacing: '-0.02em'
  header-md:
    fontFamily: 'Plus Jakarta Sans'
    fontSize: '36px'
    lineHeight: '44px'
    letterSpacing: '-0.02em'
  header-sm:
    fontFamily: 'Plus Jakarta Sans'
    fontSize: '30px'
    lineHeight: '38px'
  header-xs:
    fontFamily: 'Plus Jakarta Sans'
    fontSize: '24px'
    lineHeight: '32px'
  paragraph-xl:
    fontFamily: 'DM Sans'
    fontSize: '20px'
    lineHeight: '30px'
  paragraph-lg:
    fontFamily: 'DM Sans'
    fontSize: '18px'
    lineHeight: '28px'
  paragraph-md:
    fontFamily: 'DM Sans'
    fontSize: '16px'
    lineHeight: '24px'
  paragraph-sm:
    fontFamily: 'DM Sans'
    fontSize: '14px'
    lineHeight: '20px'
  paragraph-xs:
    fontFamily: 'DM Sans'
    fontSize: '12px'
    lineHeight: '18px'
  label-md:
    fontFamily: 'DM Sans'
    fontSize: '14px'
    lineHeight: '20px'
    fontWeight: 500
  label-lg:
    fontFamily: 'DM Sans'
    fontSize: '16px'
    lineHeight: '24px'
    fontWeight: 500
rounded:
  sm: '2px'
  md: '2px'
  lg: '4px'
  xl: '4px'
  2xl: '4px'
  full: '9999px'
spacing:
  xs: '4px'
  sm: '8px'
  md: '16px'
  lg: '24px'
  xl: '32px'
  2xl: '48px'
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.lg}'
    padding: '10px 16px'
  button-primary-hover:
    backgroundColor: '{colors.secondary-foreground}'
    textColor: '{colors.secondary}'
  button-secondary:
    backgroundColor: '{colors.secondary}'
    textColor: '{colors.secondary-foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.lg}'
    padding: '10px 16px'
  button-destructive:
    backgroundColor: '{colors.destructive}'
    textColor: '{colors.destructive-foreground}'
    typography: '{typography.label-md}'
    rounded: '{rounded.lg}'
    padding: '10px 16px'
  input:
    backgroundColor: '{colors.input}'
    textColor: '{colors.foreground}'
    typography: '{typography.paragraph-sm}'
    rounded: '{rounded.lg}'
  card:
    backgroundColor: '{colors.card}'
    textColor: '{colors.card-foreground}'
    rounded: '{rounded.lg}'
    padding: '{spacing.md}'
---

# mcoli-ui Robotics theme

## Overview

Technical and precise: electric blue, pure black and white, and almost square corners. Use it for robotics, hardware and data-heavy interfaces.

This project is built with [mcoli-ui](https://mcoli-ui.microclub.info), Micro Club's component library on top of shadcn/ui and Tailwind CSS v4. The tokens above mirror the CSS variables that `mcoli-ui init --theme robotics` installed. To refresh this file after a theme change, run `npx mcoli-ui init --theme <name> --overwrite`.

## Colors

Electric blue `primary` and deep blue `secondary` both carry white text. Cyan `accent` marks live or active elements. Borders are pure black, so every outline reads as a hard line.

Every token is a Tailwind color: `primary` is `bg-primary`, `text-primary`, `border-primary` and so on. Each surface token has a matching `-foreground` token for the text on top of it; always use them as a pair. `success`, `warning`, `destructive` and `info` are for status only.

Dark mode switches the same CSS variables under the `.dark` class, so components need no extra classes. The `-dark` tokens list those values for reference. Never use them as class names.

## Typography

Headings use Plus Jakarta Sans through the `header-xl` to `header-xs` utilities. Body copy uses DM Sans, the default `body` font, through `paragraph-xl` to `paragraph-xs`. Set weight with Tailwind classes (`font-medium` for labels and buttons, `font-semibold` or `font-bold` for headings). The `label-*` tokens describe button and form-label text.

## Layout

Spacing follows the Tailwind scale (4px steps): `xs` is `1`, `sm` is `2`, `md` is `4`, `lg` is `6`, `xl` is `8` and `2xl` is `12` (for example `p-4`, `gap-6`). Use `gap` on flex and grid containers instead of margins between siblings.

## Elevation & Depth

Depth comes from soft shadows, not borders alone: `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`, `shadow-3xl`. Inputs use `shadow-xs`, cards use `shadow-sm`, and popovers, dialogs and menus use `shadow-lg` or higher. Overlays blur the page behind them with `backdrop-blur-sm`.

## Shapes

Corners are sharp: 2px on most controls and 4px at most. Never round them further. Use `rounded-sm` to `rounded-2xl`, which map to the `rounded` tokens, and `rounded-full` only for avatars, dots and pills.

## Components

Install components with `npx mcoli-ui add <name>` (run `npx mcoli-ui list` to see them all). They land in `components/ui/mc-*.tsx` and already apply these tokens. The `components` tokens describe the main variants: `button-primary`, `button-secondary` and `button-destructive` match `McButton`'s `variant` and `destructive` props, and `input` and `card` match `McInput` and `McCard`.

## Do's and Don'ts

- Do use `mc-*` components before building your own or using plain shadcn/ui primitives.
- Do use semantic tokens (`bg-primary`, `text-muted-foreground`, `border-border`) instead of palette colors.
- Do pair every surface token with its `-foreground` token.
- Do favor dense, grid-aligned layouts with clear outlines.
- Don't hardcode colors, radii or shadows as arbitrary values such as `bg-[#0006b1]` or `rounded-[7px]`.
- Don't add fonts beyond DM Sans and Plus Jakarta Sans.
- Don't use `destructive` or `warning` colors for decoration.
- Don't use pill shapes or large radii; they break the engineered look.
