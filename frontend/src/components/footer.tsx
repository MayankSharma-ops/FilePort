import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const columns = [
  { title: "Convert", links: [
    { href: "/pdf-to-docx", label: "PDF to DOCX" },
    { href: "/docx-to-pdf", label: "DOCX to PDF" },
    { href: "/merge-pdf", label: "Merge PDF" },
    { href: "/compress-pdf", label: "Compress PDF" },
  ] },
  { title: "Explore", links: [
    { href: "/tools/pdf", label: "PDF tools" },
    { href: "/tools/image", label: "Image tools" },
    { href: "/tools/developer", label: "Developer tools" },
    { href: "/tools", label: "All tools" },
  ] },
  { title: "Company", links: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ] },
];

export function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t-2 border-background/20 bg-foreground text-background">
      <div className="container py-16 sm:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <Link href="/" className="inline-flex border-2 border-background text-xs font-bold uppercase tracking-[0.15em]"><span className="bg-signal px-3 py-2 text-foreground">G/</span><span className="px-3 py-2">GathorDocs</span></Link>
            <h2 className="mt-10 max-w-2xl font-display text-6xl leading-[0.85] tracking-[-0.04em] sm:text-7xl">Give every file a useful <em className="text-signal">next form.</em></h2>
            <Link href="/#convert" className="group mt-10 inline-flex items-center gap-2 border-b border-support pb-1 text-xs font-bold uppercase tracking-[0.12em] text-support">Open the converter <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => <FooterCol key={column.title} {...column} />)}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-background/20 pt-6 text-[10px] font-bold uppercase tracking-[0.1em] text-background/55">
          <span>© {new Date().getFullYear()} GathorDocs</span>
          <span>Private by design · Useful by default</span>
          <span>Files auto-delete / 30 min</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-support">{title}</div>
      <ul className="mt-5 space-y-3 text-sm text-background/60">
        {links.map((link) => <li key={link.href}><Link className="transition-colors hover:text-signal" href={link.href}>{link.label}</Link></li>)}
      </ul>
    </div>
  );
}