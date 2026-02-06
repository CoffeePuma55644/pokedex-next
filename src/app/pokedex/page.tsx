import Navbar from "../components/navbar";
import PokemonGrid from "../components/pokemon-grid";
import { fetchInitialPokemons } from "@/services/pokemonApi";
import { Pokemon } from "@/types/pokemon";

export default async function Pokedex() {
  // Fetch les 10 premiers Pokémon côté serveur
  let initialPokemons: Pokemon[] = [];
  
  try {
    initialPokemons = await fetchInitialPokemons(10);
  } catch (error) {
    console.error("Failed to fetch initial pokemons:", error);
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start min-h-screen pt-8 pb-8">
        <PokemonGrid initialPokemons={initialPokemons} />
      </div>
    </>
  );
}
