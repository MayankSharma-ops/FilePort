"use client";

import { motion } from "framer-motion";
import { Braces, FileCheck2, Gauge, Layers3, ScanText, ShieldCheck } from "lucide-react";

const features = [
  { Icon: FileCheck2, title: "Layout stays put", desc: "Headings, tables, images and spacing survive the trip between formats.", note: "Fidelity / 01", className: "lg:col-span-2" },
  { Icon: ScanText, title: "Scans become editable", desc: "OCR recognizes text in scanned PDFs so you can work with it again.", note: "Recognition / 02", className: "" },
  { Icon: ShieldCheck, title: "Private by default", desc: "Files process in isolated workers and disappear automatically after 30 minutes.", note: "Privacy / 03", className: "" },
  { Icon: Gauge, title: "Built for momentum", desc: "Upload, choose an output, download. No account wall and no detour.", note: "Speed / 04", className: "lg:col-span-2" },
  { Icon: Layers3, title: "The useful formats", desc: "PDF, DOCX, JPG, PNG and WebP—the formats people actually pass around.", note: "Coverage / 05", className: "lg:col-span-2" },
  { Icon: Braces, title: "Tools for text, too", desc: "Format JSON, encode Base64 and preview Markdown without leaving the browser.", note: "Developer / 06", className: "" },
];

export function FeatureGrid() {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid gap-10 border-t-2 border-foreground pt-6 lg:grid-cols-[0.65fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow">System notes / Why it works</p>
          <h2 className="mt-6 max-w-xl font-display text-6xl leading-[0.86] tracking-[-0.04em] sm:text-7xl">The boring middle, <em className="text-signalInk">obsessed over.</em></h2>
        </div>
        <p className="max-w-xl self-end text-base leading-7 text-muted-foreground lg:justify-self-end">A converter is only good when you do not have to repair its work. GathorDocs focuses on fidelity, privacy, and getting out of your way.</p>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.article key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ delay: index * 0.05 }} className={`group relative min-h-72 overflow-hidden border-2 border-foreground bg-surface p-7 transition-transform hover:-translate-y-1 ${feature.className}`}>
            <div className="flex items-start justify-between">
              <feature.Icon className="h-7 w-7 text-signalInk" strokeWidth={1.8} />
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{feature.note}</span>
            </div>
            <div className="absolute -bottom-8 -right-2 font-display text-[9rem] leading-none text-foreground/[0.035] transition-colors group-hover:text-signal/10">{String(index + 1).padStart(2, "0")}</div>
            <div className="relative mt-20 max-w-md">
              <h3 className="font-display text-3xl leading-none">{feature.title}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{feature.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}