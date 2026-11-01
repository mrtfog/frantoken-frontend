This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Alcance vigente: MVP académico

El usuario confirmó el [MVP académico](docs/business/MVP-ACADEMICO.md): compra a USD 10 con pago simulado y emisión C4; inicio de operación manual; distribuciones mensuales de importe manual, a prorrata al ejecutar; reclamo por inversor; transferencias deshabilitadas; Hardhat local y token de pago de prueba. Gas separado e identificado como de prueba. **Especificación aprobada, implementación pendiente.** Esta actualización modifica solo documentación.

El modelo completo y los antecedentes técnicos siguientes se conservan como referencia; campaña, bancos, liquidación y cascada contable completa no son condiciones de entrega del MVP.

Project design and content documentation: [docs/README.md](docs/README.md).

Modelo vigente de FranToken: [lógica de negocio](docs/business/BUSINESS-LOGIC.md), [ciclos de vida](docs/business/LIFECYCLES.md) y [estado técnico](docs/business/IMPLEMENTATION-STATUS.md). Precio fijo de suscripción: **USD 10 por token más fees blockchain**.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
