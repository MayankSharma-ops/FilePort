import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";

export const metadata: Metadata = {
  title: "JPG to PDF — Image to Document",
  description: "Wrap a JPG into a clean PDF.",
  alternates: { canonical: "/jpg-to-pdf" },
};

export default function Page() {
  return (
    <ToolPage
      title="JPG to PDF"
      subtitle="Convert · JPG → PDF"
      description="Create a single-page PDF from your JPG image at 150 DPI. Perfect for receipts, scans, and quick document sharing."
      supported={["JPG input", "PDF output"]}
      faqs={[
        { q: "Is image quality preserved?", a: "Yes — the image is embedded at full quality at 150 DPI." },
        { q: "Multiple images?", a: "We're working on multi-image batching. For now, convert one image at a time or use Merge PDF." },
      ]}
      seo="JPG to PDF wraps your image in a clean, shareable PDF. Useful for receipts, scans and forms."
    />
  );
}
