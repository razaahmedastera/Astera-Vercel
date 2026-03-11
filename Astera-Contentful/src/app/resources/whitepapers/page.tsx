import WhitepaperListScreen from '@/components/screens/WhitepaperScreen/WhitepaperListScreen';
import { getAllWhitepapers } from '@/lib/contentful/api';
import type { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Whitepapers - Astera',
  description: 'Explore in-depth whitepapers on data management, integration, and analytics from Astera.',
};

export default async function WhitepapersPage() {
  try {
    const whitepapers = await getAllWhitepapers();
    return <WhitepaperListScreen whitepapers={whitepapers} />;
  } catch (error) {
    console.error('[WhitepapersPage] Error:', error);
    return <WhitepaperListScreen whitepapers={[]} />;
  }
}
