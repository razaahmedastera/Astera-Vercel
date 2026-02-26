'use client';

import Link from 'next/link';
import type { Datasheet } from '@/types/contentful';
import type { Document } from '@contentful/rich-text-types';
import './DatasheetScreen.css';

interface Props {
  datasheets: Datasheet[];
}

function extractPlainText(description: Document | string): string {
  if (typeof description === 'string') return description;
  if (typeof description === 'object' && description !== null && 'nodeType' in description) {
    const extractText = (node: any): string => {
      if (node.nodeType === 'text') return node.value || '';
      if (node.content && Array.isArray(node.content)) return node.content.map(extractText).join(' ');
      return '';
    };
    return extractText(description).trim() || '';
  }
  return '';
}

export default function DatasheetListScreen({ datasheets }: Props) {
  return (
    <div className="ds-list-page">
      <section className="ds-hero-section">
        <div className="section-container">
          <div className="ds-hero-content">
            <span className="ds-hero-badge">Resources</span>
            <h1 className="ds-hero-title">Data Sheets</h1>
            <p className="ds-hero-description">
              Product specifications, technical details, and feature overviews for Astera solutions
            </p>
          </div>
        </div>
      </section>

      <section className="ds-list-section">
        <div className="section-container">
          {datasheets.length === 0 ? (
            <div className="ds-empty">
              <div className="ds-empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 17H7A5 5 0 0 1 7 7h2" />
                  <path d="M15 7h2a5 5 0 1 1 0 10h-2" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>
              <p className="ds-empty-title">No data sheets yet</p>
              <p className="ds-empty-text">Check back soon for product data sheets and specifications.</p>
            </div>
          ) : (
            <div className="ds-grid">
              {datasheets.map((ds) => (
                <Link key={ds.id} href={`/type/data-sheet/${ds.slug}`} prefetch={true} className="ds-card">
                  <div className="ds-card-visual">
                    <div className="ds-card-icon-wrap">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <span className="ds-card-type">Data Sheet</span>
                  </div>
                  <div className="ds-card-body">
                    <h3 className="ds-card-title">{ds.title}</h3>
                    <p className="ds-card-desc">{extractPlainText(ds.description)}</p>
                    <span className="ds-card-cta">
                      View Data Sheet
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
