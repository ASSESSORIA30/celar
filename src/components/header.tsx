'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '@/config/site';
const links=[['Modelos','/viviendas'],['Qué fabricamos','/el-kit'],['Transporte','/transporte'],['Proceso','/como-funciona'],['El material','/hormigon-celular']];
export function Header(){
 const [open,setOpen]=useState(false);const path=usePathname();
 return <>
  <div className="production-ribbon"><div className="container-wide flex items-center justify-between gap-3"><span><span className="ribbon-dot"/> KITS ESTRUCTURALES / HORMIGÓN CELULAR</span><span className="hidden sm:block">COMPONENTES · PLANOS · MONTAJE OPCIONAL</span></div></div>
  <header className="site-header"><nav className="container-wide h-full flex items-center justify-between gap-7" aria-label="Navegación principal">
   <Link href="/" aria-label={`${siteConfig.brand.name}, inicio`} className="flex items-center gap-3 shrink-0" onClick={()=>setOpen(false)}><span className="brand-mark">N<span>B</span></span><span className="brand-word">NOLIMITS<span className="text-sage">BLOCKS</span></span></Link>
   <div className="hidden xl:flex items-center gap-7">{links.map(([label,href])=><Link key={href} href={href} className={`nav-link ${path===href?'active':''}`}>{label}</Link>)}</div>
   <div className="hidden lg:flex items-center gap-3"><span className="text-xs text-muted hidden 2xl:block">ESTRUCTURAS DESDE <strong className="text-ink">{siteConfig.pricing.kitPerM2} €/m²</strong></span><Link href="/calculadora" className="button-solid !min-h-[44px] !px-5">CONFIGURA TU KIT <ArrowUpRight size={15}/></Link></div>
   <button type="button" onClick={()=>setOpen(!open)} aria-label={open?'Cerrar menú':'Abrir menú'} aria-expanded={open} aria-controls="mobile-menu" className="lg:hidden p-2">{open?<X size={26}/>:<Menu size={26}/>}</button>
  </nav>
  {open&&<nav id="mobile-menu" aria-label="Navegación móvil" className="mobile-menu lg:hidden">{links.map(([label,href])=><Link key={href} href={href} onClick={()=>setOpen(false)}>{label}<ArrowRight size={18}/></Link>)}<Link href="/calculadora" onClick={()=>setOpen(false)}>Calculadora <ArrowRight size={18}/></Link><Link href="/contacto" onClick={()=>setOpen(false)}>Contacto <ArrowRight size={18}/></Link></nav>}
  </header>
  <div className="sticky-mobile-cta sm:hidden"><Link href="/calculadora" className="button-solid">CALCULA TU ESTRUCTURA <ArrowUpRight size={16}/></Link></div>
 </>;
}
