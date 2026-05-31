"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const tools = [
  { href: "/pdf-to-docx", title: "PDF → DOCX", desc: "Editable Word documents" },
  { href: "/docx-to-pdf", title: "DOCX → PDF", desc: "Universal sharing format" },
  { href: "/merge-pdf", title: "Merge PDF", desc: "Combine into one file" },
  { href: "/split-pdf", title: "Split PDF", desc: "Each page as its own file" },
  { href: "/compress-pdf", title: "Compress PDF", desc: "Smaller, fast to share" },
  { href: "/pdf-to-jpg", title: "PDF → JPG", desc: "Each page as image" },
  { href: "/jpg-to-pdf", title: "JPG → PDF", desc: "Stack images into a PDF" },
  { href: "/png-to-jpg", title: "PNG → JPG", desc: "Lighter, web-friendly" },
];

export function ToolsStrip() {
  return (
    <section className="relative container py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
            All tools
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-5xl tracking-tight mt-3">A converter for every job</h2>
        </div>
        <Link href="/tools" className="text-sm font-medium text-muted-foreground hover:text-blue-600 inline-flex items-center gap-1 transition-colors">
          See all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tools.map((t, i) => (
          <motion.div
            key={t.href}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.04 }}
            whileHover={{ y: -4 }}
          >
            <Link
              href={t.href}
              className="group block glass rounded-2xl p-5 hover:shadow-[0_20px_60px_-20px_rgba(91,157,255,0.45)] transition-shadow"
            >
              <div className="inline-flex items-center text-[10px] font-semibold text-blue-600 bg-blue-50/70 border border-blue-100/50 rounded-full px-2 py-0.5 tracking-wider w-fit">
                {t.title.includes(" → ") ? (
                  <>{t.title.split(" → ")[0]} &rarr; {t.title.split(" → ")[1]}</>
                ) : (
                  t.title
                )}
              </div>
              <div className="mt-3 font-display font-semibold text-lg text-foreground tracking-tight">{t.title}</div>
              <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{t.desc}</div>
              <div className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground group-hover:text-blue-600 transition-colors">
                Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
