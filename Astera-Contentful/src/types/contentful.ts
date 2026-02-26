import type { Entry, EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types';


/**
 * Feature Tab interface (for home page tabs)
 */
export interface FeatureTab {
  tabName: string;
  title: string;
  description: string;
  features: string[];
  image: string;
  learnMoreUrl: string;
}

/**
 * Metric interface (for home page metrics)
 */
export interface HomeMetric {
  id: string;
  value: number;
  unit: string;
  title: string;
  description: string;
}

/**
 * Product Offering interface (for home page)
 */
export interface ProductOffering {
  title: string;
  description: string;
  learnMoreUrl: string;
}

/**
 * Resource interface (for home page)
 */
export interface Resource {
  type: 'WEBINAR' | 'EBOOK' | 'BLOG' | 'WHITEPAPER';
  title: string;
  image?: string;
  linkUrl: string;
}

/**
 * Final CTA Card interface (for home page)
 */
export interface FinalCtaCard {
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
}

/**
 * Trust Badge interface (for product page hero)
 */
export interface TrustBadge {
  text: string;
  iconSvg: string;
}

/**
 * Why Astera Card interface (for product page)
 */
export interface WhyAsteraCard {
  id: number;
  text: string;
  iconImage: string;
  linkText?: string;
  linkUrl?: string;
}

/**
 * Metric interface (for product page counters)
 */
export interface Metric {
  id: string;
  value: number;
  unit: string;
  title: string;
}

/**
 * Powerful Feature interface (for product page accordion)
 */
export interface PowerfulFeature {
  id: string;
  title: string;
  description: string;
  subDescription: string;
  bulletPoints: { label: string; text: string }[];
  footer: string;
  linkText: string;
  linkUrl: string;
  image: string;
}

/**
 * Testimonial interface (for product page)
 */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  company: string;
  image: string;
  caseStudyUrl: string;
}

/**
 * Use Case interface (for product page carousel)
 */
export interface ProductUseCase {
  id: number;
  title: string;
  description: string;
  image: string;
  linkUrl: string;
}

/**
 * FAQ interface (for product page)
 */
export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

/**
 * Contact Form Benefit interface (for product page)
 */
export interface ContactFormBenefit {
  id: string;
  text: string;
  highlightedText: string;
}

/**
 * Resource Card interface (for explore resources section)
 */
export interface ResourceCard {
  id: string;
  type: string; // 'BLOG' | 'EBOOK' | 'WEBINAR' | 'WHITEPAPER'
  title: string;
  description: string;
  image: string;
  linkUrl: string;
  linkText?: string;
}

/**
 * Award interface (for awards section)
 */
export interface Award {
  image: string;
  alt: string;
}

/**
 * Contentful Home Page Content Type Skeleton
 */
export interface HomePageContentSkeleton extends EntrySkeletonType {
  contentTypeId: 'homePage';
  fields: {
    entryTitle: string;
    slug: string;
    
    // Hero Section
    heroSectionBadge: string;
    heroSectionHeading: Document;
    heroSectionDescription: string;
    heroSectionPrimaryCta: string;
    heroSectionPrimaryCtaUrl?: string;
    heroSectionSecondaryCta: string;
    heroSectionSecondaryCtaUrl?: string;
    
    // AI Stack Section
    aiStackSectionTitle: string;
    aiStackSectionDescription: string;
    aiStackVideoUrl: string;
    
    // Feature Tabs Section
    featureTabsSectionTitle: string;
    featureTabs: FeatureTab[];
    
    // Metrics Section
    metricsSectionTitle: string;
    metrics: HomeMetric[];
    
    // Product Offerings Section
    productOfferingsSectionTitle: string;
    productOfferings: ProductOffering[];
    
    // Awards Section
    awardsSectionTitle: string;
    awards?: Award[];
    
    // Resources Section
    resourcesSectionTitle: string;
    resources: Resource[];
    
    // Final CTA Section
    finalCtaSectionTitle: string;
    finalCtaSectionDescription: string;
    finalCtaCards: FinalCtaCard[];
  };
}

export type HomePageContentEntry = Entry<HomePageContentSkeleton, undefined, string>;

/**
 * Parsed/simplified version for home page components
 */
export interface HomePageContent {
  id: string;
  entryTitle: string;
  slug: string;
  
  // Hero Section
  heroSectionBadge: string;
  heroSectionHeading: Document;
  heroSectionDescription: string;
  heroSectionPrimaryCta: string;
  heroSectionPrimaryCtaUrl: string;
  heroSectionSecondaryCta: string;
  heroSectionSecondaryCtaUrl: string;
  
  // AI Stack Section
  aiStackSectionTitle: string;
  aiStackSectionDescription: string;
  aiStackVideoUrl: string;
  
  // Feature Tabs Section
  featureTabsSectionTitle: string;
  featureTabs: FeatureTab[];
  
  // Metrics Section
  metricsSectionTitle: string;
  metrics: HomeMetric[];
  
  // Product Offerings Section
  productOfferingsSectionTitle: string;
  productOfferings: ProductOffering[];
  
  // Awards Section
  awardsSectionTitle: string;
  awards: Award[];
  
  // Resources Section
  resourcesSectionTitle: string;
  resources: Resource[];
  
  // Final CTA Section
  finalCtaSectionTitle: string;
  finalCtaSectionDescription: string;
  finalCtaCards: FinalCtaCard[];
  
  createdAt: string;
  updatedAt: string;
}

/**
 * Product Page Summary (for listing/dropdown)
 */
export interface ProductPageSummary {
  id: string;
  productName: string;
  slug: string;
}

/**
 * Contentful Product Page Content Type Skeleton
 */
export interface ProductPageContentSkeleton extends EntrySkeletonType {
  contentTypeId: 'productPage';
  fields: {
    entryTitle: string;
    productName: string;
    slug: string;
    
    // Hero Section
    heroSectionBadge: string;
    heroSectionHeading: Document;
    heroSectionDescription: string;
    heroSectionPrimaryCta: string;
    heroSectionPrimaryCtaUrl?: string;
    heroSectionSecondaryCta: string;
    heroSectionSecondaryCtaUrl?: string;
    heroSectionVideoUrl: string;
    heroSectionTrustBadges: TrustBadge[];
    heroImage?: any; // Asset reference
    
    // Why This Product Section
    whyThisProductSectionTitle: Document;
    whyThisProductSectionDescription: string;
    whyThisProductSectionCards: WhyAsteraCard[];
    
    // Metrics Section
    metrics: Metric[];
    
    // Powerful Features Section
    powerfulFeaturesSectionTitle: string;
    powerfulFeatures: PowerfulFeature[];
    
    // Testimonials Section
    testimonialsSectionTitle: Document;
    testimonials: Testimonial[];
    
    // Use Cases Section
    useCasesSectionTitle: Document;
    useCasesSectionDescription: string;
    useCases: ProductUseCase[];
    
    // FAQ Section
    faqSectionBadge: string;
    faqSectionTitle: Document;
    faqSectionDescription: string;
    faqs: FAQ[];
    
    // Explore Resources Section
    resourcesSectionTitle?: string;
    resourcesSectionBadge?: string;
    resourcesSectionDescription?: string;
    resources?: ResourceCard[];
    
    // Contact Form Section
    contactFormSectionTitle: Document;
    contactFormSectionSubtitle: string;
    contactFormSectionDescription: string;
    contactFormSectionWhyTitle: string;
    contactFormSectionBenefits: ContactFormBenefit[];
    contactFormSectionFooterText: string;
    hubspotFormId?: string;
    
    // CTA Section
    ctaSectionTitle: string;
    ctaSectionDescription: string;
    ctaSectionPrimaryText: string;
    ctaSectionPrimaryUrl?: string;
    ctaSectionSecondaryText: string;
    ctaSectionSecondaryUrl?: string;
  };
}

export type ProductPageContentEntry = Entry<ProductPageContentSkeleton, undefined, string>;

/**
 * Parsed/simplified version for product page components
 */
export interface ProductPageContent {
  id: string;
  entryTitle: string;
  productName: string;
  slug: string;
  
  // Hero Section
  heroSectionBadge: string;
  heroSectionHeading: Document;
  heroSectionDescription: string;
  heroSectionPrimaryCta: string;
  heroSectionPrimaryCtaUrl: string;
  heroSectionSecondaryCta: string;
  heroSectionSecondaryCtaUrl: string;
  heroSectionVideoUrl: string;
  heroSectionTrustBadges: TrustBadge[];
  heroImage: string;
  
  // Why This Product Section
  whyThisProductSectionTitle: Document;
  whyThisProductSectionDescription: string;
  whyThisProductSectionCards: WhyAsteraCard[];
  
  // Metrics Section
  metrics: Metric[];
  
  // Powerful Features Section
  powerfulFeaturesSectionTitle: string;
  powerfulFeatures: PowerfulFeature[];
  
  // Testimonials Section
  testimonialsSectionTitle: Document;
  testimonials: Testimonial[];
  
  // Use Cases Section
  useCasesSectionTitle: Document;
  useCasesSectionDescription: string;
  useCases: ProductUseCase[];
  
  // FAQ Section
  faqSectionBadge: string;
  faqSectionTitle: Document;
  faqSectionDescription: string;
  faqs: FAQ[];
  
  // Explore Resources Section
  resourcesSectionTitle?: string;
  resourcesSectionBadge?: string;
  resourcesSectionDescription?: string;
  resources?: ResourceCard[];
  
  // Contact Form Section
  contactFormSectionTitle: Document;
  contactFormSectionSubtitle: string;
  contactFormSectionDescription: string;
  contactFormSectionWhyTitle: string;
  contactFormSectionBenefits: ContactFormBenefit[];
  contactFormSectionFooterText: string;
  hubspotFormId: string;
  
  // CTA Section
  ctaSectionTitle: string;
  ctaSectionDescription: string;
  ctaSectionPrimaryText: string;
  ctaSectionPrimaryUrl: string;
  ctaSectionSecondaryText: string;
  ctaSectionSecondaryUrl: string;
  
  createdAt: string;
  updatedAt: string;
}

/**
 * =============================================
 * BLOG CONTENT TYPES
 * =============================================
 */

/**
 * Blog Category interface
 */
export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  title?: string;
}

/**
 * Blog Author interface
 */
export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  role?: string;
  jobTitle?: string;
  bio?: string;
  longBio?: string;
  avatar?: string;
  featuredImage?: string;
  socialLinkedin?: string;
  socialTwitter?: string;
  socialWebsite?: string;
}

/**
 * Blog Post interface
 */
export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  heading: string;
  items: FAQItem[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string;
  content: Document;
  featuredImage?: string;
  category: BlogCategory;
  author?: BlogAuthor;
  authorName?: string;
  tags?: string[];
  keyPoints?: string[];
  keyTakeaways?: Document; // Rich Text Document
  faQss?: FAQSection; // FAQs section from JSON field
  body?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Contentful Blog Category Skeleton
 */
export interface BlogCategorySkeleton extends EntrySkeletonType {
  contentTypeId: 'blogCategory';
  fields: {
    name: string;
    slug: string;
    description?: string;
  };
}

/**
 * Contentful Blog Author Skeleton
 */
export interface BlogAuthorSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogAuthor';
  fields: {
    name: string;
    slug: string;
    role?: string;
    jobTitle?: string;
    bio?: string;
    longBio?: string;
    avatar?: { fields: { file: { url: string } } };
    featuredImage?: { fields: { file: { url: string } } };
    socialLinkedin?: string;
    socialTwitter?: string;
    socialWebsite?: string;
  };
}

/**
 * Blog CTA interface
 */
export interface BlogCta {
  id: string;
  title: string;
  description?: Document;
  text: string;
  link: string;
}

/**
 * Contentful Blog CTA Skeleton
 */
export interface BlogCtaSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogCta';
  fields: {
    blogCtaTitle: string;
    blogCtaDescription?: Document;
    blogCtaText: string;
    blogCtaLink: string;
  };
}

/** 
 * Contentful Blog Post Skeleton
 */
export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogPost';
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: Document;
    featuredImage?: { fields: { file: { url: string } } };
    category: Entry<BlogCategorySkeleton>;
    author?: Entry<BlogAuthorSkeleton>;
    tags?: string[];
    publishedAt: string;
  };
}

/**
 * eBook interface (for eBook pages)
 */
export interface Ebook {
  id: string;
  title: string;
  slug: string;
  description: Document | string;
  pdfUrl: string;
  coverImage?: string;
  topics?: string[];
  hubspotFormId?: string;
  heroLabel?: string;
  conclusion?: string;
  formTitle?: string;
  formSubtitle?: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  focusKeyword?: string;
  ogImage?: string;
  canonicalUrl?: string;
  metaRobots?: string;
  schemaType?: string;
}

/**
 * Contentful eBook Skeleton
 */
export interface EbookSkeleton extends EntrySkeletonType {
  contentTypeId: 'eBook';
  fields: {
    eBookTitle: string;
    slug: string;
    eBookDescription: string;
    eBookUrl: string;
    coverImage?: any;
    topics?: string[];
    conclusion?: string;
    hubspotFormId?: string;
    heroLabel?: string;
    formTitle?: string;
    formSubtitle?: string;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    focusKeyword?: string;
    ogImage?: any;
    canonicalUrl?: string;
    metaRobots?: string;
    schemaType?: string;
  };
}

/**
 * Whitepaper interface
 */
export interface Whitepaper {
  id: string;
  title: string;
  slug: string;
  description: Document | string;
  pdfUrl: string;
  coverImage?: string;
  hubspotFormId?: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

/**
 * Contentful Whitepaper Skeleton
 */
export interface WhitepaperSkeleton extends EntrySkeletonType {
  contentTypeId: 'whitepaper';
  fields: {
    title: string;
    slug: string;
    description: string;
    pdfUrl: string;
  };
}

/**
 * Datasheet interface
 */
export interface Datasheet {
  id: string;
  title: string;
  slug: string;
  description: Document | string;
  pdfUrl: string;
  coverImage?: string;
  hubspotFormId?: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

/**
 * Contentful Datasheet Skeleton
 */
export interface DatasheetSkeleton extends EntrySkeletonType {
  contentTypeId: 'dataSheet';
  fields: {
    title: string;
    slug: string;
    description: string;
    pdfUrl: string;
  };
}

/**
 * =============================================
 * INDUSTRY CONTENT TYPES
 * =============================================
 */

export interface IndustryFeature {
  id: string;
  title: string;
  description: string;
  icon: string; // Icon name (fallback) or image URL
  iconImage?: string; // PNG image URL from Contentful
}

export interface IndustryCaseStudy {
  label: string;
  title: string;
  quote: string;
  author: string;
  authorRole: string;
  company: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

/**
 * Industry interface (for Industry pages)
 */
export interface Industry {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  heroImage: string;
  ctaText: string;
  ctaLink: string;
  videoTitle?: string;
  videoUrl?: string;
  videoThumbnail?: string;
  featuresSectionTitle: string;
  features: IndustryFeature[];
  caseStudy: IndustryCaseStudy;
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  finalCtaButtonText: string;
  finalCtaButtonLink: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Contentful Industry Skeleton
 */
export interface IndustrySkeleton extends EntrySkeletonType {
  contentTypeId: '21U5b9oci2lilctbzJrh4a';
  fields: {
    industryName: string;
    slug: string;
    subtitle: string;
    heroImage: any; // AssetLink
    ctaText?: string;
    ctaLink?: string;
    videoTitle?: string;
    videoUrl?: string;
    videoThumbnail?: any; // AssetLink
    featuresSectionTitle?: string;
    features?: any; // JSON Object (array of feature objects)
    caseStudyLabel?: string;
    caseStudyTitle?: string;
    caseStudyQuote?: string;
    caseStudyAuthor?: string;
    caseStudyAuthorRole?: string;
    caseStudyCompany?: string;
    caseStudyImage?: any; // AssetLink
    caseStudyCtaText?: string;
    caseStudyCtaLink?: string;
    finalCtaTitle?: string;
    finalCtaSubtitle?: string;
    finalCtaButtonText?: string;
    finalCtaButtonLink?: string;
  };
}

/**
 * =============================================
 * USE CASE CONTENT TYPES
 * =============================================
 */

export interface UseCaseStat {
  value: string;
  label: string;
}

export interface UseCaseFeature {
  title: string;
  description: string;
  icon?: string; // Icon type for fallback
  iconImage?: string; // Icon image URL from Contentful
  image?: string; // Feature image URL from Contentful
}

export interface UseCaseHowItWorks {
  step: number;
  title: string;
  description: string;
}

export interface UseCaseCapability {
  title: string;
  description: string;
  icon: string;
  iconImage?: string;
}

export interface UseCaseClientLogo {
  name: string;
  image?: string;
}

export interface UseCaseCaseStudy {
  quote: string;
  author: string;
  company: string;
  link: string;
}

export interface UseCaseFAQ {
  question: string;
  answer: string;
}

/**
 * Use Case Content (parsed/simplified)
 */
export interface UseCase {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  heroDescription: string;
  heroImage?: string;
  heroCtaPrimaryText?: string;
  heroCtaPrimaryUrl?: string;
  heroCtaSecondaryText?: string;
  heroCtaSecondaryUrl?: string;
  heroBulletPoints?: string[];
  
  // Rich Text Content
  content?: Document | string;
  
  // Stats Section
  statsSectionBadge?: string;
  statsSectionTitle?: string;
  stats: UseCaseStat[];
  benefits: string;
  
  // Features Section
  featuresSectionTitle?: string;
  featuresDescription?: string;
  features: UseCaseFeature[];
  
  // CTA Banner
  ctaBannerTitle?: string;
  ctaBannerButtonText?: string;
  ctaBannerButtonUrl?: string;
  
  // How It Works Section
  howItWorksSectionTitle?: string;
  howItWorks: UseCaseHowItWorks[];
  
  // Capabilities Section
  capabilitiesSectionTitle?: string;
  capabilities: UseCaseCapability[];
  
  // Client Logos Section
  clientLogosSectionTitle?: string;
  clientLogos?: UseCaseClientLogo[];
  
  // Integrations
  integrations: string[];
  
  // Case Study
  caseStudy?: UseCaseCaseStudy;
  
  // FAQs Section
  faqsSectionTitle?: string;
  faqs: UseCaseFAQ[];
  
  // Contact Form Section
  contactFormTitle?: string;
  contactFormSubtitle?: string;
  contactFormBenefits?: string[];
  hubspotFormId?: string;
  
  // SEO Fields
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  ogImage?: string;
  
  createdAt: string;
  updatedAt: string;
}

/**
 * Use Case Summary (for listing)
 */
export interface UseCaseSummary {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon?: string;
  iconImage?: string; // Icon image URL from Contentful
  category?: string;
  featured?: boolean;
}

/**
 * Contentful Use Case Skeleton
 */
export interface UseCaseSkeleton extends EntrySkeletonType {
  contentTypeId: '1u9d2q1RLTX2B0YogpSiRj';
  fields: {
    title: string;
    slug: string;
    subtitle: string;
    heroDescription: string;
    heroImage?: any;
    heroCtaPrimaryText?: string;
    heroCtaPrimaryUrl?: string;
    heroCtaSecondaryText?: string;
    heroCtaSecondaryUrl?: string;
    heroBulletPoints?: string[];
    
    // Rich Text Content
    content?: Document;
    
    // Stats Section
    statsSectionBadge?: string;
    statsSectionTitle?: string;
    stats?: Array<{ value: string; label: string }>;
    benefits: string;
    
    // Features Section
    featuresSectionTitle?: string;
    featuresDescription?: string;
    features?: Array<{
      title: string;
      description: string;
      icon?: string;
      iconImage?: any;
      image?: any;
    }>;
    
    // CTA Banner
    ctaBannerTitle?: string;
    ctaBannerButtonText?: string;
    ctaBannerButtonUrl?: string;
    
    // How It Works Section
    howItWorksSectionTitle?: string;
    howItWorks?: Array<{
      step: number;
      title: string;
      description: string;
    }>;
    
    // Capabilities Section
    capabilitiesSectionTitle?: string;
    capabilities?: Array<{
      title: string;
      description: string;
      icon: string;
      iconImage?: string;
    }>;
    
    // Client Logos Section
    clientLogosSectionTitle?: string;
    clientLogos?: Array<{
      name: string;
      image?: string;
    }>;
    
    // Integrations
    integrations?: string[];
    
    // Case Study
    caseStudy?: {
      quote: string;
      author: string;
      company: string;
      link: string;
    };
    
    // FAQs Section
    faqsSectionTitle?: string;
    faqs?: Array<{ question: string; answer: string }>;
    
    // Contact Form Section
    contactFormTitle?: string;
    contactFormSubtitle?: string;
    contactFormBenefits?: string[];
    hubspotFormId?: string;
    
    // Listing fields
    description?: string;
    icon?: string;
    iconImage?: any;
    category?: string;
    featured?: boolean;
    
    // SEO Fields
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string;
    ogImage?: any;
  };
}

/**
 * =============================================
 * VIDEO PAGE CONTENT TYPES
 * =============================================
 */

export interface PlaylistVideoItem {
  videoId: string;
  title: string;
  thumbnail?: string;
}

export interface VideoPlaylist {
  title: string;
  playlistId: string;
  videos?: PlaylistVideoItem[];
}

export interface VideoPageContent {
  id: string;
  pageTitle: string;
  pageSubtitle?: string;
  featuredVideoUrl?: string;
  featuredVideoTitle?: string;
  featuredVideoDescription?: string;
  socialFacebook?: string;
  socialTwitter?: string;
  socialLinkedin?: string;
  playlists: VideoPlaylist[];
}

export interface VideoPageSkeleton extends EntrySkeletonType {
  contentTypeId: 'videoPage';
  fields: {
    pageTitle: string;
    pageSubtitle?: string;
    featuredVideoUrl?: string;
    featuredVideoTitle?: string;
    featuredVideoDescription?: string;
    socialFacebook?: string;
    socialTwitter?: string;
    socialLinkedin?: string;
    playlists?: VideoPlaylist[];
  };
}

/**
 * =============================================
 * WEBINAR CONTENT TYPES
 * =============================================
 */

export interface WebinarSpeaker {
  name: string;
  title: string;
  bio?: string;
  image?: string;
}

export interface WebinarBadge {
  name: string;
  image?: string;
}

export interface Webinar {
  id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  featuredImage?: string;
  category?: string;
  webinarDate: string;
  timezone?: string;
  isCompleted: boolean;
  hubspotFormId?: string;
  keyTakeaways?: string[];
  aboutWebinar?: any;
  bulletPoints?: string[];
  recordingUrl?: string;
  recordingSummary?: string;
  speakers?: WebinarSpeaker[];
  badges?: WebinarBadge[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface WebinarSkeleton extends EntrySkeletonType {
  contentTypeId: 'webinar';
  fields: {
    title: string;
    slug: string;
    subtitle?: string;
    description?: string;
    featuredImage?: any;
    category?: string;
    webinarDate: string;
    timezone?: string;
    isCompleted: boolean;
    hubspotFormId?: string;
    keyTakeaways?: string[];
    aboutWebinar?: any;
    bulletPoints?: string[];
    recordingUrl?: string;
    recordingSummary?: string;
    speakers?: WebinarSpeaker[];
    badges?: WebinarBadge[];
    seoTitle?: string;
    seoDescription?: string;
  };
}

/**
 * =============================================
 * ABOUT US PAGE CONTENT TYPES
 * =============================================
 */

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio?: string;
  photo?: string;
  linkedin?: string;
  order?: number;
}

export interface TeamMemberSkeleton extends EntrySkeletonType {
  contentTypeId: 'teamMember';
  fields: {
    name: string;
    title: string;
    bio?: string;
    photo?: any;
    linkedin?: string;
    order?: number;
  };
}

export interface AboutUsStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  unit?: string;
  order?: number;
}

export interface AboutUsStatSkeleton extends EntrySkeletonType {
  contentTypeId: 'aboutUsStat';
  fields: {
    label: string;
    value: number;
    suffix?: string;
    unit?: string;
    order?: number;
  };
}

export interface AboutUsAward {
  id: string;
  title: string;
  image?: string;
  accentColor?: string;
  order?: number;
}

export interface AboutUsAwardSkeleton extends EntrySkeletonType {
  contentTypeId: 'award';
  fields: {
    title: string;
    image?: any;
    accentColor?: string;
    order?: number;
  };
}

export interface AboutUsPageContent {
  id: string;
  pageTitle: string;
  heroBadge?: string;
  heroHeading?: string;
  heroDescription?: string;
  heroImages: string[];
  stats: AboutUsStat[];
  visionTitle?: string;
  visionDescription?: string;
  storyTitle?: string;
  storyContent?: Document;
  storyImages: string[];
  awardsTitle?: string;
  awardsSubtitle?: string;
  awards: AboutUsAward[];
  teamTitle?: string;
  teamSubtitle?: string;
  teamMembers: TeamMember[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface AboutUsPageSkeleton extends EntrySkeletonType {
  contentTypeId: 'aboutUsPage';
  fields: {
    pageTitle: string;
    heroBadge?: string;
    heroHeading?: string;
    heroDescription?: string;
    heroImages?: any[];
    stats?: any[];
    visionTitle?: string;
    visionDescription?: string;
    storyTitle?: string;
    storyContent?: Document;
    storyImages?: any[];
    awardsTitle?: string;
    awardsSubtitle?: string;
    awards?: any[];
    teamTitle?: string;
    teamSubtitle?: string;
    teamMembers?: any[];
    seoTitle?: string;
    seoDescription?: string;
  };
}

/**
 * =============================================
 * NEWS & EVENTS CONTENT TYPES
 * =============================================
 */

export interface NewsPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: Document;
  featuredImage?: string;
  category?: string;
  publishedDate: string;
  isFeatured?: boolean;
  externalUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'newsPost';
  fields: {
    title: string;
    slug: string;
    excerpt?: string;
    content?: Document;
    featuredImage?: any;
    category?: string;
    publishedDate: string;
    isFeatured?: boolean;
    externalUrl?: string;
    seoTitle?: string;
    seoDescription?: string;
  };
}

export interface NewsEvent {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  eventDate?: string;
  location?: string;
  externalUrl?: string;
  order?: number;
}

export interface NewsEventSkeleton extends EntrySkeletonType {
  contentTypeId: 'newsEvent';
  fields: {
    title: string;
    subtitle?: string;
    image?: any;
    eventDate?: string;
    location?: string;
    externalUrl?: string;
    order?: number;
  };
}
