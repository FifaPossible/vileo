/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
   images: {
      domains: ["image.tmdb.org"],
   },
   swcMinify: true,
};

module.exports = nextConfig;
