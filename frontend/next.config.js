/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['app', 'common'],
  },
  async redirects () {
     return [
       {
         source: '/',
         destination: '/home',
         permanent: true,
       },
     ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
