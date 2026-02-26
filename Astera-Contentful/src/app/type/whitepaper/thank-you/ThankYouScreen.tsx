'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import '@/components/screens/WhitepaperScreen/WhitepaperScreen.css';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || 'our whitepaper';

  return (
    <div className="wp-thankyou">
      <div className="wp-thankyou-card">
        <div className="wp-thankyou-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1 className="wp-thankyou-title">Thank You!</h1>
        <p className="wp-thankyou-text">
          Your download of <strong>{title}</strong> should begin automatically.
          If it doesn&apos;t, check your browser&apos;s popup blocker.
        </p>
        <div className="wp-thankyou-actions">
          <Link href="/whitepaper" className="wp-thankyou-btn wp-thankyou-btn--primary">
            Browse More Whitepapers
          </Link>
          <Link href="/" className="wp-thankyou-btn wp-thankyou-btn--secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouScreen() {
  return (
    <Suspense fallback={
      <div className="wp-thankyou">
        <div className="wp-thankyou-card">
          <h1 className="wp-thankyou-title">Thank You!</h1>
          <p className="wp-thankyou-text">Your download should begin automatically.</p>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
