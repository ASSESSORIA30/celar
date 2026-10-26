import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { QuoteBuilder } from '@/components/quote-builder';
export const metadata:Metadata={title:'Calculadora de precios de kits de vivienda',description:'Calcula en segundos el precio orientativo de tu casa en kit de hormigón celular. Montaje opcional y desglose transparente por superficie.'};
export default function CalculatorPage(){return <>
 <section className="bg-deep text-white py-20"><div className="container-wide"><Link href="/viviendas" className="inline-flex items-center gap-2 text-[#a8baaa] text-xs"><ArrowLeft size={14}/> Ver colección</Link><p className="eyebrow text-[#adc2ac] mt-12 mb-6">Tu presupuesto orientativo</p><h1 className="section-title max-w-4xl">Una casa a tu medida.<br/><em className="not-italic text-[#b4c4b1]">Un precio sin confusiones.</em></h1><p className="text-[#c6d2c7] max-w-2xl leading-8 mt-7">Elige un modelo o escribe la superficie que necesitas. Alterna entre kit y kit con montaje y descarga tu estimación en PDF.</p></div></section>
 <section className="container-wide py-20 pb-28"><QuoteBuilder/><p className="note mt-8 max-w-4xl">Esta herramienta presenta precios orientativos sobre superficies de referencia. No constituye una oferta vinculante. El contenido preciso del kit, la medición, los transportes especiales, los requisitos urbanísticos y los impuestos deben confirmarse en la oferta personalizada.</p></section>
 </>}
