'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
const KEY='celar-cookie-preferences';
export function CookieBanner() {
  const [open,setOpen]=useState(false);
  const [custom,setCustom]=useState(false);
  const [analytics,setAnalytics]=useState(false);
  useEffect(()=>{
    try{const current=localStorage.getItem(KEY);setOpen(!current);if(current)setAnalytics(JSON.parse(current).analytics===true)}catch{setOpen(true)}
    const handler=()=>{setCustom(true);setOpen(true)};window.addEventListener('celar:open-cookies',handler);
    return ()=>window.removeEventListener('celar:open-cookies',handler);
  },[]);
  const save=(enabled:boolean)=>{try{localStorage.setItem(KEY,JSON.stringify({essential:true,analytics:enabled,date:new Date().toISOString()}))}catch{}setOpen(false)};
  if(!open)return null;
  return <aside aria-label="Preferencias de cookies" className="fixed bottom-[76px] sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:w-[420px] z-[80] bg-[#fbfaf7] border border-line p-6 shadow-floating">
    <div className="flex items-center justify-between"><h2 className="font-display display-font text-[28px]">Tu privacidad importa.</h2><span className="eyebrow text-muted">Cookies</span></div>
    <p className="text-[13px] leading-6 text-muted mt-3">Usamos almacenamiento necesario para recordar tus preferencias. La analítica opcional solo se habilita con tu consentimiento y cuando se configure un proveedor.</p>
    {custom && <label className="mt-4 flex justify-between items-center text-sm"><span>Permitir analítica opcional</span><input type="checkbox" checked={analytics} onChange={e=>setAnalytics(e.target.checked)}/></label>}
    <div className="flex flex-wrap gap-2 mt-5"><button onClick={()=>save(false)} className="button-outline !min-h-[42px] !px-4">Rechazar opcionales</button><button onClick={()=>save(custom?analytics:true)} className="button-solid !min-h-[42px] !px-4">{custom?'Guardar elección':'Aceptar'}</button><button className="text-xs underline ml-1" onClick={()=>setCustom(!custom)}>{custom?'Ocultar':'Configurar'}</button></div>
    <Link href="/cookies" className="text-[11px] text-muted underline mt-4 inline-block">Política de cookies</Link>
  </aside>;
}
