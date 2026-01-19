/**
 * Contentful configuration
 * Centralized place for all Contentful-related constants
 * 
 * Note: For browser-side access, use NEXT_PUBLIC_ prefix
 * For server-side access, use regular env vars
 */
export const CONTENTFUL_CONFIG = {
  spaceId: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || process.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT || process.env.CONTENTFUL_ENVIRONMENT || 'master',
} as const;

