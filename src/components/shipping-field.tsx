'use client';
import { LoaderCircle, MapPin, RefreshCcw, Truck } from 'lucide-react';
import { useQuote } from './quote-context';
import { euro } from '@/lib/pricing';
import { siteConfig } from '@/config/site';

export function ShippingField({ compact = false }:{compact?:boolean}) {
 const {postalCode,setPostalCode,shipping,shippingStatus,shippingError,retryShipping}=useQuote();
 return <div className="shipping-field">
  <label htmlFor={compact?'shipping-postal-compact':'shipping-postal'} className="field-label">Código postal de entrega (España) *</label>
  <div className="flex flex-wrap sm:flex-nowrap gap-2 items-stretch">
   <div className="relative flex-1 min-w-[155px]"><MapPin size={17} className="absolute left-4 top-[18px] text-muted"/><input id={compact?'shipping-postal-compact':'shipping-postal'} className="form-control !pl-11 font-semibold tracking-[.12em]" type="text" inputMode="numeric" autoComplete="postal-code" maxLength={5} pattern="[0-9]{5}" required value={postalCode} onChange={e=>setPostalCode(e.target.value)} placeholder="Ej. 28001" aria-label="Código postal de entrega"/></div>
   <button type="button" onClick={retryShipping} disabled={postalCode.length!==5 || shippingStatus==='loading'} className="button-outline !px-4 !text-[11px] disabled:opacity-40" aria-label="Recalcular transporte">{shippingStatus==='loading'?<LoaderCircle className="animate-spin" size={16}/>:<RefreshCcw size={16}/>} Calcular envío</button>
  </div>
  <p className="note mt-3">Origen: <strong>{siteConfig.shipping.originPostalCode}, {siteConfig.shipping.originLabel}</strong>. Recibirás una estimación a tu zona postal; se validarán acceso y descarga.</p>
  {shippingStatus==='loading'&&<p role="status" className="mt-3 text-xs flex items-center gap-2 text-muted"><LoaderCircle size={15} className="animate-spin"/> Calculando ruta por carretera…</p>}
  {shippingStatus==='ready'&&shipping&&<div role="status" className="mt-4 border border-[#bed5b9] bg-[#eef5e9] px-4 py-4 flex items-start justify-between gap-4 text-sm"><div className="flex items-start gap-2"><Truck size={18} className="mt-0.5 text-[#4b7644] shrink-0"/><div><strong>Transporte estimado</strong><p className="text-xs text-muted mt-1">{shipping.distanceKm.toLocaleString('es-ES')} km por carretera · destino CP {shipping.postalCode}</p></div></div><strong className="whitespace-nowrap">{euro(shipping.amount)}</strong></div>}
  {shippingStatus==='error'&&<div className="mt-3 border border-amber-300 bg-amber-50 p-3 text-xs leading-6 text-amber-950" role="alert">{shippingError} El kit se puede solicitar igualmente con transporte pendiente de valorar.</div>}
 </div>;
}
