'use client';

import * as React from 'react';

import { Index } from '@/__registry__';

export const ComponentPreview: React.FC<{ name: string }> = ({ name }) => {
  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component;
    if (!Component) {
      return (
        <div className="text-muted-foreground text-sm">
          Preview component &quot;{name}&quot; was not found in registry.
        </div>
      );
    }
    return <Component />;
  }, [name]);
  return (
    <div className="relative isolate flex min-h-72 items-center justify-center overflow-hidden font-dm-sans not-prose -m-4! bg-background p-6 sm:p-10">
      <div aria-hidden className="absolute inset-0 -z-10 bg-dots opacity-60" />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -z-10 h-40 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
      />
      <React.Suspense
        fallback={
          <div className="text-muted-foreground flex min-h-64 items-center justify-center text-sm">
            Loading...
          </div>
        }
      >
        <div className="flex w-full items-center justify-center">{Preview}</div>
      </React.Suspense>
    </div>
  );
};
