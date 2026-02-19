import EbookListScreen from '@/components/screens/EbookScreen/EbookListScreen';
import { getAllEbooks } from '@/lib/contentful/api';

// ISR: Pages are cached for 1 hour, but webhooks can trigger instant revalidation
export const revalidate = 3600; // 1 hour fallback (webhooks handle instant updates)

export default async function EbookPage() {
  try {
    const ebooks = await getAllEbooks();
    console.log(`[EbookPage] Loaded ${ebooks.length} eBook(s)`);
    return <EbookListScreen ebooks={ebooks} />;
  } catch (error) {
    console.error('[EbookPage] Error fetching eBooks:', error);
    return <EbookListScreen ebooks={[]} />;
  }
}
