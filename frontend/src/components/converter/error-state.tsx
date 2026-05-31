"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConverter } from "@/store/converter";

export function ErrorState() {
  const error = useConverter((s) => s.errorMessage);
  const reset = useConverter((s) => s.reset);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-3xl p-10 text-center"
    >
      <div className="mx-auto h-14 w-14 rounded-full glass grid place-items-center mb-5">
        <AlertTriangle className="h-6 w-6 text-amber-300" />
      </div>
      <h2 className="font-display text-2xl">Something went sideways</h2>
      <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
        {error || "We couldn't complete the conversion. Try a different file or format."}
      </p>
      <div className="mt-6">
        <Button variant="outline" onClick={reset}>
          <RotateCcw className="h-4 w-4" /> Start over
        </Button>
      </div>
    </motion.div>
  );
}
