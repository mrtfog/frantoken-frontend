export function formatMinorAmount(amount: string, decimals = 6): string {
  const digits = BigInt(amount)
    .toString()
    .padStart(decimals + 1, "0");
  const fraction = digits.slice(-decimals).replace(/0+$/, "");
  return `${digits.slice(0, -decimals)}${fraction ? `.${fraction}` : ""}`;
}
