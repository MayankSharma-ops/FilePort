"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useConverter } from "@/store/converter";
import { getJob } from "@/lib/api";

const STAGES = [
  { id: "uploading", label: "Uploading" },
  { id: "parsing", label: "Parsing" },
  { id: "converting", label: "Converting" },
  { id: "optimizing", label: "Optimizing" },
  { id: "finalizing", label: "Finalizing" },
] as const;

function stageIndex(stage: string) {
  const map: Record<string, number> = {
    uploaded: 0, queued: 0,
    parsing: 1,
    converting: 2, ocr: 2, merging: 2, splitting: 2,
    optimizing: 3,
    finalizing: 4, completed: 4,
  };
  return map[stage] ?? 0;
}

export function Processing() {
  const job = useConverter((s) => s.job);
  const setJob = useConverter((s) => s.setJob);
  const setStep = useConverter((s) => s.setStep);
  const setError = useConverter((s) => s.setError);

  // Poll for job state
  React.useEffect(() => {
    if (!job) return;
    let stopped = false;
    const tick = async () => {
      try {
        const next = await getJob(job.job_id);
        if (stopped) return;
        setJob(next);
        if (next.status === "completed") {
          setStep("done");
          return;
        }
        if (next.status === "failed") {
          setError(next.error ?? "Conversion failed");
          return;
        }
        setTimeout(tick, 800);
      } catch (e: any) {
        setError(typeof e?.message === "string" ? e.message : "Lost connection");
      }
    };
    tick();
    return () => {
      stopped = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [job?.job_id]);

  const progress = Math.min(99, Math.max(2, job?.progress ?? 5));
  const activeIdx = stageIndex(job?.stage || job?.status || "queued");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong rounded-3xl p-10 sm:p-14 text-center relative overflow-hidden"
    >
      {/* Reactive ambient pulse */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(closest-side at 50% 50%, rgba(91,157,255,0.18), transparent 65%)",
        }}
        animate={{ opacity: [0.5, 0.95, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Step 3 · Conversion in flight
        </p>
        <h2 className="font-display text-3xl sm:text-4xl mt-2 tracking-tight">
          Converting your file
        </h2>

        {/* Concentric animated rings */}
        <div className="relative mx-auto my-12 h-44 w-44">
          <Ring radius={86} duration={6} dashArray="200 600" color="rgba(91,157,255,0.7)" />
          <Ring radius={68} duration={4} reverse dashArray="120 400" color="rgba(45,212,191,0.7)" />
          <Ring radius={50} duration={3} dashArray="60 220" color="rgba(255,255,255,0.5)" />
          <div className="absolute inset-0 grid place-items-center">
            <div className="font-display text-3xl tabular-nums">{progress}%</div>
          </div>
        </div>

        {/* Stage waveform */}
        <div className="relative max-w-lg mx-auto">
          <div className="grid grid-cols-5 gap-2">
            {STAGES.map((s, i) => (
              <div key={s.id} className="space-y-2">
                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-glow-blue to-glow-teal"
                    initial={{ width: "0%" }}
                    animate={{
                      width:
                        i < activeIdx
                          ? "100%"
                          : i === activeIdx
                          ? `${(progress % 20) * 5}%`
                          : "0%",
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div
                  className={
                    "text-[10px] tracking-widest uppercase transition-colors " +
                    (i <= activeIdx ? "text-foreground" : "text-muted-foreground/60")
                  }
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">
          Don't close this tab. We're preserving formatting and layout where we can.
        </p>
      </div>
    </motion.div>
  );
}

function Ring({
  radius,
  duration,
  reverse,
  dashArray,
  color,
}: {
  radius: number;
  duration: number;
  reverse?: boolean;
  dashArray: string;
  color: string;
}) {
  const size = radius * 2 + 8;
  return (
    <motion.svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className="absolute inset-0 m-auto"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
      style={{ filter: "drop-shadow(0 0 8px rgba(91,157,255,0.35))" }}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeDasharray={dashArray}
      />
    </motion.svg>
  );
}
