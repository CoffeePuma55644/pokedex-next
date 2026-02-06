import Link from "next/link";
import { Menu, Search } from "lucide-react";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 shadow-lg sticky top-0 z-50 border-b border-base-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <Menu className="h-5 w-5" />
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li><Link href="/pokedex">Pokédex</Link></li>
                        <li><a>Types</a></li>
                        <li><a>Générations</a></li>
                    </ul>
                </div>
                <Link href="/">
                    <h1 className="btn btn-ghost text-xl font-bold">
                        <p className="text-primary">Poké<span className="text-secondary">dex</span></p>
                    </h1>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link href="/pokedex" className="hover:text-primary transition-colors">Pokédex</Link></li>
                    <li><a className="hover:text-secondary transition-colors">Types</a></li>
                    <li><a className="hover:text-accent transition-colors">Générations</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <Search className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}