# Reconciliación de decisiones técnicas del contexto Solidity

> Alcance académico confirmado (2026-11-01): [MVP académico](business/MVP-ACADEMICO.md). Para esa entrega quedan definidos pago simulado, importe mensual manual, prorrata al ejecutar, reclamo por inversor, transferencias deshabilitadas y Hardhat local con token de prueba. Las tablas históricas siguientes conservan los pendientes para valor real; no invalidan esta confirmación. Actualización 2026-11-02: el backend se integra en `feat/mvp-integracion-completa`; Express sustituye el coordinador Next anterior. Ver el flujo vigente y la guía local.

> Actualización 2026-11-01: la tabla siguiente conserva la comparación histórica del material importado. La [revisión actual de los tres repositorios](business/IMPLEMENTATION-STATUS.md) incorpora C3/C4 y las correcciones del PDF. El [modelo vigente](business/BUSINESS-LOGIC.md) fija USD 10 por token más fees; [decisiones de negocio](business/DECISIONS.md) reconcilia Argentina, fideicomiso financiero, DTE y parámetros pendientes. Las frases «no comprobado desde este repositorio» de la comparación original describen su alcance histórico.

El [registro recibido del 04-10-2026](context/solidity-import/DECISIONS-BACKEND.md) contiene D01–D12 sobre otro checkout. El [manual v2 del 10-10-2026](business/source/FranToken-manual-consulta-v2.md#16-decisiones-pendientes) aporta definiciones del modelo y amplía la lista a D13–D14. La fuente canónica de pendientes de FranToken en este harness es [BUS-01–BUS-14](business/DECISIONS.md); los IDs `Dxx` de esta tabla solo permiten rastrear el documento importado. No se ha comprobado el código Solidity ni las pruebas de ese checkout desde este repositorio.

| ID importado → vigente | Aclarado por el manual v2 | Falta decidir o verificar | Estado |
|---|---|---|---|
| D01 → BUS-01 | El modelo se plantea para franquicias; Argentina figura solo como escenario posible. | Jurisdicciones, residencia, encuadre y admisión. | Pendiente |
| D02 → BUS-02 | Se adopta conceptualmente un fideicomiso como vehículo y se separan C1–C4. | Tipo, fiduciario, fiduciante, emisor, firmantes, facultades y constitución efectiva. | Parcial |
| D03 → BUS-03 | El token debe corresponder a derechos definidos en C4; no crea propiedad por sí solo. | Instrumento, derecho, obligado, prioridades y registro autorizado. | Parcial |
| D04 → BUS-04 | Se distingue costo financiado, unidades de emisión y derecho económico. | Clases, denominador y reglas de asignación reales. | Parcial |
| D05 → BUS-05 | Captación precede a compra en la secuencia conceptual. | Metas, plazos, cierre, excedentes, devolución y vínculo con emisión. | Parcial |
| D06 → BUS-06 | Distribución depende de C4 y de fondos disponibles. | Base, prelación, reservas, período, impuestos y corte. | Parcial |
| D07 → BUS-07 | Franquiciante y operadora son roles distintos; C1 y C2 cubren sus relaciones. | Marca, franquicia, consentimiento, alcance de compra y operadora concreta. | Parcial |
| D08 → BUS-08 | Aportes van al vehículo; explotación, remesas y distribuciones son flujos distintos. | Cuentas, moneda, cobro, conversión, custodia y conciliación. | Parcial |
| D09 → BUS-09 | El token no implica liquidez o libre transferencia. | Transferencias, rescate, recuperación, sucesión y salida. | Parcial |
| D10 → BUS-10 | C1–C4 son relaciones contractuales; no se presumen cuatro contratos ejecutables. | Red, estándar, registro, permisos, administración y upgrades. | Parcial |
| D11 → BUS-11 | El modelo admite franquicias de distintas marcas y sectores. | Unidad por vehículo, varias emisiones o cartera y segregación. | Parcial |
| D12 → BUS-12 | FranToken SAS tiene comisión de gestión y remuneración vinculada a ganancia, financiadas desde la explotación y documentadas en C3. | Bases, tasas, obligado, pagador, devengamiento, prelación, tributos y conflictos. | Parcial |
| Nuevo → BUS-13 | Se distingue caja de operación de remesas al vehículo. | Cobros, reportes, conciliación y tratamiento de honorarios ya pagados. | Parcial |
| Nuevo → BUS-14 | La operadora administra; FranToken monitorea y reporta. | Indicadores, auditoría, intervención y sustitución. | Parcial |

**Ninguna fila está cerrada.** “Parcial” identifica intención aportada, no un contrato firmado, una aprobación legal o una capacidad implementada. El [ADR importado](context/solidity-import/adr/0001-integracion-contratos-existentes.md) sigue en estado PROPUESTA y describe contratos ausentes de este checkout. Sus hallazgos se pueden usar como hipótesis para revisar el repositorio Solidity real; no se deben copiar sus números de despliegue, permisos o supuestos económicos al frontend.
