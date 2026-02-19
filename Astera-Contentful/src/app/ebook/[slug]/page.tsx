import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import EbookDetailScreen from '@/components/screens/EbookScreen/EbookDetailScreen';
import { getEbookBySlug } from '@/lib/contentful/api';

// ISR: Pages are cached for 1 hour, but webhooks can trigger instant revalidation
export const revalidate = 3600; // 1 hour fallback (webhooks handle instant updates)

type EbookPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: EbookPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ebook = await getEbookBySlug(slug);
  
  if (!ebook) {
    return { title: 'eBook Not Found' };
  }

  // Use environment variable or fallback to localhost for development
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                  'http://localhost:3000';
  const seoTitle = ebook.seoTitle || `${ebook.title} | Astera eBook`;
  const seoDescription = ebook.seoDescription || (typeof ebook.description === 'string' ? ebook.description.substring(0, 160) : '');
  const ogImage = ebook.ogImage || `${baseUrl}/og-default.jpg`;
  const canonicalUrl = ebook.canonicalUrl || `${baseUrl}/ebook/${ebook.slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: ebook.seoKeywords || '',
    openGraph: {
      type: 'book',
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      siteName: 'Astera',
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: ebook.title,
      }],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: ebook.metaRobots?.includes('noindex') ? false : true,
      follow: ebook.metaRobots?.includes('nofollow') ? false : true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function EbookDetailPage({ params }: EbookPageProps) {
  const { slug } = await params;
  const ebook = await getEbookBySlug(slug);

  if (!ebook) {
    notFound();
  }

  return <EbookDetailScreen ebook={ebook} />;
}
