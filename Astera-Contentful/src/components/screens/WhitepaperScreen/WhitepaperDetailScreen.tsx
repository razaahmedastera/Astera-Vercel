'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { Whitepaper } from '@/types/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, type Document } from '@contentful/rich-text-types';
import ContactUsHubSpotForm from '@/components/ui/HubSpotForm/ContactUsHubSpotForm';
import './WhitepaperScreen.css';

interface Props {
  whitepaper: Whitepaper;
}

function isRichTextDocument(description: Document | string): description is Document {
  return typeof description === 'object' && description !== null && 'nodeType' in description && description.nodeType === 'document';
}

function normalizeContent(content: any): any {
  if (!content || typeof content !== 'object' || !content.nodeType) return null;
  const normalized: any = { nodeType: content.nodeType, data: content.data || {} };
  if (content.content) {
    if (!Array.isArray(content.content)) return normalized;
    normalized.content = content.content
      .filter((node: any) => node && typeof node === 'object')
      .map((node: any) => {
        if (node.nodeType === 'text') return { nodeType: 'text', value: node.value || '', marks: node.marks || [], data: node.data || {} };
        return normalizeContent(node) || node;
      })
      .filter((node: any) => node !== null);
  }
  return normalized;
}

export default function WhitepaperDetailScreen({ whitepaper }: Props) {
  const router = useRouter();

  const renderOptions = {
    renderNode: {
      [BLOCKS.HEADING_2]: (_node: any, children: any) => <h2 className="wp-content-h2">{children}</h2>,
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => <p className="wp-content-p">{children}</p>,
      [BLOCKS.UL_LIST]: (_node: any, children: any) => <ul className="wp-content-ul">{children}</ul>,
      [BLOCKS.OL_LIST]: (_node: any, children: any) => <ol className="wp-content-ol">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (_node: any, children: any) => <li className="wp-content-li">{children}</li>,
    },
  };

  const handleFormSubmit = useCallback(() => {
    const pdfUrl = whitepaper.pdfUrl;
    if (pdfUrl) {
      let url = typeof pdfUrl === 'string' ? pdfUrl.trim() : '';
      if (url && !url.startsWith('http')) {
        url = url.startsWith('//') ? `https:${url}` : '';
      }
      if (url) {
        window.open(url, '_blank');
      }
    }
    setTimeout(() => {
      router.push(`/type/whitepaper/thank-you?title=${encodeURIComponent(whitepaper.title)}`);
    }, 500);
  }, [whitepaper.pdfUrl, whitepaper.title, router]);

  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    name: whitepaper.title,
    url: `${baseUrl}/type/whitepaper/${whitepaper.slug}`,
    datePublished: whitepaper.createdAt,
    dateModified: whitepaper.updatedAt,
    publisher: { '@type': 'Organization', name: 'Astera' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="wp-detail-page">
        <section className="wp-detail-hero">
          <div className="section-container">
            <div className="wp-detail-hero-layout">
              <div className="wp-detail-hero-text">
                <span className="wp-detail-label">Whitepaper</span>
                <h1 className="wp-detail-title">{whitepaper.title}</h1>
              </div>
              <div className="wp-detail-hero-visual">
                <div className="wp-cover-stack">
                  <div className="wp-cover-back"></div>
                  <div className="wp-cover-main">
                    <div className="wp-cover-badge">Whitepaper</div>
                    <div className="wp-cover-pattern"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="wp-detail-body">
          <div className="section-container">
            <div className="wp-detail-grid">
              <div className="wp-detail-content">
                {isRichTextDocument(whitepaper.description) ? (
                  <div className="wp-description">
                    {(() => {
                      try {
                        return documentToReactComponents(normalizeContent(whitepaper.description), renderOptions);
                      } catch {
                        return <p className="wp-content-p">Content could not be displayed.</p>;
                      }
                    })()}
                  </div>
                ) : (
                  <p className="wp-description">{whitepaper.description}</p>
                )}
              </div>

              <div className="wp-detail-sidebar">
                <div className="wp-form-card">
                  <div className="wp-form-header">
                    <h2 className="wp-form-title">Download this Whitepaper</h2>
                    <p className="wp-form-subtitle">Fill in your details to get instant access</p>
                  </div>
                  <ContactUsHubSpotForm
                    formId={whitepaper.hubspotFormId || '3e8efa89-ed65-4c01-9a0f-8d1c84cf5a7b'}
                    containerId="hubspot-whitepaper-form"
                    showLabels={false}
                    submitButtonAlign="center"
                    submitButtonFullWidth={true}
                    onFormSubmit={handleFormSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
