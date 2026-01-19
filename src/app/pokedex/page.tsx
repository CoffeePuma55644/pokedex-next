import Link from "next/link";
import Navbar from "../components/navbar";

export default function Pokedex() {
    return (
        <>
            <Navbar />
            <div>
                <h1>Le Pokedex</h1>
                <Link href={"./"}>
                    <button className="btn">Retour</button >
                </Link>
            </div >
        </>
    )
}