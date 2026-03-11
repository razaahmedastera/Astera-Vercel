/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      { protocol: 'https', hostname: '**.astera.com' },
      { protocol: 'https', hostname: 'images.ctfassets.net' },
      { protocol: 'https', hostname: '**.contentful.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: '**.youtube.com' },
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: '**.kindpng.com' },
      { protocol: 'https', hostname: '**.nitrocdn.com' },
    ],
  },
  async redirects() {
    return [
      { source: '/ebook', destination: '/e-books', permanent: true },
      { source: '/e-book', destination: '/e-books', permanent: true },
      { source: '/ebook/:slug', destination: '/type/e-book/:slug', permanent: true },
      { source: '/whitepapers', destination: '/resources/whitepapers', permanent: true },
      { source: '/whitepaper', destination: '/resources/whitepapers', permanent: true },
      { source: '/whitepapers/:slug', destination: '/type/whitepaper/:slug', permanent: true },
      { source: '/data-sheets', destination: '/datasheets', permanent: true },
      { source: '/data-sheets/:slug', destination: '/data-sheet/:slug', permanent: true },
      { source: '/type/data-sheet/:slug', destination: '/data-sheet/:slug', permanent: true },
      { source: '/product', destination: '/products/reportminer', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    }

    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
      config.cache = { type: 'memory' };
      config.resolve.symlinks = false;
    }

    return config;
  },
};

if (process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT === 'true') {
  nextConfig.output = 'export';
}

module.exports = nextConfig;

