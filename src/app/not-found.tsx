import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
export default function NotFound(){return <div className="container-wide py-32"><p className="eyebrow text-sage">404 / No encontrado</p><h1 className="section-title mt-5">Esta página no está aquí.</h1><Link href="/" className="button-solid mt-10"><ArrowLeft size={16}/> Volver al inicio</Link></div>}
