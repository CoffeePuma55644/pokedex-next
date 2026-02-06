"use client";

import Image from "next/image";
import { Pokemon, TYPE_COLORS } from "@/types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: (pokemon: Pokemon) => void;
}

export default function PokemonCard({
  pokemon,
  onClick,
}: PokemonCardProps) {
  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default ||
    "/images/bulbizard.webp";

  const primaryType = pokemon.types[0]?.type.name || "normal";
  const badgeColor = TYPE_COLORS[primaryType] || "badge-neutral";

  return (
    <button
      onClick={() => onClick(pokemon)}
      className="hover-3d cursor-pointer"
    >
      {/* Contenu principal */}
      <figure className="w-60 rounded-2xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={pokemon.name}
          width={240}
          height={240}
          priority={false}
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Overlay avec infos */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-2xl text-white">
        {/* Nom et ID */}
        <h3 className="text-lg font-bold capitalize">
          {pokemon.name}
          <span className="text-xs text-gray-300 ml-2">#{pokemon.id}</span>
        </h3>

        {/* Types */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {pokemon.types.map((typeDetail) => (
            <span
              key={typeDetail.type.name}
              className={`badge ${badgeColor} badge-sm`}
            >
              {typeDetail.type.name}
            </span>
          ))}
        </div>
      </div>

      {/* 8 empty divs nécessaires pour l'effet 3D */}
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
}
