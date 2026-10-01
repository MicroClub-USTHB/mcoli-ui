import type { StorybookConfig } from '@storybook/nextjs-vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  framework: '@storybook/nextjs-vite',
  staticDirs: ['../public'],

  // Let Tailwind's Vite plugin resolve CSS @imports instead of Vite's built-in postcss-import,
  // which skips (and warns about) the imports fumadocs-ui's preset.css places after `@plugin`.
  // PostCSS is disabled here only so Tailwind doesn't run twice; Next.js still uses postcss.config.mjs.
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), tailwindcss()];
    config.css = { ...config.css, postcss: { plugins: [] } };
    return config;
  },
};
export default config;
