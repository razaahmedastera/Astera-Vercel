import { HomeScreen } from '@/components/screens/HomeScreen';
import { getHomePageContent } from '@/lib/contentful';

export default async function Home() {
  const content = await getHomePageContent();

  return <HomeScreen content={content} />;
}

