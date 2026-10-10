export type DemoProject = {
  id: string;
  name: string;
  descriptor: string;
  sector: "Gastronomía" | "Bienestar" | "Servicios" | "Educación";
  city: string;
  format: string;
  stage: string;
  exampleAmount: number;
  palette: "lime" | "peach" | "lavender" | "mint" | "blue" | "sand";
  mark: string;
};

export type SectorFilter = DemoProject["sector"] | "Todos";
export type SortOrder = "featured" | "name" | "amount";
export type ArtPaletteClasses = {
  surface: string;
  ink: string;
  shape: string;
  outline: string;
};

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
