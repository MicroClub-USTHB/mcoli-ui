function Blur() {
  const blurs = [
    { name: "None", class: "blur-none", var: "blur-none" },
    { name: "SM", class: "blur-sm", var: "var(--blur-sm)" },
    { name: "MD", class: "blur-md", var: "var(--blur-md)" },
    { name: "LG", class: "blur-lg", var: "var(--blur-lg)" },
    { name: "XL", class: "blur-xl", var: "var(--blur-xl)" },
  ];

  return (
    <section className="mx-auto w-full max-w-[1200px] space-y-6 px-4 sm:space-y-8">
      <div className="mb-6 space-y-2 text-center sm:text-left">
        <h2 className="header-sm md:header-md text-foreground font-bold">Element Blur</h2>
        <p className="paragraph-sm sm:paragraph-md text-muted-foreground font-dm-sans px-2 sm:px-0">
          Standard blur filter utilities for foreground elements
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {blurs.map((b) => (
          <div
            key={b.name}
            className="border-border bg-surface/30 flex flex-col items-center gap-4 rounded-2xl border p-6 shadow-sm transition-transform duration-300 hover:scale-[1.02]"
          >
            {/* Element Container */}
            <div className="border-border/50 bg-background relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border shadow-sm">
              {/* Subtle grid background to provide optical contrast for the blur */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:8px_8px] opacity-40" />

              {/* The blurred element */}
              <div className={`bg-primary size-10 rounded-full ${b.class}`} />
            </div>

            <div className="space-y-1 text-center">
              <p className="text-foreground text-sm font-bold">{b.name}</p>
              <p className="text-muted-foreground font-mono text-[10px]">{b.var}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Blur;
