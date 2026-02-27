'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import type { BlogPost } from '@/types/contentful';
import type { CategoryDefinition } from '@/lib/categories';

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80';

const GROUP_LABELS: Record<string, string> = {
  topic: 'Topic',
  industry: 'Industry',
  product: 'Product',
  'knowledge-center': 'Knowledge Center',
  type: 'Resource Type',
  other: 'Category',
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

function getAuthorSlug(post: BlogPost): string {
  if (post.author?.slug) return post.author.slug;
  const name = post.authorName || post.author?.name || 'astera-team';
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

type Props = {
  category: CategoryDefinition;
  posts: BlogPost[];
  pageSize?: number;
};

export default function CategoryScreen({ category, posts, pageSize = 12 }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return posts;
    const term = search.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        (post.excerpt || '').toLowerCase().includes(term),
    );
  }, [posts, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const current = filtered.slice(start, start + pageSize);

  const totalNumberButtons = 7;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  const visibleNumbers = pageNumbers.slice(
    Math.max(0, currentPage - Math.ceil(totalNumberButtons / 2)),
    Math.max(0, currentPage - Math.ceil(totalNumberButtons / 2)) + totalNumberButtons,
  );

  const groupLabel = GROUP_LABELS[category.group] || 'Category';

  return (
    <section
      className="py-12 sm:py-14 lg:py-16"
      style={{
        background: 'linear-gradient(180deg, #f4f7ff 0%, #f9fbff 50%, #ffffff 100%)',
      }}
    >
      <div className="section-container">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-[#005CCC] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#005CCC] transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-slate-800 font-medium">{category.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <span className="inline-flex items-center text-xs font-semibold text-[#005CCC] bg-[#e8f1ff] px-3 py-1 rounded-full mb-3">
            {groupLabel}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            {category.name}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl">
            {category.description}
          </p>
        </div>

        {/* Search + Count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <p className="text-sm text-slate-500">
            {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} found
          </p>
          <div className="relative w-full sm:w-80">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={`Search in ${category.name}...`}
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

        {/* Posts Grid */}
        {current.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {current.map((post) => (
              <Link
                key={post.id}
                href={`/type/blog/${post.slug}`}
                prefetch={true}
                className="group bg-white rounded-2xl border border-slate-100 shadow-[0_18px_55px_-45px_rgba(0,0,0,0.35)] overflow-hidden hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={post.coverImage || post.featuredImage || FALLBACK_COVER}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    onError={handleImageError}
                  />
                </div>

                <div className="p-5">
                  <div className="inline-flex items-center text-[10px] font-semibold text-[#005CCC] bg-[#e8f1ff] px-2 py-0.5 rounded-md mb-2">
                    {category.name.toUpperCase()}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug line-clamp-2 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-6 h-6 rounded-full bg-[#e8f1ff] text-[#005CCC] flex items-center justify-center text-[10px] font-semibold">
                        {(post.authorName || 'A').slice(0, 1).toUpperCase()}
                      </span>
                      <span
                        className="hover:text-[#005CCC] transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {post.authorName || 'Astera Team'}
                      </span>
                    </span>
                    <span>•</span>
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>•</span>
                    <span>{getReadingTime(post.excerpt)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">📝</div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">No articles found</h2>
            <p className="text-slate-500 mb-6">
              {search
                ? `No articles matching "${search}" in ${category.name}.`
                : `No articles have been tagged with "${category.name}" yet.`}
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#005CCC] text-white text-sm font-semibold rounded-lg hover:bg-[#004aad] transition-colors"
            >
              Browse All Blogs
            </Link>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
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
        )}
      </div>
    </section>
  );
}
