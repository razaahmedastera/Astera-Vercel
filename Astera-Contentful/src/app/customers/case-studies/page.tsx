import type { Metadata } from 'next';
import CaseStudyListScreen from '@/components/screens/CaseStudyScreen/CaseStudyListScreen';
import { getAllCaseStudies } from '@/lib/contentful/api';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Case Studies | Astera',
  description: 'Read customer success stories and learn how leading organizations use Astera to transform their data operations.',
  openGraph: {
    title: 'Case Studies | Astera',
    description: 'Read customer success stories and learn how leading organizations use Astera to transform their data operations.',
    type: 'website',
    siteName: 'Astera',
  },
};

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();
  return <CaseStudyListScreen caseStudies={caseStudies} />;
}
