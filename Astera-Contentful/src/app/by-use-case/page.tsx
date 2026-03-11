import UseCaseListScreen from '@/components/screens/UseCaseScreen/UseCaseListScreen';
import { getAllUseCases } from '@/lib/contentful/api';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Use Cases - Astera',
  description: 'Browse our use cases and explore how our solutions can make a difference at your company.',
  openGraph: {
    title: 'Use Cases - Astera',
    description: 'Browse our use cases and explore how our solutions can make a difference at your company.',
  },
};

export default async function UseCasesPage() {
  const useCases = await getAllUseCases();
  
  return <UseCaseListScreen useCases={useCases} />;
}
