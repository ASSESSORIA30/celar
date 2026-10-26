'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';
export function ConstructionScroll(){
  const ref=useRef<HTMLDivElement>(null);
  const {scrollYProgress}=useScroll({target:ref,offset:['start 75%','end 15%']});
  const skeleton=useTransform(scrollYProgress,[0.05,.25,.53,.75],[0,1,1,0]);
  const finished=useTransform(scrollYProgress,[.52,.85],[0,1]);
  const plan=useTransform(scrollYProgress,[.08,.4],[1,0]);
  return <div ref={ref} className="blueprint-stage" aria-label="Animación conceptual de plano, estructura y vivienda">
    <motion.div className="stage-layer" style={{opacity:plan}}><div className="absolute inset-0" style={{background:'linear-gradient(135deg,#e1e7e1,#d2ddd3)'}}/><Image src="/plans/patio.svg" alt="Esquema de planta conceptual" fill className="object-contain p-8" sizes="(max-width:768px) 100vw, 50vw"/></motion.div>
    <motion.div className="stage-layer" style={{opacity:skeleton}}><svg viewBox="0 0 700 400" className="w-full h-full" role="img" aria-label="Ilustración conceptual de la estructura"><defs><pattern id="bricks" width="33" height="18" patternUnits="userSpaceOnUse"><rect width="33" height="18" fill="#e5e0d3"/><path d="M0 17H33 M16 0V17" fill="none" stroke="#c6c1b4" strokeWidth="1.5"/></pattern></defs><rect width="700" height="400" fill="#e6e6df"/><path d="M120 230L425 130L600 210L300 310Z" fill="#f0ede5" stroke="#8c9689" strokeWidth="3"/><path d="M120 230V310L300 373V310Z" fill="url(#bricks)" stroke="#8c9689" strokeWidth="3"/><path d="M300 310L600 210V293L300 373Z" fill="url(#bricks)" stroke="#8c9689" strokeWidth="3"/><path d="M215 270L255 285V348L215 334Z" fill="#aebaae" stroke="#7d8b80" strokeWidth="3"/><path d="M420 267L540 229V307L420 346Z" fill="#aebaae" stroke="#7d8b80" strokeWidth="4"/><path d="M425 130V210M120 230L300 310" fill="none" stroke="#8c9689" strokeWidth="3"/></svg></motion.div>
    <motion.div className="stage-layer" style={{opacity:finished}}><Image src="/images/patio-aerea.webp" alt="Render conceptual de vivienda de una planta terminada" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw"/></motion.div>
    <div className="stage-label">Del plano al volumen · Animación conceptual</div>
  </div>;
}
