import { NextResponse } from 'next/server';
import { getAllProductPages } from '@/lib/contentful/api';

// SSR: API route to fetch all product pages (server-side)
export const dynamic = 'force-dynamic'; // Force server-side rendering (SSR)

/**
 * API route to fetch all product pages (server-side)
 * Used by Navigation component to populate products dropdown
 * Note: This route is disabled for static export builds
 */
export async function GET() {
  try {
    const products = await getAllProductPages();
    return NextResponse.json(products);
  } catch (error) {
    console.error('[API /products] Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
