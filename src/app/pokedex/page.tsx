import PokemonGrid from "../components/pokemon-grid";
import { fetchInitialPokemons } from "@/services/pokemonApi";
import { Pokemon } from "@/types/pokemon";

export default async function Pokedex() {
  // Fetch les 10 premiers Pokémon côté serveur
  let initialPokemons: Pokemon[] = [];
  let hasError = false;
  
  try {
    initialPokemons = await fetchInitialPokemons(10);
  } catch (error) {
    console.error("Failed to fetch initial pokemons:", error);
    hasError = true;
  }

  return (
    <div className="flex flex-col items-center justify-start pt-8 pb-8">
      {hasError && initialPokemons.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-bold mb-4 text-error">Erreur de connexion</h2>
          <p className="text-gray-400 mb-4">
            Impossible de charger les Pokémon depuis l'API.
          </p>
          <p className="text-sm text-gray-500">
            Vérifiez votre connexion Internet et réessayez.
          </p>
        </div>
      ) : (
        <PokemonGrid initialPokemons={initialPokemons} />
      )}
    </div>
  );
}
