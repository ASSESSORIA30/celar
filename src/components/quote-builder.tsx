'use client';
import Link from 'next/link';
import { ArrowUpRight, Calculator, Download, Minus, Plus, Share2, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { models, siteConfig } from '@/config/site';
import { useQuote } from './quote-context';
import { euro, quoteShareText } from '@/lib/pricing';
import { track } from '@/lib/analytics';
import { ModeSwitch } from './mode-switch';
import { ShippingField } from './shipping-field';
import { ExtrasSelector } from './extras-selector';
import { downloadQuotePdf } from '@/lib/pdf';

export function QuoteBuilder({compact=false}:{compact?:boolean}) {
 const {area,mode,modelSlug,quote,selectModel,setArea,postalCode,shipping,extraSelections,extrasQuote,knownSubtotal,shippingPending}=useQuote();
 const [pdfBusy,setPdfBusy]=useState(false);
 const [pdfError,setPdfError]=useState('');
 const picked=models.find(m=>m.slug===modelSlug);
 const modelName=picked?`${picked.name} · ${picked.area} m²`:'Estructura personalizada';
 const changeArea=(a:number)=>{setArea(a);track('configurator_change',{area:a,mode});};
 const whatsappNum=siteConfig.brand.whatsappNumber.replace(/\D/g,'');
 const whatsappUrl=`https://wa.me/${whatsappNum}?text=${encodeURIComponent(quoteShareText(modelName,area,mode,postalCode,shipping?.amount??null,extrasQuote.lines.map(e=>e.name)))}`;
 const onPdf=async()=>{
  setPdfBusy(true);setPdfError('');
  try{await downloadQuotePdf({area,mode,modelName,postalCode,shipping,selectedExtras:extraSelections});track('pdf_download',{mode,area});}
  catch{setPdfError('No se pudo generar el PDF. Inténtalo de nuevo.');}
  finally{setPdfBusy(false);}
 };
 return <div className={`grid ${compact?'lg:grid-cols-[1fr_.92fr]':'lg:grid-cols-[1.15fr_.85fr]'} gap-6 lg:gap-10 items-start`}>
  <div className={`bg-[#f3f2ed] text-ink ${compact?'p-6 md:p-9':'inside-pad'}`}>
   <div className="flex items-center gap-3 mb-8"><Calculator size={18}/><span className="eyebrow text-muted">CONFIGURADOR / KIT ESTRUCTURAL</span></div>
   <div className="flex items-start gap-4"><span className="text-sage font-display text-3xl leading-8">01</span><div className="flex-1"><h3 className="text-xl font-semibold tracking-[-.035em]">Selecciona un volumen</h3><p className="note mt-1">O introduce una superficie a medida.</p></div></div>
   <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-5">{models.map(m=><button type="button" key={m.slug} onClick={()=>{selectModel(m.slug);track('configurator_change',{model:m.slug});}} aria-pressed={modelSlug===m.slug} className={`border py-4 px-2 text-center transition-all ${modelSlug===m.slug?'bg-ink border-ink text-white':'bg-white border-line hover:border-sage'}`}><span className="block text-[12px] font-bold">{m.name}</span><span className="block text-[11px] opacity-70 mt-1">{m.area} m²</span></button>)}</div>
   <div className="soft-rule my-8"/>
   <div className="flex items-start gap-4"><span className="text-sage font-display text-3xl leading-8">02</span><div className="flex-1"><h3 className="text-xl font-semibold tracking-[-.035em]">Superficie estructural</h3><p className="note mt-1">Metros cuadrados de referencia del kit, no metros terminados.</p></div></div>
   <div className="mt-6 flex items-center gap-5"><div className="input-steppers w-full max-w-[275px]"><button type="button" onClick={()=>changeArea(Math.max(siteConfig.pricing.rangeMin,area-5))} aria-label="Reducir superficie"><Minus size={16} className="mx-auto"/></button><input id="area" type="number" inputMode="numeric" min={siteConfig.pricing.rangeMin} max={siteConfig.pricing.rangeMax} value={area} onChange={e=>{if(e.target.value!=='')changeArea(Number(e.target.value));}} aria-label="Superficie en metros cuadrados"/><button type="button" onClick={()=>changeArea(Math.min(siteConfig.pricing.rangeMax,area+5))} aria-label="Aumentar superficie"><Plus size={16} className="mx-auto"/></button></div><span className="font-display display-font text-3xl">m²</span></div>
   <input type="range" min={siteConfig.pricing.rangeMin} max={siteConfig.pricing.rangeMax} step={5} value={area} onChange={e=>changeArea(Number(e.target.value))} className="w-full mt-5" aria-label="Superficie de la estructura"/>
   <div className="flex justify-between text-[11px] text-muted mt-2"><span>{siteConfig.pricing.rangeMin} m²</span><span>{siteConfig.pricing.rangeMax} m²</span></div>
   <div className="soft-rule my-8"/>
   <div className="flex items-start gap-4"><span className="text-sage font-display text-3xl leading-8">03</span><div className="flex-1"><h3 className="text-xl font-semibold tracking-[-.035em]">Kit o kit montado</h3><p className="note mt-1">Ambas modalidades se limitan al alcance estructural contratado.</p></div></div>
   <div className="mt-5"><ModeSwitch/></div>
   <p className="note mt-5">{mode==='kit'?'Suministro de componentes estructurales y planos del kit. Tú gestionas el montaje, los interiores y las restantes partidas.':'Suministro y montaje de la estructura acordada; no se entrega una vivienda acabada.'}</p>
   <div className="soft-rule my-8"/>
   <div className="flex items-start gap-4"><span className="text-sage font-display text-3xl leading-8">04</span><div className="flex-1"><h3 className="text-xl font-semibold tracking-[-.035em]">Elige tus extras</h3><p className="note mt-1">Terraza, garaje y piscina: sujetos a presupuesto técnico específico.</p></div></div>
   <ExtrasSelector/>
   <div className="soft-rule my-8"/>
   <div className="flex items-start gap-4"><span className="text-sage font-display text-3xl leading-8">05</span><div className="flex-1"><h3 className="text-xl font-semibold tracking-[-.035em]">Calcula el transporte</h3><p className="note mt-1">Introduce el CP de destino para calcular la partida de envío.</p></div></div>
   <div className="mt-6"><ShippingField compact={compact}/></div>
  </div>
  <div className={`quote-box lg:sticky lg:top-[100px] ${compact?'':'shadow-[0_20px_60px_rgba(29,47,33,.07)]'}`}>
   <span className="eyebrow text-sage">DESGLOSE / TRANSPARENCIA</span>
   <h3 className="font-display display-font text-4xl leading-tight mt-4">{modelName}</h3>
   <p className="text-[12px] text-muted mt-2">{area} m² · {mode==='kit'?'Solo kit':'Kit + montaje estructural'}</p>
   <div className="soft-rule my-7"/>
   <div className="space-y-5 text-sm">
    <div className="flex justify-between gap-5"><span>Kit estructural <small className="block text-muted mt-1">{euro(siteConfig.pricing.kitPerM2)}/m² × {area} m²</small></span><strong>{euro(quote.kit)}</strong></div>
    <div className="flex justify-between gap-5"><span>Planos del kit <small className="block text-muted mt-1">Alcance por confirmar</small></span><strong>Incluidos</strong></div>
    <div className="flex justify-between gap-5"><span>Montaje estructural <small className="block text-muted mt-1">{euro(siteConfig.pricing.assemblyPerM2)}/m² × {area} m²</small></span><strong>{mode==='montaje'?euro(quote.assembly):'No elegido'}</strong></div>
    <div className="flex justify-between gap-5"><span>Transporte <small className="block text-muted mt-1">{postalCode?`Entrega en CP ${postalCode}`:'Introduce el CP de destino'}</small></span><strong>{shipping?euro(shipping.amount):'Pendiente'}</strong></div>
    {extrasQuote.lines.map(line=><div className="flex justify-between gap-5" key={line.id}><span>{line.name}<small className="block text-muted mt-1">{line.unit==='m2'?`${line.quantity} m² adicionales`:'Actuación opcional'}</small></span><strong>{line.amount!==null?euro(line.amount):'A valorar'}</strong></div>)}
   </div>
   <div className="soft-rule my-7"/>
   <div><p className="eyebrow text-muted mb-2">{shippingPending||extrasQuote.pending?'Subtotal de partidas calculadas':'Total orientativo del kit y opciones calculadas'}</p><p className="price-digit">{euro(knownSubtotal)}</p></div>
   {(shippingPending||extrasQuote.pending)&&<p className="text-xs leading-6 mt-4 font-semibold text-[#896619]">Falta añadir {shippingPending?'el transporte':''}{shippingPending&&extrasQuote.pending?' y ':''}{extrasQuote.pending?'los extras pendientes de valoración':''}. Este subtotal NO representa el coste final.</p>}
   <p className="text-[11px] text-muted mt-3">{siteConfig.pricing.taxNote}</p>
   <div className="bg-paper p-4 mt-6"><p className="font-semibold text-xs mb-2">Solo estructura. Interiores por tu cuenta.</p><p className="text-xs leading-6 text-muted">No vendemos una vivienda llave en mano. No incluye acabados, instalaciones, cocina ni baños. Cimentación, cubierta, ventanas y alcance estructural se definirán por contrato. <Link className="underline text-ink" href="/el-kit">Ver límites del suministro</Link>.</p></div>
   <p className="note mt-3">{siteConfig.pricing.surfaceCriterion}</p>
   <Link href="/contacto" className="button-solid w-full mt-7">Pedir propuesta detallada <ArrowUpRight size={16}/></Link>
   <div className="grid grid-cols-2 gap-2 mt-3"><button type="button" className="button-outline !text-[11px] !px-3" disabled={pdfBusy} onClick={onPdf}>{pdfBusy?<LoaderCircle size={15} className="animate-spin"/>:<Download size={15}/>} {pdfBusy?'Generando':'Descargar PDF'}</button><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={()=>track('whatsapp_click',{area,mode})} className="button-outline !text-[11px] !px-3"><Share2 size={15}/>{whatsappNum?'Consultar':'Compartir'} WhatsApp</a></div>
   {pdfError&&<p className="text-red-700 text-xs mt-3" role="alert">{pdfError}</p>}
   {!whatsappNum&&<p className="note mt-3">Número de WhatsApp pendiente de configurar. Mientras tanto puedes compartir el texto de la solicitud.</p>}
  </div>
 </div>;
}
