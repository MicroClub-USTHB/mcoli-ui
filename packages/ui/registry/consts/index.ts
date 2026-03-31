import { config } from "dotenv";

config();

export const REGISTRY_URL = process.env.MCOLI_UI_REGISTRY_URL || "https://mcoli-ui.microclub.info";

export const commonCSS = {
  "@layer base": {
    "*": {
      "border-color": "var(--border)",
      "outline-color": "rgb(var(--ring) / 0.5)",
    },
    body: {
      "background-color": "var(--background)",
      color: "var(--foreground)",
      "letter-spacing": "0em",
      "font-family": "var(--font-dm-sans), DM Sans, system-ui, sans-serif",
    },
  },
  // Will add those int the futur if found that its necessary
  // h1: { "font-family": "var(--font-plus-jakarta-sans)" },
  // h2: { "font-family": "var(--font-plus-jakarta-sans)" },
  // h3: { "font-family": "var(--font-plus-jakarta-sans)" },
  // h4: { "font-family": "var(--font-plus-jakarta-sans)" },
  // h5: { "font-family": "var(--font-plus-jakarta-sans)" },
  // h6: { "font-family": "var(--font-plus-jakarta-sans)" },
  "@utility header-xl": {
    "font-size": "72px",
    "line-height": "90px",
    "letter-spacing": "-0.02em",
    "font-family": "var(--font-plus-jakarta-sans), Plus Jakarta Sans, system-ui, sans-serif",
  },
  "@utility header-lg": {
    "font-size": "60px",
    "line-height": "72px",
    "letter-spacing": "-0.02em",
    "font-family": "var(--font-plus-jakarta-sans), Plus Jakarta Sans, system-ui, sans-serif",
  },
  "@utility header-md": {
    "font-size": "36px",
    "line-height": "44px",
    "letter-spacing": "-0.02em",
    "font-family": "var(--font-plus-jakarta-sans), Plus Jakarta Sans, system-ui, sans-serif",
  },
  "@utility header-sm": {
    "font-size": "30px",
    "line-height": "38px",
    "font-family": "var(--font-plus-jakarta-sans), Plus Jakarta Sans, system-ui, sans-serif",
  },
  "@utility header-xs": {
    "font-size": "24px",
    "line-height": "32px",
    "font-family": "var(--font-plus-jakarta-sans), Plus Jakarta Sans, system-ui, sans-serif",
  },
  "@utility paragraph-xl": {
    "font-size": "20px",
    "line-height": "30px",
  },
  "@utility paragraph-lg": {
    "font-size": "18px",
    "line-height": "28px",
  },
  "@utility paragraph-md": {
    "font-size": "16px",
    "line-height": "24px",
  },
  "@utility paragraph-sm": {
    "font-size": "14px",
    "line-height": "20px",
  },
  "@utility paragraph-xs": {
    "font-size": "12px",
    "line-height": "18px",
  },
  "@utility bg-it-gradient": {
    background: "var(--it-gradient)",
  },
};

export const staticVars = {
  "shadow-xs": "0 1px 4px 0px hsl(0 0% 0% / 0.04)",
  "shadow-sm": "0 4px 12px -4px hsl(0 0% 0% / 0.08)",
  "shadow-md": "0 4px 6px -1px hsl(0 0% 0% / 0.1)",
  "shadow-lg": "0 10px 15px -3px hsl(0 0% 0% / 0.1)",
  "shadow-xl": "0 16px 20px -5px hsl(0 0% 0% / 0.1)",
  "shadow-2xl": "0 20px 25px -5px hsl(0 0% 0% / 0.1)",
  "shadow-3xl": "0 25px 50px -12px hsl(0 0% 0% / 0.12)",
  "blur-sm": "2px",
  "blur-md": "4px",
  "blur-lg": "7px",
  "blur-xl": "9px",
};
