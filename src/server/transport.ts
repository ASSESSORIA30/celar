/** Tarifas y claves únicamente en el servidor, nunca en archivos NEXT_PUBLIC. */
export const TRANSPORT_ORIGIN_POSTCODE = '25142';
const TRANSPORT_EUR_PER_KM = 2;
export type ShippingPrice = { postalCode: string; originPostalCode: string; distanceKm: number; amount: number; destination: string };
export class ShippingError extends Error {
  constructor(public code: 'invalid_postal' | 'not_configured' | 'not_found' | 'no_route' | 'provider_error', message: string) { super(message); }
}
export const validPostalCode = (postalCode: string) => /^\d{5}$/.test(postalCode);
export function amountForDistanceMeters(meters: number) {
  if (!Number.isFinite(meters) || meters < 0 || meters > 6_000_000) throw new ShippingError('no_route', 'No hay una ruta válida disponible.');
  return Math.round((meters / 1000) * TRANSPORT_EUR_PER_KM * 100) / 100;
}

type GeoResult = {
  status?: string; results?: Array<{address_components?:Array<{long_name:string;short_name:string;types:string[]}>;geometry?:{location?:{lat:number;lng:number}};formatted_address?:string;partial_match?:boolean}>;
};
async function coordinates(postalCode: string, apiKey: string) {
  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json');
  url.searchParams.set('components', `postal_code:${postalCode}|country:ES`);
  url.searchParams.set('key', apiKey);
  url.searchParams.set('language', 'es');
  const resp = await fetch(url, { cache:'no-store', signal:AbortSignal.timeout(10000) });
  if (!resp.ok) throw new ShippingError('provider_error', 'No se pudo consultar el servicio de localidades.');
  const payload = await resp.json() as GeoResult;
  if (payload.status !== 'OK' || !payload.results?.length) throw new ShippingError('not_found', 'No se ha encontrado ese código postal español.');
  const result = payload.results.find((entry) => !entry.partial_match && entry.address_components?.some(c => c.types.includes('postal_code') && c.long_name === postalCode));
  if (!result?.geometry?.location) throw new ShippingError('not_found', 'El código postal no se ha podido verificar.');
  return { ...result.geometry.location, address: result.formatted_address ?? `CP ${postalCode}, España` };
}

export async function calculateShipping(postalCode: string): Promise<ShippingPrice> {
  if (!validPostalCode(postalCode)) throw new ShippingError('invalid_postal', 'Introduce un código postal español de 5 cifras.');
  if (postalCode === TRANSPORT_ORIGIN_POSTCODE) return {postalCode, originPostalCode: TRANSPORT_ORIGIN_POSTCODE, distanceKm:0, amount:0, destination:'Bellvís, Lleida'};
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) throw new ShippingError('not_configured', 'El cálculo automático de transporte todavía no está activado. Puedes solicitar una propuesta con tu CP.');
  try {
    const [origin,destination] = await Promise.all([coordinates(TRANSPORT_ORIGIN_POSTCODE,apiKey),coordinates(postalCode,apiKey)]);
    const request = await fetch('https://routes.googleapis.com/directions/v2:computeRoutes', {
      method:'POST', cache:'no-store', signal:AbortSignal.timeout(12000),
      headers: {'Content-Type':'application/json','X-Goog-Api-Key':apiKey,'X-Goog-FieldMask':'routes.distanceMeters'},
      body: JSON.stringify({
        origin:{location:{latLng:{latitude:origin.lat,longitude:origin.lng}}},
        destination:{location:{latLng:{latitude:destination.lat,longitude:destination.lng}}},
        travelMode:'DRIVE', routingPreference:'TRAFFIC_UNAWARE', units:'METRIC', languageCode:'es-ES'
      })
    });
    if (!request.ok) { console.error('Routes API HTTP',request.status); throw new ShippingError('provider_error','El cálculo de rutas no está disponible en este momento.'); }
    const route = await request.json() as {routes?:Array<{distanceMeters?:number}>};
    const meters = route.routes?.[0]?.distanceMeters;
    if (typeof meters !== 'number') throw new ShippingError('no_route', 'No se ha encontrado una ruta por carretera. Solicita valoración del transporte.');
    return {postalCode,originPostalCode: TRANSPORT_ORIGIN_POSTCODE,distanceKm:Math.round(meters/100)/10,amount:amountForDistanceMeters(meters),destination:destination.address};
  } catch(error) {
    if (error instanceof ShippingError) throw error;
    console.error('Shipping route lookup failed',error instanceof Error ? error.name : 'unknown');
    throw new ShippingError('provider_error','No se pudo calcular el envío. Vuelve a intentarlo o solicita valoración.');
  }
}
