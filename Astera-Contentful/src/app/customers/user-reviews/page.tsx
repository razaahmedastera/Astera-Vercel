import type { Metadata } from 'next';
import UserReviewsScreen from '@/components/screens/UserReviewsScreen/UserReviewsScreen';
import { getReviewPageSettings, getAllUserReviews } from '@/lib/contentful/api';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getReviewPageSettings();
  return {
    title: settings?.seoTitle || 'User Reviews | Astera',
    description:
      settings?.seoDescription ||
      'Read real customer reviews and testimonials about Astera data integration and management products.',
    openGraph: {
      title: settings?.seoTitle || 'User Reviews | Astera',
      description:
        settings?.seoDescription ||
        'Read real customer reviews and testimonials about Astera data integration and management products.',
      type: 'website',
      siteName: 'Astera',
    },
    alternates: { canonical: '/customers/user-reviews' },
  };
}

export default async function UserReviewsPage() {
  const [settings, reviews] = await Promise.all([
    getReviewPageSettings(),
    getAllUserReviews(),
  ]);

  return <UserReviewsScreen settings={settings} reviews={reviews} />;
}
