import { McButton } from '../ui/mc-button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from '../ui/mc-popover';

const fields = [
  { id: 'width', label: 'Width' },
  { id: 'height', label: 'Height' },
  { id: 'depth', label: 'Depth' },
  { id: 'offset', label: 'Offset' },
] as const;

export default function McPopoverDemo() {
  return (
    <div className="relative -top-4 flex justify-center py-10">
      <Popover>
        <PopoverTrigger
          render={
            <McButton variant="secondary" size="md">
              Popover
            </McButton>
          }
        />
        <PopoverContent>
          <PopoverHeader className="mb-4">
            <PopoverTitle>Dimensions</PopoverTitle>
            <PopoverDescription>Set the dimensions for the layer.</PopoverDescription>
          </PopoverHeader>

          <div className="flex flex-col gap-2 pl-4">
            {fields.map((field) => (
              <div key={field.id} className="flex items-center gap-2">
                <label
                  htmlFor={field.id}
                  className="w-1/2 text-sm font-medium text-card-foreground"
                >
                  {field.label}
                </label>
                <input
                  id={field.id}
                  defaultValue="100%"
                  className="h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base text-foreground shadow-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                />
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
