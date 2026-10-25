import { ArrowDownLeft, Info } from "lucide-react";
import type { TokenHolding } from "../types/account.type";

export function Tokens({ holdings }: { holdings: TokenHolding[] }) {
  return (
    <section>
      <p className="text-xs font-extrabold tracking-[.2em] uppercase text-[#557468]">
        Cartera / simulación
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
        Mis tokens
      </h1>
      <div className="mt-6 flex gap-3 rounded-lg border border-[#86a498] bg-[#e8efe5] p-4 text-xs leading-6 text-[#244e40]">
        <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
        <p>
          Tenencias y movimientos inventados para probar esta pantalla. El
          importe es costo histórico simulado; no muestra valor actual,
          rendimiento, distribución ni derechos efectivos.
        </p>
      </div>
      <div className="mt-9 space-y-6">
        {holdings.map((holding) => (
          <article
            key={holding.id}
            className="overflow-hidden rounded-xl border border-[#173d34]/15 bg-[#fffef8]"
          >
            <div className="flex flex-wrap items-end justify-between gap-5 bg-[#11382e] p-6 text-[#f3f2e9] md:p-8">
              <div>
                <span className="text-[11px] font-extrabold tracking-[.18em] uppercase text-[#d5f36a]">
                  {holding.symbol}
                </span>
                <h2 className="mt-3 text-3xl font-bold">
                  {holding.projectName}
                </h2>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-bold">{holding.quantity}</p>
                  <p className="mt-1 text-xs text-[#bfd1c5]">Tokens demo</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">
                    USD {holding.investedAmount.toLocaleString("es-AR")}
                  </p>
                  <p className="mt-1 text-xs text-[#bfd1c5]">Costo simulado</p>
                </div>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-lg font-bold">Registro de actividad</h3>
              <ol className="mt-4 divide-y divide-[#173d34]/15">
                {holding.activities.map((activity) => (
                  <li
                    key={activity.id}
                    className="grid gap-3 py-5 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e5efd9]">
                      <ArrowDownLeft
                        className="h-5 w-5 text-[#245b42]"
                        aria-hidden="true"
                      />
                    </span>
                    <div>
                      <p className="font-bold">{activity.kind}</p>
                      <p className="mt-1 text-xs text-[#5b7568]">
                        {new Date(
                          `${activity.occurredAt}T12:00:00`,
                        ).toLocaleDateString("es-AR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                        · Ref. {activity.reference}
                      </p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="font-bold">+{activity.quantity} tokens</p>
                      <p className="mt-1 text-xs text-[#5b7568]">
                        {activity.currency}{" "}
                        {activity.amount?.toLocaleString("es-AR")} ·{" "}
                        {activity.currency} {activity.unitPrice} c/u
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
