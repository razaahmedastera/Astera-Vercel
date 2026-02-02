import { notFound } from 'next/navigation';
import BlogPostScreen from '@/components/screens/BlogScreen/BlogPostScreen';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/contentful/api';

// ISR: Pages are cached for 1 hour, but webhooks can trigger instant revalidation
// This means content updates instantly when published in Contentful (via webhook)
// Safety net: If webhook fails, content updates after 1 hour automatically
export const revalidate = 3600; // 1 hour fallback (webhooks handle instant updates)

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  // Fetch blog post server-side (SSR)
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Render server-side with fetched data
  return <BlogPostScreen post={post} />;
}
