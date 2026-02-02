import { Suspense } from 'react';
import { ProductScreenNew } from '@/components/screens/ProductScreen/ProductScreenNew';
import { getProductPageContent } from '@/lib/contentful/api';

// Webhook-only revalidation: Pages are cached indefinitely until webhook triggers revalidation
// This means content updates instantly when published in Contentful (via webhook)
// Safety net: If webhook fails, content will update after 1 hour (fallback revalidation)
export const revalidate = 3600; // 1 hour fallback (webhooks handle instant updates)

type ProductPageProps = {
  searchParams: Promise<{ slug?: string }>;
};

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const params = await searchParams;
  const slug = params.slug || 'reportminer';
  
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>Loading...</div>}>
      <ProductPageContent slug={slug} />
    </Suspense>
  );
}

async function ProductPageContent({ slug }: { slug: string }) {
  try {
    // Fetch product page content server-side
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


