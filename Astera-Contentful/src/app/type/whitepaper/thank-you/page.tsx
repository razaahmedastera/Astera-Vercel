import type { Metadata } from 'next';
import ThankYouScreen from './ThankYouScreen';

export const metadata: Metadata = {
  title: 'Thank You - Astera',
  description: 'Thank you for downloading our whitepaper.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouScreen />;
}
