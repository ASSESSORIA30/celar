import { siteConfig } from '@/config/site';
import { euro, quotePrice, type QuoteMode } from './pricing';

/** PDF orientativo real generado en el navegador. No sustituye una oferta firme. */
export async function downloadQuotePdf({ area, mode, modelName }: {area:number;mode:QuoteMode;modelName:string}) {
  const { jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit:'mm', format:'a4', compress:true });
  const q = quotePrice(area, mode);
  const pageW=210; const left=21; const right=189;
  doc.setFillColor(38,49,41); doc.rect(0,0,pageW,56,'F');
  doc.setFont('helvetica','bold');doc.setTextColor(255,255,255);doc.setFontSize(28);doc.text(siteConfig.brand.name.toUpperCase(),left,30);
  doc.setFont('helvetica','normal');doc.setFontSize(10);doc.text('VIVIENDAS DE HORMIGON CELULAR EN KIT',left,42);
  doc.setTextColor(38,49,41);doc.setFont('helvetica','normal');doc.setFontSize(21);doc.text('Tu presupuesto orientativo',left,76);
  doc.setDrawColor(213,215,209);doc.line(left,84,right,84);
  doc.setFontSize(11);doc.text(`Modelo: ${modelName}`,left,96);doc.text(`Superficie presupuestada: ${area} m2`,left,104);
  doc.text(`Modalidad: ${mode==='montaje'?'Kit + montaje':'Solo kit'}`,left,112);
  doc.setFillColor(246,246,242);doc.roundedRect(left,125,168,58,2,2,'F');
  doc.setFontSize(11);doc.text('Kit de hormigon celular',left+8,138);doc.text(euro(q.kit),right-8,138,{align:'right'});
  doc.text('Planos (alcance pendiente de definir)',left+8,147);doc.text('Incluidos',right-8,147,{align:'right'});
  doc.text('Transporte (condiciones a confirmar)',left+8,156);doc.text('Incluido',right-8,156,{align:'right'});
  doc.text('Montaje opcional',left+8,165);doc.text(mode==='montaje'?euro(q.assembly):'No seleccionado',right-8,165,{align:'right'});
  doc.setFont('helvetica','bold');doc.setFontSize(18);doc.text('TOTAL ORIENTATIVO',left,197);doc.text(euro(q.total),right,197,{align:'right'});
  doc.setFont('helvetica','normal');doc.setFontSize(9);doc.setTextColor(103,112,104);
  doc.text('Impuestos no calculados. Presupuesto no vinculante.',left,207);
  doc.setTextColor(38,49,41);doc.setFontSize(12);doc.setFont('helvetica','bold');doc.text('Alcance y exclusiones',left,222);
  doc.setFontSize(9);doc.setFont('helvetica','normal');
  const lines=[
    'No es una vivienda terminada ni una oferta llave en mano.',
    'Excluye instalacion electrica, fontaneria, agua, baldosas,',
    'pavimentos y revestimientos no incluidos expresamente.',
    'Cimentacion, cubierta, carpinterias, impermeabilizacion,',
    'proyecto visado, licencias y alcance del montaje: por confirmar.',
    'El criterio de medicion de superficie esta pendiente de validacion.',
    'Las imagenes y distribuciones de catalogo son conceptuales.'
  ];
  lines.forEach((line,i)=>doc.text(line,left,232+i*5.3));
  doc.setDrawColor(213,215,209);doc.line(left,273,right,273);
  doc.setFontSize(8);doc.setTextColor(118,123,115);doc.text(`Emitido: ${new Date().toLocaleDateString('es-ES')}`,left,282);doc.text('Solo informativo. Requiere validacion tecnica y comercial.',right,282,{align:'right'});
  doc.save(`presupuesto-${siteConfig.brand.name.toLowerCase()}-${area}m2.pdf`);
}
