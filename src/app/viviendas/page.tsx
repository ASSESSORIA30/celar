import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ModelCard } from '@/components/model-card';
import { ModeSwitch } from '@/components/mode-switch';
import { models } from '@/config/site';
export const metadata:Metadata={title:'Catálogo de viviendas en kit',description:'Modelos conceptuales de viviendas de hormigón celular en kit de 90, 120, 150 y 180 m². Descubre cada diseño y calcula tu precio orientativo.'};
export default function HousesPage(){return <>
 <section className="container-wide pt-16 pb-12"><p className="eyebrow text-sage mb-5">Las viviendas / Colección conceptual</p><div className="flex flex-col lg:flex-row justify-between lg:items-end gap-8"><div><h1 className="section-title max-w-3xl">Cuatro maneras de <em className="not-italic text-sage">imaginar tu hogar.</em></h1><p className="copy-large max-w-2xl mt-6">Diseños preliminares para inspirarte. Precios calculados sobre la superficie de referencia; distribuciones, habitaciones y baños por validar.</p></div><div className="shrink-0"><p className="text-xs text-muted mb-3">Mostrar precios para:</p><ModeSwitch/></div></div></section>
 <section className="container-wide pb-28"><div className="grid md:grid-cols-2 gap-x-8 gap-y-16">{models.map((m,i)=><ModelCard key={m.slug} model={m} index={i}/>)}</div><div className="bg-[#e6e9df] p-8 sm:p-10 mt-14 flex flex-col md:flex-row justify-between gap-7 md:items-center"><div><h2 className="font-display display-font text-3xl">¿Tienes otra superficie en mente?</h2><p className="text-sm text-muted mt-3">Calcula tu kit con los metros cuadrados que necesitas.</p></div><Link href="/calculadora" className="button-solid shrink-0">Configurar a medida <ArrowUpRight size={17}/></Link></div></section>
 </>}
