export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export type JobStatus =
  | "queued"
  | "uploading"
  | "parsing"
  | "converting"
  | "ocr"
  | "optimizing"
  | "merging"
  | "splitting"
  | "finalizing"
  | "completed"
  | "failed";

export interface JobState {
  job_id: string;
  status: JobStatus;
  progress: number;
  stage: string;
  error?: string | null;
  download_url?: string | null;
  output_filename?: string | null;
}

export interface UploadResponse {
  job_id: string;
  filename: string;
  size: number;
  detected_format: string;
  suggested_targets: string[];
}

export async function uploadFile(file: File): Promise<UploadResponse> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${API_BASE}/api/upload`, { method: "POST", body: fd });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function startConvert(jobId: string, target: string): Promise<JobState> {
  const fd = new FormData();
  fd.append("job_id", jobId);
  fd.append("target_format", target);
  const res = await fetch(`${API_BASE}/api/convert`, { method: "POST", body: fd });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getJob(jobId: string): Promise<JobState> {
  const res = await fetch(`${API_BASE}/api/jobs/${jobId}`, { cache: "no-store" });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export function downloadUrl(jobId: string): string {
  return `${API_BASE}/api/jobs/${jobId}/download`;
}

export async function deleteJob(jobId: string): Promise<void> {
  await fetch(`${API_BASE}/api/jobs/${jobId}`, { method: "DELETE" });
}

export async function mergePdfs(files: File[]): Promise<JobState> {
  const fd = new FormData();
  files.forEach((f) => fd.append("files", f));
  const res = await fetch(`${API_BASE}/api/merge-pdf`, { method: "POST", body: fd });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
