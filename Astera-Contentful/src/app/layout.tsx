import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Suspense } from 'react';
import '@/styles/globals.css';
import { Header } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';
import { getAllProductPages, getAllIndustries } from '@/lib/contentful/api';
import type { ProductPageSummary, Industry } from '@/types/contentful';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: 'Astera - AI-Powered Data Platform',
  description: 'Accelerate data prep, modeling, analytics, ETL and workflows with intelligent automation. Astera\'s agentic platform simplifies every step from raw data to real insight.',
  keywords: 'data management, AI data platform, ETL, data warehouse, data automation',
  openGraph: {
    title: 'Astera - AI-Powered Data Platform',
    description: 'Accelerate data prep, modeling, analytics, ETL and workflows with intelligent automation.',
    type: 'website',
    siteName: 'Astera',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#005CCC',
};

function NavFallback() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-gray-200 py-3 sm:py-4 shadow-sm bg-white">
      <div className="section-container flex items-center h-10">
        <div className="h-8 w-28 bg-gray-100 rounded animate-pulse" />
      </div>
    </header>
  );
}

async function NavigationWrapper() {
  let products: ProductPageSummary[] = [];
  let industries: Industry[] = [];

  try {
    [products, industries] = await Promise.all([
      getAllProductPages().catch(() => [] as ProductPageSummary[]),
      getAllIndustries().catch(() => [] as Industry[]),
    ]);
  } catch {
    // renders with empty arrays
  }

  return <Header products={products} industries={industries} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preload" href="/lottie/headerv2.json" as="fetch" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.ctfassets.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.contentful.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://js.hsforms.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.astera.com" />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
      </head>
      <body className={`${poppins.className} flex flex-col min-h-screen`}>
        <Suspense fallback={<NavFallback />}>
          <NavigationWrapper />
        </Suspense>
        <main className="flex-1 pt-12 sm:pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
