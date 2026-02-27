import type { Metadata } from 'next';
import AwardsPageScreen from '@/components/screens/AwardsScreen/AwardsPageScreen';
import { getAwardsPageSettings, getAllAwardEntries } from '@/lib/contentful/api';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getAwardsPageSettings();
  return {
    title: settings?.seoTitle || 'Awards & Recognitions | Astera',
    description:
      settings?.seoDescription ||
      'Astera is honored to receive these recognitions and awards for delivering exceptional customer service and helping customers to unlock value from data.',
    openGraph: {
      title: settings?.seoTitle || 'Awards & Recognitions | Astera',
      description:
        settings?.seoDescription ||
        'Astera is honored to receive these recognitions and awards for delivering exceptional customer service and helping customers to unlock value from data.',
      type: 'website',
      siteName: 'Astera',
    },
    alternates: { canonical: '/awards-and-recognitions' },
  };
}

export default async function AwardsPage() {
  const [settings, awards] = await Promise.all([
    getAwardsPageSettings(),
    getAllAwardEntries(),
  ]);

  return <AwardsPageScreen settings={settings} awards={awards} />;
}
