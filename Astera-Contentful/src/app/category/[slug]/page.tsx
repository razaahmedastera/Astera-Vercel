import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getBlogPostsByTag } from '@/lib/contentful/api';
import { getCategoryBySlug } from '@/lib/categories';
import CategoryScreen from '@/components/screens/CategoryScreen/CategoryScreen';

export const dynamic = 'force-dynamic';

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found | Astera' };
  }

  const title = `${category.name} | Astera`;
  const description = category.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: 'Astera',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const posts = await getBlogPostsByTag(slug);

  return (
    <CategoryScreen
      category={category}
      posts={posts}
    />
  );
}
