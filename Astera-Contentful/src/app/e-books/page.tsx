import type { Metadata } from 'next';
import EbookListScreen from '@/components/screens/EbookScreen/EbookListScreen';
import { getAllEbooks } from '@/lib/contentful/api';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'eBooks | Astera',
  description:
    'Download free eBooks on data integration, ETL, data warehousing, and AI-powered automation from Astera.',
  openGraph: {
    title: 'eBooks | Astera',
    description: 'Download free eBooks on data integration, ETL, and AI-powered automation.',
    type: 'website',
    siteName: 'Astera',
  },
};

export default async function EbookPage() {
  try {
    const ebooks = await getAllEbooks();
    return <EbookListScreen ebooks={ebooks} />;
  } catch (error) {
    console.error('[EbookPage] Error fetching eBooks:', error);
    return <EbookListScreen ebooks={[]} />;
  }
}
