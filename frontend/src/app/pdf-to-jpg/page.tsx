import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";

export const metadata: Metadata = {
  title: "PDF to JPG — Each Page as an Image",
  description: "Convert each PDF page into a high-quality JPG image. No signup.",
  alternates: { canonical: "/pdf-to-jpg" },
};

export default function Page() {
  return (
    <ToolPage
      title="PDF to JPG"
      subtitle="Convert · PDF → JPG"
      description="Turn each page of your PDF into a sharp JPG image. Multi-page PDFs come back as a zip."
      supported={["PDF input", "JPG output", "Multi-page support"]}
      faqs={[
        { q: "What resolution are the images?", a: "We render at 160 DPI by default, which produces crisp images for screens and print." },
        { q: "Multi-page PDFs?", a: "If your PDF has multiple pages, you'll get a zip containing one JPG per page." },
        { q: "Is the file private?", a: "Yes. Files auto-delete after 30 minutes." },
      ]}
      seo="PDF to JPG renders each page using PyMuPDF at high DPI and saves it as an optimized JPG. Multi-page PDFs are returned as zip archives. Privacy-first: nothing is stored permanently."
    />
  );
}
