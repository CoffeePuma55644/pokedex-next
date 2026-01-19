export default function Footer() {
    return(
      <footer className="footer footer-center p-10 bg-base-300 text-base-content">
        <aside>
          <p className="font-bold text-lg">
            <span className="text-primary">Poké</span><span className="text-secondary">dex</span>
          </p> 
          <p>Votre encyclopédie Pokémon de référence</p>
          <p className="text-sm opacity-70">Données fournies par PokéAPI</p>
        </aside>
      </footer>
    )
}