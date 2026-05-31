"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, Layers, Image as ImageIcon, Scissors, Combine, Minimize2 } from "lucide-react";

const TOOLS = [
  { href: "/compress-pdf", label: "Compress PDF", desc: "Smaller files, same quality", Icon: Minimize2 },
  { href: "/merge-pdf", label: "Merge PDF", desc: "Combine multiple PDFs", Icon: Combine },
  { href: "/split-pdf", label: "Split PDF", desc: "One file per page", Icon: Scissors },
  { href: "/pdf-to-jpg", label: "PDF to JPG", desc: "Each page as image", Icon: ImageIcon },
];

export function RelatedTools() {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Related tools</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TOOLS.map((t, i) => (
          <motion.div
            key={t.href}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            whileHover={{ y: -4 }}
          >
            <Link href={t.href} className="group block glass rounded-2xl p-4 text-left hover:shadow-[0_20px_50px_-20px_rgba(91,157,255,0.45)] transition-shadow">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl glass grid place-items-center">
                  <t.Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">{t.label}</div>
                  <div className="text-[11px] text-muted-foreground">{t.desc}</div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
