import { Pokemon, PokemonListResponse, PokemonListItem } from "@/types/pokemon";

const POKE_API_BASE = "https://pokeapi.co/api/v2";

// Cache simple pour éviter les appels API inutiles
const cache = new Map<string, any>();

// Fonction utilitaire pour ajouter un délai
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Retry avec backoff exponentiel
async function fetchWithRetry<T>(
  url: string,
  maxRetries: number = 3,
  timeout: number = 10000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(url, {
        next: { revalidate: 3600 }, // Cache pendant 1 heure
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      lastError = error as Error;
      console.warn(
        `Attempt ${attempt}/${maxRetries} failed for ${url}:`,
        error
      );

      // Attendre avant de retry (backoff exponentiel)
      if (attempt < maxRetries) {
        const delayMs = Math.min(1000 * Math.pow(2, attempt - 1), 10000);
        await sleep(delayMs);
      }
    }
  }

  throw lastError || new Error(`Failed to fetch ${url} after ${maxRetries} attempts`);
}

async function fetchFromAPI<T>(url: string): Promise<T> {
  // Vérifier le cache
  if (cache.has(url)) {
    return cache.get(url);
  }

  try {
    const data = await fetchWithRetry<T>(url);
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
 * Fetch les détails de plusieurs Pokémon avec limitation de concurrence
 */
async function fetchMultiplePokemonsDetailsWithLimit(
  pokemonList: PokemonListItem[],
  concurrencyLimit: number = 3
): Promise<Pokemon[]> {
  const results: Pokemon[] = [];
  
  for (let i = 0; i < pokemonList.length; i += concurrencyLimit) {
    const batch = pokemonList.slice(i, i + concurrencyLimit);
    const batchPromises = batch.map((item) =>
      fetchPokemonDetails(item.name)
    );

    try {
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Petit délai entre les batches pour ne pas surcharger l'API
      if (i + concurrencyLimit < pokemonList.length) {
        await sleep(100);
      }
    } catch (error) {
      console.error("Failed to fetch pokemon batch:", error);
      throw error;
    }
  }

  return results;
}

/**
 * Fetch les détails de plusieurs Pokémon en parallèle
 */
export async function fetchMultiplePokemonsDetails(
  pokemonList: PokemonListItem[]
): Promise<Pokemon[]> {
  try {
    return await fetchMultiplePokemonsDetailsWithLimit(pokemonList, 3);
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
