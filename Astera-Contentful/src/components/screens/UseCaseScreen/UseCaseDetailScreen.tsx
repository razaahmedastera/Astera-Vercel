'use client';

import { useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';
import ContactUsHubSpotForm from '@/components/ui/HubSpotForm/ContactUsHubSpotForm';
import type { UseCase } from '@/types/contentful';
import type { Document } from '@contentful/rich-text-types';
import './UseCaseDetailScreen.css';

interface Props {
  useCase: UseCase;
}

function isRichTextDocument(content: Document | string | undefined): content is Document {
  return (
    typeof content === 'object' &&
    content !== null &&
    'nodeType' in content &&
    content.nodeType === 'document'
  );
}

function normalizeContent(content: any): any {
  if (!content || typeof content !== 'object') return null;
  if (!content.nodeType) return null;

  const normalized: any = {
    nodeType: content.nodeType,
    data: content.data || {},
  };

  if (content.content) {
    if (!Array.isArray(content.content)) {
      return normalized;
    }

    normalized.content = content.content
      .filter((node: any) => node && typeof node === 'object')
      .map((node: any) => {
        if (node.nodeType === 'text') {
          return {
            nodeType: 'text',
            value: node.value || '',
            marks: node.marks || [],
            data: node.data || {},
          };
        }
        return normalizeContent(node) || node;
      })
      .filter((node: any) => node !== null);
  }

  return normalized;
}

export default function UseCaseDetailScreen({ useCase }: Props) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const rawContent = useCase.content as any;
  const contentData = rawContent ? normalizeContent(rawContent) : null;

  const hasRichText =
    contentData &&
    contentData.nodeType === 'document' &&
    Array.isArray(contentData.content) &&
    contentData.content.length > 0;

  const renderOptions = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <h2 className="use-case-content-h2">{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: any) => (
        <h3 className="use-case-content-h3">{children}</h3>
      ),
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
        <p className="use-case-content-p">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (node: any, children: any) => (
        <ul className="use-case-content-ul">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (node: any, children: any) => (
        <ol className="use-case-content-ol">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => (
        <li className="use-case-content-li">{children}</li>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = node.data.target;
        if (asset?.fields?.file?.url) {
          const url = asset.fields.file.url.startsWith('//')
            ? `https:${asset.fields.file.url}`
            : asset.fields.file.url.startsWith('http')
              ? asset.fields.file.url
              : `https:${asset.fields.file.url}`;

          const alt = asset.fields.title || asset.fields.description || '';

          return (
            <figure className="use-case-content-image-wrapper">
              <Image
                src={url}
                alt={alt}
                width={1200}
                height={675}
                className="use-case-content-image"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              {asset.fields.description && (
                <figcaption className="use-case-content-image-caption">
                  {asset.fields.description}
                </figcaption>
              )}
            </figure>
          );
        }
        return null;
      },
    },
    renderMark: {
      [MARKS.BOLD]: (text: any) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text: any) => <em>{text}</em>,
    },
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const hasStats = useCase.stats && useCase.stats.length > 0;
  const hasFeatures = useCase.features && useCase.features.length > 0;
  const hasHowItWorks = useCase.howItWorks && useCase.howItWorks.length > 0;
  const hasCapabilities = useCase.capabilities && useCase.capabilities.length > 0;
  const hasClientLogos = useCase.clientLogos && useCase.clientLogos.length > 0;
  const hasFaqs = useCase.faqs && useCase.faqs.length > 0;

  return (
    <>
      <div className="use-case-detail-page">
        {/* Hero Section */}
        <section className="use-case-detail-hero">
          <div className="section-container">
            <div className="use-case-detail-hero-content">
              <div className="use-case-detail-hero-text">
                <h1 className="use-case-detail-hero-title">{useCase.title}</h1>
                {useCase.heroDescription && (
                  <p className="use-case-detail-hero-description">{useCase.heroDescription}</p>
                )}
                {useCase.heroBulletPoints && useCase.heroBulletPoints.length > 0 && (
                  <ul className="use-case-detail-hero-bullets">
                    {useCase.heroBulletPoints.map((point, i) => (
                      <li key={i} className="use-case-detail-hero-bullet">
                        <svg className="use-case-hero-check" width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M16.667 5L7.5 14.167 3.333 10" stroke="#005CCC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="use-case-detail-hero-cta">
                  {useCase.heroCtaPrimaryText && (
                    <Link
                      href={useCase.heroCtaPrimaryUrl || '#'}
                      className="use-case-hero-btn-primary"
                    >
                      {useCase.heroCtaPrimaryText}
                    </Link>
                  )}
                  {useCase.heroCtaSecondaryText && (
                    <Link
                      href={useCase.heroCtaSecondaryUrl || '#'}
                      className="use-case-hero-btn-secondary"
                    >
                      {useCase.heroCtaSecondaryText}
                    </Link>
                  )}
                </div>
              </div>
              <div className="use-case-detail-hero-visual">
                {useCase.heroImage ? (
                  <Image
                    src={useCase.heroImage}
                    alt={useCase.title}
                    width={620}
                    height={420}
                    className="use-case-detail-hero-image"
                    priority
                    sizes="(max-width: 768px) 100vw, 620px"
                  />
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

        {/* Rich Text Content Section */}
        {hasRichText && (
          <section className="use-case-detail-content-section">
            <div className="section-container">
              <div className="use-case-detail-content-wrapper">
                {(() => {
                  try {
                    return documentToReactComponents(contentData, renderOptions);
                  } catch (error) {
                    console.error('Error rendering rich text content:', error);
                    return null;
                  }
                })()}
              </div>
            </div>
          </section>
        )}

        {/* Stats & Case Study Section */}
        {(hasStats || useCase.caseStudy) && (
          <section className="use-case-detail-stats">
            <div className="section-container">
              {(useCase.statsSectionBadge || useCase.statsSectionTitle) && (
                <div className="use-case-stats-header">
                  {useCase.statsSectionBadge && (
                    <span className="use-case-stats-label">{useCase.statsSectionBadge}</span>
                  )}
                  {useCase.statsSectionTitle && (
                    <h2 className="use-case-detail-section-title">
                      {useCase.statsSectionTitle}
                    </h2>
                  )}
                </div>
              )}

              {hasStats && (
                <div className="use-case-detail-stats-grid">
                  {useCase.stats.map((stat, index) => (
                    <div key={index} className="use-case-detail-stat-card">
                      <div className="use-case-detail-stat-accent"></div>
                      <div className="use-case-detail-stat-value">{stat.value}</div>
                      <div className="use-case-detail-stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {useCase.caseStudy && (
                <div className="use-case-benefits-vertical">
                  <p className="use-case-benefits-text">
                    &ldquo;{useCase.caseStudy.quote}&rdquo;
                  </p>
                  <p className="use-case-benefits-author">
                    — {useCase.caseStudy.author}, {useCase.caseStudy.company}
                  </p>
                  {useCase.caseStudy.link && useCase.caseStudy.link !== '#' && (
                    <Link href={useCase.caseStudy.link} className="use-case-benefits-cta">
                      Read the full case study here
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Features Section */}
        {hasFeatures && (
          <section className="use-case-detail-features">
            <div className="section-container">
              {useCase.featuresSectionTitle && (
                <h2 className="use-case-detail-section-title">
                  {useCase.featuresSectionTitle}
                </h2>
              )}
              {useCase.featuresDescription && (
                <p className="use-case-detail-features-description">
                  {useCase.featuresDescription}
                </p>
              )}
              <div className="use-case-detail-features-list">
                {useCase.features.map((feature, index) => (
                  <div key={index} className="use-case-detail-feature-item">
                    <div className="use-case-detail-feature-left">
                      <div className="use-case-detail-feature-icon">
                        {feature.iconImage ? (
                          <Image
                            src={feature.iconImage}
                            alt={feature.title}
                            width={64}
                            height={64}
                            className="feature-icon-image"
                          />
                        ) : (
                          <div className="feature-icon-placeholder">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#005CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <h3 className="use-case-detail-feature-title">{feature.title}</h3>
                      <p className="use-case-detail-feature-description">{feature.description}</p>
                    </div>
                    <div className="use-case-detail-feature-visual">
                      {feature.image ? (
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          width={500}
                          height={350}
                          className="feature-image"
                          loading="lazy"
                          sizes="(max-width: 1024px) 100vw, 500px"
                        />
                      ) : (
                        <div className="feature-visual-placeholder">
                          <div className="placeholder-box"></div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Banner */}
        {useCase.ctaBannerTitle && (
          <section className="use-case-detail-cta-banner">
            <div className="section-container">
              <div className="use-case-detail-cta-banner-content">
                <h2 className="use-case-detail-cta-banner-title">
                  {useCase.ctaBannerTitle}
                </h2>
                {useCase.ctaBannerButtonText && (
                  <Link
                    href={useCase.ctaBannerButtonUrl || '#'}
                    className="btn-primary use-case-detail-cta-banner-button"
                  >
                    {useCase.ctaBannerButtonText}
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {/* How It Works Section */}
        {hasHowItWorks && (
          <section className="use-case-detail-how-it-works">
            <div className="section-container">
              {useCase.howItWorksSectionTitle && (
                <h2 className="use-case-detail-section-title">
                  {useCase.howItWorksSectionTitle}
                </h2>
              )}
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

        {/* Key Capabilities Section */}
        {hasCapabilities && (
          <section className="use-case-detail-capabilities">
            <div className="section-container">
              {useCase.capabilitiesSectionTitle && (
                <h2 className="use-case-detail-section-title">
                  {useCase.capabilitiesSectionTitle}
                </h2>
              )}
              <div className="use-case-detail-capabilities-grid">
                {useCase.capabilities.map((capability, index) => (
                  <div key={index} className="use-case-detail-capability-card">
                    <div className="use-case-detail-capability-icon">
                      {capability.iconImage ? (
                        <Image
                          src={capability.iconImage}
                          alt={capability.title}
                          width={64}
                          height={64}
                          className="capability-icon-img"
                        />
                      ) : (
                        <div className="capability-icon-placeholder">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#005CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <h3 className="use-case-detail-capability-title">{capability.title}</h3>
                    <p className="use-case-detail-capability-description">{capability.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Client Logos Section */}
        {hasClientLogos && (
          <section className="use-case-detail-clients">
            <div className="section-container">
              {useCase.clientLogosSectionTitle && (
                <h2 className="use-case-detail-section-title">{useCase.clientLogosSectionTitle}</h2>
              )}
              <div className="use-case-detail-clients-logos">
                {useCase.clientLogos!.map((logo, i) => (
                  <div key={i} className="use-case-detail-client-logo">
                    {logo.image ? (
                      <Image
                        src={logo.image}
                        alt={logo.name}
                        width={150}
                        height={60}
                        className="client-logo-img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="client-logo-placeholder">{logo.name}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs Section */}
        {hasFaqs && (
          <section className="use-case-detail-faqs">
            <div className="section-container">
              <h2 className="use-case-detail-section-title">
                {useCase.faqsSectionTitle || 'FAQs'}
              </h2>
              <div className="use-case-detail-faq-list">
                {useCase.faqs.map((faq, index) => (
                  <div key={index} className="use-case-detail-faq-item">
                    <button
                      className="use-case-detail-faq-question"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={expandedFaq === index}
                    >
                      <span>{faq.question}</span>
                      <svg
                        className={`use-case-detail-faq-icon ${expandedFaq === index ? 'expanded' : ''}`}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                    {expandedFaq === index && (
                      <div className="use-case-detail-faq-answer">{faq.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Form Section */}
        {(useCase.contactFormTitle || useCase.hubspotFormId) && (
          <section className="use-case-detail-contact">
            <div className="section-container">
              <div className="use-case-detail-contact-wrapper">
                <div className="use-case-detail-contact-info">
                  {useCase.contactFormTitle && (
                    <h2 className="use-case-detail-contact-title">
                      {useCase.contactFormTitle}
                    </h2>
                  )}
                  {useCase.contactFormSubtitle && (
                    <p className="use-case-detail-contact-subtitle">
                      {useCase.contactFormSubtitle}
                    </p>
                  )}
                  {useCase.contactFormBenefits && useCase.contactFormBenefits.length > 0 && (
                    <ul className="use-case-detail-contact-benefits">
                      {useCase.contactFormBenefits.map((benefit, i) => (
                        <li key={i}>✓ {benefit}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="use-case-detail-contact-form">
                  {useCase.hubspotFormId && (
                    <ContactUsHubSpotForm
                      formId={useCase.hubspotFormId}
                      containerId="hubspot-usecase-form-container"
                      showLabels={true}
                      submitButtonAlign="right"
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
