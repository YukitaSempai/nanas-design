"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Flower2, Gift, MapPin, Package, Search, SearchX, Sparkles, Store, Truck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { productOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { storeMapsUrl, storeSchedule, type StoreCategory, type StoreItem } from "@/lib/tienda";

const categoryIcons: Record<string, typeof Flower2> = { ramos: Flower2, arreglos: Sparkles, cajas: Package, regalos: Gift };

/** Chips de rango de precio, estilo Facebook Marketplace. Filtros reales sobre los precios del catálogo. */
const priceFilters = [
  { id: "all", label: "Todos los precios", test: () => true },
  { id: "under20", label: "Hasta $20", test: (item: StoreItem) => item.price != null && item.price <= 20 },
  { id: "20to50", label: "$20 – $50", test: (item: StoreItem) => item.price != null && item.price >= 20 && item.price <= 50 },
  { id: "over50", label: "Más de $50", test: (item: StoreItem) => item.price != null && item.price > 50 },
  { id: "nominal", label: "A medida", test: (item: StoreItem) => item.price == null },
];

const sortOptions = [
  { id: "relevance", label: "Más relevantes" },
  { id: "price-asc", label: "Menor precio" },
  { id: "price-desc", label: "Mayor precio" },
  { id: "name", label: "Nombre (A–Z)" },
];

function normalize(text: string) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function TiendaClient({ items, categories }: { items: StoreItem[]; categories: StoreCategory[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [price, setPrice] = useState("all");
  const [sort, setSort] = useState("relevance");

  const visible = useMemo(() => {
    const q = normalize(query.trim());
    const priceFilter = priceFilters.find((f) => f.id === price) ?? priceFilters[0];
    const filtered = items.filter((item) => {
      const categoryLabel = categories.find((c) => c.id === item.category)?.label ?? "";
      const matchesQuery = !q || normalize(`${item.name} ${item.description} ${item.tag ?? ""} ${categoryLabel}`).includes(q);
      const matchesCategory = category === "all" || item.category === category;
      return matchesQuery && matchesCategory && priceFilter.test(item);
    });
    if (sort === "price-asc") filtered.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    if (sort === "price-desc") filtered.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name, "es"));
    return filtered;
  }, [items, categories, query, category, price, sort]);

  const activeFilters = query.trim() !== "" || category !== "all" || price !== "all";
  const clearFilters = () => { setQuery(""); setCategory("all"); setPrice("all"); };

  return <>
    <section id="tienda" className="section-wrap pt-32 pb-10 md:pt-40 md:pb-12">
      <Reveal>
        <nav aria-label="Ruta de navegación" className="mb-6 flex items-center gap-2 text-[.66rem] uppercase tracking-[.16em] text-[#8b7b83]">
          <Link href="/#inicio" className="transition-colors hover:text-[#704c62]">Inicio</Link><span aria-hidden>·</span><span className="text-[#704c62]">Tienda</span>
        </nav>
        <div className="eyebrow mb-5 flex items-center gap-3"><span className="h-px w-8 bg-[#a77e88]"/> Florista · Tienda de regalos</div>
        <h1 className="section-title max-w-[640px]">Encuentra tu<br/><em>próximo detalle.</em></h1>
        <p className="mt-6 max-w-[520px] text-[.95rem] leading-7 text-[#7d6b75]">Arreglos florales con rosas, girasoles, tulipanes, lirios y mucho más 🌻🌹🌷 · Ramos de rosas eternas y bouquets para boda y eventos 💐 · Personalizamos tu arreglo con snacks en combos 🎁✨</p>

        <div className="relative mt-8 max-w-[560px]">
          <Search size={18} aria-hidden className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#8b7b83]"/>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca rosas, ramos, regalos…"
            aria-label="Buscar en la tienda"
            className="h-14 w-full rounded-full border border-[#493743]/15 bg-white pl-14 pr-6 text-sm text-[#392c35] shadow-[0_10px_30px_rgba(70,45,53,.06)] outline-none transition-colors placeholder:text-[#a99aa2] focus:border-[#a77e88]"
          />
        </div>

        <div className="mt-7 flex flex-wrap gap-2.5">
          <button type="button" onClick={() => setCategory("all")} aria-pressed={category === "all"} className={chipClass(category === "all")}>Todos <span className="opacity-60">{items.length}</span></button>
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.id] ?? Flower2;
            const count = items.filter((item) => item.category === cat.id).length;
            return <button key={cat.id} type="button" onClick={() => setCategory(cat.id)} aria-pressed={category === cat.id} className={chipClass(category === cat.id)}><Icon size={14} aria-hidden/>{cat.label} <span className="opacity-60">{count}</span></button>;
          })}
        </div>
      </Reveal>
    </section>

    {/* Barra de información del negocio — horario, ubicación y envíos (estilo Marketplace/ML) */}
    <div className="border-y border-[#493743]/[.07] bg-[#f2e9e5]">
      <div className="section-wrap flex flex-wrap items-center justify-center gap-x-9 gap-y-3 py-4 text-[.68rem] text-[#755b68]">
        <span className="flex items-center gap-2"><Clock size={14} aria-hidden className="text-[#a77e88]"/><strong className="font-semibold text-[#392c35]">Horario:</strong> {storeSchedule}</span>
        <a href={storeMapsUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-[#704c62]"><MapPin size={14} aria-hidden className="text-[#a77e88]"/><strong className="font-semibold text-[#392c35]">Aragua, Venezuela</strong> · ver en Google Maps</a>
        <span className="flex items-center gap-2"><Truck size={14} aria-hidden className="text-[#a77e88]"/><strong className="font-semibold text-[#392c35]">Envíos a todo Venezuela</strong> · MRW, Zoom y más</span>
        <a href="https://wa.me/584128985585?text=Hola%2C%20quiero%20hacer%20un%20pedido" target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-[#704c62]"><Store size={14} aria-hidden className="text-[#a77e88]"/>Pedidos por <strong className="font-semibold text-[#392c35]">WhatsApp</strong></a>
      </div>
    </div>

    <section id="catalogo" className="bg-[#f4efec] pb-20 pt-8 md:pb-28">
      <div className="section-wrap">
        <div className="sticky top-[76px] z-30 -mx-4 flex flex-wrap items-center justify-between gap-4 border-b border-[#493743]/10 bg-[#f4efec]/95 px-4 py-3.5 backdrop-blur">
          <p aria-live="polite" className="text-[.68rem] uppercase tracking-[.16em] text-[#8b7b83]">
            {visible.length} {visible.length === 1 ? "resultado" : "resultados"}{category !== "all" && ` · ${categories.find((c) => c.id === category)?.label ?? ""}`}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {priceFilters.map((f) => <button key={f.id} type="button" onClick={() => setPrice(f.id)} aria-pressed={price === f.id} className={`rounded-full border px-4 py-2 text-[.66rem] font-medium transition-colors ${price === f.id ? "border-[#704c62] bg-[#704c62] text-white" : "border-[#493743]/15 bg-white/70 text-[#624859] hover:border-[#a77e88] hover:bg-white"}`}>{f.label}</button>)}
          </div>
          <label className="flex items-center gap-2 text-[.66rem] uppercase tracking-[.14em] text-[#8b7b83]">
            Ordenar
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-[#493743]/15 bg-white px-4 py-2 text-xs normal-case tracking-normal text-[#392c35] outline-none transition-colors focus:border-[#a77e88]">
              {sortOptions.map((opt) => <option key={opt.id} value={opt.id}>{opt.label}</option>)}
            </select>
          </label>
        </div>

        {visible.length > 0 ? (
          <div className="mt-8 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((item, i) => {
              const cat = categories.find((c) => c.id === item.category);
              const Icon = categoryIcons[item.category] ?? Flower2;
              return <Reveal key={item.id} delay={(i % 3) * .07}><article className="product-card group flex h-full flex-col">
                <Link href={whatsappUrl(productOrderMessage(item.name))} target="_blank" rel="noreferrer" className="flex h-full flex-col">
                  <div className="product-image">
                    <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 30vw"/>
                    <span className="absolute left-4 top-4 flex items-center gap-1.5 bg-[#fbf8f4]/92 px-3 py-1.5 text-[.58rem] font-medium uppercase tracking-[.12em] text-[#704c62]"><Icon size={12} aria-hidden/>{cat?.label}</span>
                    {item.tag && <span className="absolute right-4 top-4 bg-[#704c62] px-3 py-1.5 text-[.55rem] font-medium uppercase tracking-[.12em] text-white">{item.tag}</span>}
                    <span className="absolute bottom-4 right-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-[#fbf8f4] text-[#704c62] opacity-0 shadow-md transition-all group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={17}/></span>
                  </div>
                  <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
                    <div className="serif text-[1.7rem] leading-tight text-[#392c35]">{item.name}</div>
                    <p className="mt-2 text-xs leading-5 text-[#877780]">{item.description}</p>
                    <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#493743]/[.08] pt-4">
                      <span className="serif text-[1.65rem] leading-none text-[#704c62]">{item.priceLabel ?? `$${item.price}`}</span>
                      <span className="flex items-center gap-1 text-[.65rem] font-medium uppercase tracking-[.12em] text-[#8b7b83] transition-colors group-hover:text-[#704c62]">Consultar <ArrowUpRight size={13}/></span>
                    </div>
                  </div>
                </Link>
              </article></Reveal>;
            })}
          </div>
        ) : (
          <div className="mt-8 border border-dashed border-[#493743]/20 bg-white/50 px-6 py-16 text-center md:py-20">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#ead4d2]"><SearchX size={22} className="text-[#8d6574]" aria-hidden/></span>
            <p className="serif mx-auto mt-5 max-w-[420px] text-[1.6rem] leading-snug text-[#392c35]">{activeFilters ? "No encontramos nada con esa búsqueda" : "El catálogo se está preparando con cariño"}</p>
            <p className="mx-auto mt-3 max-w-[420px] text-sm leading-6 text-[#877780]">{activeFilters ? "Prueba con otra palabra o quita alguno de los filtros para ver todos los productos." : "Muy pronto vas a poder descubrir aquí todos nuestros productos y servicios, con sus fotos, precios y detalles."}</p>
            {activeFilters && <button type="button" onClick={clearFilters} className="mt-6 rounded-full border border-[#765866]/25 bg-white/70 px-6 py-3 text-sm font-medium text-[#624859] transition-colors hover:border-[#765866]/60 hover:bg-white">Quitar filtros</button>}
          </div>
        )}
      </div>
    </section>
  </>;
}

function chipClass(active: boolean) {
  return ["inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium transition-colors",
    active ? "border-[#704c62] bg-[#704c62] text-white"
           : "border-[#493743]/15 bg-white/70 text-[#624859] hover:border-[#a77e88] hover:bg-white"].join(" ");
}
