'use client';
import { Check, PlusSquare } from 'lucide-react';
import { extras } from '@/config/site';
import { euro } from '@/lib/pricing';
import { useQuote } from './quote-context';

export function ExtrasSelector(){
 const {extraSelections,setExtra}=useQuote();
 return <div className="grid sm:grid-cols-3 gap-3 mt-5">
  {extras.map(extra=>{
   const entry=extraSelections[extra.id];
   return <div key={extra.id} className={`border p-4 sm:p-5 bg-white transition-colors ${entry.selected?'border-[#c89c2c] ring-1 ring-[#c89c2c]':'border-line'}`}>
    <label className="flex items-start gap-3 cursor-pointer"><input className="mt-1 accent-[#d4a233] w-4 h-4" type="checkbox" checked={entry.selected} onChange={e=>setExtra(extra.id,{selected:e.target.checked})}/><span className="font-semibold text-[13px] leading-5 flex-1">{extra.name}</span>{entry.selected?<Check size={17} className="text-[#967525]"/>:<PlusSquare size={17} className="text-muted"/>}</label>
    <p className="text-[11px] leading-5 text-muted mt-3 min-h-[56px]">{extra.description}</p>
    {entry.selected&&extra.unit==='m2'&&<label className="field-label mt-3">Superficie adicional (m²)<input className="form-control mt-2 !min-h-[42px]" type="number" min={1} max={500} value={entry.quantity} onChange={e=>setExtra(extra.id,{quantity:Math.max(1,Math.min(500,Number(e.target.value)||1))})}/></label>}
    <p className="text-[11px] font-semibold mt-4 text-[#8e6a26]">{extra.pricePerUnit===null?'Precio sujeto a estudio':entry.selected?euro(extra.pricePerUnit * entry.quantity):'Precio configurable'}</p>
   </div>;
  })}
 </div>;
}
