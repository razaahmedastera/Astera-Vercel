import Link from 'next/link';
import Image from 'next/image';
import type { Ebook } from '@/types/contentful';
import type { Document } from '@contentful/rich-text-types';
import './EbookScreen.css';

interface Props {
  ebooks: Ebook[];
}

// Helper function to extract plain text from Rich Text Document
function extractPlainText(description: Document | string): string {
  if (typeof description === 'string') {
    return description;
  }
  
  if (typeof description === 'object' && description !== null && 'nodeType' in description) {
    const extractText = (node: any): string => {
      if (node.nodeType === 'text') {
        return node.value || '';
      }
      if (node.content && Array.isArray(node.content)) {
        return node.content.map(extractText).join(' ');
      }
      return '';
    };
    return extractText(description).trim() || '';
  }
  
  return '';
}

export default function EbookListScreen({ ebooks }: Props) {
  return (
    <div className="ebook-list-page">
      {/* Hero Section */}
      <section className="ebook-hero-section">
        <div className="section-container">
          <div className="ebook-hero-content">
            <h1 className="ebook-hero-title">eBooks & Guides</h1>
            <p className="ebook-hero-description">
              Discover in-depth guides, playbooks, and resources to help you transform your data operations
            </p>
          </div>
        </div>
      </section>

      {/* eBooks Grid */}
      <section className="ebook-list-section">
        <div className="section-container">
          <div className="ebook-grid">
            {ebooks.map((ebook) => (
              <Link key={ebook.id} href={`/type/e-book/${ebook.slug}`} prefetch={true} className="ebook-card">
                <div className="ebook-card-image-wrapper">
                  {ebook.coverImage ? (
                    <Image
                      src={ebook.coverImage}
                      alt={ebook.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="ebook-card-image-placeholder">
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="ebook-card-icon"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="ebook-card-content">
                  <h3 className="ebook-card-title">{ebook.title}</h3>
                  <p className="ebook-card-description">{extractPlainText(ebook.description)}</p>
                  <div className="ebook-card-footer">
                    <span className="ebook-card-link">
                      Download Now
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
