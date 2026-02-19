import { ProductScreenNew } from '@/components/screens/ProductScreen/ProductScreenNew';
import { getProductPageContent } from '@/lib/contentful/api';

// ISR: Pages are cached for 1 hour, but webhooks can trigger instant revalidation
// This means content updates instantly when published in Contentful (via webhook)
// Safety net: If webhook fails, content updates after 1 hour automatically
export const revalidate = 3600; // 1 hour fallback (webhooks handle instant updates)

type ProductPageProps = {
  searchParams?: Promise<{ slug?: string }>;
};

export default async function ProductPage({ searchParams }: ProductPageProps) {
  // Default to 'reportminer' if searchParams is not provided
  const slug = searchParams ? ((await searchParams).slug || 'reportminer') : 'reportminer';
  
  try {
    // Fetch product page content server-side (SSR/ISR)
    const content = await getProductPageContent(slug);
    
    return <ProductScreenNew content={content} />;
  } catch (error) {
    console.error(`[ProductPage] Error loading product page content for slug "${slug}":`, error);
    return (
      <div className="p-8 text-center">
        <p>Failed to load product page content. Please check your Contentful configuration.</p>
        <p className="mt-2 text-sm text-gray-500">
          {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }
}


