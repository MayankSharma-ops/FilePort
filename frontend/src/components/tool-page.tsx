"use client";

import { motion } from "framer-motion";
import { AmbientBackground } from "./ambient-background";
import { ConverterFlow } from "./converter/flow";
import { RelatedTools } from "./converter/related";

interface FAQ {
  q: string;
  a: string;
}

export interface ToolPageProps {
  title: string;
  subtitle: string;
  description: string;
  supported: string[];
  faqs: FAQ[];
  seo: string;
}

export function ToolPage({ title, subtitle, description, supported, faqs, seo }: ToolPageProps) {
  return (
    <>
      <section className="relative min-h-[80svh] pt-32 pb-16 overflow-hidden">
        <AmbientBackground />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{subtitle}</p>
            <h1 className="font-display font-bold text-4xl sm:text-6xl tracking-tight mt-3 text-balance">
              <span className="gradient-text">{title}</span>
            </h1>
            <p className="text-muted-foreground mt-5 text-balance">{description}</p>
          </motion.div>

          <div className="mt-12">
            <ConverterFlow />
          </div>

          <p className="text-center text-[11px] text-muted-foreground/80 mt-6">
            Files are automatically deleted for privacy.
          </p>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="glass rounded-3xl p-8">
            <h2 className="font-display font-bold text-2xl">Supported formats</h2>
            <p className="text-sm text-muted-foreground mt-2">
              This tool supports the following inputs and outputs.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {supported.map((s) => (
                <span
                  key={s}
                  className="text-xs tracking-wider px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.04]"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-8">
            <h2 className="font-display font-bold text-2xl">How it works</h2>
            <ol className="mt-4 space-y-3 text-sm text-muted-foreground list-decimal list-inside">
              <li>Drop your file into the upload area above.</li>
              <li>Select your output format.</li>
              <li>We process your file in a sandboxed worker.</li>
              <li>Download the result. The file auto-deletes in 30 minutes.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-center">Frequently asked</h2>
        <div className="mt-10 max-w-2xl mx-auto divide-y divide-white/5 glass rounded-2xl">
          {faqs.map((f) => (
            <details key={f.q} className="group p-5 cursor-pointer">
              <summary className="list-none flex items-center justify-between font-medium">
                {f.q}
                <span className="text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container pb-24">
        <RelatedTools />
      </section>

      <section className="container pb-32">
        <div className="glass rounded-3xl p-8 prose prose-slate max-w-none prose-p:text-muted-foreground prose-headings:font-display prose-headings:font-bold leading-relaxed">
          <h2>About this tool</h2>
          <p>{seo}</p>
        </div>
      </section>

      {/* FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
    </>
  );
}
