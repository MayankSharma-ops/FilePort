"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const tools = [
  { href: "/pdf-to-docx", code: "01", title: "PDF → DOCX", desc: "Make documents editable" },
  { href: "/docx-to-pdf", code: "02", title: "DOCX → PDF", desc: "Share without surprises" },
  { href: "/merge-pdf", code: "03", title: "Merge PDF", desc: "Bring every page together" },
  { href: "/split-pdf", code: "04", title: "Split PDF", desc: "One page, one file" },
  { href: "/compress-pdf", code: "05", title: "Compress PDF", desc: "Less weight, same clarity" },
  { href: "/pdf-to-jpg", code: "06", title: "PDF → JPG", desc: "Turn pages into images" },
  { href: "/jpg-to-pdf", code: "07", title: "JPG → PDF", desc: "Make images portable" },
  { href: "/png-to-jpg", code: "08", title: "PNG → JPG", desc: "Lighter web images" },
];

export function ToolsStrip() {
  return (
    <section className="bg-foreground py-24 text-background sm:py-32">
      <div className="container">
        <div className="grid gap-8 border-b border-background/30 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-support">Conversion directory / 08 tools</p>
            <h2 className="mt-5 max-w-3xl font-display text-6xl leading-[0.88] tracking-[-0.04em] sm:text-8xl">Pick a route.<br /><em className="text-signal">Move your file.</em></h2>
          </div>
          <Link href="/tools" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-background hover:text-support">Browse the full desk <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
        </div>

        <div>
          {tools.map((tool, index) => (
            <motion.div key={tool.href} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.035 }}>
              <Link href={tool.href} className="group grid items-center gap-3 border-b border-background/20 py-5 transition-colors hover:bg-background hover:px-4 hover:text-foreground sm:grid-cols-[48px_1fr_1fr_auto]">
                <span className="text-[10px] font-bold text-signal group-hover:text-signal">/{tool.code}</span>
                <span className="font-display text-3xl leading-none sm:text-4xl">{tool.title}</span>
                <span className="hidden text-sm text-background/55 group-hover:text-muted-foreground sm:block">{tool.desc}</span>
                <ArrowUpRight className="h-5 w-5 justify-self-end transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}