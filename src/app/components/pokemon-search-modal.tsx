"use client";

import { useState, useEffect, useRef } from "react";
import { SearchIcon, X, Hash, Type, Info } from "lucide-react";
import { Pokemon } from "@/types/pokemon";
import { useGlobalPokemonSearch } from "@/hooks/useGlobalPokemonSearch";
import PokemonCard from "./pokemon-card";
import Pagination from "./pagination";

interface PokemonSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPokemon: (pokemon: Pokemon) => void;
}

export default function PokemonSearchModal({
  isOpen,
  onClose,
  onSelectPokemon
}: PokemonSearchModalProps) {
  const {
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
    totalPages
  } = useGlobalPokemonSearch();

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Clear debounce when modal closes
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    }
  }, [isOpen]);

  useEffect(() => {
    // Clear previous debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (query.length >= 2 || (searchType === 'id' && query.length >= 1)) {
        performSearch(query, searchType, 1);
      }
    }, 500);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [query, searchType, performSearch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-base-100 w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-primary/20">
        {/* Header */}
        <div className="p-4 border-b border-base-300 flex items-center justify-between bg-primary/5">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <SearchIcon className="w-5 h-5 text-primary" />
            Recherche Mondiale
          </h2>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input & Filters */}
        <div className="p-6 space-y-4 bg-base-200/50">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder={
                searchType === 'name' ? "Chercher par nom (ex: Pikachu)..." :
                searchType === 'id' ? "Chercher par numéro (ex: 25)..." :
                "Chercher par type (ex: electric, water)..."
              }
              className="input input-bordered w-full pl-12 h-14 text-lg focus:input-primary transition-all shadow-inner"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 w-6 h-6" />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSearchType('name')}
              className={`btn btn-sm gap-2 ${searchType === 'name' ? 'btn-primary' : 'btn-ghost'}`}
            >
              <Info className="w-4 h-4" /> Par Nom
            </button>
            <button
              onClick={() => setSearchType('id')}
              className={`btn btn-sm gap-2 ${searchType === 'id' ? 'btn-primary' : 'btn-ghost'}`}
            >
              <Hash className="w-4 h-4" /> Par Numéro
            </button>
            <button
              onClick={() => setSearchType('type')}
              className={`btn btn-sm gap-2 ${searchType === 'type' ? 'btn-primary' : 'btn-ghost'}`}
            >
              <Type className="w-4 h-4" /> Par Type
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-6">
          {searchError ? (
            <div className="alert alert-error max-w-md mx-auto">
              <span>{searchError}</span>
            </div>
          ) : isSearching ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <span className="loading loading-spinner loading-lg text-primary"></span>
              <p className="text-base-content/60 font-medium">Recherche dans les archives...</p>
            </div>
          ) : query.length > 0 ? (
            <>
              {searchResults.length > 0 ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-base-content/60">
                      {totalResults} résultat{totalResults > 1 ? 's' : ''} trouvé{totalResults > 1 ? 's' : ''}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((pokemon) => (
                      <div 
                        key={pokemon.id} 
                        className="transform hover:scale-[1.02] transition-transform"
                      >
                        <PokemonCard 
                          pokemon={pokemon} 
                          onClick={() => onSelectPokemon(pokemon)}
                        />
                      </div>
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => performSearch(query, searchType, page)}
                    />
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="bg-base-200 p-6 rounded-full">
                    <X className="w-12 h-12 text-base-content/20" />
                  </div>
                  <div>
                    <p className="text-xl font-bold">Aucun Pokémon trouvé</p>
                    <p className="text-base-content/60">Essayez une autre recherche ou changez de filtre.</p>
                  </div>
                </div>
              )
            }
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 text-base-content/40">
              <Info className="w-16 h-16 opacity-20" />
              <p className="max-w-xs">
                Commencez à taper pour rechercher parmi les 1 350+ Pokémon de la base de données mondiale.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
