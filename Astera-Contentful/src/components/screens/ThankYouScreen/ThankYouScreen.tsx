'use client';

import { useEffect, useRef } from 'react';
import type { ThankYouPage } from '@/types/contentful';
import './ThankYouScreen.css';

const ICON_MAP: Record<string, React.ReactNode> = {
  phone: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  email: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  location: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  support: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
};

interface ThankYouScreenProps {
  content: ThankYouPage;
}

export default function ThankYouScreen({ content }: ThankYouScreenProps) {
  const downloadTriggered = useRef(false);

  useEffect(() => {
    if (content.downloadUrl && !downloadTriggered.current) {
      downloadTriggered.current = true;

      const timer = setTimeout(() => {
        const link = document.createElement('a');
        link.href = content.downloadUrl!;
        if (content.downloadFilename) {
          link.download = content.downloadFilename;
        }
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [content.downloadUrl, content.downloadFilename]);

  return (
    <div>
      {/* Hero */}
      <section className="ty-hero py-16 sm:py-20 lg:py-28">
        <div className="section-container relative z-10 max-w-2xl mx-auto">
          <div className="ty-check-circle">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0f1c2e] leading-[3.5rem] mb-4">
            {content.heading}
          </h1>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-lg mx-auto mb-10">
            {content.description}
          </p>

          {content.downloadUrl && (
            <p className="text-sm text-gray-400">
              Your download should start automatically. If not,{' '}
              <a
                href={content.downloadUrl}
                download={content.downloadFilename || true}
                className="text-[#7c3aed] underline hover:text-[#6d28d9]"
              >
                click here
              </a>.
            </p>
          )}
        </div>
      </section>

      {/* Next Steps */}
      {content.nextSteps.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="section-container max-w-2xl mx-auto">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#0f1c2e] mb-12">
              What happens next?
            </h2>
            <div className="space-y-8">
              {content.nextSteps.map((step, i) => (
                <div key={step.title} className="ty-step">
                  <div className="ty-step-num">{i + 1}</div>
                  <div>
                    <h3 className="text-base font-semibold text-[#0f1c2e] mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Info */}
      {content.contactCards.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#f8fafc]">
          <div className="section-container">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#0f1c2e] mb-3">
              Need help sooner?
            </h2>
            <p className="text-center text-sm text-gray-500 mb-12 max-w-md mx-auto">
              Reach out between 8:30am and 5:30pm Pacific time
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {content.contactCards.map((card) => (
                <div key={card.title} className="ty-info-card">
                  <div className={`ty-info-icon ${card.icon}`}>
                    {ICON_MAP[card.icon] || ICON_MAP.support}
                  </div>
                  <h3 className="text-base font-bold text-[#0f1c2e] mb-2">{card.title}</h3>
                  {card.lines.map((line) => (
                    <p key={line} className="text-sm text-gray-500 leading-relaxed">{line}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
