'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContactUsHubSpotForm from '@/components/ui/HubSpotForm/ContactUsHubSpotForm';
import type { UseCase, UseCaseResource } from '@/types/contentful';
import './UseCaseDetailScreen.css';

interface Props {
  useCase: UseCase;
  resources?: UseCaseResource[];
}

function parseStatValue(value: string): { num: number; suffix: string; prefix: string } {
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { num: 0, suffix: value, prefix: '' };
  return { prefix: match[1], num: parseFloat(match[2]), suffix: match[3] };
}

function AnimatedStat({ value }: { value: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  const animate = useCallback(() => {
    if (animated.current) return;
    animated.current = true;
    const { prefix, num, suffix } = parseStatValue(value);
    if (num === 0) { setDisplay(value); return; }
    const isFloat = value.includes('.');
    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = num * eased;
      setDisplay(`${prefix}${isFloat ? current.toFixed(1) : Math.round(current)}${suffix}`);
      if (step >= steps) { clearInterval(timer); setDisplay(value); }
    }, interval);
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) animate(); }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return <div ref={ref} className="uc-stat-value">{display}</div>;
}

export default function UseCaseDetailScreen({ useCase, resources }: Props) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const hasStats = useCase.stats && useCase.stats.length > 0;
  const hasFeatures = useCase.features && useCase.features.length > 0;
  const hasHowItWorks = useCase.howItWorks && useCase.howItWorks.length > 0;
  const hasCapabilities = useCase.capabilities && useCase.capabilities.length > 0;
  const hasClientLogos = useCase.clientLogos && useCase.clientLogos.length > 0;
  const hasFaqs = useCase.faqs && useCase.faqs.length > 0;

  return (
    <div className="use-case-detail-page">
      {/* ─── Hero ─── */}
      <section className="use-case-detail-hero">
        <div className="section-container">
          <div className="use-case-detail-hero-content">
            <div className="use-case-detail-hero-text">
              {useCase.subtitle && <span className="use-case-detail-hero-badge">{useCase.subtitle}</span>}
              <h1 className="use-case-detail-hero-title">{useCase.title}</h1>
              {useCase.heroDescription && <p className="use-case-detail-hero-description">{useCase.heroDescription}</p>}
              {useCase.heroBulletPoints && useCase.heroBulletPoints.length > 0 && (
                <ul className="use-case-detail-hero-bullets">
                  {useCase.heroBulletPoints.map((point, i) => (
                    <li key={i} className="use-case-detail-hero-bullet">
                      <svg className="use-case-hero-check" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M16.667 5L7.5 14.167 3.333 10" stroke="#005CCC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="use-case-detail-hero-cta">
                {useCase.heroCtaPrimaryText && (
                  <Link href={useCase.heroCtaPrimaryUrl || '#'} className="use-case-hero-btn-primary">{useCase.heroCtaPrimaryText}</Link>
                )}
                {useCase.heroCtaSecondaryText && (
                  <Link href={useCase.heroCtaSecondaryUrl || '#'} className="use-case-hero-btn-secondary">{useCase.heroCtaSecondaryText}</Link>
                )}
              </div>
            </div>
            <div className="use-case-detail-hero-visual">
              {useCase.heroImage ? (
                <Image src={useCase.heroImage} alt={useCase.title} width={620} height={420} className="use-case-detail-hero-image" priority sizes="(max-width: 768px) 100vw, 620px" />
              ) : (
                <div className="use-case-detail-hero-diagram">
                  <div className="workflow-diagram">
                    <div className="workflow-node">Document</div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-node">AI Processing</div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-node">Output</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Features (3-column cards) ─── */}
      {hasFeatures && (
        <section className="use-case-detail-features">
          <div className="section-container">
            {(useCase.featuresSectionTitle || useCase.featuresDescription) && (
              <div className="uc-features-header">
                {useCase.featuresSectionTitle && <h2 className="uc-features-heading">{useCase.featuresSectionTitle}</h2>}
              </div>
            )}
            {useCase.featuresDescription && <p className="uc-features-subtitle">{useCase.featuresDescription}</p>}
            <div className="uc-features-grid">
              {useCase.features.map((feature, index) => (
                <div key={index} className="uc-feature-card">
                  <div className="uc-feature-icon">
                    {feature.iconImage ? (
                      <Image src={feature.iconImage} alt={feature.title} width={40} height={40} loading="lazy" />
                    ) : (
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <polyline points="22 4 12 14.01 9 11.01" />
                      </svg>
                    )}
                  </div>
                  <h3 className="uc-feature-title">{feature.title}</h3>
                  <p className="uc-feature-desc">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Stats (Blue Banner) ─── */}
      {hasStats && (
        <section className="use-case-detail-stats">
          <div className="section-container">
            {useCase.statsSectionTitle && <h2 className="uc-stats-title">{useCase.statsSectionTitle}</h2>}
            <div className="uc-stats-grid">
              {useCase.stats.map((stat, i) => (
                <div key={i} className="uc-stat-item">
                  <AnimatedStat value={stat.value} />
                  <div className="uc-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Case Study / Quote ─── */}
      {useCase.caseStudy && (
        <section className="use-case-detail-case-study-section">
          <div className="section-container">
            <div className="uc-case-study-inner">
              <p className="uc-case-study-quote">&ldquo;{useCase.caseStudy.quote}&rdquo;</p>
              <p className="uc-case-study-author">— {useCase.caseStudy.author}, {useCase.caseStudy.company}</p>
              {useCase.caseStudy.link && useCase.caseStudy.link !== '#' && (
                <Link href={useCase.caseStudy.link} className="uc-case-study-cta">
                  Read the full case study
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── How It Works ─── */}
      {hasHowItWorks && (
        <section className="use-case-detail-how-it-works">
          <div className="section-container">
            {useCase.howItWorksSectionTitle && <h2 className="uc-how-heading">{useCase.howItWorksSectionTitle}</h2>}
            <div className="use-case-detail-steps">
              {useCase.howItWorks.map((step) => (
                <div key={step.step} className="use-case-detail-step">
                  <div className="use-case-detail-step-number">{step.step}</div>
                  <h3 className="use-case-detail-step-title">{step.title}</h3>
                  <p className="use-case-detail-step-description">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Capabilities ─── */}
      {hasCapabilities && (
        <section className="use-case-detail-capabilities">
          <div className="section-container">
            {useCase.capabilitiesSectionTitle && <h2 className="uc-cap-heading">{useCase.capabilitiesSectionTitle}</h2>}
            <div className="use-case-detail-capabilities-grid">
              {useCase.capabilities.map((cap, i) => (
                <div key={i} className="use-case-detail-capability-card">
                  <div className="use-case-detail-capability-icon">
                    {cap.iconImage ? (
                      <Image src={cap.iconImage} alt={cap.title} width={56} height={56} className="capability-icon-img" />
                    ) : (
                      <div className="capability-icon-placeholder">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#005CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 17l10 5 10-5" />
                          <path d="M2 12l10 5 10-5" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <h3 className="use-case-detail-capability-title">{cap.title}</h3>
                  <p className="use-case-detail-capability-description">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Client Logos ─── */}
      {hasClientLogos && (
        <section className="use-case-detail-clients">
          <div className="section-container">
            {useCase.clientLogosSectionTitle && <h2 className="uc-clients-heading">{useCase.clientLogosSectionTitle}</h2>}
            <div className="use-case-detail-clients-logos">
              {useCase.clientLogos!.map((logo, i) => (
                <div key={i} className="use-case-detail-client-logo">
                  {logo.image ? (
                    <Image src={logo.image} alt={logo.name} width={140} height={56} className="client-logo-img" loading="lazy" />
                  ) : (
                    <span className="client-logo-placeholder">{logo.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQs ─── */}
      {hasFaqs && (
        <section className="use-case-detail-faqs">
          <div className="section-container">
            <h2 className="uc-faqs-heading">{useCase.faqsSectionTitle || 'Frequently Asked Questions'}</h2>
            <div className="use-case-detail-faq-list">
              {useCase.faqs.map((faq, index) => (
                <div key={index} className="use-case-detail-faq-item">
                  <button className="use-case-detail-faq-question" onClick={() => setExpandedFaq(expandedFaq === index ? null : index)} aria-expanded={expandedFaq === index}>
                    <span>{faq.question}</span>
                    <svg className={`use-case-detail-faq-icon ${expandedFaq === index ? 'expanded' : ''}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {expandedFaq === index && <div className="use-case-detail-faq-answer">{faq.answer}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA Banner ─── */}
      {useCase.ctaBannerTitle && (
        <section className="use-case-detail-cta-banner">
          <div className="section-container">
            <div className="use-case-detail-cta-banner-content">
              <h2 className="use-case-detail-cta-banner-title">{useCase.ctaBannerTitle}</h2>
              {useCase.contactFormTitle && <p className="use-case-detail-cta-banner-subtitle">{useCase.contactFormTitle}</p>}
              {useCase.ctaBannerButtonText && (
                <Link href={useCase.ctaBannerButtonUrl || '#'} className="use-case-detail-cta-banner-button">
                  {useCase.ctaBannerButtonText}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── Contact Form ─── */}
      {useCase.hubspotFormId && (
        <section className="use-case-detail-contact">
          <div className="section-container">
            <div className="use-case-detail-contact-wrapper">
              <div className="use-case-detail-contact-info">
                {useCase.contactFormTitle && <h2 className="use-case-detail-contact-title">{useCase.contactFormTitle}</h2>}
                {useCase.contactFormSubtitle && <p className="use-case-detail-contact-subtitle">{useCase.contactFormSubtitle}</p>}
                {useCase.contactFormBenefits && useCase.contactFormBenefits.length > 0 && (
                  <ul className="use-case-detail-contact-benefits">
                    {useCase.contactFormBenefits.map((b, i) => <li key={i}>✓ {b}</li>)}
                  </ul>
                )}
              </div>
              <div className="use-case-detail-contact-form">
                <ContactUsHubSpotForm formId={useCase.hubspotFormId} containerId="hubspot-usecase-form-container" showLabels={true} submitButtonAlign="right" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── Resources ─── */}
      {resources && resources.length > 0 && (
        <section className="uc-resources">
          <div className="section-container">
            <h2 className="uc-resources-heading">Resources</h2>
            <div className="uc-resources-grid">
              {resources.map((res, i) => (
                <Link key={i} href={res.url} className="uc-resource-card">
                  {res.image && (
                    <Image src={res.image} alt={res.title} width={400} height={180} className="uc-resource-image" loading="lazy" sizes="(max-width: 768px) 100vw, 400px" />
                  )}
                  <div className="uc-resource-body">
                    <span className="uc-resource-badge">{res.type}</span>
                    <h3 className="uc-resource-title">{res.title}</h3>
                    <span className="uc-resource-link">
                      Read
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
