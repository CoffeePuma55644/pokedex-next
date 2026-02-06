import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

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
        {children}
      </body>
      <Analytics />
    </html>
  );
}
