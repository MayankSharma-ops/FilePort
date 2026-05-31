import { create } from "zustand";
import type { JobState, UploadResponse } from "@/lib/api";

export type Step = "idle" | "uploading" | "format" | "processing" | "done" | "error";

interface ConverterStore {
  step: Step;
  file: File | null;
  upload: UploadResponse | null;
  job: JobState | null;
  errorMessage: string | null;

  setFile: (file: File | null) => void;
  setStep: (step: Step) => void;
  setUpload: (u: UploadResponse | null) => void;
  setJob: (j: JobState | null) => void;
  setError: (msg: string | null) => void;
  reset: () => void;
}

export const useConverter = create<ConverterStore>((set) => ({
  step: "idle",
  file: null,
  upload: null,
  job: null,
  errorMessage: null,

  setFile: (file) => set({ file }),
  setStep: (step) => set({ step }),
  setUpload: (upload) => set({ upload }),
  setJob: (job) => set({ job }),
  setError: (errorMessage) => set({ errorMessage, step: errorMessage ? "error" : "idle" }),
  reset: () => set({ step: "idle", file: null, upload: null, job: null, errorMessage: null }),
}));
