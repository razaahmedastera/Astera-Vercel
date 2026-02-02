import { notFound } from 'next/navigation';
import BlogPostScreen from '@/components/screens/BlogScreen/BlogPostScreen';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/contentful/api';

// SSR: Pages are rendered on each request for real-time content
// This means content updates instantly when published in Contentful
export const dynamic = 'force-dynamic'; // Force server-side rendering (SSR)

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
