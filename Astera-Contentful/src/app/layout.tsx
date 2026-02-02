import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Suspense } from 'react';
import '@/styles/globals.css';
import { Header } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { getAllProductPages } from '@/lib/contentful/api';
import type { ProductPageSummary } from '@/types/contentful';

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
  viewport: 'width=device-width, initial-scale=1',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch products server-side for Navigation (SSR)
  let products: ProductPageSummary[];
  try {
    products = await getAllProductPages();
  } catch (error) {
    console.error('[Layout] Failed to fetch products for navigation:', error);
    // Continue with empty array - Navigation will handle gracefully
    products = [];
  }

  return (
    <html lang="en" className={poppins.variable}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className={poppins.className}>
        <Suspense fallback={<div style={{ height: '64px' }} />}>
          <Header products={products} />
        </Suspense>
        <main className="flex-1 pt-12 sm:pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

