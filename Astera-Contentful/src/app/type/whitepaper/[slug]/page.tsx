import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import WhitepaperDetailScreen from '@/components/screens/WhitepaperScreen/WhitepaperDetailScreen';
import { getWhitepaperBySlug } from '@/lib/contentful/api';

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wp = await getWhitepaperBySlug(slug);

  if (!wp) return { title: 'Whitepaper Not Found' };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  return {
    title: wp.seoTitle || `${wp.title} | Astera Whitepaper`,
    description: wp.seoDescription || (typeof wp.description === 'string' ? wp.description.substring(0, 160) : ''),
    openGraph: {
      type: 'article',
      title: wp.seoTitle || wp.title,
      description: wp.seoDescription || '',
      url: `${baseUrl}/type/whitepaper/${wp.slug}`,
      siteName: 'Astera',
      images: wp.ogImage ? [{ url: wp.ogImage, width: 1200, height: 630, alt: wp.title }] : [],
    },
    alternates: {
      canonical: `${baseUrl}/type/whitepaper/${wp.slug}`,
    },
  };
}

export default async function WhitepaperDetailPage({ params }: Props) {
  const { slug } = await params;
  const wp = await getWhitepaperBySlug(slug);

  if (!wp) notFound();

  return <WhitepaperDetailScreen whitepaper={wp} />;
}
