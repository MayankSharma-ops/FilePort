"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/ambient-background";

export default function Page() {
  const [mode, setMode] = React.useState<"encode" | "decode">("encode");
  const [input, setInput] = React.useState("Hello, GathorDocs.");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      if (mode === "encode") {
        // UTF-8 safe encoding
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? "Invalid input");
      setOutput("");
    }
  }, [input, mode]);

  return (
    <section className="relative min-h-[80svh] pt-32 pb-24 overflow-hidden">
      <AmbientBackground />
      <div className="container relative max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Developer · Base64</p>
          <h1 className="font-display text-4xl sm:text-6xl tracking-tight mt-3">
            <span className="gradient-text">Base64 Encoder/Decoder</span>
          </h1>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <div className="glass rounded-full p-1 inline-flex">
            <button
              onClick={() => setMode("encode")}
              className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                mode === "encode" ? "bg-white/10" : "text-muted-foreground"
              }`}
            >
              Encode
            </button>
            <button
              onClick={() => setMode("decode")}
              className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
                mode === "decode" ? "bg-white/10" : "text-muted-foreground"
              }`}
            >
              Decode
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-8 items-stretch">
          <div className="glass-strong rounded-2xl overflow-hidden">
            <div className="px-4 py-2 text-xs text-muted-foreground border-b border-white/5">
              {mode === "encode" ? "Plain text" : "Base64"}
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              className="w-full h-[320px] bg-transparent px-4 py-3 font-mono text-xs leading-relaxed outline-none resize-none"
            />
          </div>
          <div className="glass-strong rounded-2xl overflow-hidden">
            <div className="px-4 py-2 text-xs text-muted-foreground border-b border-white/5 flex items-center justify-between">
              <span>{mode === "encode" ? "Base64" : "Plain text"}</span>
              {error && <span className="text-red-400">{error}</span>}
            </div>
            <pre className="px-4 py-3 font-mono text-xs leading-relaxed h-[320px] overflow-auto whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => {
              const tmp = input;
              setInput(output);
              setMode((m) => (m === "encode" ? "decode" : "encode"));
              // small hack to preserve content order
              setTimeout(() => setOutput(tmp), 0);
            }}
          >
            <ArrowLeftRight className="h-4 w-4" /> Swap
          </Button>
          <Button
            variant="ghost"
            onClick={() => navigator.clipboard.writeText(output)}
            disabled={!output}
          >
            Copy output
          </Button>
        </div>
      </div>
    </section>
  );
}
