# Contexto del proyecto en este repositorio

Este checkout contiene el frontend Next.js de FranToken. El código visible aún muestra la plantilla inicial; las especificaciones de páginas y contenido son propuestas. No hay código Solidity ni backend en este repositorio. La información importada del otro checkout está archivada en [context/solidity-import/](context/solidity-import/README.md) y no activa sus instrucciones ni valida sus pruebas aquí.

El [modelo de negocio declarado](business/BUSINESS-LOGIC.md) define proyectos de franquicia, financiación mediante fideicomiso, representación de derechos con tokens, operación por una administradora y cuatro relaciones C1–C4. El [manual v2](business/source/FranToken-manual-consulta-v2.md) es la fuente aportada; incluye además ejemplos y propuestas que no son condiciones de una emisión real. Las [decisiones de negocio](business/DECISIONS.md) y la [reconciliación backend](DECISIONS-BACKEND.md) muestran lo que aún falta precisar.

La [arquitectura y blueprints web](README.md) fueron preparados para inmuebles a partir de Lofty. Son material de estructura y UX que requiere adaptación al dominio de franquicias antes de implementarse. [WEB-15](DECISIONS.md) registra ese trabajo. El sistema visual de LangChain sigue siendo una referencia, no identidad ni contenido propios.

Para trabajar en este repo, comenzar por [AGENTS.md](../AGENTS.md) y el [índice del harness](README.md). Para un cambio en contratos Solidity, consultar el checkout real de contratos y sus instrucciones vigentes; el archivo importado `agent/repo-config.json` describe aquel entorno en la fecha indicada, no el actual.
