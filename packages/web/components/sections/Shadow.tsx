function Shadow() {
  const shadows = [
    { name: 'XS', class: 'shadow-xs', var: '--shadow-xs' },
    { name: 'SM', class: 'shadow-sm', var: '--shadow-sm' },
    { name: 'MD', class: 'shadow-md', var: '--shadow-md' },
    { name: 'LG', class: 'shadow-lg', var: '--shadow-lg' },
    { name: 'XL', class: 'shadow-xl', var: '--shadow-xl' },
    { name: '2XL', class: 'shadow-2xl', var: '--shadow-2xl' },
    { name: '3XL', class: 'shadow-3xl', var: '--shadow-3xl' },
  ];

  return (
    <section className="w-full max-w-[1200px] mx-auto space-y-6 sm:space-y-8 px-4">
      <div className="space-y-2 text-center sm:text-left mb-6">
        <h2 className="header-sm md:header-md font-bold text-foreground">Elevation & Shadows</h2>
        <p className="paragraph-sm sm:paragraph-md text-muted-foreground font-dm-sans px-2 sm:px-0">
          Layer depth utilizing tailored box-shadow utilities
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {shadows.map((s) => (
          <div
            key={s.name}
            className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-border bg-surface/30"
          >
            <div
              className={`size-16 bg-background rounded-xl flex items-center justify-center border border-border/50 shadow-foreground ${s.class}`}
            >
              <span className="text-xs font-bold text-foreground">{s.name}</span>
            </div>
            <p className="text-[10px] font-mono text-muted-foreground truncate w-full text-center">
              {s.var}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Shadow;
