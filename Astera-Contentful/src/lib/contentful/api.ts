import { contentfulClient } from './client';
import type { PageContentSkeleton, PageContent } from '@/types/contentful';

/**
 * Fetch a page content entry by slug (more scalable than entry ID)
 * @param slug - The page slug (e.g., 'home', 'about', 'contact')
 * @returns Parsed page content
 */
export async function getPageContentBySlug(slug: string): Promise<PageContent> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'pageContent',
      'fields.slug': slug,
      limit: 1,
    }) as any;

    if (response.items.length === 0) {
      throw new Error(`Page with slug "${slug}" not found`);
    }

    const entry = response.items[0];

    return {
      id: entry.sys.id,
      title: entry.fields.title,
      slug: entry.fields.slug,
      body: entry.fields.body,
      randomText: entry.fields.randomText,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    };
  } catch (error) {
    console.error(`Error fetching page with slug "${slug}":`, error);
    throw new Error(`Failed to fetch page with slug "${slug}"`);
  }
}

/**
 * Fetch a page content entry by ID (kept for backward compatibility)
 * @param entryId - The Contentful entry ID
 * @returns Parsed page content
 */
export async function getPageContentById(entryId: string): Promise<PageContent> {
  try {
    const entry = await contentfulClient.getEntry<PageContentSkeleton>(entryId);

    return {
      id: entry.sys.id,
      title: entry.fields.title,
      slug: entry.fields.slug,
      body: entry.fields.body,
      randomText: entry.fields.randomText,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching content from Contentful:', error);
    throw new Error('Failed to fetch content from Contentful');
  }
}

/**
 * Fetch home page content by slug
 * @returns Home page content
 */
export async function getHomePageContent(): Promise<PageContent> {
  return getPageContentBySlug('home');
}

/**
 * Fetch all pages (useful for navigation, sitemap, etc.)
 * @returns Array of all page content
 */
export async function getAllPages(): Promise<PageContent[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'pageContent',
      order: ['-sys.createdAt'],
    }) as any;

    return response.items.map((entry: any) => ({
      id: entry.sys.id,
      title: entry.fields.title,
      slug: entry.fields.slug,
      body: entry.fields.body,
      randomText: entry.fields.randomText,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    }));
  } catch (error) {
    console.error('Error fetching all pages:', error);
    throw new Error('Failed to fetch all pages');
  }
}

