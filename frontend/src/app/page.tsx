import { Hero } from "@/components/hero";
import { FeatureGrid } from "@/components/feature-grid";
import { ToolsStrip } from "@/components/tools-strip";
import { TrustStrip } from "@/components/trust-strip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <ToolsStrip />
      <TrustStrip />
    </>
  );
}
