function TextStyles() {
  return (
    <section className="mx-auto w-full max-w-[1200px] space-y-6 px-4 sm:space-y-8">
      <div className="mb-6 space-y-2 text-center sm:text-left">
        <h2 className="header-sm md:header-md text-foreground font-bold">Typography Scale</h2>
        <p className="paragraph-sm sm:paragraph-md text-muted-foreground font-dm-sans px-2 sm:px-0">
          Precision-tracked fluid typography system
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Headers */}
        <div className="border-border bg-card flex flex-col gap-6 overflow-hidden rounded-2xl border p-6 shadow-sm">
          <div className="border-border/50 flex items-center justify-between border-b pb-2">
            <h3 className="header-xs text-foreground font-semibold">Headings</h3>
            <span className="text-muted-foreground font-mono text-[10px]">header-*</span>
          </div>
          <div className="text-foreground no-scrollbar flex flex-col gap-6 overflow-x-auto">
            <div className="flex items-end gap-4 whitespace-nowrap">
              <h6 className="header-xl leading-none font-bold">Header XL</h6>
            </div>
            <div className="flex items-end gap-4 whitespace-nowrap">
              <h6 className="header-lg leading-none font-bold">Header LG</h6>
            </div>
            <div className="flex items-end gap-4 whitespace-nowrap">
              <h6 className="header-md leading-none font-bold">Header MD</h6>
            </div>
            <div className="flex items-end gap-4 whitespace-nowrap">
              <h6 className="header-sm leading-none font-bold">Header SM</h6>
            </div>
            <div className="flex items-end gap-4 whitespace-nowrap">
              <h6 className="header-xs leading-none font-bold">Header XS</h6>
            </div>
          </div>
        </div>

        {/* Paragraphs */}
        <div className="border-border bg-card flex flex-col gap-6 overflow-hidden rounded-2xl border p-6 shadow-sm">
          <div className="border-border/50 flex items-center justify-between border-b pb-2">
            <h3 className="text-foreground font-plus-jakarta-sans font-semibold">Paragraphs</h3>
            <span className="text-muted-foreground font-mono text-[10px]">.paragraph-*</span>
          </div>
          <div className="text-muted-foreground flex flex-col gap-6">
            <div className="border-border/30 flex items-center justify-between gap-4 border-b pb-3">
              <p className="paragraph-xl text-foreground">Paragraph XL</p>
              <span className="font-mono text-xs opacity-50">20px / 30px</span>
            </div>
            <div className="border-border/30 flex items-center justify-between gap-4 border-b pb-3">
              <p className="paragraph-lg text-foreground">Paragraph LG</p>
              <span className="font-mono text-xs opacity-50">18px / 28px</span>
            </div>
            <div className="border-border/30 flex items-center justify-between gap-4 border-b pb-3">
              <p className="paragraph-md text-foreground">Paragraph MD</p>
              <span className="font-mono text-xs opacity-50">16px / 24px</span>
            </div>
            <div className="border-border/30 flex items-center justify-between gap-4 border-b pb-3">
              <p className="paragraph-sm text-foreground">Paragraph SM</p>
              <span className="font-mono text-xs opacity-50">14px / 20px</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="paragraph-xs text-foreground">Paragraph XS</p>
              <span className="font-mono text-xs opacity-50">12px / 18px</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TextStyles;
