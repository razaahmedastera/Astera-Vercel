import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Suspense } from 'react';
import '@/styles/globals.css';
import { Header } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { getAllProductPages, getAllIndustries } from '@/lib/contentful/api';
import type { ProductPageSummary, Industry } from '@/types/contentful';
import { RouterHandler } from '@/components/RouterHandler';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Astera - AI-Powered Data Platform',
  description: 'Accelerate data prep, modeling, analytics, ETL and workflows with intelligent automation. Astera\'s agentic platform simplifies every step from raw data to real insight.',
  keywords: 'data management, AI data platform, ETL, data warehouse, data automation',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let products: ProductPageSummary[] = [];
  let industries: Industry[] = [];

  try {
    [products, industries] = await Promise.all([
      getAllProductPages().catch(() => [] as ProductPageSummary[]),
      getAllIndustries().catch(() => [] as Industry[]),
    ]);
  } catch {
    // Navigation will render gracefully with empty arrays
  }

  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} flex flex-col min-h-screen`}>
        <RouterHandler />
        <Suspense fallback={<div style={{ height: '64px' }} />}>
          <Header products={products} industries={industries} />
        </Suspense>
        <main className="flex-1 pt-12 sm:pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

