import type { Metadata } from "next";
import { MergePdf } from "@/components/converter/merge-pdf";
import { AmbientBackground } from "@/components/ambient-background";

export const metadata: Metadata = {
  title: "Merge PDF — Combine Files Into One",
  description: "Combine multiple PDFs into a single file. Drag, drop, done.",
  alternates: { canonical: "/merge-pdf" },
};

export default function Page() {
  return (
    <section className="relative min-h-[80svh] pt-32 pb-24 overflow-hidden">
      <AmbientBackground />
      <div className="container relative">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Tool · Merge PDF</p>
          <h1 className="font-display text-4xl sm:text-6xl tracking-tight mt-3 text-balance">
            <span className="gradient-text">Merge PDF</span>
          </h1>
          <p className="text-muted-foreground mt-5 text-balance">
            Combine multiple PDFs in any order. Pages, bookmarks and metadata are preserved.
          </p>
        </div>
        <div className="mt-12">
          <MergePdf />
        </div>
        <p className="text-center text-[11px] text-muted-foreground/80 mt-6">
          Files are automatically deleted for privacy.
        </p>
      </div>
    </section>
  );
}
