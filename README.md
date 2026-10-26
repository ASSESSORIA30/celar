# CELAR — Viviendas en kit de hormigón celular

**Proyecto web Next.js, React, TypeScript y Tailwind CSS (App Router)**. Identidad provisional y renders conceptuales originales. El objetivo es captar solicitudes de kits de construcción con presupuesto orientativo verificable y sin presentar el producto como una vivienda terminada.

## Qué contiene

- Página de inicio editorial con arquitectura mediterránea y CTA.
- Catálogo de **cuatro modelos conceptuales** (90, 120, 150 y 180 m²) y una página por modelo.
- **16 perspectivas arquitectónicas generadas** (4 por modelo), con galería ampliable, y **4 esquemas de planta conceptuales** debidamente identificados.
- Configurador común entre secciones: precio kit, montaje opcional, transporte y planos, exclusiones e impuestos no calculados.
- **Descarga de presupuesto PDF real** desde navegador usando jsPDF.
- Compartir presupuesto por WhatsApp. Si se configura el número de la empresa, se dirige directamente al chat empresarial.
- Formulario con resumen de presupuesto, validación en servidor, consentimiento, honeypot y limitación básica de solicitudes. Envío real mediante Resend, **solo cuando hay credenciales válidas y el proveedor confirma la operación**.
- Integración opcional con Cloudflare Turnstile y rate limiting persistente mediante Upstash.
- Secciones de alcance del kit, construcción, proceso, material, FAQ, contacto y legales.
- Metadatos, Open Graph, sitemap y robots generados.
- Editor local en `/editor`: cambia precios, marca y catálogo y exporta `catalog.json`. **No escribe al servidor**.
- Preparación inicial de diccionarios español/catalán en `src/i18n/messages.ts`. Las páginas comerciales están actualmente en español; la publicación completa en catalán requiere traducirlas y activar rutas de idioma.

## Puesta en marcha

Necesitas **Node 22 o superior**, npm y acceso al registro de paquetes.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`. No hace falta configurar el correo para ver el sitio o calcular precios; **sí es obligatorio configurarlo para recibir solicitudes**.

Para probar antes de publicar:

```bash
npm run typecheck
npm run lint
npm run smoke
npm run build
```

Después puedes importar el repositorio en **Vercel**; Framework Preset: Next.js; Build Command: `npm run build`; Node: 22; Output: configuración estándar de Next.js.

### Estado de la verificación

En el entorno en que se preparó el proyecto, la conexión a `registry.npmjs.org` no estaba disponible. Por tanto **no se descargaron dependencias ni se pudo ejecutar una compilación real de Next.js**. Sí se ejecutaron el comprobador de sintaxis TypeScript y pruebas de coherencia de recursos y cálculos. **Ejecuta obligatoriamente `npm install`, `npm run typecheck` y `npm run build` en tu equipo/CI antes de publicar.** No se declara falsamente que el build esté validado.

## Editor y configuración centralizada

Toda la configuración editable está en:

`src/config/catalog.json`

Este archivo contiene la marca, datos de contacto, precios por m², texto de impuestos, criterio de superficie y modelos. El componente `src/config/site.ts` exporta esos datos.

También puedes acceder a `http://localhost:3000/editor`, cambiar los campos y descargar un `catalog.json` actualizado, que debes colocar en `src/config/` y volver a desplegar. El editor es **deliberadamente local**: no hay CMS, base de datos, credenciales, autenticación administrativa ni falsa confirmación de publicación. Si se desea edición remota, será necesario integrar un CMS autenticado y despliegues controlados.

Los renders de cada modelo se guardan en:

- `public/images/{visualKey}-fachada.webp`
- `public/images/{visualKey}-posterior.webp`
- `public/images/{visualKey}-aerea.webp`
- `public/images/{visualKey}-detalle.webp`

Los esquemas de planta están en `public/plans/{visualKey}.svg`. Para reemplazar un modelo, cambie sus datos e imágenes. Son **materiales conceptuales**, no planos ejecutivos ni garantías de lo que se entrega.

## Reglas de precio

En `src/lib/pricing.ts` se calcula siempre:

- `kit = superficie * pricing.kitPerM2`
- `montaje = superficie * pricing.assemblyPerM2` solo si se selecciona montaje
- `total = kit + montaje`

**Ejemplo de 120 m²:** kit **84.000 €**; montaje opcional **42.000 €**; total kit con montaje **126.000 €**. No se calcula IVA ni se presupone un tipo.

La superficie es de referencia hasta fijar por escrito el criterio de medición. El rango del configurador se encuentra en JSON y se valida en el servidor.

## Formulario: configuración para envíos reales

En `.env.local` o las Environment Variables de Vercel:

```dotenv
RESEND_API_KEY=re_...
LEADS_TO_EMAIL=presupuestos@tuempresa.com
FROM_EMAIL=Web <contacto@tudominioverificado.com>
NEXT_PUBLIC_SITE_URL=https://tudominio.com
```

Registra y verifica en Resend el dominio utilizado por `FROM_EMAIL`. Por motivos de seguridad, nunca coloques `RESEND_API_KEY` en variables `NEXT_PUBLIC_*`.

Opcionales:

```dotenv
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

Configura Turnstile con ambas variables conjuntamente. Para tráfico de producción, se recomienda el limitador persistente Upstash; la limitación en memoria incluida es solo una protección de base y no se comparte entre instancias serverless.

**Comportamiento intencional:** si Resend está sin configurar, el endpoint devuelve HTTP 503 y el usuario ve un error real. Si el proveedor no confirma aceptación con ID, también se muestra error. No se guardan leads en una base de datos ni se afirma que el formulario se haya enviado cuando no es cierto.

El formulario incluye consentimiento, provincia, terreno, modalidad, superficie y otros datos. La integración de un CRM queda pendiente de definir; se puede implementar con un webhook seguro **desde el servidor y con su propia autenticación**, después de validar condiciones de privacidad.

## WhatsApp y analítica

Configura `brand.whatsappNumber` con el número internacional de la empresa, sin símbolos (por ejemplo `34XXXXXXXXX`). Mientras esté vacío, el botón solo permite **compartir** el texto con WhatsApp; no envía un mensaje a la empresa.

El módulo `src/lib/analytics.ts` prepara eventos sin PII: visita a modelo, cambios de configurador, PDF y solicitudes confirmadas. Los eventos solo se generan con consentimiento analítico en navegador y **no se envían a ningún proveedor mientras no se integre uno**. Para una medición persistente debe añadirse el proveedor y documentarlo en cookies/privacidad.

El banner permite rechazar, aceptar o personalizar las preferencias. Se pueden reabrir desde el footer. No se cargan scripts de rastreo opcionales por defecto.

## SEO

Configura `NEXT_PUBLIC_SITE_URL` con el dominio real antes del despliegue. El sitemap usa esta variable; sin ella genera rutas de entorno local. Los metadatos describen el producto sin utilizar casos de éxito, prestaciones técnicas no verificadas o marcas ajenas.

`src/i18n/messages.ts` incluye un diccionario ES/CA inicial, pero todavía **no hay URLs `ca/` ni hreflang operativo**; para el sitio bilingüe final se deben traducir los textos de todas las rutas antes de activarlas.

## Legal y comercial: imprescindible completar antes de publicar

1. Identidad jurídica del vendedor, NIF, domicilio, contacto y políticas definitivas de privacidad/cookies, revisadas por asesor legal. Las páginas están marcadas **borrador**.
2. Descripción técnica definitiva de los componentes del kit, compatibilidades y marcas/fichas técnicas verificadas.
3. Qué planos se entregan y si el proyecto visado u otros documentos están excluidos/incluidos.
4. Condiciones y radio del transporte, descarga y logística.
5. Criterio de medición m², alcance contractual del montaje y partidas de obra no incluidas.
6. Alcance de cubierta, cimentación, carpinterías, impermeabilización, aislamientos y demás trabajos que permanecen **pendientes de confirmación**.
7. Fiscalidad aplicable, política comercial y condiciones de contratación.
8. Revisión arquitectónica y normativa para modelos reales: los cuatro modelos actuales son **ejemplos** y las imágenes representan escenas completas (incluyendo piscina y acabados) **que no se incluyen en el kit**.
9. Verificación de dominio, funcionamiento del correo, privacidad y controles anti-spam en producción.
10. Publicar un idioma catalán completo solo tras su traducción integral.

### Recursos visuales

Los renders del sitio fueron generados específicamente para este proyecto y se identifican como imágenes conceptuales. Los planos SVG son esquemas ilustrativos creados para el catálogo, **no proyectos constructivos válidos**. No se utilizan fotografías atribuidas a obras propias inexistentes ni testimonios inventados.

## Vista previa sin servidor

Se incluye `preview.html`, una **vista previa autónoma** que puede abrirse para examinar diseño y probar el cálculo aun sin instalar Next.js. Sus funciones son deliberadamente limitadas: la generación PDF utiliza el diálogo de impresión del navegador y no envía correos. La implementación que se desplegaría en Vercel es el proyecto Next.js en `src/`.

---

Marca **CELAR**: nombre de trabajo editable, pendiente de verificación comercial y de disponibilidad registral.
