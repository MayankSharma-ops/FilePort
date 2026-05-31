import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";

export const metadata: Metadata = {
  title: "Split PDF — One File per Page",
  description: "Split a PDF into separate files per page.",
  alternates: { canonical: "/split-pdf" },
};

export default function Page() {
  return (
    <ToolPage
      title="Split PDF"
      subtitle="Tool · PDF Split"
      description="Break a multi-page PDF into individual files, one per page. You'll get a zip back."
      supported={["PDF input", "ZIP output", "One PDF per page"]}
      faqs={[
        { q: "What if the PDF has only one page?", a: "We just return the PDF as-is." },
        { q: "Is the order preserved?", a: "Yes. Files are named with their page index." },
      ]}
      seo="Split PDF uses pikepdf to extract each page as its own document and bundle them into a downloadable archive. Privacy-first."
    />
  );
}
