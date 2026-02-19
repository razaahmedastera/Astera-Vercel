/**
 * Industry data types
 * Used for type definitions only - actual data comes from Contentful
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

export interface IndustryData {
  slug: string;
  name: string;
  subtitle: string;
  heroImage: string;
  ctaText: string;
  ctaLink: string;
  clientLogos: string[]; // Array of logo image URLs or names
  videoTitle: string;
  videoUrl: string;
  videoThumbnail: string;
  featuresSectionTitle: string;
  features: IndustryFeature[];
  caseStudy: IndustryCaseStudy;
  finalCtaTitle: string;
  finalCtaSubtitle: string;
  finalCtaButtonText: string;
  finalCtaButtonLink: string;
}
