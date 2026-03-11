import type { Metadata } from 'next';
import { HomeScreenNew } from '@/components/screens/HomeScreen/HomeScreenNew';
import { getHomePageContent } from '@/lib/contentful/api';

export const revalidate = 60;

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
