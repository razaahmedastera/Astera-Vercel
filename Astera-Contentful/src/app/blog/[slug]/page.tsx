import { notFound } from 'next/navigation';
import BlogPostScreen from '@/components/screens/BlogScreen/BlogPostScreen';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/contentful/api';

// Webhook-only revalidation: Pages are cached indefinitely until webhook triggers revalidation
// This means content updates instantly when published in Contentful (via webhook)
// Safety net: If webhook fails, content will update after 1 hour (fallback revalidation)
export const revalidate = 3600; // 1 hour fallback (webhooks handle instant updates)

// Server component wrapper that exports generateStaticParams for static export
// The actual page logic is in BlogPostPageClient (client component)
export async function generateStaticParams() {
  // Return minimal params - all blog posts are fetched client-side for real-time updates
  return [{ slug: 'placeholder' }];
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  return <BlogPostPageClient params={params} />;
}
