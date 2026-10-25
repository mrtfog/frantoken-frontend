import type {
  DemoProject,
  SectorFilter,
  SortOrder,
} from "../types/marketplace.type";
import { normalizeSearch } from "./marketplace.util";

export function filterProjects(
  projects: readonly DemoProject[],
  query: string,
  sector: SectorFilter,
  sort: SortOrder,
): DemoProject[] {
  const normalizedQuery = normalizeSearch(query);
  const filtered = projects.filter((project) => {
    const matchesSector = sector === "Todos" || project.sector === sector;
    const matchesQuery =
      !normalizedQuery ||
      normalizeSearch(
        `${project.name} ${project.descriptor} ${project.sector} ${project.format}`,
      ).includes(normalizedQuery);
    return matchesSector && matchesQuery;
  });

  if (sort === "name")
    return filtered.sort((a, b) => a.name.localeCompare(b.name, "es"));
  return filtered;
}
