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
      revalidatePath('/type/blog/[slug]', 'page');
    } else if (contentType === 'eBook') {
      revalidateTag('ebooks');
      revalidateTag('ebook');
      revalidatePath('/e-books', 'page');
      revalidatePath('/type/e-book/[slug]', 'page');
    } else if (contentType === '21U5b9oci2lilctbzJrh4a') {
      // Industry page changed - revalidate cache tags and paths
      revalidateTag('industries');
      revalidateTag('industry');
      revalidatePath('/industry-solutions/[slug]', 'page');
    } else if (contentType === '1u9d2q1RLTX2B0YogpSiRj') {
      // Use case changed - revalidate cache tags and paths
      revalidateTag('use-cases');
      revalidateTag('use-case');
      revalidatePath('/by-use-case', 'page');
      revalidatePath('/by-use-case/[slug]', 'page');
    } else if (contentType === 'blogAuthor') {
      revalidateTag('authors');
      revalidateTag('blogAuthor');
      revalidateTag('blog-posts');
      revalidatePath('/type/blog/author/[slug]', 'page');
      revalidatePath('/blog', 'page');
      revalidatePath('/type/blog/[slug]', 'page');
    } else if (contentType === 'webinar') {
      revalidateTag('webinars');
      revalidateTag('webinar');
      revalidatePath('/webinars', 'page');
      revalidatePath('/type/webinars/[slug]', 'page');
    } else if (contentType === 'awardsPageSettings' || contentType === 'awardEntry') {
      revalidateTag('awards');
      revalidatePath('/awards-and-recognitions', 'page');
    } else if (contentType === 'reviewPageSettings') {
      revalidateTag('reviews');
      revalidatePath('/customers/user-reviews', 'page');
    } else if (contentType === 'partnersPage') {
      revalidateTag('partners');
      revalidateTag('technology-partners');
      revalidatePath('/partners', 'page');
      revalidatePath('/technology-partners', 'page');
    } else if (contentType === 'whitepaper') {
      revalidateTag('whitepapers');
      revalidateTag('whitepaper');
      revalidatePath('/resources/whitepapers', 'page');
      revalidatePath('/type/whitepaper/[slug]', 'page');
    } else if (contentType === 'dataSheet') {
      revalidateTag('datasheets');
      revalidateTag('datasheet');
      revalidatePath('/data-sheet', 'page');
      revalidatePath('/type/data-sheet/[slug]', 'page');
    } else if (contentType === 'aboutUsPage' || contentType === 'teamMember' || contentType === 'award') {
      revalidateTag('about-us');
      revalidateTag('aboutUsPage');
      revalidatePath('/company/about-us', 'page');
    } else if (contentType === 'newsPost') {
      revalidateTag('news-posts');
      revalidateTag('newsPost');
      revalidatePath('/news', 'page');
      revalidatePath('/news/[slug]', 'page');
    } else {
      console.warn('[Revalidate] Unknown content type or missing contentType, revalidating all pages');
      revalidateTag('home-page');
      revalidateTag('product-pages');
      revalidateTag('blog-posts');
      revalidateTag('ebooks');
      revalidateTag('industries');
      revalidateTag('use-cases');
      revalidateTag('authors');
      revalidateTag('blogAuthor');
      revalidateTag('webinars');
      revalidateTag('webinar');
      revalidateTag('whitepapers');
      revalidateTag('whitepaper');
      revalidateTag('datasheets');
      revalidateTag('datasheet');
      revalidateTag('about-us');
      revalidateTag('aboutUsPage');
      revalidateTag('news-posts');
      revalidateTag('newsPost');
      revalidateTag('technology-partners');
      revalidatePath('/', 'layout');
      revalidatePath('/company/about-us', 'page');
      revalidatePath('/news', 'page');
      revalidatePath('/news/[slug]', 'page');
      revalidatePath('/product', 'layout');
      revalidatePath('/blog', 'layout');
      revalidatePath('/type/blog/[slug]', 'page');
      revalidatePath('/type/blog/author/[slug]', 'page');
      revalidatePath('/data-sheet', 'page');
      revalidatePath('/type/data-sheet/[slug]', 'page');
      revalidatePath('/e-books', 'page');
      revalidatePath('/type/e-book/[slug]', 'page');
      revalidatePath('/industry-solutions/[slug]', 'page');
      revalidatePath('/by-use-case', 'page');
      revalidatePath('/by-use-case/[slug]', 'page');
      revalidatePath('/webinars', 'page');
      revalidatePath('/type/webinars/[slug]', 'page');
      revalidatePath('/resources/whitepapers', 'page');
      revalidatePath('/type/whitepaper/[slug]', 'page');
      revalidatePath('/awards-and-recognitions', 'page');
      revalidatePath('/customers/user-reviews', 'page');
      revalidatePath('/partners', 'page');
      revalidatePath('/technology-partners', 'page');
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
    revalidateTag('home-page');
    revalidateTag('product-pages');
    revalidateTag('blog-posts');
    revalidateTag('ebooks');
    revalidateTag('industries');
    revalidateTag('use-cases');
    revalidateTag('authors');
    revalidateTag('blogAuthor');
    revalidateTag('webinars');
    revalidateTag('webinar');
    revalidateTag('whitepapers');
    revalidateTag('whitepaper');
    revalidateTag('datasheets');
    revalidateTag('datasheet');
    revalidateTag('about-us');
    revalidateTag('aboutUsPage');
    revalidateTag('news-posts');
    revalidateTag('newsPost');
    revalidatePath('/', 'layout');
    revalidatePath('/product', 'layout');
    revalidatePath('/blog', 'layout');
    revalidatePath('/type/blog/[slug]', 'page');
    revalidatePath('/type/blog/author/[slug]', 'page');
    revalidatePath('/data-sheet', 'page');
    revalidatePath('/type/data-sheet/[slug]', 'page');
    revalidatePath('/e-books', 'page');
    revalidatePath('/type/e-book/[slug]', 'page');
    revalidatePath('/industry-solutions/[slug]', 'page');
    revalidatePath('/by-use-case', 'page');
    revalidatePath('/by-use-case/[slug]', 'page');
    revalidatePath('/company/about-us', 'page');
    revalidatePath('/webinars', 'page');
    revalidatePath('/type/webinars/[slug]', 'page');
    revalidatePath('/resources/whitepapers', 'page');
    revalidatePath('/type/whitepaper/[slug]', 'page');
    revalidatePath('/news', 'page');
    revalidatePath('/news/[slug]', 'page');
    revalidatePath('/awards-and-recognitions', 'page');
    revalidatePath('/customers/user-reviews', 'page');
    revalidatePath('/partners', 'page');

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
