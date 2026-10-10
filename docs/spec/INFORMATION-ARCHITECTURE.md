# Arquitectura de información — marca propia

## Contrato y fuentes

Propuesta editorial y funcional, no descripción de una implementación existente. Evidencia de Lofty: snapshot del 5 de octubre local / 6 UTC de 2026; síntesis reanudada el 8 local / 9 UTC. Ver [CONTENT-AUDIT.md](../research/CONTENT-AUDIT.md) para URLs, tablas por página, estados observados y límites. [DESIGN.md](../research/DESIGN.md) y [design-tokens.css](../../src/assets/css/design-tokens.css) son la autoridad visual; ninguna medida visual se deriva del Markdown de Lofty. Los nombres de componentes de ese documento son una API propuesta, no nombres internos comprobados del sitio original.

**Observado:** Lofty conecta descubrimiento, explicación, catálogo, ficha, entrada al registro; añade confianza institucional, experiencias, comparación editorial y captación de propietarios. Su explicación extensa mezcla operación, conceptos, mecanismos legales y dudas. La ficha separa Details, Financials y Order book; Buy público condujo a signup. No se observó el flujo posterior al alta.

**Propuesto:** separar resumen comercial, educación y evaluación operativa. Mantener pública la información necesaria para evaluar el producto siempre que el negocio pueda publicarla. Las rutas siguientes son contratos de contenido de la marca propia. No implican que comparta vehículos, elegibilidad, mercados, monedas, liquidez o mecanismos de Lofty.

## Registro de rutas propuesto

E = esencial para esta arquitectura; C = complementario, publicar solo con datos y función confirmados; P = prescindible para el lanzamiento. La prioridad indica necesidad informativa, no obligación normativa.

| ID | Ruta | Papel y contenido propietario | Prioridad y justificación | Dependencias / salida principal |
|---|---|---|---|---|
| R00 | `/` | Orientación, propuesta, resumen de funcionamiento, muestra de oferta, límites y confianza | E: puerta de descubrimiento | R01; R03 como alternativa educativa |
| R01 | `/propiedades` | Catálogo real, filtros compatibles con datos disponibles, resultados y estado de oferta | E: exploración | R02; conservar consulta al volver |
| R02 | `/propiedades/:slug` | Ficha del activo y oferta, documentos, métricas con fechas, gastos, riesgos, gestión y actualizaciones | E: evaluación concreta | R04, R05, R10 con contexto de oferta |
| R03 | `/como-funciona` | Derechos adquiridos, pasos, cobros, gastos, gestión y salida según modelo validado | E: comprensión previa | R04 y R01 |
| R04 | `/costos-y-riesgos` | Costos completos, escenarios desfavorables, restricciones, metodología y límites | E: decisión informada | R02 si hay contexto, R05 o R09 |
| R05 | `/ayuda` | Índice por tareas, preguntas y búsqueda si volumen suficiente | E: recuperación de dudas | R06, R09 |
| R06 | `/ayuda/:slug` | Respuesta individual con pasos, condiciones, fecha y enlaces relacionados | E: profundización sin inflar homepage | Página de origen, R09 |
| R07 | `/empresa` | Identidad legal, responsabilidades, equipo, gestión de conflictos y contacto | E: identificar responsable | R09, R01 |
| R08 | `/experiencias` | Experiencias verificadas con autorización, contexto y atribución | C: confianza contextual; no suplanta datos | R01; omitir navegación si no hay contenido |
| R09 | `/contacto` | Canales reales, temas admitidos, plazos solo si confirmados, formulario mínimo | E: salida a dudas no resueltas | Confirmación en misma ruta; R05 |
| R10 | `/registro` | Requisitos, método de alta autorizado, términos y continuidad | E si existe autoservicio; si no, sustituir CTA por R09 | R11; servicio de identidad pendiente |
| R11 | `/acceso` | Acceso a cuenta existente y recuperación | E si hay cuentas | R12; método real pendiente |
| R12 | `/cuenta` | Límite de la especificación pública; punto de entrada a aplicación autenticada | Condicional al producto | Módulos privados fuera de alcance; no inventar checkout |
| R13 | `/propietarios` | Elegibilidad del inmueble, proceso, costos y solicitud | C: activar solo si la marca incorpora oferta de terceros | Formulario en `#solicitud`; R09 |
| R14 | `/comparar` | Criterios, fuentes, fechas, conflictos e incertidumbre | P: no es requisito de comprensión ni operación | R03; publicar solo con mantenimiento asignado |
| R15 | `/legal/terminos` | Condiciones propias aprobadas | E si hay servicio/registro | R09 |
| R16 | `/legal/privacidad` | Tratamiento de datos de la marca y canales | E para formularios/cuentas | R09 |
| R17 | `/legal/cookies` | Política y preferencias si aplica al funcionamiento real | Condicional | Control de preferencias real |

No crear rutas de blog, glosario por ciudad o calculadoras por imitación. Incorporarlas solo si una necesidad no está resuelta por R03/R04/R06 y existe responsable editorial. No enlazar páginas vacías ni enlaces `#` sin destino. Las rutas condicionales se excluyen de navegación hasta estar disponibles.

## Navegación y jerarquía

Header: logo→R00; **Explorar propiedades**→R01; **Cómo funciona**→R03; **Costos y riesgos**→R04; **Ayuda**→R05. Empresa→R07 puede ir en disclosure o footer según espacio. **Acceder**→R11 secundario y **Crear cuenta**→R10 destacado solo cuando el alta esté operativa. En catálogo y ficha, la acción contextual de evaluación prevalece sobre el alta genérica. No más de un CTA de máxima jerarquía por bloque.

Footer: Producto (R01, R03, R04); Ayuda (R05, R09); Empresa (R07, R08/R13/R14 solo activos); Legal (R15–R17 aplicables). Incluir identidad y advertencias propias aprobadas; no trasladar el disclaimer de Lofty. No reproducir su lista extensa de ciudades sin oferta y contenido específicos.

Mobile conserva destinos y orden; usa SiteHeader/NavDisclosure. El menú debe permitir cerrar, devolver foco y mantener la página subyacente estable. Es un requisito propuesto de implementación, no una observación de Lofty. Las páginas operativas tienen breadcrumb R00→R01→R02 y retorno al catálogo conservando filtros. Los artículos R06 muestran R05 y tema padre, sin rutas de categoría ficticias.

## Distribución: resumen, profundización, operación

| Tema | Resumen | Fuente canónica | Uso operativo / regla de reutilización |
|---|---|---|---|
| Qué se obtiene y quién puede participar | R00, una frase precisa | R03, con condiciones y derechos | R10 muestra elegibilidad antes del alta; R02 particularidades |
| Oferta disponible | R00, muestra limitada y fechada | R01 resultados | R02 única fuente de detalle por activo/oferta |
| Costos | R00 enlace explícito, sin cifra si no está verificada | R04 estructura general | R02 aplica costos a esa oferta; enlaza metodología |
| Riesgos y salida | R00 advertencia breve; R03 explicación | R04 | R02 riesgos específicos y condiciones antes de CTA |
| Rendimientos / valorización | No necesarios en hero | R04 metodología | R02 solo datos trazables, separando pasado/estimación/escenario |
| Operación y gestión | R03 síntesis | R06 artículos por tarea | R02 gestor, responsabilidades, reportes y novedades |
| Confianza | R00 evidencia seleccionada | R07 identidad; R08 experiencias opcional | Documentos y eventos materiales en R02 |
| Ayuda | FAQ breve en R00/R03 | R06 respuesta única con slug estable | R05 índice; R09 escalamiento |
| Captación de propietarios | Enlace de audiencia separado | R13 | Solicitud independiente del alta de inversor |

Una respuesta puede aparecer resumida en varias páginas, pero se edita una sola entidad FAQ/Guide. Los valores dinámicos no se duplican como texto CMS. Resúmenes deben conservar condiciones materiales; un enlace no corrige una afirmación engañosa en el hero.

## Recorridos y dependencias

| Recorrido | Secuencia propuesta y salidas | Qué debe comprender antes de avanzar | Evidencia que inspira / límite |
|---|---|---|---|
| Descubrir | R00→R03→R04→R01→R02 | Naturaleza del producto, derechos, costos y riesgo | L0/L1; orden propuesto, no analítica de uso |
| Buscar oferta | R00→R01→R02; volver R01 con filtros | Diferencia entre activo y oferta; significado de métricas | L2/L3; lógica completa de filtros no verificada |
| Evaluar | R02 `#resumen`→`#datos`→`#documentos`→`#riesgos`→R10 | Condiciones específicas, actualidad de datos y limitaciones de salida | L3; documentación mencionada pero acceso no comprobado |
| Iniciar cuenta | R02→R10 con ID de oferta→identidad/validación real | Abrir cuenta no equivale a comprar ni reservar | Buy→signup observado; continuación privada no observada |
| Resolver duda | R03/R02→R05→R06→R09 | Respuesta y condiciones vigentes | FAQs observadas; búsqueda de ayuda propuesta |
| Verificar empresa | R00/R02→R07→R09; R08 opcional | Responsables, roles y fuente de testimonios | L4/L6; no inferir eficacia |
| Publicar inmueble | R13→`#requisitos`→`#proceso`→`#solicitud` | Elegibilidad, gastos, compromisos y revisión | L5; producto propio condicional |

Retorno de R10: conservar contexto de oferta mediante identificador validado y destino interno permitido. No usar un parámetro arbitrario como redirección externa. Si la oferta cambia de estado durante el registro, volver a ficha con estado actual y explicación; nunca prometer disponibilidad mantenida. Esto es diseño propuesto del límite entre web y app, no especificación transaccional.

## Prioridad editorial y confianza

Esencial: propuesta precisa; inventario; ficha verificable; funcionamiento; costos/riesgos; identidad; ayuda; términos aplicables; requisitos y acceso. Complementario: historias de clientes, videos, prensa, casos de propietarios. Prescindible: ticker, promociones, ranking de competidores, gamificación, calculadora si no existe metodología aprobada. Se omiten por falta de necesidad demostrada o dependencia de datos, no porque se haya medido un efecto negativo.

La confianza se construye mostrando fuente, fecha, responsables y eventos materiales junto a la decisión. Una cita de prensa no prueba rendimiento; una review no prueba elegibilidad; un valor estimado no prueba precio de venta. Las actualizaciones adversas de una propiedad deben tener el mismo canal que las favorables. No esconderlas en un carrusel de marketing.

## Información del negocio pendiente — bloqueo de publicación

1. Nombre, identidad legal, jurisdicciones, domicilio y canales reales; propietario de cada página.
2. Modelo exacto: qué adquiere el usuario, derechos, intermediarios, custodia, límites de responsabilidad y revisores autorizados.
3. Público admitido, países, requisitos de elegibilidad/verificación, restricciones y lenguaje aprobado.
4. Inventario real; diferencia activo/oferta; estados; moneda; unidad; disponibilidad; fuentes y frecuencia de actualización.
5. Modelo de ingresos, distribución, gastos, impuestos y documentación; no reutilizar supuestos LLC, tokens, USDC o renta diaria.
6. Mecanismo de salida, si existe; reglas de órdenes, contraparte, demoras y ausencia/presencia de mercado secundario comprobada.
7. Definiciones y fuentes de cada métrica; períodos, supuestos, método de estimación y tratamiento de datos faltantes.
8. Gestores, contratos, derechos sobre fotos/mapas, documentos aprobados y visibilidad pública/privada.
9. Riesgos, conflictos, incidencias, procesos de actualización y responsables de revisión.
10. Métodos reales de registro/acceso, URL de la app y contrato para conservar contexto; no se especificó el flujo privado.
11. Canales de soporte, plazos confirmados, campos necesarios, finalidad y retención de datos de formularios.
12. Testimonios y logos autorizados, atribuciones y evidencia; sin ellos omitir bloques de prueba social.
13. Existencia del servicio a propietarios y reglas de admisión; si no existe, eliminar R13.
14. Licencias tipográficas y assets propios para aplicar [DESIGN.md](../research/DESIGN.md); textos finales, traducciones y política de movimiento/accesibilidad.
