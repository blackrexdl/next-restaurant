/ ** @type {import('next').NextConfig} * /
const nextConfig = {
  images: {
    domains: ["images.unsplash.com"],
  },
  devIndicators: {
    position: "bottom-right", // 'bottom-left', 'top-right', 'top-left'
  },
};

module.exports = nextConfig;
