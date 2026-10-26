# Desplegar CELAR en Vercel

Este paquete tiene `package.json`, `src/`, `public/`, `next.config.ts` y `vercel.json` en la **raíz**. Es el proyecto real Next.js, no la página `preview.html`.

## Opción 1 — Desde tu ordenador, sin GitHub (más directa)

1. Descomprime el ZIP.
2. Abre la aplicación Terminal (macOS) o PowerShell (Windows) y entra a la carpeta descomprimida.
3. Necesitas Node.js 22 y acceso a Internet. Introduce:

```bash
npm install
npm run typecheck
npm run build
npx vercel login
npx vercel
```

`npx vercel` puede hacerte preguntas; elige tu cuenta, crea un proyecto nuevo y asigna el nombre `celar-casas-kit` o similar. Al finalizar verás una URL de prueba.

4. Revisa la URL y ajusta la configuración antes de la publicación comercial.
5. Cuando todo esté validado, publica en producción:

```bash
npx vercel --prod
```

Documentación oficial: https://vercel.com/docs/projects/deploy-from-cli

## Opción 2 — Desde la web de Vercel, con GitHub (recomendado para futuras actualizaciones)

1. En https://github.com/new crea un repositorio, por ejemplo `celar-casas-kit` (puede ser **privado**). No crees archivos iniciales si vas a subir la carpeta local mediante Git.
2. Coloca **el contenido de este ZIP en la raíz** del repositorio (no solo `preview.html` ni un directorio adicional). Sube los archivos mediante Git o desde la interfaz de GitHub.
3. Abre https://vercel.com/new y elige **Import Git Repository**.
4. Selecciona el repositorio, nombre `celar-casas-kit`, Framework **Next.js**, Root Directory **./** y deja Build Command e Install Command automáticos.
5. Configura variables de entorno (más abajo) y haz clic en **Deploy**. Vercel construye el proyecto y asigna un dominio `*.vercel.app`.

Documentación oficial: https://vercel.com/docs/git

## Variables de entorno

| Variable | Obligatoria para qué | Valor |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica para SEO (opcional en Vercel, pero recomendable) | `https://tu-dominio.vercel.app` o dominio real |
| `RESEND_API_KEY` | Enviar formularios por correo | La clave privada de Resend (nunca `NEXT_PUBLIC_`) |
| `LEADS_TO_EMAIL` | Enviar formularios por correo | Email que recibe los leads |
| `FROM_EMAIL` | Enviar formularios por correo | Remitente de un dominio verificado en Resend |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` | Antispam opcional | Configurar ambas juntas |
| `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` | Limitar envíos de forma persistente | Opcional, recomendable en producción |

- Puedes publicar una **vista previa técnica** sin las variables de Resend, pero entonces el formulario **no envía** y muestra un error real. Para publicar comercialmente se necesitan el proveedor de correo, las páginas legales completas y el alcance comercial verificado.
- Para añadir variables: Vercel Dashboard → Project → Settings → Environment Variables → Add → Redeploy después de guardar.
- Antes de fijar `NEXT_PUBLIC_SITE_URL`, el sitio intenta utilizar la URL automática que proporciona Vercel para metadatos, sitemap y JSON-LD.
- Al desplegar el proyecto **no se publica automáticamente ningún dominio privado**; se obtiene un subdominio de `vercel.app`. Configurar dominio propio es un paso independiente.

## Verificar el resultado

1. Página principal muestra la casa conceptual y el precio **700 €/m²**.
2. Catálogo de modelos: `/viviendas`.
3. Simulación: `/calculadora` (120 m²: **84.000 €** kit o **126.000 €** con montaje, sin impuestos).
4. Descarga PDF y compartir por WhatsApp.
5. `/contacto`: enviar datos de prueba **solo después de configurar Resend**.
6. `/editor`: edición y exportación de JSON local (no modifica los datos de la web automáticamente).
7. Las páginas legales siguen siendo **borradores**, pendientes de completar.

## Estado actual

En el entorno de preparación no fue posible acceder a `registry.npmjs.org`, por lo que no se pudo ejecutar `npm install` ni `next build`. Sí se han ejecutado las pruebas de sintaxis, estructura y precio. No se ha publicado ni verificado una URL de producción.
