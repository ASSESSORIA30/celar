import { siteConfig } from '@/config/site';
export type QuoteMode = 'kit' | 'montaje';
export const euro = (value: number) => new Intl.NumberFormat('es-ES', {
  style: 'currency', currency: 'EUR', maximumFractionDigits: 0
}).format(value);
export function quotePrice(area: number, mode: QuoteMode) {
  if (!Number.isFinite(area) || area < siteConfig.pricing.rangeMin || area > siteConfig.pricing.rangeMax) {
    throw new Error(`Introduce entre ${siteConfig.pricing.rangeMin} y ${siteConfig.pricing.rangeMax} m².`);
  }
  const kit = Math.round(area * siteConfig.pricing.kitPerM2);
  const assembly = Math.round(area * siteConfig.pricing.assemblyPerM2);
  return { area, kit, assembly: mode === 'montaje' ? assembly : 0, assemblyOptional: assembly, total: kit + (mode === 'montaje' ? assembly : 0), mode };
}
export const quoteShareText = (model: string, area: number, mode: QuoteMode) => {
  const q = quotePrice(area, mode);
  return `Hola, me gustaría solicitar información sobre ${model}, ${area} m². Modalidad: ${mode === 'montaje' ? 'kit + montaje' : 'solo kit'}. Presupuesto orientativo: ${euro(q.total)} (impuestos no calculados). ¿Podéis enviarme una propuesta?`;
};
