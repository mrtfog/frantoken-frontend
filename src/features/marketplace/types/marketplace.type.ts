export type DemoProject = {
  id: string;
  name: string;
  sector: string;
  format: string;
  descriptor: string;
  company: string;
  franchise: string;
  officialUrl: string;
  logoUrl?: string;
  palette: "lime" | "peach" | "lavender" | "mint";
  annualizedRoiScenario: readonly number[];
  status?: string;
  price?: {
    minor: string;
    currency: string;
    decimals: number;
    display: string;
  };
  token?: {
    symbol: string | null;
    address: string | null;
    investmentAgreement: string | null;
    onChain: boolean;
  };
  availability?: {
    totalUnits: string | null;
    unitsSold: string;
    unitsAvailable: string | null;
  };
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
