"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Trash2 } from "lucide-react";

const items = [
  { Icon: Lock, title: "No signup required", desc: "Drop a file. Convert. Done. Anonymous by design." },
  { Icon: Trash2, title: "30-minute auto-delete", desc: "Uploads and outputs vanish from our servers automatically." },
  { Icon: ShieldCheck, title: "Sandboxed processing", desc: "Conversions run in isolated workers with strict file size limits." },
];

export function TrustStrip() {
  return (
    <section className="relative container py-24">
      <div className="glass-strong rounded-3xl p-8 sm:p-12">
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-4"
            >
              <div className="h-10 w-10 rounded-xl glass grid place-items-center flex-shrink-0 bg-blue-50/50 border-blue-200/50 text-blue-600">
                <it.Icon className="h-4 w-4" />
              </div>
              <div>
                <div className="font-semibold text-foreground tracking-tight">{it.title}</div>
                <p className="text-sm text-muted-foreground/90 mt-1.5 leading-relaxed font-sans">{it.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
