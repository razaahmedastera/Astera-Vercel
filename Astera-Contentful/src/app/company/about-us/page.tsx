import AboutUsScreen from '@/components/screens/AboutUsScreen/AboutUsScreen';
import { getAboutUsPageContent } from '@/lib/contentful/api';
import type { Metadata } from 'next';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutUsPageContent();
  return {
    title: data?.seoTitle || 'About Us | Astera',
    description:
      data?.seoDescription ||
      'Learn how Astera went from consultants in mortgage banking to a data management company. Our vision, story, and commitment to no-code data solutions.',
  };
}

export default async function AboutUsPage() {
  const data = await getAboutUsPageContent();

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-500">About Us content not found. Please add an entry in Contentful.</p>
      </div>
    );
  }

  return <AboutUsScreen data={data} />;
}
