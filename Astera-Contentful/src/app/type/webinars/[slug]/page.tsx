import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import WebinarDetailScreen from '@/components/screens/WebinarScreen/WebinarDetailScreen';
import { getWebinarBySlug } from '@/lib/contentful/api';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const webinar = await getWebinarBySlug(slug);

  if (!webinar) {
    return { title: 'Webinar Not Found' };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
  const seoTitle = webinar.seoTitle || `${webinar.title} | Astera Webinar`;
  const seoDescription = webinar.seoDescription || webinar.description?.substring(0, 160) || '';

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      type: 'article',
      title: seoTitle,
      description: seoDescription,
      url: `${baseUrl}/type/webinars/${webinar.slug}`,
      siteName: 'Astera',
      images: webinar.featuredImage ? [{ url: webinar.featuredImage, width: 1200, height: 630, alt: webinar.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: webinar.featuredImage ? [webinar.featuredImage] : [],
    },
    alternates: {
      canonical: `${baseUrl}/type/webinars/${webinar.slug}`,
    },
  };
}

export default async function WebinarDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const webinar = await getWebinarBySlug(slug);

  if (!webinar) {
    notFound();
  }

  return <WebinarDetailScreen webinar={webinar} />;
}
