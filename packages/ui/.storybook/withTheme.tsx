import { useEffect } from "react";
import type { Decorator } from "@storybook/react";
import { ColorThemeProvider } from "../components/ColorThemeProvider";
import { RootProvider } from "fumadocs-ui/provider/next";

export const withTheme: Decorator = (Story, context) => {
  const { theme, mode } = context.globals;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme || "primary");
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme, mode]);

  return (
    <ColorThemeProvider>
      <RootProvider>
        <div className="bg-background text-foreground max-w-100 antialiased">
          <Story />
        </div>
      </RootProvider>
    </ColorThemeProvider>
  );
};
