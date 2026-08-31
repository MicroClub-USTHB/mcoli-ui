import { McCard } from '@/components/ui/mc-card';

function TextStyles() {
  return (
    <section className="w-full max-w-[1200px] mx-auto space-y-6 sm:space-y-8 px-4">
      <div className="space-y-2 text-center sm:text-left mb-6">
        <h2 className="header-sm md:header-md font-bold text-foreground">Typography Scale</h2>
        <p className="paragraph-sm sm:paragraph-md text-muted-foreground font-dm-sans px-2 sm:px-0">
          Precision-tracked fluid typography system
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Headers */}
        <McCard className="rounded-2xl shadow-sm flex flex-col gap-6 overflow-hidden p-6">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <h3 className="header-xs font-semibold text-foreground">Headings</h3>
            <span className="text-[10px] font-mono text-muted-foreground">header-*</span>
          </div>
          <div className="flex flex-col gap-6 text-foreground overflow-x-auto no-scrollbar">
            <div className="flex items-end gap-4 whitespace-nowrap">
              <h6 className="header-xl font-bold leading-none">Header XL</h6>
            </div>
            <div className="flex items-end gap-4 whitespace-nowrap">
              <h6 className="header-lg font-bold leading-none">Header LG</h6>
            </div>
            <div className="flex items-end gap-4 whitespace-nowrap">
              <h6 className="header-md font-bold leading-none">Header MD</h6>
            </div>
            <div className="flex items-end gap-4 whitespace-nowrap">
              <h6 className="header-sm font-bold leading-none">Header SM</h6>
            </div>
            <div className="flex items-end gap-4 whitespace-nowrap">
              <h6 className="header-xs font-bold leading-none">Header XS</h6>
            </div>
          </div>
        </McCard>

        {/* Paragraphs */}
        <McCard className="rounded-2xl shadow-sm flex flex-col gap-6 overflow-hidden p-6">
          <div className="flex items-center justify-between border-b border-border/50 pb-2">
            <h3 className="font-semibold text-foreground font-plus-jakarta-sans">Paragraphs</h3>
            <span className="text-[10px] font-mono text-muted-foreground">.paragraph-*</span>
          </div>
          <div className="flex flex-col gap-6 text-muted-foreground">
            <div className="flex items-center justify-between gap-4 border-b border-border/30 pb-3">
              <p className="paragraph-xl text-foreground">Paragraph XL</p>
              <span className="text-xs font-mono opacity-50">20px / 30px</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border/30 pb-3">
              <p className="paragraph-lg text-foreground">Paragraph LG</p>
              <span className="text-xs font-mono opacity-50">18px / 28px</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border/30 pb-3">
              <p className="paragraph-md text-foreground">Paragraph MD</p>
              <span className="text-xs font-mono opacity-50">16px / 24px</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border/30 pb-3">
              <p className="paragraph-sm text-foreground">Paragraph SM</p>
              <span className="text-xs font-mono opacity-50">14px / 20px</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="paragraph-xs text-foreground">Paragraph XS</p>
              <span className="text-xs font-mono opacity-50">12px / 18px</span>
            </div>
          </div>
        </McCard>
      </div>
    </section>
  );
}

export default TextStyles;
