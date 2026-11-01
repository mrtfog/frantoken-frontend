# Decisiones del modelo de negocio

## Decisiones aprobadas exclusivamente para el MVP

**Confirmación del usuario, 2026-11-01:** [MVP académico y evidencia de aprobación](MVP-ACADEMICO.md#fuente-autoridad-y-límites). MVP-01–MVP-06 están aprobadas para esta demostración: pago simulado, inicio manual de operación, períodos mensuales con importe manual, prorrata al ejecutar y reclamo individual, transferencias deshabilitadas, Hardhat local y token de pago de prueba. Implementación pendiente; el encargo actual autoriza solo documentación y ramas.

| Pendiente del modelo completo | Resolución para la demostración |
|---|---|
| BUS-03 / D03, BUS-04 / D04 y BUS-06 / D06 | Derecho académico a ingresos variables: prorrata de tokens en circulación al ejecutar cada distribución mensual, con importe manual; no retorno fijo ni snapshot previo. |
| BUS-05 / D05 | Campaña, meta, devolución y cierre financiero fuera del MVP. |
| BUS-07 / D07 | El administrador marca el inicio de operación; no se requiere probar apertura física. |
| BUS-08 / D08 | Pago de compra simulado; fondeo y reclamo de ingresos con token de prueba, sin conversión real USD/activo. |
| BUS-09 / D09 | Transferencias entre inversores deshabilitadas; sin rescate ni liquidación automática. |
| BUS-10 / D10 | Hardhat local, roles usuario/admin y permisos técnicos del prototipo. Una red pública o Besu no reemplazan esta elección sin decisión posterior. |
| BUS-12 / D12 | No se confirma comisión comercial definitiva; el 0,5 % permanece como ejemplo C3. |
| BUS-13 y BUS-14 | Ingreso distribuible cargado manualmente; operación y contabilidad reales fuera de alcance. |

Los IDs BUS y D mantienen su correspondencia histórica entre repositorios. Las filas posteriores siguen abiertas **para una operación con valor real**, no para bloquear las definiciones académicas aquí aprobadas. La evidencia y los documentos fuente originales se conservan.

## Registro del modelo completo y antecedentes

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

## Reconciliación del 2026-11-01

Actualizado: 2026-11-01. Ver [modelo vigente](BUSINESS-LOGIC.md), [DTE](LIFECYCLES.md), [estado técnico](IMPLEMENTATION-STATUS.md) y [fuentes](source/README.md). «Declarado» describe el modelo aportado; no prueba contratos firmados ni habilitación operativa.

### Definiciones recibidas

| Definición | Estado y evidencia | Límite |
|---|---|---|
| Precio de suscripción | **Fijo: USD 10 por token + fees de transacción blockchain**, instrucción del usuario recibida para esta actualización. | Sustituye precio estimativo y gastos adicionales genéricos de §6.4; falta especificar pago efectivo del gas y conversión. |
| Vehículo y jurisdicción de referencia | La presentación final §5.2 declara fideicomiso financiero; Argentina es referencia académica. | Constitución, sujetos, instrumento y encuadre concreto pendientes. |
| Ciclos de vida | Ambos DTE recibidos definen estados, guardas y acciones de proyecto y token. | No implementan campaña, devolución, liquidación ni quema económica. |
| Transferencias y distribuciones | DTE: reglas de elegibilidad, conservación de devengados y reparto condicionado a caja/senior. | El código tiene diferencias y no define fórmula jurídica ni corte por período. |
| C3 sobre compras | PDF del 29-10-2026 y prototipo: cálculo y registro, ejemplo 0,5 %. | No es aprobación comercial definitiva; no cobra ni sustituye gestión/resultado. |

### Parámetros todavía abiertos

Los IDs `BUS-*` siguen el registro del frontend. Los D01–D12 de blockchain se corresponden numéricamente con BUS-01–BUS-12, sin convertir ambos registros en la misma evidencia histórica.

| ID | Aclarado por las nuevas fuentes | Pendiente para operación |
|---|---|---|
| BUS-01 / D01 | Argentina como referencia del análisis. | Jurisdicciones efectivas, residencia, encuadre y condiciones de admisión/oferta. |
| BUS-02 / D02 | Fideicomiso financiero declarado; C1–C4 separados y previos a publicación en el DTE. | Tipo/instrumento definitivo, fiduciario, fiduciante, emisor, firmantes y constitución. |
| BUS-03 / D03 | Derechos económicos definidos en C4, sin propiedad ni voto automáticos. | Naturaleza, obligado, fórmula, plazo y documentación concreta. |
| BUS-04 / D04 | Precio fijo no equivale a porcentaje de ganancias o propiedad. | Clases, denominadores, cantidad emitible, divisibilidad, decimales y asignación. |
| BUS-05 / D05 | Fin del período: objetivo alcanzado → financiado; no alcanzado → devolución/cancelación. | Meta, mínimo/máximo, plazo, excedentes, fondos reservados, procedimiento y responsable de devolución. |
| BUS-06 / D06 | Operación → C1 → C2/C3 → reservas → C4; caja positiva y sin senior vencida. | Base exacta, prioridades internas, reservas, pérdidas, impuestos, periodicidad, corte y uso de fondos por rubro. |
| BUS-07 / D07 | C1 vigente antes de desembolsos; local habilitado para activar C2. | Franquicia/operadora concretas, consentimientos, habilitaciones, presupuesto, sustitución y traspaso. |
| BUS-08 / D08 | Cobro externo para C4; pagos C1/C2 y reparto en token de pago en el prototipo. | Elegir modelo monetario, cuentas, activos, red, custodia, conversión, fees, finalidad de pago y conciliación. |
| BUS-09 / D09 | Transferencias condicionadas, congelamiento y salidas Redimido/Anulado modeladas. | Lock-up y umbrales, KYC bilateral, recuperación, sucesión, aceptación secundaria, rescate, devolución y liquidación; validar supuesto de quema y reclamos pendientes. |
| BUS-10 / D10 | Prototipo ERC-3643 y C1–C4 existentes; controlador de emisión configurable. | Registro autorizado, red real, permisos, administración, upgrades, identidad completa, auditoría e integración API/C4. |
| BUS-11 / D11 | Proyecto, emisión, vehículo y tenencias requieren identificación separada. | Unidad por vehículo, múltiples emisiones/cartera, segregación de fondos y unicidad de pagos entre emisiones. |
| BUS-12 / D12 | Precio fijo y fees separados; 0,5 % es ejemplo de comisión calculada del prototipo. | Tasa definitiva, gestión/resultado, bases, obligado, aprobador, pagador, registro de pago, impuestos y prelación C3. |
| BUS-13 | Ventas, remesas, aportes y distribuciones son flujos distintos. | Fuentes operativas, cuentas identificadas, conciliación y no duplicación de honorarios ya pagados. |
| BUS-14 | Operadora administra y FranToken monitorea; C2 contiene reportes/KPIs. | Indicadores concretos, verificación, auditoría, intervención, sustitución y desvíos de presupuesto. |

Ninguna fila queda completamente cerrada para operar con valor real. Registrar decisión, responsable, fecha, términos y evidencia antes de habilitar la operación afectada; conservar el historial de decisiones sustituidas.
