"use client";

import { useMemo, useCallback } from "react";
import { Pokemon } from "@/types/pokemon";

/**
 * Hook pour filtrer les Pokémon selon une recherche
 */
export function usePokemonSearch(
  pokemons: Pokemon[],
  searchQuery: string
): Pokemon[] {
  return useMemo(() => {
    if (!searchQuery.trim()) {
      return pokemons;
    }

    const query = searchQuery.toLowerCase().trim();

    return pokemons.filter((pokemon) => {
      // Rechercher par nom
      if (pokemon.name.toLowerCase().includes(query)) {
        return true;
      }

      // Rechercher par ID
      if (pokemon.id.toString().includes(query)) {
        return true;
      }

      // Rechercher par type
      if (
        pokemon.types.some((t) =>
          t.type.name.toLowerCase().includes(query)
        )
      ) {
        return true;
      }

      return false;
    });
  }, [pokemons, searchQuery]);
}
