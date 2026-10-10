import * as React from 'react';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';
import { Index } from '@/__registry__';

/**
 * Registry files import siblings through repo paths (`@/registry/ui/...` or `../ui/...`).
 * Show the `@/components/ui/...` path users get from `npx mcoli-ui add` instead.
 */
function toInstalledImports(code: string) {
  return code.replace(/(['"])(?:@\/registry\/|(?:\.\.\/)+)ui\//g, '$1@/components/ui/');
}

export const ComponentSource: React.FC<{ name: string }> = ({ name }) => {
  const value = Index[name]?.files[0].content;
  if (!value) {
    return null;
  }

  return <DynamicCodeBlock lang="tsx" code={toInstalledImports(value)} />;
};
