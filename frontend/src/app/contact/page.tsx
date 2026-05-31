import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Github } from "lucide-react";
import { AmbientBackground } from "@/components/ambient-background";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the GathorDocs team.",
};

export default function Page() {
  return (
    <section className="relative min-h-[80svh] pt-32 pb-24 overflow-hidden">
      <AmbientBackground />
      <div className="container relative max-w-2xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Contact
        </span>
        <h1 className="font-display font-bold text-5xl tracking-tight mt-3">
          <span className="gradient-text">Say hello.</span>
        </h1>
        <p className="text-muted-foreground mt-6 leading-relaxed">
          Found a bug, have a feature request, or just want to chat? We respond to everything.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 gap-4">
          <a
            href="mailto:hello@gathordocs.com"
            className="glass rounded-2xl p-6 text-left hover:shadow-[0_20px_60px_-20px_rgba(91,157,255,0.5)] transition-shadow"
          >
            <Mail className="h-5 w-5 mb-3 text-blue-600" />
            <div className="font-semibold text-foreground tracking-tight">Email</div>
            <div className="text-sm text-muted-foreground mt-1">hello@gathordocs.com</div>
          </a>
          <Link
            href="https://github.com"
            className="glass rounded-2xl p-6 text-left hover:shadow-[0_20px_60px_-20px_rgba(91,157,255,0.5)] transition-shadow"
          >
            <Github className="h-5 w-5 mb-3 text-blue-600" />
            <div className="font-semibold text-foreground tracking-tight">GitHub</div>
            <div className="text-sm text-muted-foreground mt-1">Open issues and PRs</div>
          </Link>
        </div>
      </div>
    </section>
  );
}
