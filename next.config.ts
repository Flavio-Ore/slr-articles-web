import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true
  },
  compiler: {
    removeConsole: { exclude: ['error'] }
  }
}

export default nextConfig
