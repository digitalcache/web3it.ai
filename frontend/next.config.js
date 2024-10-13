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
						value: 'client1.web3it-ai-mocha.vercel.app',
					},
				],
				destination: 'http://client1.web3it-ai-mocha.vercel.app', // Admin routes
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
