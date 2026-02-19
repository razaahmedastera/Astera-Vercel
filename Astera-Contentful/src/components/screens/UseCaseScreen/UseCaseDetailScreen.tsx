'use client';

import { useState } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import Image from 'next/image';
import ContactUsHubSpotForm from '@/components/ui/HubSpotForm/ContactUsHubSpotForm';
import type { UseCase } from '@/types/contentful';
import type { Document } from '@contentful/rich-text-types';
import './UseCaseDetailScreen.css';

interface Props {
  useCase?: UseCase;
}

// Mock data for detail page (fallback)
const mockUseCaseDetail: UseCase = {
  id: '1',
  slug: 'mortgage-data-extraction',
  title: 'Mortgage Document Processing in AI Mode: Be Fast, Accurate, and Effective.',
  subtitle: 'Automate your entire mortgage processing workflow with AI-powered document intelligence.',
  heroDescription: 'Transform your mortgage operations with intelligent document processing that reduces manual work and accelerates loan cycles.',
  heroImage: '/images/use-cases/mortgage-hero.jpg', // Image URL from Contentful
  stats: [
    { label: 'Reduction in loan cycle completion time', value: '22%' },
    { label: 'ROI in just 6 months', value: '6-to-1' },
    { label: 'Faster information extraction from documents', value: '37%' },
  ],
  benefits: 'Speed up time to revenue with deeper process automation. Our AI-powered solution ensures accuracy, compliance, and efficiency throughout your mortgage processing workflow.',
  featuresDescription: 'Our comprehensive solution empowers mortgage lenders to streamline operations, reduce processing times, and ensure regulatory compliance through intelligent automation and real-time insights.',
  features: [
    {
      title: 'Intelligent & Context-Aware Document Capture',
      description: 'Automatically identify and extract data from various mortgage documents with advanced AI recognition.',
      icon: 'document',
      iconImage: '/images/icons/document-capture-icon.svg', // Icon image from Contentful
      image: '/images/features/document-capture.jpg', // Feature image from Contentful
    },
    {
      title: 'Automated Validation & Compliance Checks',
      description: 'Ensure all documents meet regulatory requirements with automated validation processes.',
      icon: 'validation',
      iconImage: '/images/icons/validation-icon.svg', // Icon image from Contentful
      image: '/images/features/validation-compliance.jpg', // Feature image from Contentful
    },
    {
      title: 'Smart Workflow Automation',
      description: 'Streamline your mortgage processing with intelligent workflow automation.',
      icon: 'workflow',
      iconImage: '/images/icons/workflow-icon.svg', // Icon image from Contentful
      image: '/images/features/workflow-automation.jpg', // Feature image from Contentful
    },
    {
      title: 'Real-Time Analytics & Reporting',
      description: 'Monitor your mortgage processing performance with comprehensive analytics and reporting.',
      icon: 'analytics',
      iconImage: '/images/icons/analytics-icon.svg', // Icon image from Contentful
      image: '/images/features/analytics-reporting.jpg', // Feature image from Contentful
    },
    {
      title: 'Seamless System Integration',
      description: 'Integrate with your existing systems including CRMs, ERPs, and loan origination systems.',
      icon: 'integration',
      iconImage: '/images/icons/integration-icon.svg', // Icon image from Contentful
      image: '/images/features/system-integration.jpg', // Feature image from Contentful
    },
  ],
  howItWorks: [
    {
      step: 1,
      title: 'Ingest Documents',
      description: 'Upload mortgage documents through multiple channels including email, portal, or API.',
    },
    {
      step: 2,
      title: 'Extract & Validate Data',
      description: 'AI-powered extraction identifies and validates key information from documents automatically.',
    },
    {
      step: 3,
      title: 'Automate Workflows',
      description: 'Automated workflows route documents, trigger approvals, and update systems seamlessly.',
    },
  ],
  capabilities: [
    {
      title: 'Intelligent Document Recognition',
      description: 'Automatically identify document types and extract relevant information.',
      icon: 'recognition',
    },
    {
      title: 'Automated Data Extraction',
      description: 'Extract structured data from unstructured documents with high accuracy.',
      icon: 'extraction',
    },
    {
      title: 'Advanced Data Validation',
      description: 'Validate extracted data against business rules and compliance requirements.',
      icon: 'validation',
    },
    {
      title: 'Smart Workflow Automation',
      description: 'Automate complex business processes with intelligent workflow orchestration.',
      icon: 'workflow',
    },
    {
      title: 'Seamless System Integration',
      description: 'Connect with your existing systems through pre-built connectors and APIs.',
      icon: 'integration',
    },
    {
      title: 'Real-Time Analytics & Reporting',
      description: 'Gain insights into your processing performance with real-time dashboards.',
      icon: 'analytics',
    },
  ],
  integrations: [
    'Salesforce',
    'SAP',
    'Oracle',
    'Microsoft Dynamics',
    'Contentful',
    'HubSpot',
    'Workday',
    'ServiceNow',
  ],
  caseStudy: {
    quote: 'Overall, the project met and surpassed all of its goals, including major productivity increases, considerably shorter lead time to integrate new business partners, and improved data quality. What once took 20 people to accomplish now takes one person. The time for onboarding new partners has been cut from 3-4 weeks to less than one week.',
    author: 'Harley Hess',
    company: 'Financial Services',
    link: '#',
  },
  faqs: [
    {
      question: 'How does AI-powered document processing work?',
      answer: 'Our AI system uses advanced machine learning algorithms to recognize, extract, and validate data from mortgage documents automatically.',
    },
    {
      question: 'What types of documents can be processed?',
      answer: 'We support a wide range of mortgage documents including applications, income statements, tax returns, property appraisals, and more.',
    },
    {
      question: 'How accurate is the data extraction?',
      answer: 'Our AI-powered extraction achieves over 95% accuracy, with automated validation ensuring data quality.',
    },
    {
      question: 'Can it integrate with our existing systems?',
      answer: 'Yes, our platform offers pre-built connectors for popular systems and APIs for custom integrations.',
    },
    {
      question: 'What is the implementation timeline?',
      answer: 'Typical implementation takes 4-6 weeks, depending on your specific requirements and integrations.',
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Helper function to check if content is a Rich Text Document
function isRichTextDocument(content: Document | string | undefined): content is Document {
  return (
    typeof content === 'object' &&
    content !== null &&
    'nodeType' in content &&
    content.nodeType === 'document'
  );
}

// Normalize content structure to match Contentful's expected format
function normalizeContent(content: any): any {
  if (!content || typeof content !== 'object') return null;
  
  if (!content.nodeType) return null;
  
  // Ensure data property exists
  const normalized: any = {
    nodeType: content.nodeType,
    data: content.data || {},
  };
  
  // Handle content array
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
        // Recursively normalize nested nodes
        return normalizeContent(node) || node;
      })
      .filter((node: any) => node !== null);
  }
  
  return normalized;
}

export default function UseCaseDetailScreen({ useCase }: Props) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Use Contentful data or fallback to mock data
  const useCaseData = useCase || mockUseCaseDetail;

  // Normalize content to ensure it matches Contentful's expected format
  const rawContent = useCaseData.content as any;
  const contentData = rawContent ? normalizeContent(rawContent) : null;
  
  const hasRichText = 
    contentData && 
    contentData.nodeType === 'document' && 
    Array.isArray(contentData.content) && 
    contentData.content.length > 0;

  // Render options for Rich Text
  const renderOptions = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node: any, children: any) => {
        return <h2 className="use-case-content-h2">{children}</h2>;
      },
      [BLOCKS.HEADING_3]: (node: any, children: any) => {
        return <h3 className="use-case-content-h3">{children}</h3>;
      },
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return <p className="use-case-content-p">{children}</p>;
      },
      [BLOCKS.UL_LIST]: (node: any, children: any) => {
        return <ul className="use-case-content-ul">{children}</ul>;
      },
      [BLOCKS.OL_LIST]: (node: any, children: any) => {
        return <ol className="use-case-content-ol">{children}</ol>;
      },
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
        return <li className="use-case-content-li">{children}</li>;
      },
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

  if (!useCaseData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="use-case-detail-page">
      {/* Hero Section */}
      <section className="use-case-detail-hero">
        <div className="section-container">
          <div className="use-case-detail-hero-content">
            <div className="use-case-detail-hero-text">
              <h1 className="use-case-detail-hero-title">{useCaseData.title}</h1>
              <p className="use-case-detail-hero-subtitle">{useCaseData.subtitle}</p>
              <div className="use-case-detail-hero-cta">
                <button className="btn-primary">Request a Demo</button>
                <button className="btn-secondary">Learn More</button>
              </div>
            </div>
            <div className="use-case-detail-hero-visual">
              {useCaseData.heroImage ? (
                <img 
                  src={useCaseData.heroImage} 
                  alt={useCaseData.title}
                  className="use-case-detail-hero-image"
                />
              ) : (
                <div className="use-case-detail-hero-diagram">
                  {/* Placeholder for workflow diagram */}
                  <div className="workflow-diagram">
                    <div className="workflow-node">Document</div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-node">AI Processing</div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-node">Database</div>
                    <div className="workflow-arrow">→</div>
                    <div className="workflow-node">Cloud</div>
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
                  console.error('Error rendering rich text content:', error, contentData);
                  return <div className="text-red-500">Error rendering content. Check console.</div>;
                }
              })()}
            </div>
          </div>
        </section>
      )}

      {/* Case Study Stats Section */}
      <section className="use-case-detail-stats">
        <div className="section-container">
          <div className="use-case-stats-header">
            <span className="use-case-stats-label">Results & Impact</span>
            <h2 className="use-case-detail-section-title">
              Speed Up Time to Revenue with Deeper Process Automation.
            </h2>
          </div>
          <div className="use-case-detail-stats-grid">
            {(useCaseData.stats || []).map((stat, index) => (
              <div key={index} className="use-case-detail-stat-card">
                <div className="use-case-detail-stat-accent"></div>
                <div className="use-case-detail-stat-value">{stat.value}</div>
                <div className="use-case-detail-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Case Study Highlight — Vertical Centered */}
          {useCaseData.caseStudy && (
            <div className="use-case-benefits-vertical">
              <p className="use-case-benefits-text">
                &ldquo;{useCaseData.caseStudy.quote}&rdquo;
              </p>
              <p className="use-case-benefits-author">
                — {useCaseData.caseStudy.author}, {useCaseData.caseStudy.company}
              </p>
              <a href={useCaseData.caseStudy.link} className="use-case-benefits-cta">
                Read the full case study here
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="use-case-detail-features">
        <div className="section-container">
          <h2 className="use-case-detail-section-title">
            Achieve Flawless Mortgage Approvals Seamlessly & Efficiently in Real-Time.
          </h2>
          {useCaseData.featuresDescription && (
            <p className="use-case-detail-features-description">
              {useCaseData.featuresDescription}
            </p>
          )}
          <div className="use-case-detail-features-list">
            {(useCaseData.features || []).map((feature, index) => (
              <div key={index} className="use-case-detail-feature-item">
                <div className="use-case-detail-feature-left">
                  <div className="use-case-detail-feature-icon">
                    {feature.iconImage ? (
                      <img 
                        src={feature.iconImage} 
                        alt={feature.title}
                        className="feature-icon-image"
                      />
                    ) : (
                      <div className="feature-icon-placeholder">
                        {feature.icon === 'document' && '📄'}
                        {feature.icon === 'validation' && '✓'}
                        {feature.icon === 'workflow' && '⚙️'}
                        {feature.icon === 'analytics' && '📊'}
                        {feature.icon === 'integration' && '🔗'}
                      </div>
                    )}
                  </div>
                  <h3 className="use-case-detail-feature-title">{feature.title}</h3>
                  <p className="use-case-detail-feature-description">{feature.description}</p>
                </div>
                <div className="use-case-detail-feature-visual">
                  {feature.image ? (
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="feature-image"
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

      {/* CTA Banner */}
      <section className="use-case-detail-cta-banner">
        <div className="section-container">
          <div className="use-case-detail-cta-banner-content">
            <h2 className="use-case-detail-cta-banner-title">
              Ready to accelerate your mortgage processing by automating data extraction and validation from documents?
            </h2>
            <button className="btn-primary use-case-detail-cta-banner-button">Request a Demo</button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="use-case-detail-how-it-works">
        <div className="section-container">
          <h2 className="use-case-detail-section-title">
            How Astera Content-Driven Document Processing Works
          </h2>
          <div className="use-case-detail-steps">
            {(useCaseData.howItWorks || []).map((step) => (
              <div key={step.step} className="use-case-detail-step">
                <div className="use-case-detail-step-number">{step.step}</div>
                <h3 className="use-case-detail-step-title">{step.title}</h3>
                <p className="use-case-detail-step-description">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Capabilities Section */}
      <section className="use-case-detail-capabilities">
        <div className="section-container">
          <h2 className="use-case-detail-section-title">
            Key Capabilities of Astera Content-Driven Document Processing
          </h2>
          <div className="use-case-detail-capabilities-grid">
            {(useCaseData.capabilities || []).map((capability, index) => (
              <div key={index} className="use-case-detail-capability-card">
                <div className="use-case-detail-capability-icon">
                  <div className="capability-icon-placeholder">
                    {capability.icon === 'recognition' && '👁️'}
                    {capability.icon === 'extraction' && '📥'}
                    {capability.icon === 'validation' && '✓'}
                    {capability.icon === 'workflow' && '⚙️'}
                    {capability.icon === 'integration' && '🔗'}
                    {capability.icon === 'analytics' && '📊'}
                  </div>
                </div>
                <h3 className="use-case-detail-capability-title">{capability.title}</h3>
                <p className="use-case-detail-capability-description">{capability.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <section className="use-case-detail-clients">
        <div className="section-container">
          <h2 className="use-case-detail-section-title">Trusted by leading clients like you</h2>
          <div className="use-case-detail-clients-logos">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="use-case-detail-client-logo">
                <div className="client-logo-placeholder">Client {i}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="use-case-detail-faqs">
        <div className="section-container">
          <h2 className="use-case-detail-section-title">FAQs</h2>
          <div className="use-case-detail-faq-list">
            {(useCaseData.faqs || []).map((faq, index) => (
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

      {/* Contact Form Section */}
      <section className="use-case-detail-contact">
        <div className="section-container">
          <div className="use-case-detail-contact-wrapper">
            <div className="use-case-detail-contact-info">
              <h2 className="use-case-detail-contact-title">
                Ready to automate your Mortgage Document Processing?
              </h2>
              <p className="use-case-detail-contact-subtitle">
                Request a demo and see how our solution can transform your operations.
              </p>
              <ul className="use-case-detail-contact-benefits">
                <li>✓ Accelerate loan cycles</li>
                <li>✓ Reduce manual errors</li>
                <li>✓ Improve compliance</li>
                <li>✓ Enhance customer experience</li>
              </ul>
            </div>
            <div className="use-case-detail-contact-form">
              <ContactUsHubSpotForm
                formId="57530c31-b16f-40c9-947f-baeac0891a2f"
                containerId="hubspot-usecase-form-container"
                showLabels={true}
                submitButtonAlign="right"
              />
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
