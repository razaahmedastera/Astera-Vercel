import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyDetailScreen from '@/components/screens/CaseStudyScreen/CaseStudyDetailScreen';
import { getCaseStudyBySlug } from '@/lib/contentful/api';

export const dynamic = 'force-dynamic';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);

  if (!cs) return { title: 'Case Study Not Found | Astera' };

  const title = cs.seoTitle || `${cs.title} | Case Study | Astera`;
  const description = cs.seoDescription || cs.subtitle || '';

  return {
    title,
    description,
    openGraph: { title, description, type: 'article', siteName: 'Astera' },
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);

  if (!cs) notFound();

  return <CaseStudyDetailScreen caseStudy={cs} />;
}
