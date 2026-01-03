/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // For GitHub Pages user/organization site (thaophuong-pediatrician.github.io)
  // If this were a project site, you'd need to set basePath: '/repository-name'
  basePath: '',
  assetPrefix: '',
}

module.exports = nextConfig

