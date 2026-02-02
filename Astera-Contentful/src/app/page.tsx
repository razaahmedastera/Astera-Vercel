import { HomeScreenNew } from '@/components/screens/HomeScreen/HomeScreenNew';
import { getHomePageContent } from '@/lib/contentful/api';

// ISR: Pages are cached for 1 hour, but webhooks can trigger instant revalidation
// This means content updates instantly when published in Contentful (via webhook)
// Safety net: If webhook fails, content updates after 1 hour automatically
export const revalidate = 3600; // 1 hour fallback (webhooks handle instant updates)

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

