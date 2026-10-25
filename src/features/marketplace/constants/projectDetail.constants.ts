import type { DemoProject } from "../types/marketplace.type";

export const cardTones: Record<DemoProject["palette"], string> = {
  lime: "bg-[#e6efce]",
  peach: "bg-[#f6d7c8]",
  lavender: "bg-[#e5dced]",
  mint: "bg-[#d9e8dc]",
};

export const roiYears = ["Año 1", "Año 2", "Año 3", "Año 4", "Año 5"] as const;

export const franchiseRiskFactors = [
  {
    title: "Zona y demanda",
    body: "Tránsito, competencia, poder de compra y exclusividad territorial.",
  },
  {
    title: "Inversión y costos",
    body: "Canon, obra, alquiler, personal, regalías, insumos y capital de trabajo.",
  },
  {
    title: "Operación",
    body: "Operadora, desempeño local, abastecimiento y cumplimiento de estándares.",
  },
  {
    title: "Derechos y salida",
    body: "Vehículo, derechos del token, distribuciones, plazo, impuestos y liquidez.",
  },
] as const;
