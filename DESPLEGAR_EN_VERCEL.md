# Publicar NoLimits Blocks en Vercel

## 1. Sube el proyecto

Esta carpeta tiene la raíz correcta (`package.json`, `src`, `public`). Puedes crear un repositorio privado en GitHub e importarlo desde [Vercel / New Project](https://vercel.com/new), o utilizar `npx vercel` en el Terminal dentro de esta carpeta. Elige framework **Next.js** y Root Directory **./**.

## 2. Configura las variables

En Settings → Environment Variables, añade:

- `GOOGLE_MAPS_API_KEY`: clave de servidor con **Geocoding API** y **Routes API** habilitadas. Requiere facturación de Google Maps Platform. Sin ella, el transporte fuera del CP de origen queda pendiente.
- `RESEND_API_KEY`, `LEADS_TO_EMAIL`, `FROM_EMAIL`: indispensables para enviar solicitudes reales al correo.
- Opcionales/recomendadas: Turnstile (dos variables) y Upstash Redis (dos variables) para control antispam y límites.
- `NEXT_PUBLIC_SITE_URL`: al conectar y verificar tu dominio real, define su URL HTTPS. Si no se define, Vercel detecta la URL del proyecto.

No exponer ninguna clave en el frontend. Añadir alertas de consumo en Google Maps.

## 3. Construye y verifica

Desde un equipo con npm:

```bash
npm install
npm run typecheck
npm run build
npm run test:transport
```

El build completo no se pudo ejecutar en el entorno de preparación debido a falta de acceso funcional al registro npm. Vercel hará la compilación desde las dependencias npm y señalará cualquier error pendiente.

## 4. Revisión comercial antes de abrir

Confirmar razón social, datos legales, privacidad, contenidos técnicos exactos, condiciones de transporte, alcance de extras, permiso de uso de renders y disponibilidad del dominio. Los renders son ilustraciones de estructuras sin acabado, no obras reales ni fotografías de fábrica propia.

## 5. Dominio

El nombre comercial propuesto es **NoLimits Blocks**. `nolimitsblocks.com` se plantea como posible dominio, pero su titularidad no se comprueba ni se adquiere automáticamente. Una vez bajo tu control, añade el dominio en Vercel → Settings → Domains y sigue las indicaciones DNS.
