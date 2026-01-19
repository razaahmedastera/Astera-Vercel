import { contentfulClient } from './client';
import type { 
  PageContentSkeleton, 
  PageContent, 
  HomePageContentSkeleton, 
  HomePageContent,
  ProductPageContent 
} from '@/types/contentful';

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
 * Fetch home page content from homePage content type by slug
 * @param slug - The page slug (default: 'home')
 * @returns Home page content with all sections
 */
export async function getHomePageContent(slug: string = 'home'): Promise<HomePageContent> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'homePage',
      'fields.slug': slug,
      limit: 1,
    }) as any;

    if (response.items.length === 0) {
      throw new Error(`Home page content with slug "${slug}" not found`);
    }

    const entry = response.items[0];
    const fields = entry.fields;

    return {
      id: entry.sys.id,
      entryTitle: fields.entryTitle,
      slug: fields.slug,
      
      // Hero Section
      heroSectionBadge: fields.heroSectionBadge,
      heroSectionHeading: fields.heroSectionHeading,
      heroSectionDescription: fields.heroSectionDescription,
      heroSectionPrimaryCta: fields.heroSectionPrimaryCta,
      heroSectionSecondaryCta: fields.heroSectionSecondaryCta,
      
      // AI Stack Section
      aiStackSectionTitle: fields.aiStackSectionTitle,
      aiStackSectionDescription: fields.aiStackSectionDescription,
      aiStackVideoUrl: fields.aiStackVideoUrl,
      
      // Feature Tabs Section
      featureTabsSectionTitle: fields.featureTabsSectionTitle,
      featureTabs: fields.featureTabs,
      
      // Metrics Section
      metricsSectionTitle: fields.metricsSectionTitle,
      metrics: fields.metrics,
      
      // Product Offerings Section
      productOfferingsSectionTitle: fields.productOfferingsSectionTitle,
      productOfferings: fields.productOfferings,
      
      // Awards Section
      awardsSectionTitle: fields.awardsSectionTitle,
      
      // Resources Section
      resourcesSectionTitle: fields.resourcesSectionTitle,
      resources: fields.resources,
      
      // Final CTA Section
      finalCtaSectionTitle: fields.finalCtaSectionTitle,
      finalCtaSectionDescription: fields.finalCtaSectionDescription,
      finalCtaCards: fields.finalCtaCards,
      
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching home page content from Contentful:', error);
    throw new Error(`Failed to fetch home page content from Contentful: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
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

/**
 * Fetch product page content from productPage content type by slug
 * @param slug - The page slug (default: 'product')
 * @returns Product page content with all sections
 */
export async function getProductPageContent(slug: string = 'product'): Promise<ProductPageContent> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'productPage',
      'fields.slug': slug,
      limit: 1,
    }) as any;

    if (response.items.length === 0) {
      throw new Error(`Product page content with slug "${slug}" not found`);
    }

    const entry = response.items[0];
    const fields = entry.fields;

    return {
      id: entry.sys.id,
      entryTitle: fields.entryTitle,
      slug: fields.slug,
      
      // Hero Section
      heroSectionBadge: fields.heroSectionBadge,
      heroSectionHeading: fields.heroSectionHeading,
      heroSectionDescription: fields.heroSectionDescription,
      heroSectionPrimaryCta: fields.heroSectionPrimaryCta,
      heroSectionSecondaryCta: fields.heroSectionSecondaryCta,
      
      // Products Section
      productsSectionTitle: fields.productsSectionTitle,
      productsSectionDescription: fields.productsSectionDescription,
      products: fields.products,
      
      // Product Features Section
      productFeaturesSectionTitle: fields.productFeaturesSectionTitle,
      productFeaturesSectionDescription: fields.productFeaturesSectionDescription,
      productFeatures: fields.productFeatures,
      
      // CTA Section
      ctaSectionTitle: fields.ctaSectionTitle,
      ctaSectionDescription: fields.ctaSectionDescription,
      ctaSectionPrimaryCta: fields.ctaSectionPrimaryCta,
      ctaSectionSecondaryCta: fields.ctaSectionSecondaryCta,
      
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching product page content from Contentful:', error);
    throw new Error(`Failed to fetch product page content from Contentful: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

