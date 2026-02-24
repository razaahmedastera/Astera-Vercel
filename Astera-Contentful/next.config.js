/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export - only for production builds
  // Remove this line when running dev server, or use conditional export
  // output: 'export', // Commented out for dev server
  images: {
    unoptimized: false, // Enable Next.js image optimization
    formats: ['image/avif', 'image/webp'], // Modern image formats for better performance
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60, // Cache optimized images for 60 seconds
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.astera.com',
      },
      {
        protocol: 'https',
        hostname: '**.kindpng.com',
      },
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.youtube.com',
      },
      {
        protocol: 'https',
        hostname: '**.youtu.be',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net', // Contentful images
      },
      {
        protocol: 'https',
        hostname: '**.contentful.com', // Contentful CDN
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com', // YouTube thumbnails
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,
  webpack: (config, { isServer, dev }) => {
    // Fix webpack module resolution issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    // Improve HMR and prevent cache issues in development
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay before rebuilding
        ignored: /node_modules/,
      };
      
      // Use memory cache in development to prevent filesystem cache corruption
      // This prevents "Cannot read properties" and module resolution errors on Windows
      config.cache = {
        type: 'memory', // Use memory cache instead of filesystem in dev
      };
      
      // Better error handling for module resolution
      config.resolve.symlinks = false; // Disable symlinks to prevent resolution issues
      
      // Fix vendor chunks resolution issues
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunks
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
            },
          },
        },
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

