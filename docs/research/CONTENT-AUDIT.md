# Auditoría de contenidos — Lofty

## Alcance y trazabilidad

Extracción: 5 de octubre de 2026 (America/Buenos_Aires), 6 de octubre UTC. Síntesis completada al reanudar el 8 de octubre local / 9 UTC. Se conserva la fecha de la evidencia: no se presenta esta entrega como una nueva consulta en vivo.

Se usó Firecrawl map (sitemap incluido, subdominios habilitados, límite 500, sin query params) y scrape en vivo (`maxAge:0`). Se extrajo la homepage completa y exactamente ocho páginas internas. HTML procesado permitió identificar etiquetas; navegador Firecrawl permitió comprobar presencia visual/ocultación y algunos estados. No se completó registro, no se enviaron formularios y no se ejecutaron transacciones. Pulsar Buy como visitante condujo a signup; allí terminó el recorrido.

Referencias LangChain leídas completas: [DESIGN.md](DESIGN.md) (294 líneas) y [design-tokens.css](../../src/assets/css/design-tokens.css) (179 líneas), versión guardada el 6 de octubre. Se usan como contrato visual, conservando sus distinciones entre valores medidos y propuestas. No se ha construido una web.

**O = observado** en scraping/HTML/navegador; **I = inferido** por análisis o propuesta. Los contenidos de las tablas son paráfrasis de la estructura observada. Propósito/público/necesidad son clasificación analítica I, no segmentación empresarial demostrada. Una afirmación publicada por Lofty no es validación independiente ni una condición aplicable a la marca propia.

**Semántica:** etiqueta HTML. **Orden:** secuencia DOM/lectura; los paneles alternativos se separan. **Prominencia:** posición, tamaño o disposición verificados en navegador, no deducidos de Markdown. El resumen sr-only tiene H2 anterior a H1 y existe para asistencia/contexto; no se trata como primer bloque visual. Avisos de cuenta en scraping no aparecieron en el texto visible de la sesión pública: no son incidentes del usuario.

## Inventario de páginas analizadas

| ID | URL | Tipo | Público/propósito (I) | Necesidad (I) |
|---|---|---|---|---|
| L0 | https://www.lofty.ai/ | Homepage | Descubrimiento; visitante que explora inversión inmobiliaria fraccionada | Entender la propuesta y encontrar una propiedad o crear una cuenta |
| L1 | https://www.lofty.ai/how-it-works | Explicación de producto | Educación; potencial inversor con dudas operativas | Entender propiedad, ingresos, negociación, gastos, gestión y requisitos |
| L2 | https://www.lofty.ai/marketplace | Catálogo operativo | Exploración; visitante que compara oportunidades | Encontrar propiedades por preferencias y acceder a sus datos |
| L3 | https://www.lofty.ai/property_deal/14018-Arcadia-Road-NE_Albuquerque-NM-87123 | Detalle de oferta | Evaluación; visitante con una propiedad identificada | Revisar activo, operación, cifras y condiciones antes de iniciar compra |
| L4 | https://www.lofty.ai/reviews | Prueba social y prensa | Validación; visitante que busca experiencias y referencias | Consultar testimonios y credenciales publicadas |
| L5 | https://www.lofty.ai/list-your-property | Captación de propietarios | Propietario que evalúa publicar participación en un inmueble | Comprender el proceso y enviar una solicitud inicial |
| L6 | https://www.lofty.ai/team | Institucional | Visitante que busca identificar a la empresa y responsables | Conocer misión, equipo, respaldo y contacto |
| L7 | https://www.lofty.ai/compare | Hub comparativo editorial | Investigación; visitante que contrasta productos y plataformas | Revisar criterios y acceder a comparaciones específicas |
| L8 | https://www.lofty.ai/signup | Entrada al registro | Visitante que decide abrir una cuenta | Elegir Google o email; acceder si ya tiene cuenta |

S0–S8 designan el scrape/HTML de la página L0–L8 respectivamente. B0: DOM de homepage; B1: FAQ y catálogo; B2: ficha inicial; B3: panel Financials; B4: Order book, Buy y signup; B5: controles/búsqueda de catálogo. Los selectores y etiquetas se dan para volver a localizar evidencia; no son una API estable.

## Mapa general observado

La operación map devolvió 351 URLs, no un censo completo. El índice solo devolvió una ficha de propiedad y dos URLs de comparación; las páginas consultadas enlazan muchas más. Por eso se distingue el índice de las URLs descubiertas por enlaces. `URL-MAP.md` conserva el inventario combinado sin afirmar que cada destino fue consultado.

| Agrupación de rutas | Cantidad en map | Cobertura |
|---|---|---|
| blog | 159 | Solo inventario salvo las páginas L0–L8 |
| glossary | 54 | Solo inventario salvo las páginas L0–L8 |
| landlord-tenant-laws | 52 | Solo inventario salvo las páginas L0–L8 |
| real-estate-investing | 25 | Solo inventario salvo las páginas L0–L8 |
| short-term-rental-laws | 21 | Solo inventario salvo las páginas L0–L8 |
| calculators | 15 | Solo inventario salvo las páginas L0–L8 |
| data | 6 | Solo inventario salvo las páginas L0–L8 |
| marketplace | 2 | Solo inventario salvo las páginas L0–L8 |
| compare | 2 | Solo inventario salvo las páginas L0–L8 |
| property_deal | 1 | Solo inventario salvo las páginas L0–L8 |
| sitemap.xml | 1 | Solo inventario salvo las páginas L0–L8 |
| cookies | 1 | Solo inventario salvo las páginas L0–L8 |
| terms | 1 | Solo inventario salvo las páginas L0–L8 |
| how-it-works | 1 | Solo inventario salvo las páginas L0–L8 |
| [home] | 1 | Solo inventario salvo las páginas L0–L8 |
| refer | 1 | Solo inventario salvo las páginas L0–L8 |
| 1031-exchange-rules-by-state | 1 | Solo inventario salvo las páginas L0–L8 |
| list-your-property | 1 | Solo inventario salvo las páginas L0–L8 |
| reviews | 1 | Solo inventario salvo las páginas L0–L8 |
| privacy | 1 | Solo inventario salvo las páginas L0–L8 |
| team | 1 | Solo inventario salvo las páginas L0–L8 |
| lp-rewards | 1 | Solo inventario salvo las páginas L0–L8 |
| propertymanager | 1 | Solo inventario salvo las páginas L0–L8 |
| llms-full.txt | 1 | Solo inventario salvo las páginas L0–L8 |

Navegación principal observada: inversión→marketplace; empresa→team; aprendizaje→how-it-works; publicar→list-your-property; acceso y alta. Footer amplía los grupos Invest, Company, Resources y Legal. Hay dos grupos expandibles adicionales: ciudades y recursos de inversor.

**T0 — Footer compartido.** Invest: marketplace, lending en amm.lofty.ai y publicación. Company: team, reviews, compare. Resources: how-it-works, real-estate-investing, calculators, blog, refer, tienda externa y contacto. Legal: privacy, cookies, terms; control de privacidad. Ciudades: landing geográfica del catálogo. Recursos adicionales: glosario, datos de mercado, leyes de alquiler, alquiler temporal, reglas fiscales y guías. Divulgaciones: riesgos de pérdida, papel de la plataforma, ausencia de garantía y mecánica monetaria/blockchain declarada por Lofty. No se copian sus términos ni se determina aquí su validez jurídica.

Blog y guías no se recorrieron exhaustivamente. Legal se identificó por enlaces, sin análisis jurídico de sus páginas. No se encontró un hub `/docs` en el mapa obtenido: hay ayuda distribuida, how-it-works, FAQ, recursos legibles por máquinas y una referencia externa a documentación de gobernanza desde una actualización. No se concluye que no exista más documentación.

## Auditoría por página

### L0 — Homepage

URL: https://www.lofty.ai/

| Orden | Sección | Mensaje (paráfrasis) | Contenido y detalle | Jerarquía semántica | CTA / destino | Evidencia O |
|---|---|---|---|---|---|---|
| 0 | Resumen no visual | Contexto de plataforma | Texto sr-only para tecnologías de asistencia/sistemas automáticos; no es hero visible | H2 anterior al H1 | Ninguno | B0: section.sr-only |
| 1 | Header | Entradas a inversión, empresa, explicación y oferta del propietario | Navegación y acceso a cuenta; transversal | nav; enlaces, no headings | Invest→/marketplace; About→/team; Learn→/how-it-works; List Property→/list-your-property; login/signup | B0: header/nav a |
| 2 | Hero y promoción | Participaciones inmobiliarias, ingresos y posibilidad de salida | H1, explicación breve, incentivo de alta, volumen, distribución, valoración social y vista de mercado | H1; métricas no son headings | CTA de alta→/signup | S0+B0: main section 1 |
| 3 | Cinta de mercado | Actividad de activos específicos | Nombre corto, precio por participación y variación; registros repetidos para cinta | Sin heading propio observado | Destino de cada item no comprobado | S0+B0: main section 2 |
| 4 | Prensa | Respaldo por presencia en medios | Extracto atribuido y logos de medios | Sin H2 propio | No CTA principal identificado | S0+B0: main section 3 |
| 5 | Inicio en tres pasos | Registro, compra y cobro | Tres pasos con imagen y copy corto; promesas temporales de la fuente | H2; tres H3 | Explorar→/marketplace | S0+B0: main section 4 |
| 6 | Presentación del fundador | Explicación del mercado por el CEO | Video y presentación de autor | H2 | Equipo→/team; reproducción video no ejecutada | S0+B0: main section 5 |
| 7 | Problema y progresión | Acceso a inmuebles y reinversión | Barreras del mercado tradicional; tres bloques sobre comprar, recibir ingresos y reinvertir | H2; tres H3 | Sin CTA dedicado extraído | S0+B0: main section 6 |
| 8 | Oferta destacada | Hay activos concretos para explorar | Tres propiedades: foto, ubicación, cantidad de inversores y rendimiento promedio | H2; H3 por propiedad | Cada ficha→/property_deal/{slug}; catálogo→/marketplace | S0+B0: main section 7 |
| 9 | Beneficios funcionales | Accesibilidad, ingresos, gestión y control | Cuatro explicaciones breves; gestión profesional y participación en decisiones | H2; cuatro H3 | Comenzar→/signup | S0+B0: main section 8 |
| 10 | Testimonios | Experiencias de usuarios publicadas | Cuatro citas con identidad y plataforma de origen | H2; citas no headings | Reseñas/prensa→/reviews | S0+B0: main section 9 |
| 11 | Dudas antes de comprar | Explicar tiempos, pagos, salida, gestión y revisión previa | Cinco preguntas y respuestas expandibles | H2; summary sin nivel heading | Expansión local | B1: #faq details/summary; primera pregunta false→true |
| 12 | Cierre | Volver a explorar oferta | Mensaje final y promoción reiterada | H2 | Ver propiedades→/marketplace | S0+B0: main section 11 |
| 13 | Footer | Navegación ampliada y condiciones | Grupos, ciudades, recursos, riesgos y términos; ver T0 | H3 por grupo; disclosures en texto | Alta→/signup; enlaces T0 | S0+B0: footer |

Prominencia comprobada: h1 a 72px en viewport desktop; varios H2 a 48px y otros a 36px. Todos son H2 aunque su tamaño difiera. La oferta está después del bloque de problema/progresión; el alta ya aparece en hero. Repetido: incentivo, métricas, promesa de ingresos/salida y alta. Específico: selección de tres propiedades y video. Siguiente paso: cuenta o catálogo; no se verificó eficacia de esa secuencia.

### L1 — Explicación de producto

URL: https://www.lofty.ai/how-it-works

| Orden | Sección | Mensaje (paráfrasis) | Contenido y detalle | Jerarquía semántica | CTA / destino | Evidencia O |
|---|---|---|---|---|---|---|
| 1 | Introducción | Explicar el funcionamiento | Breadcrumb, H1, resumen y métricas | H1 | Breadcrumb→/ | S1: h1 |
| 2 | Tres pasos | Explorar, depositar/comprar, cobrar/vender | Ilustraciones de marketplace, ficha y cartera; detalle intermedio | H2 + H3 por paso | Referencias a acciones de producto, no todas enlaces | S1: primer h2 del contenido |
| 3 | Alternativa tradicional | Contraste de carga operativa | Lista secuencial de 16 tareas de compra/gestión tradicional | H2 + lista | Sin CTA | S1: segundo h2 |
| 4 | Fuentes de ingreso | Alquiler y cambio de valor | Prosa sobre renta, venta de participaciones, venta del activo y recompra | H2 | Sin CTA | S1: bloque ingresos |
| 5 | Órdenes | Distinguir ejecución y precio elegido | Dos tipos de órdenes; menciona comisiones y contraparte | H2 | Sin CTA | S1: bloque negociación |
| 6 | Resumen de condiciones | Concentrar cifras/reglas | Tabla: precio, límites, pagos, tenencia, costos, rendimiento, vehículo y voto | H2 + tabla | Sin CTA | S1: tabla condiciones |
| 7 | Opiniones | Aportar experiencias publicadas | Valoración agregada y cuatro testimonios | H2 | Más reseñas→/reviews | S1: bloque testimonios |
| 8 | Comparación | Diferenciar frente a alternativas | Tabla de mínimos, cobros, salida y propiedad | H2 + tabla | Ampliar→/compare | S1: tabla plataformas |
| 9 | Origen de propiedades | Explicar rol del vendedor | Procedencia, participación retenida y tres fases de publicación | H2 + lista | Publicar→/list-your-property | S1: origen |
| 10 | Derechos y gobernanza | Explicar decisiones del propietario fraccionado | Voto, límites, moción, discusión y plazos | H2 + listas | Sin CTA dedicado | S1: gobernanza |
| 11 | Comunidad | Canal por activo | Actualizaciones, conversación y votación | H2 | Comunidad→/account/community; acceso no recorrido | S1: enlace comunidad |
| 12 | Gestión | Quién opera el inmueble | Responsabilidades, actualizaciones, perfiles y reemplazo del gestor | H2 | Referencia a perfil del gestor/catálogo | S1: gestión |
| 13 | Fondos | Ingreso, saldo y retiro | Métodos y plazos declarados por la fuente | H2 | Acciones de cartera descritas; no ejecutadas | S1: depósitos/retiros |
| 14 | Fiscalidad | Documentos e implicaciones según usuario | Formularios, retenciones, residentes/no residentes; detalle extenso | H2 | Email documental de la fuente; no se envió | S1: impuestos |
| 15 | FAQ | Resolver objeciones específicas | Elegibilidad, mínimo, vehículo, órdenes, responsabilidades, ingresos, salida, comisiones, deuda, impuestos y continuidad | H2; preguntas sin heading confirmado | Filtro sin deuda→/marketplace/noDebt | S1: FAQ |
| 16 | Cierre y footer | Iniciar cuenta o revisar activos | Lista de alta/verificación/fondeo y T0 | H2 cierre; H3 footer | /signup; /marketplace; mailto:support@lofty.ai | S1: cierre |

Progresión: explicación breve→mecanismo económico→condiciones→gobernanza/operación→dudas→alta. Repite beneficios/metrics/testimonios de home y profundiza comisiones, vehículo, impuestos y gestión. No todo este detalle debe permanecer en una única página en la adaptación. Prominencia visual completa no auditada; orden y semántica vienen del HTML.

### L2 — Catálogo operativo

URL: https://www.lofty.ai/marketplace

| Orden | Sección | Mensaje (paráfrasis) | Contenido y detalle | Jerarquía semántica | CTA / destino | Evidencia O |
|---|---|---|---|---|---|---|
| 1 | Identificación y barra operativa | Explorar el mercado | H1 y descripción sr-only; búsqueda, login/signup y selector de tema | H1 no prominente visualmente | Login/signup; logo→/ | B1: h1.sr-only, input[data-marketplace-search-input] |
| 2 | Filtros y controles | Reducir y reorganizar oferta | Mercados, gestores, tipos, flujo de caja, ocupación, recompra, sin hipoteca, favoritos, Filters, orden y grid/list | Controles sin heading | Acciones locales; lógica completa no verificada | S2+B1: button |
| 3 | Métricas transversales | Contexto de plataforma | Volumen, distribuciones, usuarios y rating | Texto, no encabezado | Sin CTA propio | S2 |
| 4 | Resultados | Acceder a cada activo | Fotos, H3 dirección, ubicación, tipo/etiquetas, precio, yield cuando disponible, inversores y valoración en algunas tarjetas | H2 sr-only; H3 por ficha | Ancla→/property_deal/{slug} | S2+B1: h3 y enlaces |
| 5 | Más resultados | Continuar exploración | Botón de más propiedades y listado adicional de enlaces en extracción | H3 del listado adicional | Expandir/cargar; comportamiento no ejecutado | S2: tramo final del catálogo |
| 6 | Estado vacío | Informar ausencia de coincidencias | Búsqueda Albuquerque produjo mensaje sin resultados en sesión; no demuestra ausencia real de activos | Texto de estado | Indicación de ajustar/limpiar filtros | B5: input búsqueda, estado vacío |
| 7 | Footer | Navegación y condiciones | T0 común | H3 de grupos | Destinos T0 | S2 |

El H1/H2 del catálogo son sr-only: su nivel semántico no equivale a protagonismo visual. El visitante ve controles y tarjetas. Varias métricas de tarjeta faltan en algunos activos; no son campos universalmente poblados. La búsqueda probada produjo estado vacío, sin demostrar que no hubiera inmuebles en esa ciudad. Contenido específico: oferta y controles; transversal: métricas/footer. No se validó lógica de todos los filtros, sorting o favoritos.

### L3 — Detalle de oferta

URL: https://www.lofty.ai/property_deal/14018-Arcadia-Road-NE_Albuquerque-NM-87123

| Orden | Sección | Mensaje (paráfrasis) | Contenido y detalle | Jerarquía semántica | CTA / destino | Evidencia O |
|---|---|---|---|---|---|---|
| 1 | Cabecera del activo | Identificar la propiedad | Galería, tipo, enlace a alojamiento, dirección, ciudad, camas/baños/superficie y rating | H1 dirección; H4 ubicación | Ver fotos; enlace externo alojamiento | S3+B2: h1, h4 |
| 2 | Serie y navegación interna | Explorar precio/rendimiento y detalle | Price/Yield, rangos temporales; pestañas Details/Financials/Order book | Controles, no headings | Cambiar panel local | B2: button[role=tab] |
| 3 | Details: gestor/comunidad | Identificar operador y conversación | Avatar/nombre/enlaces antes del texto del inmueble | Enlaces, sin heading propio | /propertymanager/tristan-huerta; /account/community/{id} | S3 |
| 4 | Details: descripción | Explicar uso y características | Texto extenso del inmueble y servicios | H3 | Sin CTA | S3: primer H3 de ficha |
| 5 | Details: gestión | Identificar experiencia del operador | Nombre y biografía | H3 | Perfil gestor anterior | S3 |
| 6 | Details: oferta | Desglosar valor y estructura | Valor, equity, deuda, cierre, formación del vehículo y reserva; aclaraciones | H3 + pares etiqueta/valor | Referencia textual a documentos; enlace no recuperado | S3 |
| 7 | Details: entorno | Ubicar y contextualizar | Ciudad, mapa externo y prosa local | H3 | Maps externo | S3 |
| 8 | Details: novedades | Mostrar hechos recientes | Actualización fechada con decisión de gobierno y referencia externa | H3 | Expandir otra actualización; evidencia externa no recorrida | S3 |
| 9 | Details: reseñas | Experiencias del activo | Rating, texto, fecha, tenencias del autor y más reseñas | H3 | Expandir; enlaces externos de cuenta | S3 |
| 10 | Details: dudas/ayuda | Relacionar ficha con explicación general | FAQ sobre ingreso, deuda, decisiones y comunidad | H3 FAQ y H3 ayuda | /how-it-works | S3 |
| 11 | Financials: supuestos | Distinguir renta/apreciación | Modelo de retorno, ingreso/gasto mensual y referencia histórica; etiquetas/cifras no siempre coherentes entre bloques | Headings del panel no relevados exhaustivamente | Cambiar supuestos/reset | B3: Financials activada |
| 12 | Financials: simulador | Explorar escenario hipotético | Monto, yield, apreciación, presets, horizonte, resultado y gráfico; aviso metodológico | Panel dinámico; nivel pendiente | Inputs locales; no se validaron fórmulas | B3 |
| 13 | Financials: detalle | Desglose numérico | Oferta, returns y estado mensual por rubro | Panel dinámico; nivel pendiente | Sin CTA dedicado | B3 |
| 14 | Order book | Revisar mercado y ejecución | Último trade, estimación, participaciones, spread, asks/bids y operaciones completadas | Panel dinámico; nivel pendiente | Ver rango/más órdenes; no accionados | B4: Order book activada |
| 15 | Resumen de operación | Iniciar compra o venta | Precio, incentivo, yield promedio/actual y comparación de valor; bloque paralelo al contenido, no secuencia después de todo | No heading confirmado | Buy→/signup observado; Sell no accionado | B4: botón Buy |
| 16 | Footer | Navegación y divulgaciones | T0 | H3 | Destinos T0 | S3 |

La ficha usa H4 para localidad y H3 para secciones sin H2 intermedio visible en Details. No copiar esos saltos. El resumen de compra es paralelo al contenido; Financials y Order book son ramas, no bloques consecutivos visibles. Retornos, precio negociado, mejor oferta y valor estimado son conceptos distintos. Específico: activo, gestor, mercado y novedades; transversal: FAQ/registro/footer. Buy terminó en /signup; sesión autenticada fuera de alcance.

### L4 — Prueba social y prensa

URL: https://www.lofty.ai/reviews

| Orden | Sección | Mensaje (paráfrasis) | Contenido y detalle | Jerarquía semántica | CTA / destino | Evidencia O |
|---|---|---|---|---|---|---|
| 1 | Introducción | Prueba social agregada | H1, resumen, ratings, CTA, cifras y medios | H1 | /signup; #wall-of-love | S4 |
| 2 | Historias destacadas | Experiencias identificadas | Cuatro retratos, citas, nombres y funciones | H2 | Sin CTA principal propio | S4: primer H2 visible |
| 3 | Muro de reseñas | Ampliar voces de usuarios | Colección de citas con nombre/plataforma; control para mostrar 48 | H2; blockquote | Mostrar todas; no probado | S4: #wall-of-love |
| 4 | Prensa | Presencia mediática | Logos y cita adicional | H2 | Destinos externos no inspeccionados | S4 |
| 5 | Cierre/footer | Pasar a registro o institución | Copy final y T0 | H2; H3 footer | /signup; /team | S4 |

Testimonios publicados son evidencia de contenido, no prueba representativa de satisfacción o resultados. El scraping recupera 48 reseñas aunque existe un control de expansión; cantidad inicialmente visible no verificada. Repite algunas voces de home/how-it-works. Identidades, citas, empleadores y cifras no se trasladan a la nueva marca. Layout completo no medido.

### L5 — Captación de propietarios

URL: https://www.lofty.ai/list-your-property

| Orden | Sección | Mensaje (paráfrasis) | Contenido y detalle | Jerarquía semántica | CTA / destino | Evidencia O |
|---|---|---|---|---|---|---|
| 1 | Propuesta a propietarios | Vender una parte del inmueble | H1, métricas, CTA y prensa | H1 | Submit your property: acción interna hacia formulario; destino exacto no verificado | S5 |
| 2 | Proceso | Explicar pasos y condiciones | Inspección/tasación, transferencia a vehículo, fraccionamiento, venta; comisión, renta retenida y retiro | H2 + cuatro H3 | CTA de solicitud repetido | S5 |
| 3 | Casos de propietarios | Mostrar operaciones descritas por la empresa | Métricas y tres casos con persona, tipo y resultado | H2 | Sin CTA dedicado | S5 |
| 4 | Tipos admitidos | Delimitar oferta | Categorías de inmueble y mención de préstamos existentes | Texto destacado; no H2 propio | Sin CTA | S5 |
| 5 | Encaje | Calificar al propietario | Tres condiciones narrativas sobre equity, efectivo y copropiedad | H2 + lista | Sin CTA | S5 |
| 6 | FAQ | Resolver costos, deuda y control | Nueve dudas sobre tarifas, impuestos, hipoteca, alternativas, renta, elegibilidad, plazo y recompra | H2; preguntas sin heading confirmado | Expansión no probada | S5 |
| 7 | Formulario | Solicitar contacto para evaluar inmueble | Dirección, nombre, email, teléfono, tipo y ocupación required; nota opcional; campo antispam separado | H2 + labels/input/select/textarea | Submit; no enviado | S5: #lead-address, #lead-name, #lead-email, #lead-phone, #lead-type, #lead-occupancy |
| 8 | Footer | Navegación y condiciones | T0 | H3 | Destinos T0 | S5 |

Recorrido de propietario distinto del de inversor: oferta→proceso→casos→encaje→FAQ→lead. Seis campos required en HTML y nota opcional; antispam no es dato de negocio. Se comprobó estructura del formulario, no su validación ni respuesta del servidor. Repite métricas y prensa; proceso, tipos, casos y solicitud son específicos.

### L6 — Institucional

URL: https://www.lofty.ai/team

| Orden | Sección | Mensaje (paráfrasis) | Contenido y detalle | Jerarquía semántica | CTA / destino | Evidencia O |
|---|---|---|---|---|---|---|
| 1 | Misión | Presentar empresa y producto | H1, fotografía de fundadores y tres beneficios | H1 | Sin CTA dedicado | S6 |
| 2 | Escala | Datos declarados por empresa | Cuatro métricas | H2 | Sin CTA | S6 |
| 3 | Respaldo | Identificar inversores institucionales | Logos de cinco organizaciones | H2 | No comprobado | S6 |
| 4 | Prensa | Referencias mediáticas | Bloque de medios; texto extraído limitado | H2 | No comprobado | S6 |
| 5 | Origen | Explicar motivación del fundador | Retrato, rol y relato en cita | H2 | Sin CTA | S6 |
| 6 | Equipo ejecutivo | Asignar responsables | Tres miembros, retrato, cargo y biografía | H2 + H3 por persona | Sin CTA | S6 |
| 7 | Contacto/footer | Canal humano y catálogo | Email, CTA y T0 | H2; H3 footer | mailto:support@lofty.ai; /marketplace | S6 |

La confianza se construye editorialmente con relato, responsables, respaldos y contacto. No se verificaron afiliaciones o métricas externas. Tres H3 identifican personas dentro del H2 de equipo. Repite producto/métricas; biografías y relato son específicos. Siguiente paso disponible: email o marketplace.

### L7 — Hub comparativo editorial

URL: https://www.lofty.ai/compare

| Orden | Sección | Mensaje (paráfrasis) | Contenido y detalle | Jerarquía semántica | CTA / destino | Evidencia O |
|---|---|---|---|---|---|---|
| 1 | Introducción | Comparar plataformas | Fecha editorial, H1 y dimensiones de comparación | H1 | Sin CTA principal separado | S7 |
| 2 | Resumen por objetivo | Clasificar alternativas | Tres casos de uso y plataforma destacada por caso; criterio editorial de Lofty | H2 + H3 por plataforma | /compare/{plataforma} | S7 |
| 3 | Directorio de reseñas | Acceder a análisis individual | Logos, estados de plataformas y enlaces a 18 entradas | H2 | /compare/{plataforma} | S7 |
| 4 | Tabla comparativa | Comparar criterios homogéneos | Plataforma, encaje, mínimo, cobro y liquidez | H2 + tabla | Detalle individual | S7 |
| 5 | Comparador de pares | Seleccionar alternativas | Dos selects, botón, comparación triple destacada y listas de pares | H2; H3 selector y grupos | /compare/{par}; botón no ejecutado | S7 |
| 6 | Metodología | Explicitar criterio y conflicto de interés | Fuentes/criterios editoriales y reconocimiento de autopromoción | H2 | Referencias; no se validaron terceros | S7 |
| 7 | FAQ | Resolver diferencias generales | Objetivo, mínimo, frecuencia y liquidez | H2 | Expansión no probada | S7 |
| 8 | Cierre/footer | Dirigir a producto propio | CTA de catálogo/registro y T0 | H2; H3 footer | /marketplace; /signup | S7 |

Clasificación/recomendaciones son afirmaciones editoriales de Lofty, no conclusiones de esta auditoría. El sitio reconoce su conflicto de interés. Tabla rápida precede comparación detallada; selector y listas de pares conducen a rutas /compare/*. No se recorrieron esos artículos ni se validaron afirmaciones sobre competidores. Contenido específico: dimensiones, metodología y comparativas.

### L8 — Entrada al registro

URL: https://www.lofty.ai/signup

| Orden | Sección | Mensaje (paráfrasis) | Contenido y detalle | Jerarquía semántica | CTA / destino | Evidencia O |
|---|---|---|---|---|---|---|
| 1 | Panel de contexto | Reiterar producto y confianza | Beneficios, promoción y métricas en lateral desktop | H2 antes del H1 en DOM; secundario funcionalmente | Sin CTA propio | S8+B4: panel lateral |
| 2 | Registro | Elegir método de entrada | H1, promoción, Google, separador, email y continuación | H1; labels y controles | Google o continuar email; no accionados | B4: input[type=email] visible |
| 3 | Cuenta existente y términos | Acceder o consultar condiciones | Login y consentimiento textual con enlaces | Texto, no encabezado | /login; /terms; /privacy | S8+B4 |
| 4 | Contenido auxiliar oculto | Widget de referidos inactivo | Scrape incluye reglas/formulario de referidos; browser reportó dimensiones 0×0 | H3/H2 ocultos; excluidos del recorrido visible | No accionado; no trasladar a alta | B4: headings GrowSurf con w=0/h=0 |

En desktop, el H2 lateral precede en DOM al H1 del formulario: el primer heading no es la acción principal. El formulario visible presenta un email; los campos de referidos del scrape pertenecen a widget oculto confirmado con cajas 0×0. No se deduce alta multipaso ni requisitos posteriores desde esos campos. Repite beneficios y prueba social; Google/email y enlaces legales son específicos de la entrada.

## Lectura transversal: hallazgos y recomendaciones separados

| Hallazgo observado | Necesidad inferida | Decisión propuesta |
|---|---|---|
| Promesa y alta aparecen antes del detalle; catálogo es público | Entender rápido y poder explorar sin cuenta | Home resume; catálogo/ficha siguen públicos; cuenta al continuar |
| How-it-works concentra muchas condiciones | Comprender derechos y funcionamiento | Separar explicación, costos/riesgos y ayuda enlazada |
| Promesas de salida conviven con libro de órdenes y condiciones de matching | Distinguir publicar una orden de ejecutar una venta | Explicar mecanismo y límites cerca del CTA; no prometer liquidez universal |
| La ficha distingue promedio histórico, rendimiento actual y proyecciones | Comparar magnitudes homogéneas | Cada métrica exige tipo, período, fecha, método y fuente |
| Updates y reseñas incluyen información adversa | Revisar situación reciente del activo | Novedades relevantes deben verse antes de iniciar operación |
| Prensa/métricas/testimonios se repiten | Consultar evidencia sobre empresa | Una fuente de contenido compartida; no duplicar números manualmente |
| Proceso del vendedor tiene formulario y condiciones propios | Evaluar aporte de oferta | Ruta de propietarios independiente y condicional al negocio |
| Footer contiene grupos extensos de captación orgánica | Profundizar por tema/lugar | Mantener solo taxonomías y mercados con contenido real |

### Inconsistencias y datos no conciliados

La ficha inspeccionada mostró diferencias entre superficie resumida y descripción, y entre presentación del flujo mensual y tabla de operaciones. El rendimiento del catálogo también cambió entre extracciones. No se corrigieron ni eligieron cifras como verdad: pueden provenir de fuentes, estados o momentos diferentes. El contenido menciona documentos de due diligence, pero no se obtuvo un enlace público utilizable desde el panel inspeccionado. La actualización de gobernanza remite a un mecanismo específico de copropiedad: no basta con extrapolar la explicación general de voto.

Estas observaciones justifican campos de procedencia, fecha, definición y validación en [CONTENT-MODEL.md](../spec/CONTENT-MODEL.md). No constituyen auditoría financiera ni jurídica de Lofty.

### Límites

Una ficha no representa todos los activos, estados ni vehículos. Se analizaron nueve URLs; no se abrieron perfiles de gestores, comunidad, login, artículos, legales ni sitios externos como páginas adicionales. Se identificaron destinos. FAQs: expansión comprobada en home; no todas las preguntas en todas las páginas. Financials/Order book y redirección Buy comprobados; no órdenes ni pagos. Filtros: controles identificados y click ejecutado tras reintentos, pero contenido completo del panel y aplicación de cada criterio no quedaron verificados. Registro: no se continuó con email/Google. No hubo auditoría mobile de Lofty; la adaptación responsive procede del contrato LangChain y propuestas explícitas.

Al final de la extracción el cierre de sesión de Firecrawl no pudo confirmarse: la revisión automática falló por límite de uso. No se eludió el control. No afecta a los datos ya recuperados, pero se registra la limitación operativa.

## Información del negocio pendiente

Identidad y responsable; modelo jurídico/económico; jurisdicciones y elegibilidad; derechos adquiridos; oferta inicial; datos verificables por activo; costos; reglas de distribución/salida; gestor y rendición de cuentas; riesgos/documentos; métodos de pago; requisitos de alta; canales de ayuda; evidencia de confianza autorizada; política editorial y actualización. La lista accionable se desarrolla al cierre de [INFORMATION-ARCHITECTURE.md](../spec/INFORMATION-ARCHITECTURE.md).
