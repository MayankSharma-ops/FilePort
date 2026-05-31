"use client";

import { motion } from "framer-motion";
import { Lock, Zap, Sparkles, FileCheck, Cpu, Shapes, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// 1. Layout Mockup
const LayoutMockup = () => (
  <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden">
    <div className="flex gap-4 items-center">
      {/* Left File: PDF */}
      <div className="w-20 h-28 bg-white rounded-lg shadow-md border border-slate-100 p-2 flex flex-col gap-1.5 relative transition-transform">
        <div className="text-[6px] font-bold text-red-500 uppercase">PDF</div>
        <div className="h-1 w-8 bg-slate-300 rounded" />
        <div className="h-1 w-12 bg-slate-200 rounded" />
        <div className="flex gap-1 mt-1">
          <div className="h-6 w-6 bg-blue-50 rounded flex-shrink-0" />
          <div className="flex flex-col gap-1 w-full">
            <div className="h-1 w-full bg-slate-200 rounded" />
            <div className="h-1 w-2/3 bg-slate-200 rounded" />
          </div>
        </div>
        <div className="h-1 w-full bg-slate-200 rounded mt-1" />
      </div>
      
      {/* Arrow */}
      <div className="text-blue-500 font-bold animate-pulse">&rarr;</div>

      {/* Right File: DOCX */}
      <div className="w-20 h-28 bg-white rounded-lg shadow-md border border-slate-100 p-2 flex flex-col gap-1.5 relative transition-transform">
        <div className="text-[6px] font-bold text-blue-500 uppercase">DOCX</div>
        <div className="h-1 w-8 bg-slate-300 rounded" />
        <div className="h-1 w-12 bg-slate-200 rounded" />
        <div className="flex gap-1 mt-1">
          <div className="h-6 w-6 bg-blue-50 rounded flex-shrink-0" />
          <div className="flex flex-col gap-1 w-full">
            <div className="h-1 w-full bg-slate-200 rounded" />
            <div className="h-1 w-2/3 bg-slate-200 rounded" />
          </div>
        </div>
        <div className="h-1 w-full bg-slate-200 rounded mt-1" />
        {/* Checkmark */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-blue-500 text-[6px] text-white items-center justify-center font-bold">✓</span>
        </span>
      </div>
    </div>
  </div>
);

// 2. Engine Aware Mockup
const EngineMockup = () => (
  <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden">
    <div className="relative flex flex-col items-center gap-2.5 w-full">
      <div className="flex gap-2 items-center justify-center w-full">
        <div className="px-1.5 py-0.5 text-[8px] font-mono bg-slate-100 border border-slate-200 rounded text-slate-600">
          Scanned PDF
        </div>
        <div className="text-slate-400 text-[10px]">&rarr;</div>
        <div className="px-1.5 py-0.5 text-[8px] font-mono bg-blue-50 border border-blue-200 rounded text-blue-600 font-semibold animate-pulse">
          OCR Pipeline
        </div>
        <div className="text-slate-400 text-[10px]">&rarr;</div>
        <div className="px-1.5 py-0.5 text-[8px] font-mono bg-emerald-50 border border-emerald-200 rounded text-emerald-600 font-semibold">
          Searchable PDF
        </div>
      </div>
      <div className="w-40 h-6 bg-slate-100/50 border border-dashed border-slate-200 rounded flex items-center justify-center text-[8px] text-slate-400 font-medium">
        Native parser fallback active
      </div>
    </div>
  </div>
);

// 3. Privacy Mockup
const PrivacyMockup = () => (
  <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden">
    <div className="relative flex flex-col items-center">
      <div className="relative w-14 h-14 rounded-full border-2 border-dashed border-emerald-500/30 flex items-center justify-center">
        <div className="absolute top-1/2 left-1/2 w-5 h-0.5 bg-emerald-500 origin-left -rotate-45" />
        <div className="absolute top-1/2 left-1/2 w-3.5 h-0.5 bg-emerald-500 origin-left rotate-90" />
        <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center z-10 shadow-sm">
          <Lock className="h-3.5 w-3.5 text-emerald-600" />
        </div>
      </div>
      <div className="text-[9px] text-emerald-600 font-semibold mt-3 animate-pulse">Auto-deleting in 29m 59s</div>
    </div>
  </div>
);

// 4. Speed Mockup
const SpeedMockup = () => (
  <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden">
    <div className="w-full max-w-[180px] flex flex-col gap-2">
      <div className="flex justify-between items-center text-[9px] text-slate-500">
        <span>Processing duration</span>
        <span className="text-violet-600 font-bold animate-pulse">0.82s</span>
      </div>
      <div className="w-full bg-slate-200/50 h-2 rounded-full overflow-hidden">
        <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full w-[85%] rounded-full" />
      </div>
      <div className="flex justify-between items-center text-[7px] text-slate-400 font-mono">
        <span>Queue: Redis</span>
        <span>Worker: Celery #4</span>
      </div>
    </div>
  </div>
);

// 5. Formats Mockup
const FormatsMockup = () => (
  <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden">
    <div className="flex flex-wrap gap-1.5 justify-center max-w-[200px]">
      <span className="text-[9px] font-bold px-2 py-0.5 bg-white border border-slate-100 rounded-full shadow-sm text-slate-700">PDF</span>
      <span className="text-[9px] font-bold px-2 py-0.5 bg-white border border-slate-100 rounded-full shadow-sm text-blue-600">DOCX</span>
      <span className="text-[9px] font-bold px-2 py-0.5 bg-white border border-slate-100 rounded-full shadow-sm text-orange-500">JPG</span>
      <span className="text-[9px] font-bold px-2 py-0.5 bg-white border border-slate-100 rounded-full shadow-sm text-emerald-500">PNG</span>
      <span className="text-[9px] font-bold px-2 py-0.5 bg-white border border-slate-100 rounded-full shadow-sm text-indigo-500">WEBP</span>
      <span className="text-[9px] font-bold px-2 py-0.5 bg-white border border-slate-100 rounded-full shadow-sm text-purple-500">EPUB</span>
    </div>
  </div>
);

// 6. Designed to feel premium Mockup
const PremiumMockup = () => (
  <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden">
    <div className="relative w-32 h-20 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/50 shadow-inner flex items-center justify-center">
      <div className="absolute w-22 h-14 rounded-lg bg-white/40 backdrop-blur-md shadow-md border border-white/60 flex flex-col justify-between p-1.5 transform -rotate-6">
        <div className="flex justify-between items-center">
          <div className="h-1.5 w-1.5 rounded-full bg-teal-400" />
          <div className="h-0.5 w-6 bg-slate-300 rounded" />
        </div>
        <div className="h-3 w-full bg-white/50 rounded flex items-center px-1">
          <div className="h-0.5 w-4 bg-slate-400 rounded" />
        </div>
      </div>
    </div>
  </div>
);

const features = [
  {
    Icon: FileCheck,
    title: "Layout-preserving conversion",
    desc: (
      <>
        Headings, tables, alignment and images{" "}
        <strong className="font-semibold text-foreground">survive the trip</strong> — not just the text.
      </>
    ),
    bg: "from-blue-50 to-indigo-50/30",
    visual: <LayoutMockup />,
  },
  {
    Icon: Cpu,
    title: "Engine-aware pipeline",
    desc: (
      <>
        Automatically <strong className="font-semibold text-foreground">detects scanned PDFs</strong> and runs OCR. Otherwise uses native parsing for max fidelity.
      </>
    ),
    bg: "from-amber-50 to-orange-50/30",
    visual: <EngineMockup />,
  },
  {
    Icon: Lock,
    title: "Privacy by default",
    desc: (
      <>
        No accounts, no tracking. Files <strong className="font-semibold text-foreground">auto-delete in 30 minutes</strong>. Nothing is permanently stored.
      </>
    ),
    bg: "from-emerald-50 to-teal-50/30",
    visual: <PrivacyMockup />,
  },
  {
    Icon: Zap,
    title: "Built for speed",
    desc: (
      <>
        Backed by a <strong className="font-semibold text-foreground">Celery + Redis</strong> pipeline. Most files convert in <strong className="font-semibold text-foreground">under five seconds</strong>.
      </>
    ),
    bg: "from-violet-50 to-purple-50/30",
    visual: <SpeedMockup />,
  },
  {
    Icon: Shapes,
    title: "Modern formats",
    desc: (
      <>
        PDF, DOCX, JPG, PNG, WEBP — and <strong className="font-semibold text-foreground">everything in between</strong>. More formats land each release.
      </>
    ),
    bg: "from-rose-50 to-pink-50/30",
    visual: <FormatsMockup />,
  },
  {
    Icon: Sparkles,
    title: "Designed to feel premium",
    desc: (
      <>
        <strong className="font-semibold text-foreground">Cinematic motion</strong>, glassmorphism, ambient depth. A converter that doesn&apos;t feel like 2008.
      </>
    ),
    bg: "from-cyan-50 to-sky-50/30",
    visual: <PremiumMockup />,
  },
];

export function FeatureGrid() {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisible = () => {
      let visible = 3;
      if (window.innerWidth >= 1024) {
        visible = 3;
      } else if (window.innerWidth >= 640) {
        visible = 2;
      } else {
        visible = 1;
      }
      setVisibleCards(visible);
      
      const maxIdx = features.length - visible;
      setStartIndex((prev) => Math.min(maxIdx, prev));
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = features.length - visibleCards;
  const isLeftDisabled = startIndex === 0;
  const isRightDisabled = startIndex === maxIndex;

  const scroll = (direction: "left" | "right") => {
    if (direction === "left") {
      setStartIndex((prev) => Math.max(0, prev - 1));
    } else {
      setStartIndex((prev) => Math.min(maxIndex, prev + 1));
    }
  };

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      setStartIndex((prev) => Math.min(maxIndex, prev + 1));
    } else if (info.offset.x > threshold) {
      setStartIndex((prev) => Math.max(0, prev - 1));
    }
  };

  // Dynamically computes rotation and y-offset to form a curved arch shape (/---\)
  const getCardTransform = (index: number) => {
    const slot = index - startIndex;
    
    // Mobile: Single card is flat
    if (visibleCards === 1) {
      return { y: 0, rotate: 0 };
    }
    
    // Tablet: Two cards curved outwards
    if (visibleCards === 2) {
      if (slot === 0) return { y: 16, rotate: -3 };
      if (slot === 1) return { y: 16, rotate: 3 };
      return slot < 0 ? { y: 32, rotate: -6 } : { y: 32, rotate: 6 };
    }
    
    // Desktop: Three cards curved (/---\)
    if (slot === 0) return { y: 28, rotate: -6 }; // Left card dips and tilts left
    if (slot === 1) return { y: 0, rotate: 0 };    // Center card rises and sits flat
    if (slot === 2) return { y: 28, rotate: 6 };  // Right card dips and tilts right
    
    // Off-screen cards
    return slot < 0 ? { y: 44, rotate: -10 } : { y: 44, rotate: 10 };
  };

  return (
    <section className="relative container py-24 sm:py-32 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none translate-x-1/3" />

      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
          Built different
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-5xl mt-3 tracking-tight text-balance">
          Less friction. More fidelity.
        </h2>
        <p className="text-muted-foreground mt-4 text-base sm:text-lg leading-relaxed text-balance max-w-xl mx-auto">
          We obsess over the boring middle: how a heading survives a format swap, how a table keeps
          its rhythm, how a scanned PDF becomes editable text.
        </p>
      </div>

      {/* Carousel Viewport Container (with padding/margins to prevent card transform clipping) */}
      <div className="overflow-hidden relative z-10 w-full px-4 -mx-4 py-12 -my-8">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          animate={{ x: `calc(-${startIndex} * (100% + 24px) / ${visibleCards})` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="flex gap-6 w-full cursor-grab active:cursor-grabbing select-none"
        >
          {features.map((f, i) => {
            const transform = getCardTransform(i);
            return (
              <motion.div
                key={f.title}
                animate={{
                  y: transform.y,
                  rotate: transform.rotate,
                }}
                whileHover={{
                  scale: 1.03,
                  rotate: 0,
                  y: transform.y - 12,
                  zIndex: 50,
                }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
                className="flex-shrink-0 w-full sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)] origin-center"
              >
                <div
                  className="bg-white rounded-3xl overflow-hidden border border-black/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_70px_-24px_rgba(91,157,255,0.35)] hover:border-blue-200/50 transition-shadow duration-500 group h-full"
                >
                  {/* Visual mockup container */}
                  <div className={`h-48 w-full bg-gradient-to-br ${f.bg} border-b border-black/[0.03] flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-grid-bg opacity-[0.03]" />
                    <div className="transform group-hover:scale-105 transition-transform duration-500 w-full h-full flex items-center justify-center">
                      {f.visual}
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="p-6 bg-white">
                    <div className="h-10 w-10 rounded-xl bg-blue-50/50 border border-blue-100/50 grid place-items-center mb-4 text-blue-600">
                      <f.Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground tracking-tight">{f.title}</h3>
                    <p className="text-sm text-muted-foreground/90 mt-2 leading-relaxed font-sans min-h-[72px]">{f.desc}</p>
                    
                    <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600">
                      <span>Explore feature</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Navigation buttons at the bottom */}
      <div className="flex items-center justify-center mt-12 gap-6 select-none relative z-10">
        <button
          onClick={() => scroll("left")}
          disabled={isLeftDisabled}
          className={`h-11 w-11 rounded-full border border-black/10 hover:border-blue-200/50 bg-white/70 hover:bg-white backdrop-blur-sm grid place-items-center text-slate-500 hover:text-blue-600 active:scale-95 transition-all shadow-sm ${
            isLeftDisabled ? "opacity-30 cursor-not-allowed hover:border-black/10 hover:bg-white/70 hover:text-slate-500" : ""
          }`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={isRightDisabled}
          className={`h-11 w-11 rounded-full border border-black/10 hover:border-blue-200/50 bg-white/70 hover:bg-white backdrop-blur-sm grid place-items-center text-slate-500 hover:text-blue-600 active:scale-95 transition-all shadow-sm ${
            isRightDisabled ? "opacity-30 cursor-not-allowed hover:border-black/10 hover:bg-white/70 hover:text-slate-500" : ""
          }`}
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
