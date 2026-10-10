import type { Pillar, Question, Role, Stage } from "../types/homepage.type";

export const tickerPhrases = [
  "PENSAR EN GRANDE",
  "EMPEZAR CON CRITERIO",
  "CRECER CON ESTRUCTURA",
] as const;

export const pillars: readonly Pillar[] = [
  {
    icon: "sparkles",
    number: "01",
    title: "Pensar antes de abrir",
    body: "Analizar la oportunidad, el mercado y la capacidad de operar.",
  },
  {
    icon: "blocks",
    number: "02",
    title: "Definir cada rol",
    body: "Separar el proyecto, la marca, la operadora y los servicios de FranToken.",
  },
  {
    icon: "trending",
    number: "03",
    title: "Seguir lo que importa",
    body: "Conectar operación, reportes y derechos documentados.",
  },
];

export const roles: readonly Role[] = [
  {
    number: "A",
    title: "El proyecto",
    body: "Un vehículo previsto para financiar y adquirir los derechos de la franquicia.",
  },
  {
    number: "B",
    title: "La operadora",
    body: "El equipo especializado que administraría la unidad en el día a día.",
  },
  {
    number: "C",
    title: "FranToken",
    body: "Estructuración, tecnología y seguimiento, según los acuerdos del proyecto.",
  },
  {
    number: "D",
    title: "Quien participa",
    body: "Aporta bajo un instrumento cuyos derechos y condiciones deben estar documentados.",
  },
];

export const stages: readonly Stage[] = [
  {
    number: "01",
    label: "Evaluar",
    title: "Primero, una franquicia que tenga sentido.",
    description:
      "Cada proyecto comienza con el análisis de la marca, el mercado, los costos y la capacidad de operación. La evaluación precede a cualquier propuesta de financiación.",
    note: "Viabilidad comercial y económica",
  },
  {
    number: "02",
    label: "Estructurar",
    title: "Una estructura para cada proyecto.",
    description:
      "El modelo prevé un fideicomiso que financia y compra el proyecto. Sus participantes, documentos, condiciones y responsabilidades deben definirse para cada caso.",
    note: "Vehículo, acuerdos y derechos",
  },
  {
    number: "03",
    label: "Operar",
    title: "La operación necesita especialistas.",
    description:
      "Una operadora administra la unidad. FranToken plantea aportar estructura, tecnología y seguimiento; la marca franquiciante conserva su propio rol contractual.",
    note: "Roles separados, responsabilidades claras",
  },
  {
    number: "04",
    label: "Informar",
    title: "Seguir el proyecto con información.",
    description:
      "El modelo contempla reportes sobre la explotación y distribuciones sujetas a condiciones, resultados y fondos disponibles. Los derechos concretos se fijan en los documentos de cada proyecto.",
    note: "Reportes, condiciones y resultados",
  },
];

export const questions: readonly Question[] = [
  {
    question: "¿Qué representa un token?",
    answer:
      "En el modelo propuesto, representa los derechos que se definan para un proyecto y su emisión. Su alcance, condiciones y documentación siguen pendientes; un token por sí solo no otorga propiedad de la marca, voto, liquidez ni rentabilidad garantizada.",
  },
  {
    question: "¿FranToken opera las franquicias?",
    answer:
      "El modelo separa funciones: una operadora especializada administraría la unidad; FranToken se ocuparía de la estructuración, la tecnología y el seguimiento según los acuerdos que se establezcan.",
  },
  {
    question: "¿Hay proyectos disponibles para invertir?",
    answer:
      "Esta página explica el modelo. No publica una oferta ni confirma proyectos disponibles. Una oportunidad futura requerirá datos, documentos, condiciones y el estado de captación verificados antes de habilitar una acción de inversión.",
  },
];
