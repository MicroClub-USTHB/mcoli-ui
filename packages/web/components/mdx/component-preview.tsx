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
    <div className="flex min-h-64 items-center justify-center font-dm-sans not-prose -m-4! bg-card p-4">
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
