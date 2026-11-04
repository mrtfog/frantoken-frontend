"use client";
import { MotionConfig, motion } from "motion/react";
import { useState } from "react";
import { Button, ButtonLink, Input, Skeleton } from "@/components/ui";
import type { AdminReviewProps } from "../types/admin.type";
export function AdminReview(props: AdminReviewProps) {
  const [note, setNote] = useState("");
  const [symbol, setSymbol] = useState("DEMO");
  const [units, setUnits] = useState("1000");
  return (
    <MotionConfig reducedMotion="user">
      <motion.section
        id="revisiones"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-10 space-y-5 rounded-xl border bg-[#fffef8] p-6"
      >
        <h2 className="text-2xl font-bold">
          {props.section === "users"
            ? "Perfiles para invertir"
            : "Admisión de franquicias"}
        </h2>
        <p className="text-sm">
          Revisión manual académica. Los datos personales solo se muestran a
          administradores; nunca se publican con la franquicia.
        </p>
        <Button onClick={props.onRefresh} disabled={props.busy}>
          Actualizar revisiones
        </Button>
        {props.error && <p role="alert">{props.error}</p>}
        {props.notice && <output className="block">{props.notice}</output>}
        {props.loading ? (
          <div aria-busy="true">
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <>
            {props.section === "users" && (
              <>
                <h3 className="text-xl font-bold">
                  Habilitación para invertir
                </h3>
                {props.users.map((user) => (
                  <article key={user.userId} className="rounded-lg border p-4">
                    <p className="font-bold">
                      {user.displayName} · {user.email}
                    </p>
                    <p className="mt-2 break-all text-xs">
                      Wallet: {user.walletAddress || "Sin vincular"}
                    </p>
                    <details className="mt-3 text-sm">
                      <summary>Datos declarados de demostración</summary>
                      {user.profile ? (
                        <dl className="mt-3 space-y-2">
                          {Object.entries(user.profile)
                            .filter(([key]) => key !== "investorUpdates")
                            .map(([key, value]) => (
                              <div key={key}>
                                <dt className="font-bold">{key}</dt>
                                <dd>{String(value)}</dd>
                              </div>
                            ))}
                        </dl>
                      ) : (
                        <p>Perfil incompleto.</p>
                      )}
                    </details>
                    <Button
                      className="mt-3"
                      disabled={
                        props.busy || !user.walletAddress || !user.profile
                      }
                      onClick={() =>
                        props.onKyc(user.userId, !user.kycApproved)
                      }
                    >
                      {user.kycApproved
                        ? "Revocar habilitación"
                        : "Aprobar perfil y wallet demo"}
                    </Button>
                  </article>
                ))}
              </>
            )}
            {props.section === "applications" && (
              <>
                <h3 className="text-xl font-bold">Solicitudes de franquicia</h3>
                <label className="block text-sm" htmlFor="review-note">
                  Observación de revisión
                  <Input
                    id="review-note"
                    className="mt-2 w-full"
                    value={note}
                    maxLength={500}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label htmlFor="publication-symbol">
                    Símbolo para publicar
                    <Input
                      id="publication-symbol"
                      className="mt-2 w-full"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value.toUpperCase())}
                      pattern="[A-Z][A-Z0-9]{1,9}"
                    />
                  </label>
                  <label htmlFor="publication-units">
                    Cupo de tokens de prueba
                    <Input
                      id="publication-units"
                      className="mt-2 w-full"
                      value={units}
                      inputMode="numeric"
                      onChange={(e) => setUnits(e.target.value)}
                    />
                  </label>
                </div>
                {props.applications.length === 0 && <p>No hay solicitudes.</p>}
                {props.applications.map((app) => (
                  <article key={app.id} className="rounded-lg border p-4">
                    <h4 className="font-bold">
                      {app.franchiseName} · {app.status}
                    </h4>
                    <p className="mt-2 text-sm">
                      Solicitante: {app.applicant} · {app.city}, {app.country}
                    </p>
                    <p className="mt-2 text-sm">{app.description}</p>
                    <p className="mt-2 text-xs">
                      Presupuesto indicativo: {app.currency} {app.totalCost}
                    </p>
                    {app.reviewNote && <p>{app.reviewNote}</p>}
                    <div className="mt-3 flex flex-wrap gap-3">
                      <ButtonLink
                        variant="chip"
                        href={`/mi-cuenta/solicitudes/${app.id}`}
                      >
                        Ver solicitud
                      </ButtonLink>
                      {!app.projectId && (
                        <>
                          <Button
                            disabled={props.busy}
                            onClick={() =>
                              props.onReview(
                                app.id,
                                "Aprobada",
                                note,
                                app.version,
                              )
                            }
                          >
                            Aprobar
                          </Button>
                          <Button
                            variant="chip"
                            disabled={props.busy}
                            onClick={() =>
                              props.onReview(
                                app.id,
                                "Observada",
                                note,
                                app.version,
                              )
                            }
                          >
                            Observar
                          </Button>
                        </>
                      )}
                      {app.status === "Aprobada" && (
                        <Button
                          disabled={props.busy}
                          onClick={() =>
                            props.onPublish(
                              app.id,
                              app.projectId
                                ? (app.publication?.symbol ?? "")
                                : symbol,
                              app.projectId
                                ? (app.publication?.totalUnits ?? "")
                                : units,
                            )
                          }
                        >
                          {app.projectId
                            ? "Reintentar publicación"
                            : "Publicar token y franquicia"}
                        </Button>
                      )}
                    </div>
                  </article>
                ))}
              </>
            )}
          </>
        )}
      </motion.section>
    </MotionConfig>
  );
}
