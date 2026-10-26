'use client';
export type AnalyticsName = 'model_view' | 'configurator_change' | 'lead_submission' | 'pdf_download' | 'whatsapp_click';
export function hasAnalyticsConsent() {
  if (typeof window === 'undefined') return false;
  try { return JSON.parse(localStorage.getItem('celar-cookie-preferences') || '{}').analytics === true; }
  catch { return false; }
}
export function track(name: AnalyticsName, data: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined' || !hasAnalyticsConsent()) return;
  // Solo datos no personales. Conectar aquí proveedor analítico tras el consentimiento.
  window.dispatchEvent(new CustomEvent('celar:analytics', { detail: { event: name, ...data } }));
}
