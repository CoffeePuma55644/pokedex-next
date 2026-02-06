"use client";

import { useState, useCallback, useEffect } from "react";
import { Pokemon } from "@/types/pokemon";
import {
  fetchPokemons,
  fetchMultiplePokemonsDetails,
} from "@/services/pokemonApi";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { usePokemonSearch } from "@/hooks/usePokemonSearch";
import PokemonCard from "./pokemon-card";
import PokemonDetailModal from "./pokemon-detail-modal";

interface PokemonGridProps {
  initialPokemons: Pokemon[];
}

export default function PokemonGrid({
  initialPokemons,
}: PokemonGridProps) {
  // State
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(10); // Commençons à 10 car les 10 premiers sont déjà chargés

  // Modal state
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtre les Pokémon selon la recherche
  const filteredPokemons = usePokemonSearch(pokemons, searchQuery);

  // Fonction pour charger plus de Pokémon
  const loadMorePokemons = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const listResponse = await fetchPokemons(10, offset);
      
      if (listResponse.results.length === 0) {
        setHasMore(false);
        return;
      }

      const newPokemons = await fetchMultiplePokemonsDetails(
        listResponse.results
      );

      setPokemons((prev) => [...prev, ...newPokemons]);
      setOffset((prev) => prev + 10);

      // Vérifier s'il y a d'autres Pokémon à charger
      if (!listResponse.next) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more pokemons:", error);
    } finally {
      setIsLoading(false);
    }
  }, [offset, isLoading, hasMore]);

  // Hook pour infinite scroll
  const observerTarget = useInfiniteScroll(loadMorePokemons, isLoading);

  // Gestion de la recherche
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    // Réinitialiser le modal si ouvert
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };

  // Gestion de l'ouverture de la modal
  const handleCardClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsModalOpen(true);
  };

  // Gestion de la fermeture de la modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPokemon(null);
  };

  return (
    <>
      {/* Barre de recherche */}
      <div className="w-full max-w-md px-4 mx-auto mb-8">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="Rechercher un Pokémon..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </label>
      </div>

      {/* Affichage du nombre de résultats */}
      {searchQuery && (
        <div className="text-center mb-4 text-sm text-gray-400">
          {filteredPokemons.length} résultat(s) trouvé(s)
        </div>
      )}

      {/* Grille de Pokémon */}
      <div className="w-full px-4">
        {filteredPokemons.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            {searchQuery
              ? "Aucun Pokémon trouvé"
              : "Chargement des Pokémon..."}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
              {filteredPokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  onClick={handleCardClick}
                />
              ))}
            </div>

            {/* Infinite scroll trigger */}
            {!searchQuery && hasMore && (
              <div ref={observerTarget} className="h-10 flex justify-center mt-8">
                {isLoading && (
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                )}
              </div>
            )}

            {!hasMore && (
              <div className="text-center py-8 text-gray-400">
                Tous les Pokémon ont été chargés
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      <PokemonDetailModal
        pokemon={selectedPokemon}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
