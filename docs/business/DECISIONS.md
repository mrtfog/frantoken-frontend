# Decisiones del modelo de negocio

Este registro adapta los pendientes de la [sección 1.6 del manual recibido](source/FranToken-manual-consulta-v2.md#16-decisiones-pendientes). Los IDs `BUS-*` evitan confundirlos con las decisiones `WEB-*` del [harness web](../DECISIONS.md). **Pendiente** no niega el modelo declarado en [Business Logic](BUSINESS-LOGIC.md); indica que faltan parámetros, sujetos, documentos o validación para una operación concreta. Cambiar el estado solo con decisión explícita, responsable, fecha y evidencia enlazada.

| ID | Definición pendiente | Estado | Responsable / evidencia |
|---|---|---|---|
| BUS-01 | Jurisdicciones de emisión, unidad e inversores; condiciones aplicables | Pendiente | — |
| BUS-02 | Tipo de fideicomiso, fiduciario, fiduciante, emisor y firmantes de C1–C4 | Pendiente | — |
| BUS-03 | Instrumento jurídico y derechos que representa cada token | Pendiente | — |
| BUS-04 | Clases de emisión, unidades elegibles y denominadores de porcentajes | Pendiente | — |
| BUS-05 | Objetivo mínimo/máximo, plazo, cierre, excedentes y devoluciones | Pendiente | — |
| BUS-06 | Base distribuible, prelación, reservas, periodicidad e impuestos | Pendiente | — |
| BUS-07 | Franquicia concreta, alcance de compra, consentimiento y operadora | Pendiente | — |
| BUS-08 | Cuentas, moneda, pagos, conversión, custodia y conciliación | Pendiente | — |
| BUS-09 | Transferencia, rescate, pérdida de acceso, sucesión y salida | Pendiente | — |
| BUS-10 | Registro autorizado, red, estándar, permisos y automatización de C1–C4 | Pendiente | — |
| BUS-11 | Unidad por vehículo, varias emisiones o cartera; segregación de fondos y derechos | Pendiente | — |
| BUS-12 | Comisión de gestión y remuneración por ganancia de FranToken: bases, tasas, obligado, pagador y prelación | Pendiente | — |
| BUS-13 | Caja de explotación, cobros, remesas al vehículo y conciliación de honorarios | Pendiente | — |
| BUS-14 | Indicadores, reporting, auditoría, intervención y sustitución de operadora | Pendiente | — |

Antes de habilitar una oferta, reconciliar las decisiones relevantes con C1–C4, el instrumento del vehículo, fuentes operativas y revisión competente. Una decisión comercial no demuestra por sí sola validez legal, exactitud financiera ni disponibilidad técnica.

## Datos de la solicitud demo

El formulario `/abrir-franquicia` **propone** campos para evaluar una franquicia: marca, sector, ubicación, costo total, moneda, ingresos y margen histórico de tres años, fuente de esos datos, responsable operativo, mes estimado de apertura y descripción. Es una captura local de demostración; no define criterios de admisión, métricas verificadas ni apertura efectiva. Para convertirlo en proceso real permanecen pendientes, entre otras, BUS-01, BUS-02, BUS-07, BUS-08 y BUS-14. No se modificó el estado de ninguna decisión.
