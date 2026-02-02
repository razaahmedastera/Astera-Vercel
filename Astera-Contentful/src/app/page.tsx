import { HomeScreenNew } from '@/components/screens/HomeScreen/HomeScreenNew';
import { getHomePageContent } from '@/lib/contentful/api';

// Webhook-only revalidation: Pages are cached indefinitely until webhook triggers revalidation
// This means content updates instantly when published in Contentful (via webhook)
// Safety net: If webhook fails, content will update after 1 hour (fallback revalidation)
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

