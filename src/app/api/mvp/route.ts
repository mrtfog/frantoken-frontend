// Express es el único coordinador de escrituras del MVP integrado.
export function GET() {
  return Response.json(
    { error: { message: "El MVP usa /api/account/investment en Express." } },
    { status: 410 },
  );
}
export const POST = GET;
