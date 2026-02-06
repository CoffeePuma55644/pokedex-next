import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Pokédex - Explorez le monde des Pokémon",
  description:
    "Découvrez tous les Pokémon, leurs statistiques, évolutions et capacités dans ce Pokédex interactif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" data-theme="catppuccin">
      <body className="antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
      <Analytics />
    </html>
  );
}
