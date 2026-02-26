import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { getHomePageContent } from '@/lib/contentful/api';

const HomeScreenNew = dynamic(
  () => import('@/components/screens/HomeScreen/HomeScreenNew').then(m => m.HomeScreenNew),
  { loading: () => <div className="min-h-screen" /> }
);

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Astera - AI-Powered Data Platform',
  description:
    "Accelerate data prep, modeling, analytics, ETL and workflows with intelligent automation. Astera's agentic platform simplifies every step from raw data to real insight.",
  openGraph: {
    title: 'Astera - AI-Powered Data Platform',
    description:
      "Accelerate data prep, modeling, analytics, ETL and workflows with intelligent automation.",
    type: 'website',
    siteName: 'Astera',
  },
};

export default async function Home() {
  try {
    const content = await getHomePageContent('home');
    return <HomeScreenNew content={content} />;
  } catch (error) {
    console.error('[HomePage] Error loading content:', error);
    return (
      <div className="p-8 text-center">
        <p>Failed to load home page content.</p>
      </div>
    );
  }
}
