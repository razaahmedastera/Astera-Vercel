'use client';

import { useCallback } from 'react';
import type { Datasheet } from '@/types/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, type Document } from '@contentful/rich-text-types';
import ContactUsHubSpotForm from '@/components/ui/HubSpotForm/ContactUsHubSpotForm';
import './DatasheetScreen.css';

interface Props {
  datasheet: Datasheet;
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

export default function DatasheetDetailScreen({ datasheet }: Props) {
  const renderOptions = {
    renderNode: {
      [BLOCKS.HEADING_2]: (_node: any, children: any) => <h2 className="ds-content-h2">{children}</h2>,
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => <p className="ds-content-p">{children}</p>,
      [BLOCKS.UL_LIST]: (_node: any, children: any) => <ul className="ds-content-ul">{children}</ul>,
      [BLOCKS.OL_LIST]: (_node: any, children: any) => <ol className="ds-content-ol">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (_node: any, children: any) => <li className="ds-content-li">{children}</li>,
    },
  };

  const handleFormSubmit = useCallback(() => {
    const pdfUrl = datasheet.pdfUrl;
    if (pdfUrl) {
      let url = typeof pdfUrl === 'string' ? pdfUrl.trim() : '';
      if (url && !url.startsWith('http')) {
        url = url.startsWith('//') ? `https:${url}` : '';
      }
      if (url) {
        window.open(url, '_blank');
      }
    }
  }, [datasheet.pdfUrl]);

  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    name: datasheet.title,
    url: `${baseUrl}/type/data-sheet/${datasheet.slug}`,
    datePublished: datasheet.createdAt,
    dateModified: datasheet.updatedAt,
    publisher: { '@type': 'Organization', name: 'Astera' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Data Sheets',
        item: `${baseUrl}/data-sheet`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: datasheet.title,
        item: `${baseUrl}/type/data-sheet/${datasheet.slug}`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="ds-detail-page">
        <section className="ds-detail-hero">
          <div className="section-container">
            <div className="ds-detail-hero-layout">
              <div className="ds-detail-hero-text">
                <span className="ds-detail-label">Data Sheet</span>
                <h1 className="ds-detail-title">{datasheet.title}</h1>
              </div>
              <div className="ds-detail-hero-visual">
                <div className="ds-cover-stack">
                  <div className="ds-cover-back"></div>
                  <div className="ds-cover-main">
                    <div className="ds-cover-badge">Data Sheet</div>
                    <div className="ds-cover-pattern"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ds-detail-body">
          <div className="section-container">
            <div className="ds-detail-grid">
              <div className="ds-detail-content">
                {isRichTextDocument(datasheet.description) ? (
                  <div className="ds-description">
                    {(() => {
                      try {
                        return documentToReactComponents(normalizeContent(datasheet.description), renderOptions);
                      } catch {
                        return <p className="ds-content-p">Content could not be displayed.</p>;
                      }
                    })()}
                  </div>
                ) : (
                  <p className="ds-description">{datasheet.description}</p>
                )}
              </div>

              <div className="ds-detail-sidebar">
                <div className="ds-form-card">
                  <div className="ds-form-header">
                    <h2 className="ds-form-title">Download this Data Sheet</h2>
                    <p className="ds-form-subtitle">Fill in your details to get instant access</p>
                  </div>
                  <ContactUsHubSpotForm
                    formId={datasheet.hubspotFormId || '3e8efa89-ed65-4c01-9a0f-8d1c84cf5a7b'}
                    containerId="hubspot-datasheet-form"
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
