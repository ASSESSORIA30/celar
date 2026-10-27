import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {ModelCard} from '@/components/model-card';
import {ModeSwitch} from '@/components/mode-switch';
import {models} from '@/config/site';
export const metadata:Metadata={title:'Catálogo de kits estructurales',description:'Kits estructurales de hormigón celular de 90, 120, 150 y 180 m². Compra la estructura y ejecuta los interiores por tu cuenta.'};
export default function HousesPage(){return <>
 <section className="container-wide pt-16 pb-12"><p className="eyebrow text-sage mb-5">01 / BLOQUES ESTRUCTURALES</p><div className="flex flex-col lg:flex-row justify-between lg:items-end gap-8"><div><h1 className="section-title max-w-4xl">CUATRO FORMATOS.<br/><span className="text-sage">UNA NUEVA BASE.</span></h1><p className="copy-large max-w-2xl mt-6">Solo estructuras de hormigón celular. Sin acabados interiores, instalaciones ni mobiliario. Conceptos de volumen ilustrativos sujetos a proyecto técnico.</p></div><div className="shrink-0"><p className="text-xs text-muted mb-3">MOSTRAR PRECIOS DE:</p><ModeSwitch/></div></div></section>
 <section className="container-wide pb-28"><div className="grid md:grid-cols-2 gap-x-8 gap-y-16">{models.map((m,i)=><ModelCard key={m.slug} model={m} index={i}/>)}</div><div className="bg-[#e4e5e1] p-8 sm:p-10 mt-14 flex flex-col md:flex-row justify-between gap-7 md:items-center"><div><h2 className="font-display display-font text-3xl">¿OTRA SUPERFICIE O DISTRIBUCIÓN?</h2><p className="text-sm text-muted mt-3">Configura los metros, extras y transporte de tu kit estructural.</p></div><Link href="/calculadora" className="button-solid shrink-0">CONFIGURAR A MEDIDA <ArrowUpRight size={17}/></Link></div></section>
 </>}
