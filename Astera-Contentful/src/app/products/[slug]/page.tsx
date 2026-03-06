import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductScreenNew } from '@/components/screens/ProductScreen/ProductScreenNew';
import { getAllProductPages, getProductPageContent } from '@/lib/contentful/api';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const pages = await getAllProductPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const content = await getProductPageContent(slug);
    const title = `${content?.productName || 'Product'} | Astera`;
    const description = content?.heroSectionDescription || '';

    return {
      title,
      description,
      openGraph: { title, description, type: 'website', siteName: 'Astera' },
    };
  } catch {
    return { title: 'Products | Astera' };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const content = await getProductPageContent(slug);
    return <ProductScreenNew content={content} />;
  } catch (error) {
    console.error(`[ProductPage] Error loading "${slug}":`, error);
    notFound();
  }
}
