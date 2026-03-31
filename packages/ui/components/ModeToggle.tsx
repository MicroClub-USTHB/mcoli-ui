"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent layout shift/hydration mismatch during SSR
  if (!mounted) {
    return <div className="bg-muted/50 h-7 w-12 rounded-full" />;
  }

  // We use resolvedTheme so it accurately detects Dark Mode even if set to "system"
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "focus-visible:ring-primary focus-visible:ring-offset-background relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        isDark ? "bg-primary" : "bg-muted",
      )}
    >
      <span className="sr-only">Toggle theme</span>

      {/* Sliding Thumb */}
      <span
        className={cn(
          "bg-background pointer-events-none relative inline-block h-6 w-6 rounded-full shadow ring-0 transition-transform duration-300 ease-in-out",
          isDark ? "translate-x-5" : "translate-x-0",
        )}
      >
        {/* Sun Icon (Fades out in Dark Mode) */}
        <span
          className={cn(
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-300 ease-in-out",
            isDark ? "opacity-0 duration-100 ease-out" : "opacity-100 duration-200 ease-in",
          )}
          aria-hidden="true"
        >
          <Sun className="text-muted-foreground size-3.5" />
        </span>

        {/* Moon Icon (Fades in in Dark Mode) */}
        <span
          className={cn(
            "absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-300 ease-in-out",
            isDark ? "opacity-100 duration-200 ease-in" : "opacity-0 duration-100 ease-out",
          )}
          aria-hidden="true"
        >
          <Moon className="text-primary size-3.5" />
        </span>
      </span>
    </button>
  );
}
