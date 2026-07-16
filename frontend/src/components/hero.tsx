"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, LockKeyhole, Zap } from "lucide-react";
import { ConverterFlow } from "@/components/converter/flow";
import { AmbientBackground } from "@/components/ambient-background";

const reveal = {
  initial: { opacity: 0, y: 24 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.09 },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pb-24 pt-28 lg:pb-32 lg:pt-36">
      <AmbientBackground />
      <div className="container relative">
        <div className="mb-10 flex items-center justify-between border-b-2 border-foreground pb-3 text-[10px] font-bold uppercase tracking-[0.18em]">
          <span>Independent conversion desk</span>
          <span className="hidden text-muted-foreground sm:block">PDF · Documents · Images · Code</span>
        </div>

        <div className="grid items-start gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div className="relative">
            <motion.p custom={0} variants={reveal} initial="initial" animate="animate" className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-signalInk">
              <span className="h-2 w-2 bg-signal" /> Conversion without compromise
            </motion.p>
            <motion.h1 custom={1} variants={reveal} initial="initial" animate="animate" className="max-w-2xl font-display text-[clamp(4.5rem,10vw,8.75rem)] leading-[0.73] tracking-[-0.055em]">
              Files change <em className="font-normal text-signal">shape.</em>
              <span className="mt-4 block">Nothing else does.</span>
            </motion.h1>
            <motion.p custom={2} variants={reveal} initial="initial" animate="animate" className="mt-9 max-w-lg border-l-2 border-signal pl-5 text-base leading-7 text-muted-foreground sm:text-lg">
              Precise, private file conversion that keeps your layouts, tables, and type exactly where they belong.
            </motion.p>
            <motion.div custom={3} variants={reveal} initial="initial" animate="animate" className="mt-10 grid max-w-lg grid-cols-2 border-2 border-foreground bg-surface text-xs font-bold uppercase tracking-[0.08em]">
              <div className="flex items-center gap-2 border-r-2 border-foreground p-4"><Zap className="h-4 w-4 text-signalInk" /> No signup</div>
              <div className="flex items-center gap-2 p-4"><LockKeyhole className="h-4 w-4 text-signalInk" /> Auto-delete</div>
            </motion.div>
          </div>


          <motion.div custom={4} variants={reveal} initial="initial" animate="animate" className="relative lg:mt-10">
            <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
              <span>Conversion desk / Ready</span>
              <span className="flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-support ring-1 ring-foreground" /> System online</span>
            </div>
            <ConverterFlow />
            <div className="mt-5 flex items-start justify-between gap-6 text-[10px] font-bold uppercase leading-5 tracking-[0.1em] text-muted-foreground">
              <span>Max file size / 100 MB</span>
              <span className="flex items-center gap-1 text-right">Select output after upload <ArrowDownRight className="h-4 w-4 text-signalInk" /></span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}