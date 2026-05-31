"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Lock, Sparkles, AlertCircle } from "lucide-react";
import { uploadFile } from "@/lib/api";
import { useConverter } from "@/store/converter";
import { extOf, formatBytes } from "@/lib/utils";
import { cn } from "@/lib/utils";

const ACCEPT = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

const SUPPORTED = ["PDF", "DOCX", "JPG", "PNG", "WEBP"];

export function Dropzone() {
  const setFile = useConverter((s) => s.setFile);
  const setUpload = useConverter((s) => s.setUpload);
  const setStep = useConverter((s) => s.setStep);
  const setError = useConverter((s) => s.setError);
  const [busy, setBusy] = React.useState(false);

  const handleFile = React.useCallback(
    async (file: File) => {
      setBusy(true);
      setStep("uploading");
      setFile(file);
      try {
        const res = await uploadFile(file);
        setUpload(res);
        setStep("format");
      } catch (e: any) {
        setError(typeof e?.message === "string" ? e.message : "Upload failed");
      } finally {
        setBusy(false);
      }
    },
    [setError, setFile, setStep, setUpload]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: ACCEPT,
    multiple: false,
    maxSize: 100 * 1024 * 1024,
    onDrop: (accepted) => accepted[0] && handleFile(accepted[0]),
  });

  return (
    <motion.div
      {...(getRootProps() as any)}
      initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative cursor-pointer select-none rounded-3xl",
        "glass-strong glow-ring",
        "px-8 sm:px-12 py-12 sm:py-16",
        "transition-transform will-change-transform",
        isDragActive && "scale-[1.015]",
        isDragReject && "ring-2 ring-red-400/50"
      )}
      style={{ transform: "translateZ(0)" }}
    >
      <input {...getInputProps()} />

      {/* Animated glow orbits */}
      <AnimatePresence>
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="pointer-events-none absolute -inset-px rounded-3xl"
            style={{
              background:
                "conic-gradient(from 0deg, rgba(91,157,255,0.0), rgba(91,157,255,0.7), rgba(139,109,255,0.7), rgba(91,157,255,0.0))",
              filter: "blur(20px)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="relative flex flex-col items-center text-center gap-5">
        <motion.div
          animate={isDragActive ? { y: -6, scale: 1.05 } : { y: [0, -4, 0] }}
          transition={
            isDragActive
              ? { duration: 0.4 }
              : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative h-16 w-16 rounded-2xl glass grid place-items-center"
        >
          <UploadCloud className="h-7 w-7 text-foreground/90" />
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(91,157,255,0.35), transparent 70%)",
              filter: "blur(20px)",
            }}
          />
        </motion.div>

        <div className="space-y-2">
          <p className="font-display text-2xl sm:text-3xl tracking-tight">
            {busy ? "Uploading…" : isDragActive ? "Drop it like it's hot" : "Drop your file to begin"}
          </p>
          <p className="text-sm text-muted-foreground">
            or <span className="text-foreground underline-offset-4 underline decoration-foreground/30">browse files</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {SUPPORTED.map((s) => (
            <span
              key={s}
              className="text-[11px] tracking-wider text-muted-foreground/80 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03]"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-4 text-[11px] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5" /> Files auto-delete after 30 min
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5" /> No signup
          </span>
        </div>

        {isDragReject && (
          <p className="text-xs text-red-400 inline-flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" /> File type not supported
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function FilePreview({ file }: { file: File }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl px-5 py-4 mt-4 flex items-center justify-between gap-4"
    >
      <div className="min-w-0">
        <div className="text-sm font-medium truncate">{file.name}</div>
        <div className="text-xs text-muted-foreground">
          {formatBytes(file.size)} · {extOf(file.name).toUpperCase()}
        </div>
      </div>
    </motion.div>
  );
}
