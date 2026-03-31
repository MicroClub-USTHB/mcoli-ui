function Stroke() {
  const strokes = [
    { name: "0.5px", class: "border-[0.5px]" },
    { name: "1px", class: "border" },
    { name: "1.5px", class: "border-[1.5px]" },
    { name: "2px", class: "border-[2px]" },
  ];

  return (
    <section className="mx-auto w-full max-w-[1200px] space-y-6 px-4 sm:space-y-8">
      <div className="mb-6 space-y-2 text-center sm:text-left">
        <h2 className="header-sm md:header-md text-foreground font-bold">Stroke Widths</h2>
        <p className="paragraph-sm sm:paragraph-md text-muted-foreground font-dm-sans px-2 sm:px-0">
          Border thickness scale for component boundaries
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {strokes.map((s) => (
          <div
            key={s.name}
            className="bg-surface/50 border-border/30 flex flex-col items-center gap-4 rounded-2xl border p-6 backdrop-blur-sm"
          >
            <div
              className={`border-foreground/80 flex size-16 items-center justify-center rounded-xl bg-transparent ${s.class}`}
            >
              <div className={`border-primary/50 bg-primary/5 size-8 rounded-md ${s.class}`} />
            </div>
            <div className="space-y-1 text-center">
              <p className="text-foreground text-sm font-bold">{s.name}</p>
              <p className="text-muted-foreground font-mono text-[10px]">{s.class}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stroke;
