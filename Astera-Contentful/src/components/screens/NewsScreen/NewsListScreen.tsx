'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { NewsPost, NewsEvent } from '@/types/contentful';

interface Props {
  posts: NewsPost[];
  events: NewsEvent[];
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function formatDateParts(dateStr: string): { month: string; day: string } {
  try {
    const d = new Date(dateStr);
    return {
      month: d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
      day: String(d.getDate()),
    };
  } catch {
    return { month: '—', day: '—' };
  }
}

const CATEGORY_CONFIG: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  'Product Update': {
    color: '#005CCC',
    bg: '#EFF5FF',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 14.5M14.25 3.104c.251.023.501.05.75.082M5 14.5l-1.456 1.455a1.59 1.59 0 000 2.248l.009.01a1.59 1.59 0 002.248 0L7.26 16.75m12.54-2.25l1.455 1.455a1.59 1.59 0 010 2.248l-.009.01a1.59 1.59 0 01-2.248 0L17.54 16.75" />,
  },
  'Award': {
    color: '#059669',
    bg: '#ecfdf5',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-4.5A3.375 3.375 0 0019.875 10.875 3.375 3.375 0 0016.5 7.5m-9 11.25v-4.5a3.375 3.375 0 00-3.375-3.375A3.375 3.375 0 007.5 7.5m9 0H7.5m9 0a3 3 0 00-3-3h0a3 3 0 00-3 3" />,
  },
  'Press Release': {
    color: '#7c3aed',
    bg: '#f5f3ff',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" />,
  },
  'Company News': {
    color: '#0891b2',
    bg: '#ecfeff',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />,
  },
  'Partnership': {
    color: '#d97706',
    bg: '#fffbeb',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />,
  },
  'Event': {
    color: '#dc2626',
    bg: '#fef2f2',
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />,
  },
};

const ALL_LABEL = 'All';
const POSTS_PER_PAGE = 6;

export default function NewsListScreen({ posts, events }: Props) {
  const [activeCategory, setActiveCategory] = useState(ALL_LABEL);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const featured = posts.find((p) => p.isFeatured);
  const allRegular = posts.filter((p) => p.id !== featured?.id);

  const categories = [ALL_LABEL, ...Array.from(new Set(allRegular.map((p) => p.category).filter(Boolean) as string[]))];

  const filtered = activeCategory === ALL_LABEL ? allRegular : allRegular.filter((p) => p.category === activeCategory);
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getConfig = (cat?: string) => CATEGORY_CONFIG[cat || ''] || CATEGORY_CONFIG['Company News'];

  return (
    <div className="min-h-screen bg-[#fafbfd]">

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#EFF5FF] via-[#E4EDFF] to-[#D8E6FF] pt-32 pb-20 md:pt-20 md:pb-20">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #005CCC 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#005CCC]/[0.04] blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="section-container relative z-10">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-sm text-xs font-semibold text-[#005CCC] tracking-wide uppercase mb-6 border border-[#005CCC]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#005CCC] animate-pulse" />
              Latest Updates
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-[#0f1c2e] tracking-tight leading-[1.1] mb-5 max-w-2xl">
              News & Events
            </h1>
            <p className="text-lg md:text-xl text-[#4b5563] leading-relaxed max-w-xl">
              Product launches, awards, media coverage, and upcoming events from the Astera team.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FEATURED ─── */}
      {featured && (
        <section className="relative -mt-12 z-20 mb-8">
          <div className="section-container">
            <Link
              href={featured.externalUrl || `/news/${featured.slug}`}
              className="group block bg-white rounded-2xl border border-gray-100 shadow-lg shadow-[#005CCC]/[0.06] overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#005CCC]/[0.1] hover:-translate-y-0.5"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Image */}
                <div className="relative min-h-[240px] lg:min-h-[320px] bg-gradient-to-br from-[#005CCC] to-[#003d8f] overflow-hidden">
                  {featured.featuredImage ? (
                    <Image src={featured.featuredImage} alt={featured.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 1024px) 100vw, 50vw" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="w-20 h-20 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5" /></svg>
                    </div>
                  )}
                  <div className="absolute top-5 left-5">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm text-[#005CCC]">
                      Featured
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    {featured.category && (
                      <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: getConfig(featured.category).color }}>
                        {featured.category}
                      </span>
                    )}
                    <span className="w-1 h-1 rounded-full bg-[#d1d5db]" />
                    <time className="text-xs text-[#9ca3af]">{formatDate(featured.publishedDate)}</time>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#0f1c2e] leading-tight mb-4 group-hover:text-[#005CCC] transition-colors">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="text-[15px] text-[#4b5563] leading-relaxed mb-6 line-clamp-3">
                      {featured.excerpt}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#005CCC] group-hover:gap-3 transition-all">
                    Read Full Story
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ─── CATEGORY FILTERS ─── */}
      <section ref={gridRef} className="pt-10 pb-2" style={{ scrollMarginTop: '100px' }}>
        <div className="section-container">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              const config = cat === ALL_LABEL ? { color: '#005CCC', bg: '#EFF5FF' } : getConfig(cat);
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 border ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'bg-white text-[#4b5563] border-gray-200 hover:border-gray-300 hover:text-[#0f1c2e]'
                  }`}
                  style={isActive ? { backgroundColor: config.color, borderColor: config.color } : undefined}
                >
                  {cat}
                  {cat !== ALL_LABEL && (
                    <span className="ml-1.5 opacity-60">
                      {allRegular.filter((p) => p.category === cat).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── NEWS GRID + EVENTS ─── */}
      <section className="py-10 md:py-14">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-14">

            {/* NEWS CARDS */}
            <div>
              {paginated.length === 0 ? (
                <div className="text-center py-20">
                  <svg className="w-16 h-16 text-[#d1d5db] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                  <p className="text-[#6b7280] font-medium">No posts found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paginated.map((post, idx) => {
                    const config = getConfig(post.category);
                    const dateParts = formatDateParts(post.publishedDate);
                    return (
                      <Link
                        key={post.id}
                        href={post.externalUrl || `/news/${post.slug}`}
                        className="group bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.06] hover:-translate-y-1 flex flex-col"
                        style={{ animationDelay: `${idx * 60}ms` }}
                      >
                        {/* Card image / date stamp */}
                        <div className="relative h-[180px] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                          {post.featuredImage ? (
                            <Image src={post.featuredImage} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 400px" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br" style={{ background: `linear-gradient(135deg, ${config.bg}, white)` }}>
                              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${config.color}12` }}>
                                <svg className="w-8 h-8" style={{ color: config.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  {config.icon}
                                </svg>
                              </div>
                            </div>
                          )}
                          {/* Date stamp */}
                          <div className="absolute top-3 right-3 w-12 h-14 rounded-lg bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center shadow-sm border border-white/50">
                            <span className="text-[10px] font-bold text-[#005CCC] leading-none">{dateParts.month}</span>
                            <span className="text-lg font-bold text-[#0f1c2e] leading-none mt-0.5">{dateParts.day}</span>
                          </div>
                        </div>

                        {/* Card body */}
                        <div className="p-5 flex-1 flex flex-col">
                          {post.category && (
                            <span
                              className="inline-block text-[10px] font-bold uppercase tracking-widest mb-2.5 w-fit"
                              style={{ color: config.color }}
                            >
                              {post.category}
                            </span>
                          )}
                          <h3 className="text-[15px] font-bold text-[#0f1c2e] leading-snug mb-2 group-hover:text-[#005CCC] transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-[13px] text-[#6b7280] leading-relaxed mb-4 line-clamp-2 flex-1">
                              {post.excerpt}
                            </p>
                          )}
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#005CCC] mt-auto group-hover:gap-2.5 transition-all">
                            Read More
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="flex items-center justify-center gap-1.5 mt-12">
                  <button
                    onClick={() => goToPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-[#4b5563] hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (totalPages <= 7 || page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all ${
                            page === currentPage
                              ? 'bg-[#005CCC] text-white shadow-md shadow-[#005CCC]/25'
                              : 'text-[#4b5563] hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    }
                    if (page === 2 && currentPage > 3) return <span key="s-dots" className="px-1 text-[#9ca3af]">...</span>;
                    if (page === totalPages - 1 && currentPage < totalPages - 2) return <span key="e-dots" className="px-1 text-[#9ca3af]">...</span>;
                    return null;
                  })}
                  <button
                    onClick={() => goToPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="w-10 h-10 flex items-center justify-center rounded-xl text-[#4b5563] hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </nav>
              )}
            </div>

            {/* ─── EVENTS SIDEBAR ─── */}
            <aside>
              <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:sticky lg:top-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-lg bg-[#EFF5FF] flex items-center justify-center">
                    <svg className="w-4.5 h-4.5 text-[#005CCC]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>
                  </div>
                  <h2 className="text-base font-bold text-[#0f1c2e]">Upcoming Events</h2>
                </div>

                {events.length === 0 ? (
                  <p className="text-sm text-[#9ca3af] text-center py-6">No upcoming events.</p>
                ) : (
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="group rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:border-[#005CCC]/20 hover:shadow-sm"
                      >
                        {event.image && (
                          <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden mb-3">
                            <Image src={event.image} alt={event.title} fill className="object-cover" sizes="300px" />
                          </div>
                        )}
                        <h3 className="text-sm font-bold text-[#0f1c2e] group-hover:text-[#005CCC] transition-colors mb-1">
                          {event.title}
                        </h3>
                        {event.subtitle && (
                          <p className="text-xs text-[#4b5563] mb-1.5">{event.subtitle}</p>
                        )}
                        {event.eventDate && (
                          <div className="flex items-center gap-1.5 text-xs text-[#6b7280]">
                            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                            <span className="leading-relaxed">{event.eventDate}</span>
                          </div>
                        )}
                        {event.externalUrl && (
                          <a href={event.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-[#005CCC] mt-2 hover:text-[#004299] transition-colors">
                            Learn More
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
