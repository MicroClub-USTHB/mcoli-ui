import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],

  "framework": "@storybook/nextjs-vite",

  "staticDirs": [
    "../public"
  ],

  addons: ["@storybook/addon-vitest", "@storybook/addon-a11y"]
};
export default config;