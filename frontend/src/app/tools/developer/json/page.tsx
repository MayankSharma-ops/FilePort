"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AmbientBackground } from "@/components/ambient-background";
import { Sparkles, AlertCircle } from "lucide-react";

const SAMPLE = `{"hello":"world","items":[1,2,3],"nested":{"ok":true}}`;

export default function Page() {
  const [input, setInput] = React.useState(SAMPLE);
  const [error, setError] = React.useState<string | null>(null);
  const [output, setOutput] = React.useState<string>("");

  const format = (indent: number) => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError(null);
    } catch (e: any) {
      setError(e?.message ?? "Invalid JSON");
      setOutput("");
    }
  };

  const minify = () => format(0);

  React.useEffect(() => {
    format(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative min-h-[80svh] pt-32 pb-24 overflow-hidden">
      <AmbientBackground />
      <div className="container relative max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground inline-flex items-center gap-2">
            <Sparkles className="h-3 w-3" /> Developer · JSON
          </p>
          <h1 className="font-display text-4xl sm:text-6xl tracking-tight mt-3">
            <span className="gradient-text">JSON Formatter</span>
          </h1>
          <p className="text-muted-foreground mt-5">
            Paste JSON, see it pretty. Validates as you type. Runs entirely in your browser.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 mt-12">
          <div className="glass-strong rounded-2xl p-1 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 text-xs text-muted-foreground">
              <span>Input</span>
              <span>{input.length} chars</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              spellCheck={false}
              className="w-full h-[420px] bg-transparent px-4 py-3 font-mono text-xs leading-relaxed outline-none resize-none"
            />
          </div>
          <div className="glass-strong rounded-2xl p-1 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 text-xs text-muted-foreground">
              <span>Output</span>
              {error && (
                <span className="text-red-400 inline-flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {error}
                </span>
              )}
            </div>
            <pre className="px-4 py-3 font-mono text-xs leading-relaxed h-[420px] overflow-auto whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Button variant="glow" onClick={() => format(2)}>
            Format · 2 spaces
          </Button>
          <Button variant="outline" onClick={() => format(4)}>
            4 spaces
          </Button>
          <Button variant="outline" onClick={minify}>
            Minify
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
