"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { roiYears } from "../constants/projectDetail.constants";
import type { DemoProject } from "../types/marketplace.type";

export function AnnualizedRoiChart({ project }: { project: DemoProject }) {
  const data = roiYears.map((year, index) => ({
    year,
    roiAnualizado: project.annualizedRoiScenario[index],
  }));
  const lastValue = project.annualizedRoiScenario.at(-1) ?? 0;

  return (
    <section
      className="overflow-hidden rounded-2xl border border-[#173d34]/15 bg-white shadow-[0_12px_45px_#163d3010]"
      aria-labelledby="annualized-roi-title"
    >
      <div className="flex flex-wrap items-start justify-between gap-6 border-b border-[#173d34]/10 px-6 pt-7 pb-6 sm:px-9">
        <div>
          <p className="text-[10px] font-black tracking-[0.16em] text-[#62816f] uppercase">
            Escenario simulado / cinco años
          </p>
          <h2
            id="annualized-roi-title"
            className="mt-2 font-serif text-[30px] leading-tight tracking-tight text-[#11382e] sm:text-[38px]"
          >
            Tendencia de ROI neto anualizado
          </h2>
          <p className="mt-3 max-w-[580px] text-[12px] leading-relaxed text-[#597469]">
            Cada punto representa un ROI neto anualizado de ejemplo para esa
            unidad hipotética. No son resultados de la marca.
          </p>
        </div>
        <div className="rounded-xl bg-[#e7f1cd] px-5 py-4 text-right text-[#11382e]">
          <p className="text-[10px] font-black tracking-wider uppercase">
            Año 5 · simulado
          </p>
          <p className="mt-1 font-serif text-[32px] leading-none">
            {lastValue > 0 ? "+" : ""}
            {lastValue}%
          </p>
          <p className="mt-1 text-[10px] font-semibold">neto anualizado</p>
        </div>
      </div>

      <div className="px-3 pt-8 pb-3 sm:px-7">
        <div className="h-[290px] w-full sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 12, right: 20, bottom: 8, left: -15 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#d7e2d8"
                strokeDasharray="4 6"
              />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#547365", fontSize: 12, fontWeight: 600 }}
                tickMargin={14}
              />
              <YAxis
                domain={[-10, 10]}
                ticks={[-10, -5, 0, 5, 10]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#678374", fontSize: 11 }}
                tickFormatter={(value: number) => `${value}%`}
              />
              <ReferenceLine y={0} stroke="#829f8b" strokeWidth={1.5} />
              <Tooltip
                cursor={{ stroke: "#8eaf78", strokeDasharray: "4 4" }}
                contentStyle={{
                  background: "#092f2a",
                  border: "1px solid #37614e",
                  borderRadius: 10,
                  color: "#f3f2e9",
                  boxShadow: "0 12px 30px #092f2a30",
                }}
                labelStyle={{
                  color: "#d5f36a",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
                itemStyle={{ color: "#f3f2e9", fontWeight: 700 }}
                formatter={(value) => [`${value}%`, "ROI neto anualizado"]}
              />
              <Area
                type="monotone"
                dataKey="roiAnualizado"
                name="ROI neto anualizado"
                baseValue={0}
                stroke="#1b6552"
                strokeWidth={3}
                fill="#d5f36a"
                fillOpacity={0.3}
                dot={{
                  r: 5,
                  fill: "#d5f36a",
                  stroke: "#1b6552",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 7,
                  fill: "#d5f36a",
                  stroke: "#11382e",
                  strokeWidth: 2,
                }}
                isAnimationActive="auto"
                animationDuration={1000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        className="flex flex-wrap gap-x-5 gap-y-2 px-6 pb-5 sm:px-9"
        aria-hidden="true"
      >
        {data.map((point) => (
          <span
            key={point.year}
            className="text-[11px] font-semibold text-[#4b6b5b]"
          >
            {point.year}{" "}
            <strong className="text-[#11382e]">
              {point.roiAnualizado > 0 ? "+" : ""}
              {point.roiAnualizado}%
            </strong>
          </span>
        ))}
      </div>
      <table className="sr-only">
        <caption>ROI neto anualizado simulado de {project.name}</caption>
        <thead>
          <tr>
            <th scope="col">Año</th>
            <th scope="col">ROI neto anualizado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((point) => (
            <tr key={point.year}>
              <th scope="row">{point.year}</th>
              <td>{point.roiAnualizado}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-[#173d34]/10 bg-[#f7f8f1] px-6 py-5 text-[11px] leading-relaxed text-[#597469] sm:px-9">
        Serie inventada para probar el diseño. No son resultados históricos,
        proyecciones de la marca ni promesas de retorno. La metodología, costos
        e impuestos de una oferta real siguen pendientes.
      </p>
    </section>
  );
}
