import type { Metadata } from 'next';
import { ProductScreenNew } from '@/components/screens/ProductScreen/ProductScreenNew';
import { getProductPageContent } from '@/lib/contentful/api';

export const revalidate = 3600;

type ProductPageProps = {
  searchParams?: Promise<{ slug?: string }>;
};

export async function generateMetadata({ searchParams }: ProductPageProps): Promise<Metadata> {
  const slug = searchParams ? ((await searchParams).slug || 'reportminer') : 'reportminer';

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
  const slug = searchParams ? ((await searchParams).slug || 'reportminer') : 'reportminer';

  try {
    const content = await getProductPageContent(slug);
    return <ProductScreenNew content={content} />;
  } catch (error) {
    console.error(`[ProductPage] Error loading "${slug}":`, error);
    return (
      <div className="p-8 text-center">
        <p>Failed to load product page content.</p>
      </div>
    );
  }
}
