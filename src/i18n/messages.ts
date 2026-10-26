/** Shared copy for the future ES/CA locale router. The current published pages default to Spanish. */
export const dictionaries = {
  es: {
    explore:'Explorar viviendas', calculate:'Calcular mi presupuesto', contact:'Solicitar información',
    kit:'Solo kit', mounted:'Kit + montaje', area:'Superficie', included:'Incluido', total:'Total orientativo',
    tax:'Impuestos no calculados', models:'Viviendas', process:'Cómo funciona', material:'Hormigón celular'
  },
  ca: {
    explore:'Explora habitatges', calculate:'Calcula el meu pressupost', contact:'Sol·licita informació',
    kit:'Només kit', mounted:'Kit + muntatge', area:'Superfície', included:'Inclòs', total:'Total orientatiu',
    tax:'Impostos no calculats', models:'Habitatges', process:'Com funciona', material:'Formigó cel·lular'
  }
} as const;
export type Locale = keyof typeof dictionaries;
