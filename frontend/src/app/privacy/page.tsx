import type { Metadata } from "next";
import { AmbientBackground } from "@/components/ambient-background";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How GathorDocs handles your data.",
};

export default function Page() {
  return (
    <section className="relative min-h-[80svh] pt-32 pb-24 overflow-hidden">
      <AmbientBackground />
      <div className="container relative max-w-3xl">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Privacy Policy</p>
        <h1 className="font-display text-4xl sm:text-5xl tracking-tight mt-3">
          <span className="gradient-text">Privacy Policy</span>
        </h1>
        <p className="text-xs text-muted-foreground mt-2">Last updated: today</p>

        <div className="prose prose-invert mt-10 prose-headings:font-display prose-p:text-muted-foreground max-w-none">
          <h2>Files you upload</h2>
          <p>
            Files you upload to GathorDocs are stored on ephemeral, isolated storage and
            automatically deleted 30 minutes after upload. They are never made publicly accessible.
          </p>

          <h2>Accounts</h2>
          <p>We don't have accounts. There's nothing to sign up for, and nothing to sign in to.</p>

          <h2>Telemetry</h2>
          <p>
            We log anonymized conversion telemetry — source format, target format, file size,
            duration, success or failure — to improve product quality. We do not log file contents,
            file names, or anything that could identify you.
          </p>

          <h2>Cookies</h2>
          <p>We do not set marketing cookies. We may use a single cookie to remember your theme preference.</p>

          <h2>Third parties</h2>
          <p>We do not sell, trade or share your data with third parties.</p>

          <h2>Contact</h2>
          <p>Questions? Email hello@gathordocs.com.</p>
        </div>
      </div>
    </section>
  );
}
