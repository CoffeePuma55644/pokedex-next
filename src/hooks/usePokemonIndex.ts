"use client";

import { useState, useEffect } from "react";
import { PokemonIndexItem } from "@/types/pokemon";
import { initializePokemonIndex, getIsIndexInitialized } from "@/services/pokemonIndex";

export function usePokemonIndex() {
  const [indexedPokemons, setIndexedPokemons] = useState<PokemonIndexItem[]>([]);
  const [isLoading, setIsLoading] = useState(!getIsIndexInitialized());
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const init = async () => {
      if (getIsIndexInitialized()) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await initializePokemonIndex();
        setIndexedPokemons(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  return { indexedPokemons, isLoading, error };
}
