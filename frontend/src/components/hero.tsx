"use client";

import { motion } from "framer-motion";
import { Lock, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { ConverterFlow } from "@/components/converter/flow";
import { AmbientBackground } from "@/components/ambient-background";

const reveal = {
  initial: { opacity: 0, y: 14, filter: "blur(10px)" },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-start pt-32 pb-24 overflow-hidden">
      <AmbientBackground />

      <motion.div
        custom={0}
        variants={reveal}
        initial="initial"
        animate="animate"
        className="container relative text-center"
      >
        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold text-blue-700 bg-blue-50/50 border border-blue-100/60 rounded-full px-4 py-1.5 shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" /> AI-native conversion · privacy first
        </span>
      </motion.div>

      <motion.h1
        custom={1}
        variants={reveal}
        initial="initial"
        animate="animate"
        className="container relative text-center mt-8 font-display font-extrabold text-5xl sm:text-7xl md:text-8xl tracking-tight text-balance leading-[0.95]"
      >
        <span className="gradient-text">Convert anything.</span>
        <br />
        <span className="text-foreground/95">Beautifully.</span>
      </motion.h1>

      <motion.p
        custom={2}
        variants={reveal}
        initial="initial"
        animate="animate"
        className="container relative max-w-2xl mt-8 text-center text-base sm:text-lg text-muted-foreground leading-relaxed text-balance"
      >
        Modern file conversion <strong className="font-semibold text-foreground">without the friction</strong>. No signup, no clutter. Layouts, fonts, and tables stay <strong className="font-semibold text-foreground">intact</strong>. Files vanish from our servers in <strong className="font-semibold text-foreground">30 minutes</strong>.
      </motion.p>

      <motion.div
        custom={3}
        variants={reveal}
        initial="initial"
        animate="animate"
        className="container relative mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground"
      >
        <Pill icon={Zap} label="Instant" />
        <Pill icon={ShieldCheck} label="Formatting preserved" />
        <Pill icon={Lock} label="Auto-deletes in 30 min" />
      </motion.div>

      <motion.div
        custom={5}
        variants={reveal}
        initial="initial"
        animate="animate"
        className="container relative mt-14"
      >
        <ConverterFlow />
      </motion.div>

      <p className="container relative text-center mt-6 text-[11px] text-muted-foreground/80">
        Files are automatically deleted for privacy.
      </p>
    </section>
  );
}

function Pill({ icon: Icon, label }: { icon: any; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-100/50 bg-blue-50/30 text-blue-700/90 px-3 py-1.5 text-xs font-semibold shadow-sm">
      <Icon className="h-3.5 w-3.5 text-blue-500" /> {label}
    </span>
  );
}
