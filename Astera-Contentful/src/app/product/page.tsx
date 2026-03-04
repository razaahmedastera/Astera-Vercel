import type { Metadata } from 'next';
import { ProductScreenNew } from '@/components/screens/ProductScreen/ProductScreenNew';
import { getProductPageContent } from '@/lib/contentful/api';

export const dynamic = 'force-dynamic';

type ProductPageProps = {
  searchParams?: Promise<{ slug?: string }>;
};

export async function generateMetadata({ searchParams }: ProductPageProps): Promise<Metadata> {
  const rawSlug = searchParams ? (await searchParams).slug : undefined;
  const slug = (rawSlug || '').trim() || 'reportminer';

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

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const rawSlug = searchParams ? (await searchParams).slug : undefined;
  const slug = (rawSlug || '').trim() || 'reportminer';

  try {
    const content = await getProductPageContent(slug);
    return <ProductScreenNew content={content} />;
  } catch (error) {
    console.error(`[ProductPage] Error loading "${slug}":`, error);
    return (
      <div className="p-8 text-center">
        <p>Failed to load product page content.</p>
        {slug && slug !== 'reportminer' && (
          <p className="mt-2 text-sm text-gray-500">
            No product found for slug &quot;{slug}&quot;. Check that the product exists in Contentful and the slug matches.
          </p>
        )}
      </div>
    );
  }
}
