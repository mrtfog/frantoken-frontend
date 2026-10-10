import type { ReactNode } from "react";

export type HomeRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
};

export type Stage = {
  number: string;
  label: string;
  title: string;
  description: string;
  note: string;
};
export type Question = { question: string; answer: string };

export type Pillar = {
  number: string;
  title: string;
  body: string;
  icon: "sparkles" | "blocks" | "trending";
};

export type Role = {
  number: string;
  title: string;
  body: string;
};
