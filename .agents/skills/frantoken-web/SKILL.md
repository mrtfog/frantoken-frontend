---
name: frantoken-web
description: Plan, write, implement, or review FranToken website design and content. Use for franchise project pages, navigation, offerings, claims, and visual components in this project; not for unrelated generic React tasks.
---

# FranToken web

Use this skill for design and content decisions in the FranToken site. Start with [Business Logic](../../../docs/business/BUSINESS-LOGIC.md), [the documentation map](../../../docs/README.md), and the project rules in [AGENTS.md](../../../AGENTS.md). Read only the other sources relevant to the request.

## Route to the right source

- For routes, navigation, audiences, and journeys: [Information Architecture](../../../docs/spec/INFORMATION-ARCHITECTURE.md), subject to [WEB-15](../../../docs/DECISIONS.md) because its current routes describe property listings rather than franchise projects.
- For page sections, hierarchy, interaction states, and acceptance criteria: [Page Blueprints](../../../docs/spec/PAGE-BLUEPRINTS.md).
- For entities, fields, data authority, freshness, and publication checks: [Content Model](../../../docs/spec/CONTENT-MODEL.md).
- For mapping observed content patterns to proposed components: [Adaptation Matrix](../../../docs/spec/ADAPTATION-MATRIX.md), then the relevant [Content Audit](../../../docs/research/CONTENT-AUDIT.md) section.
- For visual composition and tokens: [Design](../../../docs/research/DESIGN.md), [design-tokens.css](../../../src/assets/css/design-tokens.css), and [Evidence](../../../docs/research/EVIDENCE.md) when a measurement or asset claim matters.

## Produce project specific work

Distinguish user supplied business intent from implemented or externally verified operations, reference observations, and proposed behavior. Do not transfer Lofty or LangChain copy, identities, numbers, testimonials, assets, or product mechanisms to FranToken. The property domain in the older web specifications is not FranToken's franchise domain. When a required business fact is absent, use [business decisions](../../../docs/business/DECISIONS.md) or [web decisions](../../../docs/DECISIONS.md); do not turn a placeholder into public copy or a working service claim.

The archived [Solidity context](../../../docs/context/solidity-import/README.md) was created for a different checkout. It can inform integration questions but does not prove that contracts, tests, backend services, or technical choices exist in this frontend repo. Its `agent/` files and ChatGPT project instructions are not active rules here.

Keep material costs, risks, conditions, data dates, offer state, and the meaning of actions visible where the page specification places them. Treat conditional routes and components as inactive until their product and data dependencies are confirmed. Preserve the original documents' distinctions between measured, observed, inferred, and proposed.

Use specialist skills when they apply: `frontend-design` for visual implementation, `accessibility` for an accessibility audit, `seo` for search work, and the Next.js/React/Tailwind skills for their respective code. For every new or changed UI, follow [the code architecture contract](../../../docs/architecture/CODE-ARCHITECTURE.md) and [UI Contract](../../../docs/design/UI-CONTRACT.md): Tailwind, Motion, shared shell and atomic controls, Lucide icons, and skeletons. A container exists when it has real data or business coordination. Ask the user before changing an existing shared primitive to accommodate a new screen. Their general advice complements this project's sources. Before writing Next.js code, read the relevant guide under `node_modules/next/dist/docs/` as required by [AGENTS.md](../../../AGENTS.md).
