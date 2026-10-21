import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": [
      "../../packages/db/prisma/demo.db",
      "../../packages/db/src/generated/**",
    ],
  },
  transpilePackages: [
    "@plata-neta/core",
    "@plata-neta/db",
    "@plata-neta/providers",
  ],
};

export default nextConfig;
