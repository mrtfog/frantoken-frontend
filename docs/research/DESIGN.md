# Especificación de diseño — referencia LangChain

## 1. Alcance, fuentes y método

**Destino:** una web propia en React, TypeScript y Tailwind CSS. Este documento especifica patrones; no contiene una implementación de la web. Identidad, textos, métricas comerciales y recursos de LangChain deben sustituirse.

**Fecha:** 5 de octubre de 2026, America/Buenos_Aires; ejecución del 6 de octubre UTC. El contenido y las campañas pueden cambiar.

| Página | Alcance | Motivo |
|---|---|---|
| https://www.langchain.com/ | Homepage completa, desde anuncio hasta footer | Sistema visual, composición, navegación, etapas, tarjetas, carrusel y newsletter |
| https://www.langchain.com/pricing | Contenido completo; muestras de DOM, responsive y controles | Añade planes, calculadora, comparativa y FAQ |
| https://www.langchain.com/contact-sales | DOM del formulario y composición en tres anchos | Añade formulario por etapas y campos etiquetados |

No se consultaron documentación, blog ni aplicaciones externas. Los enlaces a esos destinos solo se inventariaron desde las páginas permitidas. No se enviaron formularios, completaron registros ni abrieron aplicaciones del producto.

La skill `firecrawl-website-design-clone` no figuraba entre las disponibles. Se usó la skill `firecrawl` y sus operaciones `scrape` e `interact`. Scraping en vivo con `maxAge: 0`; homepage con Markdown, enlaces, branding y captura completa. Se inspeccionó DOM mediante Playwright, `getComputedStyle`, `getBoundingClientRect`, atributos y CSS accesible. La primera inspección mediante prompt agotó el timeout; las llamadas posteriores con código funcionaron. El scrape de contacto falló; se recuperó la página mediante navegador.

**Viewports probados:** 1440 × 1000, 768 × 1000 y 390 × 1000 CSS px. En la sesión de medición había una barra de desplazamiento de 15 px: los anchos efectivos de body fueron 1425, 753 y 375 px. No corregir artificialmente los componentes para compensarla. Las capturas provienen de sesiones de scrape independientes y pueden diferir en unos píxeles, campaña visible y progreso de animación.

Se esperó `document.fonts.ready` y se recorrió la homepage en incrementos de 850 px para activar contenido diferido, regresando al inicio para medir. `document.fonts.status` devolvió `loaded` en los tres anchos. Una comprobación posterior encontró 93 de 101 imágenes con carga completa y dimensiones positivas; **no se da por comprobada la carga de todas las variantes del hero**. Las capturas completas no son una reproducción temporal del scroll: el espacio vacío del bloque sticky y los paneles atenuados son limitaciones de esta representación.

### Convención de evidencia

- **Medido:** valor obtenido del DOM, CSS computado, atributo o cálculo reproducible. Un estilo computado no demuestra por sí solo qué glifo se renderizó ni que el elemento estuviera visible.
- **Observado:** contenido o cambio visto en scraping, captura o interacción ejecutada.
- **Inferido:** recomendación, adaptación para la marca propia o aproximación sin valor fuente verificado.

[EVIDENCE.md](EVIDENCE.md) contiene la tabla trazable. `evidence/home-1440.png`, `home-768.png` y `home-390.png` están en el ZIP adjunto. Las referencias de selector son del sitio fuente, no nombres obligatorios de la implementación.

## 2. Principios visuales concretos

1. **Alternar superficies por capítulo.** Hero y ciclo de producto sobre casi negro; frameworks, clientes y métricas sobre azul muy pálido; cierre y footer oscuros. No convertir todo el sitio en tarjetas oscuras iguales. [E01–E04]
2. **Jerarquía por escala y peso ligero.** Títulos TWK Lausanne a peso CSS 300, tracking negativo y línea compacta. Etiquetas y controles Aeonik Mono a 14–16 px. El cuerpo editorial usa también Lausanne; no heredar Aeonik para toda la prosa. [E05–E08]
3. **Acento celeste con roles distintos.** Celeste saturado para énfasis y explicaciones del ciclo; celeste casi blanco para CTA principal; azul grisáceo para contornos. El `textPrimary` oscuro devuelto por branding no describe el texto sobre la homepage oscura. Se prioriza el CSS computado. [E01–E04, E09]
4. **Contenedores anchos y ritmo desigual deliberado.** Márgenes fluidos en desktop; 24 px en tablet y 16 px en móvil para contenido general. El bloque del ciclo mantiene sus propios 24 px. Separaciones mayores entre capítulos que entre piezas de una tarjeta. [E10–E13]
5. **Gráficos dentro de superficies, no decoración indiscriminada.** Diagramas rectangulares azul oscuro en frameworks; capturas de producto en el ciclo; hero con collage de personajes y objetos. Las imágenes de producto son evidencia visual del servicio, mientras que el collage es identidad de campaña. [A01–A06]
6. **Bordes antes que sombras.** Botones de radio 6 px y tarjetas de clientes de 16 px; sombras `none` en las muestras de botón, input y envolvente de tarjeta. Los brillos que ya aparecen dentro de las imágenes no son tokens de sombra de interfaz. [E09, E14]

## 3. Tokens de diseño

El archivo [design-tokens.css](../../src/assets/css/design-tokens.css) contiene valores fuente, aliases semánticos y un bloque aparte de propuestas. Los nombres semánticos son una adaptación; los valores etiquetados como medidos sí proceden del sitio. No se inventa una escala universal de espaciado a partir del `baseUnit: 4` estimado por branding.

### Colores verificados

| Rol reutilizable | Valor | Aplicación y evidencia |
|---|---|---|
| Fondo oscuro base | `#030710` | body, footer; E01 |
| Fondo oscuro del ciclo | `#05070B` | `.aadl_wrapper`; E02 |
| Fondo claro | `#F2FAFF` | frameworks y casos; E03 |
| Texto sobre oscuro | `#CCE9FF` | body, enlaces y controles; E01 |
| Título claro / CTA claro | `#E5F4FF` | hero y botón principal; E04, E09 |
| Énfasis celeste | `#7FC8FF` | título y lead del ciclo; E02, E08 |
| Texto del ciclo | `#E8EDF5` | etapa y lista; E02 |
| Texto sobre claro / CTA inverso | `#030710` | frameworks/casos; E03 |
| Contorno de botón secundario | `#2F4B68` | borde de 1 px; E09 |
| Contorno de navegación | `#262C36` | borde de 1 px; E10 |
| Contorno de input | `rgba(224,239,254,.16)` | sobre fondo oscuro; E14 |

No reutilizar colores de éxito, error o advertencia: sus estados no fueron activados ni medidos.

### Tipografía

| Uso | Familia CSS | Peso | 1440 px | 768 px | 390 px |
|---|---|---:|---|---|---|
| Hero h1 | Twklausanne | 300 | 64 / 70.4 px, −1.92 px | igual | 40 / 48 px, −1.2 px |
| Encabezado del ciclo | Twklausanne | 300 | 56 / 61.6 px, −0.84 px | 32 / 35.2 px | 28 / 30.8 px |
| Nombre de etapa | Twklausanne | 300 | 48 / 50.4 px, −0.96 px | 40 / 42 px | 24 / 25.2 px |
| Lead de etapa | Twklausanne | no medido | 24 / 34.8 px | no medido | no medido |
| Body base | Aeonik | 400 | 16 / 24 px | igual | igual |
| CTA | Aeonik | 400 | 14 / 14 px | 14 / 14 px | 14 / 14 px |
| Título pricing | Twklausanne | no medido aquí | 72 px | 72 px | 48 px |
| Título contacto | Twklausanne | no medido aquí | 56 px | 56 px | 32 px |

Formato: tamaño / interlineado; el tracking del ciclo es −0.015em y el de etapa −0.02em según las muestras. No usar `h1 = 64px` globalmente: pricing tiene otra escala. El branding de pricing devolvió 81 px, discrepante con 72 px medidos en el viewport controlado; se descarta 81 px para esta especificación.

El CSS declara `Twklausanne` con archivos TWKLausanne-250.otf asignado a peso 300, TWKLausanne-500.otf a 500 y TWKLausanne-700.otf a 700. Declara `Aeonik` con `aeonikmono-regular.otf` a 400 y un archivo `AeonikMonoProTRIAL-Light.otf` a 300. Los nombres internos no equivalen necesariamente al nombre comercial. No copiar ni hotlinkear fuentes: verificar licencia o sustituirlas. La propuesta de fallback está separada en los tokens y cambia la métrica; requiere revisión visual.

### Geometría

| Elemento | Valor comprobado |
|---|---|
| Contenedor general | `max-width: 1416px`; 1339.5 px efectivos en desktop |
| Contenedor nav | `max-width: 1456px`; borde 1 px, radio 6 px |
| Gutter desktop | 42.75 px sobre body de 1425 px: equivale a 3% en esta muestra; usar 3% es una generalización inferida |
| Gutter tablet / móvil | 24 / 16 px observado en tarjetas |
| Grid frameworks | 3 × 430.5 px con gap 24 px en desktop; una columna en tablet y móvil |
| Footer desktop | 4 × 304.875 px con gap 40 px |
| CTA | altura 48 px; padding 12px 24px desktop, 12px 16px móvil; radio 6 px |
| Input | altura 44 px; padding 8px 18px; radio 6 px |
| Tarjeta cliente | radio 16 px, envolvente con padding 1 px |
| Bloque frameworks desktop | padding vertical 200 px arriba y 100 px abajo |

No construir una escala de elevación: las muestras examinadas no la justifican. Para iconos reutilizables emplear SVG propios de trazo consistente; mantener flechas de salida, chevrons y controles de carrusel. El tamaño general de iconografía no se midió: la propuesta de 16 px solo aplica a iconos de control nuevos.

## 4. Layout y composición por sección

### Orden de homepage

| Orden | Sección | Composición observada | Regla para implementar |
|---:|---|---|---|
| 1 | Anuncio | Franja azul superior con evento y enlace | Slot opcional de texto corto y un enlace; no copiar evento ni fecha |
| 2 | Navegación | Logo izquierda, categorías centro, CTA doble derecha; caja con contorno | `SiteHeader` con navegación desktop y disclosure móvil; sticky a 8 px en desktop |
| 3 | Hero de campaña | Título y sublínea centrados, dos CTA, collage detrás; logos debajo | Capas: imagen decorativa, overlay, contenido legible; título como único h1 |
| 4 | Ciclo de producto | Título centrado; rueda parcial izquierda, copy central, visual derecha en desktop | Seis etapas con contenido y enlaces independientes; versión vertical para ancho menor |
| 5 | Frameworks | Fondo claro; título izquierda y descripción derecha, después tres tarjetas | Intro dividida y grid de tres; una columna en tablet/móvil |
| 6 | Casos de clientes | Título, CTA de colección, carrusel con logos y resultados | Enlaces de tarjeta completos, navegación previa/siguiente y paginación |
| 7 | Métricas | Encabezado amplio y tres cifras con etiquetas pequeñas | Reemplazar cifras; tres columnas desktop, apilado observado a 768 y 390 |
| 8 | CTA final | Fondo oscuro; red de puntos ilustrada izquierda y texto/CTA derecha | Ilustración decorativa independiente; en tablet/móvil encima del texto |
| 9 | Footer | Cuatro columnas; newsletter; logotipo grande delineado; estado/legal | Tres grupos de enlaces + formulario; 4→2→1 columnas observadas |

Los nombres comerciales y las cifras fuente son contenido de referencia, no afirmaciones sobre la marca propia. No incluir métricas inventadas para rellenar tarjetas.

### Proporciones y ritmo

Hero desktop: h1 de unos 690 px de ancho, wrapper con máximo 800 px y padding superior 78 px. En la muestra el hero ocupa unos 747 px desde y=126; en móvil unos 728 px desde y=138. Son resultados de contenido/campaña, **no alturas universales**. El h1 móvil ocupa 144 px de alto; no forzar una sola línea. Los CTA se mantienen próximos al encabezado, y las imágenes llenan el fondo inferior.

Ciclo desktop: `.aadl_body` mide tres tracks de unos 436.6 px con separación horizontal de 57.6 px; la rueda se recorta hacia el borde izquierdo y la imagen hacia el derecho. `.aadl_pin` es sticky con top 0. `.aadl_wrapper` midió 2500 px de alto con viewport de 1000 px: no copiar ese alto como constante independiente del comportamiento. El copy limita su lead a 416 px. En tablet/móvil, cada etapa precede su imagen; la región crece por contenido, no por un espaciador vacío.

Frameworks: desktop ocupa unos 1017 px incluyendo el generoso padding de 200/100. Las tarjetas no son paneles con fondo propio: imagen oscura rectangular, marca/icono, título, descripción y enlace sobre la superficie clara. El contenido tiene padding horizontal interno de 8 px. En móvil, la primera tarjeta mide 343 px de ancho y unos 410 px de alto; las siguientes comienzan 506 px más abajo, equivalente a separación de 96 px en esa muestra.

Clientes: carrusel desktop desplazado hacia la derecha de una guía vertical decorativa; primera tarjeta medida de 369.33 × 395.63 px. A 390 px, tarjeta de 343 × 258.78 px. No fijar ambas alturas: el tamaño final depende de texto y ancho. En móvil se ve una tarjeta y el CTA de colección aparece debajo; a 768 px se ven dos tarjetas. El carrusel no debe producir overflow de toda la página.

CTA final: en desktop ocupa unos 448 px de alto y separa arte/texto; en móvil unos 720 px por apilamiento. Footer: unos 675 px desktop y 1480 px móvil en la muestra. Son referencias de composición, no restricciones de contenido.

### Páginas adicionales

**Pricing:** superficie clara; intro centrada, tres planes con precio/CTA/lista, bloque para startups, calculadora, comparativa extensa, FAQ por categorías y CTA final. El patrón nuevo es la combinación de decisión resumida y detalle progresivo. La calculadora muestra productos seleccionables, range de trazas, stepper de asientos, subtotal y total. Se comprobó el incremento 1→2 del stepper, no la corrección financiera de todas sus fórmulas. No trasladar precios ni reglas de facturación al proyecto propio.

**Contacto:** intro y señales de confianza a la izquierda, formulario a la derecha a 1440 px; a 768 px el formulario queda después de la intro. Nombre y apellido comparten fila en desktop/tablet (235.875 y 295.5 px por campo en las muestras) y se apilan a 390 px. El primer paso contiene nombre, apellido, email laboral y mensaje; inputs de 44 px, textarea de 100 px. El DOM contiene un segundo paso oculto con cargo, empresa, tamaño y sede. **No se accionó Continue:** transición, validación, errores y éxito no verificados. El estado de éxito presente en DOM no prueba un envío real.

## 5. Catálogo de componentes React

Los nombres y responsabilidades siguientes son **propuestas de implementación**. El estilo se apoya en las mediciones; la API React no procede del sitio.

| Componente | Anatomía / variantes | Dimensiones y responsive | Estado / responsabilidad |
|---|---|---|---|
| `AnnouncementBar` | Texto + enlace; opcional | Full width; permitir wrap móvil | Solo comunicación; dato de campaña reemplazable |
| `SiteHeader` | Logo, `NavDisclosure`, links, `ActionLink` | Contenedor 1456 máx.; radio 6; sticky 8 desktop | Gestionar menú abierto y cierre; no mezclar con navegación del ciclo |
| `NavDisclosure` | Trigger, chevron, panel agrupado; productos/aprendizaje/empresa | Mega menú en desktop; lista vertical en móvil | Trigger nativo button, aria-expanded y aria-controls propuestos |
| `ActionLink` | Texto, flecha opcional; solid/outline/inverse | 48 alto; padding 12×24, móvil 12×16; radio 6 | Navega con `<a>`; no usar button para cambiar de URL |
| `ActionButton` | Mismas variantes visuales | Igual que ActionLink | Acciones locales; type=button salvo submit explícito |
| `CampaignHero` | h1, sublínea, CTA group, capas decorativas | Escala 64→40; imágenes con variantes mobile | Mantener texto accesible independiente del arte |
| `LogoWall` | Lista de logos/enlaces opcionales | Filas compactas; conservar proporción | Duplicados animados fuera del árbol accesible, propuesta |
| `LifecycleSection` | Título, navegación, seis `LifecycleStage` | Desktop rueda/copy/visual; <=991 vertical propuesto a partir de rangos encontrados | Estado `activeId`; scroll y selección sincronizados |
| `LifecycleStage` | Título, lead, lista, chips y visual | Lead max 416 desktop; imagen inline móvil | Datos y vista separados; no duplicar contenido anunciado por lector |
| `ProductChip` | Texto + flecha | 14/14 px, 10.08×16 px, gap 8, borde 1, radio 6 | Enlace al detalle de producto |
| `FrameworkCard` | Diagrama, icono/marca, título, descripción, enlace | Grid 3→1; gap desktop 24; padding texto 8 | Una sola ancla por tarjeta, sin anclas anidadas |
| `CustomerCarousel` | Track, tarjetas, puntos, prev/next | 3 parciales desktop, 2 tablet, 1 móvil observados | Índice activo; deshabilitar o circular según política propia explícita |
| `CustomerCard` | Logo, resultado, enlace | Radio 16; contenido variable | Reemplazar prueba social; no prometer resultados extrapolados |
| `MetricGroup` | Cifra + etiqueta, tres items | Columnas→stack | Datos reales; evitar contadores animados no necesarios |
| `ClosingCTA` | Arte, título, copy, CTA group | 2 columnas→stack; botones full width móvil observados | Repetir destino principal/secundario |
| `SiteFooter` | Grupos, newsletter, marca, legal/status | 4→2→1 columnas; gap desktop 40 | Agrupar enlaces con títulos; status propio o suprimir |
| `FormField` | Label, control, ayuda/error | 44 alto; radio 6; input 8×18; textarea 18 | id/htmlFor, required y error asociados; propuesta accesible |
| `SalesForm` | Primer paso y segundo paso | Nombres en fila salvo móvil | Estado local tipado; backend y éxito fuera del alcance actual |
| `PlanCard` | Nombre, precio, CTA, lista | Medidas exactas de tarjeta no verificadas | Propuesta: grid adaptable de 3→1, altura por contenido |
| `UsageEstimator` | Selección, range, stepper, desglose | Geometría detallada no medida | Reducer puro para selección/cantidades; fórmulas del dominio propio |
| `ComparisonTable` | Cabecera, categorías, filas/valores | Responsive de tabla pendiente | Propuesta: scroll horizontal local y primera columna legible |
| `FAQItem` | Pregunta, icono, respuesta | Padding vertical 24 desktop, 16 tablet/móvil | Fuente expande 0→260.75 px en primera respuesta; usar button o details accesible |

### Estados visuales

- CTA principal: fondo `#E5F4FF`, texto `#030710`, sin borde ni sombra. CTA outline: transparente, texto `#CCE9FF`, borde `#2F4B68`. CTA inverso en claro: fondo oscuro y texto celeste. Hover del CTA muestreado **no cambió el background ni el color**; no inventar un hover de relleno. La transición declarada sí es 0.3s ease.
- Foco: se observó outline sólido de 3 px `#CCE9FF` al navegar con Tab hasta Products. No se auditó el foco de todos los componentes. Propuesta: ring explícito de 3 px y offset de 3 px con color contrastante según superficie.
- Disabled/loading/error: no medidos. Definirlos para la marca propia, no atribuirlos a LangChain.
- FAQ: altura inicial 0; al hacer click aparece la respuesta. Duración y easing efectivos de la expansión no medidos; no inferirlos de la transición de los botones.

## 6. Interacciones y responsive

### Interacciones comprobadas y límites

| Patrón | Resultado |
|---|---|
| Header sticky | CSS `position: sticky; top: 8px` en desktop; seguimiento durante todo el scroll no auditado por vídeo |
| Productos desktop | Hover cambió aria-expanded a true; al salir con puntero y Escape acabó false |
| Escape bajo hover | Una lectura inmediata quedó true; no concluir soporte perfecto del cierre sin retirar el puntero |
| Menú móvil | Abrió con aria-expanded=true en carga nueva; falló después de varias redimensiones; cierre/focus trap móviles pendientes |
| CTA hover | Color/fondo iguales antes y después de 400 ms; transición 300 ms ease declarada |
| Carrusel | Botón siguiente cambió la tarjeta activa de Klarna a Monday; límites, swipe y autoplay pendientes |
| Ciclo | Sticky, seis paneles y enlaces de navegación presentes; selección por click, teclado y sincronización exacta no verificadas |
| Hero | Capturas muestran distintas sublíneas/arte; rotación o aleatoriedad no identificadas; temporización pendiente |
| FAQ pricing | Primera respuesta pasó de 0 a 260.75 px de alto al pulsar pregunta |
| Calculadora | Asientos 1→2 con botón +; range min=0, max=1000000; demás cálculos no validados |
| Formularios | Campos, labels y required inspeccionados; no hubo envío ni comprobación de mensajes de backend |

### Matriz de anchos probados

| Patrón | 1440 | 768 | 390 |
|---|---|---|---|
| Nav | Links y CTA visibles | Hamburger; enlaces cerrados ocultos | Hamburger; enlaces cerrados ocultos |
| Hero h1 | 64 px, una línea en muestra | 64 px | 40 px, varias líneas |
| Ciclo | Rueda/copy/imagen; sticky | Lista vertical, imágenes inline | Lista vertical, chips de navegación horizontales |
| Título ciclo | 56 px | 32 px | 28 px |
| Título etapa | 48 px | 40 px | 24 px |
| Frameworks | 3 columnas | 1 columna | 1 columna |
| Clientes | Varias tarjetas con recorte | 2 visibles | 1 visible; CTA colección abajo |
| Métricas | 3 columnas | Apiladas | Apiladas |
| CTA final | Arte izquierda | Arte arriba | Arte arriba; CTA full width |
| Footer | 4 columnas | 2 columnas | 1 columna |
| Gutter general | 42.75 px medidos | 24 px | 16 px |
| Formulario contacto | Intro/form lado a lado | Intro/form apilados | Apilados; nombres en filas separadas |

### Breakpoints de CSS encontrados

La lectura textual de CSS y estilos inline encontró `max-width: 991px`, `767px`, `479px`, `540px`; mínimos `768px`, `992px`, `1280px`, `1440px`, `1920px`; y condiciones compuestas de desktop con `max-height: 820px` y `900px`, además de rango 992–1279. Hay reglas de Webflow, embebidos y estilos específicos mezcladas. **No todos esos breakpoints pertenecen a todos los componentes.** El intento de asociarlos mediante CSSStyleSheet no devolvió reglas utilizables; no se presenta una correspondencia exhaustiva ficticia.

Propuesta para implementación: usar 992 px como entrada al modo desktop y 768/480 para escalas menores, por concordancia con los rangos encontrados. Para el h1 adoptar 40 px por debajo de 768 y 64 desde 768 como aproximación entre puntos medidos. Para las tarjetas de frameworks usar una columna hasta 991 y tres desde 992. Estas decisiones intermedias están marcadas **inferidas** en los tokens; requieren comparación en 479/480, 767/768 y 991/992 antes de considerarlas equivalentes al original. Los anchos 390, 768 y 1440 son muestras, no los breakpoints del sitio.

### Movimiento

Solo se confirma 300 ms ease en CTA y declaraciones de 300 ms en tarjetas; menú tablet/móvil declara transición de height 500 ms. No asumir que una declaración CSS describe toda una animación JS. Se encontró `prefers-reduced-motion: reduce` que asigna `scroll-behavior: auto` a `.aadl_wrapper`; no se comprobó que desactive la rueda, hero, logos o animación del footer. Para la implementación propia, la propuesta es eliminar animación no esencial y servir todas las etapas como contenido normal bajo movimiento reducido.

## 7. UX observable y accesibilidad

### Arquitectura de información y recorridos

Observado: productos agrupados por función, separación entre plataforma comercial y frameworks open source, acceso persistente a pricing y demo, enlaces contextuales desde cada etapa y rutas a casos de clientes. La homepage organiza primero campaña/acción, después capacidades, alternativas de framework y señales de confianza. Repite el par comenzar/demo en hero y cierre.

Hipótesis de intención: el ciclo podría ayudar a relacionar tareas con productos y las pruebas sociales podrían reducir incertidumbre. No se midieron comprensión, éxito de tarea ni conversión; no atribuir eficacia al patrón. La navegación mezcla salidas internas y externas: en la implementación propia indicar destinos externos cuando sea útil y no abrir pestañas nuevas de forma indiscriminada.

La página de pricing expone una decisión resumida antes de una comparativa extensa. La calculadora proporciona feedback local de cantidades; no se verificó precisión de costos. Contacto ofrece contexto y evidencia comercial antes de pedir información; su segundo paso es presencia en DOM, no un recorrido validado.

### Revisión de accesibilidad: alcance limitado

Se inspeccionaron etiquetas/roles de controles muestreados, un recorrido Tab parcial, foco de un disclosure, atributos de campos, textos alternativos de algunas imágenes y una media query de movimiento reducido. No hubo auditoría WCAG completa, lector de pantalla, zoom 200/400%, alto contraste, validación completa del orden de foco ni contraste sobre todas las imágenes.

| Hallazgo observado | Consecuencia / adaptación propuesta |
|---|---|
| Disclosure Products es div con role=button y aria-expanded | Usar button nativo y conservar relación con panel |
| FAQ usa div sin role, tabindex ni aria-expanded en muestra | No copiar semántica; implementar button con aria-expanded/controls o details/summary |
| Newsletter input email required sin label asociado | Añadir label visible; placeholder no reemplaza nombre accesible |
| Contacto sí tiene labels asociados y required en primer paso | Conservar el patrón; ayuda/error mediante aria-describedby |
| Ilustraciones de hero y producto con alt vacío | Correcto solo si decorativas o redundantes; diagramas informativos necesitan equivalente textual |
| Puntos del carrusel de 6 px, activo 14 px; flechas 40×40 | Ampliar área clicable sin agrandar necesariamente el dibujo |
| Foco de Products con outline 3 px | Aplicarlo de forma consistente y verificarlo en superficies claras |
| Movimiento reducido solo parcialmente detectado | Proveer alternativa estática completa |

Los contrastes calculados de pares de color están en [EVIDENCE.md](EVIDENCE.md). Son valores sRGB de colores sólidos; no prueban legibilidad del hero sobre toda imagen, ni estados hover/focus, ni conformidad global. El borde translúcido del input requiere composición sobre el fondo antes de calcularse.

## 8. Assets e identidad

Las URL originales, función, proporción y tratamiento se encuentran en el inventario A01–A08 de [EVIDENCE.md](EVIDENCE.md). Las proporciones naturales corresponden al recurso efectivamente cargado, pueden reflejar `srcset` y no garantizan el tamaño del original sin sufijo.

**Sustituir:** marca LangChain/LangSmith, iconos y nombres de productos, diagramas de producto, personajes/collage de campaña, logotipos de clientes, red de puntos del cierre, gran logo delineado, claims, métricas, testimonios y enlaces de negocio. Conservar únicamente reglas de composición y jerarquía. No distribuir fuentes propietarias ni asumir licencia por tener una URL pública.

**Tratamiento propio propuesto:** imágenes decorativas con alt vacío y pointer-events none; diagramas informativos con descripción útil; logos propios en SVG; imágenes responsive con width/height o aspect-ratio para reservar espacio. Cargar primero el arte principal y diferir recursos inferiores. No descargar todas las variantes de una campaña si solo se muestra una.

## 9. Guía para React, TypeScript y Tailwind CSS

### Organización propuesta

Separar `components/ui` (botones, campo, disclosure), `components/marketing` (hero, ciclo, frameworks, clientes, footer) y datos de contenido tipados. No introducir CMS, router adicional, biblioteca de animación ni carrusel externo solo por imitar la referencia. Usar el router ya elegido por el proyecto. Mantener lógica de calculadora en funciones puras independientes de estilos.

Modelos mínimos: `NavGroup { id, label, items }`, `LifecycleStageData { id, title, lead, bullets, links, image }`, `FrameworkCardData { id, name, title, description, href, image }`, `CustomerStory { id, logo, summary, href }`. Usar ids estables; no índices como identidad de las etapas.

### Contrato de estilos

Importar [design-tokens.css](../../src/assets/css/design-tokens.css) una vez. Mapear utilidades de Tailwind a los aliases semánticos: `bg-[var(--surface-page)]`, `text-[var(--text-primary)]`, `rounded-[var(--radius-control)]`, `max-w-[var(--container-content-max)]`. No usar el `lg` predeterminado para suponer que equivale al desktop de 992 px; configurar el breakpoint del proyecto o escribir media queries explícitas. No se prescribe una API dependiente de una versión de Tailwind no indicada.

Aplicar `data-surface="light"` a capítulos claros para cambiar aliases de texto/superficie; los botones inversos deben tener variante explícita. Mantener `--font-editorial` separado de `--font-ui`. El CSS de tokens declara nombres de las fuentes, pero no incluye `@font-face` ni importa archivos propietarios. Hasta disponer de licencia, activar el fallback propuesto de forma consciente.

Las media queries del archivo son una **propuesta de interpolación**, no una transcripción del CSS original. Todas sus medidas extremas proceden de muestras; sus puntos de cambio por componente no están comprobados exhaustivamente. No convertir valores de rectángulos fraccionarios, alturas de texto o y absolutos en estilos hardcoded.

### Comportamiento recomendado

- Navegación: estado local de disclosure; abrir con click/Enter/Space, cerrar con Escape y click exterior; devolver foco al trigger. Hover puede complementar, no ser el único mecanismo.
- Ciclo: mantener contenido completo en DOM; en mobile lista normal. Desktop sticky opcional con selección basada en scroll y enlaces de acceso a etapas. Evitar interceptar la rueda del ratón. La rueda gráfica debe ser decorativa respecto de la navegación semántica.
- Carrusel: viewport con overflow local y botones nativos; anunciar cambios de forma no intrusiva. Preferir desplazamiento manual; autoplay no está especificado porque no fue verificado.
- Formularios: no incrustar endpoints ajenos. Definir validación y mensajes propios cuando exista backend. No mostrar éxito antes de una confirmación real del envío.
- FAQ: altura automática del contenido; estado semántico sincronizado. Nunca asignar 260.75 px como altura fija de todas las respuestas.

### Criterios de aceptación para el agente que implemente

1. Respetar orden de capítulos, alternancia de superficies, familias funcionales de letra, radios y jerarquía CTA.
2. Comparar 1440, 768 y 390 con las capturas; revisar también los límites propuestos sin afirmar que fueron medidos en esta extracción.
3. No producir scroll horizontal de página; permitirlo solo en controles explícitos como carrusel o comparativa.
4. Mantener todas las etapas y enlaces accesibles sin animación y con teclado.
5. Reemplazar identidad y datos comerciales antes de publicar.
6. Verificar foco, nombres accesibles, validación y movimiento reducido en la implementación propia.
7. Resolver o conservar como pendiente cada valor que aquí figura inferido; no convertirlo silenciosamente en dato de origen.

## 10. Limitaciones y pendientes

- La homepage se cubrió de principio a fin, pero las capturas estáticas del contenido sticky no muestran todas las etapas en su estado activo. Las áreas vacías del desktop no son una recomendación de diseño.
- Ocho imágenes no se confirmaron cargadas; variantes inactivas de campaña pueden explicar parte del resultado, sin prueba exhaustiva.
- Tipografías: CSS y nombres de archivo verificados, licencias y renderizado de cada peso no auditados. No se midieron todos los párrafos, captions ni cada h2 del sitio.
- Asociación completa selector→media query pendiente. Los breakpoints detectados no prueban por sí solos la transición de cada componente.
- Menú móvil sensible al cambio de viewport en la sesión; carga nueva sí abrió. Cierre, focus trap y orden de foco completos pendientes.
- Click y teclado de etapas, swipe y límites del carrusel, autoplay, timing del hero, animación del footer y sus easings no verificados.
- Pricing: presencia de planes/comparativa comprobada; medidas de cada tarjeta y responsive interno de la tabla/calculadora pendientes. Los patrones nuevos tienen propuestas explícitas, no una réplica exacta.
- Contacto: campos del primer paso comprobados; segundo paso oculto y éxito solo detectados en DOM. No se probó Continue ni validación de envío.
- Semántica, contraste y movimiento revisados por muestreo. No se declara conformidad integral ni se atribuyen resultados de usabilidad/conversión.

**Regla final para implementación:** una medida en EVIDENCE es referencia localizada; un token semántico es una decisión reutilizable; una propuesta sigue siendo propuesta hasta contrastarla. Priorizar coherencia de la marca propia sobre reproducción de identidad ajena.
