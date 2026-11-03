"use client";

import { useEffect, useMemo, useState } from "react";
import { getProjects } from "../services/getProjects.service";
import type {
  DemoProject,
  SectorFilter,
  SortOrder,
} from "../types/marketplace.type";
import { filterProjects } from "../utils/filterProjects.util";
import { MarketplaceCatalog } from "./MarketplaceCatalog";
import { MarketplaceCatalogSkeleton } from "./MarketplaceCatalogSkeleton";

export function MarketplaceCatalogContainer() {
  const [projects, setProjects] = useState<readonly DemoProject[] | null>(null);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState<SectorFilter>("Todos");
  const [sort, setSort] = useState<SortOrder>("featured");

  useEffect(() => {
    let active = true;
    getProjects()
      .then((result) => {
        if (active) setProjects(result);
      })
      .catch((e) => {
        if (active)
          setError(
            e instanceof Error ? e.message : "No se pudo cargar el catálogo.",
          );
      });
    return () => {
      active = false;
    };
  }, []);

  const visibleProjects = useMemo(
    () => filterProjects(projects ?? [], query, sector, sort),
    [projects, query, sector, sort],
  );

  if (error)
    return (
      <p role="alert" className="p-6">
        {error} Recargá para reintentar.
      </p>
    );
  if (!projects) return <MarketplaceCatalogSkeleton />;

  return (
    <MarketplaceCatalog
      visibleProjects={visibleProjects}
      query={query}
      sector={sector}
      sort={sort}
      onQueryChange={setQuery}
      onSectorChange={setSector}
      onSortChange={setSort}
      onClearFilters={() => {
        setQuery("");
        setSector("Todos");
      }}
    />
  );
}
