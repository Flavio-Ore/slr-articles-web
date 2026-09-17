import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()
const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    viewTransition: true,
    serverActions: {
      bodySizeLimit: '6mb',
      allowedOrigins: [
        process.env.IS_LOCAL
          ? 'http://localhost:3000/'
          : process.env.PRODUCTION_URL || 'http://localhost:3000/'
      ]
    }
  }
}

export default withNextIntl(nextConfig)
