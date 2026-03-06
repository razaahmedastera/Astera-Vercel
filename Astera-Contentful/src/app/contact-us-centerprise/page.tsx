import type { Metadata } from 'next';
import ContactCenterpriseScreen from '@/components/screens/ContactCenterpriseScreen/ContactCenterpriseScreen';

export const metadata: Metadata = {
  title: 'Contact Us Centerprise | Astera',
  description:
    'Get in touch with the Astera Centerprise team. Build no-code, AI-powered data pipelines with CDC, scheduling, and natural language support.',
  openGraph: {
    title: 'Contact Us Centerprise | Astera',
    description:
      'Get in touch with the Astera Centerprise team. Build no-code, AI-powered data pipelines.',
    type: 'website',
    siteName: 'Astera',
  },
};

export default function ContactCenterprisePage() {
  return <ContactCenterpriseScreen />;
}
