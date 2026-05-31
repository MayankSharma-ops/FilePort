import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";

export const metadata: Metadata = {
  title: "Compress PDF — Smaller Files, Same Quality",
  description: "Reduce PDF file size without ruining your layout. Privacy-first.",
  alternates: { canonical: "/compress-pdf" },
};

export default function Page() {
  return (
    <ToolPage
      title="Compress PDF"
      subtitle="Optimize · PDF"
      description="Shrink PDFs to a fraction of their size. We use Ghostscript at the 'ebook' setting which keeps text crisp and images readable."
      supported={["PDF input", "Compressed PDF output", "Up to 100MB"]}
      faqs={[
        { q: "Will the text become blurry?", a: "No — text remains vector and crisp. We compress images to ~150 DPI which is invisible on most displays." },
        { q: "How much smaller does it get?", a: "Image-heavy PDFs typically drop 40–80%. Text-only PDFs see smaller gains since they're already efficient." },
        { q: "Is the file private?", a: "Always. We delete uploads and outputs after 30 minutes." },
      ]}
      seo="Compress PDF on GathorDocs uses Ghostscript with optimized settings to reduce file size dramatically while maintaining readability. Your file is processed in an isolated worker and removed from our servers automatically."
    />
  );
}
