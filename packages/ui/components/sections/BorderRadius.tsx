function BorderRadius() {
  const radiuses = [
    { name: "SM", class: "rounded-sm", var: "--radius-sm" },
    { name: "MD", class: "rounded-md", var: "--radius-md" },
    { name: "LG", class: "rounded-lg", var: "--radius-lg" },
    { name: "XL", class: "rounded-xl", var: "--radius-xl" },
    { name: "2XL", class: "rounded-2xl", var: "--radius-2xl" },
  ];

  return (
    <section className="mx-auto w-full max-w-[1200px] space-y-6 px-4 sm:space-y-8">
      <div className="mb-6 space-y-2 text-center sm:text-left">
        <h2 className="header-sm md:header-md text-foreground font-bold">Border Radius</h2>
        <p className="paragraph-sm sm:paragraph-md text-muted-foreground font-dm-sans px-2 sm:px-0">
          Consistent curvature mapped to CSS variables
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {radiuses.map((r) => (
          <div
            key={r.name}
            className="border-border bg-surface/50 flex flex-col items-center gap-4 rounded-2xl border p-6 shadow-sm backdrop-blur-sm"
          >
            <div
              className={`bg-primary/10 border-primary/30 flex size-16 items-center justify-center border ${r.class}`}
            >
              <div className={`bg-primary size-8 ${r.class}`} />
            </div>
            <div className="space-y-1 text-center">
              <p className="text-foreground text-sm font-bold">{r.name}</p>
              <p className="text-muted-foreground font-mono text-[10px]">{r.var}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BorderRadius;
