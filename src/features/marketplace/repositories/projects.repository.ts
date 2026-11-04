import { API_URL, apiEnabled } from "@/core/config/api.config";
import { demoProjects } from "../constants/marketplace.constants";
import type { DemoProject } from "../types/marketplace.type";

async function read<T>(url: string): Promise<T> {
  const response = await fetch(url, { cache: "no-store" });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.error?.message || "No se pudo cargar el proyecto.");
  return data as T;
}
export async function readProjects(): Promise<readonly DemoProject[]> {
  if (!apiEnabled) return demoProjects;
  return (await read<{ projects: DemoProject[] }>(`${API_URL}/api/projects`))
    .projects;
}
export async function readProject(slug: string): Promise<DemoProject | null> {
  if (!apiEnabled) return demoProjects.find((p) => p.id === slug) ?? null;
  const response = await fetch(
    `${API_URL}/api/projects/${encodeURIComponent(slug)}`,
    { cache: "no-store" },
  );
  if (response.status === 404) return null;
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.error?.message || "No se pudo cargar la ficha.");
  return data.project;
}
