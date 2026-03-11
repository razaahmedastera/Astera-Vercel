import type { Metadata } from 'next';
import BlogListClient from '@/components/screens/BlogScreen/BlogListClient';
import { getAllBlogPosts, getAllBlogCategories } from '@/lib/contentful/api';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Blog | Astera',
  description:
    'Read the latest articles on data management, ETL, AI-powered automation, and more from Astera.',
  openGraph: {
    title: 'Blog | Astera',
    description: 'Read the latest articles on data management, ETL, AI-powered automation, and more.',
    type: 'website',
    siteName: 'Astera',
  },
};

export default async function BlogPage() {
  try {
    const [posts, categories] = await Promise.all([
      getAllBlogPosts(),
      getAllBlogCategories(),
    ]);

    const allCategories = [
      { id: 'all', name: 'All', slug: 'all', title: 'All' },
      ...categories,
    ];

    return <BlogListClient initialPosts={posts} categories={allCategories} pageSize={9} />;
  } catch (error) {
    console.error('[BlogPage] Error fetching blog posts:', error);
    return <BlogListClient initialPosts={[]} categories={[{ id: 'all', name: 'All', slug: 'all', title: 'All' }]} pageSize={9} />;
  }
}
