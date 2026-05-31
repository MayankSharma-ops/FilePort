export interface FormatPair {
  source: string;
  target: string;
  label: string;
  description: string;
}

// Targets shown to the user. The backend uses some virtual targets like
// "pdf-compressed", "pdf-split" — we expose these via friendly labels.
export const FORMAT_LABELS: Record<string, { name: string; subtitle: string }> = {
  pdf: { name: "PDF", subtitle: "Portable Document" },
  docx: { name: "DOCX", subtitle: "Microsoft Word" },
  jpg: { name: "JPG", subtitle: "Compressed image" },
  png: { name: "PNG", subtitle: "Lossless image" },
  webp: { name: "WEBP", subtitle: "Modern web image" },
  txt: { name: "TXT", subtitle: "Plain text" },
  "pdf-compressed": { name: "PDF (compressed)", subtitle: "Smaller file size" },
  "pdf-split": { name: "Split PDF", subtitle: "One file per page" },
  "pdf-merged": { name: "Merged PDF", subtitle: "Single combined file" },
};

export function labelFor(target: string) {
  return FORMAT_LABELS[target] ?? { name: target.toUpperCase(), subtitle: "" };
}
