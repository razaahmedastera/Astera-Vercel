import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import IndustryScreen from '@/components/screens/IndustryScreen/IndustryScreen';
import { getIndustryBySlug } from '@/lib/contentful/api';
import type { IndustryData } from '@/data/industries';

export const revalidate = 60;

type IndustryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);

  if (!industry) return { title: 'Industry Not Found' };

  return {
    title: `${industry.name} Solutions | Astera`,
    description: industry.subtitle || `Data management solutions for ${industry.name}`,
    openGraph: {
      title: `${industry.name} Solutions | Astera`,
      description: industry.subtitle || `Data management solutions for ${industry.name}`,
      type: 'website',
      siteName: 'Astera',
    },
  };
}

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

  if (!industry) notFound();

  return <IndustryScreen industry={convertToIndustryData(industry)} />;
}
