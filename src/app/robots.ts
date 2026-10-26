import { getSiteUrl } from '@/lib/site-url';
import type { MetadataRoute } from 'next';
export default function robots():MetadataRoute.Robots{
 const url=getSiteUrl();
 return {rules:{userAgent:'*',allow:'/',disallow:['/api/','/editor','/aviso-legal','/privacidad','/cookies']},sitemap:`${url}/sitemap.xml`};
}
