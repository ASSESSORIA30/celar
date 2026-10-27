import { siteConfig, extras, type ExtraSelection } from '@/config/site';
import { euro, quotePrice, extrasQuote, type QuoteMode } from './pricing';

/** Documento orientativo generado en el navegador; no equivale a oferta contractual. */
export async function downloadQuotePdf({area,mode,modelName,postalCode,shipping,selectedExtras}:{
 area:number;mode:QuoteMode;modelName:string;postalCode:string;
 shipping:{postalCode:string;amount:number;distanceKm:number}|null;selectedExtras:ExtraSelection;
}) {
 const {jsPDF}=await import('jspdf');
 const doc=new jsPDF({unit:'mm',format:'a4',compress:true});
 const q=quotePrice(area,mode);
 const selected=extrasQuote(selectedExtras);
 const uncertain=!shipping||selected.pending;
 const knownTotal=q.total+(shipping?.amount??0)+selected.calculated;
 const left=19,right=191;
 doc.setFillColor(25,32,36);doc.rect(0,0,210,53,'F');
 doc.setFillColor(228,176,55);doc.rect(0,0,210,3,'F');
 doc.setFont('helvetica','bold');doc.setFontSize(26);doc.setTextColor(255,255,255);doc.text(siteConfig.brand.name.toUpperCase(),left,28);
 doc.setFont('helvetica','normal');doc.setFontSize(9);doc.text('KITS ESTRUCTURALES DE HORMIGON CELULAR',left,41);
 doc.setTextColor(29,35,35);doc.setFont('helvetica','bold');doc.setFontSize(19);doc.text('PRESUPUESTO ORIENTATIVO',left,67);
 doc.setFont('helvetica','normal');doc.setFontSize(10);
 doc.text(`Modelo: ${modelName}`,left,79);doc.text(`Superficie: ${area} m2`,left,86);
 doc.text(`Modalidad: ${mode==='montaje'?'Kit + montaje estructural':'Solo kit estructural'}`,left,93);
 doc.text(`Destino: ${postalCode||'CP no facilitado'}`,left,100);
 doc.setDrawColor(208,213,210);doc.line(left,109,right,109);
 const lines: Array<[string,string]>=[
  [`Kit estructural (${area} m2)`,euro(q.kit)],
  ['Planos del kit (alcance por confirmar)','Incluidos'],
  ['Montaje estructural',mode==='montaje'?euro(q.assembly):'No seleccionado'],
  [`Transporte (CP ${postalCode||'pendiente'})`,shipping?euro(shipping.amount):'Pendiente de calcular'],
  ...selected.lines.map(x=>[`${x.name} (${x.quantity} ${x.unit==='m2'?'m2':'ud.'})`,x.amount===null?'Por presupuestar':euro(x.amount)] as [string,string])
 ];
 let y=122;
 lines.forEach(([label,value],index)=>{if(index%2===0){doc.setFillColor(245,245,242);doc.rect(left,y-7,172,10,'F');}doc.setFontSize(10);doc.setTextColor(32,39,40);doc.text(label,left+4,y);doc.setFont('helvetica','bold');doc.text(value,right-4,y,{align:'right'});doc.setFont('helvetica','normal');y+=11;});
 y=Math.max(y+9,189);
 doc.setDrawColor(208,213,210);doc.line(left,y-8,right,y-8);
 doc.setFont('helvetica','bold');doc.setFontSize(11);doc.text(uncertain?'SUBTOTAL DE PARTIDAS CALCULADAS':'TOTAL ORIENTATIVO DEL KIT Y OPCIONES',left,y);
 doc.setFontSize(18);doc.text(euro(knownTotal),right,y,{align:'right'});
 doc.setFont('helvetica','normal');doc.setFontSize(8.3);doc.setTextColor(97,106,106);
 y+=10;
 const notices=[
  uncertain?'No es el coste final: quedan transportes o extras por presupuestar.':'Importes aproximados; sujetos a validacion tecnica y comercial.',
  'Impuestos no calculados. Transporte estimado por zonas postales,',
  'sujeto a acceso, descarga y comprobacion de la ruta real.',
  'ESTO ES SOLO UN KIT DE ESTRUCTURA. No se entrega vivienda acabada.',
  'No incluye interiores, instalaciones, cocina, banos, acabados,',
  'carpinterias o urbanizacion exterior. Cimentacion, forjados,',
  'cubierta, impermeabilizaciones, proyecto visado y licencias',
  'requieren definicion contractual y tecnica expresa.',
  'Los renders son generados e ilustrativos; no son obras reales.',
 ];
 notices.forEach(t=>{doc.text(t,left,y);y+=4.6;});
 doc.setDrawColor(200,204,201);doc.line(left,278,right,278);
 doc.setFontSize(8);doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`,left,286);
 doc.text('Documento informativo, no contractual',right,286,{align:'right'});
 doc.save(`presupuesto-nolimitsblocks-${area}m2.pdf`);
}
