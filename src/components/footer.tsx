import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { CookiesSettings } from './cookies-settings';
export function Footer() {
  return <footer className="site-footer bg-deep text-white pt-20 pb-10">
    <div className="container-wide">
      <div className="grid lg:grid-cols-12 gap-12 pb-20">
        <div className="lg:col-span-6"><Link href="/" className="text-[50px] font-semibold tracking-[-.09em] leading-none">{siteConfig.brand.name}<span className="text-[#aebca8]">.</span></Link><p className="font-display display-font mt-6 text-3xl leading-tight max-w-sm">El primer paso hacia<br/>tu propia casa.</p><p className="text-sm text-[#b3beb4] leading-7 mt-5 max-w-sm">Viviendas en kit de hormigón celular. Una forma clara de explorar diseños y estimar tu inversión inicial.</p></div>
        <div className="lg:col-span-3"><p className="eyebrow text-[#a9b8a9] mb-6">Explora</p><div className="flex flex-col gap-4 text-sm text-[#e4e9e2]"><Link href="/viviendas">Las viviendas</Link><Link href="/calculadora">Calcula tu presupuesto</Link><Link href="/el-kit">Qué incluye</Link><Link href="/como-funciona">Cómo funciona</Link><Link href="/hormigon-celular">El hormigón celular</Link></div></div>
        <div className="lg:col-span-3"><p className="eyebrow text-[#a9b8a9] mb-6">Contacto</p><p className="text-sm leading-7 text-[#e4e9e2]">¿Tienes un terreno o una idea?<br/>Empecemos a hablar.</p><Link href="/contacto" className="mt-7 inline-flex gap-3 items-center text-sm border-b border-white/40 pb-2">Pide información <ArrowUpRight size={15}/></Link></div>
      </div>
      <div className="border-t border-white/15 pt-8 flex flex-col md:flex-row justify-between gap-5 text-xs text-[#a9b8a9]"><p>© {new Date().getFullYear()} {siteConfig.brand.name}. Marca y modelos ilustrativos pendientes de validación.</p><div className="flex flex-wrap gap-5"><Link href="/aviso-legal">Aviso legal</Link><Link href="/privacidad">Privacidad</Link><Link href="/cookies">Cookies</Link><CookiesSettings/></div></div>
    </div>
  </footer>;
}
