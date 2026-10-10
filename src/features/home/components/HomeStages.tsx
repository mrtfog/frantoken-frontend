"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { stages } from "../constants/homepage.constants";

export function HomeStages() {
  const [activeStage, setActiveStage] = useState(0);
  const reduceMotion = useReducedMotion();
  const selectedStage = stages[activeStage];

  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-[0.8fr_1.2fr] sm:gap-9 lg:mt-20 lg:gap-[75px]">
      <fieldset className="min-w-0 border-t border-[#09262a]/20">
        <legend className="sr-only">Etapas del modelo</legend>
        {stages.map((stage, index) => (
          <button
            key={stage.number}
            type="button"
            aria-pressed={activeStage === index}
            aria-controls="stage-panel"
            onClick={() => setActiveStage(index)}
            className={`flex min-h-[74px] w-full items-center gap-5 border-b border-[#09262a]/20 px-2 text-left transition-[color,padding] duration-200 hover:pl-4 focus-visible:pl-4 motion-reduce:transition-none lg:min-h-[95px] ${activeStage === index ? "pl-4 text-[#09262a]" : "text-[#698178]"}`}
          >
            <span className="w-[34px] text-[11px] font-black">
              {stage.number}
            </span>
            <span className="flex-1 font-serif text-[26px] tracking-[-0.055em] lg:text-[34px]">
              {stage.label}
            </span>
            {activeStage === index ? (
              <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
            ) : (
              <Plus aria-hidden="true" className="h-5 w-5" />
            )}
          </button>
        ))}
      </fieldset>

      <div
        id="stage-panel"
        className="min-h-[350px] bg-[#09262a] text-[#f3f2e9] sm:min-h-[425px] lg:min-h-[470px]"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedStage.number}
            initial={reduceMotion ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0 : 0.28 }}
            className="flex min-h-[350px] flex-col p-6 sm:min-h-[425px] sm:p-9 lg:min-h-[470px] lg:p-11"
          >
            <div className="flex items-start justify-between text-[10px] font-black tracking-[0.15em] text-[#d5f36a]">
              <span>ETAPA {selectedStage.number} / 04</span>
              <span aria-hidden="true" className="flex items-end gap-1">
                <i className="h-3 w-3 rotate-[20deg] border border-[#d5f36a]" />
                <i className="h-6 w-3 rotate-[20deg] border border-[#d5f36a] bg-[#d5f36a]" />
                <i className="h-8 w-3 rotate-[20deg] border border-[#d5f36a]" />
              </span>
            </div>
            <h3 className="mt-auto mb-5 max-w-[540px] font-serif text-[clamp(30px,5vw,52px)] leading-[1.1] tracking-[-0.05em]">
              {selectedStage.title}
            </h3>
            <p className="max-w-[555px] text-[14px] leading-[1.6] text-[#c4d5cc]">
              {selectedStage.description}
            </p>
            <div className="mt-8 flex items-center gap-2 border-t border-[#f3f2e9]/20 pt-5 text-[10px] font-black tracking-[0.08em] text-[#b9d3c5] uppercase">
              <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#d5f36a]" />
              {selectedStage.note}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
