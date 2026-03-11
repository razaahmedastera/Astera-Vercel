'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SmartLink from '@/components/ui/SmartLink/SmartLink';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES, type Document } from '@contentful/rich-text-types';
import type { NewsPost } from '@/types/contentful';

interface Props {
  post: NewsPost;
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function getCategoryColor(cat?: string): string {
  switch (cat) {
    case 'Product Update': return '#005CCC';
    case 'Award': return '#059669';
    case 'Press Release': return '#7c3aed';
    case 'Company News': return '#0891b2';
    case 'Partnership': return '#d97706';
    case 'Event': return '#dc2626';
    default: return '#005CCC';
  }
}

const richTextOptions = {
  renderMark: {
    [MARKS.BOLD]: (text: React.ReactNode) => <strong className="font-semibold">{text}</strong>,
    [MARKS.ITALIC]: (text: React.ReactNode) => <em className="italic">{text}</em>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
      <p className="text-[16px] text-[#374151] leading-[1.85] mb-6">{children}</p>
    ),
    [BLOCKS.HEADING_2]: (_node: any, children: React.ReactNode) => (
      <h2 className="text-2xl font-bold text-[#0f1c2e] mt-12 mb-4">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (_node: any, children: React.ReactNode) => (
      <h3 className="text-xl font-bold text-[#0f1c2e] mt-10 mb-3">{children}</h3>
    ),
    [BLOCKS.UL_LIST]: (_node: any, children: React.ReactNode) => (
      <ul className="list-disc pl-6 mb-6 space-y-2">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (_node: any, children: React.ReactNode) => (
      <ol className="list-decimal pl-6 mb-6 space-y-2">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (_node: any, children: React.ReactNode) => (
      <li className="text-[16px] text-[#374151] leading-relaxed">{children}</li>
    ),
    [BLOCKS.QUOTE]: (_node: any, children: React.ReactNode) => (
      <blockquote className="border-l-[3px] border-[#005CCC] pl-6 my-8 italic text-[#4b5563]">{children}</blockquote>
    ),
    [INLINES.HYPERLINK]: (node: any, children: React.ReactNode) => (
      <SmartLink href={node.data.uri} className="text-[#005CCC] underline decoration-[#005CCC]/30 underline-offset-2 hover:decoration-[#005CCC] transition-colors">{children}</SmartLink>
    ),
  },
};

export default function NewsDetailScreen({ post }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => { setIsVisible(true); }, []);

  const baseUrl = typeof window !== 'undefined'
    ? window.location.origin
    : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');

  const color = getCategoryColor(post.category);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: post.title,
    datePublished: post.publishedDate,
    dateModified: post.updatedAt,
    ...(post.featuredImage && { image: post.featuredImage }),
    publisher: {
      '@type': 'Organization',
      name: 'Astera',
      logo: { '@type': 'ImageObject', url: `${baseUrl}/logo.png` },
    },
    mainEntityOfPage: `${baseUrl}/news/${post.slug}`,
  };

  const shareUrl = `${baseUrl}/news/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <div className="min-h-screen bg-white">
        {/* ─── HERO ─── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] to-white pt-28 pb-0 md:pt-36">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #005CCC 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          <div className="section-container relative z-10">
            <div className={`transition-opacity duration-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
              {/* Breadcrumb */}
              <Link href="/news" className="inline-flex items-center gap-2 text-sm text-[#005CCC] font-medium hover:text-[#004299] transition-colors mb-8 group">
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
                Back to News
              </Link>

              <div className="max-w-3xl">
                <div className="flex items-center gap-3 mb-5">
                  {post.category && (
                    <span
                      className="inline-block text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                      style={{ color, backgroundColor: `${color}10` }}
                    >
                      {post.category}
                    </span>
                  )}
                  <time className="text-sm text-[#9ca3af]">{formatDate(post.publishedDate)}</time>
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-[44px] font-bold text-[#0f1c2e] leading-[1.55] md:leading-[3.1rem] tracking-tight">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CONTENT ─── */}
        <section className="py-10 md:py-14">
          <div className="section-container">
            <div className="max-w-3xl">
              {/* Featured image */}
              {post.featuredImage && (
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-10 shadow-xl shadow-black/[0.08] ring-1 ring-black/[0.04]">
                  <Image src={post.featuredImage} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
                </div>
              )}

              {/* Rich text */}
              {post.content ? (
                <article className="news-prose">
                  {documentToReactComponents(post.content as Document, richTextOptions)}
                </article>
              ) : post.excerpt ? (
                <p className="text-[16px] text-[#374151] leading-[1.85]">{post.excerpt}</p>
              ) : null}

              {/* Share + navigation */}
              <div className="mt-14 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <Link href="/news" className="inline-flex items-center gap-2 text-sm font-semibold text-[#005CCC] hover:text-[#004299] transition-colors group">
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
                    All News
                  </Link>

                  {/* Share buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#9ca3af] mr-1">Share</span>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#f1f5f9] hover:bg-[#005CCC] hover:text-white text-[#6b7280] flex items-center justify-center transition-all"
                      title="Share on X"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-lg bg-[#f1f5f9] hover:bg-[#0077b5] hover:text-white text-[#6b7280] flex items-center justify-center transition-all"
                      title="Share on LinkedIn"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
