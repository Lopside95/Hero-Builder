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
      // {
      //   protocol: "https",
      //   hostname: "zq5hzutac0xrpkxh.public.blob.vercel-storage.com",
      //   port: "",
      //   pathname: "*",
      // },

      // "zq5hzutac0xrpkxh.public.blob.vercel-storage.com",
    ],
    domains: ["storage.cloud.google.com"],
  },
};

export default nextConfig;
