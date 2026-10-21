import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@plata-neta/core",
    "@plata-neta/db",
    "@plata-neta/providers",
    "@plata-neta/jobs",
  ],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "default-src 'none'; frame-ancestors 'none'" },
          { key: "Referrer-Policy", value: "no-referrer" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
