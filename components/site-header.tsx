"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [["Nuestra esencia", "/#nosotros"], ["Colección", "/#productos"], ["El proceso", "/#proceso"], ["Portafolio", "/#galeria"], ["Tienda", "/tienda"]];

function NavLink({ label, href, mobile = false, onClick }: { label: string; href: string; mobile?: boolean; onClick?: () => void }) {
  const isStore = href === "/tienda";
  return <Link className={mobile ? "rounded-xl px-3 py-3 text-sm text-[#5b4c54] hover:bg-white/70" : "nav-link"} href={href} onClick={onClick}>
    {isStore && <ShoppingCart size={15} aria-hidden className="mr-1.5 inline-block -translate-y-px" />}
    {label}
  </Link>;
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-[#493743]/[.06] bg-[#fbf8f4]/85 backdrop-blur-xl">
    <div className="section-wrap flex h-[76px] items-center justify-between">
      <Link href="/#inicio" className="serif text-[1.75rem] leading-none tracking-[-.04em] text-[#392c35]">nanas<span className="text-[#a77e88]">.</span><span className="ml-1 font-sans text-[.6rem] font-medium uppercase tracking-[.24em]">design</span></Link>
      <nav className="hidden items-center gap-9 md:flex">{links.map(([label, href]) => <NavLink label={label} href={href} key={href}/>)}</nav>
      <Link className="hidden md:block" href="https://wa.me/584128985585?text=Hola%2C%20quiero%20conocer%20sus%20arreglos" target="_blank" rel="noreferrer"><Button size="sm">Hablemos <span aria-hidden>↗</span></Button></Link>
      <button aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen(!open)} className="rounded-full p-2 text-[#624859] md:hidden">{open ? <X size={21}/> : <Menu size={21}/>}</button>
    </div>
    {open && <nav className="mobile-menu section-wrap flex flex-col gap-1 border-t border-[#493743]/[.07] py-3 md:hidden">{links.map(([label, href]) => <NavLink label={label} href={href} mobile key={href} onClick={() => setOpen(false)}/>)}<Link className="mt-2" href="https://wa.me/584128985585" target="_blank" onClick={() => setOpen(false)}><Button className="w-full">Hablemos ↗</Button></Link></nav>}
  </header>;
}
