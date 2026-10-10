"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HomeRevealProps } from "../types/homepage.type";

export function HomeReveal({
  children,
  className,
  delay = 0,
  immediate = false,
}: HomeRevealProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { y: 24 };
  const transition = {
    duration: reduceMotion ? 0 : 0.7,
    delay: reduceMotion ? 0 : delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      {...(immediate ? { animate: { y: 0 } } : { whileInView: { y: 0 } })}
      viewport={{ once: true, amount: 0.12 }}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
