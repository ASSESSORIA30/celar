'use client';
export type AnalyticsName='model_view'|'configurator_change'|'lead_submission'|'pdf_download'|'whatsapp_click'|'shipping_calculated';
export function hasAnalyticsConsent(){
 if(typeof window==='undefined')return false;
 try{return JSON.parse(localStorage.getItem('nolimitsblocks-cookie-preferences')||'{}').analytics===true;}
 catch{return false;}
}
export function track(name:AnalyticsName,data:Record<string,string|number|boolean>={}){
 if(typeof window==='undefined'||!hasAnalyticsConsent())return;
 // Nunca envíes el CP ni datos personales a herramientas analíticas.
 window.dispatchEvent(new CustomEvent('nolimitsblocks:analytics',{detail:{event:name,...data}}));
}
