'use client';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, X, Expand } from 'lucide-react';
import { MODEL_VIEWS, modelImage, modelPlan, type HouseModel } from '@/config/site';
export function RenderGallery({model}:{model:HouseModel}) {
  const [current,setCurrent]=useState(0); const [open,setOpen]=useState(false);
  const slides=[...MODEL_VIEWS.map(v=>({src:modelImage(model,v.key),title:v.title})),{src:modelPlan(model),title:'Esquema de planta conceptual'}];
  const go=useCallback((delta:number)=>setCurrent(p=>(p+slides.length+delta)%slides.length),[slides.length]);
  useEffect(()=>{
    if(!open)return;
    const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setOpen(false);if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1)};
    window.addEventListener('keydown',key); const previous=document.body.style.overflow;document.body.style.overflow='hidden';
    return ()=>{window.removeEventListener('keydown',key);document.body.style.overflow=previous};
  },[open,go]);
  return <div><div className="relative aspect-[1.5] bg-bone overflow-hidden"><Image src={slides[current].src} alt={`${slides[current].title} de ${model.name}. Imagen ilustrativa no vinculante.`} fill priority sizes="(max-width:768px) 100vw, 65vw" className="object-cover"/><span className="absolute left-4 bottom-4 text-xs text-ink bg-white/90 px-4 py-2">{slides[current].title} · Visual conceptual</span><button type="button" onClick={()=>setOpen(true)} className="absolute right-4 bottom-4 w-10 h-10 bg-white grid place-items-center" aria-label="Ampliar imagen"><Expand size={18}/></button></div>
    <div className="flex gap-2 mt-3 overflow-x-auto pb-3">{slides.map((s,i)=><button key={s.src} type="button" onClick={()=>setCurrent(i)} aria-label={`Ver ${s.title}`} aria-pressed={current===i} className={`relative aspect-[1.52] w-[124px] shrink-0 border-[3px] ${current===i?'border-sage':'border-transparent'}`}><Image src={s.src} alt="" fill sizes="124px" className="object-cover"/></button>)}</div>
    <p className="note mt-1">Renders y esquemas de carácter ilustrativo: no representan obra ejecutada, ni documentan soluciones constructivas aprobadas.</p>
    {open&&<div className="gallery-modal" role="dialog" aria-modal="true" aria-label="Galería ampliada"><button type="button" onClick={()=>setOpen(false)} className="absolute top-5 right-5 text-white p-2" aria-label="Cerrar galería"><X size={29}/></button><button type="button" className="gallery-control absolute left-3 sm:left-8 top-1/2 -translate-y-1/2" onClick={()=>go(-1)} aria-label="Imagen anterior"><ArrowLeft size={21}/></button><div className="relative w-full max-w-[1180px] h-[min(70vh,680px)]"><Image src={slides[current].src} alt={slides[current].title} fill sizes="100vw" className="object-contain"/></div><button type="button" className="gallery-control absolute right-3 sm:right-8 top-1/2 -translate-y-1/2" onClick={()=>go(1)} aria-label="Siguiente imagen"><ArrowRight size={21}/></button><div className="absolute bottom-8 left-0 right-0 text-center text-sm text-white">{slides[current].title} · {current+1}/{slides.length}</div></div>}
  </div>;
}
