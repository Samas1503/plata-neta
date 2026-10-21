import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@plata-neta/core",
    "@plata-neta/db",
    "@plata-neta/providers",
  ],
};

export default nextConfig;
