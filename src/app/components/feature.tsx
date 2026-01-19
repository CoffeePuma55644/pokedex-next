export default function Feature() {
    return(
            <div className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Fonctionnalités du Pokédex
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <div className="text-primary text-4xl mb-4">🔍</div>
                <h3 className="card-title">Recherche avancée</h3>
                <p>Trouvez n&apos;importe quel Pokémon par nom, numéro ou type avec notre système de recherche intelligent.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <div className="text-secondary text-4xl mb-4">📊</div>
                <h3 className="card-title">Statistiques détaillées</h3>
                <p>Consultez toutes les stats, capacités, et informations essentielles de chaque Pokémon.</p>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <div className="text-accent text-4xl mb-4">🔄</div>
                <h3 className="card-title">Évolutions</h3>
                <p>Découvrez les chaînes d&apos;évolution complètes et les conditions requises.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}