import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TiendaClient } from "@/components/tienda-client";
import { storeCategories, storeItems } from "@/lib/tienda";

export const metadata: Metadata = {
  title: "Tienda — productos y servicios | Nanas Design",
  description: "Explora los productos y servicios de Nanas Design: flores artesanales, arreglos personalizados y detalles hechos para durar.",
};

export default function TiendaPage() {
  return <>
    <SiteHeader />
    <main>
      <TiendaClient items={storeItems} categories={storeCategories}/>

      <section className="section-wrap py-20 md:py-28">
        <Reveal className="mx-auto max-w-[620px] text-center">
          <div className="eyebrow mb-4">Hecho para ti</div>
          <h2 className="section-title">¿Imaginas algo<br/><em>único?</em></h2>
          <p className="mx-auto mt-5 max-w-[430px] text-sm leading-6 text-[#7d6b75]">Trabajamos piezas a medida según tu ocasión, tus colores y tu presupuesto. Cuéntanos tu idea y la creamos juntas.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4"><Link href="https://wa.me/584128985585?text=Hola%2C%20quiero%20encargar%20un%20arreglo" target="_blank" rel="noreferrer"><Button size="lg">Encargar por WhatsApp <ArrowUpRight size={16}/></Button></Link><Link href="/#productos"><Button size="lg" variant="outline">Ver destacados</Button></Link></div>
        </Reveal>
      </section>
    </main>
    <SiteFooter />
  </>;
}
