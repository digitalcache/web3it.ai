/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
		return [
			{
        has: [
          {
            type: "host",
            value: "client1.web3it-ai-mocha.vercel.app",
          }
        ],
        source: "/",
        destination: "/actual-index",
			}
		]
	},
  eslint: {
    dirs: ['app', 'common'],
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
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

module.exports = nextConfig
