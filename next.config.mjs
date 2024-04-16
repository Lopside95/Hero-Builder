/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zq5hzutac0xrpkxh.public.blob.vercel-storage.com",
        port: "",
        pathname: "/*",
      },
      {
        protocol: "https",
        hostname: "hero-fighter.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/*",
      },
    ],
    domains: ["storage.cloud.google.com", "storage.googleapis.com"],
  },
};

export default nextConfig;
