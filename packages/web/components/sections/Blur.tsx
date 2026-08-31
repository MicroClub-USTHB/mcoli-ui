function Blur() {
  const blurs = [
    { name: 'None', class: 'blur-none', var: 'blur-none' },
    { name: 'SM', class: 'blur-sm', var: 'var(--blur-sm)' },
    { name: 'MD', class: 'blur-md', var: 'var(--blur-md)' },
    { name: 'LG', class: 'blur-lg', var: 'var(--blur-lg)' },
    { name: 'XL', class: 'blur-xl', var: 'var(--blur-xl)' },
  ];

  return (
    <section className="w-full max-w-[1200px] mx-auto space-y-6 sm:space-y-8 px-4">
      <div className="space-y-2 text-center sm:text-left mb-6">
        <h2 className="header-sm md:header-md font-bold text-foreground">Element Blur</h2>
        <p className="paragraph-sm sm:paragraph-md text-muted-foreground font-dm-sans px-2 sm:px-0">
          Standard blur filter utilities for foreground elements
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {blurs.map((b) => (
          <div
            key={b.name}
            className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-border bg-surface/30 shadow-sm transition-transform duration-300"
          >
            {/* Element Container */}
            <div className="relative size-20 flex items-center justify-center border border-border/50 bg-background rounded-xl overflow-hidden shadow-sm shrink-0">
              {/* Subtle grid background to provide optical contrast for the blur */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:8px_8px] opacity-40" />

              {/* The blurred element */}
              <div className={`size-10 bg-primary rounded-full ${b.class}`} />
            </div>

            <div className="text-center space-y-1">
              <p className="text-sm font-bold text-foreground">{b.name}</p>
              <p className="text-[10px] font-mono text-muted-foreground">{b.var}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Blur;
