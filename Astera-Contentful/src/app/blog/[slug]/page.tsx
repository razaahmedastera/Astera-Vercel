import { notFound } from 'next/navigation';
import BlogPostScreen from '@/components/screens/BlogScreen/BlogPostScreen';
import { posts } from '../posts-data';

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();
  return <BlogPostScreen post={post} />;
}
