'use client';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { models, siteConfig } from '@/config/site';
import { quotePrice, type QuoteMode } from '@/lib/pricing';

type QuoteContextShape = {
  area: number; mode: QuoteMode; modelSlug: string;
  setArea: (a: number) => void; setMode: (m: QuoteMode) => void;
  selectModel: (slug: string) => void;
  quote: ReturnType<typeof quotePrice>;
};
const QuoteContext = createContext<QuoteContextShape | null>(null);
const initial = { area: 120, mode: 'kit' as QuoteMode, modelSlug: 'patio-120' };
export function QuoteProvider({ children }: { children: ReactNode }) {
  const [area, rawSetArea] = useState(initial.area);
  const [mode, setMode] = useState<QuoteMode>(initial.mode);
  const [modelSlug, setModelSlug] = useState(initial.modelSlug);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem('celar-quote') || 'null');
      if (stored && Number.isFinite(stored.area)) rawSetArea(Math.max(siteConfig.pricing.rangeMin, Math.min(siteConfig.pricing.rangeMax, Number(stored.area))));
      if (stored && (stored.mode === 'kit' || stored.mode === 'montaje')) setMode(stored.mode);
      if (stored && typeof stored.modelSlug === 'string') setModelSlug(stored.modelSlug);
    } catch { /* invalid session data is ignored */ }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    sessionStorage.setItem('celar-quote', JSON.stringify({ area, mode, modelSlug }));
  }, [area, mode, modelSlug, ready]);
  const selectModel = (slug: string) => {
    const model = models.find((m) => m.slug === slug);
    if (!model) { setModelSlug('personalizado'); return; }
    rawSetArea(model.area); setModelSlug(model.slug);
  };
  const setArea = (a: number) => {
    if (!Number.isFinite(a)) return;
    const v = Math.min(siteConfig.pricing.rangeMax, Math.max(siteConfig.pricing.rangeMin, Math.round(a)));
    rawSetArea(v);
    const matched = models.find((m) => m.area === v && m.slug === modelSlug);
    if (!matched) setModelSlug('personalizado');
  };
  const quote = useMemo(() => quotePrice(area, mode), [area, mode]);
  return <QuoteContext.Provider value={{ area, mode, modelSlug, quote, setArea, setMode, selectModel }}>{children}</QuoteContext.Provider>;
}
export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) throw new Error('useQuote fuera de QuoteProvider');
  return context;
}
