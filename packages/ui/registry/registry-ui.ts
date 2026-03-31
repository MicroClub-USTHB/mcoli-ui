import type { Registry } from "shadcn/schema";

export const ui: Registry["items"] = [
  {
    name: "mc-button",
    type: "registry:component",
    title: "MicroClub Button",
    description: "A button component for MicroClub UI",
    files: [
      {
        path: "ui/mc-button.tsx",
        type: "registry:component",
      },
    ],
    dependencies: ["@base-ui/react"],
  },
];
