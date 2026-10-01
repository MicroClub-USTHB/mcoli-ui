export function Stats({ componentCount }: { componentCount: number }) {
  const stats = [
    { value: String(componentCount), label: 'Components', hint: 'built on Base UI' },
    { value: '5', label: 'Themes', hint: 'one per department' },
    { value: '300+', label: 'Design tokens', hint: 'light and dark' },
    { value: '1', label: 'Command', hint: 'to ship it all' },
  ];

  return (
    <section aria-label="mcoli-ui at a glance" className="relative pt-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <dl className="grid grid-cols-2 overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur md:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={[
                'flex flex-col gap-1 p-6 md:p-8',
                i % 2 === 1 ? 'border-l border-border' : '',
                i >= 2 ? 'border-t border-border md:border-t-0' : '',
                i === 2 ? 'md:border-l' : '',
              ].join(' ')}
            >
              <dt className="order-2 text-sm font-semibold text-foreground">{s.label}</dt>
              <dd className="order-1 font-plus-jakarta-sans text-4xl font-extrabold tracking-tight text-foreground md:text-5xl">
                {s.value}
              </dd>
              <dd className="order-3 text-xs text-muted-foreground">{s.hint}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
