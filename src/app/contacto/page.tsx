import type { Metadata } from 'next';
import { LeadForm } from '@/components/lead-form';
export const metadata:Metadata={title:'Pide presupuesto para tu vivienda en kit',description:'Solicita una propuesta de vivienda de hormigón celular en kit. Cuéntanos la provincia, superficie, modalidad y si ya tienes terreno.'};
export default function ContactPage(){return <>
 <section className="container-wide py-16"><p className="eyebrow text-sage mb-6">Empezamos por hablar</p><h1 className="section-title">Hablemos de <em className="not-italic text-sage">tu futura casa.</em></h1><p className="copy-large max-w-2xl mt-6">Tanto si ya tienes terreno como si estás dando los primeros pasos, queremos conocer lo que tienes en mente.</p></section>
 <section className="container-wide pb-28"><LeadForm/></section>
 </>}
