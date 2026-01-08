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
        hostname: "10.10.7.65",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "10.10.7.107",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "bhl-storage.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "bhl-storage.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
