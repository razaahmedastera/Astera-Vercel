import type { Metadata } from 'next';
import ProfessionalServicesScreen from '@/components/screens/ProfessionalServicesScreen/ProfessionalServicesScreen';
import { getAllAwardEntries } from '@/lib/contentful/api';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Professional Services | Astera',
  description:
    'Get personalized guidance for your custom data needs with Astera Professional Services — expert training, implementation packages, and turnkey data warehouse solutions.',
  openGraph: {
    title: 'Professional Services | Astera',
    description:
      'Expert training, implementation packages, and turnkey data warehouse solutions tailored to your needs.',
    type: 'website',
    siteName: 'Astera',
  },
};

export default async function ProfessionalServicesPage() {
  const awards = await getAllAwardEntries();

  return <ProfessionalServicesScreen awards={awards} />;
}
