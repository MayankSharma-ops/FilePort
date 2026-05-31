"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConverter } from "@/store/converter";
import { downloadUrl } from "@/lib/api";
import { RelatedTools } from "./related";

export function Done() {
  const job = useConverter((s) => s.job);
  const reset = useConverter((s) => s.reset);

  if (!job?.job_id) return null;
  const url = downloadUrl(job.job_id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
    >
      {/* Success burst */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(closest-side at 50% 30%, rgba(91,255,170,0.18), transparent 60%)",
        }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 1, 0.5], scale: [0.6, 1.1, 1] }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />

      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        className="relative mx-auto h-20 w-20 rounded-full glass grid place-items-center mb-6"
      >
        <Check className="h-9 w-9 text-emerald-300" />
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 0 0 rgba(91,255,170,0.5)" }}
          animate={{ boxShadow: ["0 0 0 0 rgba(91,255,170,0.5)", "0 0 0 28px rgba(91,255,170,0)"] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
      </motion.div>

      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Step 4 · Ready to download</p>
      <h2 className="font-display text-3xl sm:text-4xl mt-2 tracking-tight">Your file is ready</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
        It will auto-delete in 30 minutes. Save a copy now.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <MagneticButton>
          <a href={url} target="_blank" rel="noreferrer" className="inline-flex">
            <Button variant="glow" size="lg" className="px-10">
              <Download className="h-4 w-4" /> Download {job.output_filename ? `· ${job.output_filename}` : ""}
            </Button>
          </a>
        </MagneticButton>
        <Button variant="outline" size="lg" onClick={reset}>
          <RotateCcw className="h-4 w-4" /> Convert another
        </Button>
      </div>

      <div className="mt-12">
        <RelatedTools />
      </div>
    </motion.div>
  );
}

/** Magnetic hover wrapper. */
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      animate={pos}
      transition={{ type: "spring", stiffness: 250, damping: 18, mass: 0.4 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
        const dy = (e.clientY - (r.top + r.height / 2)) * 0.18;
        setPos({ x: dx, y: dy });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
