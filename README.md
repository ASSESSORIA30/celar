# NoLimits Blocks — Web de kits estructurales de hormigón celular

Proyecto **Next.js App Router / React / TypeScript / Tailwind CSS** preparado para desplegar en Vercel. Se ha adaptado desde la anterior web CELAR: identidad industrial NoLimits Blocks, catálogo de estructuras sin interiores, configurador con transporte por CP y solicitud de extras de terraza, garaje y piscina.

> **Importante:** NoLimits Blocks es un nombre comercial propuesto. El dominio `nolimitsblocks.com` no se ha registrado ni conectado por esta entrega. No se afirma que la empresa disponga de una fábrica física propia. Todas las fotos son renders generados e ilustrativos, y nunca se ofrecen como fotos de obras o instalaciones reales de la empresa.

## Qué comercializa

- **Solo kit estructural:** `700 €/m²` de superficie de referencia, planos del kit incluidos.
- **Kit + montaje estructural:** `1.050 €/m²` de referencia (montaje adicional `350 €/m²`).
- **Transporte:** concepto **adicional** estimado en base a distancia real por carretera desde el CP `25142` (Bellvís, Lleida) hasta el CP de destino. La tarifa interna reside exclusivamente en `src/server/transport.ts` y **no se muestra en el cliente**. Se calcula una expedición orientativa y los accesos, descargas, viajes adicionales y logística especial deben validarse.
- **Extras:** terraza estructural, garaje estructural, piscina (independiente del kit). Precios `null` = **sujetos a presupuesto**. No se suman importes ficticios. Se pueden fijar precios al confirmar condiciones.
- **No es una vivienda llave en mano:** no incluye instalaciones ni acabados interiores. El resto de elementos no incluidos expresamente, forjados/cubiertas, cimentación, carpinterías, proyecto visado, permisos y detalles técnicos requieren su propia definición contractual.

## Inicio y comprobaciones

Necesitas **Node.js 22** y npm con acceso al registro de paquetes.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abrir `http://localhost:3000`. Para validar:

```bash
npm run typecheck
npm run build
npm run smoke
npm run syntax
npm run test:pricing
npm run test:transport
```

> En este entorno se han podido ejecutar los tests de sintaxis, presupuesto, recursos y transporte simulado, así como probar la vista previa HTML en Chromium. La instalación de dependencias npm agotó el tiempo disponible; **NO** se pudo ejecutar `next build` real. Hacer `npm install`, `npm run typecheck` y `npm run build` en un equipo con conexión o dentro de Vercel antes de producción.

## Desplegar en Vercel

Una vez que el proyecto esté en un repositorio GitHub (o mediante la CLI):

1. [Crear proyecto en Vercel](https://vercel.com/new) → importar repositorio → framework Next.js, carpeta raíz del proyecto.
2. Configurar variables de entorno en **Settings → Environment Variables**.
3. Deploy, comprobar Build Logs, navegar a `/calculadora`, `/transporte`, `/viviendas` y `/contacto`.
4. Al confirmar propiedad de `nolimitsblocks.com`, añadirlo en **Domains**, configurar DNS y poner `NEXT_PUBLIC_SITE_URL=https://nolimitsblocks.com`.
5. Completar textos jurídicos y razón social/privacidad antes de abrir a visitantes comerciales.

También se puede desplegar por terminal con `npx vercel` y, tras validar, `npx vercel --prod`.

## Variables de entorno

| Variable | Uso | Estado |
| --- | --- | --- |
| `GOOGLE_MAPS_API_KEY` | Clave **solo servidor** para Geocoding API + Routes API; requiere habilitar ambas APIs y facturación Google Cloud | **Obligatoria para transporte automático fuera de CP 25142** |
| `RESEND_API_KEY` | Proveedor de envío de formularios | Obligatoria para captación real |
| `LEADS_TO_EMAIL` | Dirección receptora de leads | Obligatoria para captación real |
| `FROM_EMAIL` | Remitente verificado en Resend | Obligatoria para captación real |
| `NEXT_PUBLIC_SITE_URL` | URL real para SEO, metadatos, sitemap | Opcional en Vercel (autodetecta URL) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Protección adicional anti-bot | Recomendadas |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Límite distribuido de formularios | Recomendado |

Si `GOOGLE_MAPS_API_KEY` no existe o los servicios de Google fallan, el calculador **no inventa distancias**: presenta «Transporte pendiente» e indica la integración faltante. Los formularios pueden seguir recibiendo solicitudes con CP para valorar manualmente el envío, siempre que Resend esté configurado.

El proveedor requiere activar **Geocoding API** y **Routes API** y una cuenta de facturación. El proyecto envía el CP a Google desde el servidor; añadir este destinatario del dato y el fundamento aplicable a la política de privacidad antes de publicación. Limitar la clave por API y configurar alertas de cuota y presupuesto.

## Estructura editable

- `src/config/catalog.json` — marca, dominio, precios de estructura y montaje, modelo, extras y definiciones.
- `src/config/site.ts` — textos de alcance y preguntas frecuentes; **sin tarifa interna de envío**.
- `src/server/transport.ts` — cálculo real por carretera, origen y tarifa interna; servidor.
- `src/app/api/transporte/route.ts` — endpoint POST de CP y cálculo real con estado controlado.
- `src/components/quote-context.tsx` — mantiene opciones y CP del visitante durante la navegación.
- `src/components/quote-builder.tsx`, `extras-selector.tsx`, `shipping-field.tsx` — cotizador, extras y transporte.
- `src/components/lead-form.tsx` y `src/app/api/lead/route.ts` — formulario con validación y correo confirmado por proveedor.
- `src/lib/pdf.ts` — ficha PDF cliente con subtotal conocido, envío y extras pendientes.
- `src/app/transporte/page.tsx` — calculador independiente de envío.
- `public/images/` — renders generados de estructuras sin acabados y fábrica conceptual.
- `public/plans/` — esquemas estructurales conceptuales, NO planos de ejecución.

El editor local en `/editor` permite cambiar marca, precios del kit, precios de extras (cuando se confirmen) y modelos, y descargar el JSON. **No guarda cambios en producción**: hay que sustituir `src/config/catalog.json` y volver a desplegar.

## Notas de alcance y seguridad

- El CP es obligatorio para el formulario comercial. La ruta toma como origen el CP `25142`, no una dirección exacta; la estimación no reemplaza logística final.
- No se muestran testimonios, plazos garantizados, certificaciones inexistentes, viviendas terminadas ni garantías constructivas no aportadas.
- Las ilustraciones de bloques y cubiertas no prueban que las mismas piezas estén dentro del kit. Es obligatorio validar componentes, encuentros, huecos, cubierta, accesos y maquinaria en una ficha técnica.
- Las claves nunca van al navegador; no añadir `NEXT_PUBLIC_` a la clave Google ni Resend. Revisar cuotas, antiabuso y avisos legales antes de usar con tráfico real.
- `preview.html` es una vista previa autónoma: su configurador local muestra solo kit y montaje, **no rutas reales ni envío de formularios**. Para ello hay que desplegar la app Next.js.
- El proyecto conserva soporte de textos iniciales español/catalán en `src/i18n/messages.ts`; las páginas de este lanzamiento están en castellano.
