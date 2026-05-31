import type { Metadata } from "next";
import { AmbientBackground } from "@/components/ambient-background";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of GathorDocs.",
};

export default function Page() {
  return (
    <section className="relative min-h-[80svh] pt-32 pb-24 overflow-hidden">
      <AmbientBackground />
      <div className="container relative max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Terms of Service
        </span>
        <h1 className="font-display font-bold text-4xl sm:text-5xl tracking-tight mt-3">
          <span className="gradient-text">Terms of Service</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-2">Last updated: today</p>

        <div className="prose prose-slate mt-10 prose-headings:font-display prose-headings:font-bold prose-p:text-muted-foreground max-w-none leading-relaxed">
          <h2>Acceptable use</h2>
          <p>
            Don&apos;t upload anything illegal, malicious or that you don&apos;t have the right to convert. We
            may refuse service to abusive use of the platform.
          </p>

          <h2>No warranty</h2>
          <p>
            GathorDocs is provided &quot;as is&quot;, without warranty of any kind. While we work hard to
            preserve fidelity, complex layouts may not convert perfectly.
          </p>

          <h2>Liability</h2>
          <p>
            We are not liable for any loss or damage arising from use of this service. Always keep
            a backup of your original files.
          </p>

          <h2>Changes</h2>
          <p>We may update these terms from time to time. Material changes will be flagged on this page.</p>
        </div>
      </div>
    </section>
  );
}
