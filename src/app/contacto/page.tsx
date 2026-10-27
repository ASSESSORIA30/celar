import type {Metadata} from 'next';
import {LeadForm} from '@/components/lead-form';
export const metadata:Metadata={title:'Solicita presupuesto de estructura en kit',description:'Pide oferta de kit estructural de hormigón celular. Indica código postal de obra, superficie, montaje y extras seleccionados.'};
export default function ContactPage(){return <>
 <section className="container-wide py-16"><p className="eyebrow text-sage mb-6">CONTACTO / PRESUPUESTO ESTRUCTURAL</p><h1 className="section-title">NOSOTROS LA BASE.<br/><span className="text-sage">TÚ EL PROYECTO.</span></h1><p className="copy-large max-w-2xl mt-6">Cuéntanos dónde irá la estructura y si necesitas montaje, terraza, garaje o piscina. El código postal de obra es necesario para estimar el transporte.</p></section>
 <section className="container-wide pb-28"><LeadForm/></section>
 </>}
