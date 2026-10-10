import type { ArtPaletteClasses, DemoProject } from "../types/marketplace.type";

export const artPalette: Record<DemoProject["palette"], ArtPaletteClasses> = {
  lime: {
    surface: "bg-[#d7ed96]",
    ink: "text-[#204532]",
    shape: "bg-[#aeca70]",
    outline: "border-[#204532]/30",
  },
  peach: {
    surface: "bg-[#f7c6b3]",
    ink: "text-[#673e36]",
    shape: "bg-[#e9a58d]",
    outline: "border-[#673e36]/30",
  },
  lavender: {
    surface: "bg-[#d6cbea]",
    ink: "text-[#403855]",
    shape: "bg-[#afa0cb]",
    outline: "border-[#403855]/30",
  },
  mint: {
    surface: "bg-[#c5dfd0]",
    ink: "text-[#245747]",
    shape: "bg-[#8ebda5]",
    outline: "border-[#245747]/30",
  },
  blue: {
    surface: "bg-[#c5dce5]",
    ink: "text-[#244753]",
    shape: "bg-[#92bac9]",
    outline: "border-[#244753]/30",
  },
  sand: {
    surface: "bg-[#e9d9aa]",
    ink: "text-[#5b4b2f]",
    shape: "bg-[#d5bf82]",
    outline: "border-[#5b4b2f]/30",
  },
};
