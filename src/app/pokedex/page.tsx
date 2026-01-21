import Navbar from "../components/navbar";

export default function Pokedex() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start min-h-screen pt-8">
        <div className="w-full max-w-md px-4">
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
            <input type="search" className="grow" placeholder="Rechercher un Pokémon..." />
          </label>
        </div>
      </div>
    </>
  );
}
