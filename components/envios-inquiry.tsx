"use client";

import { useState } from "react";
import { ArrowUpRight, Truck } from "lucide-react";
import { storeShipping } from "@/lib/tienda";
import { shippingInquiryMessage, whatsappUrl } from "@/lib/whatsapp";

/**
 * Consulta de opciones de envío según la ubicación del cliente.
 *
 * La tienda envía a todo Venezuela. El visitante indica su ciudad o estado y el
 * botón abre WhatsApp con un mensaje ya preparado para conocer las empresas de
 * encomiendas que cubren su zona. No se muestran precios inventados: el detalle
 * se acuerda en el chat, igual que el resto de los pedidos.
 */
export function EnviosInquiry() {
  const [destination, setDestination] = useState("");
  const href = whatsappUrl(shippingInquiryMessage(destination.trim()));

  return (
    <div className="flex flex-col gap-6 border border-[#493743]/10 bg-white p-6 md:flex-row md:items-center md:justify-between">
      <div className="max-w-[430px]">
        <div className="eyebrow mb-3 flex items-center gap-2"><Truck size={14} aria-hidden className="text-[#a77e88]"/> Envíos a todo Venezuela</div>
        <p className="text-sm leading-6 text-[#7d6b75]">Enviamos a cualquier estado o ciudad del país por empresas de encomiendas. Cuéntanos tu ubicación y te confirmamos qué opciones llegan hasta ahí. 📦</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {storeShipping.carriers.map((carrier) => (
            <span key={carrier} className="rounded-full border border-[#493743]/15 bg-[#f4efec] px-3 py-1.5 text-[.6rem] font-medium uppercase tracking-[.12em] text-[#624859]">{carrier}</span>
          ))}
          <span className="rounded-full border border-[#493743]/15 bg-white px-3 py-1.5 text-[.6rem] font-medium uppercase tracking-[.12em] text-[#8b7b83]">Otras alternativas</span>
        </div>
        <p className="mt-3 text-xs leading-5 text-[#8b7b83]">En {storeShipping.localReference} y su zona manejamos entregas locales semanales. 📍🚌</p>
      </div>

      <form className="flex w-full flex-col gap-3 sm:flex-row md:w-auto" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="destino-envio" className="sr-only">Tu ciudad o estado</label>
        <input
          id="destino-envio"
          type="text"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
          placeholder="Tu ciudad o estado…"
          className="h-12 w-full rounded-full border border-[#493743]/15 bg-[#fbf8f4] px-5 text-sm text-[#392c35] outline-none transition-colors placeholder:text-[#a99aa2] focus:border-[#a77e88] md:w-[260px]"
        />
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#714c65] px-6 text-sm font-medium text-white shadow-[0_8px_22px_rgba(113,76,101,.19)] transition-all hover:-translate-y-0.5 hover:bg-[#5e3c54]"
        >
          Ver opciones de envío <ArrowUpRight size={15} aria-hidden />
        </a>
      </form>
    </div>
  );
}
