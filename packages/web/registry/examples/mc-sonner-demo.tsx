'use client';
import McSonner, { toast } from '../ui/mc-sonner';
export default function McSonnerDemo() {
  return (
    <div>
      <button
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'undo',
              onClick: () => console.log('Undo du toast simple cliqué'),
            },
          })
        }
        className="px-5 py-2.5 bg-primary text-background rounded-lg text-sm font-medium transition-all shadow-sm cursor-pointer"
      >
        Show Toast
      </button>
      <McSonner />
    </div>
  );
}
