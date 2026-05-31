"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * Layered, animated background. GPU-accelerated, low cost.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid-bg opacity-[0.35]" />

      <motion.div
        className="absolute -top-32 left-1/2 -translate-x-1/2 h-[640px] w-[1100px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, hsla(217,91%,60%,0.35), hsla(174,85%,60%,0.18) 45%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.05, 1], opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-1/3 -left-40 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, hsla(174,85%,60%,0.35), transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ x: [0, 80, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-0 -right-32 h-[460px] w-[460px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, hsla(217,91%,60%,0.28), transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{ x: [0, -60, 0], y: [0, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
