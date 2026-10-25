import type { DemoProject, SectorFilter } from "../types/marketplace.type";

// Solo la existencia de las marcas y sus programas de franquicia está verificada.
// Los proyectos y los valores de ROI son simulaciones ajenas a esas empresas.
export const demoProjects: readonly DemoProject[] = [
  {
    id: "mcdonalds",
    name: "McDonald's",
    sector: "Comida rápida",
    format: "Restaurante de servicio rápido",
    descriptor: "Una unidad de restaurante en una zona aún por evaluar.",
    company:
      "McDonald's es una cadena de restaurantes con un programa oficial de franquicias.",
    franchise:
      "El proceso de franquicia y la disponibilidad de restaurantes dependen de McDonald's y del mercado correspondiente.",
    officialUrl:
      "https://corporate.mcdonalds.com/corpmcd/franchising-overview/global-franchising.html",
    logoUrl: "https://cdn.simpleicons.org/mcdonalds/FFC72C",
    palette: "lime",
    annualizedRoiScenario: [-3, 2, 5, 4, 7],
  },
  {
    id: "burger-king",
    name: "Burger King",
    sector: "Comida rápida",
    format: "Restaurante de servicio rápido",
    descriptor:
      "Una unidad de restaurante cuyo territorio todavía no se definió.",
    company: "Burger King publica un programa de franquicias para operadores.",
    franchise:
      "La marca describe un proceso de selección y condiciones propias; no hay autorización para este proyecto de muestra.",
    officialUrl: "https://franchising.bk.com/",
    logoUrl: "https://cdn.simpleicons.org/burgerking/D62300",
    palette: "peach",
    annualizedRoiScenario: [-5, 1, 4, 6, 5],
  },
  {
    id: "havanna",
    name: "Havanna",
    sector: "Cafetería",
    format: "Havanna Café",
    descriptor: "Un café de marca conocida en una plaza a definir.",
    company:
      "Havanna comercializa productos de cafetería y confitería y presenta Havanna Café.",
    franchise:
      "Su sitio oficial describe el formato de franquicia Havanna Café; inversión y ubicación requieren evaluación específica.",
    officialUrl: "https://havanna.com.ar/atencion-al-cliente/franquicias",
    palette: "lavender",
    annualizedRoiScenario: [-2, 3, 6, 5, 8],
  },
  {
    id: "pizza-hut",
    name: "Pizza Hut",
    sector: "Restaurantes",
    format: "Restaurante de pizza",
    descriptor: "Un posible restaurante, sujeto a formato y mercado.",
    company:
      "Pizza Hut opera una red internacional de restaurantes y ofrece franquicias.",
    franchise:
      "La marca presenta distintos formatos; costos y requisitos dependen del acuerdo y la jurisdicción.",
    officialUrl: "https://franchise.pizzahut.com/",
    logoUrl: "https://cdn.simpleicons.org/pizzahut/EE3D43",
    palette: "mint",
    annualizedRoiScenario: [-4, 0, 3, 5, 6],
  },
];

export const sectors: readonly SectorFilter[] = [
  "Todos",
  "Comida rápida",
  "Cafetería",
  "Restaurantes",
];
