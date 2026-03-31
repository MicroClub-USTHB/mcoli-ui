function Shadow() {
  const shadows = [
    { name: "XS", class: "shadow-xs", var: "--shadow-xs" },
    { name: "SM", class: "shadow-sm", var: "--shadow-sm" },
    { name: "MD", class: "shadow-md", var: "--shadow-md" },
    { name: "LG", class: "shadow-lg", var: "--shadow-lg" },
    { name: "XL", class: "shadow-xl", var: "--shadow-xl" },
    { name: "2XL", class: "shadow-2xl", var: "--shadow-2xl" },
    { name: "3XL", class: "shadow-3xl", var: "--shadow-3xl" },
  ];

  return (
    <section className="mx-auto w-full max-w-[1200px] space-y-6 px-4 sm:space-y-8">
      <div className="mb-6 space-y-2 text-center sm:text-left">
        <h2 className="header-sm md:header-md text-foreground font-bold">Elevation & Shadows</h2>
        <p className="paragraph-sm sm:paragraph-md text-muted-foreground font-dm-sans px-2 sm:px-0">
          Layer depth utilizing tailored box-shadow utilities
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
        {shadows.map((s) => (
          <div
            key={s.name}
            className="border-border bg-surface/30 flex flex-col items-center gap-4 rounded-2xl border p-6"
          >
            <div
              className={`bg-background border-border/50 flex size-16 items-center justify-center rounded-xl border ${s.class}`}
            >
              <span className="text-foreground text-xs font-bold">{s.name}</span>
            </div>
            <p className="text-muted-foreground w-full truncate text-center font-mono text-[10px]">{s.var}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Shadow;
