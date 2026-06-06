'use client';
import McSonner, { toast } from '../ui/mc-sonner';

export default function McSonnerDemo() {
  return (
    <div className="p-12 flex flex-col gap-4 items-center justify-center h-screen w-screen bg-slate-50">
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
        className="px-5 py-2.5 bg-slate-900 text-white rounded-lg text-sm font-medium transition-all shadow-sm hover:bg-slate-800"
      >
        Show Simple Toast
      </button>
      <McSonner />
    </div>
  );
}
