import { Suspense } from "react";
import PokemonGrid from "../components/pokemon-grid";
import { fetchInitialPokemons } from "@/services/pokemonApi";
import { Pokemon } from "@/types/pokemon";

export default async function Pokedex() {
  // Fetch les 30 premiers Pokémon côté serveur
  let initialPokemons: Pokemon[] = [];
  let hasError = false;
  
  try {
    initialPokemons = await fetchInitialPokemons(30);
  } catch (error) {
    console.error("Failed to fetch initial pokemons:", error);
    hasError = true;
  }

  return (
    <div className="flex flex-col items-center justify-start pt-8 pb-8 w-full">
      {hasError && initialPokemons.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4 text-error">Erreur de connexion</h2>
          <p className="text-gray-400 mb-4">
            Impossible de charger les Pokémon depuis l'API.
          </p>
        </div>
      ) : (
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <span className="loading loading-spinner loading-xl text-primary"></span>
            <p className="text-base-content/60 font-medium">Chargement du Pokédex...</p>
          </div>
        }>
          <PokemonGrid initialPokemons={initialPokemons} />
        </Suspense>
      )}
    </div>
  );
}
