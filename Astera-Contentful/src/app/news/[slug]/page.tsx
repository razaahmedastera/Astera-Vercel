import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NewsDetailScreen from '@/components/screens/NewsScreen/NewsDetailScreen';
import { getNewsPostBySlug } from '@/lib/contentful/api';

export const revalidate = 60;

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) return { title: 'News Not Found' };

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  const title = post.seoTitle || `${post.title} | Astera News`;
  const description = post.seoDescription || post.excerpt || '';

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      url: `${baseUrl}/news/${post.slug}`,
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
    alternates: { canonical: `${baseUrl}/news/${post.slug}` },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const post = await getNewsPostBySlug(slug);

  if (!post) notFound();

  return <NewsDetailScreen post={post} />;
}
