import type { TokenHolding } from "../types/account.type";

export const demoHoldings: TokenHolding[] = [
  {
    id: "miga-demo",
    projectName: "Miga",
    symbol: "MIGA · demo",
    quantity: 18,
    currency: "USD",
    investedAmount: 4500,
    activities: [
      {
        id: "miga-2",
        occurredAt: "2026-09-12",
        kind: "Compra de ejemplo",
        quantity: 8,
        unitPrice: 250,
        amount: 2000,
        currency: "USD",
        reference: "DEMO-MIG-002",
      },
      {
        id: "miga-1",
        occurredAt: "2026-07-04",
        kind: "Compra de ejemplo",
        quantity: 10,
        unitPrice: 250,
        amount: 2500,
        currency: "USD",
        reference: "DEMO-MIG-001",
      },
    ],
  },
  {
    id: "casa-norte-demo",
    projectName: "Casa Norte",
    symbol: "CASA · demo",
    quantity: 6,
    currency: "USD",
    investedAmount: 1800,
    activities: [
      {
        id: "casa-1",
        occurredAt: "2026-08-21",
        kind: "Compra de ejemplo",
        quantity: 6,
        unitPrice: 300,
        amount: 1800,
        currency: "USD",
        reference: "DEMO-CAS-001",
      },
    ],
  },
];
