import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*", // The path your Next.js app will expose
  //       destination: "http://localhost:5000/:path*", // The actual backend URL
  //     },
  //   ];
  // },
};

export default nextConfig;
