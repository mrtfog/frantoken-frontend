# Registro de decisiones web pendientes

Este registro sigue los bloqueos de publicación enumerados en [Information Architecture](spec/INFORMATION-ARCHITECTURE.md#información-del-negocio-pendiente--bloqueo-de-publicación). Esos bloqueos fueron redactados para una web de inmuebles; el [modelo de negocio vigente](business/BUSINESS-LOGIC.md) exige adaptarlos a franquicias. Los IDs `WEB-*` son distintos de los `BUS-*` de [decisiones de negocio](business/DECISIONS.md). No concede aprobaciones. Una decisión se marca **confirmada** solo con responsable, fecha y enlace a evidencia o aprobación; las condiciones sensibles requieren la revisión competente definida por el negocio.

| ID | Decisión a confirmar | Estado | Responsable / evidencia |
|---|---|---|---|
| WEB-01 | Identidad, entidad legal, jurisdicciones y contacto | Pendiente | — |
| WEB-02 | Naturaleza del producto, derechos, roles y límites para copy público | Parcial: secuencia y actores declarados; derechos y condiciones pendientes | [Business Logic](business/BUSINESS-LOGIC.md) |
| WEB-03 | Público, elegibilidad y requisitos de verificación | Pendiente | — |
| WEB-04 | Catálogo de proyectos de franquicia y emisiones, estados, disponibilidad y origen de datos | Pendiente | — |
| WEB-05 | Precio, costos, distribución, impuestos y documentos por emisión | Pendiente | — |
| WEB-06 | Mecanismo y límites de salida o negociación, si existe | Pendiente | — |
| WEB-07 | Métricas, metodología, fuentes, períodos y frescura | Pendiente | — |
| WEB-08 | Operadora, fiduciario y demás responsables; derechos de medios y acceso a documentos | Pendiente | — |
| WEB-09 | Riesgos, conflictos, incidencias y revisión | Pendiente | — |
| WEB-10 | Registro, acceso, continuidad de contexto y servicios reales | Pendiente | — |
| WEB-11 | Soporte, plazos confirmados, formularios y retención de datos | Pendiente | — |
| WEB-12 | Testimonios, logos, atribuciones y evidencia autorizada | Pendiente | — |
| WEB-13 | Destino de la antigua ruta de propietarios de inmuebles; no activarla por analogía | Pendiente | — |
| WEB-14 | Licencias tipográficas, assets propios, textos, traducciones y política de accesibilidad y movimiento | Pendiente | — |
| WEB-15 | Adaptar rutas, entidades, filtros, fichas, CTA y documentos de `spec/` desde inmuebles a franquicias y emisiones | Pendiente | [Business Logic](business/BUSINESS-LOGIC.md) |

Las funciones opcionales de mercado, escenarios y comparación quedan condicionadas por las decisiones aplicables de producto, datos y metodología en WEB-02, WEB-06 y WEB-07; su activación se especifica en [Information Architecture](spec/INFORMATION-ARCHITECTURE.md) y [Page Blueprints](spec/PAGE-BLUEPRINTS.md), sujetos a WEB-15.

## Propuesta implementada en la homepage

La homepage de esta iteración usa una identidad visual editorial propia, textos conceptuales sobre el modelo declarado y navegación por secciones. Es una **propuesta de diseño y contenido**, no una confirmación de WEB-01, WEB-02, WEB-14 o WEB-15. No presenta proyectos, precios, rentabilidades, disponibilidad, registro ni captación. Antes de publicar una oferta o afirmar operaciones reales, siguen pendientes las aprobaciones y fuentes indicadas arriba y en [las decisiones del negocio](business/DECISIONS.md).

La refactorización de la homepage aplica el [UI Contract](design/UI-CONTRACT.md): reutiliza las piezas comunes, distribuye los estilos con Tailwind, limita los componentes cliente a animaciones e interacción y mantiene un skeleton de ruta. Es un cambio de implementación; no confirma datos ni condiciones de negocio pendientes.

## Prototipo de marketplace

La ruta `/marketplace` muestra seis **proyectos ficticios** y valores de token **ilustrativos**, a pedido del usuario para evaluar únicamente la presentación de tarjetas. Búsqueda, filtro por sector y ordenamiento operan sobre datos locales de demostración. Las tarjetas no enlazan a fichas, no permiten registrar interés, reservar ni comprar; no existe una ruta de detalle por token. La pantalla identifica los datos como inventados y no confirma emisiones, operadores, derechos, precios, estados de captación ni disponibilidad. WEB-04, WEB-05 y WEB-15 continúan pendientes para cualquier catálogo real.

Para cada confirmación futura, registrar aquí la decisión concreta, su alcance, responsable, fecha, enlace a la fuente y documentos `spec/` afectados. Si una decisión cambia, conservar el enlace a la versión anterior y señalar qué contenido necesita revisión.
