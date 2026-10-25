"use client";

import { motion, useReducedMotion } from "motion/react";

export function MarketplaceHeroArt() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto h-[260px] w-full max-w-[410px] sm:h-[350px] lg:h-[430px]"
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-x-[9%] top-[10%] aspect-square rounded-full border border-[#a3bb9b]/35"
        initial={reduceMotion ? false : { scale: 0.72, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-x-[2%] top-[1%] aspect-square rotate-[-26deg] rounded-[50%] border border-[#a3bb9b]/30"
        initial={reduceMotion ? false : { scale: 0.75, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute top-[5%] left-[20%] flex h-[73%] w-[55%] rotate-[-13deg] flex-col justify-between overflow-hidden rounded-[14px] bg-[#d9ef9b] p-5 shadow-[0_25px_65px_#0005] sm:p-7"
        initial={reduceMotion ? false : { y: 75, rotate: -26, opacity: 0 }}
        animate={{ y: 0, rotate: -13, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="z-10 text-[10px] font-bold tracking-[0.18em] text-[#123932]">
          FT / 001
        </span>
        <div className="absolute top-[22%] -right-[17%] h-[54%] w-[95%] rounded-full border-[18px] border-[#235447]/25" />
        <span className="z-10 font-serif text-[52px] leading-none italic tracking-[-0.1em] text-[#123932] sm:text-[72px]">
          01.
        </span>
        <span className="z-10 border-t border-[#123932]/25 pt-3 text-[9px] font-bold tracking-[0.15em] text-[#123932]">
          MARCA REAL / IDEA DEMO
        </span>
      </motion.div>
      <motion.div
        className="absolute top-[18%] right-[8%] flex h-[73%] w-[55%] rotate-[11deg] flex-col justify-between overflow-hidden rounded-[14px] bg-[#f8b9a2] p-5 shadow-[0_25px_65px_#0005] sm:p-7"
        initial={reduceMotion ? false : { y: 90, rotate: 24, opacity: 0 }}
        animate={{ y: 0, rotate: 11, opacity: 1 }}
        transition={{ duration: 0.95, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="z-10 text-[10px] font-bold tracking-[0.18em] text-[#4c2b29]">
          FT / 002
        </span>
        <div className="absolute top-[30%] -left-[28%] h-[60%] w-[110%] rounded-full bg-[#e88971]/55" />
        <span className="z-10 font-serif text-[50px] leading-none italic tracking-[-0.1em] text-[#4c2b29] sm:text-[70px]">
          02.
        </span>
        <span className="z-10 border-t border-[#4c2b29]/25 pt-3 text-[9px] font-bold tracking-[0.15em] text-[#4c2b29]">
          DATOS ILUSTRATIVOS
        </span>
      </motion.div>
      <motion.span
        className="absolute right-[5%] bottom-[2%] grid h-[72px] w-[72px] rotate-[12deg] place-items-center rounded-full bg-[#f3f2e9] text-center text-[9px] font-black leading-[1.1] tracking-[0.08em] text-[#0a302c] shadow-[0_10px_30px_#0003] sm:h-[92px] sm:w-[92px]"
        initial={reduceMotion ? false : { scale: 0, rotate: -35 }}
        animate={{ scale: 1, rotate: 12 }}
        transition={{
          type: "spring",
          delay: 0.65,
          stiffness: 170,
          damping: 15,
        }}
      >
        SOLO
        <br />
        DEMO ✳
      </motion.span>
    </div>
  );
}
