"use client";

import { motion } from "framer-motion";
import { LockKeyhole, ShieldCheck, Trash2 } from "lucide-react";

const items = [
  { Icon: LockKeyhole, title: "No account trail", desc: "Convert anonymously. We do not ask for an email before doing the work." },
  { Icon: Trash2, title: "Timed deletion", desc: "Uploads and outputs are removed automatically after 30 minutes." },
  { Icon: ShieldCheck, title: "Isolated processing", desc: "Conversions run in sandboxed workers with strict file limits." },
];

export function TrustStrip() {
  return (
    <section className="container py-24 sm:py-32">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid overflow-hidden border-2 border-foreground bg-signal shadow-[10px_10px_0_var(--color-ink)] lg:grid-cols-[0.7fr_1.3fr]">
        <div className="relative min-h-80 border-b-2 border-foreground p-8 lg:border-b-0 lg:border-r-2 lg:p-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em]">Privacy protocol / Active</p>
          <div className="mt-10 font-display text-[10rem] leading-[0.65] tracking-[-0.07em] sm:text-[13rem]">30</div>
          <p className="mt-8 max-w-xs text-sm font-bold uppercase leading-6 tracking-[0.08em]">Minutes until every upload and output is gone.</p>
          <div className="absolute right-8 top-8 h-3 w-3 animate-pulse rounded-full bg-foreground" />
        </div>
        <div className="bg-surface">
          {items.map((item, index) => (
            <div key={item.title} className="grid gap-5 border-b-2 border-foreground p-7 last:border-b-0 sm:grid-cols-[42px_1fr] lg:p-10">
              <div className="grid h-10 w-10 place-items-center border-2 border-foreground bg-support"><item.Icon className="h-5 w-5" /></div>
              <div>
                <div className="flex items-center justify-between gap-4"><h3 className="font-display text-3xl">{item.title}</h3><span className="text-[9px] font-bold text-muted-foreground">0{index + 1}</span></div>
                <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}