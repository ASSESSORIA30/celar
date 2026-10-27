import { extras, siteConfig, type ExtraSelection } from '@/config/site';
export type QuoteMode = 'kit' | 'montaje';
export const euro = (value: number) => new Intl.NumberFormat('es-ES', {
  style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 2
}).format(value);
export function quotePrice(area: number, mode: QuoteMode) {
  if (!Number.isFinite(area) || area < siteConfig.pricing.rangeMin || area > siteConfig.pricing.rangeMax) {
    throw new Error(`Introduce entre ${siteConfig.pricing.rangeMin} y ${siteConfig.pricing.rangeMax} m².`);
  }
  const kit = Math.round(area * siteConfig.pricing.kitPerM2);
  const assembly = Math.round(area * siteConfig.pricing.assemblyPerM2);
  return { area, kit, assembly: mode === 'montaje' ? assembly : 0, assemblyOptional: assembly, total: kit + (mode === 'montaje' ? assembly : 0), mode };
}
export function extrasQuote(selected: ExtraSelection) {
  const lines = extras.filter((entry) => selected[entry.id]?.selected).map((entry) => {
    const quantity = entry.unit === 'unidad' ? 1 : Math.max(1, Number(selected[entry.id]?.quantity || entry.defaultQuantity));
    return { ...entry, quantity, amount: entry.pricePerUnit === null ? null : Math.round(quantity * entry.pricePerUnit * 100) / 100 };
  });
  const calculated = lines.reduce((total, line) => total + (line.amount ?? 0), 0);
  const pending = lines.some((line) => line.amount === null);
  return { lines, calculated, pending };
}
export const quoteShareText = (model: string, area: number, mode: QuoteMode, postalCode = '', shippingAmount: number | null = null, selectedExtras: string[] = []) => {
  const q = quotePrice(area, mode);
  const subtotal = q.total + (shippingAmount ?? 0);
  return `Hola, me gustaría solicitar información sobre la estructura ${model}, ${area} m². Modalidad: ${mode === 'montaje' ? 'kit + montaje' : 'solo kit'}. Código postal: ${postalCode || 'pendiente'}. ${shippingAmount !== null ? `Subtotal con transporte: ${euro(subtotal)}.` : `Subtotal sin transporte: ${euro(subtotal)}.`}${selectedExtras.length ? ` Extras solicitados: ${selectedExtras.join(', ')} (por valorar).` : ''} Importes orientativos e impuestos no calculados. ¿Podéis enviarme una propuesta?`;
};
