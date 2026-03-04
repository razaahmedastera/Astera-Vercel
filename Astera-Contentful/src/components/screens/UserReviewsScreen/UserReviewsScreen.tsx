'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReviewPageSettings, UserReviewItem } from '@/types/contentful';

interface UserReviewsScreenProps {
  settings: ReviewPageSettings | null;
  reviews: UserReviewItem[];
}

const DEFAULTS = {
  slug: 'user-reviews',
  heroTitle: 'Read what our customers are saying about us',
  heroHighlightWord: 'customers',
  heroBadgeText: 'User Reviews',
  heroDescription: 'Real reviews from real users. See why thousands of data professionals trust Astera to simplify their data workflows.',
  gartnerRating: '4.2',
  gartnerTotalReviews: 'Based on Gartner Peer Insights reviews',
  gartnerUrl: 'https://www.gartner.com/reviews/market/data-integration-tools/vendor/astera-software',
  gridTitle: 'Customer Reviews',
  gridSubtitle: 'Hear directly from our users about their experience with Astera products.',
  ctaTitle: 'Ready to Experience Astera?',
  ctaDescription: 'Join thousands of satisfied customers who trust Astera to simplify complex data challenges.',
  ctaPrimaryText: 'Start Free Trial',
  ctaPrimaryLink: '/contact-us',
  ctaSecondaryText: 'Explore Products',
  ctaSecondaryLink: '/product',
};

const PLATFORM_COLORS: Record<string, string> = {
  Capterra: '#FF9D28',
  G2: '#FF492C',
  TrustRadius: '#01B98D',
  Gartner: '#003DA5',
  Other: '#6b7280',
};

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={star <= rating ? '#F59E0B' : '#E5E7EB'}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function GartnerCard({ rating, subtitle, url }: { rating: string; subtitle: string; url: string }) {
  const numRating = parseFloat(rating);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-2xl border border-[#e5e7eb] p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 max-w-sm no-underline"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#003DA5]/10">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#003DA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-[#6b7280] uppercase tracking-wide">Gartner</p>
          <p className="text-[11px] text-[#6b7280]">Peer Insights</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-3xl font-bold text-[#003DA5]">{rating}</span>
        <StarRating rating={Math.round(numRating)} size={22} />
      </div>
      <p className="text-[13px] text-[#6b7280]">{subtitle}</p>
    </a>
  );
}

function PlatformBadge({ platform }: { platform: string }) {
  const color = PLATFORM_COLORS[platform] || PLATFORM_COLORS.Other;
  return (
    <span
      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
      style={{ color, backgroundColor: `${color}15`, border: `1px solid ${color}25` }}
    >
      {platform}
    </span>
  );
}

function ReviewCard({ review }: { review: UserReviewItem }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.reviewText.length > 200;
  const displayText = expanded || !isLong ? review.reviewText : review.reviewText.slice(0, 200) + '...';

  return (
    <div className="group bg-white border border-[#e5e7eb] rounded-2xl p-6 flex flex-col transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,92,204,0.08)] hover:-translate-y-1 hover:border-[#005CCC]/15 h-full">
      {/* Header: Logo + External link */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-[100px] h-[40px] flex items-center">
          {review.companyLogo ? (
            <Image
              src={review.companyLogo}
              alt={review.company || 'Company'}
              width={100}
              height={40}
              className="object-contain object-left max-h-[40px]"
            />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-[#EFF5FF] flex items-center justify-center">
              <span className="text-sm font-bold text-[#005CCC]">
                {(review.company || review.reviewerName)[0]}
              </span>
            </div>
          )}
        </div>
        {review.sourceUrl && (
          <a
            href={review.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#6b7280] hover:text-[#005CCC] transition-colors shrink-0"
            aria-label="View original review"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 8.667V12.667A1.334 1.334 0 0110.667 14H3.333A1.334 1.334 0 012 12.667V5.333A1.334 1.334 0 013.333 4H7.333" />
              <path d="M10 2h4v4M6.667 9.333L14 2" />
            </svg>
          </a>
        )}
      </div>

      {/* Reviewer info */}
      <h3 className="text-[15px] font-bold text-[#005CCC] mb-0.5">{review.reviewerName}</h3>
      <p className="text-[12px] text-[#6b7280] mb-3">
        {review.jobTitle}{review.jobTitle && review.company ? ' | ' : ''}{review.company}
      </p>

      {/* Rating + Platform + Product */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {review.rating && <StarRating rating={review.rating} size={14} />}
        {review.sourcePlatform && <PlatformBadge platform={review.sourcePlatform} />}
        {review.product && (
          <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-[#005CCC] bg-[#005CCC]/5 border border-[#005CCC]/15">
            {review.product}
          </span>
        )}
      </div>

      {/* Review text */}
      <p className="text-[13px] text-[#4b5563] leading-relaxed flex-1">
        &ldquo;{displayText}&rdquo;
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-[12px] font-semibold text-[#005CCC] hover:text-[#004ba3] transition-colors bg-transparent border-none cursor-pointer p-0 self-start"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

export default function UserReviewsScreen({ settings, reviews }: UserReviewsScreenProps) {
  const s = { ...DEFAULTS, ...settings };
  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [productFilter, setProductFilter] = useState('All');

  const platforms = useMemo(() => {
    const set = new Set(reviews.map((r) => r.sourcePlatform).filter(Boolean));
    return ['All', ...Array.from(set)] as string[];
  }, [reviews]);

  const products = useMemo(() => {
    const set = new Set(reviews.map((r) => r.product).filter(Boolean));
    return ['All', ...Array.from(set).sort()] as string[];
  }, [reviews]);

  const filtered = useMemo(() => {
    return reviews.filter((r) => {
      const matchesSearch = !search
        || r.reviewerName.toLowerCase().includes(search.toLowerCase())
        || r.company?.toLowerCase().includes(search.toLowerCase())
        || r.reviewText.toLowerCase().includes(search.toLowerCase());
      const matchesPlatform = platformFilter === 'All' || r.sourcePlatform === platformFilter;
      const matchesProduct = productFilter === 'All' || r.product === productFilter;
      return matchesSearch && matchesPlatform && matchesProduct;
    });
  }, [reviews, search, platformFilter, productFilter]);

  const heroTitleParts = s.heroHighlightWord
    ? s.heroTitle.split(s.heroHighlightWord)
    : [s.heroTitle];

  return (
    <div className="bg-white">
      {/* ───── HERO ───── */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #EFF5FF 0%, #E0EDFF 50%, #D4E6FF 100%)',
        }}
      >
        <div className="absolute top-[-60px] right-[-60px] w-[240px] h-[240px] rounded-full bg-[#005CCC]/5 blur-2xl pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-40px] w-[200px] h-[200px] rounded-full bg-[#005CCC]/5 blur-2xl pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            {/* Left side */}
            <div className="flex-1 text-center lg:text-left">
              {s.heroBadgeText && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur text-xs font-semibold text-[#005CCC] border border-[#005CCC]/10 mb-6 shadow-sm">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#005CCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 8c0 3.314-2.686 6-6 6S2 11.314 2 8s2.686-6 6-6 6 2.686 6 6z" />
                    <path d="M8 4v4l2.5 1.5" />
                  </svg>
                  {s.heroBadgeText}
                </span>
              )}
              <h1 className="text-3xl md:text-[44px] font-bold text-[#1a1a1a] leading-tight mb-5">
                {s.heroHighlightWord && heroTitleParts.length > 1 ? (
                  <>
                    {heroTitleParts[0]}
                    <span className="bg-gradient-to-r from-[#005CCC] to-[#3b8ef5] bg-clip-text text-transparent">
                      {s.heroHighlightWord}
                    </span>
                    {heroTitleParts[1]}
                  </>
                ) : (
                  s.heroTitle
                )}
              </h1>
              {s.heroDescription && (
                <p className="text-base md:text-lg text-[#4b5563] max-w-xl leading-relaxed">
                  {s.heroDescription}
                </p>
              )}
            </div>

            {/* Right side - Gartner card */}
            {s.gartnerRating && s.gartnerUrl && (
              <div className="shrink-0">
                <GartnerCard
                  rating={s.gartnerRating}
                  subtitle={s.gartnerTotalReviews || ''}
                  url={s.gartnerUrl}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───── FILTERS ───── */}
      <section className="py-8 border-b border-[#e5e7eb] bg-[#fafbfc]">
        <div className="section-container">
          <div className="flex flex-col gap-4">
            {/* Top row: Platform pills + Search */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {platforms.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlatformFilter(p)}
                    className={`px-4 py-2 rounded-full text-[13px] font-medium border transition-all duration-200 cursor-pointer ${
                      platformFilter === p
                        ? 'bg-[#005CCC] text-white border-[#005CCC] shadow-sm'
                        : 'bg-white text-[#4b5563] border-[#e5e7eb] hover:border-[#005CCC]/30 hover:text-[#005CCC]'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 sm:ml-auto w-full sm:w-auto">
                {/* Product dropdown */}
                {products.length > 2 && (
                  <div className="relative">
                    <select
                      value={productFilter}
                      onChange={(e) => setProductFilter(e.target.value)}
                      className="appearance-none h-10 pl-4 pr-9 rounded-lg border border-[#e5e7eb] text-[13px] text-[#1a1a1a] bg-white cursor-pointer focus:outline-none focus:border-[#005CCC] focus:ring-2 focus:ring-[#005CCC]/10 transition-all font-medium"
                    >
                      <option value="All">All Products</option>
                      {products.filter((p) => p !== 'All').map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6b7280]"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 4.5l3 3 3-3" />
                    </svg>
                  </div>
                )}

                {/* Search */}
                <div className="relative flex-1 sm:flex-none">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="7" cy="7" r="5" />
                    <path d="M14 14l-3.5-3.5" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full sm:w-[240px] h-10 pl-9 pr-4 rounded-lg border border-[#e5e7eb] text-sm text-[#1a1a1a] placeholder-[#9ca3af] focus:outline-none focus:border-[#005CCC] focus:ring-2 focus:ring-[#005CCC]/10 transition-all bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── REVIEWS GRID ───── */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="inline-block w-10 h-1 bg-[#005CCC] rounded-full mb-6" />
            {s.gridTitle && (
              <h2 className="text-2xl md:text-[36px] font-bold text-[#1a1a1a] leading-tight mb-3">
                {s.gridTitle}
              </h2>
            )}
            {s.gridSubtitle && (
              <p className="text-[#6b7280] max-w-lg mx-auto">{s.gridSubtitle}</p>
            )}
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {filtered.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#6b7280] text-lg">No reviews match your search.</p>
              <button
                onClick={() => { setSearch(''); setPlatformFilter('All'); setProductFilter('All'); }}
                className="mt-4 text-[#005CCC] font-semibold text-sm hover:underline bg-transparent border-none cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ───── CTA ───── */}
      {s.ctaTitle && (
        <section
          className="py-16 md:py-20"
          style={{
            background: 'linear-gradient(135deg, #005CCC 0%, #0070F3 50%, #005CCC 100%)',
          }}
        >
          <div className="section-container text-center">
            <h2 className="text-2xl md:text-[36px] font-bold text-white leading-tight mb-4">
              {s.ctaTitle}
            </h2>
            {s.ctaDescription && (
              <p className="text-white/80 max-w-xl mx-auto mb-8 text-base">{s.ctaDescription}</p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {s.ctaPrimaryText && s.ctaPrimaryLink && (
                <Link
                  href={s.ctaPrimaryLink}
                  className="inline-flex items-center justify-center h-[51px] px-7 rounded-[10px] bg-white text-[#005CCC] text-[15px] font-semibold no-underline transition-all duration-200 hover:bg-[#f0f5ff] hover:-translate-y-0.5 shadow-lg"
                >
                  {s.ctaPrimaryText}
                </Link>
              )}
              {s.ctaSecondaryText && s.ctaSecondaryLink && (
                <Link
                  href={s.ctaSecondaryLink}
                  className="inline-flex items-center justify-center h-[51px] px-7 rounded-[10px] bg-transparent text-white text-[15px] font-semibold no-underline border-2 border-white/40 transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
                >
                  {s.ctaSecondaryText}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
