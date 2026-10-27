import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import {ConstructionScroll} from '@/components/construct-scroll';
import {Reveal} from '@/components/reveal';
export function ConstructSection(){
 const steps=[['01','ELIGE TU VOLUMEN'],['02','DEFINE M² Y MONTAJE'],['03','AÑADE EXTRAS Y CP'],['04','VALIDACIÓN TÉCNICA'],['05','PREPARAMOS EL KIT'],['06','ENTREGA O MONTAJE']];
 return <section className="section-pad bg-[#e3e5e1]"><div className="container-wide"><div className="grid lg:grid-cols-2 gap-11 lg:gap-20 items-center"><div><Reveal><p className="eyebrow text-sage mb-6">DEL PLANO AL SUMINISTRO</p><h2 className="section-title">SEIS PASOS.<br/><span className="text-sage">SIN MISTERIOS.</span></h2><p className="copy-large mt-6 max-w-lg">Del primer concepto al kit estructural de tu obra, con transporte y extras diferenciados. Los interiores empiezan después.</p></Reveal><div className="grid sm:grid-cols-2 gap-x-7 mt-10">{steps.map(([number,title])=><div key={number} className="border-b border-[#bfc7c5] py-5 flex gap-4 items-center"><span className="font-display text-2xl text-sage">{number}</span><span className="text-[13px] font-black tracking-[.025em]">{title}</span></div>)}</div><Link href="/como-funciona" className="button-ghost mt-8 border-b border-[#566469]">VER PROCESO <ArrowUpRight size={16}/></Link></div><ConstructionScroll/></div></div></section>;
}
