'use client';

import { Toaster as SonnerComponent } from 'sonner';
import { CheckCircle2, AlertCircle } from 'lucide-react';

type ToasterProps = React.ComponentProps<typeof SonnerComponent>;

const McSonner = ({ ...props }: ToasterProps) => {
  return (
    <SonnerComponent
      className="toaster group"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            'w-97.5 h-18.5 flex items-center justify-center gap-1.5 p-4 border rounded-lg shadow-xs ',
          content: 'flex flex-col gap-1.5 justify-center',
          title: 'text-[14px] font-semibold text-[#0F172A] leading-tight',
          description: 'text-xs text-[#64748B] font-normal leading-normal',
          actionButton:
            'rounded-lg bg-[#0000BA] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-900 focus:outline-none shrink-0',
          icon: 'text-slate-600 shrink-0 h-5 w-5',
        },
      }}
      // C'EST ICI qu'on associe les icônes aux méthodes de Sonner
      icons={{
        success: <CheckCircle2 className="text-slate-700" />,
        info: <AlertCircle className="text-slate-700" />,
      }}
      {...props}
    />
  );
};

// On ré-exporte la fonction 'toast' pour pouvoir l'appeler partout
export { toast } from 'sonner';
export default McSonner;
