import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
let ts;try{ts=require('typescript')}catch{ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js')}
const root=path.resolve(import.meta.dirname,'..');
const catalog=JSON.parse(fs.readFileSync(path.join(root,'src/config/catalog.json'),'utf8'));
const script=ts.transpileModule(fs.readFileSync(path.join(root,'src/lib/pricing.ts'),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
const module={exports:{}};
vm.runInNewContext(script,{module,exports:module.exports,require:(target)=>{
  assert.equal(target,'@/config/site');return {siteConfig:catalog};
},Intl,Error,Number,Math,console});
const {quotePrice,quoteShareText}=module.exports;
assert.equal(quotePrice(120,'kit').total,84000);
assert.equal(quotePrice(120,'montaje').total,126000);
assert.equal(quotePrice(120,'montaje').assembly,42000);
assert.equal(quotePrice(90,'montaje').total,94500);
assert.equal(quotePrice(150,'kit').total,105000);
assert.equal(quotePrice(180,'montaje').total,189000);
assert.throws(()=>quotePrice(-3,'kit'));
assert.throws(()=>quotePrice(500,'kit'));
assert(quoteShareText('Patio',120,'montaje').includes('126.000'));
console.log('OK: probada función de cálculo REAL importada desde src/lib/pricing.ts');
