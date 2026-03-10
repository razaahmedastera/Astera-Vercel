import Link from 'next/link';
import type { CaseStudy } from '@/types/contentful';
import './CaseStudyScreen.css';

interface CaseStudyDetailScreenProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetailScreen({ caseStudy }: CaseStudyDetailScreenProps) {
  return (
    <div className="cs-detail-page">
      {/* Hero */}
      <section className="cs-detail-hero">
        <div className="section-container">
          {/* Breadcrumb */}
          <nav className="cs-breadcrumb">
            <ol className="cs-breadcrumb-list">
              <li>
                <Link href="/">Home</Link>
                <span className="cs-breadcrumb-sep">/</span>
              </li>
              <li>
                <Link href="/customers/case-studies">Case Studies</Link>
                <span className="cs-breadcrumb-sep">/</span>
              </li>
              <li>
                <span className="cs-breadcrumb-current">{caseStudy.title}</span>
              </li>
            </ol>
          </nav>

          <div className="cs-detail-hero-grid">
            {/* Left – Content */}
            <div className="cs-detail-hero-content">
              <span className="cs-detail-badge">Case Study</span>

              <div className="cs-detail-logos">
                <img
                  src="/images/astera-logo.svg"
                  alt="Astera"
                  className="cs-detail-logo"
                />
                <span className="cs-detail-logo-divider" />
                <img
                  src={caseStudy.logoImage || '/images/astera-logo.svg'}
                  alt={caseStudy.entryTitle}
                  className="cs-detail-logo"
                />
              </div>

              {caseStudy.title && (
                <h1 className="cs-detail-title">{caseStudy.title}</h1>
              )}

              {caseStudy.subtitle && (
                <p className="cs-detail-subtitle">{caseStudy.subtitle}</p>
              )}

              <div className="cs-detail-actions">
                {caseStudy.downloadUrl && (
                  <a href={caseStudy.downloadUrl} target="_blank" rel="noopener noreferrer" className="cs-download-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Download Case Study
                  </a>
                )}
              </div>
            </div>

            {/* Right – Cover Image */}
            <div className="cs-detail-hero-visual">
              {caseStudy.coverImage ? (
                <img
                  src={caseStudy.coverImage}
                  alt={caseStudy.title}
                  className="cs-detail-hero-img"
                />
              ) : (
                <div className="cs-detail-hero-placeholder" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      {caseStudy.highlights && caseStudy.highlights.length > 0 && (
        <section className="cs-highlights">
          <div className="section-container">
            <div className="cs-highlights-grid">
              {caseStudy.highlights.map((h, i) => (
                <div key={i} className="cs-highlight-card">
                  <div className="cs-highlight-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p>{h}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Body + Sidebar (Left content, Right sidebar) */}
      <section className="cs-detail-body">
        <div className="section-container">
          <div className="cs-detail-two-col">
            {/* Left – Body Sections */}
            <div className="cs-detail-main">
              {caseStudy.bodySections.map((section, i) => {
                const paragraphs = section.content.split('\n\n');

                return (
                  <div key={i} className="cs-body-section">
                    <h3>{section.heading}</h3>
                    {paragraphs.map((para, pi) => {
                      const trimmed = para.trim();
                      const isQuote = trimmed.startsWith('\u201C') || trimmed.startsWith('"') || trimmed.startsWith('\u2018');
                      if (isQuote) {
                        const dashIdx = trimmed.lastIndexOf('\u2014');
                        const dashIdx2 = trimmed.lastIndexOf('—');
                        const splitAt = Math.max(dashIdx, dashIdx2);
                        const quoteText = splitAt > 0 ? trimmed.slice(0, splitAt).trim() : trimmed;
                        const quoteAuthor = splitAt > 0 ? trimmed.slice(splitAt + 1).trim() : '';
                        return (
                          <blockquote key={pi} className="cs-blockquote">
                            <p className="cs-blockquote-text">{quoteText}</p>
                            {quoteAuthor && <footer className="cs-blockquote-author">&mdash; {quoteAuthor}</footer>}
                          </blockquote>
                        );
                      }
                      return <p key={pi}>{trimmed}</p>;
                    })}
                    {section.quotes && section.quotes.length > 0 && (
                      section.quotes.map((q, qi) => (
                        <blockquote key={`q-${qi}`} className="cs-blockquote">
                          <p className="cs-blockquote-text">&ldquo;{q.text}&rdquo;</p>
                          <footer className="cs-blockquote-author">&mdash; {q.author}</footer>
                        </blockquote>
                      ))
                    )}
                    {section.image && (
                      <img
                        src={section.image}
                        alt={section.heading}
                        className="cs-body-image"
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right – Unified Sidebar Panel */}
            <aside className="cs-detail-sidebar">
              <div className="cs-sidebar-panel">
                {caseStudy.profile && (
                  <div className="cs-panel-item">
                    <h4>Profile</h4>
                    <p>{caseStudy.profile}</p>
                  </div>
                )}
                {caseStudy.industry && (
                  <div className="cs-panel-item">
                    <h4>Industry</h4>
                    <p>{caseStudy.industry}</p>
                  </div>
                )}
                {caseStudy.useCase && (
                  <div className="cs-panel-item">
                    <h4>Use Case</h4>
                    <p>{caseStudy.useCase}</p>
                  </div>
                )}
                {caseStudy.results && (
                  <div className="cs-panel-item">
                    <h4>Results</h4>
                    <p>{caseStudy.results}</p>
                    {caseStudy.learnMoreUrl && (
                      <Link href={caseStudy.learnMoreUrl} className="cs-sidebar-link">
                        Learn more
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cs-detail-cta">
        <div className="section-container">
          <div className="cs-detail-cta-inner">
            <h2 className="cs-detail-cta-title">Get Started for Free!</h2>
            <p className="cs-detail-cta-desc">Contact Us Today for a Free Personalized Demo</p>
            <Link href="/contact-us" className="btn-primary">Let&apos;s Chat</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
