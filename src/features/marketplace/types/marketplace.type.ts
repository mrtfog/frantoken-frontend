export type DemoProject = {
  id: string;
  name: string;
  sector: "Comida rápida" | "Cafetería" | "Restaurantes";
  format: string;
  descriptor: string;
  company: string;
  franchise: string;
  officialUrl: string;
  logoUrl?: string;
  palette: "lime" | "peach" | "lavender" | "mint";
  annualizedRoiScenario: readonly number[];
};

export type SectorFilter = DemoProject["sector"] | "Todos";
export type SortOrder = "featured" | "name";

export type MarketplaceCatalogProps = {
  visibleProjects: readonly DemoProject[];
  query: string;
  sector: SectorFilter;
  sort: SortOrder;
  onQueryChange: (value: string) => void;
  onSectorChange: (value: SectorFilter) => void;
  onSortChange: (value: SortOrder) => void;
  onClearFilters: () => void;
};
