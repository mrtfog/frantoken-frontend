import type { Eip1193Provider } from "ethers";
import { academicNetwork } from "../constants/academicNetwork.constants";
import { walletErrorCode } from "../utils/walletError.util";

export async function ensureAcademicNetwork(
  injected: Eip1193Provider,
): Promise<void> {
  const chainId = await injected.request({ method: "eth_chainId" });
  if (
    typeof chainId === "string" &&
    BigInt(chainId) === BigInt(academicNetwork.chainId)
  )
    return;
  const switchNetwork = () =>
    injected.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: academicNetwork.chainId }],
    });
  try {
    try {
      await switchNetwork();
    } catch (error) {
      if (walletErrorCode(error) !== 4902) throw error;
      await injected.request({
        method: "wallet_addEthereumChain",
        params: [academicNetwork],
      });
      // Agregar una red no garantiza que la wallet la seleccione.
      await switchNetwork();
    }
  } catch (error) {
    const code = walletErrorCode(error);
    if (code === 4001)
      throw new Error(
        "Cancelaste el cambio de red. Para conectar, aceptá Hardhat local en tu wallet.",
      );
    if (code === -32002)
      throw new Error(
        "Hay una solicitud pendiente en tu wallet. Abrila y respondé antes de reintentar.",
      );
    throw new Error(
      "No se pudo seleccionar Hardhat local. Verificá que el nodo esté iniciado y configurá en tu wallet la red 31337 con el RPC local.",
    );
  }
  const selected = await injected.request({ method: "eth_chainId" });
  if (
    typeof selected !== "string" ||
    BigInt(selected) !== BigInt(academicNetwork.chainId)
  )
    throw new Error(
      "La wallet sigue en otra red. Seleccioná Hardhat local (31337) y volvé a conectar.",
    );
}
