import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 mt-32">
      <div className="container py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="font-display font-bold text-lg text-foreground/90">GathorDocs</div>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs leading-relaxed">
            Premium AI-native file conversion. No signup. Files auto-delete after 30 minutes.
          </p>
        </div>
        <FooterCol title="Tools" links={[
          { href: "/pdf-to-docx", label: "PDF to DOCX" },
          { href: "/docx-to-pdf", label: "DOCX to PDF" },
          { href: "/merge-pdf", label: "Merge PDF" },
          { href: "/compress-pdf", label: "Compress PDF" },
        ]} />
        <FooterCol title="Categories" links={[
          { href: "/tools/pdf", label: "PDF Tools" },
          { href: "/tools/image", label: "Image Tools" },
          { href: "/tools/developer", label: "Developer Tools" },
          { href: "/tools", label: "All Tools" },
        ]} />
        <FooterCol title="Company" links={[
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Service" },
        ]} />
      </div>
      <div className="container pb-10 text-xs text-muted-foreground flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-6">
        <span>© {new Date().getFullYear()} GathorDocs. All rights reserved.</span>
        <span>Privacy-first by design.</span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="text-sm font-semibold text-foreground">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.href}>
            <Link className="hover:text-blue-600 transition-colors" href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
