import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { SiteHeader } from '@/components/site/SiteHeader';
import { McButton } from '@/registry/ui/mc-button';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader stars={null} />
      <main className="docs-backdrop flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-sm font-semibold text-primary">404</p>
        <h1 className="mt-3 header-sm font-extrabold text-balance md:header-md">
          This page does not exist
        </h1>
        <p className="mt-4 max-w-md paragraph-md text-pretty text-muted-foreground">
          It may have moved or been renamed. Search the docs with ⌘K, or pick up from one of these.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <McButton nativeButton={false} size="lg" render={<Link href="/" />}>
            Back to home
          </McButton>
          <McButton
            nativeButton={false}
            size="lg"
            variant="secondary"
            icon="trailing"
            iconDefinition={<ArrowRight />}
            render={<Link href="/docs/components" />}
          >
            Browse components
          </McButton>
        </div>
      </main>
    </div>
  );
}
