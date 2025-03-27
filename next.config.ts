import type { NextConfig } from "next"
import { PHASE_DEVELOPMENT_SERVER } from "next/constants"

export default (phase: string): NextConfig => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER

  const nextConfig = {
    assetPrefix: isDev ? undefined : process.env.NEXT_PUBLIC_CDN_HOST,
    rewrtes: async () => {
      return [
        {
          source: "api/:path*",
          destination: `${process.env.NEXT_PUBLIC_API_HOST}/:path*`,
        },
      ]
    }
  }

  return nextConfig
}
