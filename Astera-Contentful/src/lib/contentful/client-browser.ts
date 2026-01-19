/**
 * Client-side Contentful client
 * Used for browser-side content fetching (real-time updates)
 */
import { createClient } from 'contentful';

let contentfulClientInstance: ReturnType<typeof createClient> | null = null;

/**
 * Get or create Contentful client (lazy initialization)
 * This ensures env vars are checked at runtime, not build time
 */
export const getContentfulClientBrowser = () => {
  // Return existing instance if already created
  if (contentfulClientInstance) {
    return contentfulClientInstance;
  }

  // Get env vars at runtime (available in browser)
  // Next.js requires NEXT_PUBLIC_ prefix for browser-accessible env vars
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || process.env.CONTENTFUL_ENVIRONMENT || 'master';

  if (!spaceId || !accessToken) {
    throw new Error(
      'Contentful environment variables are not set. ' +
      'Please set NEXT_PUBLIC_CONTENTFUL_SPACE_ID and NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN in your .env.local file. ' +
      'These should be your Content Delivery API (CDA) credentials from Contentful.'
    );
  }

  // Create and cache the client
  contentfulClientInstance = createClient({
    space: spaceId,
    environment: environment,
    accessToken: accessToken,
  });

  return contentfulClientInstance;
};

