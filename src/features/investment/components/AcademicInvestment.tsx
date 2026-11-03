"use client";

import { Coins, RefreshCw, Wallet } from "lucide-react";
import { MotionConfig, motion } from "motion/react";
import { useState } from "react";
import { Button, ButtonLink, Input } from "@/components/ui";
import { projectStatusLabels } from "../constants/investment.constants";
import type { AcademicPanelProps } from "../types/investment.type";
import { principalUsd } from "../utils/requestMessage.util";
import { AcademicSkeleton } from "./AcademicSkeleton";

export function AcademicInvestment(props: AcademicPanelProps) {
  const { mode, snapshot, wallet, busy, loading, units, signedIn } = props;
  const [period, setPeriod] = useState("");
  const [amount, setAmount] = useState("");

  const projects =
    snapshot?.projects.filter(
      (p) => !props.projectId || p.id === props.projectId,
    ) || [];
  const Heading = mode === "portfolio" ? "h1" : "h2";
  const admin = snapshot?.isAdmin ?? false;
  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-xl border border-[#173d34]/20 bg-[#f3f2e9] p-5 text-[#11382e] sm:p-7"
        aria-label="Inversión académica"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Heading className="flex items-center gap-2 text-xl font-bold">
            <Coins aria-hidden="true" className="h-5 w-5" />
            {mode === "admin"
              ? "Administrar franquicias"
              : mode === "portfolio"
                ? "Mis tokens e ingresos"
                : "Comprar tokens · MVP"}
          </Heading>
          <Button
            variant="chip"
            onClick={props.onRefresh}
            disabled={busy || loading}
          >
            <RefreshCw aria-hidden="true" className="h-4 w-4" /> Actualizar
          </Button>
        </div>
        <p className="mt-3 text-sm leading-6">
          Demostración académica en Hardhat local. Compras a USD 10 por token
          con pago simulado; ingresos variables en mUSDC de prueba. Sin dinero
          real, rentabilidad garantizada ni transferencias.
        </p>
        {!signedIn && (
          <ButtonLink className="mt-4" href="/ingresar">
            Ingresar para continuar
          </ButtonLink>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            variant="dark"
            className="disabled:cursor-not-allowed disabled:opacity-50"
            onClick={props.onConnect}
            disabled={busy || loading || !signedIn || !snapshot}
          >
            <Wallet aria-hidden="true" className="h-4 w-4" />
            {busy
              ? "Procesando…"
              : wallet
                ? "Cambiar / reconectar wallet"
                : "Conectar wallet"}
          </Button>
          {wallet && (
            <p className="max-w-full break-all text-xs">
              Wallet: {wallet}
              <br />
              {snapshot?.verified
                ? "Habilitada para la demo"
                : "Requiere habilitación manual del administrador"}
            </p>
          )}
        </div>
        {signedIn && !loading && !snapshot && (
          <p className="mt-3 text-xs leading-5 text-[#4c685d]">
            La conexión estará disponible cuando se restablezca la red de
            tokens. Podés seguir usando tu perfil y tus solicitudes.
          </p>
        )}
        {snapshot?.wallet && !wallet && (
          <p className="mt-3 break-all text-xs leading-5 text-[#4c685d]">
            Wallet vinculada a tu cuenta: {snapshot.wallet}. Conectala para
            firmar operaciones.
          </p>
        )}
        {props.error && (
          <p
            role="alert"
            className="mt-4 break-words rounded-md border border-red-700/30 bg-red-50 p-3 text-sm text-red-900"
          >
            {props.error}
          </p>
        )}
        {props.notice && (
          <output className="mt-4 break-all rounded-md bg-[#e1ebd7] p-3 text-sm">
            {props.notice}
          </output>
        )}
        {loading ? (
          <div className="mt-5">
            <AcademicSkeleton />
          </div>
        ) : !snapshot ? (
          <p className="mt-5 text-sm">
            {signedIn
              ? "No pudimos consultar tus tokens. Reintentá con Actualizar cuando la red esté disponible."
              : "Ingresá a tu cuenta para consultar tus tokens."}
          </p>
        ) : (
          <>
            {mode === "buy" && !signedIn && (
              <div className="mt-4">
                <ButtonLink href="/ingresar">Ingresar para comprar</ButtonLink>
                <p className="mt-2 text-xs">
                  Completá el perfil y vinculá tu wallet para continuar.
                </p>
              </div>
            )}
            {mode === "admin" && !admin && (
              <p className="mt-4 break-all text-sm">
                Ingresá con una cuenta administradora. La cuenta técnica del
                despliegue es: {snapshot.admin}. Express verifica el rol de tu
                sesión para cada acción.
              </p>
            )}
            {mode === "admin" && admin && (
              <ButtonLink className="mt-4" href="#revisiones">
                Revisar perfiles y solicitudes
              </ButtonLink>
            )}
            <div className="mt-6 space-y-5">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="rounded-xl border border-[#173d34]/20 bg-[#fffef8] p-5"
                >
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <p className="mt-2 text-sm">
                    {projectStatusLabels[project.status]} · {project.available}{" "}
                    tokens disponibles · USD 10 c/u
                    {project.paused ? " · Pausada" : ""}
                  </p>
                  <p className="mt-2 break-all text-xs text-[#4c685d]">
                    Contrato: {project.token}
                  </p>
                  {mode === "buy" && (
                    <div className="mt-5 space-y-4">
                      <label
                        htmlFor={`units-${project.id}`}
                        className="block text-sm"
                      >
                        Cantidad de tokens
                        <Input
                          id={`units-${project.id}`}
                          className="mt-2 w-full"
                          type="text"
                          inputMode="numeric"
                          pattern="[1-9][0-9]{0,5}"
                          value={units}
                          onChange={(e) => props.onUnits(e.target.value)}
                          disabled={busy}
                        />
                      </label>
                      <p className="text-lg font-bold">
                        Principal: USD {principalUsd(units)}
                      </p>
                      <p className="text-xs leading-5">
                        Gas separado en ETH de prueba: tu wallet estima y paga
                        aceptación/cobro; el verificador de prueba paga la
                        emisión. El costo efectivo se informa al confirmar.
                      </p>
                      <p className="text-sm leading-6">
                        Términos demo: ingresos mensuales cargados por el
                        administrador y asignados según tokens al distribuir.
                        Sin retorno fijo, reventa ni propiedad de la marca.
                      </p>
                      <Button
                        variant="chip"
                        disabled={
                          busy ||
                          !wallet ||
                          !signedIn ||
                          project.accepted ||
                          project.status === 3 ||
                          project.paused
                        }
                        onClick={() => props.onAccept(project)}
                      >
                        {project.accepted
                          ? "Términos aceptados"
                          : "Aceptar términos en la wallet"}
                      </Button>
                      <Button
                        className="w-full disabled:opacity-50"
                        disabled={
                          busy ||
                          !wallet ||
                          !signedIn ||
                          !snapshot.verified ||
                          !project.accepted ||
                          project.frozen ||
                          project.paused ||
                          ![1, 2].includes(project.status) ||
                          !/^[1-9]\d{0,5}$/.test(units) ||
                          BigInt(units || "0") > BigInt(project.available)
                        }
                        onClick={() => props.onBuy(project)}
                      >
                        Confirmar pago simulado y comprar
                      </Button>
                      {props.pendingByProject[project.id] && (
                        <Button
                          variant="chip"
                          disabled={busy}
                          onClick={() =>
                            props.onBuy(
                              project,
                              props.pendingByProject[project.id],
                            )
                          }
                        >
                          Recuperar compra pendiente de{" "}
                          {props.pendingByProject[project.id]} tokens
                        </Button>
                      )}
                      <p className="text-xs">
                        Si una compra queda pendiente, reintentá la misma
                        cantidad para recuperar su resultado.
                      </p>
                    </div>
                  )}
                  {wallet && (
                    <div className="mt-5 border-t border-[#173d34]/15 pt-4">
                      <p className="text-sm">
                        Tu saldo:{" "}
                        <strong>
                          {project.balance} {project.symbol}
                        </strong>
                      </p>
                      <p className="mt-2 text-sm">
                        Disponible:{" "}
                        <strong>{project.withdrawable} mUSDC de prueba</strong>{" "}
                        · Cobrado: {project.withdrawn}
                      </p>
                      <Button
                        className="mt-4 disabled:opacity-50"
                        disabled={
                          busy ||
                          project.withdrawable === "0.0" ||
                          project.withdrawable === "0" ||
                          project.frozen ||
                          project.paused
                        }
                        onClick={() => props.onClaim(project)}
                      >
                        Cobrar ingresos en mi wallet
                      </Button>
                    </div>
                  )}
                  {mode === "admin" && admin && (
                    <div className="mt-5 space-y-4 border-t border-[#173d34]/15 pt-4">
                      <div className="flex flex-wrap gap-2">
                        {project.status === 0 && (
                          <Button
                            disabled={busy}
                            onClick={() =>
                              props.onOperation({
                                action: "state",
                                projectId: project.id,
                                status: 1,
                              })
                            }
                          >
                            Publicar
                          </Button>
                        )}
                        {project.status === 1 && (
                          <Button
                            disabled={busy}
                            onClick={() =>
                              props.onOperation({
                                action: "state",
                                projectId: project.id,
                                status: 2,
                              })
                            }
                          >
                            Iniciar operación
                          </Button>
                        )}
                        {[1, 2].includes(project.status) && (
                          <Button
                            variant="chip"
                            disabled={busy}
                            onClick={() =>
                              props.onOperation({
                                action: "state",
                                projectId: project.id,
                                status: 3,
                              })
                            }
                          >
                            Cerrar franquicia demo
                          </Button>
                        )}
                      </div>
                      {project.status === 2 && (
                        <form
                          className="space-y-3"
                          onSubmit={(e) => {
                            e.preventDefault();
                            props.onOperation({
                              action: "distribute",
                              projectId: project.id,
                              period,
                              amount,
                            });
                          }}
                        >
                          <label
                            className="block text-sm"
                            htmlFor={`period-${project.id}`}
                          >
                            Mes a simular
                            <Input
                              id={`period-${project.id}`}
                              className="mt-2 w-full"
                              type="month"
                              min="2000-01"
                              max="9999-12"
                              required
                              value={period}
                              onChange={(e) => setPeriod(e.target.value)}
                            />
                          </label>
                          <label
                            className="block text-sm"
                            htmlFor={`amount-${project.id}`}
                          >
                            Importe distribuible en mUSDC de prueba
                            <Input
                              id={`amount-${project.id}`}
                              className="mt-2 w-full"
                              inputMode="decimal"
                              required
                              pattern="[0-9]+(\.[0-9]{1,6})?"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </label>
                          <Button type="submit" disabled={busy}>
                            Fondear y distribuir este mes
                          </Button>
                          <p className="text-xs">
                            No vuelve a acreditar un mes ya distribuido. La
                            asignación usa los saldos al ejecutar.
                          </p>
                        </form>
                      )}
                    </div>
                  )}
                  <details className="mt-5 text-xs">
                    <summary className="cursor-pointer font-bold">
                      Compras, distribuciones y cobros confirmados
                    </summary>
                    <ul className="mt-3 space-y-3">
                      {[
                        ...project.purchases,
                        ...project.distributions,
                        ...project.claims,
                      ].map((event) => (
                        <li
                          key={`${event.kind}-${event.txHash}`}
                          className="break-all border-t border-[#173d34]/15 pt-3"
                        >
                          {event.kind} ·{" "}
                          {event.period
                            ? `${event.period.slice(0, 4)}-${event.period.slice(4)}`
                            : event.reference}{" "}
                          · {event.amount}{" "}
                          {event.kind === "Compra simulada"
                            ? "tokens"
                            : "mUSDC de prueba"}
                          <br />
                          Tx: {event.txHash}
                        </li>
                      ))}
                    </ul>
                    {project.purchases.length +
                      project.distributions.length +
                      project.claims.length ===
                      0 && <p className="mt-3">Sin movimientos confirmados.</p>}
                  </details>
                </article>
              ))}
            </div>
            {projects.length === 0 && (
              <p className="mt-5">
                Esta franquicia no está vinculada al despliegue académico.
              </p>
            )}
            {mode === "portfolio" && (
              <ButtonLink className="mt-6" href="/marketplace">
                Ver franquicias
              </ButtonLink>
            )}
          </>
        )}
      </motion.section>
    </MotionConfig>
  );
}
