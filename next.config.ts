import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    typedRoutes: false, // Desativa tipagem automática de rotas dinâmicas
  },
};

export default nextConfig;
