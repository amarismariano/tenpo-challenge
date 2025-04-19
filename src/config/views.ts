import { ViewConfig } from "../types/view";
import CharacterFilters from "../components/Character/CharacterFilters";
import LocationFilters from "../components/Location/LocationFilters";
import CharacterCard from "../components/Character/CharacterCard";
import LocationCard from "../components/Location/LocationCard";
import CharacterSkeletonList from "../components/Character/CharacterSkeleton";
import LocationSkeletonList from "../components/Location/LocationSkeleton";
import { useCharacters } from "../hooks/useCharacters";
import { useLocations } from "../hooks/useLocations";

export const views: ViewConfig[] = [
  {
    id: "characters",
    label: "Characters",
    icon: "👤",
    filtersComponent: CharacterFilters,
    cardComponent: CharacterCard,
    skeletonComponent: CharacterSkeletonList,
    useHook: useCharacters,
  },
  {
    id: "locations",
    label: "Locations",
    icon: "🌍",
    filtersComponent: LocationFilters,
    cardComponent: LocationCard,
    skeletonComponent: LocationSkeletonList,
    useHook: useLocations,
  },
  // {
  //   id: "episodes",
  //   label: "Episodes",
  //   icon: "🎬",
  //   filtersComponent: EpisodeFilters,
  //   cardComponent: EpisodeCard,
  //   skeletonComponent: EpisodeSkeletonList,
  //   useHook: useEpisodes,
  // },
];
