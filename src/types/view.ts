import { Character } from "./character";
import { Location } from "./location";

export type ViewType = "characters" | "locations" | "episodes";

export interface ViewConfig {
  id: ViewType;
  label: string;
  icon?: string;
  filtersComponent: React.ComponentType<any>;
  cardComponent: React.ComponentType<any>;
  skeletonComponent: React.ComponentType<any>;
  useHook: () => any;
}

export interface ViewData {
  characters: Character[];
  locations: Location[];
  episodes: any[]; // TODO: Definir tipo de Episode
}

export interface ViewFilters {
  characters: {
    name: string;
    status: string;
    species: string;
    gender: string;
  };
  locations: {
    name: string;
    type: string;
    dimension: string;
  };
  episodes: {
    name: string;
    season: string;
  };
}
