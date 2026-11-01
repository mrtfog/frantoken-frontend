import { apiEnabled, apiFetch } from "@/core/config/api";
import type { DemoProject } from "../types/marketplace.type";
import { getDemoProjects } from "./getDemoProjects.service";

// El backend devuelve cada proyecto con campos extra (status, price, token,
// availability); acá tomamos solo lo que el catálogo necesita (DemoProject).
type ApiProject = DemoProject & { logoUrl?: string | null };
type ProjectsResponse = { projects: ApiProject[] };

function toDemoProject(project: ApiProject): DemoProject {
  return {
    id: project.id,
    name: project.name,
    sector: project.sector,
    format: project.format,
    descriptor: project.descriptor,
    company: project.company,
    franchise: project.franchise,
    officialUrl: project.officialUrl,
    logoUrl: project.logoUrl ?? undefined,
    palette: project.palette,
    annualizedRoiScenario: project.annualizedRoiScenario,
  };
}

/**
 * Catálogo de franquicias. Usa la API real si NEXT_PUBLIC_API_URL está
 * configurada; si no, cae a los datos de demostración locales.
 */
export async function getProjects(): Promise<readonly DemoProject[]> {
  if (!apiEnabled) return getDemoProjects();
  const { projects } = await apiFetch<ProjectsResponse>("/api/projects");
  return projects.map(toDemoProject);
}
