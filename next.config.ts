import type { NextConfig } from "next";

// Static export: `npm run build` writes plain files to /out that any host can serve.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
