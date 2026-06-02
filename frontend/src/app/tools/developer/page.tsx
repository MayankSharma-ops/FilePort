import Link from "next/link";
import type { Metadata } from "next";
import { AmbientBackground } from "@/components/ambient-background";

export const metadata: Metadata = {
  title: "Developer Tools",
  description: "Quick utilities for developers.",
};

const tools = [
  { href: "/tools/developer/json", label: "JSON Formatter", desc: "Format and validate JSON" },
  { href: "/tools/developer/base64", label: "Base64 Encoder/Decoder", desc: "Encode and decode Base64" },
  { href: "/tools/developer/markdown", label: "Markdown Previewer", desc: "Live preview markdown" },
];

export default function Page() {
  return (
    <section className="relative min-h-[80svh] pt-32 pb-24 overflow-hidden">
      <AmbientBackground />
      <div className="container relative">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center">Developer tools</p>
        <h1 className="font-display font-bold text-5xl tracking-tight text-center mt-3">
          <span className="gradient-text">Built for devs.</span>
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
