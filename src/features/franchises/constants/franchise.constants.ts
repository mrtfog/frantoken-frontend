export const applicationFields = [
  {
    name: "franchiseName",
    label: "Nombre de la franquicia",
    type: "text",
    maxLength: 100,
  },
  { name: "sector", label: "Sector", type: "text", maxLength: 80 },
  { name: "city", label: "Localidad", type: "text", maxLength: 80 },
  { name: "country", label: "País", type: "text", maxLength: 80 },
  {
    name: "totalCost",
    label: "Inversión estimada",
    type: "number",
    maxLength: undefined,
  },
  { name: "operatorName", label: "Operadora", type: "text", maxLength: 120 },
  {
    name: "estimatedOpening",
    label: "Mes estimado de apertura",
    type: "month",
    maxLength: undefined,
  },
] as const;
export const franchiseStatusLabels = [
  "En preparación",
  "Publicada",
  "En operación",
  "Cerrada",
];
export const requestStatusLabels = {
  pending: "Pendiente de revisión",
  observed: "Observada",
  executing: "Pendiente de conciliación",
  confirmed: "Confirmada",
};
export const auditActionLabels: Record<string, string> = {
  "application.created": "Solicitud presentada",
  "application.resubmitted": "Solicitud corregida y reenviada",
  "application.reviewed": "Solicitud revisada",
  "application.publishing": "Publicación iniciada",
  "application.published": "Franquicia y token publicados",
  "franchise.operation": "Estado operativo confirmado",
  "distribution.proposed": "Reparto propuesto",
  "distribution.corrected": "Propuesta corregida",
  "distribution.observed": "Propuesta observada",
  "distribution.executing": "Ejecución de reparto solicitada",
  "distribution.confirmed": "Reparto confirmado",
};
