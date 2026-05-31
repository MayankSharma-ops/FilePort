import Link from "next/link";
import type { Metadata } from "next";
import { AmbientBackground } from "@/components/ambient-background";

export const metadata: Metadata = {
  title: "PDF Tools",
  description: "Every PDF conversion and utility tool.",
};

const tools = [
  { href: "/pdf-to-docx", label: "PDF → DOCX", desc: "Editable Word documents" },
  { href: "/docx-to-pdf", label: "DOCX → PDF", desc: "Universal sharing format" },
  { href: "/merge-pdf", label: "Merge PDF", desc: "Combine multiple files" },
  { href: "/split-pdf", label: "Split PDF", desc: "One file per page" },
  { href: "/compress-pdf", label: "Compress PDF", desc: "Smaller file size" },
  { href: "/pdf-to-jpg", label: "PDF → JPG", desc: "Each page as image" },
  { href: "/jpg-to-pdf", label: "JPG → PDF", desc: "Image to document" },
];

export default function Page() {
  return (
    <section className="relative min-h-[80svh] pt-32 pb-24 overflow-hidden">
      <AmbientBackground />
      <div className="container relative">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center">PDF tools</p>
        <h1 className="font-display font-bold text-5xl tracking-tight text-center mt-3">
          <span className="gradient-text">Everything PDF.</span>
        </h1>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {tools.map((t) => (
            <Link key={t.href} href={t.href} className="glass rounded-2xl p-6 hover:shadow-[0_20px_60px_-20px_rgba(91,157,255,0.5)] transition-shadow">
              <div className="font-display text-xl">{t.label}</div>
              <div className="text-sm text-muted-foreground mt-1">{t.desc}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
