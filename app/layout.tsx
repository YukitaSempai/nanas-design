import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Nanas Design — flores que guardan tus momentos",
  description: "Floristería y tienda de regalos en Aragua, Venezuela. Arreglos florales, ramos de rosas eternas, bouquets para bodas y eventos y combos con snacks, con envíos a todo el país.",
  // Icono de pestaña: el logotipo del negocio (generado desde img/01.png).
  icons: {
    icon: [
      { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/brand/apple-touch-icon.png",
  },
  openGraph: { title: "Nanas Design", description: "Flores hechas para durar, recuerdos hechos para quedarse.", images: ["/img/02.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
