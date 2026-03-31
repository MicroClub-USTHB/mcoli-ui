"use client";

import Link from "next/link";
import { ArrowRight, Terminal, GitFork, Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

function Hero() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText("npx mcoli-ui@latest init");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 text-center sm:px-6">
      {/* 2026 Era Ambient Glow - Reacts to Theme Primary Color */}
      <div className="bg-primary/20 pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[200px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px] transition-colors duration-700 ease-in-out sm:h-[300px] sm:w-[500px] sm:blur-[120px] md:h-[400px] md:w-[800px]" />

      {/* Main Heading */}
      <h1 className="header-md sm:header-lg md:header-xl xl:header-xl text-foreground z-10 mb-4 max-w-6xl font-extrabold sm:mb-6">
        Ship professional themed UIs, <br className="hidden sm:block" />
        <span className="from-primary via-primary to-primary/50 bg-linear-to-r bg-clip-text text-transparent">
          faster than ever
        </span>
      </h1>

      {/* Subtitle */}
      <p className="paragraph-md sm:paragraph-lg md:paragraph-xl text-muted-foreground z-10 mb-8 max-w-2xl px-2 sm:mb-10 sm:max-w-3xl sm:px-0">
        Mcoli UI is a premium component registry and theming engine. Copy, paste, and customize accessible components
        directly into your applications
      </p>

      {/* Call to Actions */}
      <div className="z-10 mb-12 flex w-full flex-col items-center gap-3 px-4 sm:mb-16 sm:w-auto sm:flex-row sm:gap-4 sm:px-0">
        <Button
          render={
            <Link href="/docs/introduction">
              Get Started <ArrowRight className="ml-2 size-4" />
            </Link>
          }
          nativeButton={false}
          size="lg"
          className="shadow-primary/20 hover:bg-primary/90 h-11 w-full px-6 text-sm shadow-xl transition-all sm:h-12 sm:w-auto sm:px-8 sm:text-base"
        />
        <Button
          render={
            <a href="https://github.com/MicroClub-USTHB/mcoli-ui" target="_blank" rel="noopener noreferrer">
              <GitFork className="mr-2 size-4" /> GitHub
            </a>
          }
          nativeButton={false}
          variant="outline"
          size="lg"
          className="border-border bg-surface/50 hover:bg-accent hover:text-accent-foreground h-11 w-full px-6 text-sm backdrop-blur-md transition-all sm:h-12 sm:w-auto sm:px-8 sm:text-base"
        />
      </div>

      {/* High-End Terminal CLI Snippet */}
      <div className="border-border bg-card text-foreground z-10 flex w-full max-w-lg flex-col items-center justify-between gap-3 overflow-hidden rounded-xl border p-3 font-mono text-xs transition-transform duration-300 sm:flex-row sm:gap-0 sm:rounded-2xl sm:p-4 sm:text-sm">
        <span className="flex items-center gap-2 sm:gap-3">
          <Terminal size={16} />
          <span className="text-primary font-semibold">npx</span> mcoli-ui@latest init
        </span>
        <button
          onClick={copyToClipboard}
          className="text-muted-foreground hover:text-foreground hover:bg-accent self-end rounded-md p-2 transition-colors sm:self-auto"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
    </section>
  );
}

export default Hero;
