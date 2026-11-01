// Cliente HTTP del backend FranToken.
//
// Si NEXT_PUBLIC_API_URL está definida, la app consume la API real (Render);
// si no, los repositorios siguen usando los datos demo locales. De esta forma
// la integración es opt-in y no rompe el modo de demostración existente.

const RAW_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/** Base de la API sin barra final (ej. https://frantoken-backend.onrender.com). */
export const API_URL = RAW_URL.replace(/\/+$/, "");

/** true cuando hay un backend configurado por variable de entorno. */
export const apiEnabled = API_URL.length > 0;

const TOKEN_KEY = "frantoken:token:v1";

export function getToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token: string): void {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // Almacenamiento no disponible (modo privado, etc.): se ignora.
  }
}

export function clearToken(): void {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Se ignora.
  }
}

type ApiFetchInit = Omit<RequestInit, "body"> & { body?: unknown };

/** Extrae el mensaje de error del contrato { error: { message } } del backend. */
function extractErrorMessage(data: unknown, status: number): string {
  if (data && typeof data === "object" && "error" in data) {
    const error = (data as { error: unknown }).error;
    if (error && typeof error === "object" && "message" in error) {
      const message = (error as { message: unknown }).message;
      if (typeof message === "string") return message;
    }
    if (typeof error === "string") return error;
  }
  return `Error ${status} al comunicarse con el servidor.`;
}

/**
 * fetch con la base de la API, JSON automático y token Bearer si existe.
 * Lanza Error con el mensaje del backend cuando la respuesta no es 2xx.
 */
export async function apiFetch<T>(
  path: string,
  init: ApiFetchInit = {},
): Promise<T> {
  const { body, headers, ...rest } = init;
  const token = getToken();

  const response = await fetch(`${API_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (response.status === 204) return undefined as T;

  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) throw new Error(extractErrorMessage(data, response.status));
  return data as T;
}
