import type { Metadata } from 'next';
import IntegrationScreen from '@/components/screens/IntegrationScreen/IntegrationScreen';

export const metadata: Metadata = {
  title: 'Connectors and Integrations | Astera Software',
  description: 'Build an integrated data ecosystem. Establish code-free connectivity with your enterprise applications, databases, and cloud applications.',
  alternates: {
    canonical: '/integration-solutions',
  },
};

export default function IntegrationSolutionsPage() {
  return <IntegrationScreen />;
}
