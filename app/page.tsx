import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Flower2, Heart, Instagram, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { storeItems } from "@/lib/tienda";

/** Destacados de la portada, tomados del catálogo compartido de la tienda. */
const products = storeItems.filter((item) => item.featured).map((item) => ({
  name: item.name,
  type: item.tag ?? "",
  description: item.description,
  price: item.priceLabel ?? `$${item.price}`,
  image: item.image,
}));

const steps = [
  { n: "01", title: "Nos cuentas tu idea", body: "Hablamos de la ocasión, tus colores favoritos, el estilo y el presupuesto." },
  { n: "02", title: "Imaginamos juntas", body: "Preparamos una propuesta pensada para ti y la conversamos antes de crear." },
  { n: "03", title: "La hacemos a mano", body: "Cada cinta, flor y detalle se trabaja con calma y mucho cariño." },
  { n: "04", title: "Lista para emocionar", body: "Empacamos tu pieza con cuidado, lista para regalar y durar por años." },
];

const gallery = [
  ["/img/21.png", "Ramo artesanal en tonos rosa"], ["/img/25.png", "Flores de cinta hechas a mano"], ["/img/35.jpeg", "Arreglo floral para regalar"],
  ["/img/19.png", "Detalle de una creación Nanas Design"], ["/img/32.jpeg", "Flores eternas para una ocasión especial"], ["/img/34.jpeg", "Colección de arreglos personalizados"],
];

function ContactLink({ children }: { children: React.ReactNode }) {
  return <Link href="https://wa.me/584128985585?text=Hola%2C%20quiero%20cotizar%20un%20arreglo%20floral" target="_blank" rel="noreferrer">{children}</Link>;
}

export default function Home() {
  return <>
    <SiteHeader />
    <main>
      <section id="inicio" className="section-wrap hero-grid relative min-h-[740px] pb-16 pt-28 md:min-h-[850px] md:pb-20 md:pt-28">
        <Reveal className="relative z-10 max-w-[510px]">
          <div className="eyebrow mb-7 flex items-center gap-3"><span className="h-px w-8 bg-[#a77e88]"/> Flores hechas para durar</div>
          <h1 className="serif max-w-[600px] text-[clamp(4rem,8vw,7.1rem)] leading-[.88] tracking-[-.055em] text-[#392c35]">Un pequeño<br/>gesto, <em className="text-[#a77e88]">para</em><br/><em className="text-[#a77e88]">siempre.</em></h1>
          <p className="mt-7 max-w-[410px] text-[.98rem] leading-7 text-[#7d6b75]">Flores artesanales hechas con cintas y telas. Creamos piezas únicas para guardar cerca esos momentos que merecen durar.</p>
          <div className="mt-8 flex flex-wrap items-center gap-4"><ContactLink><Button size="lg">Encuentra tu arreglo <ArrowUpRight size={16}/></Button></ContactLink><Link href="#productos"><Button size="lg" variant="outline">Explorar colección</Button></Link></div>
          <div className="mt-12 flex items-center gap-4 border-t border-[#493743]/10 pt-5"><div className="flex -space-x-2"><span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#fbf8f4] bg-[#ead4d2]"><Heart size={14} className="text-[#8d6574]"/></span><span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#fbf8f4] bg-[#e4e7d9]"><Flower2 size={14} className="text-[#6d7962]"/></span><span className="grid h-9 w-9 place-items-center rounded-full border-2 border-[#fbf8f4] bg-[#eee0d2]"><Sparkles size={14} className="text-[#957754]"/></span></div><p className="text-xs leading-5 text-[#7d6b75]"><strong className="font-semibold text-[#392c35]">Cada pieza es irrepetible</strong><br/>hecha a mano, pensando en ti</p></div>
        </Reveal>
        <Reveal delay={.12} className="hero-collage">
          <div className="hero-photo main"><Image src="/img/01.webp" alt="Ramo de flores artesanales Nanas Design" fill priority sizes="(max-width: 800px) 75vw, 35vw"/></div>
          <div className="hero-photo left"><Image src="/img/03.jpg" alt="Detalle de arreglo de flores" fill sizes="25vw"/></div>
          <div className="hero-photo right"><Image src="/img/04.jpg" alt="Flores hechas con cintas" fill sizes="25vw"/></div>
          <div className="floating-note"><div className="serif text-2xl text-[#704c62]">200<span className="text-[#a77e88]">+</span></div><div className="mt-0.5 text-[.57rem] uppercase tracking-[.16em] text-[#7d6b75]">historias florecidas</div></div>
          <span className="absolute left-[6%] top-[18%] -rotate-12 text-3xl text-[#b698a1]">✳</span><span className="absolute bottom-[21%] right-[8%] text-xl text-[#9ca287]">✳</span>
        </Reveal>
        <Link href="#nosotros" aria-label="Desliza para conocer Nanas Design" className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 whitespace-nowrap text-[.6rem] uppercase tracking-[.18em] text-[#9a8790] transition-colors hover:text-[#704c62] md:flex">Desliza para descubrir <ArrowDown size={13}/></Link>
      </section>

      <div className="overflow-hidden border-y border-[#493743]/[.06] bg-[#f2e9e5] py-[18px]">
        <div className="flex min-w-max animate-[marquee_32s_linear_infinite] items-center gap-9 px-4 text-[.66rem] font-medium uppercase tracking-[.2em] text-[#755b68]">{Array.from({length:2}).map((_, i)=><span className="flex items-center gap-9" key={i}><span>Flores de cinta</span><span className="text-[#b88e97]">✳</span><span>Diseños personalizados</span><span className="text-[#b88e97]">✳</span><span>Hechos con amor</span><span className="text-[#b88e97]">✳</span><span>Recuerdos que florecen</span><span className="text-[#b88e97]">✳</span><span>Nanas Design</span><span className="text-[#b88e97]">✳</span></span>)}</div>
      </div>

      <section id="nosotros" className="section-wrap py-24 md:py-36">
        <div className="story-layout"><Reveal className="story-image"><Image src="/img/05.jpg" alt="Manos creando flores artesanales" width={720} height={850} sizes="(max-width: 800px) 80vw, 40vw"/><Image src="/img/06.jpg" alt="Detalle floral hecho a mano" width={400} height={400}/><span className="absolute left-4 top-5 -rotate-12 text-4xl text-[#a77e88]">✳</span></Reveal>
          <Reveal delay={.1}><div className="eyebrow mb-5">Una historia hecha a mano</div><h2 className="section-title">Flores que<br/><em>nacen de ti.</em></h2><p className="mt-7 max-w-[480px] text-[.92rem] leading-7 text-[#7d6b75]">En Nanas Design transformamos cintas y telas en flores eternas. Cada pieza nace despacio, entre manos artesanas y una idea especial que queremos convertir en recuerdo.</p><p className="mt-4 max-w-[480px] text-[.92rem] leading-7 text-[#7d6b75]">Nos inspiran tus celebraciones, los detalles que emocionan y la belleza de regalar algo creado especialmente para alguien.</p>
            <div className="mt-9 grid max-w-[410px] grid-cols-3 border-t border-[#493743]/10 pt-6"><div><div className="serif text-[2.5rem] leading-none text-[#704c62]">A mano</div><div className="mt-2 text-[.62rem] uppercase tracking-[.13em] text-[#8b7b83]">con paciencia</div></div><div><div className="serif text-[2.5rem] leading-none text-[#704c62]">A tu gusto</div><div className="mt-2 text-[.62rem] uppercase tracking-[.13em] text-[#8b7b83]">cada detalle</div></div><div><div className="serif text-[2.5rem] leading-none text-[#704c62]">Para durar</div><div className="mt-2 text-[.62rem] uppercase tracking-[.13em] text-[#8b7b83]">por siempre</div></div></div>
          </Reveal>
        </div>
      </section>

      <section id="productos" className="bg-[#f4efec] py-24 md:py-32"><div className="section-wrap"><div className="mb-12 flex items-end justify-between gap-5 md:mb-16"><div><div className="eyebrow mb-4">Pequeñas obras, grandes momentos</div><h2 className="section-title">La colección<br/><em>para regalar.</em></h2></div><Link className="hidden items-center gap-2 pb-2 text-xs font-medium text-[#704c62] md:flex" href="https://wa.me/584128985585">Diseñemos la tuya <ArrowRight size={15}/></Link></div>
          <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">{products.map((product,i)=><Reveal key={product.name} delay={(i%3)*.07}><article className="product-card group"><Link href={`https://wa.me/584128985585?text=${encodeURIComponent(`Hola, me interesa ${product.name}`)}`} target="_blank" rel="noreferrer"><div className="product-image"><Image src={product.image} alt={product.name} fill sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 30vw"/><span className="absolute left-4 top-4 bg-[#fbf8f4]/90 px-3 py-1.5 text-[.58rem] font-medium uppercase tracking-[.12em] text-[#704c62]">{product.type}</span><span className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-[#fbf8f4] text-[#704c62] opacity-0 shadow-md transition-all group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={17}/></span></div><div className="px-5 pb-5 pt-5"><div className="serif text-[1.7rem] leading-tight text-[#392c35]">{product.name}</div><p className="mt-2 min-h-[48px] text-xs leading-5 text-[#877780]">{product.description}</p><div className="mt-5 flex items-center justify-between border-t border-[#493743]/[.08] pt-4"><span className="text-xs font-medium text-[#704c62]">{product.price}</span><span className="flex items-center gap-1 text-[.65rem] font-medium uppercase tracking-[.12em] text-[#8b7b83]">Consultar <ArrowRight size={13}/></span></div></div></Link></article></Reveal>)}</div>
          <div className="mt-9 text-center md:hidden"><ContactLink><Button variant="outline">Diseñemos la tuya <ArrowRight size={15}/></Button></ContactLink></div>
        </div></section>

      <section id="proceso" className="section-wrap py-24 md:py-32"><Reveal className="mx-auto mb-16 max-w-[680px] text-center"><div className="eyebrow mb-4">Sin prisa, con intención</div><h2 className="section-title">De tu idea<br/><em>a una pieza única.</em></h2><p className="mx-auto mt-5 max-w-[430px] text-sm leading-6 text-[#7d6b75]">Creamos contigo en cada paso para que el resultado se sienta tan especial como la persona que lo recibe.</p></Reveal>
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-4">{steps.map((step,i)=><Reveal key={step.n} delay={i*.07}><div className="relative border-t border-[#493743]/15 pt-5"><span className="absolute -top-[5px] left-0 h-[9px] w-[9px] rounded-full bg-[#a77e88]"/><span className="serif text-[2.2rem] text-[#c6adb3]">{step.n}</span><h3 className="serif mt-2 text-[1.55rem]">{step.title}</h3><p className="mt-2 max-w-[240px] text-xs leading-5 text-[#877780]">{step.body}</p></div></Reveal>)}</div>
      </section>

      <section id="galeria" className="bg-white py-24 md:py-32"><div className="section-wrap"><div className="mb-10 flex items-end justify-between"><div><div className="eyebrow mb-4">Hecho para compartir</div><h2 className="section-title">Un poco de<br/><em>nuestro universo.</em></h2></div><Link href="https://instagram.com/nanas_design.07" target="_blank" rel="noreferrer" className="mb-1 flex items-center gap-2 text-xs text-[#704c62]"><Instagram size={15}/> @nanas_design.07</Link></div><div className="gallery-grid">{gallery.map(([src,alt])=><Reveal key={src} className="gallery-item"><Image src={src} alt={alt} fill sizes="(max-width: 520px) 45vw, (max-width: 800px) 40vw, 30vw"/></Reveal>)}</div></div></section>

      <section className="relative overflow-hidden bg-[#4c3948] py-24 text-[#fbf8f4] md:py-32"><div className="absolute -right-24 -top-40 h-[440px] w-[440px] rounded-full border border-white/[.08]"/><div className="absolute -right-8 -top-24 h-[310px] w-[310px] rounded-full border border-white/[.08]"/><div className="section-wrap relative grid items-center gap-9 md:grid-cols-[1.15fr_.85fr]"><Reveal><div className="eyebrow mb-5 !text-[#d7b6be]">Un regalo que se queda</div><h2 className="serif text-[clamp(3.3rem,7vw,6rem)] leading-[.93] tracking-[-.04em]">Que el momento<br/><em className="text-[#dfbdc5]">siga floreciendo.</em></h2><p className="mt-6 max-w-[450px] text-sm leading-6 text-white/65">Cuéntanos a quién quieres sorprender. Juntas podemos imaginar un detalle que hable desde el corazón.</p></Reveal><Reveal delay={.1} className="md:justify-self-end"><ContactLink><Button size="lg" className="!bg-[#f5e9e6] !text-[#4c3948] hover:!bg-white">Conversemos por WhatsApp <ArrowUpRight size={16}/></Button></ContactLink><p className="mt-4 text-xs text-white/50">Cuéntanos tu idea, sin compromiso.</p></Reveal></div></section>
    </main>
    <SiteFooter />
  </>;
}
