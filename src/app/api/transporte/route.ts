import { NextRequest, NextResponse } from 'next/server';
import { calculateShipping, ShippingError } from '@/server/transport';

export const dynamic = 'force-dynamic';
const hits = new Map<string,{count:number;until:number}>();
const MAX = 30;
const WINDOW = 10 * 60 * 1000;
const nocache = { 'Cache-Control': 'no-store' };

export async function POST(request:NextRequest) {
  const ip=request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const now=Date.now();
  if (hits.size > 10000) hits.clear();
  const prev=hits.get(ip);
  const next = !prev || now>prev.until ? {count:1,until:now+WINDOW} : {count:prev.count+1,until:prev.until};
  hits.set(ip,next);
  if (next.count>MAX) return NextResponse.json({error:'Demasiadas consultas; inténtalo más tarde.'},{status:429,headers:nocache});
  let payload:unknown;
  try {payload=await request.json();}catch{return NextResponse.json({error:'Datos no válidos.'},{status:400,headers:nocache});}
  const postalCode=(payload && typeof payload==='object' && 'postalCode' in payload) ? (payload as {postalCode:unknown}).postalCode : undefined;
  if (typeof postalCode !== 'string' || !/^\d{5}$/.test(postalCode)) return NextResponse.json({error:'Introduce un código postal válido de 5 cifras.'},{status:400,headers:nocache});
  try {return NextResponse.json(await calculateShipping(postalCode),{headers:nocache});}
  catch(error) {
    if (error instanceof ShippingError) {
      const status=error.code==='invalid_postal'?400:error.code==='not_found'?404:error.code==='no_route'?422:error.code==='not_configured'?503:502;
      return NextResponse.json({error:error.message,code:error.code},{status,headers:nocache});
    }
    console.error('Unexpected transport error',error);
    return NextResponse.json({error:'No se pudo calcular el transporte.'},{status:502,headers:nocache});
  }
}
