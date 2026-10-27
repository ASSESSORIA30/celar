import raw from './catalog.json';

export type HouseModel = {
  slug: string; name: string; area: number; subtitle: string; description: string; levels: string; visualKey: string;
};
export type ExtraId = 'terraza' | 'garaje' | 'piscina';
export type ExtraDefinition = { id: ExtraId; name: string; description: string; unit: 'm2' | 'unidad'; defaultQuantity: number; pricePerUnit: number | null };
export type ExtraSelection = Record<ExtraId, { selected: boolean; quantity: number }>;

export const siteConfig = raw;
export const models = raw.models as HouseModel[];
export const extras = raw.extras as ExtraDefinition[];
export const PRICE_KIT = raw.pricing.kitPerM2;
export const PRICE_ASSEMBLY = raw.pricing.assemblyPerM2;
export const defaultExtraSelections = (): ExtraSelection => ({
  terraza: { selected: false, quantity: 20 },
  garaje: { selected: false, quantity: 25 },
  piscina: { selected: false, quantity: 1 }
});
export const MODEL_VIEWS = [
  { key: 'fachada', title: 'Volumen estructural conceptual' },
  { key: 'posterior', title: 'Detalle del volumen estructural' },
  { key: 'aerea', title: 'Preparación y logística del kit (ilustrativa)' },
  { key: 'detalle', title: 'Bloques de hormigón celular (ilustrativo)' }
] as const;
export const getModel = (slug: string) => models.find((m) => m.slug === slug);
export const modelImage = (model: HouseModel, view: (typeof MODEL_VIEWS)[number]['key'] = 'fachada') =>
  `/images/${model.visualKey}-${view}.webp`;
export const modelPlan = (model: HouseModel) => `/plans/${model.visualKey}.svg`;
export const includedItems = [
  'Kit de componentes de hormigón celular para ejecutar la estructura prevista; despiece, piezas y encuentros por definir en ficha técnica.',
  'Planos del kit incluidos; su alcance y carácter técnico se definirán por escrito.',
];
export const excludedItems = [
  'Transporte: se calcula aparte al introducir el código postal de entrega.',
  'Interiores, distribución acabada, tabiquería y acabados que no figuren expresamente en la ficha.',
  'Electricidad, fontanería, saneamiento, ventilación, climatización y demás instalaciones.',
  'Pavimentos, revestimientos, alicatados, baños, cocina, mobiliario y pintura.',
  'Carpinterías exteriores e interiores, acristalamientos y puertas.',
  'Piscina y urbanización exterior salvo presupuesto adicional contratado.',
];
export const pendingItems = [
  'Cimentación, movimientos de tierras y accesibilidad para los medios de descarga.',
  'Forjados, cubierta estructural y/o cubierta terminada, aislamiento e impermeabilizaciones.',
  'Proyecto técnico visado, dirección facultativa, licencias, tasas y autorizaciones.',
  'Ámbito exacto del montaje opcional, medios auxiliares y condiciones de seguridad.',
  'Terrazas y garajes estructurales opcionales: mediciones y presupuesto específico.',
];
export const faqs = [
  { question: '¿Me entregáis la vivienda acabada por dentro?', answer: 'No. NoLimits Blocks comercializa el kit estructural y, opcionalmente, su montaje. Los interiores los puedes ejecutar o contratar por tu cuenta con los técnicos y profesionales que correspondan.' },
  { question: '¿Qué diferencia hay entre solo kit y kit con montaje?', answer: `El kit de estructura parte de ${PRICE_KIT} €/m² y la opción de montaje añade ${PRICE_ASSEMBLY} €/m². El alcance exacto de ambos servicios se confirmará en la ficha técnica y el presupuesto comercial.` },
  { question: '¿Cuánto cuesta el transporte?', answer: 'El transporte se calcula de forma independiente según el código postal de entrega, tomando como origen Bellvís (25142). Introduce el CP en la calculadora para obtener una estimación por carretera. Accesos especiales y descarga: a confirmar.' },
  { question: '¿Puedo incluir terraza, garaje o piscina?', answer: 'Sí. Puedes solicitarlos como extras. La terraza y el garaje se estudian como ampliaciones estructurales; la piscina es una actuación aparte. Hasta definir alcance, dimensiones y precio, no aparecen como importes confirmados.' },
  { question: '¿Están incluidos el techo, la cimentación y las ventanas?', answer: 'No se deben presuponer incluidos. Cimentación, cubierta, forjados, carpinterías y demás componentes requieren definición expresa en la ficha técnica de cada kit.' },
  { question: '¿Los renders son fotos de obras reales?', answer: 'No. Son imágenes generadas de carácter ilustrativo que ayudan a visualizar la estructura sin acabados. No representan nuestra fábrica, obras ejecutadas, proyectos visados ni el alcance exacto del suministro.' },
  { question: '¿La superficie de catálogo es útil o construida?', answer: 'Es una superficie de referencia para el cálculo. La medición contractual se precisará en la oferta después de validar el diseño.' },
  { question: '¿Qué impuestos se aplican?', answer: 'Los importes mostrados no calculan impuestos. Su tratamiento se determinará y detallará por separado en cada oferta.' }
];
