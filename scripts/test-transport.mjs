import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
let ts;try{ts=require('typescript');}catch{ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js');}
const source=fs.readFileSync(new URL('../src/server/transport.ts',import.meta.url),'utf8');
const transpiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const holder={exports:{}};
let requests=[];
const fakeFetch=async(url,options={})=>{
 requests.push(String(url));
 if(String(url).includes('geocode')){
  const code=new URL(String(url)).searchParams.get('components').split('|')[0].split(':')[1];
  return {ok:true,json:async()=>({status:'OK',results:[{address_components:[{long_name:code,short_name:code,types:['postal_code']}],geometry:{location:{lat:41.1,lng:2.1}},formatted_address:'CP '+code+', España'}]})};
 }
 return {ok:true,json:async()=>({routes:[{distanceMeters:120500}]})};
};
vm.runInNewContext(transpiled,{module:holder,exports:holder.exports,require,fetch:fakeFetch,AbortSignal,URL,process:{env:{GOOGLE_MAPS_API_KEY:'TEST_ONLY'}},Math,Number,Error,Promise,console});
const {validPostalCode,amountForDistanceMeters,calculateShipping}=holder.exports;
assert(validPostalCode('28001'));assert(!validPostalCode('ABC24'));assert(!validPostalCode('123456'));
assert.equal(amountForDistanceMeters(120500),241);
assert.equal((await calculateShipping('25142')).amount,0);
assert.equal(requests.length,0,'Mismo CP no llama a Google');
const value=await calculateShipping('08001');
assert.equal(value.amount,241);assert.equal(value.distanceKm,120.5);assert.equal(value.postalCode,'08001');
assert.equal(requests.length,3,'Dos geocodificaciones y una ruta');
await assert.rejects(()=>calculateShipping('ABCDE'));
console.log('OK: transporte: CP validado, distancia por carretera, precio servidor, mismo CP y errores.');
