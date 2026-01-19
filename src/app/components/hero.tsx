import Link from "next/link";
import { Box, Search, Heart, Info, Zap } from "lucide-react";

export default function Hero() {
    return (
        <div className="hero min-h-[calc(100vh-4rem)] bg-linear-to-br from-base-200 via-base-100 to-base-200">
            <div className="hero-content text-center">
                <div className="max-w-4xl">
                    <div className="mb-8">
                        <div className="inline-block p-6 bg-linear-to-br from-primary/20 to-secondary/20 rounded-full shadow-2xl animate-pulse">
                            <Box className="h-24 w-24 text-primary" />
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                        Bienvenue dans le Pokédex
                    </h1>

                    <p className="text-xl md:text-2xl mb-4 text-base-content/80">
                        Explorez l&apos;univers fascinant des Pokémon
                    </p>

                    <p className="text-lg mb-8 text-base-content/60 max-w-2xl mx-auto">
                        Découvrez plus de 1000 Pokémon, leurs statistiques, évolutions, capacités et bien plus encore.
                        Attrapez-les tous avec notre Pokédex interactif !
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href={"./pokedex"}>
                            <button className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all">
                                <Search className="h-6 w-6" />
                                Parcourir le Pokédex
                            </button>
                        </Link>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="stat bg-base-100 shadow-lg rounded-box border border-primary/20">
                            <div className="stat-figure text-primary">
                                <Heart className="w-8 h-8" />
                            </div>
                            <div className="stat-title">Pokémon</div>
                            <div className="stat-value text-primary">1000+</div>
                            <div className="stat-desc">Tous les Pokémon disponibles</div>
                        </div>

                        <div className="stat bg-base-100 shadow-lg rounded-box border border-secondary/20">
                            <div className="stat-figure text-secondary">
                                <Info className="w-8 h-8" />
                            </div>
                            <div className="stat-title">Types</div>
                            <div className="stat-value text-secondary">18</div>
                            <div className="stat-desc">Différents types de Pokémon</div>
                        </div>

                        <div className="stat bg-base-100 shadow-lg rounded-box border border-accent/20">
                            <div className="stat-figure text-accent">
                                <Zap className="w-8 h-8" />
                            </div>
                            <div className="stat-title">Générations</div>
                            <div className="stat-value text-accent">9</div>
                            <div className="stat-desc">De Kanto à Paldea</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}