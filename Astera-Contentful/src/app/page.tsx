import { HomeScreenNew } from '@/components/screens/HomeScreen/HomeScreenNew';
import { getHomePageContent } from '@/lib/contentful/api';

// SSR: Pages are rendered on each request for real-time content
// This means content updates instantly when published in Contentful
export const dynamic = 'force-dynamic'; // Force server-side rendering (SSR)

export default async function Home() {
  try {
    // Fetch home page content server-side
    const content = await getHomePageContent('home');
    
    return <HomeScreenNew content={content} />;
  } catch (error) {
    console.error('[HomePage] Error loading home page content:', error);
    return (
      <div className="p-8 text-center">
        <p>Failed to load home page content. Please check your Contentful configuration.</p>
        <p className="mt-2 text-sm text-gray-500">
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }
}

