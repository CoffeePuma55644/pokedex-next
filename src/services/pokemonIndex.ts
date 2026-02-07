import { fetchAllPokemonNames } from "./pokemonApi";
import { PokemonIndexItem } from "@/types/pokemon";

let pokemonIndex: PokemonIndexItem[] = [];
let isInitialized = false;

/**
 * Initialise l'index global des Pokémon
 */
export async function initializePokemonIndex(): Promise<PokemonIndexItem[]> {
  if (isInitialized) return pokemonIndex;

  try {
    pokemonIndex = await fetchAllPokemonNames();
    isInitialized = true;
    return pokemonIndex;
  } catch (error) {
    console.error("Failed to initialize pokemon index:", error);
    return [];
  }
}

/**
 * Recherche dans l'index par nom ou ID
 */
export function searchInIndex(
  query: string,
  type: 'name' | 'id' | 'type' = 'name'
): PokemonIndexItem[] {
  if (!query) return [];
  
  const normalizedQuery = query.toLowerCase().trim();

  if (type === 'id') {
    const id = parseInt(normalizedQuery);
    if (isNaN(id)) return [];
    return pokemonIndex.filter(p => p.id === id);
  }

  // Pour le nom, on fait un substring match
  return pokemonIndex.filter(p => 
    p.name.toLowerCase().includes(normalizedQuery)
  ).sort((a, b) => {
    // Score simple: exact match > starts with > includes
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    
    if (aName === normalizedQuery) return -1;
    if (bName === normalizedQuery) return 1;
    
    if (aName.startsWith(normalizedQuery) && !bName.startsWith(normalizedQuery)) return -1;
    if (!aName.startsWith(normalizedQuery) && bName.startsWith(normalizedQuery)) return 1;
    
    return aName.localeCompare(bName);
  });
}

/**
 * Récupère un Pokémon par son ID depuis l'index
 */
export function getPokemonFromIndex(id: number): PokemonIndexItem | undefined {
  return pokemonIndex.find(p => p.id === id);
}

/**
 * Récupère un Pokémon par son nom depuis l'index
 */
export function getPokemonByNameFromIndex(name: string): PokemonIndexItem | undefined {
  return pokemonIndex.find(p => p.name === name);
}

export function getIsIndexInitialized(): boolean {
  return isInitialized;
}
