'use client';
import Link from 'next/link';
import Image from 'next/image';
import {ArrowUpRight,ArrowRight} from 'lucide-react';
import {type HouseModel,modelImage} from '@/config/site';
import {euro,quotePrice} from '@/lib/pricing';
import {useQuote} from './quote-context';
import {track} from '@/lib/analytics';
export function ModelCard({model,index}:{model:HouseModel;index:number}){
 const {mode,selectModel}=useQuote();const q=quotePrice(model.area,mode);
 return <article className="model-card group min-w-0">
  <Link href={`/viviendas/${model.slug}`} onClick={()=>track('model_view',{model:model.slug})} className="block relative" aria-label={`Ver kit estructural ${model.name}`}>
   <div className="model-image"><Image src={modelImage(model)} alt={`Render generado ilustrativo de estructura sin acabados ${model.name}`} fill sizes="(max-width: 768px) 100vw, 48vw" className="object-cover image-zoom" priority={index===0}/>
    <span className="absolute left-4 top-4 bg-[#192126]/95 text-white px-3 py-2 text-[10px] font-black tracking-[.1em]">{String(index+1).padStart(2,'0')} / ESTRUCTURA CONCEPTUAL</span>
    <span className="absolute right-4 bottom-4 w-10 h-10 bg-[#DDB24C] flex items-center justify-center"><ArrowUpRight size={18}/></span>
   </div>
  </Link>
  <div className="pt-6 flex flex-col sm:flex-row sm:justify-between gap-4"><div><p className="eyebrow text-sage mb-2">{model.area} M² DE REFERENCIA</p><Link href={`/viviendas/${model.slug}`} className="font-display display-font model-card-title hover:text-sage transition-colors">{model.name}</Link><p className="text-[13px] text-muted mt-2">{model.subtitle}</p></div>
   <div className="sm:text-right shrink-0"><p className="text-[10px] uppercase tracking-widest text-muted mb-2">{mode==='kit'?'Kit estructural desde':'Kit + montaje desde'}</p><p className="text-2xl font-black tracking-[-.05em]">{euro(q.total)}</p><p className="text-[11px] text-muted">Sin transporte ni extras</p><Link href="/calculadora" onClick={()=>selectModel(model.slug)} className="inline-flex mt-3 items-center gap-2 text-xs font-semibold border-b border-ink pb-1 hover:gap-3 transition-all">CONFIGURAR <ArrowRight size={14}/></Link></div>
  </div>
 </article>;
}
