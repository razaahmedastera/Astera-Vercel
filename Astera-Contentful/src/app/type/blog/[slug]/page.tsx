import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BlogPostScreen from '@/components/screens/BlogScreen/BlogPostScreen';
import { getBlogPostBySlug } from '@/lib/contentful/api';

export const dynamic = 'force-dynamic';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) return { title: 'Blog Post Not Found' };

  const title = `${post.title} | Astera Blog`;
  const description = post.excerpt || '';

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      siteName: 'Astera',
      ...(post.featuredImage && {
        images: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(post.featuredImage && { images: [post.featuredImage] }),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  return <BlogPostScreen post={post} />;
}
