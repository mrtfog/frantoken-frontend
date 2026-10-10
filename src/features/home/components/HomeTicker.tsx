"use client";

import { motion, useReducedMotion } from "motion/react";
import { tickerPhrases } from "../constants/homepage.constants";

export function HomeTicker() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative flex h-[70px] -rotate-1 items-center overflow-hidden bg-[#d5f36a] text-[#09262a]"
      aria-hidden="true"
    >
      <motion.div
        className="flex w-max shrink-0 whitespace-nowrap text-[16px] font-black tracking-[-0.03em] sm:text-[19px]"
        animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex min-w-[100vw] shrink-0 items-center justify-around"
          >
            {[0, 1, 2].flatMap((lap) =>
              tickerPhrases.map((phrase) => (
                <span
                  key={`${lap}-${phrase}`}
                  className="inline-flex shrink-0 items-center gap-7 px-7"
                >
                  {phrase}
                  <span className="text-[27px] leading-none">✳</span>
                </span>
              )),
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
