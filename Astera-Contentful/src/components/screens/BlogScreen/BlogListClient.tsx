/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { BlogPost, BlogCategory } from '@/types/contentful';
import { getAllBlogPostsBrowser } from '@/lib/contentful/api-browser';
import './BlogScreen.css';

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80';

type Props = {
  initialPosts: BlogPost[];
  categories: BlogCategory[];
  pageSize?: number;
};

function formatDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getReadingTime(excerpt?: string) {
  if (!excerpt) return '4 minutes';
  const words = excerpt.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} minute${minutes > 1 ? 's' : ''}`;
}

function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  if (target.src !== FALLBACK_COVER) {
    target.src = FALLBACK_COVER;
  }
}

const SOLUTIONS = [
  { label: 'API management', value: 'api-management' },
  { label: 'Data extraction', value: 'data-extraction' },
  { label: 'Data integration', value: 'data-integration' },
  { label: 'Data prep', value: 'data-prep' },
  { label: 'Data warehousing', value: 'data-warehousing' },
  { label: 'EDI management', value: 'edi-management' },
  { label: 'Unified platforms', value: 'unified-platforms' },
];

const INDUSTRY = [
  { label: 'Education', value: 'education' },
  { label: 'Finance', value: 'finance' },
  { label: 'Government', value: 'government' },
  { label: 'Healthcare', value: 'healthcare' },
  { label: 'Insurance', value: 'insurance' },
  { label: 'Media and Communications', value: 'media-and-communications' },
  { label: 'Retail', value: 'retail' },
];

const TECHNOLOGIES = [
  { label: 'Analytics', value: 'analytics' },
  { label: 'Artificial Intelligence', value: 'artificial-intelligence' },
  { label: 'Automation', value: 'automation' },
  { label: 'BI', value: 'bi' },
  { label: 'Cloud', value: 'cloud' },
  { label: 'Connectors', value: 'connectors' },
  { label: 'Data Governance', value: 'data-governance' },
  { label: 'Data Mapping', value: 'data-mapping' },
  { label: 'Data Migration', value: 'data-migration' },
  { label: 'Dimensional Modeling', value: 'dimensional-modeling' },
  { label: 'Github', value: 'github' },
  { label: 'Machine Learning', value: 'machine-learning' },
  { label: 'Natural Language Processing', value: 'natural-language-processing' },
];

export function BlogListClient({ initialPosts, categories, pageSize = 9 }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [solution, setSolution] = useState('all');
  const [industry, setIndustry] = useState('all');
  const [technology, setTechnology] = useState('all');
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [loading, setLoading] = useState(false);

  // Fetch fresh data from Contentful on mount and periodically
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const freshPosts = await getAllBlogPostsBrowser();
        setPosts(freshPosts);
        console.log('[BlogListClient] Fetched fresh posts from Contentful:', freshPosts.length);
      } catch (error) {
        console.error('[BlogListClient] Error fetching fresh posts:', error);
        // Keep using initialPosts on error
      } finally {
        setLoading(false);
      }
    }

    // Fetch immediately on mount
    fetchPosts();

    // Optionally: Refresh every 5 minutes
    const interval = setInterval(fetchPosts, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scriptId = 'hubspot-forms-script';
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    const createHubSpotForm = () => {
      const w = window as any;
      if (!w?.hbspt?.forms?.create) return;

      const targetId = 'hubspot-asterabytes-form';
      const target = document.getElementById(targetId);
      if (!target) return;
      if (target.childElementCount > 0) return; // avoid duplicates

      w.hbspt.forms.create({
        portalId: '6926702',
        formId: 'c973f85a-2681-4626-bf10-d3e1ef2b1d51',
        region: 'na1',
        target: `#${targetId}`,
      });
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://js.hsforms.net/forms/embed/v2.js';
      script.charset = 'utf-8';
      script.async = true;
      script.onload = () => setTimeout(createHubSpotForm, 50);
      document.body.appendChild(script);
    } else {
      setTimeout(createHubSpotForm, 50);
    }
  }, []);

  // Featured must never change based on filters/search (per requirement)
  const featured = posts[0];

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    // Only filter the RIGHT-side list (exclude featured always)
    const list = featured ? posts.filter((p) => p !== featured) : posts;

    return list.filter((post) => {
      const tags = post.tags || [];
      const matchesTerm =
        !term ||
        post.title.toLowerCase().includes(term) ||
        (post.excerpt || '').toLowerCase().includes(term) ||
        tags.some((t) => t.toLowerCase().includes(term));

      // Static now: use tags as filter slugs. Later: replace with Contentful taxonomy fields.
      const matchesSolution = solution === 'all' || tags.includes(solution);
      const matchesIndustry = industry === 'all' || tags.includes(industry);
      const matchesTechnology = technology === 'all' || tags.includes(technology);

      return matchesTerm && matchesSolution && matchesIndustry && matchesTechnology;
    });
  }, [posts, featured, search, solution, industry, technology]);

  // Layout: 1 featured + (pageSize - 1) items
  const listPerPage = Math.max(1, pageSize - 1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / listPerPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * listPerPage;
  const current = filtered.slice(start, start + listPerPage);

  const totalNumberButtons = 7;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visibleNumbers = pageNumbers.slice(
    Math.max(0, currentPage - Math.ceil(totalNumberButtons / 2)),
    Math.max(0, currentPage - Math.ceil(totalNumberButtons / 2)) + totalNumberButtons
  );

  return (
    <section
      className="py-12 sm:py-14 lg:py-16"
      style={{
        background: 'linear-gradient(180deg, #f4f7ff 0%, #f9fbff 50%, #ffffff 100%)',
      }}
    >
      <div className="section-container">
        {/* Top bar */}
        <div className="mb-6">
          <div className="text-xl font-semibold text-slate-800">Blogs</div>
          <div className="text-base text-slate-500 mt-1">
            The latest data trends and insights for business transformation.
          </div>
        </div>

        {/* Featured hero */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 md:grid-cols-[460px_1fr] gap-8 items-center bg-white rounded-2xl border border-slate-100 shadow-[0_30px_70px_-55px_rgba(0,0,0,0.45)] p-6 sm:p-8 mb-10"
          >
            <div className="relative overflow-hidden rounded-2xl h-[260px] md:h-[320px]">
              <img
                src={featured.coverImage || featured.featuredImage || FALLBACK_COVER}
                alt={featured.title}
                onError={handleImageError}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
            </div>

            <div className="flex flex-col gap-3">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#F59E0B] bg-[#FFF7ED] px-2.5 py-1 rounded-md w-fit">
                FEATURED
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-semibold text-slate-900 leading-tight">
                {featured.title}
              </h2>
              <p className="text-sm sm:text-base lg:text-[15px] text-slate-600 leading-relaxed line-clamp-4 max-w-2xl">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#e8f1ff] text-[#005CCC] flex items-center justify-center font-semibold">
                    {(featured.authorName || 'A').slice(0, 1).toUpperCase()}
                  </span>
                  {featured.authorName || 'Astera Team'}
                </span>
                <span>•</span>
                <span>{formatDate(featured.publishedAt)}</span>
                <span>•</span>
                <span>{getReadingTime(featured.excerpt)}</span>
              </div>
            </div>
          </Link>
        )}

        {/* Main layout like screenshot: Left filters + HubSpot card, Right vertical list */}
        <div className="blog-astera grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-8">
          <aside className="space-y-5">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_18px_50px_-38px_rgba(0,0,0,0.35)] p-6">
              <div className="space-y-6">
                {/* Search */}
                <div>
                  <div className="text-sm font-semibold text-slate-800 mb-3">Search</div>
                  <div className="relative">
                    <input
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                      placeholder="Search blogs..."
                      className="pl-10 pr-4 py-2.5 w-full rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#005CCC]"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M21 21l-4.3-4.3" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-800">Solutions</div>
                  <select
                    value={solution}
                    onChange={(e) => { setSolution(e.target.value); setPage(1); }}
                    className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#005CCC]"
                  >
                    <option value="all">Select Solutions</option>
                    {SOLUTIONS.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-800">Industry</div>
                  <select
                    value={industry}
                    onChange={(e) => { setIndustry(e.target.value); setPage(1); }}
                    className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#005CCC]"
                  >
                    <option value="all">Select Industry</option>
                    {INDUSTRY.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-800">Technologies</div>
                  <select
                    value={technology}
                    onChange={(e) => { setTechnology(e.target.value); setPage(1); }}
                    className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#005CCC]"
                  >
                    <option value="all">Select Technologies</option>
                    {TECHNOLOGIES.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-[0_22px_60px_-40px_rgba(0,0,0,0.35)]">
              <div className="bg-[#005CCC] p-6">
                <div className="text-white font-semibold text-lg">Sign up for AsteraBytes!</div>
                <div className="text-white/85 text-sm mt-2 leading-relaxed">
                  Get monthly data insights, trends, best practices, and more in your inbox.
                </div>
                <div id="hubspot-asterabytes-form" className="mt-5" />
              </div>
            </div>
          </aside>

          <div className="space-y-5">
            {current.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-[160px_1fr] sm:grid-cols-[220px_1fr] gap-6 bg-white rounded-2xl border border-slate-100 shadow-[0_18px_55px_-45px_rgba(0,0,0,0.35)] p-5 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="relative rounded-2xl overflow-hidden h-[120px] sm:h-[150px]">
                  <img
                    src={post.coverImage || post.featuredImage || FALLBACK_COVER}
                    alt={post.title}
                    onError={handleImageError}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="min-w-0">
                  <div className="inline-flex items-center gap-2 text-[10px] font-semibold text-[#F59E0B] bg-[#FFF7ED] px-2 py-1 rounded-md">
                    BLOG
                  </div>
                  <h3 className="mt-2 text-base sm:text-lg font-semibold text-slate-900 leading-snug line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-2 text-xs text-slate-500">
                    By {post.authorName || 'Astera Team'}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-10 flex items-center justify-center gap-2 text-sm">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="px-3 py-1.5 rounded-md border border-slate-200 bg-white disabled:opacity-50"
          >
            Prev
          </button>

          {visibleNumbers.map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`w-9 h-9 rounded-md border text-sm font-semibold transition-colors ${
                n === currentPage
                  ? 'bg-[#005CCC] border-[#005CCC] text-white'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-[#005CCC]'
              }`}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="px-3 py-1.5 rounded-md border border-slate-200 bg-white disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default BlogListClient;
