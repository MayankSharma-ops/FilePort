import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";

export const metadata: Metadata = {
  title: "DOCX to PDF — Universal Document Sharing",
  description:
    "Convert Word DOCX to PDF with perfect formatting. No signup. Files auto-delete in 30 minutes.",
  alternates: { canonical: "/docx-to-pdf" },
};

export default function Page() {
  return (
    <ToolPage
      title="DOCX to PDF"
      subtitle="Convert · DOCX → PDF"
      description="Turn any Word document into a clean, universally readable PDF. Fonts, headings and images are preserved exactly."
      supported={["DOCX input", "PDF output", "Up to 100MB", "Formatting preserved"]}
      faqs={[
        { q: "Is the output identical to my Word document?", a: "Yes — we use LibreOffice headless rendering, which matches Microsoft Word formatting closely." },
        { q: "Are fonts embedded?", a: "Standard fonts are embedded. If your document uses unusual fonts, install them locally before exporting for best results." },
        { q: "Will tables and images survive?", a: "Yes. Tables, images, headers and footers are preserved." },
        { q: "Is signup required?", a: "Never. GathorDocs is completely anonymous and free for personal use." },
      ]}
      seo="DOCX to PDF on GathorDocs uses LibreOffice's headless engine to produce sharp, predictable PDFs from any Word document. Layouts, tables, embedded images and headers all carry over cleanly. The conversion runs in a sandboxed worker and your file is deleted automatically after 30 minutes."
    />
  );
}
