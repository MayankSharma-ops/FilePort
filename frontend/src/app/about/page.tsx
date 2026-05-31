import type { Metadata } from "next";
import { AmbientBackground } from "@/components/ambient-background";

export const metadata: Metadata = {
  title: "About",
  description: "Why GathorDocs exists.",
};

export default function Page() {
  return (
    <section className="relative min-h-[80svh] pt-32 pb-24 overflow-hidden">
      <AmbientBackground />
      <div className="container relative max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          About
        </span>
        <h1 className="font-display font-bold text-5xl tracking-tight mt-3">
          <span className="gradient-text">Conversion shouldn't feel old.</span>
        </h1>
        <div className="prose prose-slate mt-10 prose-headings:font-display prose-headings:font-bold prose-p:text-muted-foreground max-w-none leading-relaxed">
          <p>
            GathorDocs is a privacy-first file conversion platform built around three ideas: layouts
            should survive the trip, your files belong to you, and the experience should feel
            modern.
          </p>
          <p>
            Most converter websites still feel like 2008 — banner ads, popups, watermarks, dubious
            data handling. We wanted something different. No accounts. No selling data. No
            permanent storage. Just a tool that does its job, beautifully.
          </p>
          <h2>How it works</h2>
          <p>
            We use a registry-based conversion engine on the backend. Each conversion is a small,
            isolated worker built around best-in-class libraries: LibreOffice for office documents,
            PyMuPDF and pdfplumber for PDFs, Pillow for images, Tesseract for OCR. The frontend is
            built on Next.js with Framer Motion for cinematic transitions.
          </p>
          <h2>Privacy</h2>
          <p>
            Files you upload are stored ephemerally and auto-deleted after 30 minutes. We never sell
            data, never embed third-party trackers, and only retain anonymized telemetry (format
            pair, duration, success) to improve the product.
          </p>
        </div>
      </div>
    </section>
  );
}
