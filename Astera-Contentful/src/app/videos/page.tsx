import VideoScreen from '@/components/screens/VideoScreen/VideoScreen';
import { getVideoPageContent } from '@/lib/contentful/api';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Videos - Astera',
  description: 'Watch the latest tutorials, product demos, customer testimonials, and data insights from Astera.',
  openGraph: {
    title: 'Videos - Astera',
    description: 'Watch the latest tutorials, product demos, customer testimonials, and data insights from Astera.',
  },
};

export default async function VideosPage() {
  const content = await getVideoPageContent();

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Video content coming soon.</p>
      </div>
    );
  }

  return <VideoScreen content={content} />;
}
