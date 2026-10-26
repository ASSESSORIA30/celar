'use client';
import { useQuote } from './quote-context';
import { type QuoteMode } from '@/lib/pricing';
import { track } from '@/lib/analytics';
export function ModeSwitch({ light = false }: { light?: boolean }) {
  const {mode,setMode}=useQuote();
  const handle=(value:QuoteMode)=>{setMode(value);track('configurator_change',{mode:value})};
  return <div className={`inline-flex rounded-[3px] p-[4px] gap-1 ${light?'bg-white/10':'bg-[#ebede6]'}`} role="group" aria-label="Modalidad del presupuesto">
    <button type="button" onClick={()=>handle('kit')} aria-pressed={mode==='kit'} className={`px-4 py-3 min-h-11 text-[12px] font-bold tracking-[.02em] rounded-[2px] transition-colors ${mode==='kit'?(light?'bg-white text-deep':'bg-ink text-white'):light?'text-white/75':'text-muted'}`}>Solo kit</button>
    <button type="button" onClick={()=>handle('montaje')} aria-pressed={mode==='montaje'} className={`px-4 py-3 min-h-11 text-[12px] font-bold tracking-[.02em] rounded-[2px] transition-colors ${mode==='montaje'?(light?'bg-white text-deep':'bg-ink text-white'):light?'text-white/75':'text-muted'}`}>Kit + montaje</button>
  </div>
}
