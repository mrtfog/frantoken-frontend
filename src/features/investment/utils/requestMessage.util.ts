import type { AcademicOperation } from "../types/investment.type";

// Un mensaje canónico vincula firma, origen, despliegue, red y payload completo.
export function requestMessage(
  origin: string,
  deploymentId: string,
  deadline: number,
  operation: AcademicOperation,
) {
  const fields = Object.entries(operation).sort(([a], [b]) =>
    a.localeCompare(b),
  );
  return `FranToken MVP académico · operación simulada\n${JSON.stringify({ origin, chainId: 31337, deploymentId, deadline, operation: Object.fromEntries(fields) })}`;
}
export function principalUsd(units: string) {
  return /^[1-9]\d{0,5}$/.test(units)
    ? (BigInt(units) * BigInt(10)).toString()
    : "—";
}
