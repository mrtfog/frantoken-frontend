import { auditActionLabels } from "../constants/franchise.constants";
import type { FranchiseEvent } from "../types/franchise.type";

export function FranchiseHistory({ events }: { events: FranchiseEvent[] }) {
  return (
    <section className="mt-8 rounded-xl border border-[#173d34]/15 bg-[#fffef8] p-6">
      <h2 className="text-xl font-bold">Historial de gestión</h2>
      {events.length === 0 ? (
        <p className="mt-3 text-sm text-[#527164]">
          Todavía no hay movimientos registrados.
        </p>
      ) : (
        <ol className="mt-5 space-y-4">
          {events.map((event) => (
            <li
              key={event.id}
              className="border-l-2 border-[#b7ce99] pl-4 text-sm"
            >
              <p className="font-bold">
                {auditActionLabels[event.action] ?? "Gestión registrada"}
              </p>
              <p className="mt-1 text-xs text-[#527164]">
                <time dateTime={event.createdAt}>
                  {new Date(event.createdAt).toLocaleString("es-AR", {
                    timeZone: "America/Argentina/Buenos_Aires",
                  })}
                </time>{" "}
                ·{" "}
                {event.actorRole === "superadmin"
                  ? "Gestión interna"
                  : "Creador"}
              </p>
              {typeof event.details.note === "string" && (
                <p className="mt-2 whitespace-pre-wrap">{event.details.note}</p>
              )}
              {typeof event.details.status === "string" && (
                <p className="mt-1">Estado: {event.details.status}</p>
              )}
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
