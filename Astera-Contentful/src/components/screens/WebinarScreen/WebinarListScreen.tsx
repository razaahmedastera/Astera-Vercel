'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Webinar } from '@/types/contentful';
import './WebinarScreen.css';

interface Props {
  webinars: Webinar[];
}

type TabFilter = 'all' | 'upcoming' | 'recorded';

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

function getYouTubeThumbnail(url: string): string {
  if (!url) return '';
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
  }
  return '';
}

function getCardImage(webinar: Webinar): string {
  if (webinar.featuredImage) return webinar.featuredImage;
  if (webinar.recordingUrl) return getYouTubeThumbnail(webinar.recordingUrl);
  return '';
}

function WebinarCard({ webinar }: { webinar: Webinar }) {
  const isUpcoming = !webinar.isCompleted;
  const cardImage = getCardImage(webinar);

  return (
    <Link href={`/type/webinars/${webinar.slug}`} className="webinar-card">
      <div className="webinar-card-image">
        {cardImage ? (
          <Image
            src={cardImage}
            alt={webinar.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            style={{ objectFit: 'cover' }}
          />
        ) : null}
        <span className={`webinar-card-badge ${isUpcoming ? 'webinar-card-badge--upcoming' : 'webinar-card-badge--recorded'}`}>
          {isUpcoming ? 'Upcoming' : 'Watch Recording'}
        </span>
      </div>
      <div className="webinar-card-body">
        {webinar.category && (
          <p className="webinar-card-category">{webinar.category}</p>
        )}
        <h3 className="webinar-card-title">{webinar.title}</h3>
        <p className="webinar-card-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {webinar.timezone || formatDate(webinar.webinarDate)}
        </p>
        {webinar.description && (
          <p className="webinar-card-desc">{webinar.description}</p>
        )}
      </div>
      {webinar.speakers && webinar.speakers.length > 0 && (
        <div className="webinar-card-footer">
          <div className="webinar-card-speakers">
            {webinar.speakers.slice(0, 3).map((s, i) => (
              s.image ? (
                <Image
                  key={i}
                  src={s.image}
                  alt={s.name}
                  width={32}
                  height={32}
                  className="webinar-card-speaker-avatar"
                  title={s.name}
                />
              ) : (
                <div
                  key={i}
                  className="webinar-card-speaker-avatar webinar-card-speaker-avatar--ph"
                  title={s.name}
                >
                  {s.name.charAt(0)}
                </div>
              )
            ))}
          </div>
          <span className="webinar-card-speaker-names">
            {webinar.speakers.map(s => s.name).join(', ')}
          </span>
        </div>
      )}
    </Link>
  );
}

export default function WebinarListScreen({ webinars }: Props) {
  const [filter, setFilter] = useState<TabFilter>('all');

  const filtered = useMemo(() => {
    if (filter === 'upcoming') return webinars.filter(w => !w.isCompleted);
    if (filter === 'recorded') return webinars.filter(w => w.isCompleted);
    return webinars;
  }, [webinars, filter]);

  const upcomingCount = webinars.filter(w => !w.isCompleted).length;
  const recordedCount = webinars.filter(w => w.isCompleted).length;

  return (
    <div>
      <section className="webinar-page-header">
        <div className="section-container">
          <div className="webinar-page-header-inner">
            <h1 className="webinar-page-title">Webinars</h1>
            <p className="webinar-page-subtitle">
              Expert-led sessions on data management, automation, and AI-powered solutions.
            </p>
          </div>
          <div className="webinar-tabs">
            <button
              className={`webinar-tab ${filter === 'all' ? 'webinar-tab--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({webinars.length})
            </button>
            <button
              className={`webinar-tab ${filter === 'upcoming' ? 'webinar-tab--active' : ''}`}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming ({upcomingCount})
            </button>
            <button
              className={`webinar-tab ${filter === 'recorded' ? 'webinar-tab--active' : ''}`}
              onClick={() => setFilter('recorded')}
            >
              Recorded ({recordedCount})
            </button>
          </div>
        </div>
      </section>

      <section className="webinar-list-section">
        <div className="section-container">
          {filtered.length > 0 ? (
            <div className="webinar-grid">
              {filtered.map((w) => (
                <WebinarCard key={w.id} webinar={w} />
              ))}
            </div>
          ) : (
            <div className="webinar-empty">
              <h3>No webinars found</h3>
              <p>Check back soon for new sessions.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
