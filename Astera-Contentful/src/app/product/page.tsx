import { Suspense } from 'react';
import { ProductScreenNew } from '@/components/screens/ProductScreen/ProductScreenNew';
import { getProductPageContent } from '@/lib/contentful/api';

// SSR: Pages are rendered on each request for real-time content
// This means content updates instantly when published in Contentful
export const dynamic = 'force-dynamic'; // Force server-side rendering (SSR)

type ProductPageProps = {
  searchParams?: Promise<{ slug?: string }>;
};

export default async function ProductPage({ searchParams }: ProductPageProps) {
  // For static export, searchParams may not be available
  // Default to 'reportminer' if searchParams is not provided
  const slug = searchParams ? ((await searchParams).slug || 'reportminer') : 'reportminer';
  
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


