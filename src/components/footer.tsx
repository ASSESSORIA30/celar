import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { CookiesSettings } from './cookies-settings';
export function Footer(){return <footer className="site-footer bg-deep text-white pt-20 pb-10"><div className="container-wide">
 <div className="grid lg:grid-cols-12 gap-12 pb-20">
  <div className="lg:col-span-6"><Link href="/" className="brand-footer">NOLIMITS<span>BLOCKS</span></Link><p className="font-display display-font mt-7 text-4xl leading-[1.05] max-w-md">HACEMOS POSIBLE<br/>EL PRIMER BLOQUE.</p><p className="text-sm text-[#b7c0c0] leading-7 mt-5 max-w-md">Kits de estructura en hormigón celular para proyectos de autoconstrucción. Suministro estructural, opción de montaje, transporte por destino y extras a estudiar. No entregamos interiores terminados.</p></div>
  <div className="lg:col-span-3"><p className="eyebrow text-[#d4b663] mb-6">EL PRODUCTO</p><div className="flex flex-col gap-4 text-sm text-[#e4e9e2]"><Link href="/viviendas">Modelos estructurales</Link><Link href="/calculadora">Configurador</Link><Link href="/transporte">Transporte por CP</Link><Link href="/el-kit">Qué incluye</Link><Link href="/hormigon-celular">Material</Link></div></div>
  <div className="lg:col-span-3"><p className="eyebrow text-[#d4b663] mb-6">SOLICITUDES</p><p className="text-sm leading-7 text-[#e4e9e2]">¿Ya tienes un terreno y quieres recibir el kit estructural?</p><Link href="/contacto" className="mt-7 inline-flex gap-3 items-center text-sm border-b border-white/40 pb-2">PIDE UN PRESUPUESTO <ArrowUpRight size={15}/></Link></div>
 </div>
 <div className="border-t border-white/15 pt-8 flex flex-col md:flex-row justify-between gap-5 text-xs text-[#a9b8b6]"><p>© {new Date().getFullYear()} {siteConfig.brand.name}. Marca y modelos conceptuales; imágenes generadas, no instalaciones u obras propias verificadas.</p><div className="flex flex-wrap gap-5"><Link href="/aviso-legal">Aviso legal</Link><Link href="/privacidad">Privacidad</Link><Link href="/cookies">Cookies</Link><CookiesSettings/></div></div>
 </div></footer>}
