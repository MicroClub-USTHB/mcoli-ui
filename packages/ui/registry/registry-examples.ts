import type { Registry } from "shadcn/schema";

export const examples: Registry["items"] = [
  {
    name: "mc-button-demo",
    type: "registry:example",
    title: "MicroClub Button Demo",
    description: "Demo for MicroClub Button",
    files: [
      {
        path: "examples/mc-button-demo.tsx",
        type: "registry:example",
      },
    ],
    registryDependencies: ["https://mcoli-ui.microclub.info/r/mc-button.json"],
  },
  {
    name: "mc-input-otp-demo",
    type: "registry:example",
    title: "MicroClub Input OTP Demo",
    description: "Demo for MicroClub Input OTP",
    files: [
      {
        path: "examples/mc-input-otp-demo.tsx",
        type: "registry:example",
      },
    ],
    registryDependencies: ["https://mcoli-ui.microclub.info/r/mc-input-otp.json"],
  },

];
