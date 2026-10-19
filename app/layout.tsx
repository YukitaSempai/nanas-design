import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Nanas Design — flores que guardan tus momentos",
  description: "Floristería y tienda de regalos en Aragua, Venezuela. Arreglos florales, ramos de rosas eternas, bouquets para bodas y eventos y combos con snacks, con entregas semanales en Maracay.",
  openGraph: { title: "Nanas Design", description: "Flores hechas para durar, recuerdos hechos para quedarse.", images: ["/img/02.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
