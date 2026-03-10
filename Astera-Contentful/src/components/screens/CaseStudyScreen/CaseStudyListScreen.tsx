import Link from 'next/link';
import type { CaseStudy } from '@/types/contentful';
import './CaseStudyScreen.css';

interface CaseStudyListScreenProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudyListScreen({ caseStudies }: CaseStudyListScreenProps) {
  const featured = caseStudies.find((cs) => cs.featured) || caseStudies[0];
  const rest = caseStudies.filter((cs) => cs.id !== featured?.id);

  return (
    <div className="cs-list-page">
      {/* Header */}
      <section className="cs-header">
        <div className="section-container">
          <div className="cs-header-inner">
            <span className="cs-header-badge">Customer Stories</span>
            <h1 className="cs-header-title">Customer Success Stories</h1>
            <p className="cs-header-desc">
              Read how leading organizations use Astera to transform their data operations and drive measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="cs-featured-section">
          <div className="section-container">
            <Link href={`/type/case-study/${featured.slug}`} className="cs-featured-card">
              <div className="cs-featured-visual">
                <span className="cs-featured-visual-badge">Featured</span>
                <div className="cs-featured-visual-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
              </div>
              <div className="cs-featured-body">
                {featured.industry && (
                  <span className="cs-featured-industry">{featured.industry}</span>
                )}
                <h2 className="cs-featured-title">{featured.title}</h2>
                <p className="cs-featured-desc">{featured.subtitle}</p>
                <span className="cs-featured-link">
                  Read Case Study
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="cs-grid-section">
        <div className="section-container">
          <p className="cs-grid-heading">All Case Studies</p>
          <div className="cs-grid">
            {rest.map((cs) => (
              <Link key={cs.id} href={`/type/case-study/${cs.slug}`} className="cs-card">
                {cs.industry && (
                  <span className="cs-card-industry">{cs.industry}</span>
                )}
                <h3 className="cs-card-title">{cs.title}</h3>
                <p className="cs-card-desc">{cs.subtitle}</p>
                <div className="cs-card-footer">
                  {cs.author && (
                    <span className="cs-card-author">By {cs.author}</span>
                  )}
                  <span className="cs-card-link">
                    Read
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cs-cta">
        <div className="section-container">
          <div className="cs-cta-inner">
            <h2 className="cs-cta-title">Get Started for Free!</h2>
            <p className="cs-cta-desc">Contact Us Today for a Free Personalized Demo</p>
            <Link href="/contact-us" className="btn-primary">Let&apos;s Chat</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
