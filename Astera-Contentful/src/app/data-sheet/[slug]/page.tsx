import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DatasheetDetailScreen from '@/components/screens/DatasheetScreen/DatasheetDetailScreen';
import { getDatasheetBySlug } from '@/lib/contentful/api';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ds = await getDatasheetBySlug(slug);

  if (!ds) return { title: 'Data Sheet Not Found' };

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  return {
    title: ds.seoTitle || `${ds.title} | Astera Data Sheet`,
    description: ds.seoDescription || (typeof ds.description === 'string' ? ds.description.substring(0, 160) : ''),
    openGraph: {
      type: 'article',
      title: ds.seoTitle || ds.title,
      description: ds.seoDescription || '',
      url: `${baseUrl}/data-sheet/${ds.slug}`,
      siteName: 'Astera',
      images: ds.ogImage ? [{ url: ds.ogImage, width: 1200, height: 630, alt: ds.title }] : [],
    },
    alternates: {
      canonical: `${baseUrl}/data-sheet/${ds.slug}`,
    },
  };
}

export default async function DataSheetDetailPage({ params }: Props) {
  const { slug } = await params;
  const ds = await getDatasheetBySlug(slug);

  if (!ds) notFound();

  return <DatasheetDetailScreen datasheet={ds} />;
}
