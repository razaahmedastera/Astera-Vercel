/**
 * Browser-side Contentful API functions
 * These fetch content in real-time from the browser
 */
import { getContentfulClientBrowser } from './client-browser';
import type { 
  HomePageContent,
  ProductPageContent,
  ProductPageSummary,
  BlogPost,
  BlogCategory,
  BlogPostSkeleton,
  BlogCategorySkeleton,
  BlogAuthorSkeleton
} from '@/types/contentful';
import { Entry } from 'contentful';

/**
 * Helper function to ensure excerpt is always a string
 * Handles Rich Text Documents by extracting text content
 */
function ensureStringExcerpt(value: any): string {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value.content) {
    // If it's a Rich Text Document, extract text
    const extractText = (node: any): string => {
      if (typeof node === 'string') return node;
      if (node?.value) return node.value;
      if (node?.content && Array.isArray(node.content)) {
        return node.content.map(extractText).join(' ').trim();
      }
      return '';
    };
    return extractText(value).trim();
  }
  return String(value || '');
}

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
 * Fetch all product pages summary (name and slug only) from browser
 * @returns Array of product page summaries
 */
export async function getAllProductPagesBrowser(): Promise<ProductPageSummary[]> {
  try {
    const client = getContentfulClientBrowser();
    const response = await client.getEntries({
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
 * Fetch product page content from browser (real-time) by slug
 * @param slug - The page slug (default: 'reportminer')
 */
export async function getProductPageContentBrowser(slug: string = 'reportminer'): Promise<ProductPageContent> {
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

/**
 * Fetch all blog posts from browser (real-time)
 * @returns Array of blog posts
 */
export async function getAllBlogPostsBrowser(): Promise<BlogPost[]> {
  try {
    const client = getContentfulClientBrowser();
    const response = await client.getEntries({
      content_type: 'blog',
      order: ['-sys.createdAt'],
      include: 2,
    }) as any;

    return response.items.map((entry: any) => {
      const fields = entry.fields || {};
      const category = fields.category as Entry<BlogCategorySkeleton> | undefined;
      const author = fields.author as Entry<BlogAuthorSkeleton> | undefined;

      // Extract content and excerpt - description is the Rich Text content field
      let content: any = null;
      let excerpt = '';

      // Check if description is a Rich Text document (content) or a string (excerpt)
      if (fields.description) {
        if (typeof fields.description === 'object' && fields.description.nodeType === 'document') {
          // Description is Rich Text content - use it for content
          content = fields.description;
          // Extract excerpt from excerpt field or use empty string
          excerpt = ensureStringExcerpt(fields.excerpt || fields.summary || '');
        } else if (typeof fields.description === 'string') {
          // Description is a string - use for excerpt, look for content elsewhere
          excerpt = ensureStringExcerpt(fields.description);
          content = fields.content || fields.body || fields.richText;
        }
      }

      // Fallback: try other content fields if description wasn't used for content
      if (!content) {
        content = fields.content || fields.body || fields.richText || fields.postContent;
      }

      // If still no content, create empty document
      if (!content || (typeof content === 'object' && !content.nodeType)) {
        content = { nodeType: 'document', data: {}, content: [] };
      }

      // If no excerpt, try to extract from excerpt field
      if (!excerpt) {
        excerpt = ensureStringExcerpt(fields.excerpt || fields.summary || '');
      }

      return {
        id: entry.sys.id,
        title: fields.title || '',
        slug: fields.slug || '',
        excerpt: excerpt,
        coverImage: fields.featuredImage?.fields?.file?.url || fields.coverImage?.fields?.file?.url || undefined,
        featuredImage: fields.featuredImage?.fields?.file?.url || undefined,
        content: content,
        category: category ? {
          id: category.sys.id,
          name: category.fields.name,
          slug: category.fields.slug,
          title: category.fields.name,
        } : {
          id: 'uncategorized',
          name: 'Uncategorized',
          slug: 'uncategorized',
          title: 'Uncategorized',
        },
        author: author ? {
          id: author.sys.id,
          name: author.fields.name,
          role: author.fields.role,
          bio: author.fields.bio,
          avatar: (author.fields.avatar as any)?.fields?.file?.url,
        } : undefined,
        authorName: author?.fields.name,
        tags: fields.tags || [],
        publishedAt: fields.publishedAt || entry.sys.createdAt,
        createdAt: entry.sys.createdAt,
        updatedAt: entry.sys.updatedAt,
      } as BlogPost;
    });
  } catch (error) {
    console.error('Error fetching blog posts from Contentful:', error);
    if (error instanceof Error && error.message.includes('unknownContentType')) {
      console.warn('[Contentful] Blog content type not found. Please create a "blog" content type in Contentful.');
      return [];
    }
    throw new Error(`Failed to fetch blog posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Fetch a single blog post by slug from browser (real-time)
 * @param slug - The blog post slug
 * @returns Blog post or null if not found
 */
export async function getBlogPostBySlugBrowser(slug: string): Promise<BlogPost | null> {
  try {
    const client = getContentfulClientBrowser();
    const response = await client.getEntries({
      content_type: 'blog',
      'fields.slug': slug,
      limit: 1,
      include: 2,
    }) as any;

    if (response.items.length === 0) {
      // Fallback: try fetching all and filtering
      const allPosts = await getAllBlogPostsBrowser();
      const post = allPosts.find(p => p.slug === slug);
      return post || null;
    }

    const entry = response.items[0];
    const fields = entry.fields;
    const category = fields.category as Entry<BlogCategorySkeleton> | undefined;
    const author = fields.author as Entry<BlogAuthorSkeleton> | undefined;

    // Extract content and excerpt - description is the Rich Text content field
    let content: any = null;
    let excerpt = '';

    // Check if description is a Rich Text document (content) or a string (excerpt)
    if (fields.description) {
      if (typeof fields.description === 'object' && fields.description.nodeType === 'document') {
        // Description is Rich Text content - use it for content
        content = fields.description;
        // Extract excerpt from excerpt field or use empty string
        excerpt = ensureStringExcerpt(fields.excerpt || fields.summary || '');
      } else if (typeof fields.description === 'string') {
        // Description is a string - use for excerpt, look for content elsewhere
        excerpt = ensureStringExcerpt(fields.description);
        content = fields.content || fields.body || fields.richText;
      }
    }

    // Fallback: try other content fields if description wasn't used for content
    if (!content) {
      content = fields.content || fields.body || fields.richText || fields.postContent;
    }

    // If still no content, create empty document
    if (!content || (typeof content === 'object' && !content.nodeType)) {
      content = { nodeType: 'document', data: {}, content: [] };
    }

    // If no excerpt, try to extract from excerpt field
    if (!excerpt) {
      excerpt = ensureStringExcerpt(fields.excerpt || fields.summary || '');
    }

    return {
      id: entry.sys.id,
      title: fields.title || '',
      slug: fields.slug || '',
      excerpt: excerpt,
      coverImage: fields.featuredImage?.fields?.file?.url || fields.coverImage?.fields?.file?.url || undefined,
      featuredImage: fields.featuredImage?.fields?.file?.url || undefined,
      content: content,
      category: category ? {
        id: category.sys.id,
        name: category.fields.name,
        slug: category.fields.slug,
        title: category.fields.name,
      } : {
        id: 'uncategorized',
        name: 'Uncategorized',
        slug: 'uncategorized',
        title: 'Uncategorized',
      },
      author: author ? {
        id: author.sys.id,
        name: author.fields.name,
        role: author.fields.role,
        bio: author.fields.bio,
        avatar: (author.fields.avatar as any)?.fields?.file?.url,
      } : undefined,
      authorName: author?.fields.name,
      tags: fields.tags || [],
      publishedAt: fields.publishedAt || entry.sys.createdAt,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    } as BlogPost;
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch all blog categories from browser (real-time)
 * Returns empty array if content type doesn't exist
 */
export async function getAllBlogCategoriesBrowser(): Promise<BlogCategory[]> {
  try {
    const client = getContentfulClientBrowser();
    const response = await client.getEntries({
      content_type: 'blogCategory',
      order: ['fields.name'],
    }) as any;

    return response.items.map((entry: any) => ({
      id: entry.sys.id,
      name: entry.fields.name,
      slug: entry.fields.slug,
      title: entry.fields.name,
    }));
  } catch (error) {
    console.warn('[Contentful] Blog categories not available:', error instanceof Error ? error.message : 'Unknown error');
    // Return empty array instead of throwing - categories are optional
    return [];
  }
}
