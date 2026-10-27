'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { models, siteConfig, defaultExtraSelections, type ExtraId, type ExtraSelection } from '@/config/site';
import { quotePrice, extrasQuote, type QuoteMode } from '@/lib/pricing';

type ShippingEstimate = {postalCode:string;originPostalCode:string;distanceKm:number;amount:number;destination:string};
type ShippingStatus = 'idle'|'loading'|'ready'|'error';
type QuoteContextShape = {
 area:number; mode:QuoteMode; modelSlug:string; postalCode:string; shipping:ShippingEstimate|null;
 shippingStatus:ShippingStatus; shippingError:string; extraSelections:ExtraSelection;
 setArea:(a:number)=>void; setMode:(m:QuoteMode)=>void; selectModel:(slug:string)=>void;
 setPostalCode:(postcode:string)=>void; retryShipping:()=>void;
 setExtra:(id:ExtraId,patch:Partial<ExtraSelection[ExtraId]>)=>void;
 quote:ReturnType<typeof quotePrice>; extrasQuote:ReturnType<typeof extrasQuote>;
 knownSubtotal:number; shippingPending:boolean;
};
const QuoteContext = createContext<QuoteContextShape | null>(null);
const initial = {area:120,mode:'kit' as QuoteMode,modelSlug:'patio-120'};
export function QuoteProvider({children}:{children:ReactNode}) {
 const [area,rawSetArea]=useState(initial.area);
 const [mode,setMode]=useState<QuoteMode>(initial.mode);
 const [modelSlug,setModelSlug]=useState(initial.modelSlug);
 const [postalCode,rawSetPostalCode]=useState('');
 const [shipping,setShipping]=useState<ShippingEstimate|null>(null);
 const [shippingStatus,setShippingStatus]=useState<ShippingStatus>('idle');
 const [shippingError,setShippingError]=useState('');
 const [retry,setRetry]=useState(0);
 const [extraSelections,setExtraSelections]=useState<ExtraSelection>(defaultExtraSelections());
 const [ready,setReady]=useState(false);
 useEffect(()=>{
  try{
   const stored=JSON.parse(sessionStorage.getItem('nolimitsblocks-quote')||'null');
   if(stored&&Number.isFinite(stored.area))rawSetArea(Math.max(siteConfig.pricing.rangeMin,Math.min(siteConfig.pricing.rangeMax,Number(stored.area))));
   if(stored&&(stored.mode==='kit'||stored.mode==='montaje'))setMode(stored.mode);
   if(stored&&typeof stored.modelSlug==='string')setModelSlug(stored.modelSlug);
   if(stored&&typeof stored.postalCode==='string'&&/^\d{0,5}$/.test(stored.postalCode))rawSetPostalCode(stored.postalCode);
   if(stored&&stored.extraSelections){const choices=defaultExtraSelections();for(const id of Object.keys(choices) as ExtraId[]){const selection=stored.extraSelections[id];if(selection&&typeof selection.selected==='boolean'&&Number.isFinite(selection.quantity))choices[id]={selected:selection.selected,quantity:Math.max(1,Math.min(500,Number(selection.quantity)))}}setExtraSelections(choices)}
  }catch{ /* datos locales inválidos */ }
  setReady(true);
 },[]);
 useEffect(()=>{if(ready)sessionStorage.setItem('nolimitsblocks-quote',JSON.stringify({area,mode,modelSlug,postalCode,extraSelections}));},[area,mode,modelSlug,postalCode,extraSelections,ready]);
 useEffect(()=>{
  if(!ready||!/^[0-9]{5}$/.test(postalCode)){setShippingStatus('idle');setShipping(null);return;}
  const ac=new AbortController();
  const timer=setTimeout(async()=>{
   setShippingStatus('loading');setShippingError('');
   try {
    const res=await fetch('/api/transporte',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({postalCode}),signal:ac.signal,cache:'no-store'});
    const result=await res.json() as ShippingEstimate & {error?:string};
    if(!res.ok)throw new Error(result.error||'No se pudo calcular el transporte.');
    if(!ac.signal.aborted){setShipping(result);setShippingStatus('ready');}
   } catch(error){if(ac.signal.aborted)return;setShipping(null);setShippingStatus('error');setShippingError(error instanceof Error?error.message:'No se pudo calcular el transporte.');}
  },450);
  return ()=>{clearTimeout(timer);ac.abort();};
 },[postalCode,retry,ready]);
 const setPostalCode=useCallback((value:string)=>{rawSetPostalCode(value.replace(/\D/g,'').slice(0,5));setShipping(null);setShippingStatus('idle');setShippingError('');},[]);
 const retryShipping=useCallback(()=>setRetry(p=>p+1),[]);
 const selectModel=(slug:string)=>{const model=models.find(m=>m.slug===slug);if(!model){setModelSlug('personalizado');return;}rawSetArea(model.area);setModelSlug(model.slug);};
 const setArea=(a:number)=>{if(!Number.isFinite(a))return;const v=Math.min(siteConfig.pricing.rangeMax,Math.max(siteConfig.pricing.rangeMin,Math.round(a)));rawSetArea(v);if(!models.find(m=>m.area===v&&m.slug===modelSlug))setModelSlug('personalizado');};
 const setExtra=useCallback((id:ExtraId,patch:Partial<ExtraSelection[ExtraId]>)=>{setExtraSelections(current=>({...current,[id]:{...current[id],...patch}}));},[]);
 const quote=useMemo(()=>quotePrice(area,mode),[area,mode]);
 const pricedExtras=useMemo(()=>extrasQuote(extraSelections),[extraSelections]);
 const knownSubtotal=quote.total+pricedExtras.calculated+(shipping?.amount??0);
 return <QuoteContext.Provider value={{area,mode,modelSlug,postalCode,shipping,shippingStatus,shippingError,extraSelections,setArea,setMode,selectModel,setPostalCode,retryShipping,setExtra,quote,extrasQuote:pricedExtras,knownSubtotal,shippingPending:!shipping}}>{children}</QuoteContext.Provider>;
}
export function useQuote(){const context=useContext(QuoteContext);if(!context)throw new Error('useQuote fuera de QuoteProvider');return context;}
