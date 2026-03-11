'use client';

import Link from 'next/link';
import ContactUsHubSpotForm from '@/components/ui/HubSpotForm/ContactUsHubSpotForm';
import './ContactCenterpriseScreen.css';

const BULLETS = [
  'Build no-code + AI-powered pipelines',
  'Natural language support',
  'CDC and scheduling built-in',
  'Unified data sources',
];

const CTA_CARDS = [
  {
    icon: 'sales' as const,
    title: 'Talk to sales',
    description:
      'See how ADP builds AI-powered pipelines for consolidation, migration, and more.',
    linkText: 'Book a demo',
    linkUrl: '/astera-centerprise-demo',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    icon: 'support' as const,
    title: 'Get technical help',
    description:
      'Have a question about modeling, CDC, or connectors? We\'ll route you to an engineer.',
    linkText: 'Contact support',
    linkUrl: 'mailto:support@astera.com',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    icon: 'docs' as const,
    title: 'Explore docs',
    description:
      'Read how to generate pipelines from models or natural language, and deploy in minutes.',
    linkText: 'Open documentation',
    linkUrl: 'https://documentation.astera.com/',
    svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
];

export default function ContactCenterpriseScreen() {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="ccp-hero py-[70px] pb-16 sm:pb-20 lg:pb-24">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left */}
            <div className="pt-4 lg:pt-8">
              <div className="ccp-badge">Astera Centerprise</div>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold leading-[4.5rem] mb-5 text-[#0f1c2e]">
                We&rsquo;re here to help you build pipelines fast
              </h1>
              <p className="text-base sm:text-lg leading-relaxed text-gray-600 max-w-lg mb-2">
                Centerprise uses AI to accelerate your data movement, so you can deliver a single, scalable source of truth in days, not months.
              </p>
              <div className="ccp-bullets">
                {BULLETS.map((b) => (
                  <div key={b} className="ccp-bullet">
                    <span className="ccp-bullet-dot" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="ccp-form-card p-6 sm:p-8 lg:p-10">
              <ContactUsHubSpotForm
                formId="3547a3b1-b676-416a-a4f9-277fcb7c594e"
                containerId="ccp-hubspot-form"
                showLabels={false}
                submitButtonAlign="center"
                submitButtonFullWidth={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA Cards ─── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {CTA_CARDS.map((card) => (
              <div key={card.title} className="ccp-cta-card">
                <div className={`ccp-cta-icon ${card.icon}`}>{card.svg}</div>
                <h3 className="text-base font-bold text-[#0f1c2e] mb-2">{card.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{card.description}</p>
                {card.linkUrl.startsWith('http') || card.linkUrl.startsWith('mailto') ? (
                  <a
                    href={card.linkUrl}
                    className="ccp-cta-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {card.linkText}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                ) : (
                  <Link href={card.linkUrl} className="ccp-cta-link">
                    {card.linkText}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
