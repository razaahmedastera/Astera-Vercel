/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export - only for production builds
  // Remove this line when running dev server, or use conditional export
  // output: 'export', // Commented out for dev server
  images: {
    unoptimized: true
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Fix webpack module resolution issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

// Only enable static export for production builds
if (process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT === 'true') {
  nextConfig.output = 'export';
}

module.exports = nextConfig;

