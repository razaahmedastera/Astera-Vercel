import type { Metadata } from 'next';
import PartnersScreen from '@/components/screens/PartnersScreen/PartnersScreen';
import { getPartnersPageContent } from '@/lib/contentful/api';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPartnersPageContent();
  return {
    title: content?.seoTitle || 'Partners | Astera Partner Program',
    description:
      content?.seoDescription ||
      'Become an Astera partner. Join our reseller, system integrator, or OEM partner program and grow your business with industry-leading data integration solutions.',
    openGraph: {
      title: content?.seoTitle || 'Partners | Astera Partner Program',
      description:
        content?.seoDescription ||
        'Become an Astera partner. Join our reseller, system integrator, or OEM partner program.',
      type: 'website',
      siteName: 'Astera',
    },
    alternates: { canonical: '/partners' },
  };
}

export default async function PartnersPage() {
  const content = await getPartnersPageContent();
  return <PartnersScreen content={content} />;
}
