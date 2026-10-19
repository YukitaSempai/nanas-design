import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarHeart, Clock, Flower2, Gift, MapPin, Sparkles, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TiendaClient } from "@/components/tienda-client";
import { ColeccionesExplorer } from "@/components/colecciones-explorer";
import { storeCategories, storeCollections, storeItems, storeMapsUrl, storeSchedule } from "@/lib/tienda";

export const metadata: Metadata = {
  title: "Tienda — flores y regalos en Maracay | Nanas Design",
  description: "Florista y tienda de regalos en Aragua, Venezuela. Arreglos florales, ramos de rosas eternas, bouquets para bodas y eventos, combos con snacks y entregas semanales en Maracay.",
};

const services = [
  { icon: Flower2, title: "Arreglos florales", body: "Rosas, girasoles, tulipanes, lirios y mucho más 🌻🌹🌷" },
  { icon: CalendarHeart, title: "Bodas y eventos", body: "Ramos de rosas eternas y confección de bouquets 💐💗" },
  { icon: Gift, title: "Combos personalizados", body: "Tu arreglo con detalles y snacks, hecho a tu gusto 🎁🍬✨" },
];

export default function TiendaPage() {
  return <>
    <SiteHeader />
    <main>
      <TiendaClient items={storeItems} categories={storeCategories}/>

      {/* Colecciones visuales: navegación por colección y categoría (individuales y collages) */}
      <section id="colecciones" className="bg-white py-20 md:py-28">
        <div className="section-wrap">
          <Reveal className="mb-12 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="eyebrow mb-4">Nuevas colecciones</div>
              <h2 className="section-title">Explora por<br/><em>colección y categoría.</em></h2>
            </div>
            <p className="max-w-[340px] text-sm leading-6 text-[#7d6b75] md:pb-2">Cada imagen puede mostrar una opción o varias reunidas. Toca una para verla en grande y consúltanos por WhatsApp.</p>
          </Reveal>
          <ColeccionesExplorer collections={storeCollections}/>
        </div>
      </section>

      {/* Bienvenida y servicios del negocio */}
      <section id="bienvenida" className="section-wrap py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <Reveal>
            <div className="eyebrow mb-5 flex items-center gap-3"><span className="h-px w-8 bg-[#a77e88]"/> Bienvenid@s</div>
            <h2 className="section-title">Aquí encontrarás<br/><em>todo y mucho más.</em></h2>
            <p className="mt-7 max-w-[520px] text-[.95rem] leading-7 text-[#7d6b75]">En <strong className="font-semibold text-[#392c35]">Nana&apos;s Design</strong> damos recuerdos eternos 💕✨ Somos una floristería y tienda de regalos en Aragua, Venezuela, con ventas al detal y piezas pensadas para durar.</p>
            <p className="mt-4 max-w-[520px] text-[.95rem] leading-7 text-[#7d6b75]">Estamos para servirle, creando el detalle perfecto para cada ocasión. 🌸</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="https://wa.me/584128985585?text=Hola%2C%20quiero%20hacer%20un%20pedido" target="_blank" rel="noreferrer"><Button size="lg">Hacer un pedido <ArrowUpRight size={16}/></Button></Link>
              <Link href="#catalogo"><Button size="lg" variant="outline">Ver el catálogo</Button></Link>
            </div>
          </Reveal>
          <Reveal delay={.1}>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {services.map((service) => <div key={service.title} className="flex items-start gap-4 border border-[#493743]/10 bg-white/70 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#ead4d2]"><service.icon size={18} className="text-[#8d6574]" aria-hidden/></span>
                <div><div className="serif text-[1.35rem] leading-tight text-[#392c35]">{service.title}</div><p className="mt-1 text-xs leading-5 text-[#877780]">{service.body}</p></div>
              </div>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Información práctica: horario, ubicación y entregas */}
      <section className="bg-[#f4efec] py-20 md:py-28">
        <div className="section-wrap">
          <Reveal className="mx-auto mb-12 max-w-[620px] text-center md:mb-16">
            <div className="eyebrow mb-4">Cómo trabajamos</div>
            <h2 className="section-title">Fácil de encontrar,<br/><em>fácil de pedir.</em></h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            <Reveal><div className="h-full border border-[#493743]/10 bg-[#fbf8f4] p-7">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#ead4d2]"><Clock size={18} className="text-[#8d6574]" aria-hidden/></span>
              <h3 className="serif mt-5 text-[1.5rem] leading-tight text-[#392c35]">Horario de atención</h3>
              <p className="mt-2 text-sm leading-6 text-[#877780]">Nuestro horario de atención es de <strong className="font-semibold text-[#624859]">{storeSchedule}</strong>.</p>
            </div></Reveal>
            <Reveal delay={.07}><div className="h-full border border-[#493743]/10 bg-[#fbf8f4] p-7">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#e4e7d9]"><MapPin size={18} className="text-[#6d7962]" aria-hidden/></span>
              <h3 className="serif mt-5 text-[1.5rem] leading-tight text-[#392c35]">Dónde estamos</h3>
              <p className="mt-2 text-sm leading-6 text-[#877780]">Aragua, Venezuela 🇻🇪 Somos un emprendimiento y <strong className="font-semibold text-[#624859]">todavía no tenemos local físico</strong>; atendemos los pedidos en línea.</p>
              <Link href={storeMapsUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#704c62] transition-colors hover:text-[#493743]">Ver la zona en Google Maps <ArrowUpRight size={13}/></Link>
            </div></Reveal>
            <Reveal delay={.14}><div className="h-full border border-[#493743]/10 bg-[#fbf8f4] p-7">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[#eee0d2]"><Truck size={18} className="text-[#957754]" aria-hidden/></span>
              <h3 className="serif mt-5 text-[1.5rem] leading-tight text-[#392c35]">Entregas</h3>
              <p className="mt-2 text-sm leading-6 text-[#877780]">Realizamos entregas <strong className="font-semibold text-[#624859]">semanalmente</strong> en zonas céntricas de Maracay y zonas cercanas 📍🚌</p>
            </div></Reveal>
          </div>
        </div>
      </section>

      <section className="section-wrap py-20 md:py-28">
        <Reveal className="mx-auto max-w-[620px] text-center">
          <div className="eyebrow mb-4">Hecho para ti</div>
          <h2 className="section-title">¿Imaginas algo<br/><em>único?</em></h2>
          <p className="mx-auto mt-5 max-w-[430px] text-sm leading-6 text-[#7d6b75]">Personalizamos tu arreglo con detalle y snacks en combos 🎁🍬✨ Cuéntanos tu idea y la creamos juntas.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4"><Link href="https://wa.me/584128985585?text=Hola%2C%20quiero%20encargar%20un%20arreglo" target="_blank" rel="noreferrer"><Button size="lg">Encargar por WhatsApp <ArrowUpRight size={16}/></Button></Link><Link href="/#productos"><Button size="lg" variant="outline">Ver destacados</Button></Link></div>
          <p className="mt-5 flex items-center justify-center gap-2 text-xs text-[#8b7b83]"><Sparkles size={13} aria-hidden className="text-[#a77e88]"/>Todo para ti y mucho más 🌈</p>
        </Reveal>
      </section>
    </main>
    <SiteFooter />
  </>;
}
