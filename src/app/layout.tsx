import type {Metadata,Viewport} from 'next';
import type {ReactNode} from 'react';
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
 title:{default:`${siteConfig.brand.name} | Kits de estructura en hormigón celular`,template:`%s | ${siteConfig.brand.name}`},
 description:`Kits de estructura de hormigón celular desde ${siteConfig.pricing.kitPerM2} €/m². Montaje opcional. Interiores por tu cuenta. Calcula transporte por código postal y solicita extras de terraza, garaje o piscina.`,
 robots:{index:true,follow:true},
 openGraph:{type:'website',locale:'es_ES',title:`${siteConfig.brand.name} | Solo la estructura. El resto es tuyo.`,description:'Kits estructurales de hormigón celular, configurador real y cálculo de transporte.',images:[{url:'/images/hero.webp',width:1672,height:1000,alt:'Render conceptual de preparación industrial de kits de hormigón celular'}]},
 twitter:{card:'summary_large_image'}
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#192126'};
export default function RootLayout({children}:{children:ReactNode}){
 return <html lang="es"><body><QuoteProvider><Header/><main id="contenido">{children}</main><Footer/><CookieBanner/></QuoteProvider></body></html>;
}
