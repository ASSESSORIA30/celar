import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { getModel, models, modelPlan, siteConfig } from '@/config/site';
import { RenderGallery } from '@/components/render-gallery';
import { ModelDetailPricing } from '@/components/model-detail-pricing';
import { FAQ } from '@/components/faq';
export const dynamicParams=false;
export function generateStaticParams(){return models.map(m=>({slug:m.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const {slug}=await params;const m=getModel(slug);return m?{title:`Vivienda ${m.name} ${m.area} m² en kit`,description:`Modelo conceptual ${m.name} de ${m.area} m². Kit desde ${m.area*siteConfig.pricing.kitPerM2} € y opción de montaje. Consulta imágenes, plano conceptual y precio.`,openGraph:{images:[`/images/${m.visualKey}-fachada.webp`]}}:{title:'Vivienda no encontrada'};
}
export default async function HousePage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const m=getModel(slug);if(!m)notFound();const next=models[(models.findIndex(x=>x.slug===slug)+1)%models.length];
 return <>
 <div className="container-wide pt-8 pb-24"><Link href="/viviendas" className="inline-flex items-center gap-2 text-xs text-muted hover:text-ink"><ArrowLeft size={15}/> Volver a todas las viviendas</Link>
 <div className="mt-12 mb-9 flex flex-col md:flex-row justify-between md:items-end gap-8"><div><p className="eyebrow text-sage mb-4">Colección conceptual · {m.area} m² presupuestados</p><h1 className="font-display display-font text-[clamp(60px,8vw,120px)] leading-[.95]">{m.name}<span className="text-sage">.</span></h1><p className="text-lg text-muted mt-4">{m.subtitle}</p></div><span className="pill-outline">{m.levels}</span></div>
 <div className="grid lg:grid-cols-[1.45fr_.75fr] gap-7 items-start"><RenderGallery model={m}/><ModelDetailPricing model={m}/></div>
 <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mt-24"><div><p className="eyebrow text-sage mb-5">La arquitectura</p><h2 className="section-title">Un lugar para <em className="text-sage not-italic">vivir a tu manera.</em></h2><p className="copy-large mt-7">{m.description}</p><p className="note mt-6">Los dormitorios, baños y la distribución definitiva no se muestran como características cerradas porque todavía no han sido validados.</p></div><div className="bg-[#e8eae2] p-6 sm:p-8"><Image src={modelPlan(m)} width={980} height={660} alt={`Esquema de planta conceptual de ${m.name}`} className="w-full"/><p className="note mt-4">Plano puramente ilustrativo: no representa una solución técnica aprobada ni documentación apta para solicitar licencia.</p></div></div>
 <div className="soft-rule my-20"/><div className="grid lg:grid-cols-[.8fr_1.2fr] gap-14"><div><p className="eyebrow text-sage mb-5">Antes de reservar</p><h2 className="section-title">Una decisión <em className="text-sage not-italic">informada.</em></h2></div><div><FAQ limit={5}/></div></div>
 <Link href={`/viviendas/${next.slug}`} className="bg-deep text-white mt-24 p-8 sm:p-12 flex items-center justify-between gap-6 group"><div><span className="eyebrow text-[#acbeac]">Siguiente vivienda</span><h2 className="font-display display-font text-4xl sm:text-5xl mt-3">{next.name} / {next.area} m²</h2></div><ArrowRight size={29} className="group-hover:translate-x-2 transition-transform"/></Link>
 </div>
 </>
}
