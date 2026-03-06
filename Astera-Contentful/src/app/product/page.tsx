import { redirect } from 'next/navigation';

type ProductPageProps = {
  searchParams?: Promise<{ slug?: string }>;
};

export default async function ProductRedirect({ searchParams }: ProductPageProps) {
  const rawSlug = searchParams ? (await searchParams).slug : undefined;
  const slug = (rawSlug || '').trim();

  if (slug) {
    redirect(`/products/${slug}`);
  }

  redirect('/products/reportminer');
}
