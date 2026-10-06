# Evidencias e inventario de assets

Fecha: 2026-10-05 America/Buenos_Aires / 2026-10-06 UTC. Valores en CSS px salvo indicación. Medido = DOM/CSS/cálculo; observado = contenido o interacción; inferido = propuesta o estimación. No se normalizan estilos de elementos ocultos como si fueran visibles.

## Tabla principal

| ID | Elemento | Valor o comportamiento | Página | Selector / referencia | Método | Clasificación |
|---|---|---|---|---|---|---|
| E01 | Base oscura | #030710 fondo; #CCE9FF texto; Aeonik 400 16/24 px | https://www.langchain.com/ | body.body-v2 | CSS computado, 3 anchos | medido |
| E02 | Ciclo | #05070B fondo; #E8EDF5 texto; #7FC8FF título | https://www.langchain.com/ | .aadl_wrapper, .aadl_heading, .aadl_stage | CSS computado | medido |
| E03 | Superficie clara | #F2FAFF fondo; #030710 texto | https://www.langchain.com/ | .home_frameworks-section, .home_usecases-section | CSS computado | medido |
| E04 | Hero título | #E5F4FF; 64/70.4px en 1440 y 768; 40/48px en 390; peso 300 | https://www.langchain.com/ | h1.t-heading-2-rg | CSS computado | medido |
| E05 | Fuente editorial | Twklausanne; OTF 250 declarado como 300, además 500 y 700 | https://www.langchain.com/ | h1; @font-face en stylesheet referenciado abajo | CSS computado y lectura textual CSS | medido |
| E06 | Fuente UI | Aeonik; archivo aeonikmono-regular.otf peso 400; Light TRIAL peso 300 | https://www.langchain.com/ | body; @font-face | CSS computado y lectura textual CSS | medido |
| E07 | Escala ciclo / etapa | Título 56→32→28px; etapa 48→40→24px | https://www.langchain.com/ | .aadl_heading, .aadl_stage | CSS computado a 1440/768/390 | medido |
| E08 | Lead ciclo | Twklausanne 24/34.8px; max-width 416px; #7FC8FF | https://www.langchain.com/ | .aadl_lead | CSS computado 1440 | medido |
| E09 | CTA | 48px alto; 14/14px; 12×24px desktop, 12×16px móvil; radio 6; outline 1px #2F4B68 | https://www.langchain.com/ | .button-v2-full-width; a[href="/contact-sales"] | CSS y rectángulo | medido |
| E10 | Contenedores / nav | Content max 1416px; nav max 1456px, radio 6, borde #262C36; sticky top 8px | https://www.langchain.com/ | .v2-container, .navbar2_container, .navbar2_component | CSS computado 1440 | medido |
| E11 | Gutter | 42.75px desktop; tarjetas x=24 tablet y x=16 móvil | https://www.langchain.com/ | .v2-padding-global; .frameworks-col-wrapper | CSS / rectángulos | medido |
| E12 | Grid frameworks | 3 tracks de 430.5px; gap 24px; mobile/tablet una columna | https://www.langchain.com/ | .frameworks-3col-grid; .frameworks-col-wrapper | CSS/rectángulos/capturas | medido |
| E13 | Ritmo frameworks | Padding 200px 0 100px desktop; contenido tarjeta 0 8px | https://www.langchain.com/ | .v2-home-frameworks-wrapper; .framework-content-wrapper | CSS computado | medido |
| E14 | Inputs / tarjetas | Input 44px, 8×18px, borde rgba(224,239,254,.16), radio6; cliente radio16/padding1; sombras none | https://www.langchain.com/ | .v2-input; .v2-is-use-cases | CSS/rectángulos | medido |
| E15 | Footer | 4 tracks de 304.875px; gap40 desktop; 2 columnas tablet, 1 móvil | https://www.langchain.com/ | .v2-footer-grid; capturas tres anchos | CSS desktop y captura responsive | observado |
| E16 | Menú desktop | Hover abre; salir con puntero y Escape cierra; lectura inmediata bajo hover permaneció abierta | https://www.langchain.com/ | .navbar2_dropdwn-toggle:first | Hover, click, Escape y aria-expanded | observado |
| E17 | Menú móvil | Abre en carga nueva (aria-expanded=true); no abrió tras múltiples resize; cierre móvil no validado | https://www.langchain.com/ | .navbar2_menu-button | Click y atributos; prueba repetida | observado |
| E18 | CTA transición | Duración 0.3s; easing ease; fondo/texto iguales tras hover | https://www.langchain.com/ | .navbar2_button-wrapper a:first | CSS antes/después de hover con espera 400ms | medido |
| E19 | Nav móvil transición | height 0.5s declarado | https://www.langchain.com/ | .navbar2_menu | CSS computado 390 | medido |
| E20 | Foco parcial | Outline #CCE9FF solid 3px en disclosure Products | https://www.langchain.com/ | .navbar2_dropdwn-toggle | Tab y getComputedStyle(activeElement) | observado |
| E21 | Ciclo sticky | pin sticky top0; wrapper 2500px alto en viewport 1440×1000 | https://www.langchain.com/ | .aadl_pin, .aadl_wrapper | CSS y rectángulos | medido |
| E22 | Carrusel | Siguiente cambió active slide desde Klarna a Monday | https://www.langchain.com/ | .swiper-btn-next; .v2-is-use-cases.swiper-slide-active | Click y lectura DOM | observado |
| E23 | Controles carrusel | Flechas40×40; dot activo14×14; otros6×6 | https://www.langchain.com/ | .swiper-btn-next, .swiper-btn-prev, .swiper-dot | getBoundingClientRect | medido |
| E24 | FAQ | Respuesta 0→260.75px; pregunta DIV sin role/tabindex/aria-expanded; padding 24px vertical desktop,16 tablet/móvil | https://www.langchain.com/pricing | .faq_question:first; .faq_answer:first | Click, DOM y CSS | observado |
| E25 | Calculadora | Asientos 1→2; range trazas min0/max1000000 | https://www.langchain.com/pricing | #seatPlus, #seatCount, #traces | Click y atributos | observado |
| E26 | Pricing título | 72px en 1440/768;48px en390; branding81 descartado por contexto no controlado | https://www.langchain.com/pricing | h1.t-heading-1-rg | CSS computado | medido |
| E27 | Contacto primer paso | 4 campos required con labels; inputs44px; textarea100px; segundo paso oculto | https://www.langchain.com/contact-sales | #lc-step1, #lc-step2 | DOM/CSS sin completar ni enviar | medido |
| E28 | Contacto responsive | Nombre/apellido misma fila en1440/768; filas separadas390; título56/56/32px | https://www.langchain.com/contact-sales | #firstName, #lastName, h1 | Rectángulos y CSS | medido |
| E29 | Newsletter | Email required; labels=[]; placeholder Your email | https://www.langchain.com/ | #wf-form-footer_form #EMAIL | DOM | medido |
| E30 | Movimiento reducido | Regla reduce con .aadl_wrapper scroll-behavior:auto; cobertura JS no comprobada | https://www.langchain.com/ | style @media(prefers-reduced-motion:reduce) | Lectura textual de CSS | medido |
| E31 | Breakpoints | max991/767/479/540; min768/992/1280/1440/1920 y condiciones de altura820/900 | https://www.langchain.com/ | stylesheet y estilos inline; sin asignación exhaustiva a componente | Extracción textual @media | medido |
| E32 | Política de responsive propia | Desktop desde992; tamaños intermedios desde480/768; gutter desktop3% | https://www.langchain.com/ | design-tokens.css bloque C | Interpolación entre muestras y rangos detectados | inferido |
| E33 | Fuentes / imágenes | Fonts loaded en3 viewports;93/101 imágenes completas en comprobación posterior | https://www.langchain.com/ | document.fonts; document.images | API DOM tras scroll | medido |
| E34 | Hero variable | Distinta sublínea/arte entre capturas; mecanismo y duración no confirmados | https://www.langchain.com/ | evidence/home-1440.png, home-768.png, home-390.png | Comparación visual | observado |
| E35 | UX | Campaña→capacidades→frameworks→clientes→métricas→CTA; prueba y demo reiterados | https://www.langchain.com/ | capturas completas y enlaces scrape | Inspección de estructura | observado |
| E36 | Accesibilidad propuesta | Button nativo, label newsletter, focus3px/offset3, target44px, alternativa estática | https://www.langchain.com/ | DESIGN.md §7; tokens bloque C | Adaptación de implementación | inferido |

## Capturas

| Referencia | Archivo | Dimensión bitmap | Nota |
|---|---|---|---|
| S1440 | evidence/home-1440.png | 1440×6969 | Captura full-page; sticky genera espacio vacío y muestra una etapa activa |
| S768 | evidence/home-768.png | 768×12102 | Etapas inline, varias atenuadas en el instante capturado |
| S390 | evidence/home-390.png | 390×9719 | Etapas inline y carrusel de una tarjeta |

Estas capturas se incluyen en el ZIP, no requieren URLs temporales. Son sesiones separadas del DOM medido: altura y estado de animación pueden variar. No se midieron colores por muestreo de píxeles.

## Mediciones responsive ampliadas

Método en todas las filas: CSS computado + getBoundingClientRect. Clasificación: **medido**. Página: https://www.langchain.com/. La coordenada y se refiere al documento al volver al inicio; regiones sticky/animadas pueden cambiar. W/H no se deben trasladar automáticamente a width/height fijos.

| Viewport | Selector | Caja x/y/w/h | Letra tamaño/línea/peso | Padding | Radio |
|---|---|---|---|---|---|
| 1440 | `h1` (Meet LangSmith Engin) | 367.47/204.41/690.05/70.41 | 64px / 70.4px / 300 | 0px | 0px |
| 1440 | `.aadl_heading` (Accelerating the Age) | 361.91/969.22/701.19/123.19 | 56px / 61.6px / 300 | 0px | 0px |
| 1440 | `.aadl_stage` (Build) | 494.19/1228.39/436.61/50.39 | 48px / 50.4px / 300 | 0px | 0px |
| 1440 | `.home_frameworks-section a` (deepagentsBuild inte) | 42.75/3776.41/430.5/513.88 | 16px / 24px / 400 | 0px | 0px |
| 1440 | `.home_usecases-section a` (More customer storie) | 1151.97/4617.47/230.28/48 | 14px / 14px / 400 | 12px 24px | 6px |
| 1440 | `.home_usecases-section a` (Klarna’s AI assistan) | 242.75/4745.47/369.33/395.62 | 16px / 24px / 400 | 1px | 16px |
| 1440 | `footer` (ProductsLangSmith Pl) | 0/6290.3/1425/675.41 | 16px / 24px / 400 | 0px | 0px |
| 1440 | `input` (v2-input w-input) | 1077.38/6489.11/304.88/44 | 14px / 14px / 400 | 8px 18px | 6px |
| 1440 | `input` (button-v2-full-width is-r) | 1256.12/6549.11/126.12/48 | 14px / 14px / 400 | 12px 24px | 6px |
| 768 | `h1` (Meet LangSmith Engin) | 31.47/224.41/690.05/70.41 | 64px / 70.4px / 300 | 0px | 0px |
| 768 | `.aadl_heading` (Accelerating the Age) | 24/901.22/705/35.19 | 32px / 35.2px / 300 | 0px | 0px |
| 768 | `.aadl_stage` (Build) | 24/1069.52/705/42 | 40px / 42px / 300 | 0px | 0px |
| 768 | `.home_frameworks-section a` (deepagentsBuild inte) | 24/6146.33/705/642.23 | 16px / 24px / 400 | 0px | 0px |
| 768 | `.home_usecases-section a` (More customer storie) | 498.72/8599.81/230.28/48 | 14px / 14px / 400 | 12px 24px | 6px |
| 768 | `.home_usecases-section a` (Klarna’s AI assistan) | 24/8727.81/344.5/347.62 | 16px / 24px / 400 | 1px | 16px |
| 768 | `footer` (ProductsLangSmith Pl) | 0/11116.86/753/874.12 | 16px / 24px / 400 | 0px | 0px |
| 768 | `input` (v2-input w-input) | 400.5/11632.08/328.5/44 | 14px / 14px / 400 | 8px 18px | 6px |
| 768 | `input` (button-v2-full-width is-r) | 602.88/11692.08/126.12/48 | 14px / 14px / 400 | 12px 24px | 6px |
| 390 | `h1` (Meet LangSmith Engin) | 16/186.41/343/144 | 40px / 48px / 300 | 0px | 0px |
| 390 | `.aadl_heading` (Accelerating the Age) | 24/962.41/327/61.59 | 28px / 30.8px / 300 | 0px | 0px |
| 390 | `.aadl_stage` (Build) | 24/1157.11/327/25.19 | 24px / 25.2px / 300 | 0px | 0px |
| 390 | `.home_frameworks-section a` (deepagentsBuild inte) | 16/4480.58/343/409.97 | 16px / 24px / 400 | 0px | 0px |
| 390 | `.home_usecases-section a` (Klarna’s AI assistan) | 16/6219.3/343/258.78 | 16px / 24px / 400 | 1px | 16px |
| 390 | `footer` (ProductsLangSmith Pl) | 0/8248.3/375/1480.47 | 16px / 24px / 400 | 0px | 0px |
| 390 | `input` (v2-input w-input) | 16/9272.67/343/44 | 14px / 14px / 400 | 8px 18px | 6px |
| 390 | `input` (button-v2-full-width is-r) | 16/9332.67/343/48 | 14px / 14px / 400 | 12px 16px | 6px |

## Contraste de pares sólidos

Método: luminancia relativa sRGB y razón (Lmás_clara + 0.05)/(Lmás_oscura + 0.05). Clasificación **medido por cálculo** sobre valores CSS. No es una auditoría completa; no incorpora imagen de fondo, antialiasing ni todos los estados.

| Uso | Primer color | Fondo | Razón | Fuente |
|---|---|---|---|---|
| Texto oscuro | #CCE9FF | #030710 | 16.00:1 | E01 |
| CTA claro | #030710 | #E5F4FF | 17.97:1 | E09 |
| Texto sobre claro | #030710 | #F2FAFF | 19.10:1 | E03 |
| Acento ciclo | #7FC8FF | #05070B | 11.14:1 | E02 |
| Borde CTA | #2F4B68 | #030710 | 2.23:1 | E09 |
| Foco observado sobre oscuro | #CCE9FF | #030710 | 16.00:1 | E20 |

El borde outline tiene menos contraste que el texto del botón. Esto no determina por sí solo si es necesario para identificar el control. El ring celeste observado no debe trasladarse sin ajuste a una superficie clara.

## Inventario de assets

Todos los recursos de identidad listados deben reemplazarse. Las proporciones medidas son naturalWidth/naturalHeight reportadas en sesión responsive, no dimensiones garantizadas del archivo original.

| ID | Función / selector | URL de origen | Proporción | Tratamiento | Método / clasificación |
|---|---|---|---|---|
| A01 | Collage hero, .home_new-image.is-einstein | https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/6a5fabcd35c833ad1738ce2c_einstein-smoke-langchain-p-1600.avif | 390:384 ≈ 1.016:1 | object-fit: contain; alt vacío | DOM / medido |
| A02 | Capa derecha hero, .home_new-image-right.is-einstein | https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/6a5fabcdb00e7cb6890c9aab_einstein-graphics-langchain-p-1600.avif | 390:173 ≈ 2.254:1 | object-fit: contain; alt vacío | DOM / medido |
| A03 | Diagrama etapa Build, .aadl_ill | https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/6a759cbd01423e8a4b3ff5f0_Build-p-800.webp | 390:292 ≈ 1.336:1 | object-fit: contain; alt vacío | DOM / medido |
| A04 | Framework deepagents, .framework-image | https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/698b2ab3a27435f0af4607ce_83408050bc46f6f7d309df03d6155be9_graph-2.avif | 389:243 ≈ 1.601:1 | object-fit: fill; alt vacío | DOM / medido |
| A05 | Framework langchain, .framework-image | https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/698b2ab36ec04bd906a45a47_04a211ab00b30e07dc51edffebd9aff2_graph.avif | 389:243 ≈ 1.601:1 | object-fit: fill; alt vacío | DOM / medido |
| A06 | Framework langgraph, .framework-image | https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/698b2ab3357e0836fe4cdcac_70f00ac3114760cac8e792a9375a4814_graph-1.avif | 389:243 ≈ 1.601:1 | object-fit: fill; alt vacío | DOM / medido |
| A07 | Arte red de puntos del CTA final | https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/698b2d053d82a375e355b0ab_Group%202147239175.avif | No medida | Arte a la izquierda desktop; encima en mobile | Scrape y captura / observado |
| A08 | Ejemplo de logo de cliente, tarjeta Klarna | https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/69a03fbd88f7622a14049a2b_logo_klarna.svg | No medida | Logo sobre tarjeta clara | Scrape y captura / observado |

Variantes de Newton declaradas pero no confirmadas cargadas: no se deduce su proporción. El logo principal se extrajo como SVG inline/data URL; no se reproduce su código. La URL pública de un asset no concede licencia de uso.

## Fuentes CSS y tipográficas

Hoja de estilos referenciada por el DOM:

https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/css/langchain-tonik.shared.a1e05b745.min.css

Además se leyeron estilos inline del documento. No se incluye un volcado de HTML/CSS. Se listan las URL de fuente para trazabilidad, no para importación automática:

- Twklausanne, peso CSS 300: https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/69899c86969c509c69a7199d_TWKLausanne-250.otf
- Twklausanne, peso CSS 700: https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/699c3415dcbb9ffb357a9ade_TWKLausanne-700.otf
- Aeonik, peso CSS 400: https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/69b955b08318559fe4fdad49_aeonikmono-regular.otf
- Twklausanne, peso CSS 500: https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/69ca847dfd7784a9fd885aa3_TWKLausanne-500.otf
- Aeonik, peso CSS 300: https://cdn.prod.website-files.com/65b8cd72835ceeacd4449a53/69ef48ad3731ea48ebfd4053_AeonikMonoProTRIAL-Light.otf

## Pendientes explícitos

No verificados: breakpoints exactos de cada componente; animaciones JS y easing del hero/ciclo/footer; keyboard completo de menús/ciclo/carrusel; swipe y bucle del carrusel; fórmula completa del estimador; layout detallado de comparativa; estados de envío/error/éxito; disponibilidad/licencia de fuentes; contraste sobre arte. Las propuestas de React y de accesibilidad son inferidas, no observaciones del código fuente.
