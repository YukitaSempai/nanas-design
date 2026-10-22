"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronLeft, ChevronRight, Images, LayoutGrid, X } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { collectionInquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import type { StoreCollection, StoreMedia } from "@/lib/tienda";

/**
 * Explorador de colecciones.
 *
 * Navegación inspirada en marketplaces (colección → catálogo → categoría →
 * imágenes), con la identidad de Nanas Design. Está pensado para convivir con
 * dos tipos de imagen:
 * - `individual`: muestra un solo producto.
 * - `collage`: reúne varios productos (y sus precios) en una sola imagen.
 *
 * Cuando una imagen no tiene formato definido todavía, se presenta como
 * referencia de catálogo y el botón de WhatsApp consulta por la colección, el
 * catálogo y la categoría (nunca inventa un nombre ni un precio).
 */

function formatLabel(format?: StoreMedia["format"]) {
  if (format === "individual") return "Producto individual";
  if (format === "collage") return "Varios productos";
  return "Catálogo";
}

type MediaEntry = { media: StoreMedia; categoryLabel: string; catalogLabel: string };

export function ColeccionesExplorer({ collections }: { collections: StoreCollection[] }) {
  const [collectionId, setCollectionId] = useState(collections[0]?.id ?? "");
  const [catalogId, setCatalogId] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const collection = collections.find((c) => c.id === collectionId) ?? collections[0];
  const catalogs = collection?.catalogs ?? [];
  const catalog = catalogs.find((c) => c.id === catalogId) ?? catalogs[0];
  const categories = catalog?.categories ?? [];

  const mediaItems = useMemo<MediaEntry[]>(() => {
    if (!catalog) return [];
    const visibleCategories = categoryId === "all" ? catalog.categories : catalog.categories.filter((c) => c.id === categoryId);
    return visibleCategories.flatMap((category) =>
      category.media.map((media) => ({ media, categoryLabel: category.label, catalogLabel: catalog.label })),
    );
  }, [catalog, categoryId]);

  const totalMedia = categories.reduce((count, category) => count + category.media.length, 0);
  const openEntry = openIndex === null ? null : mediaItems[openIndex] ?? null;

  const resetBrowse = () => {
    setCategoryId("all");
    setOpenIndex(null);
  };

  const selectCollection = (id: string) => {
    setCollectionId(id);
    setCatalogId("");
    resetBrowse();
  };

  const selectCatalog = (id: string) => {
    setCatalogId(id);
    resetBrowse();
  };

  // Navegación con teclado dentro del visor.
  useEffect(() => {
    if (openIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
      if (event.key === "ArrowRight") setOpenIndex((index) => (index === null ? index : (index + 1) % mediaItems.length));
      if (event.key === "ArrowLeft") setOpenIndex((index) => (index === null ? index : (index - 1 + mediaItems.length) % mediaItems.length));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, mediaItems.length]);

  if (!collection) return null;

  const countMedia = (item: { categories: { media: unknown[] }[] }) =>
    item.categories.reduce((total, category) => total + category.media.length, 0);

  const chipClass = (active: boolean) =>
    [
      "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-medium transition-colors",
      active
        ? "border-[#704c62] bg-[#704c62] text-white"
        : "border-[#493743]/15 bg-white/70 text-[#624859] hover:border-[#a77e88] hover:bg-white",
    ].join(" ");

  return (
    <div>
      {/* Selector de colecciones */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((item, index) => {
          const active = item.id === collection.id;
          const count = item.catalogs.reduce((total, catalogItem) => total + countMedia(catalogItem), 0);
          return (
            <Reveal key={item.id} delay={index * 0.06}>
              <button
                type="button"
                onClick={() => selectCollection(item.id)}
                aria-pressed={active}
                className={`group flex w-full items-center gap-4 border p-3 text-left transition-all ${
                  active ? "border-[#704c62] bg-white shadow-[0_14px_34px_rgba(70,45,53,.10)]" : "border-[#493743]/10 bg-white/60 hover:border-[#a77e88] hover:bg-white"
                }`}
              >
                <span className="relative h-20 w-20 shrink-0 overflow-hidden bg-[#f2e9e7]">
                  {item.cover && <Image src={item.cover} alt="" fill sizes="80px" className="object-cover" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[.6rem] font-semibold uppercase tracking-[.16em] text-[#a77e88]">Colección</span>
                  <span className="serif mt-1 block text-[1.5rem] leading-tight text-[#392c35]">{item.label}</span>
                  <span className="mt-1 flex items-center gap-1.5 text-[.68rem] text-[#8b7b83]"><Images size={12} aria-hidden /> {count} {count === 1 ? "imagen" : "imágenes"} · {item.catalogs.length} {item.catalogs.length === 1 ? "catálogo" : "catálogos"}</span>
                </span>
              </button>
            </Reveal>
          );
        })}
      </div>

      {collection.description && <p className="mt-6 max-w-[560px] text-sm leading-6 text-[#7d6b75]">{collection.description}</p>}

      {/* Catálogos de la colección */}
      {catalogs.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-3" role="tablist" aria-label="Catálogos de la colección">
          {catalogs.map((item) => {
            const active = catalog ? item.id === catalog.id : false;
            const count = countMedia(item);
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectCatalog(item.id)}
                className={`flex items-center gap-3 border px-3 py-2 text-left transition-all ${
                  active ? "border-[#704c62] bg-white shadow-[0_10px_26px_rgba(70,45,53,.09)]" : "border-[#493743]/10 bg-white/60 hover:border-[#a77e88] hover:bg-white"
                }`}
              >
                <span className="relative h-11 w-11 shrink-0 overflow-hidden bg-[#f2e9e7]">
                  {item.cover && <Image src={item.cover} alt="" fill sizes="44px" className="object-cover" />}
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium leading-tight text-[#392c35]">{item.label}</span>
                  <span className="mt-0.5 flex items-center gap-1 text-[.62rem] text-[#8b7b83]"><Images size={11} aria-hidden /> {count} {count === 1 ? "imagen" : "imágenes"}</span>
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Categorías (subcategorías del catálogo seleccionado) */}
      <div className="mt-8 flex flex-wrap gap-2.5">
        <button type="button" onClick={() => setCategoryId("all")} aria-pressed={categoryId === "all"} className={chipClass(categoryId === "all")}>
          <LayoutGrid size={14} aria-hidden /> Todas <span className="opacity-60">{totalMedia}</span>
        </button>
        {categories.map((category) => (
          <button key={category.id} type="button" onClick={() => setCategoryId(category.id)} aria-pressed={categoryId === category.id} className={chipClass(categoryId === category.id)}>
            {category.label} <span className="opacity-60">{category.media.length}</span>
          </button>
        ))}
      </div>

      {/* Imágenes (individuales o collages) */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mediaItems.map((entry, index) => (
          <Reveal key={entry.media.id} delay={(index % 3) * 0.06}>
            <button type="button" onClick={() => setOpenIndex(index)} aria-label={`Ampliar imagen: ${entry.media.alt}`} className="group block w-full overflow-hidden border border-[#493743]/10 bg-white text-left shadow-[0_6px_28px_rgba(65,47,54,.045)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(65,47,54,.12)]">
              <span className="relative block aspect-[4/5] overflow-hidden bg-[#f2e9e7]">
                <Image src={entry.media.src} alt={entry.media.alt} fill sizes="(max-width: 640px) 90vw, (max-width: 1000px) 45vw, 30vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                <span className="absolute left-3 top-3 bg-[#fbf8f4]/92 px-3 py-1.5 text-[.55rem] font-medium uppercase tracking-[.12em] text-[#704c62]">{formatLabel(entry.media.format)}</span>
                <span className="absolute bottom-3 right-3 grid h-9 w-9 translate-y-2 place-items-center rounded-full bg-[#fbf8f4] text-[#704c62] opacity-0 shadow-md transition-all group-hover:translate-y-0 group-hover:opacity-100"><ArrowUpRight size={16} aria-hidden /></span>
              </span>
              <span className="block px-4 py-3">
                <span className="block text-[.6rem] font-semibold uppercase tracking-[.16em] text-[#8b7b83]">{entry.categoryLabel}</span>
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Visor / ficha de la imagen */}
      {openEntry && (
        <div role="dialog" aria-modal="true" aria-label={openEntry.media.alt} className="fixed inset-0 z-[60] flex items-center justify-center bg-[#2b2028]/85 p-4 backdrop-blur-sm" onClick={() => setOpenIndex(null)}>
          <div className="relative flex max-h-[92vh] w-full max-w-[900px] flex-col overflow-hidden bg-[#fbf8f4] shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="relative flex-1 bg-[#efe6e3]">
              <Image src={openEntry.media.src} alt={openEntry.media.alt} width={1200} height={1500} className="mx-auto max-h-[68vh] w-auto object-contain" />
            </div>
            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-[.6rem] font-semibold uppercase tracking-[.16em] text-[#a77e88]">{formatLabel(openEntry.media.format)} · {openEntry.categoryLabel}</span>
                <p className="serif mt-1 text-[1.4rem] leading-tight text-[#392c35]">{openEntry.media.note ?? collection.label}</p>
                <p className="mt-1 text-xs leading-5 text-[#877780]">{openEntry.catalogLabel}</p>
                {openEntry.media.format === "collage" && <p className="mt-1 text-xs leading-5 text-[#877780]">Esta imagen reúne varios productos. Cuéntanos cuál te interesa y te pasamos el detalle.</p>}
              </div>
              <a href={whatsappUrl(collectionInquiryMessage(collection.label, openEntry.categoryLabel, openEntry.catalogLabel))} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#714c65] px-6 py-3 text-sm font-medium text-white shadow-[0_8px_22px_rgba(113,76,101,.19)] transition-all hover:-translate-y-0.5 hover:bg-[#5e3c54]">
                Pedir por WhatsApp <ArrowUpRight size={15} aria-hidden />
              </a>
            </div>
            <button type="button" onClick={() => setOpenIndex(null)} aria-label="Cerrar" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-[#fbf8f4]/90 text-[#392c35] shadow-md transition-colors hover:bg-white"><X size={18} aria-hidden /></button>
            {mediaItems.length > 1 && (
              <>
                <button type="button" onClick={() => setOpenIndex((index) => (index === null ? index : (index - 1 + mediaItems.length) % mediaItems.length))} aria-label="Imagen anterior" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#fbf8f4]/90 text-[#392c35] shadow-md transition-colors hover:bg-white"><ChevronLeft size={18} aria-hidden /></button>
                <button type="button" onClick={() => setOpenIndex((index) => (index === null ? index : (index + 1) % mediaItems.length))} aria-label="Imagen siguiente" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-[#fbf8f4]/90 text-[#392c35] shadow-md transition-colors hover:bg-white"><ChevronRight size={18} aria-hidden /></button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
