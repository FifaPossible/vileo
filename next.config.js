/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   images: {
      domains: ["image.tmdb.org"],
   },
   env: {
      NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
   },
   swcMinify: true,
};

module.exports = nextConfig;
