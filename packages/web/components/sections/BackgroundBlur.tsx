function BackgroundBlur() {
  const blurs = [
    { name: 'None', class: 'backdrop-blur-none', var: 'blur-none' },
    { name: 'SM', class: 'backdrop-blur-sm', var: 'var(--blur-sm)' },
    { name: 'MD', class: 'backdrop-blur-md', var: 'var(--blur-md)' },
    { name: 'LG', class: 'backdrop-blur-lg', var: 'var(--blur-lg)' },
    { name: 'XL', class: 'backdrop-blur-xl', var: 'var(--blur-xl)' },
  ];

  return (
    <section className="w-full max-w-[1200px] mx-auto space-y-6 sm:space-y-8 px-4">
      <div className="space-y-2 text-center sm:text-left mb-6">
        <h2 className="header-sm md:header-md font-bold text-foreground">Background Blur</h2>
        <p className="paragraph-sm sm:paragraph-md text-muted-foreground font-dm-sans px-2 sm:px-0">
          Frosted glassmorphism utilities for surfaces and overlays
        </p>
      </div>

      {/* The Staging Area */}
      <div className="relative w-full rounded-2xl border border-border shadow-sm bg-background overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-center justify-center p-4 sm:p-10">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 z-0" />

        {/* Vivid forms placed UNDER the glass cards so the blur is clearly visible */}
        <div className="absolute top-1/2 left-[10%] -translate-y-1/2 w-44 h-44 sm:w-60 sm:h-60 lg:w-72 lg:h-72 rounded-full bg-primary shadow-2xl z-0" />
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-44 h-44 sm:w-56 sm:h-56 lg:w-72 lg:h-72 rounded-3xl bg-secondary rotate-12 shadow-2xl z-0" />
        <div className="absolute top-1/2 left-0 w-full h-16 sm:h-20 bg-accent -translate-y-1/2 -rotate-3 opacity-90 z-0" />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 w-full relative z-10">
          {blurs.map((b) => (
            <div
              key={b.name}
              className={`flex flex-col items-center justify-center p-5 sm:p-7 lg:p-9 rounded-xl border border-border/50 bg-background/40 shadow-2xl backdrop-saturate-150 transition-transform duration-300 ${b.class}`}
            >
              {/* Inner Pill for Text Legibility */}
              <div className="flex flex-col items-center gap-1 bg-background/80 px-3 py-2 sm:px-4 sm:py-2 rounded-lg border border-border/50 shadow-sm">
                <p className="text-xs sm:text-sm font-bold text-foreground">{b.name}</p>
                <p className="text-[8px] sm:text-[10px] font-mono text-muted-foreground">{b.var}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BackgroundBlur;
