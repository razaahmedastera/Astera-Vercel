import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TrialScreen from '@/components/screens/TrialScreen/TrialScreen';
import ThankYouScreen from '@/components/screens/ThankYouScreen/ThankYouScreen';
import {
  getAllTrialDemoPages,
  getTrialDemoPageBySlug,
  getAllThankYouPages,
  getThankYouPageBySlug,
} from '@/lib/contentful/api';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const [trialPages, thankYouPages] = await Promise.all([
    getAllTrialDemoPages(),
    getAllThankYouPages(),
  ]);

  return [
    ...trialPages.map((p) => ({ slug: p.slug })),
    ...thankYouPages.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const trialContent = await getTrialDemoPageBySlug(slug);
  if (trialContent) {
    const title =
      trialContent.seoTitle ||
      `${trialContent.productName} ${trialContent.pageType === 'trial' ? 'Free Trial' : 'Demo'} | Astera`;
    const description = trialContent.seoDescription || trialContent.description;
    return { title, description, openGraph: { title, description, type: 'website', siteName: 'Astera' } };
  }

  const tyContent = await getThankYouPageBySlug(slug);
  if (tyContent) {
    const title = tyContent.seoTitle || `Thank You | ${tyContent.productName} | Astera`;
    const description = tyContent.seoDescription || tyContent.description;
    return { title, description, openGraph: { title, description, type: 'website', siteName: 'Astera' } };
  }

  return {};
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;

  const trialContent = await getTrialDemoPageBySlug(slug);
  if (trialContent) {
    return <TrialScreen content={trialContent} />;
  }

  const tyContent = await getThankYouPageBySlug(slug);
  if (tyContent) {
    return <ThankYouScreen content={tyContent} />;
  }

  notFound();
}
