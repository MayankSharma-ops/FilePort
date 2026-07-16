"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV = [
  { label: "PDF tools", href: "/tools/pdf" },
  { label: "Image tools", href: "/tools/image" },
  { label: "Developer", href: "/tools/developer" },
  { label: "All tools", href: "/tools" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const background = useTransform(scrollY, [0, 60], ["oklch(0.975 0.014 82 / 0)", "oklch(0.975 0.014 82 / .94)"]);
  const [open, setOpen] = React.useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-foreground/10">
      <motion.div aria-hidden style={{ background }} className="absolute inset-0 backdrop-blur-md" />
      <nav className="container relative flex h-[72px] items-center justify-between">
        <Link href="/" className="group inline-flex items-stretch border-2 border-foreground bg-surface" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center bg-signal font-bold">G/</span>
          <span className="hidden items-center px-3 text-sm font-bold uppercase tracking-[0.12em] min-[360px]:flex">Gathor<span className="text-signalInk">Docs</span></span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV.map((item, index) => (
            <Link key={item.href} href={item.href} className="group relative text-xs font-bold uppercase tracking-[0.11em] text-muted-foreground transition-colors hover:text-foreground">
              <span className="mr-1 text-[9px] text-signalInk">0{index + 1}</span>{item.label}
              <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-signal transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/#convert">Open converter <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </Button>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={open} className="grid h-10 w-10 place-items-center border-2 border-foreground bg-surface lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="absolute inset-x-0 top-[72px] border-b-2 border-foreground bg-background p-6 shadow-[0_10px_0_oklch(var(--foreground)/0.08)] lg:hidden">
            <div className="container grid p-0">
              {NAV.map((item, index) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-foreground/20 py-4 font-display text-3xl">
                  <span>{item.label}</span><span className="font-sans text-[10px] font-bold text-signalInk">0{index + 1}</span>
                </Link>
              ))}
              <Button asChild variant="glow" size="lg" className="mt-6 sm:hidden">
                <Link href="/#convert" onClick={() => setOpen(false)}>Open converter <ArrowUpRight className="h-4 w-4" /></Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}