import BlogListClient from '@/components/screens/BlogScreen/BlogListClient';
import type { BlogCategory } from '@/types/contentful';
import { posts } from './posts-data';

// Static placeholder data (Contentful-friendly shape)
const categories: BlogCategory[] = [
  { id: 'all', name: 'All', slug: 'all', title: 'All' },
  { id: 'features', name: 'Features', slug: 'features', title: 'Features' },
  { id: 'news', name: 'News', slug: 'news', title: 'News' },
  { id: 'integrations', name: 'Integrations', slug: 'integrations', title: 'Integrations' },
  { id: 'support', name: 'Support', slug: 'support', title: 'Support' },
  { id: 'sales', name: 'Sales', slug: 'sales', title: 'Sales' },
];

export default function BlogPage() {
  return <BlogListClient initialPosts={posts} categories={categories} pageSize={9} />;
}
