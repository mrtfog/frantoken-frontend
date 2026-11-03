export const academicNetwork = {
  chainId: "0x7a69",
  chainName: "Hardhat local",
  nativeCurrency: { name: "Ether de prueba", symbol: "ETH", decimals: 18 },
  rpcUrls: [
    process.env.NEXT_PUBLIC_BLOCKCHAIN_RPC_URL || "http://127.0.0.1:8545",
  ],
};
