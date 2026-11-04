import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Conserva el chequeo de tipos con TypeScript 5 sin lanzar un tsc separado.
  experimental: { useTypeScriptCli: false },
};

export default nextConfig;
