/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
		return [
			{
				source: '/',
				has: [
					{
						type: 'host',
						value: '(^|\s)web3it-ai-mocha.vercel.app',
					},
				],
				destination: '/', // Admin routes
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
