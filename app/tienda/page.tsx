import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { storeCategories, storeItems } from "@/lib/tienda";

export const metadata: Metadata = {
  title: "Tienda — productos y servicios | Nanas Design",
  description: "Explora los productos y servicios de Nanas Design: flores artesanales, arreglos personalizados y detalles hechos para durar.",
};

export default function TiendaPage() {
  return <>
    <SiteHeader />
    <main>
      <section id="tienda" className="section-wrap pt-32 pb-14 md:pt-40 md:pb-20">
        <Reveal>
          <div className="eyebrow mb-6 flex items-center gap-3"><span className="h-px w-8 bg-[#a77e88]"/> Tienda Nanas Design</div>
          <h1 className="section-title max-w-[640px]">Productos<br/><em>y servicios.</em></h1>
          <p className="mt-6 max-w-[470px] text-[.95rem] leading-7 text-[#7d6b75]">Todo lo que creamos a mano, reunido en un solo lugar. Explora el catálogo y elige el detalle perfecto para regalar o quedarte.</p>
          <div className="mt-7"><Link href="https://wa.me/584128985585?text=Hola%2C%20quiero%20conocer%20sus%20productos" target="_blank" rel="noreferrer"><Button size="lg">¿Necesitas algo especial? Escríbenos <ArrowUpRight size={16}/></Button></Link></div>
        </Reveal>
      </section>

      <section id="catalogo" className="bg-[#f4efec] py-20 md:py-28">
        <div className="section-wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5 md:mb-14">
            <div>
              <div className="eyebrow mb-4">Nuestra colección completa</div>
              <h2 className="section-title">El catálogo<br/><em>de la tienda.</em></h2>
            </div>
            {/* Reservado para los filtros por categoría (fase futura): se poblará con `storeCategories`. */}
            {storeCategories.length > 0 && <div className="flex flex-wrap gap-2 pb-2">{storeCategories.map((category) => <span key={category.id} className="border border-[#765866]/25 bg-white/70 px-4 py-2 text-[.66rem] uppercase tracking-[.14em] text-[#624859]">{category.label}</span>)}</div>}
          </div>

          {/* Catálogo: se renderizará con `storeItems` cuando el catálogo esté cargado. */}
          {storeItems.length > 0 ? (
            <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {storeItems.map((item) => <article key={item.id} className="product-card">
                <div className="product-image"><ShoppingBag size={26} className="text-[#c6adb3]" aria-hidden/></div>
                <div className="px-5 pb-5 pt-5">
                  <div className="serif text-[1.7rem] leading-tight text-[#392c35]">{item.name}</div>
                  <p className="mt-2 min-h-[48px] text-xs leading-5 text-[#877780]">{item.description}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-[#493743]/[.08] pt-4"><span className="text-xs font-medium text-[#704c62]">{item.priceLabel ?? `$${item.price}`}</span></div>
                </div>
              </article>)}
            </div>
          ) : (
            <div className="border border-dashed border-[#493743]/20 bg-white/50 px-6 py-16 text-center md:py-20">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#ead4d2]"><ShoppingBag size={22} className="text-[#8d6574]" aria-hidden/></span>
              <p className="serif mx-auto mt-5 max-w-[420px] text-[1.6rem] leading-snug text-[#392c35]">El catálogo se está preparando con cariño</p>
              <p className="mx-auto mt-3 max-w-[420px] text-sm leading-6 text-[#877780]">Muy pronto vas a poder descubrir aquí todos nuestros productos y servicios, con sus fotos, precios y detalles.</p>
            </div>
          )}
        </div>
      </section>

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
