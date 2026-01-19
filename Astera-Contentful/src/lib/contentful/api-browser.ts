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
 * Fetch home page content from browser (real-time)
 */
export async function getHomePageContentBrowser(): Promise<HomePageContent> {
  try {
    const client = getContentfulClientBrowser();
    const response = await client.getEntries({
      content_type: 'homePage',
      'fields.slug': 'home',
      limit: 1,
    }) as any;

    if (response.items.length === 0) {
      throw new Error('Home page content not found');
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
      
      // Features Section
      featuresSectionTitle: fields.featuresSectionTitle,
      featuresSectionDescription: fields.featuresSectionDescription,
      features: fields.features || [],
      
      // Steps Section
      stepsSectionTitle: fields.stepsSectionTitle,
      stepsSectionDescription: fields.stepsSectionDescription,
      steps: fields.steps || [],
      
      // Use Cases Section
      useCasesSectionTitle: fields.useCasesSectionTitle,
      useCasesSectionDescription: fields.useCasesSectionDescription,
      useCases: fields.useCases || [],
      
      // CTA Section
      ctaSectionTitle: fields.ctaSectionTitle,
      ctaSectionDescription: fields.ctaSectionDescription,
      ctaSectionPrimaryCta: fields.ctaSectionPrimaryCta,
      ctaSectionSecondaryCta: fields.ctaSectionSecondaryCta,
      ctaSectionNote: fields.ctaSectionNote,
      
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching home page content from Contentful:', error);
    throw new Error('Failed to fetch home page content from Contentful');
  }
}

/**
 * Fetch product page content from browser (real-time)
 */
export async function getProductPageContentBrowser(): Promise<ProductPageContent> {
  try {
    const client = getContentfulClientBrowser();
    const response = await client.getEntries({
      content_type: 'productPage',
      'fields.slug': 'product',
      limit: 1,
    }) as any;

    if (response.items.length === 0) {
      throw new Error('Product page content not found');
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
      products: fields.products || [],
      
      // Product Features Section
      productFeaturesSectionTitle: fields.productFeaturesSectionTitle,
      productFeaturesSectionDescription: fields.productFeaturesSectionDescription,
      productFeatures: fields.productFeatures || [],
      
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
    throw new Error('Failed to fetch product page content from Contentful');
  }
}
