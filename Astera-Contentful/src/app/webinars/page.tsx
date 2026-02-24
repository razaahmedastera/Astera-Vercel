import WebinarListScreen from '@/components/screens/WebinarScreen/WebinarListScreen';
import { getAllWebinars } from '@/lib/contentful/api';

export const revalidate = 3600;

export const metadata = {
  title: 'Webinars | Astera',
  description: 'Expert-led webinars on data management, automation, and AI-powered solutions.',
};

export default async function WebinarsPage() {
  try {
    const webinars = await getAllWebinars();
    return <WebinarListScreen webinars={webinars} />;
  } catch (error) {
    console.error('[WebinarsPage] Error fetching webinars:', error);
    return <WebinarListScreen webinars={[]} />;
  }
}
