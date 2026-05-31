import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/ambient-background";

export default function NotFound() {
  return (
    <section className="relative min-h-[80svh] pt-32 pb-24 overflow-hidden grid place-items-center">
      <AmbientBackground />
      <div className="container relative text-center max-w-lg">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          404 Error
        </span>
        <h1 className="font-display font-extrabold text-5xl sm:text-7xl tracking-tight mt-3">
          <span className="gradient-text">Lost in conversion.</span>
        </h1>
        <p className="text-muted-foreground mt-5 leading-relaxed">
          That page doesn&apos;t exist. Probably converted to nothing.
        </p>
        <div className="mt-10">
          <Button asChild variant="glow" size="lg">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
