"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Image as ImageIcon, FileType, Layers } from "lucide-react";
import { useConverter } from "@/store/converter";
import { startConvert } from "@/lib/api";
import { labelFor } from "@/lib/formats";
import { Button } from "@/components/ui/button";

function iconFor(target: string) {
  if (target.includes("pdf")) return FileText;
  if (target === "docx") return FileType;
  if (["jpg", "png", "webp"].includes(target)) return ImageIcon;
  return Layers;
}

export function FormatPicker() {
  const upload = useConverter((s) => s.upload);
  const setStep = useConverter((s) => s.setStep);
  const setJob = useConverter((s) => s.setJob);
  const setError = useConverter((s) => s.setError);
  const [submitting, setSubmitting] = React.useState<string | null>(null);

  if (!upload) return null;

  const choose = async (target: string) => {
    setSubmitting(target);
    try {
      const job = await startConvert(upload.job_id, target);
      setJob(job);
      setStep("processing");
    } catch (e: any) {
      setError(typeof e?.message === "string" ? e.message : "Conversion failed to start");
    } finally {
      setSubmitting(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong rounded-3xl p-8 sm:p-10"
    >
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Step 2 · Choose output format
        </p>
        <h2 className="font-display text-2xl sm:text-3xl mt-2 tracking-tight">
          Convert{" "}
          <span className="px-2 py-1 rounded-md bg-white/[0.06] border border-white/10 font-mono text-[0.85em]">
            {upload.detected_format.toUpperCase()}
          </span>{" "}
          to…
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {upload.suggested_targets.map((t, idx) => {
          const Icon = iconFor(t);
          const meta = labelFor(t);
          return (
            <motion.button
              key={t}
              onClick={() => choose(t)}
              disabled={submitting !== null}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group relative text-left rounded-2xl glass overflow-hidden p-5 disabled:opacity-60 transition-shadow hover:shadow-[0_20px_60px_-20px_rgba(91,157,255,0.5)]"
            >
              <div
                aria-hidden
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background:
                    "radial-gradient(closest-side at 80% 0%, rgba(139,109,255,0.15), transparent 70%)",
                }}
              />
              <div className="relative flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl glass grid place-items-center">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground tracking-widest">
                    {upload.detected_format.toUpperCase()} <ArrowRight className="inline h-3 w-3 mx-1 -mt-0.5" /> {meta.name}
                  </div>
                  <div className="font-medium mt-1">{meta.name}</div>
                  <div className="text-xs text-muted-foreground">{meta.subtitle}</div>
                </div>
              </div>
              <div className="relative mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <span>{submitting === t ? "Starting…" : "Select"}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
        <span>Formatting, layout, and images are preserved when possible.</span>
        <Button variant="ghost" size="sm" onClick={() => useConverter.getState().reset()}>
          Choose another file
        </Button>
      </div>
    </motion.div>
  );
}
