import NewsListScreen from '@/components/screens/NewsScreen/NewsListScreen';
import { getAllNewsPosts, getAllNewsEvents } from '@/lib/contentful/api';
import type { Metadata } from 'next';

export const revalidate = 60;

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
