export function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .trim();
}

export function formatExampleAmount(value: number) {
  return new Intl.NumberFormat("es-AR").format(value);
}
