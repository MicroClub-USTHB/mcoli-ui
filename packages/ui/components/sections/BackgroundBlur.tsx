function BackgroundBlur() {
  const blurs = [
    { name: "None", class: "backdrop-blur-none", var: "blur-none" },
    { name: "SM", class: "backdrop-blur-sm", var: "var(--blur-sm)" },
    { name: "MD", class: "backdrop-blur-md", var: "var(--blur-md)" },
    { name: "LG", class: "backdrop-blur-lg", var: "var(--blur-lg)" },
    { name: "XL", class: "backdrop-blur-xl", var: "var(--blur-xl)" },
  ];

  return (
    <section className="mx-auto w-full max-w-[1200px] space-y-6 px-4 sm:space-y-8">
      <div className="mb-6 space-y-2 text-center sm:text-left">
        <h2 className="header-sm md:header-md text-foreground font-bold">Background Blur</h2>
        <p className="paragraph-sm sm:paragraph-md text-muted-foreground font-dm-sans px-2 sm:px-0">
          Frosted glassmorphism utilities for surfaces and overlays
        </p>
      </div>

      {/* The Staging Area */}
      <div className="border-border bg-background relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-2xl border p-6 shadow-sm sm:p-10">
        {/* Grid Pattern */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40" />

        {/* Top Left: Primary Circle */}
        <div className="bg-primary absolute -top-10 -left-10 z-0 h-64 w-64 rounded-full shadow-lg sm:h-80 sm:w-80" />

        {/* Bottom Right: Secondary Rectangle */}
        <div className="bg-secondary absolute -right-10 -bottom-10 z-0 h-64 w-64 rotate-12 rounded-3xl shadow-lg sm:h-80 sm:w-80" />

        {/* Center Stripe: Accent */}
        <div className="bg-accent absolute top-1/2 left-0 z-0 h-16 w-full -translate-y-1/2 -rotate-3" />

        <div className="relative z-10 grid w-full grid-cols-2 gap-4 md:grid-cols-5 lg:gap-6">
          {blurs.map((b) => (
            <div
              key={b.name}
              className={`border-border/40 bg-background/20 flex flex-col items-center justify-center rounded-xl border p-6 shadow-2xl transition-transform duration-300 hover:scale-105 sm:p-8 ${b.class}`}
            >
              {/* Inner Pill for Text Legibility */}
              <div className="bg-background/80 border-border/50 flex flex-col items-center gap-1 rounded-lg border px-4 py-2 shadow-sm">
                <p className="text-foreground text-sm font-bold">{b.name}</p>
                <p className="text-muted-foreground font-mono text-[10px]">{b.var}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BackgroundBlur;
