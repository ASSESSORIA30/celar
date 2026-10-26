'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { type HouseModel, siteConfig } from '@/config/site';
import { ModeSwitch } from './mode-switch';
import { useQuote } from './quote-context';
import { quotePrice,euro } from '@/lib/pricing';
import { track } from '@/lib/analytics';
export function ModelDetailPricing({model}:{model:HouseModel}){
 const {mode,selectModel}=useQuote();
 useEffect(()=>{track('model_view',{model:model.slug})},[model.slug]);
 const q=quotePrice(model.area,mode);
 return <div className="bg-white p-6 sm:p-8 border border-line lg:sticky lg:top-[99px]"><p className="eyebrow text-sage mb-5">Elige tu modalidad</p><ModeSwitch/><div className="soft-rule my-7"/><p className="text-xs text-muted">Precio orientativo de {model.area} m²</p><p className="font-display display-font text-5xl mt-3">{euro(q.total)}</p><p className="note mt-2">Impuestos no calculados.</p><div className="soft-rule my-7"/><div className="text-sm space-y-4"><div className="flex justify-between gap-3"><span>Kit ({model.area} × {siteConfig.pricing.kitPerM2} €)</span><strong>{euro(q.kit)}</strong></div><div className="flex justify-between gap-3"><span>Montaje opcional</span><strong>{mode==='kit'?'No incluido':euro(q.assembly)}</strong></div><div className="flex justify-between gap-3"><span>Planos + transporte</span><strong>Incluidos</strong></div></div><Link href="/calculadora" onClick={()=>selectModel(model.slug)} className="button-solid w-full mt-8">Personalizar presupuesto <ArrowUpRight size={17}/></Link><Link href="/contacto" onClick={()=>selectModel(model.slug)} className="button-outline w-full mt-3">Solicitar información <ArrowUpRight size={17}/></Link><p className="note mt-5">El kit no incluye instalación eléctrica, fontanería, pavimentos, revestimientos ni otras partidas sin confirmar. Consulta el alcance antes de contratar.</p></div>
}
