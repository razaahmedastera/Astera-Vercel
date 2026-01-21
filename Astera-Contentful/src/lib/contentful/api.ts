import { contentfulClient } from './client';
import type { 
  HomePageContentSkeleton, 
  HomePageContent,
  ProductPageContentSkeleton,
  ProductPageContent,
  ProductPageSummary
} from '@/types/contentful';

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
 * Fetch all product pages summary (name and slug only)
 * @returns Array of product page summaries
 */
export async function getAllProductPages(): Promise<ProductPageSummary[]> {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'productPage',
      select: ['sys.id', 'fields.productName', 'fields.slug'],
      order: ['fields.productName'],
    }) as any;

    return response.items.map((entry: any) => ({
      id: entry.sys.id,
      productName: entry.fields.productName || entry.fields.entryTitle || 'Untitled Product',
      slug: entry.fields.slug,
    }));
  } catch (error) {
    console.error('Error fetching all product pages:', error);
    throw new Error(`Failed to fetch product pages: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetch product page content from productPage content type by slug
 * @param slug - The page slug (default: 'reportminer')
 * @returns Product page content with all sections
 */
export async function getProductPageContent(slug: string = 'reportminer'): Promise<ProductPageContent> {
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
    const fields = entry.fields as ProductPageContentSkeleton['fields'];

    return {
      id: entry.sys.id,
      entryTitle: fields.entryTitle,
      productName: fields.productName || fields.entryTitle,
      slug: fields.slug,
      
      // Hero Section
      heroSectionBadge: fields.heroSectionBadge,
      heroSectionHeading: fields.heroSectionHeading,
      heroSectionDescription: fields.heroSectionDescription,
      heroSectionPrimaryCta: fields.heroSectionPrimaryCta,
      heroSectionSecondaryCta: fields.heroSectionSecondaryCta,
      heroSectionVideoUrl: fields.heroSectionVideoUrl,
      heroSectionTrustBadges: fields.heroSectionTrustBadges,
      
      // Why This Product Section
      whyThisProductSectionTitle: fields.whyThisProductSectionTitle,
      whyThisProductSectionDescription: fields.whyThisProductSectionDescription,
      whyThisProductSectionCards: fields.whyThisProductSectionCards,
      
      // Metrics Section
      metrics: fields.metrics,
      
      // Powerful Features Section
      powerfulFeaturesSectionTitle: fields.powerfulFeaturesSectionTitle,
      powerfulFeatures: fields.powerfulFeatures,
      
      // Testimonials Section
      testimonialsSectionTitle: fields.testimonialsSectionTitle,
      testimonials: fields.testimonials,
      
      // Use Cases Section
      useCasesSectionTitle: fields.useCasesSectionTitle,
      useCasesSectionDescription: fields.useCasesSectionDescription,
      useCases: fields.useCases,
      
      // FAQ Section
      faqSectionBadge: fields.faqSectionBadge,
      faqSectionTitle: fields.faqSectionTitle,
      faqSectionDescription: fields.faqSectionDescription,
      faqs: fields.faqs,
      
      // Contact Form Section
      contactFormSectionTitle: fields.contactFormSectionTitle,
      contactFormSectionSubtitle: fields.contactFormSectionSubtitle,
      contactFormSectionDescription: fields.contactFormSectionDescription,
      contactFormSectionWhyTitle: fields.contactFormSectionWhyTitle,
      contactFormSectionBenefits: fields.contactFormSectionBenefits,
      contactFormSectionFooterText: fields.contactFormSectionFooterText,
      
      // CTA Section
      ctaSectionTitle: fields.ctaSectionTitle,
      ctaSectionDescription: fields.ctaSectionDescription,
      ctaSectionPrimaryText: fields.ctaSectionPrimaryText,
      ctaSectionSecondaryText: fields.ctaSectionSecondaryText,
      
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching product page content from Contentful:', error);
    throw new Error(`Failed to fetch product page content from Contentful: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
