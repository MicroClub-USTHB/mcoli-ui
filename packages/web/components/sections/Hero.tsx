'use client';

import Link from 'next/link';
import { ArrowRight, Terminal, GitFork, Check, Copy } from 'lucide-react';
import { McButton } from '@/components/ui/mc-button';
import { McCard } from '@/components/ui/mc-card';
import { useState } from 'react';

function Hero() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText('npx mcoli-ui@latest init');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex flex-col items-center justify-center w-full overflow-hidden text-center px-4 sm:px-6">
      {/* 2026 Era Ambient Glow - Reacts to Theme Primary Color */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[800px] h-[200px] sm:h-[300px] md:h-[400px] bg-primary/20 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none -z-10 transition-colors duration-700 ease-in-out" />

      {/* Main Heading */}
      <h1 className="max-w-6xl font-extrabold header-md sm:header-lg md:header-xl xl:header-xl text-foreground mb-4 sm:mb-6 z-10">
        Ship professional themed UIs, <br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary to-primary/50">
          faster than ever
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl sm:max-w-3xl paragraph-md sm:paragraph-lg md:paragraph-xl text-muted-foreground mb-8 sm:mb-10 z-10 px-2 sm:px-0">
        Mcoli UI is a premium component registry and theming engine. Copy, paste, and customize
        accessible components directly into your applications
      </p>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-12 sm:mb-16 w-full sm:w-auto px-4 sm:px-0 z-10">
        <McButton
          nativeButton={false}
          render={
            <Link href="/docs/introduction">
              Get Started <ArrowRight className="ml-2 size-4" />
            </Link>
          }
          variant="primary"
          size="lg"
        />
        <McButton
          nativeButton={false}
          render={
            <Link
              href="https://github.com/MicroClub-USTHB/mcoli-ui"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitFork className="size-4 mr-2" /> GitHub
            </Link>
          }
          variant="secondary"
          size="lg"
        />
      </div>

      {/* High-End Terminal CLI Snippet */}
      <McCard className="max-w-lg w-full rounded-xl sm:rounded-2xl shadow-sm overflow-hidden transition-transform duration-300 z-10 p-3 sm:p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm text-foreground min-w-0">
            <Terminal size={16} className="shrink-0" />
            <span className="text-primary font-semibold truncate">npx mcoli-ui@latest init</span>
          </span>
          <button
            onClick={copyToClipboard}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent shrink-0"
          >
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </button>
        </div>
      </McCard>
    </section>
  );
}

export default Hero;
