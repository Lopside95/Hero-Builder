/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "storage.cloud.google.com",
      "zq5hzutac0xrpkxh.public.blob.vercel-storage.com",
    ],
  },
};

export default nextConfig;
