'use client';

import * as React from 'react';

import { Index } from '@/__registry__';

export const ComponentPreview: React.FC<{ name: string }> = ({ name }) => {
  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component;
    return <Component />;
  }, [name]);
  return (
    <div className="flex items-center justify-center min-h-64 font-dm-sans not-prose -m-4! bg-card p-4">
      <React.Suspense
        fallback={
          <div className="text-muted-foreground flex items-center justify-center text-sm">
            Loading...
          </div>
        }
      >
        {Preview}
      </React.Suspense>
    </div>
  );
};
