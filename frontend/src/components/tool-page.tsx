"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";
import { AmbientBackground } from "./ambient-background";
import { ConverterFlow } from "./converter/flow";
import { RelatedTools } from "./converter/related";

interface FAQ { q: string; a: string; }
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
      <section className="relative overflow-hidden pb-24 pt-28 lg:pt-36">
        <AmbientBackground />
        <div className="container relative">
          <div className="mb-10 flex items-center justify-between border-b-2 border-foreground pb-3 text-[10px] font-bold uppercase tracking-[0.16em]">
            <span>{subtitle}</span>
            <span className="text-muted-foreground">Private · Precise · Fast</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="grid items-end gap-7 lg:grid-cols-[1fr_0.55fr]">
            <h1 className="font-display text-[clamp(4.5rem,11vw,9rem)] leading-[0.78] tracking-[-0.055em]">{title}</h1>
            <p className="border-l-2 border-signal pl-5 text-base leading-7 text-muted-foreground lg:mb-2">{description}</p>
          </motion.div>
          <div className="mt-14"><ConverterFlow /></div>
          <p className="mt-7 flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground"><ShieldCheck className="h-4 w-4 text-signalInk" /> Files are automatically deleted after 30 minutes</p>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid border-2 border-foreground bg-surface md:grid-cols-2">
          <div className="border-b-2 border-foreground p-8 md:border-b-0 md:border-r-2 lg:p-12">
            <p className="eyebrow">01 / Compatibility</p>
            <h2 className="mt-5 font-display text-4xl">Supported formats</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Inputs and outputs supported by this conversion route.</p>
            <div className="mt-7 flex flex-wrap gap-2">
              {supported.map((format) => <span key={format} className="border-2 border-foreground bg-support px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em]">{format}</span>)}
            </div>
          </div>

          <div className="p-8 lg:p-12">
            <p className="eyebrow">02 / Workflow</p>
            <h2 className="mt-5 font-display text-4xl">Four steps. That is all.</h2>
            <ol className="mt-7 space-y-4">
              {["Drop your file into the upload desk.", "Choose the output format.", "Let an isolated worker process it.", "Download before automatic deletion."].map((step, index) => (
                <li key={step} className="flex items-start gap-4 text-sm leading-6 text-muted-foreground"><span className="grid h-6 w-6 shrink-0 place-items-center border border-foreground bg-signal text-[9px] font-bold text-foreground">0{index + 1}</span>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid gap-8 lg:grid-cols-[0.45fr_1fr]">
          <div>
            <p className="eyebrow">03 / Questions</p>
            <h2 className="mt-5 font-display text-5xl leading-none">Frequently, clearly answered.</h2>
          </div>
          <div className="border-t-2 border-foreground">
            {faqs.map((faq, index) => (
              <details key={faq.q} className="group border-b-2 border-foreground">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-bold">
                  <span><span className="mr-4 text-[9px] text-signalInk">0{index + 1}</span>{faq.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center border border-foreground text-lg transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-7 pl-9 text-sm leading-7 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20"><RelatedTools /></section>

      <section className="container pb-28">
        <div className="grid gap-6 border-t-2 border-foreground pt-7 lg:grid-cols-[0.3fr_1fr]">
          <p className="eyebrow flex items-center gap-2"><Check className="h-4 w-4" /> About this tool</p>
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">{seo}</p>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })),
      }) }} />
    </>
  );
}