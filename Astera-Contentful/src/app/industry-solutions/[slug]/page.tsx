import { notFound } from 'next/navigation';
import IndustryScreen from '@/components/screens/IndustryScreen/IndustryScreen';
import { getIndustryBySlug } from '@/lib/contentful/api';
import type { IndustryData } from '@/data/industries';

// ISR: Cache for 1 hour, webhooks can trigger instant revalidation
export const revalidate = 3600; // 1 hour fallback (webhooks handle instant updates)

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

/**
 * Convert Industry (Contentful) to IndustryData (component format)
 */
function convertToIndustryData(industry: any): IndustryData {
  return {
    slug: industry.slug,
    name: industry.name,
    subtitle: industry.subtitle,
    heroImage: industry.heroImage,
    ctaText: industry.ctaText,
    ctaLink: industry.ctaLink,
    clientLogos: [],
    videoTitle: industry.videoTitle || '',
    videoUrl: industry.videoUrl || '',
    videoThumbnail: industry.videoThumbnail || '',
    featuresSectionTitle: industry.featuresSectionTitle,
    features: industry.features,
    caseStudy: industry.caseStudy,
    finalCtaTitle: industry.finalCtaTitle,
    finalCtaSubtitle: industry.finalCtaSubtitle,
    finalCtaButtonText: industry.finalCtaButtonText,
    finalCtaButtonLink: industry.finalCtaButtonLink,
  };
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);

  if (!industry) {
    notFound();
  }

  return <IndustryScreen industry={convertToIndustryData(industry)} />;
}
