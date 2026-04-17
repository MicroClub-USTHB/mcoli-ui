import { McSeparator } from '../ui/mc-separator';

export default function McSeparatorDemo() {
  return (
    <div className="flex max-w-sm flex-col gap-4 text-sm">
      <div className="flex flex-col gap-1.5">
        <div className="leading-none font-medium">MicroClub UI</div>
        <div className="text-muted-foreground">A simple content block separated by a divider.</div>
      </div>
      <McSeparator />
      <div>Separators help create visual rhythm and improve scannability in dense interfaces.</div>
    </div>
  );
}
