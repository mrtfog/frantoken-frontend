# Matriz de adaptación — contenido Lofty, sistema visual LangChain

Todas las asignaciones de esta tabla son **propuestas**, no componentes observados en Lofty ni código original de LangChain. L0–L8 corresponden a [CONTENT-AUDIT.md](../research/CONTENT-AUDIT.md); rutas R00–R17 a [INFORMATION-ARCHITECTURE.md](INFORMATION-ARCHITECTURE.md). Los componentes existentes proceden de la especificación [DESIGN.md](../research/DESIGN.md). **NUEVO = componente nuevo propuesto**. Tokens y estilos se heredan de [design-tokens.css](../../src/assets/css/design-tokens.css); no se deducen del scraping de contenido.

| Patrón de contenido de Lofty → | Necesidad del usuario → | Contenido propio requerido → | Componente de LangChain → | Adaptación necesaria |
|---|---|---|---|---|
| L0 propuesta inicial y CTA | Entender el producto y elegir siguiente paso | [PROPUESTA EXACTA], público, requisitos y límites aprobados | CampaignHero + ActionLink | R00: jerarquía editorial LangChain; CTA Explorar→R01 y explicación→R03; eliminar cifras/promoción ajenas |
| L0 métricas de escala | Dimensionar actividad con contexto | [DATO VERIFICADO DEL NEGOCIO], unidad, fuente y fecha | MetricGroup | R00: 3 columnas→pila; no usar métricas sin fuente ni trasladar resultados de Lofty |
| L0 prensa y respaldos | Identificar evidencia y procedencia | Logos autorizados, URL, relación exacta | LogoWall | R00/R07: omitir si no hay permisos; prensa no implica garantía |
| L0/L1 pasos de inicio | Comprender secuencia y requisitos | Pasos reales, responsable, insumo y resultado | LifecycleSection / LifecycleStage | R03: secuencia editorial con lectura completa mobile; no ocultar condiciones en animación |
| L1 explicación de derechos y operación | Saber qué obtiene y quién responde | Modelo propio, derechos, restricciones, roles | FrameworkCard | R03: agrupar por tema, enlazar R06; no importar LLC/tokens/USDC |
| L0 beneficios en bloques | Comparar funciones pertinentes | Función, condición y evidencia propia | FrameworkCard + ProductChip si sirve como etiqueta | R00: evitar beneficios absolutos; ProductChip no reemplaza estado operativo de oferta |
| L0 propiedades destacadas | Pasar de promesa a oferta concreta | Inventario actual, ubicación, tipo, estado, foto y datos | NUEVO PropertyCardGrid / PropertyCard | R00/R01: mantener lenguaje de bordes/acciones; tarjeta inmobiliaria no es CustomerCard con título cambiado |
| L2 búsqueda y filtros | Reducir oferta según preferencias | Taxonomías disponibles, campos indexados y API | NUEVO PropertyFilters / SortControl | R01: controles con FormField como base visual; mobile panel expandible, filtros persistidos en URL |
| L2 grilla/lista y resultados | Comparar y recuperar contexto | Datos comparables, conteo y orden | NUEVO PropertyCardGrid / ResultStatus | R01: priorizar una grilla funcional; vista lista opcional solo si aporta comparación; no forzar carrusel |
| L2 sin resultados | Recuperarse de una consulta | Filtros activos y acciones de restablecer/ayuda | NUEVO ResultStatus + ActionButton | R01: mensaje claro, Limpiar y reintentar; observado vacío no demuestra exhaustividad de búsqueda |
| L3 galería y atributos | Reconocer el inmueble | Fotos propias, atributos, ubicación publicable | NUEVO PropertyHeader / MediaGallery | R02: galería semántica, alt, controles, permisos; no usar arte abstracto LangChain en lugar de evidencia del activo |
| L3 resumen de compra | Ver condiciones e iniciar siguiente paso | Estado, precio/unidad, fecha, costos/requisitos | NUEVO OfferSummary + ActionLink | R02: lateral desktop/en flujo mobile; CTA alta, sin simular compra pública |
| L3 Details/Financials | Separar grupos de información densa | Activo, métricas con metodología, gastos y fuentes | NUEVO PropertyDataPanels + ComparisonTable adaptada | R02: tabs accesibles si útiles, lectura secuencial mobile; matriz de datos no es tabla comercial de planes |
| L3 documentos de evaluación mencionados | Consultar sustento antes de decidir | Archivos vigentes, tipo, fecha, versión y acceso | NUEVO DocumentList | R02: lista documental; acceso público/privado pendiente de negocio, no inferido de Lofty |
| L3 gestor y responsabilidades | Identificar quién opera el activo | Gestor, roles, canal y política de reportes | FrameworkCard + NUEVO ManagerSummary | R02: mostrar responsabilidades verificadas; avatar propio autorizado |
| L3 novedades, incluida información adversa | Entender cambios materiales | Eventos, fechas, impacto, fuente y correcciones | NUEVO UpdateTimeline | R02: cronología estable; no convertir incidencias en carrusel promocional |
| L3 Order book y operaciones | Distinguir intención de precio ejecutado | Feed real, unidad, fecha, estado y definiciones | NUEVO MarketActivityPanel | Solo si existe mecanismo propio; tablas separadas, sin asumir liquidez ni ejecución |
| L3 calculadora de escenario | Explorar supuestos de forma explícita | Fórmula aprobada, entradas, límites, fuentes | NUEVO ScenarioEstimator; UsageEstimator como referencia de estructura | No trasladar fórmula de pricing LangChain ni tasas Lofty; escenario etiquetado, salida textual y gráfica opcional |
| L0/L1/L3/L5 FAQ | Resolver dudas en contexto | Respuestas propias con alcance y revisión | FAQItem | Resumen local, fuente canónica R06; riesgos materiales no colapsados por defecto |
| L4 testimonios y valoraciones | Conocer experiencias atribuibles | Testimonios autorizados, relación, fecha y fuente | CustomerCard / CustomerCarousel | R08 opcional; no inventar citas, puntajes ni promedios; controles accesibles |
| L6 equipo e identidad | Identificar responsables | Identidad, roles, biografías y retratos propios | CampaignHero + CustomerCard adaptada | R07: tarjeta de persona sin apariencia de cita; sin reutilizar identidad visual de ninguna referencia |
| L5 proceso de publicación | Evaluar encaje como propietario | Servicio confirmado, criterios, costos y documentación | LifecycleStage + FrameworkCard | R13 separado de recorrido inversor; desactivar si no existe audiencia/servicio |
| L5 formulario de solicitud | Iniciar conversación sobre un inmueble | Campos justificados, privacidad, endpoint y siguiente paso | FormField + SalesForm adaptado | R13: éxito significa recepción; no garantizar aceptación o venta; no copiar requeridos sin motivo |
| L8 registro público | Abrir cuenta sabiendo requisitos | Métodos reales, términos, privacidad, retorno | NUEVO AccountEntryShell / IdentityEntry + FormField | R10: conservar contexto; eliminar promoción; no mostrar proveedor sin integración |
| L7 comparación editorial | Evaluar criterios entre opciones | Fuentes, fecha, método y conflicto de interés | ComparisonTable + FAQItem | R14 prescindible; no copiar rankings o afirmaciones de competidores |
| Footer amplio y advertencias | Encontrar ayuda y condiciones | Mapa propio, identidad, políticas y avisos aprobados | SiteFooter + NavDisclosure | Agrupar solo rutas activas; 4→2→1 columnas de referencia; no copiar red SEO de ciudades/glosario |
| CTA final reiterado | Encontrar un siguiente paso claro | Acción alineada con la página y estado | ClosingCTA + ActionLink | R00/R03→R01; no repetir alta a costa de evaluación; una acción primaria por bloque |

## Decisiones de adaptación que requieren validación del negocio

- Catálogo y ficha son esenciales solo si existe oferta publicable. Si el servicio es asesorado, sustituir inicio de cuenta por Contacto (R09), sin fingir autoservicio.
- Mercado secundario, calculadora, testimonios, comparaciones y publicación de terceros son funciones condicionales, no requisitos heredados.
- Todos los colores, tipografías y espaciados provienen del contrato LangChain; estados operativos adicionales necesitan extensión accesible, marcada como propuesta.
- Las fotografías de inmuebles, logos, nombres, citas, cifras y textos de ambas referencias deben sustituirse por material propio autorizado.
- La eficacia de esta adaptación no se ha medido. Validar comprensión, búsqueda, revisión de condiciones y recuperación de errores con usuarios cuando exista implementación.
