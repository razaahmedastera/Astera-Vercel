import type { Metadata } from 'next';
import TermsAndConditionsScreen from '@/components/screens/LegalScreen/TermsAndConditionsScreen';

export const metadata: Metadata = {
  title: 'Terms and Conditions | Astera Software',
  description: 'Astera Software Terms and Conditions. Please read these terms carefully before using our website and services.',
  alternates: {
    canonical: '/terms-and-conditions',
  },
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsScreen />;
}
