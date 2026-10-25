import { ArrowRight, Coins, FilePenLine, MoveUpRight } from "lucide-react";
import Link from "next/link";
import type { FranchiseApplication, TokenHolding } from "../types/account.type";

export function AccountOverview({
  name,
  holdings,
  applications,
}: {
  name: string;
  holdings: TokenHolding[];
  applications: FranchiseApplication[];
}) {
  const quantity = holdings.reduce(
    (total, holding) => total + holding.quantity,
    0,
  );
  const invested = holdings.reduce(
    (total, holding) => total + holding.investedAmount,
    0,
  );
  return (
    <section>
      <p className="text-xs font-extrabold tracking-[.2em] uppercase text-[#557468]">
        Panel personal · contenido ficticio
      </p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
        Hola, {name}.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#527164]">
        Este es tu espacio de demostración. Los tokens, montos y operaciones que
        ves abajo son ejemplos; no representan tenencias reales.
      </p>
      <div className="mt-9 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-[#11382e] p-6 text-[#f3f2e9]">
          <Coins className="h-6 w-6 text-[#d5f36a]" aria-hidden="true" />
          <p className="mt-8 text-4xl font-bold">{quantity}</p>
          <p className="mt-2 text-xs text-[#bcd0c3]">Tokens de ejemplo</p>
        </div>
        <div className="rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6">
          <MoveUpRight className="h-6 w-6 text-[#3c6d58]" aria-hidden="true" />
          <p className="mt-8 text-4xl font-bold">
            USD {invested.toLocaleString("es-AR")}
          </p>
          <p className="mt-2 text-xs text-[#527164]">
            Compras simuladas · costo histórico
          </p>
        </div>
        <div className="rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6">
          <FilePenLine className="h-6 w-6 text-[#3c6d58]" aria-hidden="true" />
          <p className="mt-8 text-4xl font-bold">{applications.length}</p>
          <p className="mt-2 text-xs text-[#527164]">
            Solicitudes demo guardadas
          </p>
        </div>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <Link
          href="/mi-cuenta/tokens"
          className="group rounded-xl border border-[#173d34]/20 p-7 transition-colors hover:bg-[#e4eadb]"
        >
          <span className="text-[11px] font-extrabold tracking-[.18em] uppercase text-[#517160]">
            Actividad
          </span>
          <h2 className="mt-4 text-2xl font-bold">Revisá tus tokens</h2>
          <p className="mt-3 text-sm leading-6 text-[#527164]">
            Compras ilustrativas, cantidad, precio unitario y referencia de cada
            movimiento.
          </p>
          <ArrowRight
            className="mt-8 h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
        <Link
          href="/abrir-franquicia"
          className="group rounded-xl border border-[#173d34]/20 p-7 transition-colors hover:bg-[#e4eadb]"
        >
          <span className="text-[11px] font-extrabold tracking-[.18em] uppercase text-[#517160]">
            Nueva propuesta
          </span>
          <h2 className="mt-4 text-2xl font-bold">Abrir franquicia</h2>
          <p className="mt-3 text-sm leading-6 text-[#527164]">
            Completá una solicitud de prueba en tres etapas. Se guarda solo en
            este navegador.
          </p>
          <ArrowRight
            className="mt-8 h-5 w-5 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
      {applications.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold">Tus propuestas de prueba</h2>
          <ul className="mt-4 space-y-3">
            {applications.map((item) => (
              <li
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#173d34]/15 bg-[#fffef8] px-5 py-4"
              >
                <span className="font-bold">{item.franchiseName}</span>
                <span className="text-xs text-[#527164]">
                  {item.status} ·{" "}
                  {new Date(item.createdAt).toLocaleDateString("es-AR")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
