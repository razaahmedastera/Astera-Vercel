'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Webinar } from '@/types/contentful';
import ContactUsHubSpotForm from '@/components/ui/HubSpotForm/ContactUsHubSpotForm';
import WebinarHeroAiSvg from './WebinarHeroAiSvg';
import './WebinarScreen.css';

interface Props {
  webinar: Webinar;
}

function getYouTubeVideoId(url: string): string {
  if (!url) return '';
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }
  return '';
}

function getYouTubeEmbedUrl(url: string): string {
  const id = getYouTubeVideoId(url);
  if (id) return `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
  if (url.includes('youtube.com/embed/')) return url;
  return url;
}

function getYouTubeThumbnail(url: string): string {
  const id = getYouTubeVideoId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : '';
}

function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export default function WebinarDetailScreen({ webinar }: Props) {
  const isPost = webinar.isCompleted;
  const embedUrl = webinar.recordingUrl ? getYouTubeEmbedUrl(webinar.recordingUrl) : null;
  const thumbnail = webinar.recordingUrl ? getYouTubeThumbnail(webinar.recordingUrl) : '';
  const dateLabel = isPost ? `Recorded ${formatDate(webinar.webinarDate)}` : (webinar.timezone || formatDate(webinar.webinarDate));

  const [videoOpen, setVideoOpen] = useState(false);

  const openVideo = useCallback(() => setVideoOpen(true), []);
  const closeVideo = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setVideoOpen(false);
  }, []);

  if (isPost) {
    return (
      <div className="webinar-detail-page">
        {/* Video modal */}
        {videoOpen && embedUrl && (
          <div className="webinar-video-modal" onClick={closeVideo}>
            <button className="webinar-video-modal-close" onClick={() => setVideoOpen(false)} aria-label="Close video">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
            <div className="webinar-video-modal-inner">
              <iframe
                src={`${embedUrl}&autoplay=1`}
                title={webinar.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        )}

        {/* Section 1: Left = featured image / YouTube thumbnail, Right = Key Takeaways */}
        <section className="webinar-post-hero">
          <div className="section-container webinar-post-hero-grid">
            <div className="webinar-post-hero-left">
              {webinar.featuredImage ? (
                <div className="webinar-post-thumbnail" onClick={embedUrl ? openVideo : undefined} role={embedUrl ? 'button' : undefined} tabIndex={embedUrl ? 0 : undefined}>
                  <Image src={webinar.featuredImage} alt={webinar.title} fill className="webinar-post-thumbnail-img" sizes="(max-width: 768px) 100vw, 55vw" priority />
                  {embedUrl && (
                    <div className="webinar-post-play-overlay">
                      <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="rgba(0,92,204,0.85)" /><path d="M26 20l18 12-18 12V20z" fill="#fff" /></svg>
                    </div>
                  )}
                </div>
              ) : thumbnail && embedUrl ? (
                <div className="webinar-post-thumbnail" onClick={openVideo} role="button" tabIndex={0}>
                  <Image src={thumbnail} alt={webinar.title} fill className="webinar-post-thumbnail-img" sizes="(max-width: 768px) 100vw, 55vw" priority />
                  <div className="webinar-post-play-overlay">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="32" fill="rgba(0,92,204,0.85)" /><path d="M26 20l18 12-18 12V20z" fill="#fff" /></svg>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="webinar-post-hero-right">
              <h3 className="webinar-post-takeaways-title">KEY TAKEAWAYS</h3>
              {webinar.keyTakeaways && webinar.keyTakeaways.length > 0 ? (
                <ul className="webinar-post-takeaways-list">
                  {webinar.keyTakeaways.map((item, i) => (
                    <li key={i}>
                      <span className="webinar-post-takeaway-dot" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="webinar-post-takeaways-empty">Watch the recording to learn more.</p>
              )}
            </div>
          </div>
        </section>

        {/* Section 2: Left = title, category, about, description. Right = speakers */}
        <section className="webinar-post-body">
          <div className="section-container webinar-post-body-grid">
            <div className="webinar-post-body-left">
              {webinar.category && (
                <span className="webinar-post-category">{webinar.category}</span>
              )}
              <h1 className="webinar-post-title">{webinar.title}</h1>

              {webinar.description && (
                <>
                  <h4 className="webinar-post-about-label">About the webinar</h4>
                  <div className="webinar-post-description">
                    {webinar.description.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </>
              )}

              {webinar.bulletPoints && webinar.bulletPoints.length > 0 && (
                <ul className="webinar-post-bullets">
                  {webinar.bulletPoints.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}

              <div className="webinar-main-cta" style={{ marginTop: 24 }}>
                <Link href="/webinars" className="webinar-cta-btn">Browse all webinars</Link>
              </div>
            </div>

            <div className="webinar-post-body-right">
              {webinar.speakers && webinar.speakers.length > 0 && (
                <div className="webinar-post-speakers">
                  {webinar.speakers.map((s, i) => (
                    <div key={i} className="webinar-post-speaker-card">
                      {s.image ? (
                        <Image src={s.image} alt={s.name} width={56} height={56} className="webinar-post-speaker-avatar" />
                      ) : (
                        <div className="webinar-post-speaker-avatar webinar-post-speaker-avatar--ph">{s.name.charAt(0)}</div>
                      )}
                      <div className="webinar-post-speaker-info">
                        <strong>{s.name}</strong>
                        {s.title && <span className="webinar-post-speaker-title">{s.title}</span>}
                        {s.bio && <p className="webinar-post-speaker-bio">{s.bio}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Upcoming webinar layout (unchanged)
  return (
    <div className="webinar-detail-page">
      <header className="webinar-header">
        <div className="section-container webinar-header-grid">
          <div className="webinar-header-text">
            {webinar.category && (
              <span className="webinar-header-tag">{webinar.category}</span>
            )}
            <h1 className="webinar-header-title">{webinar.title}</h1>
            <p className="webinar-header-date">{dateLabel}</p>
          </div>
          <div className="webinar-header-visual">
            <WebinarHeroAiSvg />
          </div>
        </div>
      </header>

      <main className="webinar-main">
        <div className="section-container webinar-main-grid">
          <div className="webinar-main-left">
            {webinar.description && (
              <div className="webinar-main-description">
                {webinar.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}

            {webinar.bulletPoints && webinar.bulletPoints.length > 0 && (
              <ul className="webinar-main-bullets">
                {webinar.bulletPoints.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}

            {webinar.keyTakeaways && webinar.keyTakeaways.length > 0 && (
              <div className="webinar-main-takeaways">
                <h3>Key takeaways</h3>
                <ul className="webinar-takeaways-list">
                  {webinar.keyTakeaways.map((item, i) => (
                    <li key={i} className="webinar-takeaways-item">
                      <span className="webinar-takeaways-check" aria-hidden>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                          <circle cx="9" cy="9" r="9" fill="#EFF5FF" />
                          <path d="M12 6L7.5 10.5 6 9" stroke="#005CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="webinar-main-cta">
              <a href="#webinar-form" className="webinar-cta-btn" onClick={(e) => {
                e.preventDefault();
                document.getElementById('webinar-form')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Register now
              </a>
            </div>
          </div>

          <div className="webinar-main-right">
            <div className="webinar-main-form" id="webinar-form">
              <ContactUsHubSpotForm
                formId={webinar.hubspotFormId || 'e303b647-597d-4876-bb6a-5a24b4e673fa'}
                containerId={`webinar-form-${webinar.slug}`}
              />
            </div>

            {webinar.speakers && webinar.speakers.length > 0 && (
              <div className="webinar-main-speakers">
                <h3>Speakers</h3>
                <div className="webinar-main-speakers-list">
                  {webinar.speakers.map((s, i) => (
                    <div key={i} className="webinar-speaker">
                      {s.image ? (
                        <Image src={s.image} alt={s.name} width={64} height={64} className="webinar-speaker-img" />
                      ) : (
                        <div className="webinar-speaker-img webinar-speaker-img--ph">{s.name.charAt(0)}</div>
                      )}
                      <div className="webinar-speaker-info">
                        <strong>{s.name}</strong>
                        {s.title && <span className="webinar-speaker-title">{s.title}</span>}
                        {s.bio && (
                          <p className="webinar-speaker-bio">{s.bio}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
