import {
  AlertCircle,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Info,
  LayoutTemplate,
  MousePointerClick,
  PanelLeftClose,
  Search,
  Settings,
  ShieldAlert,
} from "lucide-react";

export function Showcase() {
  return (
    <section className="relative mx-auto w-full max-w-[1200px] space-y-8 px-4 sm:space-y-12">
      {/* Dashed background grid (2026 Developer Aesthetic) */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] bg-[size:32px_32px] opacity-30"></div>

      <div className="space-y-4 text-center">
        <h2 className="header-sm md:header-md text-foreground font-bold">The Variable Anatomy</h2>
        <p className="paragraph-sm sm:paragraph-md md:paragraph-lg text-muted-foreground font-dm-sans mx-auto max-w-2xl px-2 sm:px-0">
          Every single semantic variable mapped. Change the theme in the navigation bar to see the entire grid adapt
          instantly with perfect contrast ratios
        </p>
      </div>

      {/* BENTO GRID: Fully responsive, explicitly labeled UI tokens */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* 1. Base UI Box */}
        <div className="border-border bg-background relative flex flex-col overflow-hidden rounded-2xl border shadow-lg">
          <div className="border-border bg-surface text-surface-foreground flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2 font-medium">
              <LayoutTemplate className="text-primary size-4" /> Base UI
            </div>
            <span className="font-mono text-[10px] opacity-50">--background & --surface</span>
          </div>
          <div className="bg-background text-foreground flex flex-1 items-center justify-center p-6">
            <div className="relative w-full">
              <Search className="text-muted-foreground absolute top-1/3 left-3 size-4 -translate-y-1/2" />
              <input
                disabled
                placeholder="Search documentation..."
                className="border-input bg-background ring-ring/50 h-10 w-full rounded-md border pr-4 pl-9 text-sm ring-2 outline-none"
              />
              <div className="mt-2 flex justify-between px-1">
                <span className="text-muted-foreground font-mono text-[10px]">--input</span>
                <span className="text-muted-foreground font-mono text-[10px]">--ring</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Action Tokens */}
        <div className="border-border bg-card flex flex-col overflow-hidden rounded-2xl border shadow-lg">
          <div className="border-border flex items-center justify-between border-b p-4">
            <div className="text-card-foreground flex items-center gap-2 font-medium">
              <MousePointerClick className="text-primary size-4" /> Action States
            </div>
          </div>
          <div className="bg-card text-card-foreground flex flex-1 flex-col justify-center gap-4 p-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <button className="bg-primary text-primary-foreground h-9 rounded-md text-sm font-medium hover:opacity-90">
                  Primary
                </button>
                <span className="text-muted-foreground text-center font-mono text-[10px]">--primary</span>
              </div>
              <div className="flex flex-col gap-1">
                <button className="bg-secondary text-secondary-foreground h-9 rounded-md text-sm font-medium hover:opacity-90">
                  Secondary
                </button>
                <span className="text-muted-foreground text-center font-mono text-[10px]">--secondary</span>
              </div>
              <div className="flex flex-col gap-1">
                <button className="bg-accent text-accent-foreground border-border h-9 rounded-md border text-sm font-medium hover:opacity-90">
                  Accent
                </button>
                <span className="text-muted-foreground text-center font-mono text-[10px]">--accent</span>
              </div>
              <div className="flex flex-col gap-1">
                <button className="bg-muted text-muted-foreground h-9 rounded-md text-sm font-medium hover:opacity-90">
                  Muted
                </button>
                <span className="text-muted-foreground text-center font-mono text-[10px]">--muted</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Semantic Feedback */}
        <div className="border-border bg-background flex flex-col overflow-hidden rounded-2xl border shadow-lg">
          <div className="border-border flex items-center justify-between border-b p-4">
            <div className="text-foreground flex items-center gap-2 font-medium">
              <ShieldAlert className="text-primary size-4" /> Semantic States
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3 p-6">
            <div className="bg-success text-success-foreground border-success/20 flex items-center gap-3 rounded-lg border p-3">
              <CheckCircle2 className="size-4" />
              <span className="flex-1 text-sm font-medium">Completed</span>
              <span className="font-mono text-[10px] opacity-70">--success</span>
            </div>
            <div className="bg-warning text-warning-foreground border-warning/20 flex items-center gap-3 rounded-lg border p-3">
              <AlertCircle className="size-4" />
              <span className="flex-1 text-sm font-medium">Warning</span>
              <span className="font-mono text-[10px] opacity-70">--warning</span>
            </div>
            <div className="bg-destructive text-destructive-foreground border-destructive/20 flex items-center gap-3 rounded-lg border p-3">
              <AlertTriangle className="size-4" />
              <span className="flex-1 text-sm font-medium">Destructive</span>
              <span className="font-mono text-[10px] opacity-70">--destructive</span>
            </div>
            <div className="bg-info text-info-foreground border-info/20 flex items-center gap-3 rounded-lg border p-3">
              <Info className="size-4" />
              <span className="flex-1 text-sm font-medium">Info</span>
              <span className="font-mono text-[10px] opacity-70">--info</span>
            </div>
          </div>
        </div>

        {/* 4. Elevations (Card vs Popover) */}
        <div className="border-border bg-background flex flex-col overflow-hidden rounded-2xl border shadow-lg lg:col-span-2">
          <div className="border-border flex items-center justify-between border-b p-4">
            <div className="text-foreground flex items-center gap-2 font-medium">
              <Settings className="text-primary size-4" /> Elevation & Surfaces
            </div>
          </div>
          <div className="bg-surface/50 grid flex-1 grid-cols-1 gap-6 p-6 sm:grid-cols-2">
            {/* Card */}
            <div className="border-border bg-card text-card-foreground flex flex-col rounded-xl border p-5 shadow-sm">
              <span className="text-muted-foreground mb-2 font-mono text-[10px]">--card & --card-foreground</span>
              <h4 className="mb-1 font-semibold">Standard Card</h4>
              <p className="text-muted-foreground mb-4 text-sm">Base elevation for standard content blocks.</p>
              <div className="bg-muted mt-auto h-8 w-full animate-pulse rounded-md" />
            </div>
            {/* Popover */}
            <div className="border-border bg-popover text-popover-foreground z-10 flex scale-105 flex-col rounded-xl border p-5 shadow-2xl">
              <span className="text-muted-foreground mb-2 font-mono text-[10px]">--popover & --popover-foreground</span>
              <h4 className="mb-1 flex items-center justify-between font-semibold">
                Dropdown Menu <ChevronRight className="size-4" />
              </h4>
              <p className="mb-4 text-sm opacity-80">Highest elevation for floating elements.</p>
              <div className="mt-auto space-y-2">
                <div className="bg-accent h-8 w-full rounded-md" />
              </div>
            </div>
          </div>
        </div>

        {/* 5. Data Viz & Sidebar */}
        <div className="border-border bg-card flex flex-col overflow-hidden rounded-2xl border shadow-lg">
          <div className="border-border flex items-center justify-between border-b p-4">
            <div className="text-card-foreground flex items-center gap-2 font-medium">
              <BarChart3 className="text-primary size-4" /> Data & Sidebar
            </div>
          </div>

          {/* Charts Row */}
          <div className="border-border border-b p-5">
            <span className="text-muted-foreground mb-2 block font-mono text-[10px]">--chart-1 to --chart-5</span>
            <div className="flex h-20 items-end justify-between gap-2">
              {["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"].map(
                (color, i) => (
                  <div
                    key={i}
                    className="w-full rounded-t-md transition-opacity hover:opacity-80"
                    style={{ backgroundColor: color, height: `${40 + i * 15}%` }}
                  />
                ),
              )}
            </div>
          </div>

          {/* Sidebar Row */}
          <div className="bg-sidebar text-sidebar-foreground flex flex-1 flex-col gap-3 p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] opacity-50">--sidebar (bg & text)</span>
              <PanelLeftClose className="size-4 opacity-50" />
            </div>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex items-center gap-2 rounded p-2 text-sm font-medium">
              <div className="bg-background/20 size-4 rounded-sm" /> --sidebar-primary
            </div>
            <div className="bg-sidebar-accent text-sidebar-accent-foreground border-sidebar-border ring-sidebar-ring flex items-center gap-2 rounded border p-2 text-sm font-medium ring-1">
              <div className="bg-sidebar-foreground/20 size-4 rounded-sm" /> --sidebar-accent
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
