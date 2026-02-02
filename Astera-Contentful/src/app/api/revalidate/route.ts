import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API route for Contentful webhook revalidation
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

    // Revalidate all pages that use Contentful content
    revalidatePath('/', 'layout'); // Home page
    revalidatePath('/product', 'layout'); // Product pages
    revalidatePath('/blog', 'layout'); // Blog listing
    revalidatePath('/blog/[slug]', 'page'); // Individual blog posts

    // Also revalidate specific paths based on content type if available
    if (contentType === 'homePage') {
      revalidatePath('/', 'page');
    } else if (contentType === 'productPage') {
      revalidatePath('/product', 'page');
    } else if (contentType === 'blog') {
      revalidatePath('/blog', 'page');
      if (entryId) {
        // Try to revalidate specific blog post if we have the entry ID
        // Note: This requires fetching the slug, which we can do if needed
        revalidatePath('/blog/[slug]', 'page');
      }
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
