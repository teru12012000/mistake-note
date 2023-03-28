/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}
const img={
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
}
module.exports = {nextConfig,img}
