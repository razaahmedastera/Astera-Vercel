import type { Entry, EntrySkeletonType } from 'contentful';
import type { Document } from '@contentful/rich-text-types';

/**
 * Contentful Page Content Type Skeleton
 */
export interface PageContentSkeleton extends EntrySkeletonType {
  contentTypeId: 'pageContent';
  fields: {
    title: string;
    slug: string;
    body: string;
    randomText: Document;
  };
}

export type PageContentEntry = Entry<PageContentSkeleton, undefined, string>;

/**
 * Parsed/simplified version for components
 */
export interface PageContent {
  title: string;
  slug: string;
  body: string;
  randomText: Document;
  id: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Feature card interface
 */
export interface Feature {
  title: string;
  description: string;
}

/**
 * Step interface (How It Works)
 */
export interface Step {
  stepNumber: number;
  title: string;
  description: string;
}

/**
 * Use Case card interface (for home page)
 */
export interface UseCase {
  title: string;
  description: string;
}

/**
 * Product Use Case card interface (for product page carousel)
 */
export interface ProductUseCase {
  id: number;
  title: string;
  description: string;
  image: string;
  linkUrl: string;
}

/**
 * Product card interface
 */
export interface Product {
  name: string;
  description: string;
  badge: string;
  highlights: string[];
}

/**
 * Product feature interface (for product page)
 */
export interface ProductFeature {
  title: string;
  description: string;
}

/**
 * Why Astera Card interface (for product page carousel)
 */
export interface WhyAsteraCard {
  id: number;
  text: string;
  backgroundColor: string;
  textColor: string;
  iconImage: string;
  position: 'up' | 'down';
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
 * Metric interface (for product page counters)
 */
export interface Metric {
  id: string;
  value: number;
  unit: string;
  title: string;
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
    heroSectionSecondaryCta: string;
    
    // Features Section
    featuresSectionTitle: string;
    featuresSectionDescription: string;
    features: Feature[];
    
    // Steps Section
    stepsSectionTitle: string;
    stepsSectionDescription: string;
    steps: Step[];
    
    // Use Cases Section
    useCasesSectionTitle: string;
    useCasesSectionDescription: string;
    useCases: UseCase[];
    
    // CTA Section
    ctaSectionTitle: string;
    ctaSectionDescription: string;
    ctaSectionPrimaryCta: string;
    ctaSectionSecondaryCta: string;
    ctaSectionNote: string;
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
  heroSectionSecondaryCta: string;
  
  // Features Section
  featuresSectionTitle: string;
  featuresSectionDescription: string;
  features: Feature[];
  
  // Steps Section
  stepsSectionTitle: string;
  stepsSectionDescription: string;
  steps: Step[];
  
  // Use Cases Section
  useCasesSectionTitle: string;
  useCasesSectionDescription: string;
  useCases: UseCase[];
  
  // CTA Section
  ctaSectionTitle: string;
  ctaSectionDescription: string;
  ctaSectionPrimaryCta: string;
  ctaSectionSecondaryCta: string;
  ctaSectionNote: string;
  
  createdAt: string;
  updatedAt: string;
}

/**
 * Contentful Product Page Content Type Skeleton
 */
export interface ProductPageContentSkeleton extends EntrySkeletonType {
  contentTypeId: 'productPage';
  fields: {
    entryTitle: string;
    slug: string;
    
    // Hero Section
    heroSectionBadge: string;
    heroSectionHeading: Document;
    heroSectionDescription: string;
    heroSectionPrimaryCta: string;
    heroSectionSecondaryCta: string;
    
    // Products Section
    productsSectionTitle: string;
    productsSectionDescription: string;
    products: Product[];
    
    // Product Features Section
    productFeaturesSectionTitle: string;
    productFeaturesSectionDescription: string;
    productFeatures: ProductFeature[];
    
    // CTA Section
    ctaSectionTitle: string;
    ctaSectionDescription: string;
    ctaSectionPrimaryCta: string;
    ctaSectionSecondaryCta: string;
  };
}

export type ProductPageContentEntry = Entry<ProductPageContentSkeleton, undefined, string>;

/**
 * Parsed/simplified version for product page components
 */
export interface ProductPageContent {
  id: string;
  entryTitle: string;
  slug: string;
  
  // Hero Section
  heroSectionBadge: string;
  heroSectionHeading: Document;
  heroSectionDescription: string;
  heroSectionPrimaryCta: string;
  heroSectionSecondaryCta: string;
  
  // Products Section
  productsSectionTitle: string;
  productsSectionDescription: string;
  products: Product[];
  
  // Product Features Section
  productFeaturesSectionTitle: string;
  productFeaturesSectionDescription: string;
  productFeatures: ProductFeature[];
  
  // Why Astera Cards Section (Carousel)
  whyAsteraCards?: WhyAsteraCard[];
  
  // Testimonials Section
  testimonials?: Testimonial[];
  
  // Powerful Features Section (Accordion)
  powerfulFeatures?: PowerfulFeature[];
  
  // Metrics Section (Counters)
  metrics?: Metric[];
  
  // Use Cases Section (Carousel)
  useCases?: ProductUseCase[];
  
  // CTA Section
  ctaSectionTitle: string;
  ctaSectionDescription: string;
  ctaSectionPrimaryCta: string;
  ctaSectionSecondaryCta: string;
  
  createdAt: string;
  updatedAt: string;
}

