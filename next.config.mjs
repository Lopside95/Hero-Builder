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
      // "storage.cloud.google.com",

      // "zq5hzutac0xrpkxh.public.blob.vercel-storage.com",
    ],
  },
};

export default nextConfig;
