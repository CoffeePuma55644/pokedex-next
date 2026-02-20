"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Pokemon } from "@/types/pokemon";
import { fetchPokemons, fetchMultiplePokemonsDetails } from "@/services/pokemonApi";

const ITEMS_PER_PAGE = 30;

export function usePokemonPagination(initialPokemons?: Pokemon[]) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  
  const [currentPage, setCurrentPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons || []);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(!initialPokemons);
  const [error, setError] = useState<Error | null>(null);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // loadPage is responsible for fetching data only.
  // URL updates are handled separately by goToPage to avoid an infinite loop:
  // router.push → searchParams changes → loadPage recreated → useEffect re-runs → router.push → ...
  const loadPage = useCallback(async (page: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const offset = (page - 1) * ITEMS_PER_PAGE;
      const response = await fetchPokemons(ITEMS_PER_PAGE, offset);
      
      setTotalCount(response.count);
      
      const details = await fetchMultiplePokemonsDetails(response.results);
      setPokemons(details);
    } catch (err) {
      setError(err as Error);
      console.error("Failed to load page:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const page = pageParam ? parseInt(pageParam) : 1;
    setCurrentPage(page);
    loadPage(page);
  }, [pageParam, loadPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    // Trigger the page load via URL change
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: true });
  };

  return {
    currentPage,
    totalPages,
    pokemons,
    totalCount,
    isLoading,
    error,
    goToPage,
    nextPage: () => goToPage(currentPage + 1),
    prevPage: () => goToPage(currentPage - 1),
  };
}
