import BlogListClient from '@/components/screens/BlogScreen/BlogListClient';
import { getAllBlogPosts } from '@/lib/contentful/api';
import { getAllBlogCategories } from '@/lib/contentful/api';

// SSR: Pages are rendered on each request for real-time content
// This means content updates instantly when published in Contentful
export const dynamic = 'force-dynamic'; // Force server-side rendering (SSR)

export default async function BlogPage() {
  try {
    // Fetch blog posts from Contentful server-side
    const posts = await getAllBlogPosts();
    
    // Fetch categories from Contentful server-side
    const categories = await getAllBlogCategories();

    console.log(`[BlogPage] Loaded ${posts.length} blog post(s)`);
    if (posts.length > 0) {
      console.log(`[BlogPage] Available slugs:`, posts.map(p => p.slug));
    } else {
      console.warn('[BlogPage] No blog posts found in Contentful');
    }

    // Use static "All" category + Contentful categories
    const allCategories = [
      { id: 'all', name: 'All', slug: 'all', title: 'All' },
      ...categories,
    ];

    // Pass server-fetched data to client component (for filtering/pagination)
    return <BlogListClient initialPosts={posts} categories={allCategories} pageSize={9} />;
  } catch (error) {
    console.error('[BlogPage] Error fetching blog posts:', error);
    // Return empty state on error
    const allCategories = [
      { id: 'all', name: 'All', slug: 'all', title: 'All' },
    ];
    return <BlogListClient initialPosts={[]} categories={allCategories} pageSize={9} />;
  }
}
