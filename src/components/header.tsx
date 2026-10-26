'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '@/config/site';
const links = [
  ['Viviendas','/viviendas'],['El kit','/el-kit'],['Cómo funciona','/como-funciona'],['El material','/hormigon-celular']
];
export function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return <>
    <header className="site-header">
      <nav className="container-wide h-full flex items-center justify-between gap-10" aria-label="Navegación principal">
        <Link href="/" aria-label={`${siteConfig.brand.name}, inicio`} className="flex items-center gap-3 shrink-0" onClick={() => setOpen(false)}>
          <span className="brand-word">{siteConfig.brand.name}<span className="text-sage">.</span></span>
          <span className="text-[9px] uppercase tracking-[.14em] leading-[1.45] text-muted border-l border-line pl-3 hidden sm:block">Arquitectura<br/>en kit</span>
        </Link>
        <div className="hidden lg:flex items-center gap-8">{links.map(([label,href]) => <Link key={href} href={href} className={`nav-link ${path === href ? 'active' : ''}`}>{label}</Link>)}
          <Link href="/calculadora" className={`nav-link ${path==='/calculadora'?'active':''}`}>Calcula tu kit</Link>
        </div>
        <div className="hidden lg:flex items-center gap-5"><span className="text-xs text-muted hidden xl:block">Desde <strong className="text-ink">{siteConfig.pricing.kitPerM2} €/m²</strong></span><Link href="/contacto" className="button-solid !min-h-[43px] !px-5">Hablemos <ArrowUpRight size={15}/></Link></div>
        <button type="button" onClick={()=>setOpen(!open)} aria-label={open?'Cerrar menú':'Abrir menú'} aria-expanded={open} aria-controls="mobile-menu" className="lg:hidden p-2">{open?<X size={26}/>:<Menu size={26}/>}</button>
      </nav>
      {open && <nav id="mobile-menu" aria-label="Navegación móvil" className="mobile-menu lg:hidden">{links.map(([label,href]) => <Link key={href} href={href} onClick={()=>setOpen(false)}>{label}<ArrowRight size={18}/></Link>)}<Link href="/calculadora" onClick={()=>setOpen(false)}>Calcular presupuesto <ArrowRight size={18}/></Link><Link href="/contacto" onClick={()=>setOpen(false)}>Contacto <ArrowRight size={18}/></Link></nav>}
    </header>
    <div className="sticky-mobile-cta sm:hidden"><Link href="/calculadora" className="button-solid">Calcula tu kit <ArrowUpRight size={17}/></Link></div>
  </>;
}
