import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";

export const metadata: Metadata = {
  title: "PDF to DOCX — Editable Word Documents",
  description:
    "Convert PDF to editable DOCX while preserving headings, paragraphs, tables, images and layout. OCR for scanned PDFs. No signup. Files auto-delete in 30 minutes.",
  alternates: { canonical: "/pdf-to-docx" },
  openGraph: { title: "PDF to DOCX · GathorDocs", description: "Editable Word documents from any PDF." },
};

export default function Page() {
  return (
    <ToolPage
      title="PDF to DOCX"
      subtitle="Convert · PDF → DOCX"
      description="Get an editable Microsoft Word document from any PDF. Layout, fonts, tables and images stay intact. Scanned PDFs run through OCR automatically."
      supported={["PDF input", "DOCX output", "Up to 100MB", "Layout preserved"]}
      faqs={[
        {
          q: "Will my formatting be preserved?",
          a: "Yes. Headings, paragraphs, alignment, tables and images are mapped over carefully using LibreOffice and PyMuPDF.",
        },
        {
          q: "What about scanned PDFs?",
          a: "We auto-detect scanned PDFs and run OCR via Tesseract, then assemble an editable DOCX from the recognized text.",
        },
        {
          q: "Are my files private?",
          a: "Always. We never store your files long-term. Everything you upload and the converted output are deleted automatically after 30 minutes.",
        },
        {
          q: "Is there a file size limit?",
          a: "Yes — 100MB per file by default to keep conversions fast and predictable.",
        },
      ]}
      seo="GathorDocs converts PDFs into clean, editable DOCX files in seconds. The pipeline detects whether your PDF is digital or scanned and chooses the optimal engine — native parsing for digital documents, OCR for image-based ones. Output preserves headings, paragraphs, alignment, lists, tables and embedded images so you can edit your document in Microsoft Word, Google Docs or LibreOffice without re-typing. No account, no watermark, no upsell."
    />
  );
}
