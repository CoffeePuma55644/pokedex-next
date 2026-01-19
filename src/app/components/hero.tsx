export default function Hero() {
    return(
              <div className="hero min-h-[calc(100vh-4rem)] bg-linear-to-br from-base-200 via-base-100 to-base-200">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            <div className="mb-8">
              <div className="inline-block p-6 bg-linear-to-br from-primary/20 to-secondary/20 rounded-full shadow-2xl animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
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
              <button className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Parcourir le Pokédex
              </button>
              <button className="btn btn-secondary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Recherche aléatoire
              </button>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="stat bg-base-100 shadow-lg rounded-box border border-primary/20">
                <div className="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                  </svg>
                </div>
                <div className="stat-title">Pokémon</div>
                <div className="stat-value text-primary">1000+</div>
                <div className="stat-desc">Tous les Pokémon disponibles</div>
              </div>

              <div className="stat bg-base-100 shadow-lg rounded-box border border-secondary/20">
                <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="stat-title">Types</div>
                <div className="stat-value text-secondary">18</div>
                <div className="stat-desc">Différents types de Pokémon</div>
              </div>

              <div className="stat bg-base-100 shadow-lg rounded-box border border-accent/20">
                <div className="stat-figure text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
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