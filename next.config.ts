import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  staticPageGenerationTimeout: 300, // デフォルトの60秒から300秒に延長
};

export default nextConfig;
