import type {Metadata} from 'next';
import Link from 'next/link';
import {ArrowLeft} from 'lucide-react';
import {QuoteBuilder} from '@/components/quote-builder';
export const metadata:Metadata={title:'Calculadora de kit estructural, envío y extras',description:'Calcula el kit de hormigón celular desde 700 €/m², añade montaje, CP de transporte, terraza, garaje y piscina como extras sujetos a valoración.'};
export default function CalculatorPage(){return <>
 <section className="bg-deep text-white py-20"><div className="container-wide"><Link href="/viviendas" className="inline-flex items-center gap-2 text-[#d8b768] text-xs"><ArrowLeft size={14}/> Ver catálogo estructural</Link><p className="eyebrow text-[#d8b768] mt-12 mb-6">CONFIGURADOR / ESTRUCTURAS DE BLOQUES</p><h1 className="section-title max-w-4xl">TU ESTRUCTURA.<br/><span className="text-[#e0b85c]">TU PRESUPUESTO.</span></h1><p className="text-[#c6d0d2] max-w-2xl leading-8 mt-7">Elige superficie, modalidad, terraza, garaje y piscina. Introduce el CP de entrega para calcular el transporte separado del kit.</p></div></section>
 <section className="container-wide py-20 pb-28"><QuoteBuilder/><p className="note mt-8 max-w-4xl">Precios orientativos, sin impuestos calculados. Transporte estimado por zonas postales, sujeto a accesos de obra, descarga y expediciones especiales. Los extras sin precio confirmado quedan fuera del subtotal. Kit solo de estructura; la composición final requiere validación técnica.</p></section>
 </>}
