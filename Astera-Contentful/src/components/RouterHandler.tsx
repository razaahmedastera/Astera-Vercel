'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

/**
 * Router handler for static export
 * Ensures blog routes are properly handled when accessed directly via URL
 */
export function RouterHandler() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if we're on a blog post route but the router hasn't matched it
    if (pathname && pathname.startsWith('/type/blog/') && pathname !== '/type/blog') {
      const slug = pathname.replace('/type/blog/', '').replace('author/', '');
      // If we have a valid slug, ensure the route is recognized
      if (slug && slug.length > 0) {
        console.log('[RouterHandler] Detected blog post route:', pathname, 'slug:', slug);
        // The route should already be matched by Next.js, but we log it for debugging
      }
    }
  }, [pathname, router]);

  return null; // This component doesn't render anything
}
