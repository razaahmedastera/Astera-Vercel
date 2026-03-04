import type { Metadata } from 'next';
import TechnologyPartnersScreen from '@/components/screens/TechnologyPartnersScreen/TechnologyPartnersScreen';
import { getTechnologyPartnersPageContent } from '@/lib/contentful/api';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getTechnologyPartnersPageContent();
  return {
    title: content?.seoTitle || 'Technology Partners | Astera',
    description:
      content?.seoDescription ||
      "Explore Astera's technology partners including Microsoft, Google Cloud, Amazon, Snowflake, and Oracle. Build an integrated data ecosystem together.",
    openGraph: {
      title: content?.seoTitle || 'Technology Partners | Astera',
      description:
        content?.seoDescription ||
        "Explore Astera's technology partners. Build an integrated data ecosystem together.",
      type: 'website',
      siteName: 'Astera',
    },
    alternates: { canonical: '/technology-partners' },
  };
}

export default async function TechnologyPartnersPage() {
  const content = await getTechnologyPartnersPageContent();
  return <TechnologyPartnersScreen content={content} />;
}
