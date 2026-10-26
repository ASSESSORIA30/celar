'use client';
import Link from 'next/link';
import { ArrowUpRight, Calculator, Download, Minus, Plus, Share2, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { models, siteConfig } from '@/config/site';
import { useQuote } from './quote-context';
import { euro, quoteShareText } from '@/lib/pricing';
import { track } from '@/lib/analytics';
import { ModeSwitch } from './mode-switch';
import { downloadQuotePdf } from '@/lib/pdf';

export function QuoteBuilder({ compact = false }:{compact?:boolean}) {
  const {area, mode, modelSlug, quote, selectModel, setArea}=useQuote();
  const [pdfBusy,setPdfBusy]=useState(false);
  const [pdfError,setPdfError]=useState('');
  const picked = models.find(m=>m.slug===modelSlug);
  const modelName = picked?`${picked.name} ${picked.area}`:'Superficie personalizada';
  const changeArea=(a:number)=>{setArea(a);track('configurator_change',{area:a,mode})};
  const whatsappNum=siteConfig.brand.whatsappNumber.replace(/\D/g,'');
  const whatsappUrl=`https://wa.me/${whatsappNum}?text=${encodeURIComponent(quoteShareText(modelName,area,mode))}`;
  const onPdf=async()=>{
    setPdfBusy(true);setPdfError('');
    try { await downloadQuotePdf({area,mode,modelName}); track('pdf_download',{mode,area}); }
    catch { setPdfError('No se pudo generar el PDF. Inténtalo de nuevo.'); }
    finally {setPdfBusy(false)}
  };
  return <div className={`grid ${compact?'lg:grid-cols-[1fr_1fr]':'lg:grid-cols-[1.1fr_.9fr]'} gap-6 lg:gap-10 items-start`}>
    <div className={`bg-[#f9f9f5] text-ink ${compact?'p-6 md:p-9':'inside-pad'}`}>
      <div className="flex items-center gap-3 mb-8"><Calculator size={18}/><span className="eyebrow text-muted">Configura tu vivienda</span></div>
      <div className="flex items-start gap-4"><span className="text-sage font-display text-3xl leading-8">01</span><div className="flex-1"><h3 className="text-xl font-semibold tracking-[-.035em]">Elige un modelo</h3><p className="note mt-1">O introduce una superficie a medida.</p></div></div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">{models.map(m=><button type="button" key={m.slug} onClick={()=>{selectModel(m.slug);track('configurator_change',{model:m.slug})}} aria-pressed={modelSlug===m.slug} className={`border py-4 px-2 text-center transition-all ${modelSlug===m.slug?'bg-ink border-ink text-white':'bg-white border-line hover:border-sage'}`}><span className="block text-[12px] font-bold">{m.name}</span><span className="block text-[11px] opacity-70 mt-1">{m.area} m²</span></button>)}</div>
      <div className="soft-rule my-8"/>
      <div className="flex items-start gap-4"><span className="text-sage font-display text-3xl leading-8">02</span><div className="flex-1"><h3 className="text-xl font-semibold tracking-[-.035em]">Define la superficie</h3><p className="note mt-1">Metros cuadrados de referencia para el cálculo.</p></div></div>
      <div className="mt-6 flex items-center gap-5"><div className="input-steppers w-full max-w-[275px]"><button type="button" onClick={()=>changeArea(Math.max(siteConfig.pricing.rangeMin,area-5))} aria-label="Reducir superficie"><Minus size={16} className="mx-auto"/></button><input id="area" type="number" inputMode="numeric" min={siteConfig.pricing.rangeMin} max={siteConfig.pricing.rangeMax} value={area} onChange={e=>{if(e.target.value!=='')changeArea(Number(e.target.value))}} aria-label="Superficie en metros cuadrados"/><button type="button" onClick={()=>changeArea(Math.min(siteConfig.pricing.rangeMax,area+5))} aria-label="Aumentar superficie"><Plus size={16} className="mx-auto"/></button></div><span className="font-display display-font text-3xl">m²</span></div>
      <input type="range" min={siteConfig.pricing.rangeMin} max={siteConfig.pricing.rangeMax} step={5} value={area} onChange={e=>changeArea(Number(e.target.value))} className="w-full mt-5" aria-label="Superficie de la vivienda"/>
      <div className="flex justify-between text-[11px] text-muted mt-2"><span>{siteConfig.pricing.rangeMin} m²</span><span>{siteConfig.pricing.rangeMax} m²</span></div>
      <div className="soft-rule my-8"/>
      <div className="flex items-start gap-4"><span className="text-sage font-display text-3xl leading-8">03</span><div className="flex-1"><h3 className="text-xl font-semibold tracking-[-.035em]">Selecciona la modalidad</h3><p className="note mt-1">Elige cuánto quieres que hagamos por ti.</p></div></div>
      <div className="mt-5"><ModeSwitch/></div>
      <p className="note mt-5">{mode==='kit'?'Recibes el kit, los planos y el transporte. El montaje no está incluido.':'Incluye el kit, los planos, el transporte y el servicio de montaje conforme al alcance que se confirme.'}</p>
    </div>
    <div className={`quote-box lg:sticky lg:top-[100px] ${compact?'':'shadow-[0_20px_60px_rgba(29,47,33,.06)]'}`}>
      <span className="eyebrow text-sage">Tu estimación, sin sorpresas</span>
      <h3 className="font-display display-font text-4xl leading-tight mt-4">{modelName}</h3>
      <p className="text-[12px] text-muted mt-2">{area} m² presupuestados · {mode==='kit'?'Solo kit':'Kit + montaje'}</p>
      <div className="soft-rule my-7"/>
      <div className="space-y-5 text-sm"><div className="flex justify-between gap-5"><span>Kit de hormigón celular <small className="block text-muted mt-1">{euro(siteConfig.pricing.kitPerM2)}/m² × {area} m²</small></span><strong>{euro(quote.kit)}</strong></div>
        <div className="flex justify-between gap-5"><span>Planos <small className="block text-muted mt-1">Alcance por confirmar</small></span><strong>Incluidos</strong></div>
        <div className="flex justify-between gap-5"><span>Transporte <small className="block text-muted mt-1">Condiciones a concretar</small></span><strong>Incluido</strong></div>
        <div className="flex justify-between gap-5"><span>Montaje <small className="block text-muted mt-1">{euro(siteConfig.pricing.assemblyPerM2)}/m² × {area} m²</small></span><strong>{mode==='montaje'?euro(quote.assembly):'No incluido'}</strong></div>
      </div>
      <div className="soft-rule my-7"/>
      <div className="flex items-end justify-between gap-5"><div><p className="eyebrow text-muted mb-2">Total orientativo</p><p className="price-digit">{euro(quote.total)}</p></div></div>
      <p className="text-[11px] text-muted mt-3">{siteConfig.pricing.taxNote}</p>
      <div className="bg-paper p-4 mt-6"><p className="font-semibold text-xs mb-2">Importante: no es una vivienda llave en mano</p><p className="text-xs leading-6 text-muted">No incluye electricidad, fontanería, agua, pavimentos ni revestimientos. Cimentación, cubierta, carpinterías y proyecto técnico pendientes de definir. <Link className="underline text-ink" href="/el-kit">Ver todo el alcance</Link>.</p></div>
      <p className="note mt-3">{siteConfig.pricing.surfaceCriterion}</p>
      <Link href="/contacto" className="button-solid w-full mt-7">Solicitar presupuesto <ArrowUpRight size={16}/></Link>
      <div className="grid grid-cols-2 gap-2 mt-3"><button type="button" className="button-outline !text-[11px] !px-3" disabled={pdfBusy} onClick={onPdf}>{pdfBusy?<LoaderCircle size={15} className="animate-spin"/>:<Download size={15}/>} {pdfBusy?'Generando':'Descargar PDF'}</button><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={()=>track('whatsapp_click',{area,mode})} className="button-outline !text-[11px] !px-3"><Share2 size={15}/>{whatsappNum?'Consultar':'Compartir'} WhatsApp</a></div>
      {pdfError && <p className="text-red-700 text-xs mt-3" role="alert">{pdfError}</p>}
      {!whatsappNum && <p className="note mt-3">WhatsApp de empresa pendiente de configurar; el enlace permite compartir el presupuesto.</p>}
    </div>
  </div>
}
