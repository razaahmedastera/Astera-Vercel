import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// SSR: API route for Contentful webhook revalidation
export const dynamic = 'force-dynamic'; // Force server-side rendering (SSR)

/**
 * API route for Contentful webhook revalidation
 * Note: This route is disabled for static export builds
 */
export async function POST(request: NextRequest) {
  try {
    // Verify secret token
    const secret = request.nextUrl.searchParams.get('secret');
    const expectedSecret = process.env.REVALIDATION_SECRET;

    if (!expectedSecret) {
      console.error('[Revalidate] REVALIDATION_SECRET is not set in environment variables');
      return NextResponse.json(
        { message: 'Revalidation secret not configured' },
        { status: 500 }
      );
    }

    if (secret !== expectedSecret) {
      console.warn('[Revalidate] Invalid secret token provided');
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Parse webhook payload (optional - Contentful sends metadata)
    let contentType: string | null = null;
    let entryId: string | null = null;
    
    try {
      const body = await request.json();
      // Contentful webhook payload structure
      if (body.sys?.contentType?.sys?.id) {
        contentType = body.sys.contentType.sys.id;
      }
      if (body.sys?.id) {
        entryId = body.sys.id;
      }
    } catch {
      // If body parsing fails, continue with full revalidation
    }

    console.log('[Revalidate] Revalidating paths...', { contentType, entryId });

    // Revalidate only the relevant pages based on content type
    // Use cache tags for efficient revalidation, then revalidate paths
    if (contentType === 'homePage') {
      // Home page content changed - revalidate cache tag and paths
      revalidateTag('home-page');
      revalidateTag('home');
      revalidatePath('/', 'page');
      revalidatePath('/', 'layout');
    } else if (contentType === 'productPage') {
      // Product page content changed - revalidate cache tags and paths
      revalidateTag('product-pages');
      revalidateTag('product');
      revalidatePath('/product', 'page');
      revalidatePath('/product', 'layout');
    } else if (contentType === 'blog') {
      // Blog post changed - revalidate cache tags and paths
      revalidateTag('blog-posts');
      revalidateTag('blog');
      revalidatePath('/blog', 'page');
      revalidatePath('/blog', 'layout');
      revalidatePath('/blog/[slug]', 'page'); // All individual blog posts
    } else if (contentType === 'eBook') {
      // eBook changed - revalidate cache tags and paths
      revalidateTag('ebooks');
      revalidateTag('ebook');
      revalidatePath('/ebook', 'page');
      revalidatePath('/ebook/[slug]', 'page');
    } else if (contentType === '21U5b9oci2lilctbzJrh4a') {
      // Industry page changed - revalidate cache tags and paths
      revalidateTag('industries');
      revalidateTag('industry');
      revalidatePath('/industry-solutions/[slug]', 'page');
    } else if (contentType === 'useCase') {
      // Use case changed - revalidate cache tags and paths
      revalidateTag('use-cases');
      revalidateTag('use-case');
      revalidatePath('/use-cases', 'page');
      revalidatePath('/use-cases/[slug]', 'page');
    } else {
      // Unknown content type or no contentType provided - refresh everything (safe fallback)
      console.warn('[Revalidate] Unknown content type or missing contentType, revalidating all pages');
      revalidateTag('home-page');
      revalidateTag('product-pages');
      revalidateTag('blog-posts');
      revalidateTag('ebooks');
      revalidateTag('industries');
      revalidateTag('use-cases');
      revalidatePath('/', 'layout');
      revalidatePath('/product', 'layout');
      revalidatePath('/blog', 'layout');
      revalidatePath('/blog/[slug]', 'page');
      revalidatePath('/ebook', 'page');
      revalidatePath('/ebook/[slug]', 'page');
      revalidatePath('/industry-solutions/[slug]', 'page');
      revalidatePath('/use-cases', 'page');
      revalidatePath('/use-cases/[slug]', 'page');
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      contentType,
      entryId,
    });
  } catch (error) {
    console.error('[Revalidate] Error revalidating:', error);
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for testing revalidation (useful for manual testing)
 * Only works if REVALIDATION_SECRET is provided
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const expectedSecret = process.env.REVALIDATION_SECRET;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json(
      { message: 'Invalid or missing secret' },
      { status: 401 }
    );
  }

  try {
    // Revalidate all cache tags
    revalidateTag('home-page');
    revalidateTag('product-pages');
    revalidateTag('blog-posts');
    revalidateTag('ebooks');
    revalidateTag('industries');
    revalidateTag('use-cases');
    
    // Revalidate all paths
    revalidatePath('/', 'layout');
    revalidatePath('/product', 'layout');
    revalidatePath('/blog', 'layout');
    revalidatePath('/blog/[slug]', 'page');
    revalidatePath('/ebook', 'page');
    revalidatePath('/ebook/[slug]', 'page');
    revalidatePath('/industry-solutions/[slug]', 'page');
    revalidatePath('/use-cases', 'page');
    revalidatePath('/use-cases/[slug]', 'page');

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      message: 'Manual revalidation successful',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
