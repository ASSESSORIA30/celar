import fs from 'node:fs';import path from 'node:path';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
let ts;try{ts=require('typescript')}catch{ts=require('/opt/nvm/versions/node/v22.16.0/lib/node_modules/typescript/lib/typescript.js')}
const root=path.resolve(import.meta.dirname,'../src');let files=0;let failed=false;
function scan(dir){for(const name of fs.readdirSync(dir)){const item=path.join(dir,name);if(fs.statSync(item).isDirectory())scan(item);else if(/\.tsx?$/.test(name)){
 const content=fs.readFileSync(item,'utf8');
 const result=ts.transpileModule(content,{fileName:item,compilerOptions:{jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ESNext},reportDiagnostics:true});
 const errs=(result.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error);
 for(const err of errs){console.error(item,ts.flattenDiagnosticMessageText(err.messageText,'\n'));failed=true;}
 files++;
}}}
scan(root);console.log(`Sintaxis TypeScript: ${files} archivos, ${failed?'ERRORES':'OK'}`);process.exitCode=failed?1:0;
