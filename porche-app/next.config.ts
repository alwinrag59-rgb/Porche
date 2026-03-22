import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Porche",
  assetPrefix: "/Porche/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;