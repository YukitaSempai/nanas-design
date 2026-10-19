import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Nanas Design — flores que guardan tus momentos",
  description: "Arreglos florales artesanales hechos con cintas y telas. Diseños únicos para acompañar tus momentos más especiales.",
  openGraph: { title: "Nanas Design", description: "Flores hechas para durar, recuerdos hechos para quedarse.", images: ["/img/02.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
