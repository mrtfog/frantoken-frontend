export function walletErrorCode(error: unknown): number | undefined {
  if (!error || typeof error !== "object") return undefined;
  if ("code" in error && typeof error.code === "number") return error.code;
  if (
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "originalError" in error.data
  ) {
    const original = error.data.originalError;
    if (
      original &&
      typeof original === "object" &&
      "code" in original &&
      typeof original.code === "number"
    )
      return original.code;
  }
  return undefined;
}
