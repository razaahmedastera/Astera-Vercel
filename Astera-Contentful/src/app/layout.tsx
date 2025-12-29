import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Navigation } from '@/components/ui/Navigation';
import { Footer } from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Astera - AI-Powered Data Platform',
  description: 'Accelerate data prep, modeling, analytics, ETL and workflows with intelligent automation. Astera\'s agentic platform simplifies every step from raw data to real insight.',
  keywords: 'data management, AI data platform, ETL, data warehouse, data automation',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navigation />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

