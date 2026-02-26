import { contentfulClient } from './client';
import type { 
  HomePageContentSkeleton, 
  HomePageContent,
  ProductPageContentSkeleton,
  ProductPageContent,
  ProductPageSummary,
  BlogPost,
  BlogCategory,
  BlogAuthor,
  BlogPostSkeleton,
  BlogCategorySkeleton,
  BlogAuthorSkeleton,
  Ebook,
  EbookSkeleton,
  Industry,
  IndustryFeature,
  UseCase,
  UseCaseSkeleton,
  UseCaseSummary,
  Webinar,
  WebinarSkeleton,
  WebinarSpeaker,
  Whitepaper,
  Datasheet,
  AboutUsPageContent,
  TeamMember,
  AboutUsStat,
  AboutUsAward,
  NewsPost,
  NewsEvent,
} from '@/types/contentful';
import { Entry } from 'contentful';

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
}

/**
 * Fetch all product pages from Contentful
 * @returns Array of product page summaries
 */
export async function getAllProductPages(): Promise<ProductPageSummary[]> {
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
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'blog',
    order: ['-sys.createdAt'],
    include: 10, // Increase to ensure assets are fully resolved
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
        slug: (author.fields as any).slug || '',
        role: author.fields.role,
        jobTitle: (author.fields as any).jobTitle,
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
}

/**
 * Fetch a single blog post by slug
 * @param slug - The blog post slug
 * @returns Blog post or null if not found
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
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
      slug: (author.fields as any).slug || '',
      role: author.fields.role,
      jobTitle: (author.fields as any).jobTitle,
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
}

/**
 * Fetch all blog categories from Contentful
 * @returns Array of blog categories
 */
export async function getAllBlogCategories(): Promise<BlogCategory[]> {
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
}

/**
 * Fetch a single blog category by slug
 * @param slug - The category slug
 * @returns Blog category or null if not found
 */
export async function getBlogCategoryBySlug(slug: string): Promise<BlogCategory | null> {
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
    return asset.startsWith('//') ? `https:${asset}` : asset;
  }
  
  // If it's a link object with sys.id, try to resolve from includes
  if (asset.sys?.id && (asset.sys?.type === 'Link' || asset.sys?.linkType === 'Asset') && includes?.Asset) {
    const resolvedAsset = includes.Asset.find((a: any) => a.sys.id === asset.sys.id);
    if (resolvedAsset) {
      return extractAssetUrl(resolvedAsset);
    }
  }
  
  // If it's a resolved Asset object (sys.type === 'Asset'), extract URL
  if (asset.sys?.type === 'Asset' && asset.fields?.file?.url) {
    const url = asset.fields.file.url;
    if (url.startsWith('//')) return `https:${url}`;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https:${url}`;
  }

  // If it's an Asset object, extract the URL from fields.file.url
  if (asset.fields?.file?.url) {
    const url = asset.fields.file.url;
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
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

function parseSpeakers(speakerRefs: any, speakersJson: any, includes?: any): WebinarSpeaker[] | undefined {
  // Prefer linked Speaker entries (speakerRefs)
  if (speakerRefs && Array.isArray(speakerRefs) && speakerRefs.length > 0) {
    const resolved: WebinarSpeaker[] = [];
    for (const ref of speakerRefs) {
      // Resolved entry (CDA auto-resolves links)
      if (ref.fields) {
        const imgUrl = ref.fields.image ? extractAssetUrl(ref.fields.image, includes) : undefined;
        resolved.push({
          name: ref.fields.name || '',
          title: ref.fields.title || '',
          bio: ref.fields.bio || undefined,
          image: imgUrl || undefined,
        });
      } else if (ref.sys?.id && includes?.Entry) {
        // Unresolved link — look up in includes
        const entry = includes.Entry.find((e: any) => e.sys.id === ref.sys.id);
        if (entry?.fields) {
          const imgUrl = entry.fields.image ? extractAssetUrl(entry.fields.image, includes) : undefined;
          resolved.push({
            name: entry.fields.name || '',
            title: entry.fields.title || '',
            bio: entry.fields.bio || undefined,
            image: imgUrl || undefined,
          });
        }
      }
    }
    if (resolved.length > 0) return resolved;
  }

  // Fallback: old JSON speakers field
  let speakers = speakersJson;
  if (!speakers) return undefined;
  if (!Array.isArray(speakers) && typeof speakers === 'object') {
    const keys = Object.keys(speakers);
    if (keys.length === 1 && Array.isArray(speakers[keys[0]])) {
      speakers = speakers[keys[0]];
    }
  }
  if (!Array.isArray(speakers)) return undefined;

  return speakers.map((s: any) => {
    let imageUrl: string | undefined;
    const imgField = s.image || s.imageUrl || s.photo;
    if (imgField) {
      if (typeof imgField === 'string' && imgField.length > 0) {
        imageUrl = imgField.startsWith('//') ? `https:${imgField}` : imgField;
      } else {
        const resolved = extractAssetUrl(imgField, includes);
        if (resolved) imageUrl = resolved;
      }
    }
    return {
      name: s.name || '',
      title: s.title || s.role || '',
      bio: s.bio || s.description || undefined,
      image: imageUrl || undefined,
    };
  });
}

/**
 * Fetch all eBooks from Contentful
 * @returns Array of eBooks
 */
export async function getAllEbooks(): Promise<Ebook[]> {
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
  coverImage: fields.coverImage ? extractAssetUrl(fields.coverImage, response.includes) : undefined,
  topics: fields.topics || undefined,
  conclusion: fields.conclusion || undefined,
  hubspotFormId: fields.hubspotFormId || '3e8efa89-ed65-4c01-9a0f-8d1c84cf5a7b',
  heroLabel: fields.heroLabel || undefined,
  formTitle: fields.formTitle || undefined,
  formSubtitle: fields.formSubtitle || undefined,
  createdAt: entry.sys.createdAt,
  updatedAt: entry.sys.updatedAt,
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
}

/**
 * Fetch a single eBook by slug
 * @param slug - The eBook slug
 * @returns eBook or null if not found
 */
export async function getEbookBySlug(slug: string): Promise<Ebook | null> {
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
  
  let pdfUrl = '';
  const pdfAsset = fields.eBookURL || fields.ebookURL || fields.eBookUrl || fields.ebookUrl || fields.pdfUrl || fields.pdfURL;

  if (pdfAsset) {
  if (typeof pdfAsset === 'string') {
  pdfUrl = pdfAsset;
  } else {
  pdfUrl = extractAssetUrl(pdfAsset, response.includes);

  if (!pdfUrl && pdfAsset.sys?.id && response.includes?.Asset) {
    const resolvedAsset = response.includes.Asset.find((a: any) => a.sys.id === pdfAsset.sys.id);
    if (resolvedAsset) {
      pdfUrl = extractAssetUrl(resolvedAsset);
    }
  }
  }
  }

  let description: any = '';
  if (fields.eBookDescription) {
  if (typeof fields.eBookDescription === 'string') {
  description = fields.eBookDescription;
  } else if (fields.eBookDescription.nodeType === 'document') {
  description = fields.eBookDescription;
  }
  }

  let ogImageUrl = '';
  if (fields.ogImage) {
  ogImageUrl = extractAssetUrl(fields.ogImage, response.includes);
  }
  
  return {
  id: entry.sys.id,
  title: fields.eBookTitle || '',
  slug: fields.slug || '',
  description: description,
  pdfUrl: pdfUrl,
  coverImage: fields.coverImage ? extractAssetUrl(fields.coverImage, response.includes) : undefined,
  topics: fields.topics || undefined,
  conclusion: fields.conclusion || undefined,
  hubspotFormId: fields.hubspotFormId || '3e8efa89-ed65-4c01-9a0f-8d1c84cf5a7b',
  heroLabel: fields.heroLabel || undefined,
  formTitle: fields.formTitle || undefined,
  formSubtitle: fields.formSubtitle || undefined,
  createdAt: entry.sys.createdAt,
  updatedAt: entry.sys.updatedAt,
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
}

/**
 * =============================================
 * WHITEPAPER API FUNCTIONS
 * =============================================
 */

export async function getAllWhitepapers(): Promise<Whitepaper[]> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'whitepaper',
    order: ['-sys.createdAt'],
    include: 2,
  }) as any;

  return response.items.map((entry: any) => {
    const fields = entry.fields || {};

    let pdfUrl = '';
    if (fields.pdfUrl) {
      if (typeof fields.pdfUrl === 'string') {
        pdfUrl = fields.pdfUrl;
      } else {
        pdfUrl = extractAssetUrl(fields.pdfUrl, response.includes);
        if (!pdfUrl && fields.pdfUrl.sys?.id && response.includes?.Asset) {
          const resolved = response.includes.Asset.find((a: any) => a.sys.id === fields.pdfUrl.sys.id);
          if (resolved) pdfUrl = extractAssetUrl(resolved);
        }
      }
    }

    let description: any = '';
    if (fields.description) {
      if (typeof fields.description === 'string') {
        description = fields.description;
      } else if (fields.description.nodeType === 'document') {
        description = fields.description;
      }
    }

    return {
      id: entry.sys.id,
      title: fields.title || 'Untitled Whitepaper',
      slug: fields.slug || generateSlugFromTitle(fields.title || ''),
      description,
      pdfUrl,
      coverImage: fields.coverImage ? extractAssetUrl(fields.coverImage, response.includes) : undefined,
      hubspotFormId: fields.hubspotFormId || '',
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
      seoTitle: fields.seoTitle || '',
      seoDescription: fields.seoDescription || '',
      ogImage: fields.ogImage ? extractAssetUrl(fields.ogImage, response.includes) : '',
    } as Whitepaper;
  });
  } catch (error) {
  console.error('Error fetching whitepapers:', error);
  if (error instanceof Error && error.message.includes('unknownContentType')) {
    console.warn('[Contentful] Whitepaper content type not found.');
    return [];
  }
  return [];
  }
}

export async function getWhitepaperBySlug(slug: string): Promise<Whitepaper | null> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'whitepaper',
    'fields.slug': slug,
    limit: 1,
    include: 2,
  }) as any;

  if (response.items.length === 0) return null;

  const entry = response.items[0];
  const fields = entry.fields || {};

  let pdfUrl = '';
  const pdfAsset = fields.pdfUrl || fields.pdfURL;
  if (pdfAsset) {
    if (typeof pdfAsset === 'string') {
      pdfUrl = pdfAsset;
    } else {
      pdfUrl = extractAssetUrl(pdfAsset, response.includes);
      if (!pdfUrl && pdfAsset.sys?.id && response.includes?.Asset) {
        const resolved = response.includes.Asset.find((a: any) => a.sys.id === pdfAsset.sys.id);
        if (resolved) pdfUrl = extractAssetUrl(resolved);
      }
    }
  }

  let description: any = '';
  if (fields.description) {
    if (typeof fields.description === 'string') {
      description = fields.description;
    } else if (fields.description.nodeType === 'document') {
      description = fields.description;
    }
  }

  return {
    id: entry.sys.id,
    title: fields.title || '',
    slug: fields.slug || '',
    description,
    pdfUrl,
    coverImage: fields.coverImage ? extractAssetUrl(fields.coverImage, response.includes) : undefined,
    hubspotFormId: fields.hubspotFormId || '',
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
    seoTitle: fields.seoTitle || '',
    seoDescription: fields.seoDescription || '',
    ogImage: fields.ogImage ? extractAssetUrl(fields.ogImage, response.includes) : '',
  } as Whitepaper;
  } catch (error) {
  console.error(`Error fetching whitepaper with slug "${slug}":`, error);
  if (error instanceof Error && error.message.includes('unknownContentType')) {
    console.warn('[Contentful] Whitepaper content type not found.');
    return null;
  }
  return null;
  }
}

/**
 * =============================================
 * DATASHEET API FUNCTIONS
 * =============================================
 */

export async function getAllDatasheets(): Promise<Datasheet[]> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'dataSheet',
    order: ['-sys.createdAt'],
    include: 2,
  }) as any;

  return response.items.map((entry: any) => {
    const fields = entry.fields || {};

    let pdfUrl = '';
    if (fields.pdfUrl) {
      if (typeof fields.pdfUrl === 'string') {
        pdfUrl = fields.pdfUrl;
      } else {
        pdfUrl = extractAssetUrl(fields.pdfUrl, response.includes);
        if (!pdfUrl && fields.pdfUrl.sys?.id && response.includes?.Asset) {
          const resolved = response.includes.Asset.find((a: any) => a.sys.id === fields.pdfUrl.sys.id);
          if (resolved) pdfUrl = extractAssetUrl(resolved);
        }
      }
    }

    let description: any = '';
    if (fields.description) {
      if (typeof fields.description === 'string') {
        description = fields.description;
      } else if (fields.description.nodeType === 'document') {
        description = fields.description;
      }
    }

    return {
      id: entry.sys.id,
      title: fields.title || 'Untitled Data Sheet',
      slug: fields.slug || generateSlugFromTitle(fields.title || ''),
      description,
      pdfUrl,
      coverImage: fields.coverImage ? extractAssetUrl(fields.coverImage, response.includes) : undefined,
      hubspotFormId: fields.hubspotFormId || '',
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
      seoTitle: fields.seoTitle || '',
      seoDescription: fields.seoDescription || '',
      ogImage: fields.ogImage ? extractAssetUrl(fields.ogImage, response.includes) : '',
    } as Datasheet;
  });
  } catch (error) {
  console.error('Error fetching datasheets:', error);
  if (error instanceof Error && error.message.includes('unknownContentType')) {
    console.warn('[Contentful] dataSheet content type not found. Please create a "dataSheet" content type in Contentful.');
    return [];
  }
  return [];
  }
}

export async function getDatasheetBySlug(slug: string): Promise<Datasheet | null> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'dataSheet',
    'fields.slug': slug,
    limit: 1,
    include: 2,
  }) as any;

  if (response.items.length === 0) return null;

  const entry = response.items[0];
  const fields = entry.fields || {};

  let pdfUrl = '';
  const pdfAsset = fields.pdfUrl || fields.pdfURL;
  if (pdfAsset) {
    if (typeof pdfAsset === 'string') {
      pdfUrl = pdfAsset;
    } else {
      pdfUrl = extractAssetUrl(pdfAsset, response.includes);
      if (!pdfUrl && pdfAsset.sys?.id && response.includes?.Asset) {
        const resolved = response.includes.Asset.find((a: any) => a.sys.id === pdfAsset.sys.id);
        if (resolved) pdfUrl = extractAssetUrl(resolved);
      }
    }
  }

  let description: any = '';
  if (fields.description) {
    if (typeof fields.description === 'string') {
      description = fields.description;
    } else if (fields.description.nodeType === 'document') {
      description = fields.description;
    }
  }

  return {
    id: entry.sys.id,
    title: fields.title || '',
    slug: fields.slug || '',
    description,
    pdfUrl,
    coverImage: fields.coverImage ? extractAssetUrl(fields.coverImage, response.includes) : undefined,
    hubspotFormId: fields.hubspotFormId || '',
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
    seoTitle: fields.seoTitle || '',
    seoDescription: fields.seoDescription || '',
    ogImage: fields.ogImage ? extractAssetUrl(fields.ogImage, response.includes) : '',
  } as Datasheet;
  } catch (error) {
  console.error(`Error fetching datasheet with slug "${slug}":`, error);
  if (error instanceof Error && error.message.includes('unknownContentType')) {
    console.warn('[Contentful] dataSheet content type not found.');
    return null;
  }
  return null;
  }
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
}

/**
 * Fetch a single industry by slug
 * @param slug - The industry slug
 * @returns Industry or null if not found
 */
export async function getIndustryBySlug(slug: string): Promise<Industry | null> {
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
  try {
  const response = await contentfulClient.getEntries({
    content_type: '1u9d2q1RLTX2B0YogpSiRj',
    order: ['-fields.featured', 'fields.title'],
    include: 2,
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
}

/**
 * Fetch use case by slug
 * @param slug - The use case slug
 * @returns Use case detail or null if not found
 */
export async function getUseCaseBySlug(slug: string): Promise<UseCase | null> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: '1u9d2q1RLTX2B0YogpSiRj',
    'fields.slug': slug,
    limit: 1,
    include: 2,
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
    heroCtaPrimaryText: fields.heroCtaPrimaryText || undefined,
    heroCtaPrimaryUrl: fields.heroCtaPrimaryUrl || undefined,
    heroCtaSecondaryText: fields.heroCtaSecondaryText || undefined,
    heroCtaSecondaryUrl: fields.heroCtaSecondaryUrl || undefined,
    heroBulletPoints: fields.heroBulletPoints || undefined,
    
    content: fields.content || undefined,
    
    statsSectionBadge: fields.statsSectionBadge || undefined,
    statsSectionTitle: fields.statsSectionTitle || undefined,
    stats: fields.stats || [],
    benefits: fields.benefits || '',
    
    featuresSectionTitle: fields.featuresSectionTitle || undefined,
    featuresDescription: fields.featuresDescription || undefined,
    features: (fields.features || []).map((feature: any) => ({
      title: feature.title || '',
      description: feature.description || '',
      icon: feature.icon || undefined,
      iconImage: feature.iconImage ? extractAssetUrl(feature.iconImage, response.includes) : undefined,
      image: feature.image ? extractAssetUrl(feature.image, response.includes) : undefined,
    })),
    
    ctaBannerTitle: fields.ctaBannerTitle || undefined,
    ctaBannerButtonText: fields.ctaBannerButtonText || undefined,
    ctaBannerButtonUrl: fields.ctaBannerButtonUrl || undefined,
    
    howItWorksSectionTitle: fields.howItWorksSectionTitle || undefined,
    howItWorks: fields.howItWorks || [],
    
    capabilitiesSectionTitle: fields.capabilitiesSectionTitle || undefined,
    capabilities: (fields.capabilities || []).map((cap: any) => ({
      title: cap.title || '',
      description: cap.description || '',
      icon: cap.icon || '',
      iconImage: cap.iconImage ? extractAssetUrl(cap.iconImage, response.includes) : undefined,
    })),
    
    clientLogosSectionTitle: fields.clientLogosSectionTitle || undefined,
    clientLogos: fields.clientLogos || undefined,
    
    integrations: fields.integrations || [],
    
    caseStudy: fields.caseStudy ? {
      quote: fields.caseStudy.quote || '',
      author: fields.caseStudy.author || '',
      company: fields.caseStudy.company || '',
      link: fields.caseStudy.link || '#',
    } : undefined,
    
    faqsSectionTitle: fields.faqsSectionTitle || undefined,
    faqs: fields.faqs || [],
    
    contactFormTitle: fields.contactFormTitle || undefined,
    contactFormSubtitle: fields.contactFormSubtitle || undefined,
    contactFormBenefits: fields.contactFormBenefits || undefined,
    hubspotFormId: fields.hubspotFormId || undefined,
    
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
}

// ─── Author API Functions ───

/**
 * Helper to extract author data from a Contentful entry
 */
function mapAuthorEntry(entry: any): BlogAuthor {
  const fields = entry.fields || {};
  const avatarField = fields.avatar as any;
  const avatarUrl = avatarField?.fields?.file?.url;
  const featuredImageField = fields.featuredImage as any;
  const featuredImageUrl = featuredImageField?.fields?.file?.url;

  return {
    id: entry.sys.id,
    name: fields.name || '',
    slug: fields.slug || '',
    role: fields.role || undefined,
    jobTitle: fields.jobTitle || undefined,
    bio: fields.bio || undefined,
    longBio: fields.longBio || undefined,
    avatar: avatarUrl
      ? (avatarUrl.startsWith('//') ? `https:${avatarUrl}` : avatarUrl)
      : undefined,
    featuredImage: featuredImageUrl
      ? (featuredImageUrl.startsWith('//') ? `https:${featuredImageUrl}` : featuredImageUrl)
      : undefined,
    socialLinkedin: fields.socialLinkedin || undefined,
    socialTwitter: fields.socialTwitter || undefined,
    socialWebsite: fields.socialWebsite || undefined,
  };
}

/**
 * Fetch all blog authors from Contentful
 * @returns Array of blog authors
 */
export async function getAllAuthors(): Promise<BlogAuthor[]> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'blogAuthor',
    order: ['fields.name'],
    include: 2,
  }) as any;

  return response.items.map(mapAuthorEntry);
  } catch (error) {
  console.error('Error fetching authors:', error);
  if (error instanceof Error && error.message.includes('unknownContentType')) {
    console.warn('[Contentful] blogAuthor content type not found.');
    return [];
  }
  return [];
  }
}

/**
 * Fetch a single author by slug
 * @param slug - The author slug
 * @returns Author or null if not found
 */
export async function getAuthorBySlug(slug: string): Promise<BlogAuthor | null> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'blogAuthor',
    'fields.slug': slug,
    limit: 1,
    include: 2,
  }) as any;

  if (response.items.length === 0) return null;
  return mapAuthorEntry(response.items[0]);
  } catch (error) {
  console.error(`Error fetching author with slug "${slug}":`, error);
  return null;
  }
}

/**
 * Fetch all blog posts by a specific author ID
 * @param authorId - The Contentful entry ID of the author
 * @returns Array of blog posts by that author
 */
export async function getBlogPostsByAuthor(authorId: string): Promise<BlogPost[]> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'blog',
    'fields.author.sys.id': authorId,
    order: ['-sys.createdAt'],
    include: 10,
  }) as any;

  return response.items.map((entry: any) => {
    const fields = entry.fields || {};
    const category = fields.category as Entry<BlogCategorySkeleton> | undefined;
    const author = fields.author as Entry<BlogAuthorSkeleton> | undefined;

    // Extract content
    let content: any = null;
    let excerpt = '';

    if (fields.description) {
      if (typeof fields.description === 'object' && fields.description.nodeType === 'document') {
        content = fields.description;
        excerpt = ensureStringExcerpt(fields.excerpt || fields.summary || '');
      } else if (typeof fields.description === 'string') {
        excerpt = ensureStringExcerpt(fields.description);
        content = fields.content || fields.body || fields.richText;
      }
    }

    if (!content) {
      content = fields.content || fields.body || fields.richText || fields.postContent;
    }

    // Extract featured image URL
    let featuredImageUrl = '';
    if (fields.featuredImage) {
      const featuredImage = fields.featuredImage as any;
      if (featuredImage.fields?.file?.url) {
        const url = featuredImage.fields.file.url;
        featuredImageUrl = url.startsWith('//') ? `https:${url}` : url;
      }
    }

    // Extract category info
    let categoryData: BlogCategory | undefined;
    if (category) {
      categoryData = {
        id: category.sys.id,
        name: (category.fields.name as unknown as string) || '',
        slug: (category.fields.slug as unknown as string) || '',
      };
    }

    // Extract author info
    let authorData: any = undefined;
    if (author) {
      const avatarField = (author.fields as any).avatar as any;
      const avatarUrl = avatarField?.fields?.file?.url;
      authorData = {
        id: author.sys.id,
        name: author.fields.name || '',
        slug: (author.fields as any).slug || '',
        role: author.fields.role,
        jobTitle: (author.fields as any).jobTitle,
        bio: author.fields.bio,
        avatar: avatarUrl
          ? (avatarUrl.startsWith('//') ? `https:${avatarUrl}` : avatarUrl)
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
      publishedAt: fields.publishedAt || entry.sys.createdAt,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    } as BlogPost;
  });
  } catch (error) {
  console.error(`Error fetching posts for author ${authorId}:`, error);
  return [];
  }
}

// ─── Video Page API Functions ───

import type { VideoPageContent } from '@/types/contentful';

/**
 * Fetch video page content from Contentful
 */
export async function getVideoPageContent(): Promise<VideoPageContent | null> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'videoPage',
    limit: 1,
  }) as any;

  if (response.items.length === 0) return null;

  const entry = response.items[0];
  const fields = entry.fields || {};

  return {
    id: entry.sys.id,
    pageTitle: fields.pageTitle || 'Videos',
    pageSubtitle: fields.pageSubtitle || undefined,
    featuredVideoUrl: fields.featuredVideoUrl || undefined,
    featuredVideoTitle: fields.featuredVideoTitle || undefined,
    featuredVideoDescription: fields.featuredVideoDescription || undefined,
    socialFacebook: fields.socialFacebook || undefined,
    socialTwitter: fields.socialTwitter || undefined,
    socialLinkedin: fields.socialLinkedin || undefined,
    playlists: fields.playlists || [],
  } as VideoPageContent;
  } catch (error) {
  console.error('Error fetching video page content:', error);
  return null;
  }
}

/**
 * =============================================
 * WEBINAR FUNCTIONS
 * =============================================
 */

export async function getAllWebinars(): Promise<Webinar[]> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'webinar',
    order: ['-fields.webinarDate'],
    limit: 100,
  }) as any;

  return response.items.map((entry: any) => {
    const fields = entry.fields || {};
    const featuredImage = fields.featuredImage
      ? extractAssetUrl(fields.featuredImage, response.includes)
      : undefined;

    const speakers = parseSpeakers(fields.speakerRefs, fields.speakers, response.includes);

    return {
      id: entry.sys.id,
      title: fields.title || '',
      slug: fields.slug || '',
      subtitle: fields.subtitle || undefined,
      description: fields.description || undefined,
      featuredImage,
      category: fields.category || undefined,
      webinarDate: fields.webinarDate || '',
      timezone: fields.timezone || undefined,
      isCompleted: fields.isCompleted ?? false,
      hubspotFormId: fields.hubspotFormId || undefined,
      keyTakeaways: fields.keyTakeaways || undefined,
      bulletPoints: fields.bulletPoints || undefined,
      recordingUrl: fields.recordingUrl || undefined,
      recordingSummary: fields.recordingSummary || undefined,
      speakers,
      badges: fields.badges || undefined,
      seoTitle: fields.seoTitle || undefined,
      seoDescription: fields.seoDescription || undefined,
    } as Webinar;
  });
  } catch (error) {
  console.error('Error fetching webinars:', error);
  return [];
  }
}

export async function getWebinarBySlug(slug: string): Promise<Webinar | null> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'webinar',
    'fields.slug': slug,
    limit: 1,
  }) as any;

  if (response.items.length === 0) return null;

  const entry = response.items[0];
  const fields = entry.fields || {};
  const featuredImage = fields.featuredImage
    ? extractAssetUrl(fields.featuredImage, response.includes)
    : undefined;

  const speakers = parseSpeakers(fields.speakerRefs, fields.speakers, response.includes);

  return {
    id: entry.sys.id,
    title: fields.title || '',
    slug: fields.slug || '',
    subtitle: fields.subtitle || undefined,
    description: fields.description || undefined,
    featuredImage,
    category: fields.category || undefined,
    webinarDate: fields.webinarDate || '',
    timezone: fields.timezone || undefined,
    isCompleted: fields.isCompleted ?? false,
    hubspotFormId: fields.hubspotFormId || undefined,
    keyTakeaways: fields.keyTakeaways || undefined,
    aboutWebinar: fields.aboutWebinar || undefined,
    bulletPoints: fields.bulletPoints || undefined,
    recordingUrl: fields.recordingUrl || undefined,
    recordingSummary: fields.recordingSummary || undefined,
    speakers,
    badges: fields.badges || undefined,
    seoTitle: fields.seoTitle || undefined,
    seoDescription: fields.seoDescription || undefined,
  } as Webinar;
  } catch (error) {
  console.error('Error fetching webinar by slug:', error);
  return null;
  }
}

/**
 * =============================================
 * ABOUT US PAGE API FUNCTIONS
 * =============================================
 */

export async function getAboutUsPageContent(): Promise<AboutUsPageContent | null> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'aboutUsPage',
    limit: 1,
    include: 3,
  }) as any;

  if (response.items.length === 0) return null;

  const entry = response.items[0];
  const fields = entry.fields || {};

  // Parse hero images
  const heroImages: string[] = [];
  if (fields.heroImages && Array.isArray(fields.heroImages)) {
    for (const img of fields.heroImages) {
      const url = extractAssetUrl(img, response.includes);
      if (url) heroImages.push(url);
    }
  }

  // Parse story images
  const storyImages: string[] = [];
  if (fields.storyImages && Array.isArray(fields.storyImages)) {
    for (const img of fields.storyImages) {
      const url = extractAssetUrl(img, response.includes);
      if (url) storyImages.push(url);
    }
  }

  // Parse stats (linked entries)
  const stats: AboutUsStat[] = [];
  if (fields.stats && Array.isArray(fields.stats)) {
    for (const ref of fields.stats) {
      const f = ref.fields;
      if (f) {
        stats.push({
          id: ref.sys.id,
          label: f.label || '',
          value: f.value || 0,
          suffix: f.suffix || '',
          unit: f.unit || '',
          order: f.order || 0,
        });
      }
    }
    stats.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  // Parse awards (linked entries)
  const awards: AboutUsAward[] = [];
  if (fields.awards && Array.isArray(fields.awards)) {
    for (const ref of fields.awards) {
      const f = ref.fields;
      if (f) {
        awards.push({
          id: ref.sys.id,
          title: f.title || '',
          image: f.image ? extractAssetUrl(f.image, response.includes) : undefined,
          accentColor: f.accentColor || '#005CCC',
          order: f.order || 0,
        });
      }
    }
    awards.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  // Parse team members (linked entries)
  const teamMembers: TeamMember[] = [];
  if (fields.teamMembers && Array.isArray(fields.teamMembers)) {
    for (const ref of fields.teamMembers) {
      const f = ref.fields;
      if (f) {
        teamMembers.push({
          id: ref.sys.id,
          name: f.name || '',
          title: f.title || '',
          bio: f.bio || undefined,
          photo: f.photo ? extractAssetUrl(f.photo, response.includes) : undefined,
          linkedin: f.linkedin || undefined,
          order: f.order || 0,
        });
      }
    }
    teamMembers.sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  return {
    id: entry.sys.id,
    pageTitle: fields.pageTitle || 'About Us',
    heroBadge: fields.heroBadge || undefined,
    heroHeading: fields.heroHeading || undefined,
    heroDescription: fields.heroDescription || undefined,
    heroImages,
    stats,
    visionTitle: fields.visionTitle || undefined,
    visionDescription: fields.visionDescription || undefined,
    storyTitle: fields.storyTitle || undefined,
    storyContent: fields.storyContent && fields.storyContent.nodeType === 'document'
      ? fields.storyContent
      : undefined,
    storyImages,
    awardsTitle: fields.awardsTitle || undefined,
    awardsSubtitle: fields.awardsSubtitle || undefined,
    awards,
    teamTitle: fields.teamTitle || undefined,
    teamSubtitle: fields.teamSubtitle || undefined,
    teamMembers,
    seoTitle: fields.seoTitle || undefined,
    seoDescription: fields.seoDescription || undefined,
  } as AboutUsPageContent;
  } catch (error) {
  console.error('Error fetching About Us page content:', error);
  return null;
  }
}

/**
 * =============================================
 * NEWS & EVENTS API FUNCTIONS
 * =============================================
 */

export async function getAllNewsPosts(): Promise<NewsPost[]> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'newsPost',
    order: ['-fields.publishedDate'],
    include: 2,
  }) as any;

  return response.items.map((entry: any) => {
    const fields = entry.fields || {};
    return {
      id: entry.sys.id,
      title: fields.title || 'Untitled',
      slug: fields.slug || '',
      excerpt: fields.excerpt || undefined,
      content: fields.content && fields.content.nodeType === 'document' ? fields.content : undefined,
      featuredImage: fields.featuredImage ? extractAssetUrl(fields.featuredImage, response.includes) : undefined,
      category: fields.category || undefined,
      publishedDate: fields.publishedDate || entry.sys.createdAt,
      isFeatured: fields.isFeatured ?? false,
      externalUrl: fields.externalUrl || undefined,
      seoTitle: fields.seoTitle || undefined,
      seoDescription: fields.seoDescription || undefined,
      createdAt: entry.sys.createdAt,
      updatedAt: entry.sys.updatedAt,
    } as NewsPost;
  });
  } catch (error) {
  console.error('Error fetching news posts:', error);
  if (error instanceof Error && error.message.includes('unknownContentType')) {
    console.warn('[Contentful] newsPost content type not found.');
    return [];
  }
  return [];
  }
}

export async function getNewsPostBySlug(slug: string): Promise<NewsPost | null> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'newsPost',
    'fields.slug': slug,
    limit: 1,
    include: 2,
  }) as any;

  if (response.items.length === 0) return null;

  const entry = response.items[0];
  const fields = entry.fields || {};

  return {
    id: entry.sys.id,
    title: fields.title || '',
    slug: fields.slug || '',
    excerpt: fields.excerpt || undefined,
    content: fields.content && fields.content.nodeType === 'document' ? fields.content : undefined,
    featuredImage: fields.featuredImage ? extractAssetUrl(fields.featuredImage, response.includes) : undefined,
    category: fields.category || undefined,
    publishedDate: fields.publishedDate || entry.sys.createdAt,
    isFeatured: fields.isFeatured ?? false,
    externalUrl: fields.externalUrl || undefined,
    seoTitle: fields.seoTitle || undefined,
    seoDescription: fields.seoDescription || undefined,
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
  } as NewsPost;
  } catch (error) {
  console.error(`Error fetching news post with slug "${slug}":`, error);
  return null;
  }
}

export async function getAllNewsEvents(): Promise<NewsEvent[]> {
  try {
  const response = await contentfulClient.getEntries({
    content_type: 'newsEvent',
    order: ['fields.order'],
    include: 2,
  }) as any;

  return response.items.map((entry: any) => {
    const fields = entry.fields || {};
    return {
      id: entry.sys.id,
      title: fields.title || '',
      subtitle: fields.subtitle || undefined,
      image: fields.image ? extractAssetUrl(fields.image, response.includes) : undefined,
      eventDate: fields.eventDate || undefined,
      location: fields.location || undefined,
      externalUrl: fields.externalUrl || undefined,
      order: fields.order || 0,
    } as NewsEvent;
  });
  } catch (error) {
  console.error('Error fetching news events:', error);
  return [];
  }
}