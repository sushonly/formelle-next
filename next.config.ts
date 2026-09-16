import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'psdaycsuawyoqtppbgec.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/identity/:id',
        destination: '/wardrobe/:id',
        permanent: true,
      },
      {
        source: '/looks/:slug',
        destination: '/wardrobe/looks/:slug',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
