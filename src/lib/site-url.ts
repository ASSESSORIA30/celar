/** URL publica para metadatos, sitemap y JSON-LD en Vercel. */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
  if (configured && /^https?:\/\//.test(configured)) return configured;
  const deployed = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (deployed) return `https://${deployed.replace(/\/$/, '')}`;
  return 'http://localhost:3000';
}
