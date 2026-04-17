'use client';

import * as React from 'react';

import { Index } from '@/__registry__';

export const ComponentPreview: React.FC<{ name: string }> = ({ name }) => {
  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component;
    return <Component />;
  }, [name]);
  return (
    <div className="w-full overflow-hidden rounded-lg border bg-card font-dm-sans">
      <React.Suspense
        fallback={
          <div className="text-muted-foreground flex min-h-64 items-center justify-center text-sm">
            Loading...
          </div>
        }
      >
        <div className="w-full">{Preview}</div>
      </React.Suspense>
    </div>
  );
};
