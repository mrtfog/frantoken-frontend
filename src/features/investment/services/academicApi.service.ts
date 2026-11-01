import { isAddress, isError } from "ethers";
import { ZodError } from "zod";
import {
  executeOperation,
  readSnapshot,
} from "../repositories/academicChain.repository";
import { signedOperationSchema } from "../types/investment.type";

function assertLocalRequest(request: Request) {
  const url = new URL(request.url);
  if (!["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))
    throw new Error("La demo solo está disponible desde localhost.");
  if (request.method !== "GET" && request.headers.get("origin") !== url.origin)
    throw new Error("Origen de solicitud inválido.");
  return url;
}
export async function handleAcademicRequest(request: Request) {
  try {
    const url = assertLocalRequest(request);
    if (request.method === "GET") {
      const wallet = url.searchParams.get("wallet");
      if (wallet && !isAddress(wallet))
        return Response.json({ error: "Wallet inválida." }, { status: 400 });
      return Response.json(await readSnapshot(wallet), {
        headers: { "Cache-Control": "no-store" },
      });
    }
    const text = await request.text();
    if (text.length > 6000)
      return Response.json(
        { error: "Solicitud demasiado grande." },
        { status: 400 },
      );
    const input = signedOperationSchema.parse(JSON.parse(text));
    return Response.json(await executeOperation(input, url.origin), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    let message =
      "No se pudo consultar la blockchain local. Revisá el nodo y el despliegue.";
    if (error instanceof ZodError || error instanceof SyntaxError)
      message = "Los datos de la operación son inválidos.";
    else if (isError(error, "CALL_EXCEPTION"))
      message =
        "El contrato rechazó la operación: revisá estado, términos, habilitación, saldo y período.";
    else if (
      error instanceof Error &&
      !isError(error, "NETWORK_ERROR") &&
      !isError(error, "SERVER_ERROR") &&
      !isError(error, "UNKNOWN_ERROR")
    )
      message = error.message;
    return Response.json(
      { error: message },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }
}
