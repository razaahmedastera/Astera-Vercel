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

// SSR Mode: Only enable static export if explicitly requested
// For SSR (Server-Side Rendering), do NOT set output: 'export'
// Static export is incompatible with SSR - SSR requires a Node.js server
if (process.env.NODE_ENV === 'production' && process.env.STATIC_EXPORT === 'true') {
  console.warn('⚠️  Static export enabled - SSR will not work. Use SSR mode for real-time content updates.');
  nextConfig.output = 'export';
} else {
  console.log('✅ SSR mode enabled - Pages will be rendered server-side for real-time content');
}

module.exports = nextConfig;

