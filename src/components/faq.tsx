'use client';
import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { faqs } from '@/config/site';
export function FAQ({limit}:{limit?:number}) {
 const [active,setActive]=useState<number|null>(0);
 return <div>{faqs.slice(0,limit).map((f,i)=><div key={f.question} className="faq-item"><h3><button onClick={()=>setActive(active===i?null:i)} aria-expanded={active===i}>{f.question}{active===i?<Minus size={18}/>:<Plus size={18}/>}</button></h3>{active===i&&<p className="pb-6 pr-10 text-sm text-muted leading-7">{f.answer}</p>}</div>)}</div>
}
