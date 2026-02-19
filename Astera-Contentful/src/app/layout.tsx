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
  // Fetch products and industries server-side for Navigation (SSR)
  let products: ProductPageSummary[];
  let industries: Industry[];
  try {
    products = await getAllProductPages();
  } catch (error) {
    console.error('[Layout] Failed to fetch products for navigation:', error);
    // Continue with empty array - Navigation will handle gracefully
    products = [];
  }
  
  try {
    industries = await getAllIndustries();
  } catch (error) {
    console.error('[Layout] Failed to fetch industries for navigation:', error);
    industries = [];
  }

  return (
    <html lang="en" className={poppins.variable}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }} className={poppins.className}>
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

