import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ConstructionScroll } from '@/components/construct-scroll';
import { Reveal } from '@/components/reveal';
export function ConstructSection(){
 const steps=[['01','Elige tu casa'],['02','Define la superficie'],['03','Recibe una estimación'],['04','Validamos el proyecto'],['05','Preparamos el kit'],['06','Envío o montaje']];
 return <section className="section-pad bg-[#e3e6dc]"><div className="container-wide"><div className="grid lg:grid-cols-2 gap-11 lg:gap-20 items-center"><div><Reveal><p className="eyebrow text-sage mb-6">Así funciona</p><h2 className="section-title">De una idea a <em className="not-italic text-sage">un proyecto.</em></h2><p className="copy-large mt-6 max-w-lg">Un recorrido pensado para que sepas en qué punto estás y cuál es el siguiente paso.</p></Reveal><div className="grid sm:grid-cols-2 gap-x-7 mt-10">{steps.map(([number,title])=><div key={number} className="border-b border-[#bcc6b8] py-5 flex gap-4 items-center"><span className="font-display display-font text-2xl text-sage">{number}</span><span className="text-sm font-semibold">{title}</span></div>)}</div><Link href="/como-funciona" className="button-ghost mt-8 border-b border-[#556958]">Conoce el proceso <ArrowUpRight size={16}/></Link></div><ConstructionScroll/></div></div></section>
}
