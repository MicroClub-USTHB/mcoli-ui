import { CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";

// Mapping of prefixes and steps to explicit Tailwind class names
// This ensures Tailwind JIT can scan the full strings at build time.
const colorClassMap: Record<string, Record<string | number, string>> = {
  "blue-primary": {
    50: "bg-blue-primary-50",
    100: "bg-blue-primary-100",
    200: "bg-blue-primary-200",
    300: "bg-blue-primary-300",
    400: "bg-blue-primary-400",
    500: "bg-blue-primary-500",
    600: "bg-blue-primary-600",
    700: "bg-blue-primary-700",
    800: "bg-blue-primary-800",
    900: "bg-blue-primary-900",
    950: "bg-blue-primary-950",
  },
  "purple-secondary": {
    50: "bg-purple-secondary-50",
    100: "bg-purple-secondary-100",
    200: "bg-purple-secondary-200",
    300: "bg-purple-secondary-300",
    400: "bg-purple-secondary-400",
    500: "bg-purple-secondary-500",
    600: "bg-purple-secondary-600",
    700: "bg-purple-secondary-700",
    800: "bg-purple-secondary-800",
    900: "bg-purple-secondary-900",
    950: "bg-purple-secondary-950",
  },
  gray: {
    50: "bg-gray-50",
    100: "bg-gray-100",
    200: "bg-gray-200",
    300: "bg-gray-300",
    400: "bg-gray-400",
    500: "bg-gray-500",
    600: "bg-gray-600",
    700: "bg-gray-700",
    800: "bg-gray-800",
    900: "bg-gray-900",
    950: "bg-gray-950",
    1000: "bg-gray-1000",
  },
  "gray-blue": {
    50: "bg-gray-blue-50",
    100: "bg-gray-blue-100",
    200: "bg-gray-blue-200",
    300: "bg-gray-blue-300",
    400: "bg-gray-blue-400",
    500: "bg-gray-blue-500",
    600: "bg-gray-blue-600",
    700: "bg-gray-blue-700",
    800: "bg-gray-blue-800",
    900: "bg-gray-blue-900",
    950: "bg-gray-blue-950",
    1000: "bg-gray-blue-1000",
  },
  "baby-blue": {
    50: "bg-baby-blue-50",
    100: "bg-baby-blue-100",
    200: "bg-baby-blue-200",
    300: "bg-baby-blue-300",
    400: "bg-baby-blue-400",
    500: "bg-baby-blue-500",
    600: "bg-baby-blue-600",
    700: "bg-baby-blue-700",
    800: "bg-baby-blue-800",
    900: "bg-baby-blue-900",
    950: "bg-baby-blue-950",
    1000: "bg-baby-blue-1000",
  },
  pink: {
    50: "bg-pink-50",
    100: "bg-pink-100",
    200: "bg-pink-200",
    300: "bg-pink-300",
    400: "bg-pink-400",
    500: "bg-pink-500",
    600: "bg-pink-600",
    700: "bg-pink-700",
    800: "bg-pink-800",
    900: "bg-pink-900",
    950: "bg-pink-950",
  },
  cyan: {
    50: "bg-cyan-50",
    100: "bg-cyan-100",
    200: "bg-cyan-200",
    300: "bg-cyan-300",
    400: "bg-cyan-400",
    500: "bg-cyan-500",
    600: "bg-cyan-600",
    700: "bg-cyan-700",
    800: "bg-cyan-800",
    900: "bg-cyan-900",
    950: "bg-cyan-950",
  },
  orange: {
    50: "bg-orange-50",
    100: "bg-orange-100",
    200: "bg-orange-200",
    300: "bg-orange-300",
    400: "bg-orange-400",
    500: "bg-orange-500",
    600: "bg-orange-600",
  },
  "flashy-green": {
    50: "bg-flashy-green-50",
    100: "bg-flashy-green-100",
    200: "bg-flashy-green-200",
    300: "bg-flashy-green-300",
  },
  green: {
    50: "bg-green-50",
    300: "bg-green-300",
    400: "bg-green-400",
  },
  red: {
    50: "bg-red-50",
    100: "bg-red-100",
    200: "bg-red-200",
  },
  yellow: {
    50: "bg-yellow-50",
    100: "bg-yellow-100",
    200: "bg-yellow-200",
  },
  accent: {
    "blue-50": "bg-accent-blue-50",
    "flash-50": "bg-accent-flash-50",
    "green-50": "bg-accent-green-50",
    "magenta-50": "bg-accent-magenta-50",
    "red-50": "bg-accent-red-50",
  },
};

const colorRamps = [
  {
    name: "Blue Primary",
    prefix: "blue-primary",
    steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: "Purple Secondary",
    prefix: "purple-secondary",
    steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: "Gray",
    prefix: "gray",
    steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000],
  },
  {
    name: "Gray Blue",
    prefix: "gray-blue",
    steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000],
  },
  {
    name: "Baby Blue",
    prefix: "baby-blue",
    steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950, 1000],
  },
  {
    name: "Pink",
    prefix: "pink",
    steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: "Cyan",
    prefix: "cyan",
    steps: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
  },
  {
    name: "Orange",
    prefix: "orange",
    steps: [50, 100, 200, 300, 400, 500, 600],
  },
  { name: "Flashy Green", prefix: "flashy-green", steps: [50, 100, 200, 300] },
  { name: "Green", prefix: "green", steps: [50, 300, 400] },
  { name: "Red", prefix: "red", steps: [50, 100, 200] },
  { name: "Yellow", prefix: "yellow", steps: [50, 100, 200] },
  {
    name: "Accents",
    prefix: "accent",
    isSpecial: true,
    steps: ["blue-50", "flash-50", "green-50", "magenta-50", "red-50"],
  },
];

function Colors() {
  return (
    <section className="mx-auto w-full max-w-[1200px] space-y-6 px-4 sm:space-y-8">
      <div className="mb-6 space-y-2 text-center sm:text-left">
        <h2 className="header-sm md:header-md text-foreground font-bold">Color Palette</h2>
        <p className="paragraph-sm sm:paragraph-md text-muted-foreground font-dm-sans px-2 sm:px-0">
          The comprehensive color system powering the theme engine
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Core Ramps */}
        {colorRamps.map((ramp) => (
          <div
            key={ramp.name}
            className="border-border bg-card flex flex-col overflow-hidden rounded-xl border p-4 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-foreground text-sm font-semibold">{ramp.name}</h3>
              <span className="text-muted-foreground font-mono text-[10px]">
                {ramp.isSpecial ? "accent-*-50" : `--${ramp.prefix}-*`}
              </span>
            </div>
            <div className="border-border/50 flex h-10 w-full overflow-hidden rounded-md border">
              {ramp.steps.map((step) => {
                const tailwindClass = colorClassMap[ramp.prefix][step];
                return (
                  <div
                    key={step}
                    className={`flex-1 origin-center cursor-pointer transition-transform hover:z-10 hover:scale-110 ${tailwindClass}`}
                    title={ramp.isSpecial ? `accent-${step}` : `--${ramp.prefix}-${step}`}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {/* Gradients */}
        <div className="border-border bg-card flex flex-col overflow-hidden rounded-xl border p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-foreground text-sm font-semibold">Gradients</h3>
            <span className="text-muted-foreground font-mono text-[10px]">--*-gradient</span>
          </div>
          <div className="border-border/50 flex h-10 w-full overflow-hidden rounded-md border">
            <div
              className="bg-it-gradient flex-1 origin-center cursor-pointer transition-transform hover:z-10 hover:scale-110"
              title="--it-gradient"
            />
          </div>
        </div>

        {/* Neutrals */}
        <div className="border-border bg-card flex flex-col overflow-hidden rounded-xl border p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-foreground text-sm font-semibold">Neutrals</h3>
            <span className="text-muted-foreground font-mono text-[10px]">--neutral-*</span>
          </div>
          <div className="border-border/50 flex h-10 w-full overflow-hidden rounded-md border">
            <div
              className="bg-neutral-black flex-1 origin-center cursor-pointer transition-transform hover:z-10 hover:scale-110"
              title="--neutral-black"
            />
            <div
              className="bg-neutral-white flex-1 origin-center cursor-pointer transition-transform hover:z-10 hover:scale-110"
              title="--neutral-white"
            />
          </div>
        </div>

        {/* Semantic Colors */}
        <div className="border-border bg-card flex flex-col overflow-hidden rounded-xl border p-4 shadow-sm lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-foreground text-sm font-semibold">Semantic</h3>
            <span className="text-muted-foreground font-mono text-[10px]">
              --success, --warning, --destructive, --info
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-success text-success-foreground border-success/20 flex items-center gap-2 rounded-lg border p-2">
              <CheckCircle2 className="size-3 shrink-0" />
              <span className="text-[10px] font-semibold">Success</span>
            </div>
            <div className="bg-warning text-warning-foreground border-warning/20 flex items-center gap-2 rounded-lg border p-2">
              <AlertTriangle className="size-3 shrink-0" />
              <span className="text-[10px] font-semibold">Warning</span>
            </div>
            <div className="bg-destructive text-destructive-foreground border-destructive/20 flex items-center gap-2 rounded-lg border p-2">
              <XCircle className="size-3 shrink-0" />
              <span className="text-[10px] font-semibold">Error</span>
            </div>
            <div className="bg-info text-info-foreground border-info/20 flex items-center gap-2 rounded-lg border p-2">
              <Info className="size-3 shrink-0" />
              <span className="text-[10px] font-semibold">Info</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Colors;
