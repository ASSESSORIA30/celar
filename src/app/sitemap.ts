import { getSiteUrl } from '@/lib/site-url';
import type { MetadataRoute } from 'next';
import { models } from '@/config/site';
export default function sitemap():MetadataRoute.Sitemap{
 const url=getSiteUrl();
 return ['/','/viviendas','/calculadora','/transporte','/el-kit','/como-funciona','/hormigon-celular','/contacto',...models.map(m=>`/viviendas/${m.slug}`)].map(path=>({url:`${url}${path}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:path==='/'?1:.7}));
}
