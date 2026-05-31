"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useConverter } from "@/store/converter";
import { Dropzone } from "./dropzone";
import { FormatPicker } from "./format-picker";
import { Processing } from "./processing";
import { Done } from "./done";
import { ErrorState } from "./error-state";

const variants = {
  initial: { opacity: 0, y: 16, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(8px)" },
};

export function ConverterFlow() {
  const step = useConverter((s) => s.step);
  return (
    <div id="convert" className="relative w-full max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {(step === "idle" || step === "uploading") && (
          <motion.div key="idle" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <Dropzone />
          </motion.div>
        )}
        {step === "format" && (
          <motion.div key="format" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <FormatPicker />
          </motion.div>
        )}
        {step === "processing" && (
          <motion.div key="processing" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <Processing />
          </motion.div>
        )}
        {step === "done" && (
          <motion.div key="done" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <Done />
          </motion.div>
        )}
        {step === "error" && (
          <motion.div key="error" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
            <ErrorState />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
