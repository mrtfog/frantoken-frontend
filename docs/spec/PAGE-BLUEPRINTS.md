# Blueprints de páginas — especificación propuesta

## Autoridad y convención

Todas las decisiones de este archivo son **propuestas**. Derivan de necesidades observadas en L0–L8 de [CONTENT-AUDIT.md](../research/CONTENT-AUDIT.md), sin copiar su identidad ni condiciones. R00–R17 remiten al registro de [INFORMATION-ARCHITECTURE.md](INFORMATION-ARCHITECTURE.md). Referencia visual: [DESIGN.md](../research/DESIGN.md) y [design-tokens.css](../../src/assets/css/design-tokens.css) existentes, ubicados en `docs/research/` y `src/assets/css/` del repositorio.

**P1 esencial**, **P2 complementario**, **P3 opcional**. Un bloque P2/P3 sin evidencia propia se omite, no se completa con cifras o testimonios ajenos. Los ejemplos son guiones de producción, no afirmaciones listas para publicar. Usar `[DATO VERIFICADO DEL NEGOCIO]`, `[CONDICIÓN APROBADA]`, `[FUENTE Y FECHA]`, `[ASSET PROPIO AUTORIZADO]` mientras falten datos; bloquear publicación de placeholders.

Los componentes conocidos son nombres de implementación propuestos por [DESIGN.md](../research/DESIGN.md). **NUEVO** significa «componente nuevo propuesto»: requiere definición funcional adicional, aunque use el sistema visual existente. Semántica indicada aquí es la deseada para la web propia; no pretende describir el HTML de Lofty.

## Contrato visual compartido

Aplicar superficies, color, tipografía, contenedores y acciones mediante tokens existentes. `--surface-page` (#030710), `--surface-contrast` (#F2FAFF), `--text-primary` (#CCE9FF), `--text-heading` (#E5F4FF), `--text-on-light` (#030710), `--border-action` (#2F4B68). No usar el texto claro de la superficie oscura sobre fondo claro. Las fuentes Twklausanne/Aeonik tienen licencia pendiente; usar el fallback explícitamente propuesto en el CSS si no se licencian. No descargar fuentes o ilustraciones de marca para reutilizarlas.

Contenedor editorial máximo 1416 px; hero máximo 800 px; controles de acción 48 px y radio 6 px, campos base 44 px; dimensiones proceden de [DESIGN.md](../research/DESIGN.md). Las equivalencias responsive 480/768/992 allí propuestas no se convierten aquí en breakpoints medidos. Validar composición a 1440, 768 y 390 px en implementación; no se ha construido ni validado una web propia. El color de semánticas nuevas (error, aviso, éxito) no está resuelto por la referencia: usar mensaje e icono más borde existente hasta definir y contrastar una extensión, sin inventar un token extraído.

**D/M** describe desktop/mobile de cada bloque. Tablet conserva la lectura mobile en bloques operativos salvo espacio suficiente sin compresión. Separaciones y escalas usan [DESIGN.md](../research/DESIGN.md); las proporciones 2:1 y grillas operativas que siguen son propuestas de layout.

## Shell común

SiteHeader y NavDisclosure representan los destinos de IA; ActionLink navega y ActionButton cambia estado/envía, sin elementos interactivos anidados. SiteFooter contiene cuatro grupos desktop, dos tablet y uno mobile según referencia, sin copiar su inventario. Incluir enlace de salto a `main`, un H1 por página, H2 por sección y H3 por elemento. Encabezados no se eligen por tamaño visual. Header sticky según DESIGN; cualquier barra de ficha debe comprobar que no tape foco o contenido.

Los bloques editoriales pueden usar LifecycleSection/LifecycleStage con secuencia vertical mobile. La información necesaria para decidir siempre existe en el DOM y se lee sin activar animaciones. No reutilizar el ciclo animado para ocultar datos financieros. Sin interacción basada exclusivamente en hover. Respetar prefers-reduced-motion. El focus, el contraste de combinaciones nuevas y los patrones de teclado deben comprobarse al implementar; no se declara conformidad a partir de esta especificación.

## R00 — Homepage

Resumen de descubrimiento, inspirado en L0. No convertirse en catálogo completo ni manual operativo.

| Orden / ancla | Objetivo y mensaje | Contenido mínimo / jerarquía | Prioridad | Componente | Distribución D / M | CTA y destino | Datos y assets a producir |
|---|---|---|---|---|---|---|---|
| 1 · hero | Explicar qué ofrece la marca y a quién | H1: [PROPUESTA EXACTA]; 1 párrafo sobre naturaleza y elegibilidad, sin prometer renta o liquidez | P1 | CampaignHero + ActionLink | D: texto centrado, ancho hero; M: mismo orden, acciones apiladas | Explorar propiedades → R01; Cómo funciona → R03 | Page, Claim aprobado; imagen conceptual propia opcional |
| 2 · evidencia | Dar contexto verificable | H2 accesible; 2–3 hechos con definición, fuente y fecha; omitir si no hay evidencia | P2 | MetricGroup o LogoWall | D: 3 columnas; M: pila; no ticker | Conocer la empresa → R07 | Metric/Claim o logos con permisos; nunca mezclar operación histórica de Lofty |
| 3 · funcionamiento | Anticipar la secuencia y los derechos | H2 y 3 H3: explorar, evaluar, iniciar proceso; aclarar qué se adquiere | P1 | LifecycleSection + LifecycleStage | D: ilustración y pasos; M: pasos consecutivos, sin bloqueo por scroll | Ver proceso y condiciones → R03 | Step[], ilustración original; modelo de negocio aprobado |
| 4 · oferta | Permitir explorar ejemplos reales | H2; hasta 3 ofertas actuales, ubicación, tipo, estado y datos mínimos | P1 | NUEVO PropertyCardGrid + PropertyCard | D: 3 tarjetas; M: una por fila; sin carrusel obligatorio | Cada tarjeta → R02; Ver todas → R01 | Property, Offer y foto con alt; precio/moneda solo verificados |
| 5 · limites | Hacer visible lo necesario para decidir | H2; resumen de costos, riesgos y mecanismo de salida en lenguaje claro | P1 | FrameworkCard + ActionLink | D: hasta 3 columnas; M: pila según patrón editorial | Consultar costos y riesgos → R04 | CostItem, Risk, condiciones aprobadas; no iconos que impliquen garantía |
| 6 · confianza | Identificar responsables y evidencia | H2; identidad, rol de gestión; cita propia opcional con fuente | P1 identidad; P2 cita | CustomerCard + ActionLink | D: texto e imagen; M: atribución junto a cita | Empresa → R07; Experiencias → R08 si activa | Person/Organization; retratos y consentimiento |
| 7 · preguntas | Resolver barreras iniciales | H2; 4–6 FAQ sobre derechos, requisitos, gastos, salida y ayuda | P1 | FAQItem | D/M: columna legible, respuesta expandible | Profundizar → R06 correspondiente; Ayuda → R05 | FAQ compartida, respuesta breve revisada |
| 8 · cierre | Proponer siguiente paso acorde al nivel de comprensión | H2 breve sin nueva promesa; una acción | P1 | ClosingCTA | D: arte al lado; M: arriba o se omite si decorativo | Explorar propiedades → R01 | Texto propio, arte opcional sin logos LangChain |

## R01 — Catálogo

Contenido operativo inspirado en L2. H1 visible propuesto, aunque el observado en Lofty sea sr-only.

| Orden / ancla | Objetivo y mensaje | Contenido mínimo / jerarquía | Prioridad | Componente | Distribución D / M | CTA y destino | Datos y assets a producir |
|---|---|---|---|---|---|---|---|
| 1 · introduccion | Aclarar alcance del inventario | H1; geografía, tipos y significado de disponibilidad | P1 | NUEVO CatalogHeader | D/M: texto antes de controles | Cómo funciona → R03 | Page y alcance confirmado |
| 2 · filtros | Reducir resultados sin perder contexto | Labels de búsqueda, mercado y tipo; otros filtros solo con campos reales; orden con criterio explícito | P1 | NUEVO PropertyFilters + SortControl | D: fila o sidebar; M: panel expandible en flujo, resumen de filtros y Limpiar | Aplicar actualiza R01 con query; Limpiar restablece R01 | Taxonomías Market/PropertyType; filtros y orden admitidos por API |
| 3 · resultados | Mostrar oferta comparable | H2 Resultados; conteo, estado y tarjetas; precio/unidad/moneda; métricas con etiqueta temporal | P1 | NUEVO PropertyCardGrid + PropertyCard + ResultStatus | D: 3 columnas si ancho suficiente, tablet2 propuesto; M:1; texto sin truncar condiciones | Ver propiedad → R02 | Property, Offer, MetricSnapshot, fotos; dato nulo ≠ cero |
| 4 · paginacion | Acceder a todos los resultados | Página actual/total si conocido, siguiente/anterior o cargar más con conteo | P1 | NUEVO ResultsPagination | D/M: después de resultados, foco estable | Continuar en R01 manteniendo filtros | API de paginación y total; no scroll infinito obligatorio |
| 5 · asistencia | Recuperar búsqueda fallida | Vacío: filtros activos + sugerencia; error: estado y reintento; carga: estado anunciado | P1 | NUEVO ResultStatus + ActionButton | D/M: reemplaza región de resultados, no toda la página | Limpiar → R01; ayuda → R09; reintentar misma consulta | Mensajes propios y política de datos vencidos |

## R02 — Ficha de propiedad y oferta

Separar información del inmueble, condiciones de oferta y datos de mercado. Inspirado en L3; panel de negociación solo si existe en el negocio.

| Orden / ancla | Objetivo y mensaje | Contenido mínimo / jerarquía | Prioridad | Componente | Distribución D / M | CTA y destino | Datos y assets a producir |
|---|---|---|---|---|---|---|---|
| 1 · resumen | Identificar activo y oferta | Breadcrumb; H1 nombre/dirección publicable; ubicación, tipo, atributos y estado; galería | P1 | NUEVO PropertyHeader + MediaGallery | D: galería y resumen; M: imagen principal, galería navegable y texto | Volver a resultados → R01 conservando consulta | Property, Offer, MediaAsset; permisos de dirección y fotografías |
| 2 · decision | Exponer condiciones actuales antes de iniciar | Precio y unidad con fecha, mínimo si aplica, disponibilidad, elegibilidad, costos y riesgo resumidos | P1 | NUEVO OfferSummary + ActionLink | D: columna lateral ~1/3; M: bloque en flujo tras resumen; CTA no cubre texto | Revisar requisitos y crear cuenta → R10 con contexto; Riesgos → #riesgos | Offer, MetricSnapshot, CostItem; CTA cambia si no disponible |
| 3 · datos | Permitir evaluación verificable | H2; bloques Activo/Finanzas; H3 por grupo; tablas con unidades, período, fuente y tipo de valor | P1 | NUEVO PropertyDataPanels + MetricGroup + ComparisonTable adaptada | D: tablas; M: tablas con scroll local etiquetado o filas label/value; contenido esencial nunca eliminado | Metodología → R04#metodologia | MetricDefinition y Snapshot; deuda, gastos o ingresos solo si aplican |
| 4 · gestion | Aclarar quién hace qué | H2; gestor, responsabilidades, contacto, frecuencia de reportes | P1 | FrameworkCard + NUEVO ManagerSummary | D: dos columnas; M: pila | Ayuda de gestión → R06; Contacto → R09 | Manager, responsabilidades y avatar autorizado |
| 5 · documentos | Dar acceso a evidencia específica | H2; lista con título, tipo, fecha, versión, tamaño/formato y nivel de acceso | P1 | NUEVO DocumentList | D/M: lista de enlaces; no carrusel | Abrir documento público; privado → R10 con retorno al documento | Document; publicar disponibilidad y motivo si requiere acceso, sin asumir gating |
| 6 · riesgos | Mostrar límites y eventos materiales | H2; riesgos propios del activo y oferta, restricciones, costos aplicables y condiciones de salida | P1 | NUEVO RiskDisclosure + FAQItem para explicación secundaria | D/M: texto principal expandido; detalles opcionales desplegables | Marco general → R04; consultar → R09 | Risk, CostItem, condición aprobada; no esconder advertencia principal |
| 7 · actualizaciones | Mostrar evolución y problemas relevantes | H2; novedades por fecha, categoría, impacto y fuente; estado actual | P1 cuando existan | NUEVO UpdateTimeline | D/M: lista cronológica; eventos adversos no relegados | Leer actualización expandida en misma ficha | PropertyUpdate; historial y responsable |
| 8 · dudas | Resolver preguntas del activo | H2; FAQ específica separada de la general | P2 | FAQItem | D/M: una columna | Ayuda → R05; Contacto → R09 | FAQ vinculada a Property/Offer |
| 9 · mercado | Mostrar negociación solo cuando el modelo la tenga | H2; órdenes activas, ejecuciones y estimaciones en tablas distintas, fecha/moneda y actualización | P3 condicional | NUEVO MarketActivityPanel | D: tablas contiguas; M: secuenciales, desplazamiento local; estado accesible | Iniciar proceso → R10; no botón de ejecución público ficticio | Feed real de órdenes/operaciones, definiciones y permisos |
| 10 · escenario | Explorar supuestos, nunca prometer resultados | H2; entradas, supuestos, fuente, horizonte, salida y advertencia vinculada | P3 condicional | NUEVO ScenarioEstimator; estructura de UsageEstimator solo como referencia | D: inputs junto a salida; M: inputs antes, tabla textual alternativa a gráfico | Ver método → R04#metodologia | ScenarioMethod aprobado; no reutilizar fórmula ni tasas de Lofty |

## R03 — Cómo funciona

La explicación de L1 se reparte entre esta síntesis y artículos R06; no copiar su mecanismo de inversión.

| Orden / ancla | Objetivo y mensaje | Contenido mínimo / jerarquía | Prioridad | Componente | Distribución D / M | CTA y destino | Datos y assets a producir |
|---|---|---|---|---|---|---|---|
| 1 · propuesta | Precisar naturaleza y público | H1 y párrafo; qué se obtiene, qué no incluye, quién puede participar | P1 | CampaignHero | D/M: columna editorial | Explorar → R01 | ProductPolicy aprobada |
| 2 · pasos | Ordenar las tareas del usuario | H2; pasos H3 con acción, requisito, resultado y dependencia | P1 | LifecycleSection / LifecycleStage | D: texto/ilustración por etapa; M: secuencia completa | Ver requisitos → R10 | Step[] y diagrama propio |
| 3 · derechos | Explicar roles y flujos | H2; derechos, gestión, ingresos si existen, distribución, responsabilidades | P1 | FrameworkCard | D: grilla; M: pila | Profundizar por tema → R06 | Policy, Guide y esquema del modelo propio |
| 4 · condiciones | Anticipar fricción material | H2; costos, riesgos, plazo, salida y restricciones | P1 | ComparisonTable adaptada + ActionLink | D: tabla; M: grupos con labels | Costos y riesgos → R04 | CostItem/Risk; ejemplos solo con datos autorizados |
| 5 · faq | Responder dudas restantes | H2; FAQ referenciada, sin duplicar respuestas largas | P1 | FAQItem | D/M: una columna | Artículo → R06; Ayuda → R05 | FAQ |
| 6 · cierre | Llevar a evaluación | H2 + acción | P1 | ClosingCTA | D/M: patrón visual compartido | Explorar propiedades → R01 | Copy propio |

## R04 — Costos y riesgos

Contenido esencial previo a decisión, separado del hero comercial. Inspirado por condiciones dispersas en L1/L3/footer.

| Orden / ancla | Objetivo y mensaje | Contenido mínimo / jerarquía | Prioridad | Componente | Distribución D / M | CTA y destino | Datos y assets a producir |
|---|---|---|---|---|---|---|---|
| 1 · alcance | Definir aplicabilidad y vigencia | H1; modelo, jurisdicción y fecha de revisión | P1 | CampaignHero sobrio sin arte necesario | D/M: columna de lectura | Cómo funciona → R03 | Policy y revisor |
| 2 · costos | Permitir entender quién paga y cuándo | H2; concepto, pagador, base de cálculo, importe/rango, momento, excepciones | P1 | ComparisonTable adaptada | D: tabla; M: grupos por concepto | Detalle de oferta → R02 solo con contexto; Explorar → R01 | CostItem verificable; no rellenar con comisiones ajenas |
| 3 · riesgos | Mostrar escenarios adversos y restricciones | H2; H3 por categoría, causa, impacto, limitación y referencia | P1 | NUEVO RiskDisclosure | D/M: texto abierto; complementos en FAQItem | Consultar → R09 | Risk y revisión propia |
| 4 · metodologia | Distinguir observado, estimado y simulado | H2; definición, fuente, período, fórmula, supuestos y límites de cada métrica | P1 | NUEVO MethodologyArticle | D/M: columna; fórmulas con explicación; tablas accesibles | Ayuda → R05 | MetricDefinition, ScenarioMethod si activa |
| 5 · documentos | Acceder a condiciones completas | H2; documentos vigentes y versiones | P1 | NUEVO DocumentList | D/M: lista | Términos → R15; documento → URL verificada | Document y textos aprobados |

## R05/R06 — Ayuda y artículo

Índice por tareas y respuesta canónica. Son extensiones de arquitectura propuestas, no páginas consultadas de Lofty.

| Orden / ancla | Objetivo y mensaje | Contenido mínimo / jerarquía | Prioridad | Componente | Distribución D / M | CTA y destino | Datos y assets a producir |
|---|---|---|---|---|---|---|---|
| R05 · 1 | Encontrar una respuesta por tarea | H1; categorías: entender, evaluar, cuenta, operación si aplica | P1 | FrameworkCard; NUEVO HelpIndex | D: grilla de temas; M: lista; búsqueda solo si indexación real | Artículo específico → R06 | Guide/FAQ y taxonomía sin categorías vacías |
| R05 · 2 | Salir cuando no hay respuesta | H2 o texto de cierre con canal | P1 | ClosingCTA | D/M: compacto | Contacto → R09 | Canal y expectativa de respuesta confirmados |
| R06 · 1 | Responder una sola necesidad | H1 pregunta/tarea; respuesta corta primero; vigencia y aplicabilidad | P1 | NUEVO HelpArticle | D/M: ancho de lectura, sin sidebar necesaria | Volver a Ayuda → R05 | Guide con fuente y revisor |
| R06 · 2 | Dar detalle utilizable | H2 requisitos; H2 pasos; H2 excepciones según necesidad; lista ordenada | P1 | NUEVO HelpArticle + FormField solo en ejemplos no interactivos | D/M: pasos lineales; captura propia con alt si útil | Destino de tarea R01/R10/R11 según artículo | Procedimiento real; no capturas de Lofty |
| R06 · 3 | Relacionar y escalar | H2 relacionados, hasta 3 artículos; canal si no resuelve | P1 | ActionLink + FAQItem si pertinente | D/M: lista | R06 relacionados; R09 | Relaciones editoriales explícitas |

## R07/R08 — Empresa y experiencias

Identidad esencial; prueba social condicional, inspiradas en L6/L4.

| Orden / ancla | Objetivo y mensaje | Contenido mínimo / jerarquía | Prioridad | Componente | Distribución D / M | CTA y destino | Datos y assets a producir |
|---|---|---|---|---|---|---|---|
| R07 · 1 | Identificar organización y rol | H1; nombre legal/comercial, actividad y alcance | P1 | CampaignHero | D/M: texto y fotografía propia opcional | Contacto → R09 | Organization y Policy |
| R07 · 2 | Identificar responsables | H2; personas con rol, trayectoria comprobable y responsabilidad | P1 | CustomerCard adaptada sin formato de cita | D: grilla; M: pila | Contacto → R09 | Person, retratos consentidos |
| R07 · 3 | Sustentar credenciales | H2; respaldo, prensa o métricas solo con fuente y relación explicada | P2 | LogoWall / MetricGroup | D: fila/grilla; M: envoltura, sin logos ilegibles | Fuente externa identificada | Claim, MediaAsset con permiso |
| R08 · 1 | Contextualizar experiencias | H1; procedencia, selección y límites; no prometer resultados típicos | P2 | CampaignHero | D/M: lectura breve | Explorar → R01 | ReviewPolicy y contexto |
| R08 · 2 | Mostrar testimonios atribuibles | H2; citas propias autorizadas, fecha, relación y enlace a fuente si existe | P2 | CustomerCard / CustomerCarousel | D: tarjetas; M: lista o carrusel accesible con controles | Empresa → R07 | Review, consentimiento; omitir agregado sin método |

## R09/R10/R11 — Contacto y entrada a cuenta

No define alta completa ni transacción. R10 inspira su función en L8, sin promociones ajenas.

| Orden / ancla | Objetivo y mensaje | Contenido mínimo / jerarquía | Prioridad | Componente | Distribución D / M | CTA y destino | Datos y assets a producir |
|---|---|---|---|---|---|---|---|
| R09 · 1 | Orientar consulta | H1; temas, canales, horario/plazo si confirmado | P1 | CampaignHero compacto | D/M: texto antes del formulario | Ayuda → R05 | SupportPolicy y canales |
| R09 · 2 | Capturar solo datos necesarios | H2; nombre opcional según necesidad, email, tema y mensaje; finalidad/privacidad | P1 | FormField + SalesForm adaptado | D: formulario y contexto; M: una columna | Enviar consulta a servicio propio; privacidad → R16 | FormDefinition, endpoint y mensajes; no ejecutar durante esta etapa |
| R10 · 1 | Aclarar requisitos antes de alta | H1; elegibilidad, finalidad de cuenta, continuidad de oferta si existe | P1 | NUEVO AccountEntryShell + CampaignHero compacto | D: contexto junto a formulario; M: requisitos antes de campos | Acceder → R11; Volver → R02 con contexto, si no R01 | ProductPolicy y método de identidad confirmado |
| R10 · 2 | Iniciar identidad real | Métodos admitidos y campos mínimos; términos/privacidad; no promesa de compra | P1 | FormField + ActionButton; NUEVO IdentityEntry | D/M: columna de formulario; sin providers ficticios | Servicio de identidad verificado; R15/R16; continuación R12 | AuthConfig; contrato de error/confirmación del servicio |
| R11 · 1 | Permitir acceso existente | H1; método real y recuperación según proveedor | P1 | NUEVO IdentityEntry | D/M: una columna | Servicio identidad → R12; Crear cuenta → R10 | AuthConfig y recuperación; flujo privado fuera del alcance |

## R13 — Propietarios (condicional)

Inspirado en L5, solo si la marca recibe inmuebles de terceros.

| Orden / ancla | Objetivo y mensaje | Contenido mínimo / jerarquía | Prioridad | Componente | Distribución D / M | CTA y destino | Datos y assets a producir |
|---|---|---|---|---|---|---|---|
| 1 · propuesta | Precisar servicio al propietario | H1; qué ofrece la marca, rol y limitaciones | P1 si activa | CampaignHero | D/M: hero editorial | Ver requisitos → #requisitos | OwnerPolicy aprobado |
| 2 · requisitos | Permitir autoevaluación | H2; tipos, ubicaciones, documentación y exclusiones | P1 | FrameworkCard | D: grilla; M: pila | Proceso → #proceso | Criterios reales |
| 3 · proceso | Explicar pasos y compromisos | H2; H3 por fase, responsable, insumos, gastos y resultado; tiempos solo verificados | P1 | LifecycleSection / LifecycleStage | D: etapas con arte; M: secuencia | Solicitud → #solicitud | Step[], costos y criterios de aceptación |
| 4 · preguntas | Resolver objeciones | H2; FAQ específica, sin garantías de aprobación o venta | P1 | FAQItem | D/M: columna | Contacto → R09 | FAQ revisada |
| 5 · solicitud | Iniciar evaluación sin compromiso implícito | H2; ubicación, tipo y ocupación si relevantes, contacto, nota opcional; finalidad y siguiente paso | P1 | FormField + SalesForm adaptado | D: campos agrupados; M: una columna | Enviar solicitud a servicio propio; Privacidad → R16 | FormDefinition; requeridos justificados por negocio, no copiar obligatoriedad de Lofty |

## R14/R15–R17 — Comparación y textos de política

Comparación es prescindible; políticas se definen con responsables del negocio.

| Orden / ancla | Objetivo y mensaje | Contenido mínimo / jerarquía | Prioridad | Componente | Distribución D / M | CTA y destino | Datos y assets a producir |
|---|---|---|---|---|---|---|---|
| R14 · 1 | Ayudar a comparar criterios legítimos | H1 alcance, fecha y conflicto de interés; H2 criterios; fuentes y límites; sin ranking sin método | P3 | ComparisonTable + FAQItem | D: tabla; M: grupos por criterio o scroll etiquetado | Cómo funciona → R03 | ComparisonEntry, revisión y fuentes actuales propias |
| R15–17 · 1 | Publicar política vigente aplicable | H1 título, versión/fecha; H2 secciones; índice si longitud lo requiere | P1 según aplicabilidad | NUEVO PolicyArticle | D/M: ancho editorial legible; enlaces permanentes a secciones | Contacto → R09; preferencias reales en R17 si aplica | PolicyDocument aprobado, histórico y responsable |

## Contratos funcionales de los componentes nuevos

| Componente | Responsabilidad y estados obligatorios propuestos | Semántica / interacción |
|---|---|---|
| PropertyCard | Resumir activo/oferta; disponible, pausada, cerrada y dato faltante | Enlace principal identificable; evitar tarjeta enlazada que contenga otros botones anidados; no usar color como único estado |
| PropertyFilters | Traducir taxonomías a consulta; inicial, modificado, aplicado, vacío/error | Labels persistentes, selects/checkboxes nativos cuando sirvan, conteo anunciado; foco permanece en control tras actualizar |
| PropertyDataPanels | Organizar datos densos por tema; opcional tab activo | Si se usan tabs: tablist/tab/tabpanel, flechas y Home/End; paneles con títulos; alternativa secuencial mobile. No inferir este teclado de Lofty |
| MediaGallery | Mostrar imágenes reales sin perder contexto | Botones anterior/siguiente, posición actual, alt por función; modal solo si hace falta, Escape/cierre/retorno de foco |
| OfferSummary | Exponer estado actual, condiciones y siguiente paso | Deshabilitado solo con explicación visible y alternativa; no confundir crear cuenta con ejecutar operación |
| DocumentList | Identificar versión, formato y acceso | Enlaces descriptivos; informar descarga o apertura externa; documento retirado no simula enlace funcional |
| UpdateTimeline | Ordenar novedades y eventos materiales | Lista cronológica con fechas; sin autoplay; texto íntegro o expansión accesible |
| RiskDisclosure | Hacer visibles riesgos principales | Resumen material siempre expandido; details/summary solo para detalle secundario |
| MarketActivityPanel | Separar oferta vigente, ejecución y estimación | Tablas con caption/headers, fecha de actualización y estado desconectado; no producir valores sintéticos |
| ScenarioEstimator | Aplicar método aprobado a supuestos explícitos | Labels/unidades/límites, error por campo, salida textual además de gráfico; anunciar resultado al recalcular, no en cada tecla |
| IdentityEntry / formularios | Presentar métodos y feedback del backend | Loading, error de campo, error general, éxito y recuperación; conservar campos no sensibles cuando corresponda; no asumir backend disponible |

No añadir dependencias para maquetación o FAQs nativas. En React/TypeScript separar componentes de presentación de adaptadores CMS/API. Reusar tokens con Tailwind mediante variables CSS; no fijar colores Lofty ni nuevas medidas pretendidamente extraídas. Usar discriminated unions para estados de oferta y datos; fechas/monedas se formatean por locale, no como cadenas CMS. Las entidades y obligaciones se definen en [CONTENT-MODEL.md](CONTENT-MODEL.md).

## Criterios de aceptación de contenido e interacción

- Cada CTA tiene destino Rxx, ancla declarada o servicio explícitamente pendiente; no publicar un servicio simulado como real.
- Cada cifra tiene unidad, tipo, período, fuente y estado de frescura; `null` se muestra como dato no disponible o se omite de forma consistente.
- Ningún rendimiento, condición, testimonio, fotografía o cifra de Lofty pasa a la marca propia.
- Se puede recorrer header, filtros, paneles, FAQs y formularios por teclado; foco visible, orden coherente y sin trampa.
- A 1440/768/390 px, textos y advertencias siguen presentes; tablas desplazan localmente, nunca todo el viewport.
- Formularios distinguen éxito del envío y aprobación del servicio. No afirmar que una solicitud implica aceptación.
- Datos de riesgos, costos y documentos tienen ubicación en R04/R02 y se alcanzan antes del inicio de cuenta.
- Pruebas propuestas para implementación futura; no se presentan como ya ejecutadas ni como auditoría completa de accesibilidad.

## Pendientes para cerrar estos blueprints

Confirmar rutas activas, servicio a propietarios, existencia de mercado secundario y calculadora; aportar copy aprobado, datos/feeds, documentos, condiciones, canales, fotos con permisos y licencias de fuentes. Hasta entonces los bloques condicionales permanecen desactivados y las afirmaciones sin soporte bloquean publicación.
