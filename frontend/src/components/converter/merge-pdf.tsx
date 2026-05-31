"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X, Combine, Lock, Download, RotateCcw, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mergePdfs, downloadUrl, type JobState } from "@/lib/api";
import { formatBytes } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function MergePdf() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [busy, setBusy] = React.useState(false);
  const [job, setJob] = React.useState<JobState | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const onDrop = React.useCallback((accepted: File[]) => {
    setFiles((prev) => [...prev, ...accepted]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"] },
    multiple: true,
  });

  const remove = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const move = (idx: number, dir: -1 | 1) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = idx + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[idx], next[target]] = [next[target], next[idx]];
      return next;
    });
  };

  const submit = async () => {
    if (files.length < 2) return;
    setBusy(true);
    setError(null);
    try {
      const res = await mergePdfs(files);
      setJob(res);
      if (res.status === "failed") setError(res.error ?? "Merge failed");
    } catch (e: any) {
      setError(typeof e?.message === "string" ? e.message : "Merge failed");
    } finally {
      setBusy(false);
    }
  };

  const reset = () => {
    setFiles([]);
    setJob(null);
    setError(null);
  };

  if (job?.status === "completed" && job.job_id) {
    return (
      <div className="glass-strong rounded-3xl p-12 text-center max-w-3xl mx-auto">
        <div className="mx-auto h-16 w-16 rounded-full glass grid place-items-center mb-5">
          <Combine className="h-7 w-7 text-emerald-300" />
        </div>
        <h2 className="font-display text-3xl">Merged and ready</h2>
        <p className="text-sm text-muted-foreground mt-2">{job.output_filename}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={downloadUrl(job.job_id)} target="_blank" rel="noreferrer">
            <Button variant="glow" size="lg">
              <Download className="h-4 w-4" /> Download
            </Button>
          </a>
          <Button variant="outline" size="lg" onClick={reset}>
            <RotateCcw className="h-4 w-4" /> Merge another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div
        {...(getRootProps() as any)}
        className={cn(
          "glass-strong glow-ring rounded-3xl px-8 py-10 cursor-pointer text-center select-none",
          isDragActive && "scale-[1.01]"
        )}
      >
        <input {...getInputProps()} />
        <div className="mx-auto h-14 w-14 rounded-2xl glass grid place-items-center mb-4">
          <UploadCloud className="h-6 w-6" />
        </div>
        <p className="font-display text-xl">Add PDFs to merge</p>
        <p className="text-xs text-muted-foreground mt-1">
          Drop files here or click to browse · 2+ files required
        </p>
      </div>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass rounded-2xl mt-5 divide-y divide-white/5"
          >
            {files.map((f, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4">
                <button
                  className="text-muted-foreground hover:text-foreground"
                  onClick={() => move(idx, -1)}
                  aria-label="Move up"
                >
                  <GripVertical className="h-4 w-4" />
                </button>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{f.name}</div>
                  <div className="text-xs text-muted-foreground">{formatBytes(f.size)}</div>
                </div>
                <span className="text-xs text-muted-foreground">{idx + 1}</span>
                <button
                  className="h-8 w-8 grid place-items-center rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5"
                  onClick={() => remove(idx)}
                  aria-label="Remove"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-xs text-red-400 mt-4 text-center">{error}</p>}

      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs text-muted-foreground inline-flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" /> Auto-deletes after 30 min
        </span>
        <div className="flex gap-2">
          {files.length > 0 && (
            <Button variant="ghost" onClick={reset}>
              Clear
            </Button>
          )}
          <Button variant="glow" disabled={files.length < 2 || busy} onClick={submit}>
            <Combine className="h-4 w-4" /> {busy ? "Merging…" : `Merge ${files.length || ""}`}
          </Button>
        </div>
      </div>
    </div>
  );
}
