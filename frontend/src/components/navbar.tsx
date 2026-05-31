"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "PDF Tools", href: "/tools/pdf" },
  { label: "Image Tools", href: "/tools/image" },
  { label: "Developer", href: "/tools/developer" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);
  const blur = useTransform(scrollY, [0, 80], [0, 14]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <motion.div
        aria-hidden
        style={{ opacity, backdropFilter: filter, WebkitBackdropFilter: filter }}
        className="absolute inset-0 bg-background/60 border-b border-white/5"
      />
      <nav className="relative container flex items-center justify-between h-16">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="relative h-7 w-7 rounded-lg bg-gradient-to-br from-glow-blue to-glow-teal shadow-[0_0_24px_-4px_rgba(91,157,255,0.6)]">
            <span className="absolute inset-[3px] rounded-md bg-background/80 grid place-items-center text-[10px] font-display font-semibold tracking-widest">
              G
            </span>
          </span>
          <span className="font-display font-bold text-base tracking-tight text-foreground/90">GathorDocs</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-3 py-2 rounded-md text-muted-foreground hover:text-blue-600 transition-colors",
                "after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1 after:h-[1.5px]",
                "after:bg-gradient-to-r after:from-blue-600/0 after:via-blue-500/80 after:to-teal-400/0",
                "after:opacity-0 hover:after:opacity-100 after:transition-opacity"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="h-9 w-9 grid place-items-center rounded-full border border-black/10 hover:border-black/25 transition-colors text-muted-foreground hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </a>
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/#convert">Start Converting</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
