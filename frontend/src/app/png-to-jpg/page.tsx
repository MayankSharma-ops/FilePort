import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";

export const metadata: Metadata = {
  title: "PNG to JPG — Lighter Web Images",
  description: "Convert PNG images to optimized JPG.",
  alternates: { canonical: "/png-to-jpg" },
};

export default function Page() {
  return (
    <ToolPage
      title="PNG to JPG"
      subtitle="Convert · PNG → JPG"
      description="Compress PNGs into web-friendly JPGs at 92% quality. Transparent areas become white."
      supported={["PNG input", "JPG output"]}
      faqs={[
        { q: "What about transparency?", a: "JPG doesn't support transparency. We convert transparent areas to white." },
        { q: "Will I lose quality?", a: "Slight, imperceptible loss at 92% quality. Files typically shrink 4–8x." },
      ]}
      seo="PNG to JPG produces optimized JPG images for the web. Transparent regions are flattened to white. Files auto-delete after 30 minutes."
    />
  );
}
