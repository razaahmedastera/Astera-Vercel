import type { Metadata } from 'next';
import PrivacyPolicyScreen from '@/components/screens/LegalScreen/PrivacyPolicyScreen';

export const metadata: Metadata = {
  title: 'Privacy Policy | Astera Software',
  description: 'Astera Software Privacy Policy. Learn how we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyScreen />;
}
