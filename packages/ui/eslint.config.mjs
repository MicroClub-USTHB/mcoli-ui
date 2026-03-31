import storybook from "eslint-plugin-storybook";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [".source/**", "storybook-static/**", ".next/**", "node_modules/**", "dist/**", "cli/dist/**"],
  },
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...storybook.configs["flat/recommended"],
];

export default eslintConfig;
