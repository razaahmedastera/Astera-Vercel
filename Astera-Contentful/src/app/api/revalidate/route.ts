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
    // This is more efficient - only refreshes what actually changed
    if (contentType === 'homePage') {
      // Home page content changed - only refresh home page
      revalidatePath('/', 'page');
      revalidatePath('/', 'layout');
    } else if (contentType === 'productPage') {
      // Product page content changed - refresh product pages and listing
      revalidatePath('/product', 'page');
      revalidatePath('/product', 'layout');
    } else if (contentType === 'blog') {
      // Blog post changed - refresh blog listing and all blog posts
      revalidatePath('/blog', 'page');
      revalidatePath('/blog', 'layout');
      revalidatePath('/blog/[slug]', 'page'); // All individual blog posts
    } else {
      // Unknown content type or no contentType provided - refresh everything (safe fallback)
      console.warn('[Revalidate] Unknown content type or missing contentType, revalidating all pages');
      revalidatePath('/', 'layout');
      revalidatePath('/product', 'layout');
      revalidatePath('/blog', 'layout');
      revalidatePath('/blog/[slug]', 'page');
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
    revalidatePath('/', 'layout');
    revalidatePath('/product', 'layout');
    revalidatePath('/blog', 'layout');
    revalidatePath('/blog/[slug]', 'page');

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
