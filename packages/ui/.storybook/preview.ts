import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import "./fonts.css";
import { withTheme } from "./withTheme";

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "primary",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "primary", title: "Primary" },
          { value: "secondary", title: "Secondary" },
          { value: "game-dev", title: "Game Dev" },
          { value: "robotics", title: "Robotics" },
          { value: "it", title: "IT" },
        ],
        dynamicTitle: true,
      },
    },
    mode: {
      description: "Color mode",
      defaultValue: "light",
      toolbar: {
        title: "Mode",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "circlehollow" },
          { value: "dark", title: "Dark", icon: "circle" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
