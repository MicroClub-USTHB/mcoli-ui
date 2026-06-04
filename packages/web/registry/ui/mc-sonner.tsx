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
            'w-97.5 min-h-18.5 flex items-center justify-between gap-1.5 p-4 border rounded-lg shadow-xs ',
          content: 'w-full h-full flex flex-col items-start justify-center gap-0.5',
          title: 'text-sm text-foreground max-w-66.5',
          description: 'text-sm text-muted-foreground max-w-66.5',
          actionButton: 'min-w-15.5 max-w-21.5 rounded-lg bg-primary',
          icon: 'text-slate-600 shrink-0 h-5 w-5',
        },
      }}
      icons={{
        success: <CheckCircle2 className="text-slate-700" />,
        warning: <AlertCircle className="text-slate-700" />,
        error: <AlertCircle className="text-slate-700" />,
      }}
      {...props}
    />
  );
};

export { toast } from 'sonner';
export default McSonner;
