import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';
const root=resolve(import.meta.dirname,'..');
const catalog=JSON.parse(readFileSync(resolve(root,'src/config/catalog.json'),'utf8'));
const price=(area,mount)=>({kit:area*catalog.pricing.kitPerM2,mount:mount?area*catalog.pricing.assemblyPerM2:0,total:area*(catalog.pricing.kitPerM2+(mount?catalog.pricing.assemblyPerM2:0))});
assert.deepEqual(price(120,true),{kit:84000,mount:42000,total:126000});
assert.deepEqual(price(120,false),{kit:84000,mount:0,total:84000});
for(const m of catalog.models){
 for(const view of ['fachada','posterior','aerea','detalle'])assert(existsSync(resolve(root,`public/images/${m.visualKey}-${view}.webp`)),`Imagen ausente: ${m.slug} ${view}`);
 assert(existsSync(resolve(root,`public/plans/${m.visualKey}.svg`)),`Falta plano ${m.slug}`);
 assert(m.area>0&&m.slug&&m.description,`Modelo incompleto: ${m.slug}`);
 assert(existsSync(resolve(root,`src/app/viviendas/[slug]/page.tsx`)),'Faltan páginas');
}
assert(existsSync(resolve(root,'public/images/hero.webp')));
assert(existsSync(resolve(root,'src/app/api/lead/route.ts')));
console.log('OK: cálculo 120 m², modelos, imágenes, planos, endpoints y estructura del proyecto.');
