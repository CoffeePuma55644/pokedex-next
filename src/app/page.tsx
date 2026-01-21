import Feature from "./components/feature";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import PokemonCard from "./components/pokemon-card";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Feature />
      <PokemonCard />
      <Footer />
    </div>
  );
}
