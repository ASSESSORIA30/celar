import type { Metadata } from 'next';
import { EditorPanel } from '@/components/editor-panel';
export const metadata:Metadata={title:'Editor local del catálogo',robots:{index:false,follow:false}};
export default function EditorPage(){return <section className="container-wide py-16"><p className="eyebrow text-sage mb-5">Gestor de contenidos / Uso interno</p><h1 className="section-title max-w-4xl">Todo el catálogo, <em className="text-sage not-italic">en un lugar.</em></h1><p className="copy-large max-w-3xl mt-6 mb-12">Editor local para modificar marca, precios y modelos; exporta el JSON listo para reemplazar el archivo de configuración. Por seguridad, no publica cambios ni modifica el servidor.</p><EditorPanel/></section>}
