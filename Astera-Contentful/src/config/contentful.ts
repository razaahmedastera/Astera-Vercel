/**
 * Contentful configuration
 * Centralized place for all Contentful-related constants
 * 
 * Note: This app uses SSR only - all Contentful access is server-side
 * Use regular env vars (no NEXT_PUBLIC_ prefix needed)
 */
export const CONTENTFUL_CONFIG = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
} as const;

