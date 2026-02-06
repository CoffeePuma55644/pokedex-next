import { Pokemon, PokemonListResponse, PokemonListItem } from "@/types/pokemon";

const POKE_API_BASE = "https://pokeapi.co/api/v2";

// Cache simple pour éviter les appels API inutiles
const cache = new Map<string, any>();

async function fetchFromAPI<T>(url: string): Promise<T> {
  // Vérifier le cache
  if (cache.has(url)) {
    return cache.get(url);
  }

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache pendant 1 heure
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    cache.set(url, data);
    return data;
  } catch (error) {
    console.error(`Failed to fetch from API:`, error);
    throw error;
  }
}

/**
 * Fetch une liste paginée de Pokémon
 */
export async function fetchPokemons(
  limit: number = 10,
  offset: number = 0
): Promise<PokemonListResponse> {
  const url = `${POKE_API_BASE}/pokemon?limit=${limit}&offset=${offset}`;
  return fetchFromAPI<PokemonListResponse>(url);
}

/**
 * Fetch les détails complets d'un Pokémon par son ID ou nom
 */
export async function fetchPokemonDetails(
  idOrName: number | string
): Promise<Pokemon> {
  const url = `${POKE_API_BASE}/pokemon/${idOrName}`;
  return fetchFromAPI<Pokemon>(url);
}

/**
 * Fetch les détails de plusieurs Pokémon en parallèle
 */
export async function fetchMultiplePokemonsDetails(
  pokemonList: PokemonListItem[]
): Promise<Pokemon[]> {
  const pokemonPromises = pokemonList.map((item) =>
    fetchPokemonDetails(item.name)
  );

  try {
    const results = await Promise.all(pokemonPromises);
    return results;
  } catch (error) {
    console.error("Failed to fetch multiple pokemons:", error);
    throw error;
  }
}

/**
 * Fetch les premières N Pokémon et retourne les détails complets
 */
export async function fetchInitialPokemons(
  limit: number = 10
): Promise<Pokemon[]> {
  const listResponse = await fetchPokemons(limit, 0);
  return fetchMultiplePokemonsDetails(listResponse.results);
}
