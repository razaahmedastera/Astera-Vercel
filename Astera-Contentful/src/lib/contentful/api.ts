import { unstable_cache } from 'next/cache';
import { contentfulClient } from './client';
import type { 
  HomePageContentSkeleton, 
  HomePageContent,
  ProductPageContentSkeleton,
  ProductPageContent,
  ProductPageSummary,
  BlogPost,
  BlogCategory,
  BlogPostSkeleton,
  BlogCategorySkeleton,
  BlogAuthorSkeleton,
  Ebook,
  EbookSkeleton,
  Industry,
  IndustryFeature,
  UseCase,
  UseCaseSkeleton,
  UseCaseSummary
} from '@/types/contentful';
import { Entry } from 'contentful';

/**
 * Fetch home page content from homePage content type by slug
 * @param slug - The page slug (default: 'home')
 * @returns Home page content with all sections
 */
export async function getHomePageContent(slug: string = 'home'): Promise<HomePageContent> {
  return unstable_cache(
    async () => {
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
        const fields = entry.fields as HomePageContentSkeleton['fields'];

        return {
          id: entry.sys.id,
          entryTitle: fields.entryTitle,
          slug: fields.slug,
          
          // Hero Section
          heroSectionBadge: fields.heroSectionBadge,
          heroSectionHeading: fields.heroSectionHeading,
          heroSectionDescription: fields.heroSectionDescription,
          heroSectionPrimaryCta: fields.heroSectionPrimaryCta,
          heroSectionPrimaryCtaUrl: fields.heroSectionPrimaryCtaUrl || '#',
          heroSectionSecondaryCta: fields.heroSectionSecondaryCta,
          heroSectionSecondaryCtaUrl: fields.heroSectionSecondaryCtaUrl || '#',
          
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
          awards: fields.awards || [],
          
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
        console.error(`Error fetching home page content with slug "${slug}":`, error);
        throw error;
      }
    },
    [`home-page-${slug}`],
    {
      revalidate: 3600,
      tags: ['home-page', 'home'],
    }
  )();
}

/**
 * Fetch all product pages from Contentful
 * @returns Array of product page summaries
 */
export async function getAllProductPages(): Promise<ProductPageSummary[]> {
  return unstable_cache(
    async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: 'productPage',
          order: ['fields.productName'],
        }) as any;

        return response.items.map((entry: any) => ({
          id: entry.sys.id,
          productName: entry.fields.productName || entry.fields.entryTitle || 'Untitled Product',
          slug: entry.fields.slug || '',
        }));
      } catch (error) {
        console.error(`Error fetching product pages: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`);
        return [];
      }
    },
    ['product-pages'],
    {
      revalidate: 3600,
      tags: ['product-pages', 'product'],
    }
  )();
}

/**
 * Fetch product page content from productPage content type by slug
 * @param slug - The page slug (default: 'reportminer')
 * @returns Product page content with all sections
 */
export async function getProductPageContent(slug: string = 'reportminer'): Promise<ProductPageContent> {
  return unstable_cache(
    async () => {
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
          heroSectionPrimaryCtaUrl: fields.heroSectionPrimaryCtaUrl || '#',
          heroSectionSecondaryCta: fields.heroSectionSecondaryCta,
          heroSectionSecondaryCtaUrl: fields.heroSectionSecondaryCtaUrl || '#',
          heroSectionVideoUrl: fields.heroSectionVideoUrl,
          heroSectionTrustBadges: fields.heroSectionTrustBadges,
          heroImage: fields.heroImage ? extractAssetUrl(fields.heroImage) : '',
          
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
          
          // Explore Resources Section
          resourcesSectionTitle: fields.resourcesSectionTitle || undefined,
          resourcesSectionBadge: fields.resourcesSectionBadge || undefined,
          resourcesSectionDescription: fields.resourcesSectionDescription || undefined,
          resources: fields.resources || undefined,
          
          // Contact Form Section
          contactFormSectionTitle: fields.contactFormSectionTitle,
          contactFormSectionSubtitle: fields.contactFormSectionSubtitle,
          contactFormSectionDescription: fields.contactFormSectionDescription,
          contactFormSectionWhyTitle: fields.contactFormSectionWhyTitle,
          contactFormSectionBenefits: fields.contactFormSectionBenefits,
          contactFormSectionFooterText: fields.contactFormSectionFooterText,
          hubspotFormId: fields.hubspotFormId || '',
          
          // CTA Section
          ctaSectionTitle: fields.ctaSectionTitle,
          ctaSectionDescription: fields.ctaSectionDescription,
          ctaSectionPrimaryText: fields.ctaSectionPrimaryText,
          ctaSectionPrimaryUrl: fields.ctaSectionPrimaryUrl || '#',
          ctaSectionSecondaryText: fields.ctaSectionSecondaryText,
          ctaSectionSecondaryUrl: fields.ctaSectionSecondaryUrl || '#',
          
          createdAt: entry.sys.createdAt,
          updatedAt: entry.sys.updatedAt,
        };
      } catch (error) {
        console.error(`Error fetching product page content with slug "${slug}":`, error);
        throw error;
      }
    },
    [`product-page-${slug}`],
    {
      revalidate: 3600,
      tags: ['product-pages', 'product', `product-${slug}`],
    }
  )();
}

/**
 * Helper function to ensure string values from Contentful
 */
function ensureStringExcerpt(value: any): string {
  if (typeof value === 'string') {
    return value;
  }
  if (value && typeof value === 'object' && 'nodeType' in value) {
    // It's a Rich Text document - extract text
    return extractTextFromRichText(value);
  }

  return String(value || '');
}

/**
 * Extract plain text from Rich Text document
 */
function extractTextFromRichText(document: any): string {
  if (!document || !document.content) return '';
  
  let text = '';
  for (const node of document.content) {
    if (node.nodeType === 'paragraph' || node.nodeType === 'heading-1' || node.nodeType === 'heading-2' || node.nodeType === 'heading-3') {
      if (node.content) {
        for (const contentNode of node.content) {
          if (contentNode.nodeType === 'text') {
            text += contentNode.value + ' ';
          }
        }
      }
    }
  }
  
  return text.trim();
}

/**
 * Fetch all blog posts from Contentful
 * @returns Array of blog posts
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return unstable_cache(
    async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: 'blog',
          order: ['-sys.createdAt'],
          include: 10, // Increase to ensure assets are fully resolved
        }) as any;

        return response.items.map((entry: any) => {
          // Debug: Log raw entry structure
          console.log('[DEBUG getAllBlogPosts] Raw entry sys:', entry.sys);
          console.log('[DEBUG getAllBlogPosts] Raw entry fields keys:', Object.keys(entry.fields || {}));
          console.log('[DEBUG getAllBlogPosts] Raw entry fields:', entry.fields);
          
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
            content = {
              nodeType: 'document',
              data: {},
              content: [{
                nodeType: 'paragraph',
                data: {},
                content: [{
                  nodeType: 'text',
                  value: 'Content not available',
                  marks: [],
                  data: {},
                }],
              }],
            };
          }

          // Extract featured image URL
          let featuredImageUrl = '';
          if (fields.featuredImage) {
            const featuredImage = fields.featuredImage as any;
            if (featuredImage.fields?.file?.url) {
              const url = featuredImage.fields.file.url;
              featuredImageUrl = url.startsWith('//') ? `https:${url}` : url;
            } else if (typeof featuredImage === 'string') {
              featuredImageUrl = featuredImage;
            }
          }

          // Extract category info
          let categoryData: BlogCategory | undefined;
          if (category) {
            const nameField = category.fields.name;
            const slugField = category.fields.slug;
            const descriptionField = category.fields.description;
            
            categoryData = {
              id: category.sys.id,
              name: (typeof nameField === 'string' ? nameField : (nameField as any)?.en || '') || '',
              slug: (typeof slugField === 'string' ? slugField : (slugField as any)?.en || '') || '',
              description: typeof descriptionField === 'string' ? descriptionField : (descriptionField as any)?.en || undefined,
            };
          }

          // Extract author info
          let authorData: any = undefined;
          if (author) {
            const avatarField = author.fields.avatar as any;
            const avatarUrl = avatarField?.fields?.file?.url;
            
            authorData = {
              id: author.sys.id,
              name: author.fields.name || '',
              role: author.fields.role,
              bio: author.fields.bio,
              avatar: avatarUrl 
                ? (avatarUrl.startsWith('//') 
                    ? `https:${avatarUrl}` 
                    : avatarUrl)
                : undefined,
            };
          }

          return {
            id: entry.sys.id,
            title: fields.title || 'Untitled',
            slug: fields.slug || '',
            excerpt: excerpt || extractTextFromRichText(content).substring(0, 200),
            content: content,
            featuredImage: featuredImageUrl,
            category: categoryData!,
            author: authorData,
            authorName: authorData?.name || fields.authorName || 'Unknown Author',
            tags: fields.tags || [],
            keyPoints: fields.keyPoints || [],
            keyTakeaways: fields.keyTakeaways,
            faQss: fields.faQss ? (typeof fields.faQss === 'string' ? JSON.parse(fields.faQss) : fields.faQss) : undefined,
            body: typeof content === 'string' ? content : undefined,
            publishedAt: fields.publishedAt || entry.sys.createdAt,
            createdAt: entry.sys.createdAt,
            updatedAt: entry.sys.updatedAt,
          } as BlogPost;
        });
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        if (error instanceof Error && error.message.includes('unknownContentType')) {
          console.warn('[Contentful] Blog content type not found. Please create a "blog" content type in Contentful.');
          return [];
        }
        return [];
      }
    },
    ['blog-posts'],
    {
      revalidate: 3600,
      tags: ['blog-posts', 'blog'],
    }
  )();
}

/**
 * Fetch a single blog post by slug
 * @param slug - The blog post slug
 * @returns Blog post or null if not found
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return unstable_cache(
    async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: 'blog',
          'fields.slug': slug,
          limit: 1,
          include: 10, // Increase to ensure assets are fully resolved
        }) as any;

        if (response.items.length === 0) {
          // Fallback: try fetching all and filtering
          const allPosts = await getAllBlogPosts();
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
          content = {
            nodeType: 'document',
            data: {},
            content: [{
              nodeType: 'paragraph',
              data: {},
              content: [{
                nodeType: 'text',
                value: 'Content not available',
                marks: [],
                data: {},
              }],
            }],
          };
        }

        // Extract featured image URL
        let featuredImageUrl = '';
        if (fields.featuredImage) {
          const featuredImage = fields.featuredImage as any;
          if (featuredImage.fields?.file?.url) {
            const url = featuredImage.fields.file.url;
            featuredImageUrl = url.startsWith('//') ? `https:${url}` : url;
          } else if (typeof featuredImage === 'string') {
            featuredImageUrl = featuredImage;
          }
        }

        // Extract category info
        let categoryData: BlogCategory | undefined;
        if (category) {
          const nameField = category.fields.name;
          const slugField = category.fields.slug;
          const descriptionField = category.fields.description;
          
          categoryData = {
            id: category.sys.id,
            name: (typeof nameField === 'string' ? nameField : (nameField as any)?.en || '') || '',
            slug: (typeof slugField === 'string' ? slugField : (slugField as any)?.en || '') || '',
            description: typeof descriptionField === 'string' ? descriptionField : (descriptionField as any)?.en || undefined,
          };
        }

        // Extract author info
        let authorData: any = undefined;
        if (author) {
          authorData = {
            id: author.sys.id,
            name: author.fields.name || '',
            role: author.fields.role,
            bio: author.fields.bio,
            avatar: (() => {
              const avatarField = author.fields.avatar as any;
              const avatarUrl = avatarField?.fields?.file?.url;
              return avatarUrl 
                ? (avatarUrl.startsWith('//') 
                    ? `https:${avatarUrl}` 
                    : avatarUrl)
                : undefined;
            })(),
          };
        }

        return {
          id: entry.sys.id,
          title: fields.title || 'Untitled',
          slug: fields.slug || '',
          excerpt: excerpt || extractTextFromRichText(content).substring(0, 200),
          content: content,
          featuredImage: featuredImageUrl,
          category: categoryData!,
          author: authorData,
          authorName: authorData?.name || fields.authorName || 'Unknown Author',
          tags: fields.tags || [],
          keyPoints: fields.keyPoints || [],
          keyTakeaways: fields.keyTakeaways,
          faQss: fields.faQss ? (typeof fields.faQss === 'string' ? JSON.parse(fields.faQss) : fields.faQss) : undefined,
          body: typeof content === 'string' ? content : undefined,
          publishedAt: fields.publishedAt || entry.sys.createdAt,
          createdAt: entry.sys.createdAt,
          updatedAt: entry.sys.updatedAt,
        } as BlogPost;
      } catch (error) {
        console.error(`Error fetching blog post with slug "${slug}":`, error);
        if (error instanceof Error && error.message.includes('unknownContentType')) {
          console.warn('[Contentful] Blog content type not found. Please create a "blog" content type in Contentful.');
          return null;
        }
        return null;
      }
    },
    [`blog-post-${slug}`],
    {
      revalidate: 3600,
      tags: ['blog-posts', 'blog', `blog-${slug}`],
    }
  )();
}

/**
 * Fetch all blog categories from Contentful
 * @returns Array of blog categories
 */
export async function getAllBlogCategories(): Promise<BlogCategory[]> {
  return unstable_cache(
    async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: 'blogCategory',
          order: ['fields.name'],
        }) as any;

        return response.items.map((entry: any) => ({
          id: entry.sys.id,
          name: entry.fields.name || 'Uncategorized',
          slug: entry.fields.slug || '',
          description: entry.fields.description,
          title: entry.fields.title,
        }));
      } catch (error) {
        console.error('Error fetching blog categories:', error);
        if (error instanceof Error && error.message.includes('unknownContentType')) {
          console.warn('[Contentful] Blog Category content type not found.');
          return [];
        }
        return [];
      }
    },
    ['blog-categories'],
    {
      revalidate: 3600,
      tags: ['blog-categories', 'blog'],
    }
  )();
}

/**
 * Fetch a single blog category by slug
 * @param slug - The category slug
 * @returns Blog category or null if not found
 */
export async function getBlogCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  return unstable_cache(
    async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: 'blogCategory',
          'fields.slug': slug,
          limit: 1,
        }) as any;

        if (response.items.length === 0) {
          return null;
        }

        const entry = response.items[0];
        return {
          id: entry.sys.id,
          name: entry.fields.name || 'Uncategorized',
          slug: entry.fields.slug || '',
          description: entry.fields.description,
          title: entry.fields.title,
        };
      } catch (error) {
        console.error(`Error fetching blog category with slug "${slug}":`, error);
        return null;
      }
    },
    [`blog-category-${slug}`],
    {
      revalidate: 3600,
      tags: ['blog-categories', 'blog'],
    }
  )();
}

/**
 * Generate slug from title
 */
function generateSlugFromTitle(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extract URL from Contentful Asset object
 * Handles both Asset objects and plain string URLs
 */
function extractAssetUrl(asset: any, includes?: any): string {
  if (!asset) return '';
  
  // If it's already a string URL, return it
  if (typeof asset === 'string') {
    return asset;
  }
  
  // If it's a link object with sys.id, try to resolve from includes
  if (asset.sys?.id && asset.sys?.type === 'Link' && includes?.Asset) {
    const resolvedAsset = includes.Asset.find((a: any) => a.sys.id === asset.sys.id);
    if (resolvedAsset) {
      return extractAssetUrl(resolvedAsset);
    }
  }
  
  // If it's an Asset object, extract the URL from fields.file.url
  if (asset.fields?.file?.url) {
    const url = asset.fields.file.url;
    // Handle Contentful URLs that start with // (protocol-relative)
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    // Handle URLs that already have protocol
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    // Default to https
    return `https:${url}`;
  }
  
  // Try alternative structures
  if (asset.file?.url) {
    const url = asset.file.url;
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https:${url}`;
  }
  
  // If it's an array, take the first item
  if (Array.isArray(asset) && asset.length > 0) {
    return extractAssetUrl(asset[0], includes);
  }
  
  return '';
}

/**
 * Fetch all eBooks from Contentful
 * @returns Array of eBooks
 */
export async function getAllEbooks(): Promise<Ebook[]> {
  return unstable_cache(
    async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: 'eBook',
          order: ['-sys.createdAt'],
          include: 2, // Include linked assets
        }) as any;

        return response.items.map((entry: any) => {
      const fields = entry.fields || {};
      
      // Extract PDF URL from eBookURL field (can be Asset or string)
      let pdfUrl = '';
      if (fields.eBookURL) {
        if (typeof fields.eBookURL === 'string') {
          pdfUrl = fields.eBookURL;
        } else {
          // It's an Asset link - resolve from includes if needed
          pdfUrl = extractAssetUrl(fields.eBookURL, response.includes);
          
          // If still empty, try to resolve from sys.id
          if (!pdfUrl && fields.eBookURL.sys?.id && response.includes?.Asset) {
            const resolvedAsset = response.includes.Asset.find((a: any) => a.sys.id === fields.eBookURL.sys.id);
            if (resolvedAsset) {
              pdfUrl = extractAssetUrl(resolvedAsset);
            }
          }
        }
      }

      // Extract description (can be Rich Text or string)
      let description: any = '';
      if (fields.eBookDescription) {
        if (typeof fields.eBookDescription === 'string') {
          description = fields.eBookDescription;
        } else if (fields.eBookDescription.nodeType === 'document') {
          description = fields.eBookDescription;
        }
      }

      return {
        id: entry.sys.id,
        title: fields.eBookTitle || 'Untitled eBook',
        slug: fields.slug || generateSlugFromTitle(fields.eBookTitle || ''),
        description: description,
        pdfUrl: pdfUrl,
        coverImage: undefined,
        topics: undefined,
        hubspotFormId: '3e8efa89-ed65-4c01-9a0f-8d1c84cf5a7b',
        createdAt: entry.sys.createdAt,
        updatedAt: entry.sys.updatedAt,
        // SEO Fields (if they exist)
        seoTitle: fields.seoTitle || '',
        seoDescription: fields.seoDescription || '',
        seoKeywords: fields.seoKeywords || '',
        focusKeyword: fields.focusKeyword || '',
        ogImage: fields.ogImage ? extractAssetUrl(fields.ogImage, response.includes) : '',
        canonicalUrl: fields.canonicalUrl || '',
        metaRobots: fields.metaRobots || 'index, follow',
        schemaType: fields.schemaType || 'Book',
      } as Ebook;
        });
      } catch (error) {
        console.error('Error fetching eBooks:', error);
        if (error instanceof Error && error.message.includes('unknownContentType')) {
          console.warn('[Contentful] eBook content type not found. Please create an "eBook" content type in Contentful.');
          return [];
        }
        return [];
      }
    },
    ['ebooks'],
    {
      revalidate: 3600,
      tags: ['ebooks', 'ebook'],
    }
  )();
}

/**
 * Fetch a single eBook by slug
 * @param slug - The eBook slug
 * @returns eBook or null if not found
 */
export async function getEbookBySlug(slug: string): Promise<Ebook | null> {
  return unstable_cache(
    async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: 'eBook',
          'fields.slug': slug,
          limit: 1,
          include: 2, // Include linked assets
        }) as any;

        if (response.items.length === 0) {
          return null;
        }

    const entry = response.items[0];
    const fields = entry.fields || {};
    
    // Debug: Log all available fields to help diagnose field name issues
    console.log(`[getEbookBySlug] Available fields for "${fields.eBookTitle || 'Untitled'}":`, Object.keys(fields));
    
    // Extract PDF URL from eBookURL field (can be Asset or string)
    // Try multiple possible field names (case variations)
    let pdfUrl = '';
    const pdfAsset = fields.eBookURL || fields.ebookURL || fields.eBookUrl || fields.ebookUrl || fields.pdfUrl || fields.pdfURL;
    
    console.log(`[getEbookBySlug] PDF Asset found:`, !!pdfAsset);
    if (pdfAsset) {
      console.log(`[getEbookBySlug] PDF Asset type:`, typeof pdfAsset);
      console.log(`[getEbookBySlug] PDF Asset structure:`, JSON.stringify(pdfAsset, null, 2).substring(0, 500));
      
      if (typeof pdfAsset === 'string') {
        pdfUrl = pdfAsset;
        console.log(`[getEbookBySlug] PDF URL extracted as string:`, pdfUrl);
      } else {
        // It's an Asset link - resolve from includes if needed
        pdfUrl = extractAssetUrl(pdfAsset, response.includes);
        console.log(`[getEbookBySlug] PDF URL after extractAssetUrl:`, pdfUrl || '(empty)');
        
        // If still empty, try to resolve from sys.id
        if (!pdfUrl && pdfAsset.sys?.id && response.includes?.Asset) {
          console.log(`[getEbookBySlug] Attempting to resolve asset from includes with ID:`, pdfAsset.sys.id);
          const resolvedAsset = response.includes.Asset.find((a: any) => a.sys.id === pdfAsset.sys.id);
          if (resolvedAsset) {
            console.log(`[getEbookBySlug] Resolved asset found:`, !!resolvedAsset);
            pdfUrl = extractAssetUrl(resolvedAsset);
            console.log(`[getEbookBySlug] PDF URL after resolving from includes:`, pdfUrl || '(empty)');
          } else {
            console.warn(`[getEbookBySlug] Asset with ID ${pdfAsset.sys.id} not found in includes.Asset array`);
            console.log(`[getEbookBySlug] Available asset IDs in includes:`, response.includes?.Asset?.map((a: any) => a.sys?.id) || []);
          }
        }
      }
    } else {
      console.warn(`[getEbookBySlug] No PDF asset field found. Tried: eBookURL, ebookURL, eBookUrl, ebookUrl, pdfUrl, pdfURL`);
    }

    // Extract description (can be Rich Text or string)
    let description: any = '';
    if (fields.eBookDescription) {
      if (typeof fields.eBookDescription === 'string') {
        description = fields.eBookDescription;
      } else if (fields.eBookDescription.nodeType === 'document') {
        description = fields.eBookDescription;
      }
    }

    // Extract OG Image URL
    let ogImageUrl = '';
    if (fields.ogImage) {
      ogImageUrl = extractAssetUrl(fields.ogImage, response.includes);
    }

    // Log warning if no PDF URL found (for debugging)
    if (!pdfUrl) {
        console.warn(`[getEbookBySlug] ⚠️ No PDF URL found for eBook "${fields.eBookTitle || 'Untitled'}"`);
        console.warn(`[getEbookBySlug] Available fields:`, Object.keys(fields));
        if (pdfAsset) {
          console.warn(`[getEbookBySlug] PDF Asset structure:`, JSON.stringify(pdfAsset, null, 2));
        }
      }
      
      return {
        id: entry.sys.id,
        title: fields.eBookTitle || '',
        slug: fields.slug || '',
        description: description,
        pdfUrl: pdfUrl,
        coverImage: undefined,
        topics: undefined,
        hubspotFormId: '3e8efa89-ed65-4c01-9a0f-8d1c84cf5a7b',
        createdAt: entry.sys.createdAt,
        updatedAt: entry.sys.updatedAt,
        // SEO Fields
        seoTitle: fields.seoTitle || '',
        seoDescription: fields.seoDescription || '',
        seoKeywords: fields.seoKeywords || '',
        focusKeyword: fields.focusKeyword || '',
        ogImage: ogImageUrl,
        canonicalUrl: fields.canonicalUrl || '',
        metaRobots: fields.metaRobots || 'index, follow',
        schemaType: fields.schemaType || 'Book',
      } as Ebook;
      } catch (error) {
        console.error(`Error fetching eBook with slug "${slug}":`, error);
        if (error instanceof Error && error.message.includes('unknownContentType')) {
          console.warn('[Contentful] eBook content type not found. Please create an "eBook" content type in Contentful.');
          return null;
        }
        return null;
      }
    },
    [`ebook-${slug}`],
    {
      revalidate: 3600,
      tags: ['ebooks', 'ebook', `ebook-${slug}`],
    }
  )();
}

/**
 * =============================================
 * INDUSTRY API FUNCTIONS
 * =============================================
 */

/**
 * Fetch all industries from Contentful
 * @returns Array of industries
 */
export async function getAllIndustries(): Promise<Industry[]> {
  return unstable_cache(
    async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: '21U5b9oci2lilctbzJrh4a',
          include: 2, // Include linked assets
        }) as any;

        return response.items.map((entry: any) => {
          const fields = entry.fields || {};
          
          // Parse features JSON
          let features: IndustryFeature[] = [];
          if (fields.features) {
            try {
              let parsedFeatures: any[] = [];
              if (typeof fields.features === 'string') {
                parsedFeatures = JSON.parse(fields.features);
              } else if (Array.isArray(fields.features)) {
                parsedFeatures = fields.features;
              }
              
              // Process features to extract iconImage URLs if they're Contentful assets or URLs
              features = parsedFeatures.map((feature: any) => {
                // Check if icon is actually an image URL
                const iconIsImageUrl = feature.icon && (feature.icon.startsWith('http://') || feature.icon.startsWith('https://'));
                
                return {
                  id: feature.id || '',
                  title: feature.title || '',
                  description: feature.description || '',
                  icon: feature.icon || '',
                  // Prioritize iconImage field, then check if icon is an image URL
                  iconImage: feature.iconImage ? extractAssetUrl(feature.iconImage) : 
                            (iconIsImageUrl ? feature.icon : undefined),
                };
              });
            } catch (error) {
              console.warn('Error parsing features JSON:', error);
            }
          }

          return {
            id: entry.sys.id,
            name: fields.industryName || '',
            slug: fields.slug || '',
            subtitle: fields.subtitle || '',
            heroImage: extractAssetUrl(fields.heroImage),
            ctaText: fields.ctaText || '',
            ctaLink: fields.ctaLink || '',
            videoTitle: fields.videoTitle || '',
            videoUrl: fields.videoUrl || '',
            videoThumbnail: extractAssetUrl(fields.videoThumbnail) || '',
            featuresSectionTitle: fields.featuresSectionTitle || '',
            features: features,
            caseStudy: {
              label: fields.caseStudyLabel || 'Case Study',
              title: fields.caseStudyTitle || '',
              quote: fields.caseStudyQuote || '',
              author: fields.caseStudyAuthor || '',
              authorRole: fields.caseStudyAuthorRole || '',
              company: fields.caseStudyCompany || '',
              image: extractAssetUrl(fields.caseStudyImage),
              ctaText: fields.caseStudyCtaText || '',
              ctaLink: fields.caseStudyCtaLink || '',
            },
            finalCtaTitle: fields.finalCtaTitle || '',
            finalCtaSubtitle: fields.finalCtaSubtitle || '',
            finalCtaButtonText: fields.finalCtaButtonText || '',
            finalCtaButtonLink: fields.finalCtaButtonLink || '',
            createdAt: entry.sys.createdAt,
            updatedAt: entry.sys.updatedAt,
          } as Industry;
        });
      } catch (error) {
        console.error('Error fetching industries:', error);
        if (error instanceof Error && error.message.includes('unknownContentType')) {
          console.warn('[Contentful] Industry Template content type not found. Please create it in Contentful.');
          return [];
        }
        return [];
      }
    },
    ['industries'],
    {
      revalidate: 3600,
      tags: ['industries', 'industry'],
    }
  )();
}

/**
 * Fetch a single industry by slug
 * @param slug - The industry slug
 * @returns Industry or null if not found
 */
export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
  return unstable_cache(
    async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: '21U5b9oci2lilctbzJrh4a',
          'fields.slug': slug,
          limit: 1,
          include: 2, // Include linked assets
        }) as any;

        if (response.items.length === 0) {
          return null;
        }

        const entry = response.items[0];
        const fields = entry.fields || {};
        
        // Parse features JSON
        let features: IndustryFeature[] = [];
        if (fields.features) {
          try {
            let parsedFeatures: any[] = [];
            if (typeof fields.features === 'string') {
              parsedFeatures = JSON.parse(fields.features);
            } else if (Array.isArray(fields.features)) {
              parsedFeatures = fields.features;
            }
            
            // Process features to extract iconImage URLs if they're Contentful assets or URLs
            features = parsedFeatures.map((feature: any) => {
              // Check if icon is actually an image URL
              const iconIsImageUrl = feature.icon && (feature.icon.startsWith('http://') || feature.icon.startsWith('https://'));
              
              return {
                id: feature.id || '',
                title: feature.title || '',
                description: feature.description || '',
                icon: feature.icon || '',
                // Prioritize iconImage field, then check if icon is an image URL
                iconImage: feature.iconImage ? extractAssetUrl(feature.iconImage) : 
                          (iconIsImageUrl ? feature.icon : undefined),
              };
            });
          } catch (error) {
            console.warn('Error parsing features JSON:', error);
          }
        }

        return {
          id: entry.sys.id,
          name: fields.industryName || '',
          slug: fields.slug || '',
          subtitle: fields.subtitle || '',
          heroImage: extractAssetUrl(fields.heroImage),
          ctaText: fields.ctaText || '',
          ctaLink: fields.ctaLink || '',
          videoTitle: fields.videoTitle || '',
          videoUrl: fields.videoUrl || '',
          videoThumbnail: '', // No longer used
          featuresSectionTitle: fields.featuresSectionTitle || '',
          features: features,
          caseStudy: {
            label: fields.caseStudyLabel || 'Case Study',
            title: fields.caseStudyTitle || '',
            quote: fields.caseStudyQuote || '',
            author: fields.caseStudyAuthor || '',
            authorRole: fields.caseStudyAuthorRole || '',
            company: fields.caseStudyCompany || '',
            image: extractAssetUrl(fields.caseStudyImage),
            ctaText: fields.caseStudyCtaText || '',
            ctaLink: fields.caseStudyCtaLink || '',
          },
          finalCtaTitle: fields.finalCtaTitle || '',
          finalCtaSubtitle: fields.finalCtaSubtitle || '',
          finalCtaButtonText: fields.finalCtaButtonText || '',
          finalCtaButtonLink: fields.finalCtaButtonLink || '',
          createdAt: entry.sys.createdAt,
          updatedAt: entry.sys.updatedAt,
        } as Industry;
      } catch (error) {
        console.error(`Error fetching industry with slug "${slug}":`, error);
        if (error instanceof Error && error.message.includes('unknownContentType')) {
          console.warn('[Contentful] Industry Template content type not found. Please create it in Contentful.');
          return null;
        }
        return null;
      }
    },
    [`industry-${slug}`],
    {
      revalidate: 3600,
      tags: ['industries', 'industry', `industry-${slug}`],
    }
  )();
}

/**
 * =============================================
 * USE CASE API FUNCTIONS
 * =============================================
 */

/**
 * Fetch all use cases (for listing page)
 * @returns Array of use case summaries
 */
export async function getAllUseCases(): Promise<UseCaseSummary[]> {
  return unstable_cache(
    async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: 'useCase',
          order: ['-fields.featured', 'fields.title'],
          include: 2, // Include linked assets
        }) as any;

        if (!response.items || response.items.length === 0) {
          return [];
        }

        return response.items.map((entry: any) => {
          const fields = entry.fields as UseCaseSkeleton['fields'];
          return {
            id: entry.sys.id,
            slug: fields.slug,
            title: fields.title,
            description: fields.description || '',
            icon: fields.icon || '',
            iconImage: fields.iconImage ? extractAssetUrl(fields.iconImage, response.includes) : undefined,
            category: fields.category || '',
            featured: fields.featured || false,
          } as UseCaseSummary;
        });
      } catch (error) {
        console.error('Error fetching all use cases:', error);
        if (error instanceof Error && error.message.includes('unknownContentType')) {
          console.warn('[Contentful] Use Case content type not found. Please create it in Contentful.');
          return [];
        }
        return [];
      }
    },
    ['all-use-cases'],
    {
      revalidate: 3600,
      tags: ['use-cases', 'use-case'],
    }
  )();
}

/**
 * Fetch use case by slug
 * @param slug - The use case slug
 * @returns Use case detail or null if not found
 */
export async function getUseCaseBySlug(slug: string): Promise<UseCase | null> {
  return unstable_cache(
    async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: 'useCase',
          'fields.slug': slug,
          limit: 1,
          include: 2, // Include linked assets
        }) as any;

        if (response.items.length === 0) {
          return null;
        }

        const entry = response.items[0];
        const fields = entry.fields as UseCaseSkeleton['fields'];

        return {
          id: entry.sys.id,
          slug: fields.slug,
          title: fields.title,
          subtitle: fields.subtitle || '',
          heroDescription: fields.heroDescription || '',
          heroImage: fields.heroImage ? extractAssetUrl(fields.heroImage, response.includes) : undefined,
          
          // Rich Text Content
          content: fields.content || undefined,
          
          // Stats Section
          stats: fields.stats || [],
          benefits: fields.benefits || '',
          
          // Features Section
          featuresDescription: fields.featuresDescription || undefined,
          features: (fields.features || []).map((feature: any) => ({
            title: feature.title || '',
            description: feature.description || '',
            icon: feature.icon || undefined,
            iconImage: feature.iconImage ? extractAssetUrl(feature.iconImage, response.includes) : undefined,
            image: feature.image ? extractAssetUrl(feature.image, response.includes) : undefined,
          })),
          
          // How It Works Section
          howItWorks: fields.howItWorks || [],
          
          // Capabilities Section
          capabilities: fields.capabilities || [],
          
          // Integrations
          integrations: fields.integrations || [],
          
          // Case Study
          caseStudy: fields.caseStudy ? {
            quote: fields.caseStudy.quote || '',
            author: fields.caseStudy.author || '',
            company: fields.caseStudy.company || '',
            link: fields.caseStudy.link || '#',
          } : undefined,
          
          // FAQs
          faqs: fields.faqs || [],
          
          // SEO Fields
          seoTitle: fields.seoTitle || undefined,
          seoDescription: fields.seoDescription || undefined,
          seoKeywords: fields.seoKeywords || undefined,
          ogImage: fields.ogImage ? extractAssetUrl(fields.ogImage, response.includes) : undefined,
          
          createdAt: entry.sys.createdAt,
          updatedAt: entry.sys.updatedAt,
        } as UseCase;
      } catch (error) {
        console.error(`Error fetching use case with slug "${slug}":`, error);
        if (error instanceof Error && error.message.includes('unknownContentType')) {
          console.warn('[Contentful] Use Case content type not found. Please create it in Contentful.');
          return null;
        }
        return null;
      }
    },
    [`use-case-${slug}`],
    {
      revalidate: 3600,
      tags: ['use-cases', 'use-case', `use-case-${slug}`],
    }
  )();
}