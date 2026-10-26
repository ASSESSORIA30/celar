import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ConstructionScroll } from '@/components/construct-scroll';
import { FAQ } from '@/components/faq';
export const metadata:Metadata={title:'Cómo comprar tu casa en kit',description:'Conoce los seis pasos desde la elección del diseño hasta la preparación y entrega de tu kit de vivienda en hormigón celular.'};
const steps=[
 ['01','Explora los diseños','Descubre propuestas de viviendas y selecciona el concepto que mejor encaja con lo que imaginas.'],
 ['02','Configura los metros y la modalidad','Introduce la superficie de referencia y decide si prefieres solo el kit o el servicio de montaje.'],
 ['03','Recibe tu estimación','Consulta en el momento un desglose orientativo y solicita una propuesta con tus datos de proyecto.'],
 ['04','Validación técnica y comercial','Comprobamos emplazamiento, normativa, mediciones, alcance de suministro y aspectos de proyecto que deban resolverse.'],
 ['05','Preparación del kit y logística','Tras la contratación y definición técnica, se planifica el suministro y las condiciones concretas de transporte.'],
 ['06','Entrega o montaje acordado','Se organiza la entrega del kit o el montaje, de acuerdo con el alcance contractual que finalmente se confirme.'],
];
export default function ProcessPage(){return <>
 <section className="container-wide pt-20 pb-16"><p className="eyebrow text-sage mb-5">El proceso / De principio a principio</p><h1 className="section-title max-w-4xl">Construir empieza <em className="text-sage not-italic">entendiendo.</em></h1><p className="copy-large max-w-2xl mt-7">Seis pasos para pasar de una referencia arquitectónica a un kit definido y preparado para tu proyecto.</p></section>
 <section className="container-wide pb-24 grid lg:grid-cols-[.92fr_1.08fr] gap-14"><div className="space-y-0">{steps.map(([num,title,description])=><div className="grid grid-cols-[50px_1fr] gap-5 py-7 border-b border-line" key={num}><span className="font-display display-font text-3xl text-sage">{num}</span><div><h2 className="text-xl font-semibold tracking-[-.035em]">{title}</h2><p className="text-sm leading-7 text-muted mt-3">{description}</p></div></div>)}</div><div className="lg:sticky lg:top-[110px] h-fit"><ConstructionScroll/><p className="note mt-5">Secuencia gráfica conceptual. No reproduce fases de ejecución real ni determina plazos de obra.</p></div></section>
 <section className="bg-[#e9ece4] py-24"><div className="container-narrow grid lg:grid-cols-[.8fr_1.2fr] gap-14"><div><p className="eyebrow text-sage mb-5">Lo habitual, explicado</p><h2 className="section-title">Dudas<br/><em className="text-sage not-italic">resueltas.</em></h2></div><FAQ/></div></section>
 <section className="container-wide py-24 flex flex-col md:flex-row justify-between md:items-center gap-8"><div><p className="eyebrow text-sage mb-5">Empieza a diseñar tu presupuesto</p><h2 className="font-display display-font text-4xl sm:text-5xl">Tu primer cálculo puede estar a un clic.</h2></div><Link href="/calculadora" className="button-solid shrink-0">Calcular ahora <ArrowUpRight size={16}/></Link></section>
 </>}
