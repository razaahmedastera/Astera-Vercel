import { ProductScreen } from '@/components/screens/ProductScreen';
import { getProductPageContent } from '@/lib/contentful';

export default async function ProductPage() {
  const content = await getProductPageContent();

  return <ProductScreen content={content} />;
}


