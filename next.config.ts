// import type { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   output: 'export', // 🚨 ini WAJIB buat static hosting ke Firebase
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     unoptimized: true,
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'placehold.co',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
// };

// export default nextConfig;
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone', // INI WAJIB untuk static export (bisa deploy ke Firebase Hosting)
  images: {
    unoptimized: true, // WAJIB kalau pakai <Image> dari next/image
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
