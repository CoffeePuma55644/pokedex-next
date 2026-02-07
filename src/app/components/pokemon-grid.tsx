"use client";

import { useState } from "react";
import { SearchIcon, Sparkles } from "lucide-react";
import { Pokemon } from "@/types/pokemon";
import { usePokemonPagination } from "@/hooks/usePokemonPagination";
import { usePokemonIndex } from "@/hooks/usePokemonIndex";
import PokemonCard from "./pokemon-card";
import PokemonDetailModal from "./pokemon-detail-modal";
import PokemonSearchModal from "./pokemon-search-modal";
import Pagination from "./pagination";

interface PokemonGridProps {
  initialPokemons: Pokemon[];
}

export default function PokemonGrid({
  initialPokemons,
}: PokemonGridProps) {
  // Initialize Global Index
  usePokemonIndex();

  // Classic Pagination Hook
  const {
    currentPage,
    totalPages,
    pokemons,
    totalCount,
    isLoading,
    error,
    goToPage
  } = usePokemonPagination(initialPokemons);

  // Search Modal state
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchedPokemon, setSearchedPokemon] = useState<Pokemon | null>(null);

  // Detail Modal state
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Gestion de l'ouverture de la modal de détails
  const handleCardClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    setIsDetailModalOpen(true);
  };

  // Gestion de la sélection depuis la recherche globale
  const handleSelectFromSearch = (pokemon: Pokemon) => {
    setSearchedPokemon(pokemon);
    setIsSearchModalOpen(false);
    
    // On ouvre directement les détails du Pokémon trouvé
    setSelectedPokemon(pokemon);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Search Trigger Section */}
      <div className="w-full max-w-4xl px-4 mx-auto mb-12 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-base-200/50 p-6 rounded-3xl border border-primary/10 backdrop-blur-md">
          <div className="space-y-1">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Base de données mondiale
            </h2>
            <p className="text-sm text-base-content/60">
              Explorez {totalCount || 1350}+ Pokémon par nom, ID ou type.
            </p>
          </div>
          
          <button 
            onClick={() => setIsSearchModalOpen(true)}
            className="btn btn-primary rounded-2xl gap-2 w-full md:w-auto px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-all"
          >
            <SearchIcon className="w-5 h-5" />
            Recherche Globale
          </button>
        </div>

        {searchedPokemon && (
          <div className="flex items-center justify-between p-3 px-5 bg-primary/10 rounded-xl border border-primary/20 animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-primary animate-pulse"></span>
              <p className="text-sm font-medium">
                Dernier résultat trouvé : <span className="capitalize font-bold text-primary">{searchedPokemon.name}</span>
              </p>
            </div>
            <button 
              onClick={() => setSearchedPokemon(null)}
              className="btn btn-ghost btn-xs btn-circle"
            >
              <SearchIcon className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Main Grid Section */}
      <div className="w-full px-4 max-w-7xl mx-auto">
        {isLoading && pokemons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <span className="loading loading-spinner loading-xl text-primary"></span>
            <p className="text-base-content/60 font-medium animate-pulse">Synchronisation avec le Pokédex...</p>
          </div>
        ) : error ? (
          <div className="alert alert-error max-w-md mx-auto">
            <span>Une erreur est survenue lors du chargement des Pokémon.</span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
              {pokemons.map((pokemon) => (
                <div 
                  key={pokemon.id} 
                  className={`${searchedPokemon?.id === pokemon.id ? 'ring-4 ring-primary ring-offset-4 ring-offset-base-100 rounded-2xl scale-105 transition-all duration-500' : ''}`}
                >
                  <PokemonCard
                    pokemon={pokemon}
                    onClick={handleCardClick}
                  />
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-12">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                isLoading={isLoading}
              />
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <PokemonSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        onSelectPokemon={handleSelectFromSearch}
      />

      <PokemonDetailModal
        pokemon={selectedPokemon}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedPokemon(null);
        }}
      />
    </div>
  );
}
