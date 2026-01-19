import { createClient } from 'contentful';

// Server-side: Use regular env vars (no NEXT_PUBLIC_ prefix needed)
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

if (!spaceId) {
  throw new Error('CONTENTFUL_SPACE_ID is not defined in environment variables');
}

if (!accessToken) {
  throw new Error('CONTENTFUL_ACCESS_TOKEN is not defined in environment variables');
}

/**
 * Contentful client instance (server-side)
 * Configured with environment variables from .env.local
 */
export const contentfulClient = createClient({
  space: spaceId,
  environment: environment,
  accessToken: accessToken,
});

