import dynamic from 'next/dynamic';
import { getAllNewsPosts, getAllNewsEvents } from '@/lib/contentful/api';
import type { Metadata } from 'next';

const NewsListScreen = dynamic(
  () => import('@/components/screens/NewsScreen/NewsListScreen'),
  { loading: () => <div className="min-h-screen" /> }
);

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'News & Events | Astera',
  description:
    'Read about the most recent product launches, media coverage, and events from Astera.',
};

export default async function NewsPage() {
  const [posts, events] = await Promise.all([
    getAllNewsPosts().catch(() => []),
    getAllNewsEvents().catch(() => []),
  ]);

  return <NewsListScreen posts={posts} events={events} />;
}
