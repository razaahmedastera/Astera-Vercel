import { ContactUsScreen } from '@/components/screens/ContactUsScreen/ContactUsScreen';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Astera',
  description: 'Get in touch with Astera. We are here to answer any queries you may have about our products. Contact us via phone, email, or fill out our contact form.',
  openGraph: {
    title: 'Contact Us - Astera',
    description: 'Get in touch with Astera. We are here to answer any queries you may have about our products.',
  },
};

export default function ContactUsPage() {
  return <ContactUsScreen />;
}
