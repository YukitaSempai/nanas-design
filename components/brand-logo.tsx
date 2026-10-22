"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

type BrandLogoProps = {
  /** "header" para fondos claros, "footer" para el pie (fondo oscuro). */
  variant?: "header" | "footer";
};

/**
 * Logotipo de Nanas Design.
 *
 * - Si `brand.logo` está configurado, muestra el archivo en alta resolución
 *   respetando proporciones y transparencia.
 * - Si el archivo no está disponible (o `brand.logo` es null), dibuja el
 *   logotipo tipográfico original, de modo que nunca quede un hueco roto.
 */
export function BrandLogo({ variant = "header" }: BrandLogoProps) {
  const isFooter = variant === "footer";
  const [failed, setFailed] = useState(false);

  if (brand.logo && !failed) {
    const src = isFooter && brand.logo.srcLight ? brand.logo.srcLight : brand.logo.src;
    return (
      <Link href="/#inicio" aria-label={brand.name} className="inline-flex items-center">
        <Image
          src={src}
          alt={brand.logo.alt}
          width={brand.logo.width}
          height={brand.logo.height}
          priority={!isFooter}
          onError={() => setFailed(true)}
          className={isFooter ? "h-10 w-auto" : "h-11 w-auto"}
        />
      </Link>
    );
  }

  if (isFooter) {
    return <Link href="/#inicio" className="serif text-3xl text-white">nanas<span className="text-[#d9b8c0]">.</span></Link>;
  }

  return <Link href="/#inicio" className="serif text-[1.75rem] leading-none tracking-[-.04em] text-[#392c35]">nanas<span className="text-[#a77e88]">.</span><span className="ml-1 font-sans text-[.6rem] font-medium uppercase tracking-[.24em]">design</span></Link>;
}
