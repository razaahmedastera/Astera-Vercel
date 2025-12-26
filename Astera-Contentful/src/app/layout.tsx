import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Navigation } from '@/components/ui/Navigation';

export const metadata: Metadata = {
  title: 'Astera Web',
  description: 'Enterprise Next.js Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}

