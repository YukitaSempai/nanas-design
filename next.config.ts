import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: ".next-export",
  images: { unoptimized: true },
};

export default nextConfig;
