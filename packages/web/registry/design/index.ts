import type { Registry } from 'shadcn/schema';
import { commonCSS, staticVars } from '@/registry/consts';

// Builds a DESIGN.md (https://github.com/google-labs-code/design.md) for each
// theme from the same cssVars the theme installs, so the file cannot drift from
// the CSS. Tokens hold the values; the prose explains when to use them.

type ThemeItem = Registry['items'][number] & {
  cssVars: {
    theme: Record<string, string>;
    light: Record<string, string>;
    dark: Record<string, string>;
  };
};

type ThemeCopy = {
  overview: string;
  colors: string;
  shapes: string;
  dos: string[];
  donts: string[];
};

const THEME_COPY: Record<string, ThemeCopy> = {
  primary: {
    overview:
      'The default Micro Club look: deep blue on white, calm and professional. Use it for club websites, dashboards and documentation, where content matters more than decoration.',
    colors:
      'Deep blue `primary` drives every main action. The pale blue `secondary` carries supporting actions and selected states. Cyan `accent` is reserved for small highlights such as hover states and badges.',
    shapes: 'Corners are soft: 6px on small controls, 8px on buttons, inputs and cards.',
    dos: ['Do keep a single `primary` button per view; use `secondary` for the rest.'],
    donts: ["Don't fill large surfaces with `accent`; it is a highlight color."],
  },
  secondary: {
    overview:
      'A purple-led variant of the Micro Club identity: creative and bold. Use it for events, workshops and creative showcases.',
    colors:
      'Purple `primary` drives main actions. Pink-tinted `secondary` carries supporting actions. Orange `accent` adds warm highlights.',
    shapes: 'Corners are soft: 6px on small controls, 8px on buttons, inputs and cards.',
    dos: ['Do use the orange `accent` sparingly, to draw the eye to one element at a time.'],
    donts: [
      "Don't put `muted-foreground` text on white for long copy; it is light and meant for hints.",
    ],
  },
  'game-dev': {
    overview:
      'Playful and energetic: hot pink and yellow on a warm cream background. Use it for game jams, gaming community pages and fun announcements.',
    colors:
      'Pink `primary` drives main actions and also draws `border`s, which gives the theme its outlined, arcade feel. Yellow `secondary` carries supporting actions. Near-black `accent` with teal text makes high-contrast callouts.',
    shapes: 'Corners are soft, and the largest radius (16px) is rounder than in the other themes.',
    dos: ['Do keep the cream `background`; it is part of the identity.'],
    donts: [
      "Don't place yellow `secondary` next to white surfaces without a border; the edge disappears.",
      "Don't use white text on `primary` below 18px; the contrast is under 4.5:1.",
    ],
  },
  robotics: {
    overview:
      'Technical and precise: electric blue, pure black and white, and almost square corners. Use it for robotics, hardware and data-heavy interfaces.',
    colors:
      'Electric blue `primary` and deep blue `secondary` both carry white text. Cyan `accent` marks live or active elements. Borders are pure black, so every outline reads as a hard line.',
    shapes: 'Corners are sharp: 2px on most controls and 4px at most. Never round them further.',
    dos: ['Do favor dense, grid-aligned layouts with clear outlines.'],
    donts: ["Don't use pill shapes or large radii; they break the engineered look."],
  },
  it: {
    overview:
      'Clean and professional with a fresh green: neutral gray text on white. Use it for the IT department, developer tooling and technical documentation.',
    colors:
      'Green `primary` drives main actions. Light blue `secondary` and mint `accent` carry supporting actions and highlights. Text uses gray instead of black for a softer read.',
    shapes: 'Corners are soft: 6px on small controls, 8px on buttons, inputs and cards.',
    dos: ['Do use the `bg-it-gradient` utility for hero sections and banners only.'],
    donts: [
      "Don't use white text on `primary` for body-size copy; the contrast is too low. Keep it to buttons and large text.",
    ],
  },
};

const SEMANTIC_COLORS = [
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'accent',
  'accent-foreground',
  'background',
  'foreground',
  'surface',
  'surface-foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'muted',
  'muted-foreground',
  'border',
  'input',
  'ring',
  'success',
  'success-foreground',
  'warning',
  'warning-foreground',
  'destructive',
  'destructive-foreground',
  'info',
  'info-foreground',
];

const DARK_COLORS = [
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'accent',
  'accent-foreground',
  'background',
  'foreground',
  'card',
  'card-foreground',
  'muted',
  'muted-foreground',
  'border',
  'input',
  'ring',
];

const HEX = /^#[0-9a-f]{3,8}$/i;

const DISPLAY_FONT = 'Plus Jakarta Sans';
const BODY_FONT = 'DM Sans';

function typography(): Record<string, Record<string, string | number>> {
  const tokens: Record<string, Record<string, string | number>> = {};
  for (const [key, rules] of Object.entries(commonCSS)) {
    const match = key.match(/^@utility ((?:header|paragraph)-\w+)$/);
    if (!match || typeof rules !== 'object') continue;
    const css = rules as Record<string, string>;
    tokens[match[1]] = {
      fontFamily: match[1].startsWith('header') ? DISPLAY_FONT : BODY_FONT,
      fontSize: css['font-size'],
      lineHeight: css['line-height'],
      ...(css['letter-spacing'] ? { letterSpacing: css['letter-spacing'] } : {}),
    };
  }
  // Button and label text: text-sm / text-base with font-medium.
  tokens['label-md'] = {
    fontFamily: BODY_FONT,
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 500,
  };
  tokens['label-lg'] = {
    fontFamily: BODY_FONT,
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 500,
  };
  return tokens;
}

function remToPx(value: string): string {
  const rem = value.match(/^([\d.]+)rem$/);
  return rem ? `${Number(rem[1]) * 16}px` : value;
}

function colorTokens(theme: ThemeItem): Record<string, string> {
  const colors: Record<string, string> = {};
  for (const name of SEMANTIC_COLORS) {
    const value = theme.cssVars.light[name];
    if (value && HEX.test(value)) colors[name] = value;
  }
  for (const name of DARK_COLORS) {
    const value = theme.cssVars.dark[name];
    if (value && HEX.test(value)) colors[`${name}-dark`] = value;
  }
  return colors;
}

function roundedTokens(theme: ThemeItem): Record<string, string> {
  const rounded: Record<string, string> = {};
  for (const [key, value] of Object.entries(theme.cssVars.theme)) {
    const match = key.match(/^radius-(\w+)$/);
    if (match) rounded[match[1]] = remToPx(value);
  }
  rounded.full = '9999px';
  return rounded;
}

const SPACING = { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px' };

const COMPONENTS = {
  'button-primary': {
    backgroundColor: '{colors.primary}',
    textColor: '{colors.primary-foreground}',
    typography: '{typography.label-md}',
    rounded: '{rounded.lg}',
    padding: '10px 16px',
  },
  'button-primary-hover': {
    backgroundColor: '{colors.secondary-foreground}',
    textColor: '{colors.secondary}',
  },
  'button-secondary': {
    backgroundColor: '{colors.secondary}',
    textColor: '{colors.secondary-foreground}',
    typography: '{typography.label-md}',
    rounded: '{rounded.lg}',
    padding: '10px 16px',
  },
  'button-destructive': {
    backgroundColor: '{colors.destructive}',
    textColor: '{colors.destructive-foreground}',
    typography: '{typography.label-md}',
    rounded: '{rounded.lg}',
    padding: '10px 16px',
  },
  input: {
    backgroundColor: '{colors.input}',
    textColor: '{colors.foreground}',
    typography: '{typography.paragraph-sm}',
    rounded: '{rounded.lg}',
  },
  card: {
    backgroundColor: '{colors.card}',
    textColor: '{colors.card-foreground}',
    rounded: '{rounded.lg}',
    padding: '{spacing.md}',
  },
};

// Minimal YAML writer: strings are single-quoted (the style Prettier keeps, so
// formatting the generated file does not change it), numbers stay bare.
function yaml(value: unknown, indent = 0): string {
  const pad = '  '.repeat(indent);
  return Object.entries(value as Record<string, unknown>)
    .map(([key, child]) => {
      if (child && typeof child === 'object') return `${pad}${key}:\n${yaml(child, indent + 1)}`;
      if (typeof child === 'number') return `${pad}${key}: ${child}`;
      return `${pad}${key}: '${String(child).replace(/'/g, "''")}'`;
    })
    .join('\n');
}

function shadowList(): string {
  return Object.keys(staticVars)
    .filter((key) => key.startsWith('shadow-'))
    .map((key) => `\`${key}\``)
    .join(', ');
}

export function createDesignMd(theme: ThemeItem): string {
  const copy = THEME_COPY[theme.name];
  if (!copy) throw new Error(`No DESIGN.md copy for theme "${theme.name}"`);
  const title = theme.title ?? theme.name;

  const tokens = {
    version: 'alpha',
    name: `mcoli-ui ${title}`,
    description: theme.description ?? '',
    colors: colorTokens(theme),
    typography: typography(),
    rounded: roundedTokens(theme),
    spacing: SPACING,
    components: COMPONENTS,
  };

  return `---
${yaml(tokens)}
---

# mcoli-ui ${title} theme

## Overview

${copy.overview}

This project is built with [mcoli-ui](https://mcoli-ui.microclub.info), Micro Club's component library on top of shadcn/ui and Tailwind CSS v4. The tokens above mirror the CSS variables that \`mcoli-ui init --theme ${theme.name}\` installed. To refresh this file after a theme change, run \`npx mcoli-ui init --theme <name> --overwrite\`.

## Colors

${copy.colors}

Every token is a Tailwind color: \`primary\` is \`bg-primary\`, \`text-primary\`, \`border-primary\` and so on. Each surface token has a matching \`-foreground\` token for the text on top of it; always use them as a pair. \`success\`, \`warning\`, \`destructive\` and \`info\` are for status only.

Dark mode switches the same CSS variables under the \`.dark\` class, so components need no extra classes. The \`-dark\` tokens list those values for reference. Never use them as class names.

## Typography

Headings use ${DISPLAY_FONT} through the \`header-xl\` to \`header-xs\` utilities. Body copy uses ${BODY_FONT}, the default \`body\` font, through \`paragraph-xl\` to \`paragraph-xs\`. Set weight with Tailwind classes (\`font-medium\` for labels and buttons, \`font-semibold\` or \`font-bold\` for headings). The \`label-*\` tokens describe button and form-label text.

## Layout

Spacing follows the Tailwind scale (4px steps): \`xs\` is \`1\`, \`sm\` is \`2\`, \`md\` is \`4\`, \`lg\` is \`6\`, \`xl\` is \`8\` and \`2xl\` is \`12\` (for example \`p-4\`, \`gap-6\`). Use \`gap\` on flex and grid containers instead of margins between siblings.

## Elevation & Depth

Depth comes from soft shadows, not borders alone: ${shadowList()}. Inputs use \`shadow-xs\`, cards use \`shadow-sm\`, and popovers, dialogs and menus use \`shadow-lg\` or higher. Overlays blur the page behind them with \`backdrop-blur-sm\`.

## Shapes

${copy.shapes} Use \`rounded-sm\` to \`rounded-2xl\`, which map to the \`rounded\` tokens, and \`rounded-full\` only for avatars, dots and pills.

## Components

Install components with \`npx mcoli-ui add <name>\` (run \`npx mcoli-ui list\` to see them all). They land in \`components/ui/mc-*.tsx\` and already apply these tokens. The \`components\` tokens describe the main variants: \`button-primary\`, \`button-secondary\` and \`button-destructive\` match \`McButton\`'s \`variant\` and \`destructive\` props, and \`input\` and \`card\` match \`McInput\` and \`McCard\`.

## Do's and Don'ts

- Do use \`mc-*\` components before building your own or using plain shadcn/ui primitives.
- Do use semantic tokens (\`bg-primary\`, \`text-muted-foreground\`, \`border-border\`) instead of palette colors.
- Do pair every surface token with its \`-foreground\` token.
${copy.dos.map((line) => `- ${line}`).join('\n')}
- Don't hardcode colors, radii or shadows as arbitrary values such as \`bg-[#0006b1]\` or \`rounded-[7px]\`.
- Don't add fonts beyond ${BODY_FONT} and ${DISPLAY_FONT}.
- Don't use \`destructive\` or \`warning\` colors for decoration.
${copy.donts.map((line) => `- ${line}`).join('\n')}
`;
}
