/**
 * Contentful configuration
 * Centralized place for all Contentful-related constants
 */
export const CONTENTFUL_CONFIG = {
  spaceId: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || '',
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
  homeEntryId: process.env.CONTENTFUL_HOME_ENTRY_ID || '',
} as const;

