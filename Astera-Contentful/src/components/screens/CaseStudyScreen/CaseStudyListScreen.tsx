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
    <div>
      {/* Hero */}
      <section className="cs-hero py-16 sm:py-20 lg:py-24">
        <div className="section-container">
          <p className="text-sm font-semibold text-indigo-600 tracking-wide uppercase mb-3">Case Studies</p>
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0f1c2e] leading-[1.2] mb-4">
            Customer Success Stories
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mb-12">
            See how leading organizations use Astera to transform their data operations and drive results.
          </p>

          {/* Featured */}
          {featured && (
            <Link href={`/type/case-study/${featured.slug}`} className="block cs-featured-card">
              <div className="p-8 sm:p-10 lg:p-12">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide bg-indigo-500/20 text-indigo-300 mb-4">
                  FEATURED
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">{featured.title}</h2>
                <p className="text-gray-300 text-base leading-relaxed max-w-2xl mb-6">
                  {featured.subtitle}
                </p>
                <span className="inline-flex items-center gap-2 text-indigo-300 font-semibold text-sm">
                  Read Case Study
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5-5-5-5"/></svg>
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Grid */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((cs) => (
              <Link key={cs.id} href={`/type/case-study/${cs.slug}`} className="cs-card no-underline">
                {cs.industry && (
                  <span className="cs-industry-badge">{cs.industry}</span>
                )}
                <h3 className="cs-card-title">{cs.title}</h3>
                <p className="cs-card-desc">{cs.subtitle}</p>
                <span className="cs-card-link">
                  Read Case Study
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5-5-5-5"/></svg>
                </span>
              </Link>
            ))}
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
