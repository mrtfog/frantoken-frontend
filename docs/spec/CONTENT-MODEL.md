# Modelo de contenidos — independiente del framework

## Alcance, procedencia y reglas

Modelo **propuesto** para CMS y servicios de datos de la marca propia. Las entidades se inspiran en contenido observado en Lofty L0–L8; sus campos y obligatoriedad son decisiones de diseño, no una inferencia del esquema interno de Lofty. Ver [CONTENT-AUDIT.md](../research/CONTENT-AUDIT.md) para evidencia del 5 de octubre local / 6 UTC de 2026 y límites. No presupone vehículo legal, tokenización, rendimiento, renta diaria, mercado secundario ni moneda.

**R** obligatorio para publicar la entidad; **C** obligatorio cuando se cumple la condición descrita; **O** opcional. Un campo puede ser obligatorio en el modelo propuesto aunque falte en el contenido observado. Los borradores admiten vacíos, la publicación no. Los valores operativos se obtienen de una fuente autorizada; no son textos editables para marketing.

Tipos abstractos: ID estable, texto corto, texto largo/rich text estructurado, enum, booleano, entero, decimal de precisión fija, fecha ISO, fecha-hora con zona, URL validada, lista y referencia. Dinero = decimal + código de moneda; porcentaje = decimal con escala documentada; nunca floats binarios para importes. `null` = no disponible; 0 = cero informado. No intercambiarlos. Rich text solo permite nodos editoriales acordados, no HTML arbitrario.

## Campos transversales

| Campo | Tipo | Obligación | Regla |
|---|---|---|---|
| id | ID | R | Inmutable, independiente del slug |
| locale | código de idioma | R en contenido traducible | No mezclar idiomas silenciosamente |
| status | draft / review / published / archived | R | Publicación sujeta a completitud y aprobación |
| owner | referencia a responsable editorial | R | Persona/equipo que mantiene el dato |
| updatedAt, reviewedAt | fecha-hora | R al publicar | Distinguir edición de revisión de exactitud |
| reviewDueAt | fecha | C para afirmaciones/condiciones sensibles | Política propia de caducidad, no plazo inventado |
| sourceRefs | lista de Source | C en datos/afirmaciones | Obligatorio si hay una afirmación verificable |
| approvalRef | referencia de aprobación | C para condiciones, riesgos y claims | Responsable competente del negocio; no aprobación automática |
| slug | texto único por tipo/idioma | C para entidad con página | Cambio genera redirección; no duplicar rutas |

`Source`: id, tipo (documento interno autorizado / proveedor / URL pública / cálculo aprobado), localizador, editor, fecha de consulta, período cubierto y notas de alcance. Obligatorio localizador resoluble para revisores; puede ser privado. Nunca publicar URLs internas sensibles por reutilizar referencias.

## 1. SiteConfig, Organization y Navigation

Base transversal propuesta; identidad, navegación y footer observados en L0–L8.

| Campo | Tipo | Obligación | Uso, relación y regla |
|---|---|---|---|
| SiteConfig.brandName / organization | texto / ref Organization | R | Nombre propio; no reutilizar logos ni denominación Lofty/LangChain |
| SiteConfig.logo / locales | ref MediaAsset / lista códigos | R | Logo autorizado y versiones idiomáticas |
| SiteConfig.activeFeatures | lista enum | R | accounts, owners, reviews, marketActivity, scenarios; gobierna rutas condicionales |
| SiteConfig.supportChannels | lista canal+destino+horario | R | Solo canales operativos; no SLA si no está confirmado |
| Organization.legalName / role / jurisdiction | texto / texto / lista | R | Identificar entidad, función y alcance real |
| Organization.address / contact | texto / canal | C | Según información publicable y exigencias validadas |
| Navigation.items | lista label+routeId+children+priority | R | Destino debe existir y estar activo; no URL # vacía |
| Navigation.externalDestination | URL+etiqueta externa | C para enlaces externos | Lista permitida y comprobada, no redirección arbitraria |

## 2. Page y EditorialBlock

Orden de secciones observado; composición estructurada propuesta para evitar páginas HTML libres.

| Campo | Tipo | Obligación | Uso, relación y regla |
|---|---|---|---|
| routeId / template / title / summary | enum / enum / texto / texto | R | Plantillas de [PAGE-BLUEPRINTS.md](PAGE-BLUEPRINTS.md); H1 de página único |
| blocks | lista discriminada de EditorialBlock | R | Tipos hero, steps, cardGroup, metrics, faqGroup, disclosure, closingCTA; orden explícito |
| block.id / kind / heading / body | ID / enum / texto / rich text | R id/kind; C contenido | Nivel H2/H3 lo determina el template, no el editor por tamaño |
| block.references | refs tipadas | C según bloque | FAQ, Claim, Property, Person; no duplicar valores en body |
| block.priority / visibilityCondition | P1/P2/P3 / regla enum | R / O | No ocultar P1 por viewport; condiciones solo de negocio/función |
| CTA.label / destination / intent | texto / ruta+params o URL / enum | C cuando hay acción | Intent: explorar, aprender, contactar, iniciarCuenta; no confundir envío con navegación |
| seoTitle / seoDescription | texto | R al publicar | Resumen preciso; no añadir promesas no sustentadas |
| heroAsset | ref MediaAsset | O | Decorativo o explicativo declarado; no necesario en contenido operativo |

## 3. ProductPolicy, Step y EligibilityRule

Conceptos, pasos, derechos y requisitos observados en L1/L8; estructura normalizada propuesta.

| Campo | Tipo | Obligación | Uso, relación y regla |
|---|---|---|---|
| ProductPolicy.productNature / userRights | texto / lista texto | R | Qué se obtiene y qué derechos produce, en términos propios |
| ProductPolicy.roles / limitations | lista rol+responsabilidad / lista | R | Plataforma, gestor, intermediarios si existen; no asumir LLC o blockchain |
| EligibilityRule.subject / rule / appliesTo | texto / texto / ref producto/oferta | R | Regla explícita y origen aprobado; evita inventar países o edades |
| Step.order / title / action / outcome | entero / texto / texto / texto | R | Secuencia de tareas y resultado real, sin plazo prometido |
| Step.prerequisites / owner / nextRoute | lista / rol / routeId | R | Requisitos previos y siguiente destino; permite alternativa de ayuda |
| Step.duration | duración+rango+fuente | O | Publicar solo si verificada y contextualizada |

## 4. Property — inmueble

Entidad observada en catálogo y ficha L2/L3. Separar activo físico de oferta disponible.

| Campo | Tipo | Obligación | Uso, relación y regla |
|---|---|---|---|
| name / slug / propertyType / market | texto / slug / ref taxonomía / ref Market | R | Nombre identificable y filtros basados en taxonomía común |
| publicLocation | objeto ciudad/región/país/dirección | R ciudad/región/país; C dirección | Dirección exacta solo cuando autorizada |
| coordinates | latitud/longitud+precisión | O | No publicar ubicación más precisa de lo autorizado |
| description | rich text | R | Descripción propia con atributos comprobados |
| bedrooms / bathrooms / area | decimal / decimal / decimal+unidad | C si aplican al tipo | No forzar atributos residenciales sobre local comercial |
| gallery | lista MediaAsset ordenada | R al publicar ficha | Foto principal y derechos; alt descriptivo, no cifras comerciales |
| manager | ref Manager | C si existe gestión externa/interna | Responsabilidades visibles en ficha; no referencia huérfana |
| offers / documents / updates / risks | refs a entidades | C según existencia | La relación riesgo debe cubrir riesgos específicos o remitir al general aprobado |
| operatingAttributes | lista campo tipado | O | Ocupación/arrendamiento etc solo verificados; no bolsa libre de claims |

## 5. Offer — condiciones de participación

Precios, unidad, estado y CTA observados en L2/L3. Semántica propia requiere validación comercial/legal.

| Campo | Tipo | Obligación | Uso, relación y regla |
|---|---|---|---|
| property / offerCode | ref Property / ID externo | R | Puede haber varias ofertas históricas de un mismo inmueble |
| status | draft / open / paused / closed / unavailable | R dinámico | Mapear estados reales del servicio; no habilitar CTA por texto CMS |
| instrumentDescription / rights / terms | texto / ref Policy / ref Document | R | Definir qué se adquiere; no copiar tokens ni participación societaria sin confirmación |
| unitLabel / currency | texto / código moneda | R si hay precio | Diferenciar unidad, participación, activo completo y precio total |
| entryPrice / minimumAmount | Money / Money | C si aplican | Fuente operativa y fecha; no hardcodear una cifra promocional |
| availability / asOf / freshnessStatus | decimal o enum / fecha-hora / enum | R cuando se publica disponibilidad | unknown no equivale a disponible; definir vencimiento por fuente |
| eligibility / costs / risks | refs | R | Requisitos y condiciones antes de CTA |
| entryAction | routeId+contextId | R | R10 o R09 según producto; contexto interno permitido |
| exitMechanism | texto+Policy | R para explicar posibilidad o limitación | No prometer venta inmediata ni mercado donde no existe |

## 6. Market, PropertyType y Manager

Ubicación, categorías y responsable observados en L2/L3.

| Campo | Tipo | Obligación | Uso, relación y regla |
|---|---|---|---|
| Market.name / country / region / slug | texto | R | Taxonomía de oferta real; no generar landings vacías |
| Market.context / sources | rich text / lista Source | O / C si contexto factual | Distinguir datos de zona de performance del inmueble |
| PropertyType.code / label | ID / texto | R | Lista propia, estable entre CMS, filtros y API |
| Manager.name / role / responsibilities | texto / texto / lista | R | Gestión concreta, no credencial vaga |
| Manager.profileAsset / profileText | MediaAsset / rich text | O | Con consentimiento/licencia |
| Manager.contactPolicy | texto+routeId | R | Canal permitido de ayuda; no exponer contacto personal privado |

## 7. MetricDefinition y MetricSnapshot

Métricas observadas en L0/L2/L3, con valores y períodos no siempre homogéneos. Normalización propuesta imprescindible.

| Campo | Tipo | Obligación | Uso, relación y regla |
|---|---|---|---|
| Definition.key / label / unit | ID / texto / enum+escala | R | Money, percent, count, area; moneda/unidad donde corresponda |
| Definition.kind | actual / historical / estimate / scenario | R | No comparar como equivalentes; tipo visible al usuario |
| Definition.method / limitations | rich text / texto | R | Cálculo, bruto/neto, anualización, inclusiones y exclusiones |
| Definition.source / reviewer | ref Source / responsable | R | No basta con la cifra publicada por un tercero |
| Snapshot.definition / subject | ref / ref Offer-Property-Organization | R | La cifra tiene sujeto concreto |
| Snapshot.value / currency | decimal nullable / código | R value; C moneda | Null conserva estado missing; nunca sustituir por cero |
| Snapshot.periodStart / periodEnd / asOf | fecha / fecha / fecha-hora | C para períodos; R asOf | Fecha de cálculo distinta de período de medición |
| Snapshot.status / sourceRecord | fresh / stale / missing / error + ref | R | Caducidad definida por negocio/API; no inventar frecuencia |
| Snapshot.contextNote | texto | C si hay excepción o cambio de metodología | Mostrar cerca de cifra, no solo en tooltip |
| Snapshot.revision | entero | R | Trazar correcciones; no sobrescribir historia silenciosamente |

## 8. CostItem y Risk

Gastos, limitaciones y advertencias observados en L1/L3/footer; campos propios propuestos.

| Campo | Tipo | Obligación | Uso, relación y regla |
|---|---|---|---|
| CostItem.label / appliesTo / payer | texto / ref producto-oferta / enum propio | R | Quién paga y a qué se aplica |
| CostItem.basis / amountOrRate / timing | texto / Money o percent o fórmula / texto | R | Cifra, rango o método; no omitir base y momento |
| CostItem.exceptions / taxNote | texto | C si aplica | Textos aprobados; no consejo fiscal genérico |
| Risk.category / title / explanation | taxonomía / texto / rich text | R | Riesgo general o específico distinguido |
| Risk.scope / impact / limitations | refs / texto / texto | R | Qué puede pasar y qué no mitiga la plataforma |
| Risk.relatedDocuments / prominence | refs / primary-secondary | R | Primary siempre visible en la ficha; no escondido en FAQ |
| effectiveFrom / effectiveTo | fecha | R desde; O hasta | Vigencia separada de fecha editorial; aprobación registrada |

## 9. Document y PropertyUpdate

Documentación mencionada y novedades observadas L3. Acceso efectivo a due diligence no quedó verificado.

| Campo | Tipo | Obligación | Uso, relación y regla |
|---|---|---|---|
| Document.title / category / file | texto / enum / MediaAsset o URL | R | Documento útil identificable; enlace verificado |
| Document.subject / version / issuedAt | refs / texto / fecha | R | Activo/oferta/política correspondiente |
| Document.access | public / authenticated / restricted | R | Decisión del negocio, no supuesto sobre Lofty |
| Document.validity / supersedes | estado / ref Document | R / O | Documento retirado y reemplazo identificables |
| Document.format / sizeBytes / language | texto / entero / código | R | Permite anticipar descarga y elegir idioma |
| Update.subject / title / body / eventDate | ref Property-Offer / texto / rich text / fecha | R | Fecha del hecho distinta de publicación |
| Update.category / materiality / source | taxonomía / enum aprobado / ref Source | R | Incluye incidentes adversos, gestión, estados y novedades |
| Update.documents / correctedUpdate | refs | O | Trazabilidad de anexos y correcciones; nunca borrar por ser desfavorable |

## 10. FAQ y Guide

Preguntas y explicación observadas L0/L1/L3/L5/L7; artículos de ayuda propuestos.

| Campo | Tipo | Obligación | Uso, relación y regla |
|---|---|---|---|
| FAQ.question / shortAnswer / topic | texto / rich text / taxonomía | R | Respuesta reutilizable, independiente de presentación accordion |
| FAQ.scope / detailedGuide / relatedItems | refs / ref Guide / refs | R scope; O resto | General y específica diferenciadas; no aplicar a toda oferta por defecto |
| Guide.slug / title / summary / audience | texto / texto / texto / enum | R | Tarea individual; audiencia no inferida como segmentación oficial de Lofty |
| Guide.prerequisites / steps / exceptions | lista / lista Step / lista | C según tipo | Procedimiento real y verificable |
| Guide.body / nextDestination | rich text / CTA | R | Respuesta primero, detalle después, salida de ayuda R09 |
| Guide.relatedGuides / policies | refs | O / C si tiene condiciones | Actualización cuando cambie la política fuente |

## 11. Claim, Review, Person y MediaAsset

Prensa, citas, métricas institucionales, equipo e imágenes observados L0/L4/L6.

| Campo | Tipo | Obligación | Uso, relación y regla |
|---|---|---|---|
| Claim.text / source / scope / validUntil | texto / ref Source / texto / fecha | R salvo vencimiento si no aplica | No publicar claim sin evidencia y aprobación; no transferir cifras Lofty |
| Review.quote / authorDisplay / relationship / date | texto / texto / texto / fecha | R | Cita propia exacta y autorizada, no ejemplo ficticio presentado como real |
| Review.permission / source / disclosure | ref permiso / ref Source / texto | R / R / C | Relación comercial o incentivo declarado si existe |
| Review.rating / scale | decimal / mínimo-máximo | O; escala C si rating | Agregado requiere método, población, recuento y fecha; no promediar escalas incompatibles |
| Person.name / role / biography / portrait | texto / texto / rich text / MediaAsset | R nombre/rol; O resto | Experiencia verificable; consentimiento imagen |
| MediaAsset.file / purpose / alt / dimensions | URL o binario / enum / texto / width-height | R | Alt vacío solo decorativo; función editorial explícita |
| MediaAsset.owner / license / permission / credit | texto / texto / ref / texto | R propietario/licencia; C permiso/crédito | No reusar fotos de propiedad, marcas o retratos de referencia |
| MediaAsset.aspectTreatment | contain / crop+focalPoint | R para imágenes | Elegir según propósito; no recortar dato relevante en plano/documento |

## 12. Formularios y entrada a cuenta

L5 y L8 muestran formularios; no fueron enviados. Modelo de captura propuesto, sin almacenar datos personales en CMS editorial.

| Campo | Tipo | Obligación | Uso, relación y regla |
|---|---|---|---|
| FormDefinition.purpose / fields / endpointRef | texto / lista tipada / ref servicio | R | Finalidad y servicio real; excluir honeypots de contenido editorial |
| Field.key / label / type / required / validation | ID / texto / enum / booleano / reglas | R | Obligatoriedad justificada por negocio; no copiar la de Lofty |
| FormDefinition.privacyPolicy / successMessage / errorMessages | ref Policy / texto / mapa | R | Confirmar recepción ≠ aprobación; indicar siguiente paso |
| FormDefinition.retentionPolicy / accessRoles | refs / lista | R antes de activar | Datos capturados en servicio privado, con controles propios |
| AuthConfig.methods / providerRef / returnRoutes | lista / ref servicio / lista routeId | R si hay cuentas | Métodos reales; no activar Google sin integración aprobada |
| Lead.submittedAt / payload / consentRecord | fecha-hora / campos / registro | Servicio privado, fuera del CMS | Solo contexto del contrato; no recolectado en este trabajo |

## 13. Extensiones operativas opcionales

Order book y escenarios observados L3; NO obligatorios para una marca con otro mecanismo.

| Campo | Tipo | Obligación | Uso, relación y regla |
|---|---|---|---|
| MarketFeed.subject / asOf / status | ref Offer / fecha-hora / enum | R si se activa | API operativa; no editable en CMS |
| Quote.side / price / quantity / quoteTime | buy-sell / Money / decimal / fecha-hora | R si se muestra libro | Oferta no equivale a operación completada; unidades explícitas |
| Trade.price / quantity / executedAt | Money / decimal / fecha-hora | R si se muestran ejecuciones | Separado de tasación y órdenes; autorización de publicación |
| ScenarioMethod.inputs / formulaVersion / assumptions / limitations | schema / ID / lista / rich text | R si calculadora | Aprobación y pruebas de fórmula independientes; no copiar tasas de referencia |
| ScenarioResult.inputSnapshot / output / calculatedAt | objeto / métricas / fecha-hora | Derivado, no CMS | Siempre etiquetado como escenario, no promesa |
| ComparisonEntry.criteria / sources / checkedAt / disclosure | lista / refs / fecha / texto | R si R14 activa | Editorial prescindible; mantenimiento y conflicto de interés explícitos |

## Relaciones y propiedad de datos

| Relación | Cardinalidad propuesta | Regla de integridad |
|---|---|---|
| Market → Property | 1:N | Propiedad tiene un mercado principal; taxonomía secundaria opcional |
| Property → Offer | 1:N | Oferta conserva su propio estado y condiciones; historial no desaparece |
| Property → Manager | N:1 inicialmente | Si hay varios roles, usar relación con fechas/responsabilidad; no array ambiguo |
| Property/Offer → MetricSnapshot | 1:N | Cada snapshot referencia definición y fuente |
| ProductPolicy/Offer → Risk/CostItem | N:M | Evitar duplicar condiciones; particularidad de oferta prevalece explícitamente |
| Property/Offer → Document/Update | 1:N | Alcance y acceso de cada documento se validan |
| Page → FAQ/Guide/Claim/Review | N:M | Reutilizar referencias, no pegar copias divergentes |
| Page → EditorialBlock | 1:N ordenada | Solo tipos compatibles con plantilla |
| Offer → entrada a cuenta | Contexto, no entidad CMS de orden | No crear una compra ficticia ni mantener precio por mera navegación |

CMS: narrativa, taxonomías, medios autorizados, guías, FAQ, políticas, referencias y aprobaciones. Servicio de inventario: disponibilidad y estado. Servicio financiero autorizado: métricas/precios/operaciones cuando existan. Servicio de identidad: cuenta/acceso. Servicio de formularios: datos personales y consentimientos. Una entidad puede renderizarse desde varias fuentes, pero cada campo tiene una autoridad única.

## Validaciones editoriales y de publicación propuestas

1. Bloquear claims sin fuente, placeholders y entidades referenciadas ausentes o archivadas.
2. Rechazar precio sin moneda/unidad/fecha; rendimiento sin tipo/metodología/período; imagen sin licencia y función.
3. No publicar CTA hacia ruta inactiva, oferta cerrada o endpoint sin configurar. Estado de oferta cambia acción y explicación.
4. Señalar datos stale/missing/error; no sustituir por promedio inventado, cero o último dato sin fecha.
5. Exigir costos, riesgos y condiciones aplicables para una oferta publicable; dueño editorial y aprobación identificables.
6. Conservar versión, vigencia e historial de documentos y eventos materiales. No eliminar novedades desfavorables para mejorar narrativa.
7. Revisar traducciones cuando cambie la fuente; traducción pendiente no se presenta como vigente.
8. Preservar relaciones al cambiar slugs mediante redirecciones y validar la lista de destinos internos.
9. Revisión separada de contenido, exactitud de datos, derechos de uso y funcionamiento. No se afirma conformidad legal ni accesibilidad completa.

## Flujo editorial y mantenimiento

Borrador → revisión de contenido → revisión competente de condiciones/datos cuando aplique → publicación. Archivar retira promoción pero conserva ruta explicativa o redirección segura. Una actualización de ProductPolicy debe marcar FAQ, Guide, Page y Offer dependientes para revisión. Una actualización de MetricDefinition obliga a versionar cálculos posteriores; no cambia retrospectivamente los valores sin registrar corrección.

Frecuencia: definir por fuente y necesidad del negocio. No inventar un SLA de segundos para precios ni anual para políticas. El CMS almacena fecha de próxima revisión; la API informa asOf y estado. Las páginas muestran contexto temporal junto a valores, no solo en footer.

## Pendientes para convertir el esquema en CMS

Confirmar taxonomías y cardinalidades; dueño por campo; APIs y claves externas; estados reales de oferta; escala/unidad por métrica; reglas de frescura; derechos y documentos; acceso público/privado; formularios y retención; idiomas y revisores; existencia de escenarios o negociación; mecanismos de identidad y continuidad. No hay datos del negocio completados por inferencia.
