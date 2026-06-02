"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/ambient-background";

const SAMPLE = `# GathorDocs

Live **markdown** preview, no dependencies.

## Features
- Headings, **bold**, *italics*, \`inline code\`
- [Links](https://gathordocs.com)
- Lists and quotes

> Privacy-first by design.

\`\`\`
const x = 42;
\`\`\`
`;

/** Tiny zero-dependency markdown renderer. Good enough for previews. */
function renderMarkdown(src: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const lines = src.split("\n");
  const out: string[] = [];
  let inCode = false;
  let inList = false;
  let inQuote = false;

  const closeList = () => { if (inList) { out.push("</ul>"); inList = false; } };
  const closeQuote = () => { if (inQuote) { out.push("</blockquote>"); inQuote = false; } };

  for (const raw of lines) {
    if (raw.startsWith("```")) {
      closeList(); closeQuote();
      if (!inCode) { out.push("<pre><code>"); inCode = true; }
      else { out.push("</code></pre>"); inCode = false; }
      continue;
    }
    if (inCode) { out.push(escape(raw)); continue; }

    let line = raw;
    if (/^\s*$/.test(line)) { closeList(); closeQuote(); out.push(""); continue; }

    if (line.startsWith("> ")) {
      closeList();
      if (!inQuote) { out.push("<blockquote>"); inQuote = true; }
      line = line.slice(2);
    } else closeQuote();

    const heading = line.match(/^(#{1,6})\s+(.*)$/);
    if (heading) {
      closeList();
      out.push(`<h${heading[1].length}>${inline(heading[2])}</h${heading[1].length}>`);
      continue;
    }

    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList) { out.push("<ul>"); inList = true; }
      out.push(`<li>${inline(line.slice(2))}</li>`);
      continue;
    } else closeList();

    out.push(`<p>${inline(line)}</p>`);
  }

  if (inCode) out.push("</code></pre>");
  closeList(); closeQuote();
  return out.join("\n");

  function inline(s: string) {
    s = escape(s);
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
    return s;
  }
}

export default function Page() {
  const [src, setSrc] = React.useState(SAMPLE);
  const html = React.useMemo(() => renderMarkdown(src), [src]);

  return (
    <section className="relative min-h-[80svh] pt-32 pb-24 overflow-hidden">
      <AmbientBackground />
      <div className="container relative max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Developer · Markdown</p>
          <h1 className="font-display text-4xl sm:text-6xl tracking-tight mt-3">
            <span className="gradient-text">Markdown Previewer</span>
          </h1>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mt-12">
          <div className="glass-strong rounded-2xl overflow-hidden">
            <div className="px-4 py-2 text-xs text-muted-foreground border-b border-white/5">Markdown</div>
            <textarea
              value={src}
              onChange={(e) => setSrc(e.target.value)}
              spellCheck={false}
              className="w-full h-[480px] bg-transparent px-4 py-3 font-mono text-xs leading-relaxed outline-none resize-none"
            />
          </div>
          <div className="glass-strong rounded-2xl overflow-hidden">
            <div className="px-4 py-2 text-xs text-muted-foreground border-b border-white/5">Preview</div>
            <div
              className="px-6 py-5 h-[480px] overflow-auto prose prose-invert max-w-none prose-headings:font-display prose-p:text-muted-foreground prose-a:text-foreground"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
