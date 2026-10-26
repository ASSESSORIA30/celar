'use client';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, LoaderCircle, ShieldCheck } from 'lucide-react';
import { useQuote } from './quote-context';
import { models, siteConfig } from '@/config/site';
import { euro } from '@/lib/pricing';
import { track } from '@/lib/analytics';
const provinces = 'Álava,Albacete,Alicante,Almería,Asturias,Ávila,Badajoz,Barcelona,Burgos,Cáceres,Cádiz,Cantabria,Castellón,Ceuta,Ciudad Real,Córdoba,A Coruña,Cuenca,Girona,Granada,Guadalajara,Gipuzkoa,Huelva,Huesca,Illes Balears,Jaén,León,Lleida,Lugo,Madrid,Málaga,Melilla,Murcia,Navarra,Ourense,Palencia,Las Palmas,Pontevedra,La Rioja,Salamanca,Santa Cruz de Tenerife,Segovia,Sevilla,Soria,Tarragona,Teruel,Toledo,Valencia,Valladolid,Bizkaia,Zamora,Zaragoza'.split(',');
type Form = {name:string;phone:string;email:string;province:string;hasLand:'si'|'no'|'buscando';message:string;consent:boolean;website:string};
export function LeadForm(){
 const {area,mode,modelSlug,quote}=useQuote();
 const [form,setForm]=useState<Form>({name:'',phone:'',email:'',province:'',hasLand:'buscando',message:'',consent:false,website:''});
 const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle');
 const [error,setError]=useState('');
 const startedAt=useRef(Date.now());
 const chosen=models.find(m=>m.slug===modelSlug);
 const change=(key:keyof Form,value:string|boolean)=>setForm(previous=>({...previous,[key]:value}));
 const siteKey=process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
 useEffect(()=>{startedAt.current=Date.now()},[]);
 async function submit(e:FormEvent<HTMLFormElement>){
   e.preventDefault();if(status==='sending')return;
   setError('');setStatus('sending');
   const turnstileToken=siteKey?(document.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]')?.value||''):'';
   if(siteKey&&!turnstileToken){setError('Completa la verificación de seguridad.');setStatus('error');return;}
   try {
     const response=await fetch('/api/lead',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({...form,area,mode,modelSlug,startedAt:startedAt.current,turnstileToken})});
     const body:unknown=await response.json();
     const message=typeof body==='object'&&body!==null&&'error' in body&&typeof body.error==='string'?body.error:'No se pudo enviar tu solicitud.';
     if(!response.ok)throw new Error(message);
     setStatus('sent');track('lead_submission',{mode,area});
   } catch(err){setStatus('error');setError(err instanceof Error?err.message:'No se pudo enviar la solicitud.');}
 }
 if(status==='sent') return <div className="bg-white border border-line p-10 text-center" role="status"><CheckCircle2 size={42} className="text-sage mx-auto"/><h2 className="font-display display-font text-4xl mt-5">Solicitud recibida.</h2><p className="text-sm text-muted leading-7 mt-3">La plataforma de envío ha confirmado la recepción de la solicitud. Contactaremos por los datos facilitados.</p><Link className="button-solid mt-8" href="/viviendas">Seguir explorando <ArrowUpRight size={16}/></Link></div>;
 return <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-9 lg:gap-12 items-start">
    <form onSubmit={submit} className="bg-white border border-line p-6 sm:p-10 space-y-6" noValidate={false}>
      <div><p className="eyebrow text-sage mb-3">Cuéntanos tu proyecto</p><h2 className="font-display display-font text-4xl">Hagamos que empiece.</h2><p className="note mt-3">Completa tus datos y revisa la estimación antes de enviarla.</p></div>
      <div className="grid sm:grid-cols-2 gap-5"><div><label htmlFor="lead-name" className="field-label">Nombre *</label><input id="lead-name" className="form-control" required minLength={2} maxLength={110} autoComplete="name" value={form.name} onChange={e=>change('name',e.target.value)}/></div><div><label htmlFor="lead-phone" className="field-label">Teléfono *</label><input id="lead-phone" className="form-control" type="tel" required minLength={7} maxLength={30} autoComplete="tel" value={form.phone} onChange={e=>change('phone',e.target.value)}/></div></div>
      <div className="grid sm:grid-cols-2 gap-5"><div><label htmlFor="lead-email" className="field-label">Correo electrónico *</label><input id="lead-email" className="form-control" type="email" required autoComplete="email" value={form.email} onChange={e=>change('email',e.target.value)}/></div><div><label htmlFor="lead-province" className="field-label">Provincia donde construirías *</label><select id="lead-province" className="form-control" required value={form.province} onChange={e=>change('province',e.target.value)}><option value="">Selecciona provincia</option>{provinces.map(p=><option key={p} value={p}>{p}</option>)}</select></div></div>
      <div><label htmlFor="lead-land" className="field-label">¿Ya dispones de terreno?</label><select id="lead-land" className="form-control" value={form.hasLand} onChange={e=>change('hasLand',e.target.value)}><option value="si">Sí, tengo terreno</option><option value="buscando">Estoy buscando</option><option value="no">Aún no</option></select></div>
      <div><label htmlFor="lead-message" className="field-label">¿Algo más que debamos saber? (opcional)</label><textarea id="lead-message" rows={5} maxLength={1500} className="form-control" placeholder="Municipio, idea de vivienda, dudas o condiciones particulares…" value={form.message} onChange={e=>change('message',e.target.value)}/></div>
      {/* Honeypot anti-bot; invisible to humans. */}
      <div style={{position:'absolute',left:'-9999px'}} aria-hidden="true"><label htmlFor="website">Web de contacto</label><input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={e=>change('website',e.target.value)}/></div>
      <label className="flex items-start gap-3 text-[12px] leading-6 text-muted"><input type="checkbox" required checked={form.consent} onChange={e=>change('consent',e.target.checked)} className="mt-[5px]"/><span>He leído la <Link href="/privacidad" className="text-ink underline" target="_blank">política de privacidad</Link> y consiento el tratamiento de mis datos para gestionar esta solicitud. *</span></label>
      {siteKey&&<><Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive"/><div className="cf-turnstile" data-sitekey={siteKey}/></>}
      {error&&<div className="border border-red-300 bg-red-50 p-4 text-sm text-red-900 leading-6" role="alert">{error}</div>}
      <button type="submit" disabled={status==='sending'} className="button-solid w-full">{status==='sending'?'Enviando…':'Enviar solicitud'}{status==='sending'?<LoaderCircle size={17} className="animate-spin"/>:<ArrowUpRight size={17}/>}</button>
      <div className="flex items-start gap-2 text-[11px] text-muted leading-5"><ShieldCheck size={14} className="shrink-0"/><span>El envío solo se confirma si el proveedor de correo responde correctamente. No se envían datos a herramientas analíticas.</span></div>
    </form>
    <aside className="lg:sticky lg:top-[100px] border border-line bg-[#eeefe9] p-6 sm:p-9"><p className="eyebrow text-sage mb-5">Resumen de tu solicitud</p><h3 className="font-display display-font text-3xl">{chosen?`${chosen.name} ${chosen.area}`:'Vivienda a medida'}</h3><div className="space-y-4 mt-7 text-sm"><div className="flex justify-between"><span className="text-muted">Superficie</span><strong>{area} m²</strong></div><div className="soft-rule"/><div className="flex justify-between"><span className="text-muted">Modalidad</span><strong>{mode==='kit'?'Solo kit':'Kit + montaje'}</strong></div><div className="soft-rule"/><div className="flex justify-between"><span className="text-muted">Kit</span><strong>{euro(quote.kit)}</strong></div><div className="flex justify-between"><span className="text-muted">Montaje</span><strong>{mode==='montaje'?euro(quote.assembly):'No incluido'}</strong></div><div className="soft-rule"/><p className="text-muted text-xs">Total estimado · impuestos no calculados</p><p className="font-display display-font text-[47px] leading-none">{euro(quote.total)}</p></div><Link href="/calculadora" className="inline-flex mt-8 gap-2 text-xs font-semibold underline">Modificar mi cálculo <ArrowUpRight size={14}/></Link><p className="note mt-6">Esta estimación no es un presupuesto contractual. Excluye partidas de obra e instalaciones y requiere validación técnica.</p></aside>
 </div>
}
