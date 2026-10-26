'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { type HouseModel, modelImage } from '@/config/site';
import { euro, quotePrice } from '@/lib/pricing';
import { useQuote } from './quote-context';
import { track } from '@/lib/analytics';
export function ModelCard({model,index}:{model:HouseModel;index:number}){
 const {mode,selectModel}=useQuote();
 const q=quotePrice(model.area,mode);
 return <article className="model-card group min-w-0">
   <Link href={`/viviendas/${model.slug}`} onClick={()=>track('model_view',{model:model.slug})} className="block relative" aria-label={`Ver vivienda ${model.name}`}>
     <div className="model-image"><Image src={modelImage(model)} alt={`Render conceptual de vivienda ${model.name}`} fill sizes="(max-width: 768px) 100vw, 48vw" className="object-cover image-zoom" priority={index===0}/>
      <span className="absolute left-4 top-4 bg-[#f7f6f1]/95 px-3 py-2 text-[11px] font-semibold tracking-[.06em]">{String(index+1).padStart(2,'0')} / CONCEPTO</span>
      <span className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-[#f7f6f1] flex items-center justify-center"><ArrowUpRight size={18}/></span>
     </div>
   </Link>
   <div className="pt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
     <div><p className="eyebrow text-sage mb-2">{model.area} m² de referencia</p><Link href={`/viviendas/${model.slug}`} className="font-display display-font model-card-title hover:text-sage transition-colors">{model.name}</Link><p className="text-[13px] text-muted mt-2">{model.subtitle}</p></div>
     <div className="sm:text-right shrink-0"><p className="text-[10px] uppercase tracking-widest text-muted mb-2">{mode==='kit'?'Kit desde':'Con montaje desde'}</p><p className="text-2xl font-semibold tracking-[-.05em]">{euro(q.total)}</p><Link href="/calculadora" onClick={()=>selectModel(model.slug)} className="inline-flex mt-3 items-center gap-2 text-xs font-semibold border-b border-ink pb-1 hover:gap-3 transition-all">Calcular <ArrowRight size={14}/></Link></div>
   </div>
  </article>
}
