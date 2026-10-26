import { NextRequest, NextResponse } from 'next/server';
import { leadSchema } from '@/lib/lead-schema';
import { euro, quotePrice } from '@/lib/pricing';
import { siteConfig, models } from '@/config/site';
export const runtime='nodejs';
const localLimits=new Map<string,{count:number;expires:number}>();
const WINDOW=15*60*1000;const MAX=5;
const clean = (v:string) => v.replace(/[&<>"']/g, (c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));
async function rateLimit(ip:string):Promise<boolean>{
 const now=Date.now(); const url=process.env.UPSTASH_REDIS_REST_URL;const token=process.env.UPSTASH_REDIS_REST_TOKEN;
 if(url&&token){
   try{
     const res=await fetch(`${url}/pipeline`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify([['INCR',`celar:rate:${ip}:${Math.floor(now/WINDOW)}`],['EXPIRE',`celar:rate:${ip}:${Math.floor(now/WINDOW)}`,900]]),cache:'no-store'});
     if(!res.ok)return false;
     const out=await res.json() as {result?:number}[];
     return Number(out[0]?.result)<=MAX;
   }catch{return false;}
 }
 // Fallback only per instance, deploy persistent rate limiting for production.
 if(localLimits.size>5000)localLimits.clear();
 const prior=localLimits.get(ip);
 const next=!prior||prior.expires<now?{count:1,expires:now+WINDOW}:{count:prior.count+1,expires:prior.expires};
 localLimits.set(ip,next);return next.count<=MAX;
}
export async function POST(req:NextRequest){
 let body:unknown;
 try{body=await req.json()}catch{return NextResponse.json({error:'Solicitud JSON no válida.'},{status:400})}
 const parsed=leadSchema.safeParse(body);
 if(!parsed.success)return NextResponse.json({error:'Revisa los datos del formulario.'},{status:400});
 const lead=parsed.data;
 if(lead.website)return NextResponse.json({error:'Solicitud no válida.'},{status:400});
 const age=Date.now()-lead.startedAt;
 if(age<2000||age>24*60*60*1000)return NextResponse.json({error:'Verifica el formulario y vuelve a intentarlo.'},{status:400});
 const ip=req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'unknown';
 if(!(await rateLimit(ip)))return NextResponse.json({error:'Demasiadas solicitudes. Vuelve a intentarlo más tarde.'},{status:429});
 const turnstileSecret=process.env.TURNSTILE_SECRET_KEY;
 if(turnstileSecret){
   if(!lead.turnstileToken)return NextResponse.json({error:'Falta la verificación antispam.'},{status:400});
   try{const verify=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:turnstileSecret,response:lead.turnstileToken,remoteip:ip})});
   const outcome=await verify.json() as {success?:boolean}; if(!verify.ok||!outcome.success)return NextResponse.json({error:'La verificación de seguridad no se ha completado.'},{status:400});
   }catch{return NextResponse.json({error:'No se ha podido verificar la solicitud.'},{status:503})}
 }
 const {RESEND_API_KEY,LEADS_TO_EMAIL,FROM_EMAIL}=process.env;
 if(!RESEND_API_KEY||!LEADS_TO_EMAIL||!FROM_EMAIL){
   return NextResponse.json({error:'El envío de solicitudes aún no está activado. Falta configurar el correo de la empresa.'},{status:503});
 }
 const q=quotePrice(lead.area,lead.mode);
 const house=models.find(m=>m.slug===lead.modelSlug);
 const text=[
   `Nueva solicitud desde ${siteConfig.brand.name}`,
   `Nombre: ${lead.name}`,`Teléfono: ${lead.phone}`,`Email: ${lead.email}`,
   `Provincia: ${lead.province}`,`Terreno: ${lead.hasLand}`,
   `Modelo: ${house?house.name:'Personalizado'}`,`Superficie: ${lead.area} m²`,
   `Modalidad: ${lead.mode==='kit'?'Solo kit':'Kit + montaje'}`,
   `Kit: ${euro(q.kit)}`,`Montaje: ${lead.mode==='kit'?'No incluido':euro(q.assembly)}`,
   `Total orientativo sin impuestos calculados: ${euro(q.total)}`,
   `Mensaje: ${lead.message||'—'}`,
   `Privacidad aceptada: Sí`,`Alcance sujeto a validación.`
 ].join('\n');
 try {
   const send=await fetch('https://api.resend.com/emails',{
     method:'POST',headers:{Authorization:`Bearer ${RESEND_API_KEY}`,'Content-Type':'application/json'},
     body:JSON.stringify({from:FROM_EMAIL,to:[LEADS_TO_EMAIL],reply_to:lead.email,
       subject:`Nueva solicitud ${siteConfig.brand.name} · ${clean(house?.name||'A medida')} · ${lead.area} m²`,text}),
     cache:'no-store'
   });
   if(!send.ok){console.error('Email provider failed',send.status);return NextResponse.json({error:'El servidor de correo no ha aceptado la solicitud. Inténtalo más tarde.'},{status:502});}
   const result=await send.json() as {id?:string};
   if(!result.id)return NextResponse.json({error:'El servicio no confirmó el envío. Vuelve a intentarlo.'},{status:502});
   return NextResponse.json({ok:true},{status:200});
 }catch{return NextResponse.json({error:'No se pudo completar el envío. Vuelve a intentarlo.'},{status:502});}
}
