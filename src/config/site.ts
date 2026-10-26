import raw from './catalog.json';

export type HouseModel = {
  slug: string;
  name: string;
  area: number;
  subtitle: string;
  description: string;
  levels: string;
  visualKey: string;
};

export const siteConfig = raw;
export const models = raw.models as HouseModel[];
export const PRICE_KIT = raw.pricing.kitPerM2;
export const PRICE_ASSEMBLY = raw.pricing.assemblyPerM2;
export const MODEL_VIEWS = [
  { key: 'fachada', title: 'Fachada principal' },
  { key: 'posterior', title: 'Perspectiva posterior' },
  { key: 'aerea', title: 'Perspectiva elevada' },
  { key: 'detalle', title: 'Detalle arquitectónico' },
] as const;
export const getModel = (slug: string) => models.find((m) => m.slug === slug);
export const modelImage = (model: HouseModel, view: (typeof MODEL_VIEWS)[number]['key'] = 'fachada') =>
  `/images/${model.visualKey}-${view}.webp`;
export const modelPlan = (model: HouseModel) => `/plans/${model.visualKey}.svg`;
export const includedItems = [
  'Kit de construcción en hormigón celular, con componentes a definir en la ficha técnica',
  'Planos incluidos; su alcance documental exacto está pendiente de confirmar',
  'Transporte del kit incluido, sujeto a condiciones logísticas de la oferta',
];
export const excludedItems = [
  'Instalación eléctrica',
  'Fontanería e instalaciones de agua',
  'Baldosas, pavimentos y revestimientos',
  'Trabajos y acabados no incluidos expresamente en la ficha técnica del kit',
];
export const pendingItems = [
  'Cimentación y trabajos de movimiento de tierras',
  'Cubierta, impermeabilizaciones y aislamiento complementario',
  'Carpinterías, acristalamientos y otros cerramientos',
  'Proyecto técnico visado, licencias, tasas y autorizaciones',
  'Alcance concreto del montaje y medios auxiliares',
];
export const faqs = [
  {
    question: '¿El precio corresponde a una casa totalmente terminada?',
    answer: 'No. Se comercializa un kit de construcción en hormigón celular. Las instalaciones, acabados y partidas no incluidas expresamente se presupuestan o contratan por separado.'
  },
  {
    question: '¿Qué diferencia hay entre solo kit y kit con montaje?',
    answer: `El kit parte de ${siteConfig.pricing.kitPerM2} €/m² y el montaje añade ${siteConfig.pricing.assemblyPerM2} €/m². El alcance técnico del montaje y las condiciones de ejecución se concretan en una propuesta personalizada.`
  },
  {
    question: '¿Están incluidos los planos y el transporte?',
    answer: 'Sí, ambos figuran incluidos en la oferta base. El contenido de la documentación y las condiciones logísticas se definirán en la ficha técnica y la oferta definitiva.'
  },
  {
    question: '¿Incluye proyecto de arquitecto, visado y licencia?',
    answer: 'No se puede dar por incluido sin confirmación. El proyecto técnico, visado y licencias se consideran partidas pendientes de definir para cada promoción.'
  },
  {
    question: '¿La superficie de catálogo es útil o construida?',
    answer: 'Las superficies mostradas son referencias orientativas para el presupuesto. El criterio exacto de medición está pendiente de validación comercial y se detallará antes de contratar.'
  },
  {
    question: '¿Puedo elegir una superficie distinta?',
    answer: 'Sí. El configurador permite introducir una superficie personalizada para obtener una estimación inicial, que siempre se validará antes de emitir una oferta firme.'
  },
  {
    question: '¿Qué impuestos se aplican?',
    answer: 'Los importes del configurador no calculan impuestos. Su tratamiento se determinará y mostrará por separado en la oferta concreta.'
  },
];
