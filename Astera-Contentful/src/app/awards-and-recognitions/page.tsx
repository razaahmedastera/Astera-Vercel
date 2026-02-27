import type { Metadata } from 'next';
import AwardsPageScreen from '@/components/screens/AwardsScreen/AwardsPageScreen';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Awards & Recognitions | Astera',
  description:
    'Astera is honored to receive these recognitions and awards for delivering exceptional customer service and helping customers to unlock value from data.',
  openGraph: {
    title: 'Awards & Recognitions | Astera',
    description:
      'Astera is honored to receive these recognitions and awards for delivering exceptional customer service and helping customers to unlock value from data.',
    type: 'website',
    siteName: 'Astera',
  },
  alternates: { canonical: '/awards-and-recognitions' },
};

export default function AwardsPage() {
  return <AwardsPageScreen />;
}
