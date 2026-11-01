# Recorrido frontend del MVP académico

Fecha: 2026-11-01. Especificación de integración derivada del [alcance confirmado](../business/MVP-ACADEMICO.md), **pendiente de implementación**. No altera rutas, componentes, contratos de API ni dependencias en esta entrega.

## Pantallas y acciones esperadas

| Pantalla / recorrido | Información y acción mínima |
|---|---|
| `/marketplace` | Franquicias de prueba publicadas; estado y enlace a detalle. No confundir marcas referenciadas con alianzas o unidades reales. |
| `/marketplace/[slug]` | Identidad del proyecto/emisión, precio USD 10, cantidad disponible, estado y acción de compra. Identificar claramente simulación y gas separado. |
| Compra desde la ficha | Requerir sesión y wallet controlada por el usuario; ingresar cantidad, aceptar términos demo, confirmar principal y pago simulado. Consultar el resultado hasta emisión confirmada sin repetir la compra. |
| `/mi-cuenta/tokens` | Tenencias consultadas en los contratos de las franquicias; compras con referencia/estado e ingresos disponibles/cobrados. Los datos fijos históricos quedan identificados como ejemplos, sin mezclarlos con operaciones del MVP. |
| Cobro de ingresos | Mostrar activo de prueba y saldo reclamable; el titular firma claimRevenue. Distinguir firma, envío, confirmación y error. Actualizar saldo e historial al confirmar. |
| Administración | Publicar franquicias de prueba, marcar inicio de operación y registrar/fondear el importe de cada mes. Acceso solo a administradores. La ruta y composición de esta pantalla quedan como elección de implementación. |

El registro y la vinculación de wallet no compran ni reservan tokens. No mostrar una compra como emitida por una confirmación visual del pago simulado; esperar el resultado de C4. El código de UI no decide cuánto emitir ni puede confirmar por sí solo una distribución.

## Contrato funcional de integración

Estos son datos mínimos de integración, no nombres de endpoints ya implementados ni un esquema de API aprobado:

- **Proyecto:** identificador estable, franquicia, estado, red/contrato de token y C4, disponibilidad y precio de referencia.
- **Compra:** referencia idempotente, proyecto/emisión, usuario/wallet, cantidad, principal exacto en USD, pago simulado, estado de emisión y hash de transacción.
- **Distribución:** identificador, franquicia/emisión, período mensual, importe exacto y activo de prueba, estado y referencia de transacción. Unicidad por franquicia y período.
- **Cobro:** wallet titular, franquicia/contrato, importe y activo, hash y estado de confirmación. El saldo reclamable proviene del contrato.

La API confirma el pago simulado y usa el verificador de prueba para C4. El inversor firma aceptación y reclamo desde su wallet; el servidor no debe usar su clave administrativa para reclamar en nombre del titular. Para el MVP se pueden leer saldos directamente por RPC y persistir referencias, sin indexador completo. No se introduce un proveedor nuevo por esta documentación.

## Estados visibles y criterios de interacción

1. Mostrar contexto de red local y activos de prueba durante compra y cobro. USD 10 es el precio de referencia simulado; el activo recibido al reclamar es un token de prueba, sin conversión a dólares reales.
2. Mostrar compra pendiente, pago simulado confirmado, emisión pendiente, emisión confirmada y error recuperable con su referencia. Ante timeout, consultar antes de ofrecer un nuevo envío.
3. La franquicia empieza a generar distribuciones solo después de que el administrador la marque en operación. Cada mes se registra manualmente; se puede acelerar la secuencia de meses en la presentación, sin prometer automatización por calendario.
4. Mostrar ingresos disponibles y cobrados por separado. El reclamo puede retirar lo acumulado de varios períodos conforme al contrato; no prometer un reclamo aislado por mes.
5. La prorrata usa el saldo al ejecutar la distribución. Una compra posterior participa de distribuciones futuras y no de las anteriores. No mostrar un ROI fijo ni confundir las regalías C1 con el ingreso al inversor.
6. No ofrecer enviar, vender o intercambiar tokens. La implementación futura debe bloquear también transferencias directas y delegadas on-chain; ocultar botones no alcanza.
7. Una franquicia cerrada no admite compras/distribuciones nuevas; los ingresos ya asignados siguen visibles y reclamables conforme a controles del contrato.
8. Autorización de usuario/admin y propiedad de compras en servidor; habilitación de identidad demo donde la exija el contrato. La prueba de control de wallet es independiente del formulario de perfil.

El diseño futuro debe respetar [Code Architecture](CODE-ARCHITECTURE.md) y [UI Contract](../design/UI-CONTRACT.md). No se exige rediseñar la identidad visual ni adaptar todas las especificaciones inmobiliarias históricas para completar este recorrido.

## Validación pendiente

La aceptación funcional seguirá los casos del [MVP común](../business/MVP-ACADEMICO.md#controles-mínimos-y-criterios-de-aceptación): compra completa, reintento sin doble emisión, dos titulares con reparto proporcional, mes siguiente simulado, cobro sin repetición, rechazo de transferencia y acciones administrativas protegidas. Esta entrega verifica documentación y enlaces; no afirma una integración web/API/blockchain funcional.
