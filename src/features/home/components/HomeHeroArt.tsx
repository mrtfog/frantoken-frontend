"use client";

import { motion, useReducedMotion } from "motion/react";

export function HomeHeroArt() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto h-[350px] w-full max-w-[570px] sm:h-[420px] lg:h-[540px]"
      aria-hidden="true"
    >
      <div className="absolute top-1/2 left-1/2 h-[235px] w-[345px] -translate-x-1/2 -translate-y-1/2 -rotate-[27deg] rounded-full border border-[#d5f36a]/30 sm:h-[300px] sm:w-[520px]" />
      <div className="absolute top-1/2 left-1/2 h-[350px] w-[255px] -translate-x-1/2 -translate-y-1/2 rotate-[28deg] rounded-full border border-[#d5f36a]/30 sm:h-[450px] sm:w-[380px]" />
      <motion.div
        className="absolute top-[10%] left-[10%] flex h-[252px] w-[196px] -rotate-[9deg] flex-col justify-between overflow-hidden rounded-[9px] bg-[#cbdfca] p-[17px] text-[#09262a] shadow-[0_22px_45px_#0004] sm:left-[8%] sm:h-[290px] sm:w-[230px] sm:p-[21px] lg:top-[12%] lg:h-[338px] lg:w-[260px]"
        animate={
          reduceMotion ? undefined : { y: [0, -8, 0], rotate: [-9, -7, -9] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="relative z-10 text-[9px] font-black tracking-[0.14em]">
          01 / POSIBILIDAD
        </span>
        <div className="absolute inset-x-[18px] top-[22%] grid h-[45%] -skew-y-[7deg] grid-cols-3 grid-rows-2 gap-2">
          {[0, 1, 2, 3, 4, 5].map((cell) => (
            <span
              key={cell}
              className={
                cell === 1 || cell === 4
                  ? "border-2 border-[#09262a] bg-[#09262a]"
                  : "border-2 border-[#09262a] bg-white/25"
              }
            />
          ))}
        </div>
        <span className="relative z-10 font-serif text-[25px] leading-[1.02] tracking-[-0.06em] sm:text-[30px] lg:text-[33px]">
          Una idea
          <br />
          con potencial.
        </span>
      </motion.div>
      <motion.div
        className="absolute top-[22%] right-[9%] flex h-[252px] w-[196px] rotate-[8deg] flex-col justify-between overflow-hidden rounded-[9px] bg-[#d5f36a] p-[17px] text-[#09262a] shadow-[0_22px_45px_#0004] sm:right-[8%] sm:h-[290px] sm:w-[230px] sm:p-[21px] lg:top-[23%] lg:h-[338px] lg:w-[260px]"
        animate={
          reduceMotion ? undefined : { y: [0, 9, 0], rotate: [8, 10, 8] }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="relative z-10 text-[9px] font-black tracking-[0.14em]">
          02 / PROYECTO
        </span>
        <div className="absolute top-[20%] -right-[20%] h-[58%] w-[85%] rounded-full bg-[#f1ecd7]" />
        <div className="absolute top-[42%] right-[8%] h-[28%] w-[90%] -rotate-[20deg] rounded-t-full border border-[#09262a]" />
        <span className="relative z-10 font-serif text-[25px] leading-[1.02] tracking-[-0.06em] sm:text-[30px] lg:text-[33px]">
          Una unidad
          <br />
          en marcha.
        </span>
      </motion.div>
      <motion.div
        className="absolute top-2 right-1 grid h-[90px] w-[90px] rotate-[12deg] place-content-center rounded-full bg-[#f4f0df] text-center text-[#09262a] shadow-[0_10px_25px_#0003] sm:right-[8%] lg:top-[8%]"
        animate={reduceMotion ? undefined : { rotate: [12, 18, 12] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-serif text-[29px] italic leading-none tracking-[-0.1em]">
          FT
        </span>
        <span className="mt-1 text-[5px] font-black tracking-[0.1em]">
          IDEAS EN MOVIMIENTO
        </span>
      </motion.div>
      <span className="absolute right-[4%] bottom-0 text-[9px] font-black tracking-[0.12em] text-[#bcd6c6]">
        DE LA IDEA A LA OPERACIÓN <span className="text-[#d5f36a]">↗</span>
      </span>
    </div>
  );
}
