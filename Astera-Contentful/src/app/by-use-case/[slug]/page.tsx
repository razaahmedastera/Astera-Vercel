import UseCaseDetailScreen from '@/components/screens/UseCaseScreen/UseCaseDetailScreen';
import { getUseCaseBySlug, getAllBlogPosts } from '@/lib/contentful/api';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 60;

type UseCasePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: UseCasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const useCase = await getUseCaseBySlug(slug);

  if (!useCase) {
    return {
      title: 'Use Case Not Found - Astera',
      description: 'The requested use case could not be found.',
    };
  }

  return {
    title: useCase.seoTitle || `${useCase.title} - Use Case | Astera`,
    description: useCase.seoDescription || useCase.subtitle || `Learn how Astera's solution can help with ${useCase.title}.`,
    keywords: useCase.seoKeywords,
    openGraph: {
      title: useCase.seoTitle || `${useCase.title} - Use Case | Astera`,
      description: useCase.seoDescription || useCase.subtitle || `Learn how Astera's solution can help with ${useCase.title}.`,
      images: useCase.ogImage ? [{ url: useCase.ogImage }] : undefined,
    },
  };
}

export default async function UseCaseDetailPage({ params }: UseCasePageProps) {
  const { slug } = await params;
  const [useCase, allPosts] = await Promise.all([
    getUseCaseBySlug(slug),
    getAllBlogPosts(),
  ]);

  if (!useCase) {
    notFound();
  }

  const resources = allPosts
    .filter((p) => p.coverImage)
    .slice(0, 3)
    .map((p) => ({
      title: p.title,
      url: `/type/blog/${p.slug}`,
      type: 'Blog',
      image: p.coverImage,
    }));

  return <UseCaseDetailScreen useCase={useCase} resources={resources} />;
}
