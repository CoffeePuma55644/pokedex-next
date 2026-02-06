"use client";

import { Pokemon, TYPE_COLORS } from "@/types/pokemon";
import Image from "next/image";

interface PokemonDetailModalProps {
  pokemon: Pokemon | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PokemonDetailModal({
  pokemon,
  isOpen,
  onClose,
}: PokemonDetailModalProps) {
  if (!pokemon) return null;

  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default ||
    "/images/placeholder.webp";

  const getPrimaryType = () => {
    return pokemon.types[0]?.type.name || "normal";
  };

  const getHeightInM = (height: number) => {
    return (height * 0.1).toFixed(1);
  };

  const getWeightInKg = (weight: number) => {
    return (weight * 0.1).toFixed(1);
  };

  return (
    <>
      {isOpen && (
        <dialog id="pokemon-modal" className="modal modal-open modal-middle">
          <div className="modal-box w-11/12 max-w-md">
            {/* Close button */}
            <form method="dialog" className="absolute top-4 right-4">
              <button className="btn btn-sm btn-circle btn-ghost">✕</button>
            </form>

            {/* Image */}
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32">
                <Image
                  src={imageUrl}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Name et ID */}
            <h2 className="font-bold text-2xl capitalize text-center mb-1">
              {pokemon.name}
            </h2>
            <p className="text-center text-gray-500 mb-4">
              #{pokemon.id.toString().padStart(3, "0")}
            </p>

            {/* Types */}
            <div className="flex justify-center gap-2 mb-4">
              {pokemon.types.map((typeDetail) => {
                const badgeColor =
                  TYPE_COLORS[typeDetail.type.name] || "badge-neutral";
                return (
                  <span
                    key={typeDetail.type.name}
                    className={`badge ${badgeColor}`}
                  >
                    {typeDetail.type.name}
                  </span>
                );
              })}
            </div>

            {/* Physical info */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-center">
              <div className="bg-base-200 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Height</p>
                <p className="font-bold">{getHeightInM(pokemon.height)}m</p>
              </div>
              <div className="bg-base-200 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Weight</p>
                <p className="font-bold">{getWeightInKg(pokemon.weight)}kg</p>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-4">
              <h3 className="font-bold text-sm mb-3">Stats</h3>
              <div className="space-y-2">
                {pokemon.stats.slice(0, 6).map((stat) => (
                  <div key={stat.stat.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs capitalize">
                        {stat.stat.name}
                      </span>
                      <span className="text-xs font-bold">
                        {stat.base_stat}
                      </span>
                    </div>
                    <progress
                      className="progress progress-primary w-full"
                      value={stat.base_stat}
                      max="150"
                    ></progress>
                  </div>
                ))}
              </div>
            </div>

            {/* Close action */}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-primary w-full">Close</button>
              </form>
            </div>
          </div>

          {/* Backdrop */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      )}
    </>
  );
}
