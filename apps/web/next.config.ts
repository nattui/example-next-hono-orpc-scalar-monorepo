import type { NextConfig } from "next"

const API_URL = process.env.NEXT_PUBLIC_API_URL

const nextConfig: NextConfig = {
  reactCompiler: true,
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        destination: `${API_URL}/:path*`,
        source: "/api/:path*",
      },
    ]
  },
  typedRoutes: true,
}

export default nextConfig
