// Types for Pokemon API responses
export interface PokemonType {
  name: string;
  url: string;
}

export interface PokemonTypeDetail {
  slot: number;
  type: PokemonType;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSprites;
  types: PokemonTypeDetail[];
  stats: PokemonStat[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonIndexItem {
  id: number;
  name: string;
}

export interface SearchResult extends PokemonIndexItem {
  score?: number;
  matchType: 'name' | 'id' | 'type';
}

export interface SearchState {
  query: string;
  type: 'name' | 'id' | 'type';
  results: Pokemon[];
  totalResults: number;
  isSearching: boolean;
  currentPage: number;
}

// Type mapping for Pokemon types to badge colors
export const TYPE_COLORS: Record<string, string> = {
  normal: "badge-neutral",
  fire: "badge-error",
  water: "badge-info",
  electric: "badge-warning",
  grass: "badge-success",
  ice: "badge-info",
  fighting: "badge-error",
  poison: "badge-secondary",
  ground: "badge-warning",
  flying: "badge-info",
  psychic: "badge-secondary",
  bug: "badge-success",
  rock: "badge-warning",
  ghost: "badge-secondary",
  dragon: "badge-primary",
  dark: "badge-neutral",
  steel: "badge-neutral",
  fairy: "badge-secondary",
};
