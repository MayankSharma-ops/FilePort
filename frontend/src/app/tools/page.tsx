import type { Metadata } from "next";
import Link from "next/link";
import { AmbientBackground } from "@/components/ambient-background";

export const metadata: Metadata = {
  title: "All Tools",
  description: "Every conversion tool on GathorDocs.",
};

const sections = [
  {
    title: "PDF",
    tools: [
      { href: "/pdf-to-docx", label: "PDF → DOCX" },
      { href: "/docx-to-pdf", label: "DOCX → PDF" },
      { href: "/merge-pdf", label: "Merge PDF" },
      { href: "/split-pdf", label: "Split PDF" },
      { href: "/compress-pdf", label: "Compress PDF" },
      { href: "/pdf-to-jpg", label: "PDF → JPG" },
      { href: "/jpg-to-pdf", label: "JPG → PDF" },
    ],
  },
  {
    title: "Image",
    tools: [
      { href: "/png-to-jpg", label: "PNG → JPG" },
    ],
  },
  {
    title: "Developer",
    tools: [
      { href: "/tools/developer/json", label: "JSON Formatter" },
      { href: "/tools/developer/base64", label: "Base64 Encoder/Decoder" },
      { href: "/tools/developer/markdown", label: "Markdown Previewer" },
    ],
  },
];

export default function Page() {
  return (
    <section className="relative min-h-[80svh] pt-32 pb-24 overflow-hidden">
      <AmbientBackground />
      <div className="container relative">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center">All tools</p>
        <h1 className="font-display font-bold text-5xl tracking-tight text-center mt-3">
          <span className="gradient-text">Every converter, one place.</span>
        </h1>

        <div className="mt-16 space-y-12">
          {sections.map((sec) => (
            <div key={sec.title}>
              <div className="text-sm uppercase tracking-widest text-muted-foreground mb-4">{sec.title}</div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {sec.tools.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    className="glass rounded-2xl p-5 hover:shadow-[0_20px_60px_-20px_rgba(91,157,255,0.5)] transition-shadow"
                  >
                    <div className="font-display text-lg">{t.label}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
