/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https', 
        hostname: 'a.espncdn.com',
        pathname: '/**'
      },
    ],
  },
}

module.exports = nextConfig
