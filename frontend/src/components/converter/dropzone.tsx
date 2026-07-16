"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowDown, FileUp, LockKeyhole } from "lucide-react";
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

  const handleFile = React.useCallback(async (file: File) => {
    setBusy(true);
    setStep("uploading");
    setFile(file);
    try {
      const res = await uploadFile(file);
      setUpload(res);
      setStep("format");
    } catch (error: any) {
      setError(typeof error?.message === "string" ? error.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  }, [setError, setFile, setStep, setUpload]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    accept: ACCEPT,
    multiple: false,
    maxSize: 100 * 1024 * 1024,
    onDrop: (accepted) => accepted[0] && handleFile(accepted[0]),
  });

  return (
    <motion.div
      {...(getRootProps() as any)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group relative cursor-pointer select-none border-2 border-foreground bg-surface shadow-[8px_8px_0_var(--color-ink)] transition-all", isDragActive && "-translate-x-1 -translate-y-1 shadow-[12px_12px_0_var(--color-signal)]", isDragReject && "border-red-700")}
    >
      <input {...getInputProps()} />
      <div className="absolute -top-3 left-6 border-2 border-foreground bg-support px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em]">Input / 01</div>
      <AnimatePresence>
        {isDragActive && <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} className="absolute inset-x-0 top-0 h-2 origin-left bg-signal" />}
      </AnimatePresence>

      <div className="grid gap-8 px-6 pb-7 pt-10 sm:grid-cols-[1fr_auto] sm:px-9 sm:pb-9">
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Accepts documents & images</p>
          <h2 className="font-display text-4xl leading-none tracking-tight sm:text-5xl">
            {busy ? "Uploading your file…" : isDragActive ? "Release to upload." : "Drop a file here."}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">Or click anywhere in this panel to choose one from your device.</p>
        </div>
        <motion.div animate={isDragActive ? { y: 6 } : { y: [0, 5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} className="grid h-24 w-full place-items-center border-2 border-foreground bg-signal sm:h-28 sm:w-28">
          {isDragActive ? <ArrowDown className="h-10 w-10" /> : <FileUp className="h-10 w-10" />}
        </motion.div>
      </div>


      <div className="grid border-t-2 border-foreground sm:grid-cols-[1fr_auto]">
        <div className="flex flex-wrap items-center gap-2 p-4 sm:px-7">
          {SUPPORTED.map((format) => <span key={format} className="border border-foreground/30 bg-background px-2 py-1 text-[9px] font-bold tracking-[0.12em]">{format}</span>)}
        </div>
        <div className="flex items-center gap-2 border-t-2 border-foreground bg-muted px-5 py-4 text-[9px] font-bold uppercase tracking-[0.1em] sm:border-l-2 sm:border-t-0">
          <LockKeyhole className="h-3.5 w-3.5 text-signalInk" /> Deleted after 30 min
        </div>
      </div>

      {isDragReject && (
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 border-2 border-t-0 border-red-700 bg-red-50 px-3 py-2 text-xs font-bold text-red-800">
          <AlertCircle className="h-4 w-4" /> This file type is not supported
        </div>
      )}
    </motion.div>
  );
}

export function FilePreview({ file }: { file: File }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center justify-between gap-4 border-2 border-foreground bg-surface px-5 py-4">
      <div className="min-w-0">
        <div className="truncate text-sm font-bold">{file.name}</div>
        <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">{formatBytes(file.size)} · {extOf(file.name).toUpperCase()}</div>
      </div>
    </motion.div>
  );
}