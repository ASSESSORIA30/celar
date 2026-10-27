'use client';
export function CookiesSettings(){return <button type="button" onClick={()=>window.dispatchEvent(new Event('nolimitsblocks:open-cookies'))} className="underline hover:text-white">Configurar cookies</button>}
