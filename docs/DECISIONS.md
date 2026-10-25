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

La primera iteración de `/marketplace` mostraba seis proyectos ficticios con valores de token ilustrativos. El 25-10-2026, por pedido del usuario, se reemplazaron por cuatro **marcas reales que publican programas de franquicia**: McDonald's, Burger King, Havanna y Pizza Hut. Sus fichas en `/marketplace/[slug]` son simulaciones editoriales de posibles unidades, no franquicias tokenizadas existentes. Búsqueda y filtros operan sobre datos locales. La sección de marcas muestra referencias, sin atribuirles confianza, alianza o autorización a FranToken. No se confirmaron compañías colaboradoras. Los iconos de McDonald's, Burger King y Pizza Hut se cargan desde [Simple Icons](https://simpleicons.org/); Havanna queda sin logo hasta contar con un asset autorizado, pues sus términos no acreditan permiso para reproducirlo.

Cada ficha separa información de la empresa y de su formato de franquicia, un gráfico de ROI neto **anualizado** con números inventados para probar la visualización, variables por zona, riesgos, estado de oferta y fuente oficial. El CTA «Comprar token · demo» lleva a un formulario de registro simulado: no crea una cuenta, cobra, reserva ni emite. Las rutas `/ingresar` y `/registro` solo demuestran la interfaz y no envían datos. Precio, derechos, emisor, documentos, disponibilidad y métricas reales permanecen sin definir. WEB-04, WEB-05, WEB-07, WEB-10, WEB-12 y WEB-15 siguen pendientes para publicar un catálogo o una oferta real.

En el ajuste posterior se quitaron los monogramas superpuestos, se agregaron enlaces de acceso al navbar compartido y el gráfico se implementó con Recharts 3.10.1, usando animación que respeta movimiento reducido. Los cinco valores siguen siendo exclusivamente anualizados e inventados para esta demo.

Fuentes consultadas el 25-10-2026 para verificar únicamente que las marcas publican información de franquicias: [McDonald's](https://corporate.mcdonalds.com/corpmcd/franchising-overview/global-franchising.html), [Burger King](https://franchising.bk.com/), [Havanna](https://havanna.com.ar/atencion-al-cliente/franquicias) y [Pizza Hut](https://franchise.pizzahut.com/). La [restricción de Havanna sobre el uso de sus logos](https://tienda.havanna.com.ar/terminos-y-condiciones/) no autoriza su reproducción en este prototipo.

## Prototipo de cuenta y solicitud de franquicia

Las rutas `/ingresar`, `/mi-cuenta`, `/mi-cuenta/tokens`, `/mi-cuenta/configuracion` y `/abrir-franquicia` implementan un recorrido **dummy** solicitado por el usuario. El acceso acepta un email válido y una contraseña de al menos ocho caracteres; no autentica identidades ni guarda la contraseña. La sesión, el perfil, los borradores y las solicitudes se guardan en `localStorage` del navegador. El historial de compras de tokens es fijo y ficticio. El formulario de tres etapas recopila identidad de la franquicia, costo estimado, historial declarado, fuente, operadora prevista y descripción; su envío solo crea un registro local. Todos los estados y montos se etiquetan como demo y las rutas llevan `noindex`.

La implementación propone contratos de repositorio para reemplazar el almacenamiento local por Supabase, sin declarar aprobados el registro, la oferta, la compra, la apertura ni el tratamiento real de datos. WEB-02–WEB-11 y WEB-15, según correspondan, siguen pendientes. Antes de habilitar usuarios y operaciones reales hacen falta autenticación y autorización de servidor, reglas de acceso a datos, protección de rutas, política de datos, entidades y condiciones de producto aprobadas. La [nota de integración](architecture/ACCOUNT-DEMO.md) detalla los puntos de reemplazo.

Para cada confirmación futura, registrar aquí la decisión concreta, su alcance, responsable, fecha, enlace a la fuente y documentos `spec/` afectados. Si una decisión cambia, conservar el enlace a la versión anterior y señalar qué contenido necesita revisión.
