"use client";
import { Building2, CircleDollarSign } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { useState } from "react";
import { Button, ButtonLink, Input } from "@/components/ui";
import { franchiseStatusLabels } from "../constants/franchise.constants";
import type { FranchiseManagementProps } from "../types/franchise.type";
import { formatMinorAmount } from "../utils/formatMinorAmount.util";
import { DistributionRequestList } from "./DistributionRequestList";
import { FranchiseHistory } from "./FranchiseHistory";

export function FranchiseManagement({
  detail,
  busy,
  notice,
  error,
  onRefresh,
  onOperation,
  onPropose,
  requestsActions,
}: FranchiseManagementProps) {
  const [closing, setClosing] = useState(false);
  const [periodId, setPeriodId] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const { project, chain, capabilities } = detail;
  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ButtonLink href="/mi-cuenta/franquicias" variant="chip">
            Mis franquicias
          </ButtonLink>
          <Button onClick={onRefresh} variant="chip" disabled={busy}>
            Actualizar
          </Button>
        </div>
        <Building2 className="mt-8 h-8 w-8 text-[#527164]" aria-hidden="true" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          {project.name}
        </h1>
        <p className="mt-4 text-sm text-[#527164]">
          {project.sector} ·{" "}
          {chain
            ? franchiseStatusLabels[chain.status]
            : "Estado de red no disponible"}
        </p>
        <p className="mt-4 max-w-2xl whitespace-pre-wrap text-sm leading-6 text-[#527164]">
          {project.descriptor}
        </p>
        <p className="mt-4 text-xs leading-5 text-[#527164]">
          Gestión del MVP en Hardhat local. Las compras usan pago simulado y los
          repartos utilizan mUSDC de prueba. Los datos de la franquicia admitida
          quedan protegidos.
        </p>
        {detail.networkError && (
          <p
            role="alert"
            className="mt-5 rounded-lg border border-[#173d34]/20 bg-[#fffef8] p-4 text-sm"
          >
            {detail.networkError}
          </p>
        )}
        {error && (
          <p
            role="alert"
            className="mt-5 rounded-lg border border-[#b43a31]/30 p-4 text-sm text-[#b43a31]"
          >
            {error}
          </p>
        )}
        {notice && (
          <output className="mt-5 block rounded-lg bg-[#e5ecd8] p-4 text-sm text-[#276046]">
            {notice}
          </output>
        )}
        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {[
            ["Tokens emitidos", chain?.supply ?? "—"],
            ["Tokens disponibles", chain?.available ?? "—"],
            [
              "Precio por token",
              `${project.price.currency} ${project.price.display}`,
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              className="rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-5"
            >
              <p className="text-xs font-bold text-[#527164]">{label}</p>
              <p className="mt-4 break-all text-2xl font-bold">{value}</p>
            </div>
          ))}
        </div>
        <section className="mt-7 rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6">
          <h2 className="text-xl font-bold">Operación</h2>
          <p className="mt-3 text-sm leading-6 text-[#527164]">
            Iniciar la operación habilita proponer ingresos mensuales. El cierre
            detiene nuevas compras y repartos; conserva los ingresos ya
            asignados y no se puede revertir.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {capabilities.canStart && (
              <Button
                onClick={() => onOperation("en_operacion")}
                disabled={busy}
              >
                Iniciar operación
              </Button>
            )}
            {capabilities.canClose && !closing && (
              <Button
                variant="chip"
                onClick={() => setClosing(true)}
                disabled={busy}
              >
                Cerrar franquicia
              </Button>
            )}
            {project.token.onChain && (
              <ButtonLink variant="chip" href={`/marketplace/${project.id}`}>
                Ver ficha pública
              </ButtonLink>
            )}
          </div>
          {closing && capabilities.canClose && (
            <div className="mt-5 rounded-lg border border-[#b43a31]/30 p-4">
              <p className="text-sm">
                Vas a cerrar {project.name}. Este estado es definitivo.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  variant="dark"
                  disabled={busy}
                  onClick={() => onOperation("cerrada")}
                >
                  Confirmar cierre definitivo
                </Button>
                <Button
                  variant="chip"
                  disabled={busy}
                  onClick={() => setClosing(false)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </section>
        <section className="mt-7 rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <CircleDollarSign className="h-5 w-5" aria-hidden="true" />
            Propuestas de reparto
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#527164]">
            El creador registra el mes y el importe. El superadmin revisa y
            ejecuta el reparto con la cuenta técnica de prueba. Presentar una
            propuesta no acredita ingresos.
          </p>
          {capabilities.canProposeDistribution && (
            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                onPropose({ periodId, amount, memo });
              }}
            >
              <fieldset
                disabled={busy}
                className="grid min-w-0 gap-4 sm:grid-cols-2"
              >
                <legend className="sr-only">Nueva propuesta de reparto</legend>
                <label className="text-xs font-bold" htmlFor="proposal-period">
                  Período mensual
                  <Input
                    id="proposal-period"
                    className="mt-2 w-full"
                    type="month"
                    min="2000-01"
                    max="9999-12"
                    value={periodId}
                    onChange={(event) => setPeriodId(event.target.value)}
                    required
                  />
                </label>
                <label className="text-xs font-bold" htmlFor="proposal-amount">
                  Importe en mUSDC de prueba
                  <Input
                    id="proposal-amount"
                    className="mt-2 w-full"
                    inputMode="decimal"
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                    placeholder="Hasta 6 decimales"
                    required
                  />
                </label>
                <label
                  className="text-xs font-bold sm:col-span-2"
                  htmlFor="proposal-memo"
                >
                  Nota (opcional)
                  <Input
                    id="proposal-memo"
                    className="mt-2 w-full"
                    value={memo}
                    onChange={(event) => setMemo(event.target.value)}
                    maxLength={160}
                  />
                </label>
                <Button type="submit" disabled={busy} className="sm:col-span-2">
                  Enviar propuesta de reparto
                </Button>
              </fieldset>
            </form>
          )}
          <DistributionRequestList
            requests={detail.requests}
            busy={busy}
            canEdit={capabilities.canProposeDistribution}
            canReview={capabilities.canExecuteDistribution}
            canExecute={capabilities.canExecuteDistribution}
            {...requestsActions}
          />
        </section>
        <section className="mt-7 rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6">
          <h2 className="text-xl font-bold">Distribuciones registradas</h2>
          {detail.distributions.length === 0 ? (
            <p className="mt-4 text-sm text-[#527164]">
              Todavía no hay distribuciones.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {detail.distributions.map((distribution) => (
                <li
                  key={distribution.id}
                  className="rounded-lg border p-4 text-sm"
                >
                  <p className="font-bold">
                    {distribution.periodId} ·{" "}
                    {formatMinorAmount(distribution.amountMinor)} mUSDC
                  </p>
                  <p className="mt-2">
                    {distribution.status === "confirmed"
                      ? "Confirmada en cadena"
                      : distribution.status === "pending"
                        ? "Pendiente de conciliación"
                        : "No confirmada"}
                  </p>
                  {distribution.txHash && (
                    <p className="mt-2 break-all text-xs">
                      Transacción: {distribution.txHash}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
        <FranchiseHistory events={detail.history} />
      </motion.section>
    </MotionConfig>
  );
}
