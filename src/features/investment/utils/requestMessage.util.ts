export function principalUsd(units: string) {
  return /^[1-9]\d{0,5}$/.test(units)
    ? (BigInt(units) * BigInt(10)).toString()
    : "—";
}
