"use client";
import { useState } from "react";
import { Button, ButtonLink, Input } from "@/components/ui";
import { requestStatusLabels } from "../constants/franchise.constants";
import type {
  DistributionRequest,
  RequestListProps,
} from "../types/franchise.type";

function RequestCard({
  request,
  busy,
  canEdit,
  canReview,
  canExecute,
  onEdit,
  onObserve,
  onExecute,
}: Omit<RequestListProps, "requests"> & { request: DistributionRequest }) {
  const [amount, setAmount] = useState(request.amount);
  const [memo, setMemo] = useState(request.memo);
  const [note, setNote] = useState("");
  return (
    <article className="rounded-lg border border-[#173d34]/20 bg-[#fffef8] p-5">
      {request.franchiseName && (
        <h3 className="font-bold">{request.franchiseName}</h3>
      )}
      <p className="mt-1 font-bold">
        {request.periodId} · {request.amount} mUSDC de prueba
      </p>
      <p className="mt-2 text-sm text-[#527164]">
        {requestStatusLabels[request.status]}
      </p>
      {request.memo && <p className="mt-2 text-sm">{request.memo}</p>}
      {request.reviewNote && (
        <p className="mt-3 rounded-md bg-[#e9eee3] p-3 text-sm">
          Observación: {request.reviewNote}
        </p>
      )}
      {request.status === "executing" && (
        <p className="mt-3 text-xs leading-5">
          Se debe conciliar la ejecución. El mes y el importe están bloqueados
          para evitar repartos duplicados.
        </p>
      )}
      {canEdit && ["pending", "observed"].includes(request.status) && (
        <details className="mt-4 text-sm">
          <summary className="cursor-pointer font-bold">
            Corregir y reenviar propuesta
          </summary>
          <form
            className="mt-4 space-y-3"
            onSubmit={(event) => {
              event.preventDefault();
              onEdit(request.id, request.version, { amount, memo });
            }}
          >
            <label className="block" htmlFor={`amount-${request.id}`}>
              Importe mUSDC
              <Input
                id={`amount-${request.id}`}
                className="mt-2 w-full"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                inputMode="decimal"
                required
                disabled={busy}
              />
            </label>
            <label className="block" htmlFor={`memo-${request.id}`}>
              Nota
              <Input
                id={`memo-${request.id}`}
                className="mt-2 w-full"
                value={memo}
                onChange={(event) => setMemo(event.target.value)}
                maxLength={160}
                disabled={busy}
              />
            </label>
            <Button type="submit" variant="chip" disabled={busy}>
              Guardar propuesta
            </Button>
          </form>
        </details>
      )}
      {canReview && request.status === "pending" && (
        <form
          className="mt-4 space-y-3"
          onSubmit={(event) => {
            event.preventDefault();
            onObserve(request.id, request.version, note);
          }}
        >
          <label className="block text-sm" htmlFor={`review-${request.id}`}>
            Observación para el creador
            <Input
              id={`review-${request.id}`}
              className="mt-2 w-full"
              value={note}
              maxLength={500}
              onChange={(event) => setNote(event.target.value)}
              required
              disabled={busy}
            />
          </label>
          <Button type="submit" variant="chip" disabled={busy}>
            Solicitar corrección
          </Button>
        </form>
      )}
      <div className="mt-4 flex flex-wrap gap-3">
        {canExecute &&
          (request.status === "executing" ||
            (request.status === "pending" && canEdit)) && (
            <Button
              disabled={busy}
              onClick={() => onExecute(request.id, request.version)}
            >
              {request.status === "executing"
                ? "Reintentar conciliación"
                : "Aprobar y ejecutar reparto"}
            </Button>
          )}
        <ButtonLink
          variant="chip"
          href={`/mi-cuenta/franquicias/${request.projectId}`}
        >
          Ver franquicia
        </ButtonLink>
      </div>
    </article>
  );
}
export function DistributionRequestList({
  requests,
  ...actions
}: RequestListProps) {
  return (
    <div className="mt-5 space-y-4">
      {requests.length === 0 ? (
        <p className="text-sm text-[#527164]">
          No hay propuestas de reparto registradas.
        </p>
      ) : (
        requests.map((request) => (
          <RequestCard
            key={`${request.id}-${request.version}`}
            request={request}
            {...actions}
          />
        ))
      )}
    </div>
  );
}
