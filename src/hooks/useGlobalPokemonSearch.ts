"use client";

import { useState, useCallback } from "react";
import { Pokemon, PokemonListItem } from "@/types/pokemon";
import { searchInIndex } from "@/services/pokemonIndex";
import { fetchPokemonDetails, fetchMultiplePokemonsDetails, fetchPokemonsByType } from "@/services/pokemonApi";

const ITEMS_PER_PAGE = 30;

export function useGlobalPokemonSearch() {
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState<'name' | 'id' | 'type'>('name');
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const performSearch = useCallback(async (searchQuery: string, type: 'name' | 'id' | 'type', page: number = 1) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setTotalResults(0);
      setSearchError(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setCurrentPage(page);

    try {
      let resultsToFetch: { name: string }[] = [];

      if (type === 'type') {
        // Recherche par type
        const typeResults = await fetchPokemonsByType(searchQuery.toLowerCase().trim());
        resultsToFetch = typeResults;
      } else {
        // Recherche par nom ou ID via l'index
        const indexResults = searchInIndex(searchQuery, type);
        resultsToFetch = indexResults;
      }

      setTotalResults(resultsToFetch.length);

      // Pagination des résultats de recherche
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const paginatedResults = resultsToFetch.slice(offset, offset + ITEMS_PER_PAGE);

      if (paginatedResults.length === 0 && resultsToFetch.length > 0) {
        setSearchError("Page invalide");
        return;
      }

      const details = await fetchMultiplePokemonsDetails(paginatedResults as PokemonListItem[]);
      setSearchResults(details);
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults([]);
      setSearchError("Erreur lors de la recherche. Veuillez réessayer.");
    } finally {
      setIsSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setSearchResults([]);
    setSearchError(null);
    setTotalResults(0);
    setCurrentPage(1);
  }, []);

  return {
    query,
    setQuery,
    searchType,
    setSearchType,
    searchResults,
    isSearching,
    searchError,
    totalResults,
    currentPage,
    performSearch,
    clearSearch,
    totalPages: Math.ceil(totalResults / ITEMS_PER_PAGE)
  };
}
