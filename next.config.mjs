/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "10.10.7.79",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
