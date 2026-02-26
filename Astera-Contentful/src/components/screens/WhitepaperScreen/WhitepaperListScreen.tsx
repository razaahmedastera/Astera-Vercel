import Link from 'next/link';
import type { Whitepaper } from '@/types/contentful';
import type { Document } from '@contentful/rich-text-types';
import './WhitepaperScreen.css';

interface Props {
  whitepapers: Whitepaper[];
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

export default function WhitepaperListScreen({ whitepapers }: Props) {
  return (
    <div className="wp-list-page">
      <section className="wp-hero-section">
        <div className="section-container">
          <div className="wp-hero-content">
            <span className="wp-hero-badge">Resources</span>
            <h1 className="wp-hero-title">Whitepapers</h1>
            <p className="wp-hero-description">
              In-depth research and analysis to help you stay ahead in data management and integration
            </p>
          </div>
        </div>
      </section>

      <section className="wp-list-section">
        <div className="section-container">
          {whitepapers.length === 0 ? (
            <div className="wp-empty">
              <div className="wp-empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <p className="wp-empty-title">No whitepapers yet</p>
              <p className="wp-empty-text">Check back soon for new research and insights.</p>
            </div>
          ) : (
            <div className="wp-grid">
              {whitepapers.map((wp) => (
                <Link key={wp.id} href={`/type/whitepaper/${wp.slug}`} prefetch={true} className="wp-card">
                  <div className="wp-card-visual">
                    <div className="wp-card-icon-wrap">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    </div>
                    <span className="wp-card-type">Whitepaper</span>
                  </div>
                  <div className="wp-card-body">
                    <h3 className="wp-card-title">{wp.title}</h3>
                    <p className="wp-card-desc">{extractPlainText(wp.description)}</p>
                    <span className="wp-card-cta">
                      Read & Download
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
