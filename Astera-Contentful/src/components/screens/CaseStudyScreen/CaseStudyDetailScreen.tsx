import Link from 'next/link';
import type { CaseStudy } from '@/types/contentful';
import './CaseStudyScreen.css';

interface CaseStudyDetailScreenProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyDetailScreen({ caseStudy }: CaseStudyDetailScreenProps) {
  return (
    <div>
      {/* Hero */}
      <section className="cs-detail-hero py-16 sm:py-20 lg:py-24">
        <div className="section-container max-w-4xl mx-auto">
          <p className="text-sm font-semibold text-indigo-600 tracking-wide uppercase mb-3">Case Study</p>
          {caseStudy.title && (
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0f1c2e] leading-[1.25] mb-5">
              {caseStudy.title}
            </h1>
          )}
          {caseStudy.subtitle && (
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-2xl mb-8">
              {caseStudy.subtitle}
            </p>
          )}
          {caseStudy.downloadUrl && (
            <a href={caseStudy.downloadUrl} target="_blank" rel="noopener noreferrer" className="cs-download-btn">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download Case Study
            </a>
          )}
        </div>
      </section>

      {/* Highlights */}
      {caseStudy.highlights && caseStudy.highlights.length > 0 && (
        <section className="py-12 bg-white">
          <div className="section-container max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {caseStudy.highlights.map((h, i) => (
                <div key={i} className="cs-highlight-card">
                  <p>{h}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Body + Sidebar */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="section-container max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Body */}
            <div className="lg:col-span-2">
              {caseStudy.bodySections.map((section, i) => (
                <div key={i} className="cs-body-section">
                  <h3>{section.heading}</h3>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {caseStudy.profile && (
                <div className="cs-sidebar-card">
                  <h4>Profile</h4>
                  <p>{caseStudy.profile}</p>
                </div>
              )}
              {caseStudy.industry && (
                <div className="cs-sidebar-card">
                  <h4>Industry</h4>
                  <p>{caseStudy.industry}</p>
                </div>
              )}
              {caseStudy.useCase && (
                <div className="cs-sidebar-card">
                  <h4>Use Case</h4>
                  <p>{caseStudy.useCase}</p>
                </div>
              )}
              {caseStudy.results && (
                <div className="cs-sidebar-card">
                  <h4>Results</h4>
                  <p>{caseStudy.results}</p>
                  {caseStudy.learnMoreUrl && (
                    <Link href={caseStudy.learnMoreUrl} className="inline-flex items-center gap-1 text-indigo-600 font-semibold text-sm mt-3 hover:underline">
                      Learn more
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5-5-5-5"/></svg>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cs-cta-section py-16 sm:py-20">
        <div className="section-container text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Get Started for Free!</h2>
          <p className="text-gray-300 mb-8">Contact Us Today for a Free Personalized Demo</p>
          <Link href="/contact-us" className="cs-cta-btn">Let&apos;s Chat</Link>
        </div>
      </section>
    </div>
  );
}
