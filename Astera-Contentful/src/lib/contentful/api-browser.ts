/**
 * Browser-side Contentful API functions
 * These fetch content in real-time from the browser
 */
import { getContentfulClientBrowser } from './client-browser';
import type { 
  HomePageContent,
  ProductPageContent 
} from '@/types/contentful';

/**
 * Fetch home page content from browser (real-time) by slug
 * @param slug - The page slug (default: 'home')
 */
export async function getHomePageContentBrowser(slug: string = 'home'): Promise<HomePageContent> {
  try {
    const client = getContentfulClientBrowser();
    const response = await client.getEntries({
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
 * Fetch product page content from browser (real-time) by slug
 * @param slug - The page slug (default: 'product')
 */
export async function getProductPageContentBrowser(slug: string = 'product'): Promise<ProductPageContent> {
  try {
    const client = getContentfulClientBrowser();
    const response = await client.getEntries({
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

