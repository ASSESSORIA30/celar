import { z } from 'zod';
import { siteConfig } from '@/config/site';
export const leadSchema=z.object({
  name:z.string().trim().min(2,'Indica tu nombre').max(110),
  phone:z.string().trim().min(7,'Introduce un teléfono válido').max(30).regex(/^[\d+()\s.-]+$/,'Introduce un teléfono válido'),
  email:z.string().trim().email('Introduce un email válido').max(170),
  province:z.string().trim().min(2,'Selecciona provincia').max(90),
  area:z.number().min(siteConfig.pricing.rangeMin).max(siteConfig.pricing.rangeMax),
  modelSlug:z.string().max(80),
  mode:z.enum(['kit','montaje']),
  hasLand:z.enum(['si','no','buscando']),
  message:z.string().trim().max(1500),
  consent:z.literal(true),
  startedAt:z.number().int().positive(),
  website:z.string().max(160).optional().default(''),
  turnstileToken:z.string().max(2048).optional().default('')
});
export type LeadRequest=z.infer<typeof leadSchema>;
