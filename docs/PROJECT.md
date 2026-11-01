# Contexto del proyecto en este repositorio

## Entrega de implementación académica

La rama `feat/academic-mvp` parte del `develop` local e incorpora las definiciones aprobadas antes de implementar. El recorrido de compra simulada, emisión C4, distribución mensual y reclamo está implementado; las evidencias y limitaciones se registran en [estado técnico](business/IMPLEMENTATION-STATUS.md). La autorización posterior del usuario habilita este trabajo y sustituye la restricción documental de la entrega anterior. No incluye dinero real ni red pública.

## Objetivo actual: MVP académico confirmado

El alcance de entrega vigente es el [MVP académico aprobado](business/MVP-ACADEMICO.md): comprar tokens a USD 10 con pago simulado y emisión C4, iniciar operación por administrador, distribuir mensualmente un importe manual a prorrata y reclamar ingresos con token de prueba en Hardhat local. Sin transferencias entre inversores, sin bancos ni automatización completa del negocio. La aprobación no modifica el código ni cierra pendientes de una operación real.

Los antecedentes siguientes describen el modelo completo y el contexto técnico anterior. Las referencias a fórmula, periodicidad o red pendientes se refieren a valor real; para la demostración rigen las definiciones aprobadas enlazadas arriba.

Este checkout contiene el frontend Next.js de FranToken. El código contiene recorridos de catálogo y cuenta demo; las especificaciones de páginas y contenido conservan propuestas e historial que deben contrastarse con la implementación. No hay código Solidity ni backend en este repositorio. La información importada del otro checkout está archivada en [context/solidity-import/](context/solidity-import/README.md) y no activa sus instrucciones ni valida sus pruebas aquí.

El [modelo de negocio declarado](business/BUSINESS-LOGIC.md) define proyectos de franquicia, financiación mediante fideicomiso, representación de derechos con tokens, operación por una administradora y cuatro relaciones C1–C4. La actualización del 2026-11-01 integra la [presentación, informe y DTE recibidos](business/source/README.md): precio fijo USD 10 más fees blockchain y ciclos de vida de proyecto/token. El [manual v2](business/source/FranToken-manual-consulta-v2.md) es un antecedente con ejemplos y propuestas; el [estado técnico actualizado](business/IMPLEMENTATION-STATUS.md) distingue capacidades y brechas. Las [decisiones de negocio](business/DECISIONS.md) y la [reconciliación backend](DECISIONS-BACKEND.md) muestran lo que aún falta precisar.

La [arquitectura y blueprints web](README.md) fueron preparados para inmuebles a partir de Lofty. Son material de estructura y UX que requiere adaptación al dominio de franquicias antes de implementarse. [WEB-15](DECISIONS.md) registra ese trabajo. El sistema visual de LangChain sigue siendo una referencia, no identidad ni contenido propios.

Para trabajar en este repo, comenzar por [AGENTS.md](../AGENTS.md) y el [índice del harness](README.md). Para un cambio en contratos Solidity, consultar el checkout real de contratos y sus instrucciones vigentes; el archivo importado `agent/repo-config.json` describe aquel entorno en la fecha indicada, no el actual.
