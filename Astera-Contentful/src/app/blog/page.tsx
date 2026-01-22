import BlogListClient from '@/components/screens/BlogScreen/BlogListClient';
import { getAllBlogPosts } from '@/lib/contentful/api';

export default async function BlogPage() {
  try {
    // Fetch blog posts from Contentful
    const posts = await getAllBlogPosts();

    console.log(`[BlogPage] Loaded ${posts.length} blog post(s)`);
    if (posts.length > 0) {
      console.log(`[BlogPage] Available slugs:`, posts.map(p => p.slug));
    } else {
      console.warn('[BlogPage] No blog posts found in Contentful');
    }

    // Use static "All" category only (skip Contentful categories for now)
    const allCategories = [
      { id: 'all', name: 'All', slug: 'all', title: 'All' },
    ];

    return <BlogListClient initialPosts={posts || []} categories={allCategories} pageSize={9} />;
  } catch (error) {
    console.error('[BlogPage] Error loading blog posts:', error);
    if (error instanceof Error) {
      console.error('[BlogPage] Error details:', error.message);
      console.error('[BlogPage] Error stack:', error.stack);
    }
    return (
      <div className="p-8 text-center">
        <p>Failed to load blog posts. Please check your Contentful configuration.</p>
        <p className="mt-2 text-sm text-gray-500">
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }
}
