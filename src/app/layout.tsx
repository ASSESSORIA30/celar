import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { QuoteProvider } from '@/components/quote-context';
import { CookieBanner } from '@/components/cookie-banner';
import { siteConfig } from '@/config/site';
import { getSiteUrl } from '@/lib/site-url';
const root=getSiteUrl();
export const metadata:Metadata={
  metadataBase:new URL(root),
  title:{default:`${siteConfig.brand.name} | Viviendas de hormigón celular en kit`,template:`%s | ${siteConfig.brand.name}`},
  description:`Explora viviendas en kit de hormigón celular. Kit, planos y transporte incluidos desde ${siteConfig.pricing.kitPerM2} €/m². Montaje opcional. Precios transparentes y estimador online.`,
  robots:{index:true,follow:true},
  openGraph:{type:'website',locale:'es_ES',title:`${siteConfig.brand.name} | Tu nueva casa empieza aquí`,description:'Viviendas de hormigón celular en kit con presupuesto orientativo online.',images:[{url:'/images/hero.webp',width:1672,height:941,alt:'Vivienda moderna conceptual en un entorno mediterráneo'}]},
  twitter:{card:'summary_large_image'},
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#F5F4EF'};
export default function RootLayout({children}:{children:ReactNode}){
 return <html lang="es"><body><QuoteProvider><Header/><main id="contenido">{children}</main><Footer/><CookieBanner/></QuoteProvider></body></html>;
}
