'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import type { VideoPageContent, VideoPlaylist } from '@/types/contentful';
import './VideoScreen.css';

interface Props {
  content: VideoPageContent;
}

interface PlaylistVideo {
  videoId: string;
  title: string;
  thumbnail: string;
}

function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return `https://www.youtube.com/embed/${match[1]}`;
  }
  if (url.includes('youtube.com/embed/')) return url;
  return url;
}

/* ── Video Popup Modal ── */
function VideoModal({
  videoId,
  title,
  onClose,
}: {
  videoId: string;
  title: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="video-modal-close" onClick={onClose} aria-label="Close video">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="video-modal-embed">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`}
            title={title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <p className="video-modal-title">{title}</p>
      </div>
    </div>
  );
}

/* ── Playlist Carousel ── */
function PlaylistCarousel({
  playlist,
  onPlayVideo,
}: {
  playlist: VideoPlaylist;
  onPlayVideo: (videoId: string, title: string) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [videos, setVideos] = useState<PlaylistVideo[]>(
    () => (playlist.videos || []).map((v) => ({
      ...v,
      thumbnail: v.thumbnail || `https://i.ytimg.com/vi/${v.videoId}/mqdefault.jpg`,
    }))
  );
  const [loading, setLoading] = useState(videos.length === 0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    if (videos.length > 0) return;
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/youtube-playlist?id=${playlist.playlistId}`);
        if (!cancelled && res.ok) {
          const data = await res.json();
          setVideos(data.videos || []);
        }
      } catch { /* ignore */ }
      if (!cancelled) setLoading(false);
    }
    load();
    return () => { cancelled = true; };
  }, [playlist.playlistId, videos.length]);

  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [videos, checkScroll]);

  const scroll = useCallback((dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({
      left: dir === 'left' ? -344 : 344,
      behavior: 'smooth',
    });
  }, []);

  if (!loading && videos.length === 0) return null;

  return (
    <section className="video-playlist-section">
      <div className="section-container">
        <h2 className="video-playlist-title">{playlist.title}</h2>
        <div className="video-playlist-carousel">
          {canScrollLeft && (
            <button
              className="video-playlist-nav video-playlist-nav--prev"
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <div className="video-playlist-track" ref={trackRef}>
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="video-playlist-skeleton">
                    <div className="video-playlist-skeleton-thumb" />
                    <div className="video-playlist-skeleton-title" />
                  </div>
                ))
              : videos.map((video) => (
                  <button
                    key={video.videoId}
                    className="video-playlist-card"
                    onClick={() => onPlayVideo(video.videoId, video.title)}
                    type="button"
                  >
                    <div className="video-playlist-thumb">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        width={320}
                        height={180}
                        loading="lazy"
                        sizes="320px"
                      />
                      <div className="video-playlist-play">
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="#ffffff">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="video-playlist-card-title">{video.title}</div>
                  </button>
                ))
            }
          </div>

          {canScrollRight && (
            <button
              className="video-playlist-nav video-playlist-nav--next"
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Main Video Page ── */
export default function VideoScreen({ content }: Props) {
  const [activeVideo, setActiveVideo] = useState<{ videoId: string; title: string } | null>(null);

  const embedUrl = content.featuredVideoUrl
    ? getYouTubeEmbedUrl(content.featuredVideoUrl)
    : null;

  const handlePlayVideo = useCallback((videoId: string, title: string) => {
    setActiveVideo({ videoId, title });
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveVideo(null);
  }, []);

  return (
    <div className="video-page">
      {/* Video Popup Modal */}
      {activeVideo && (
        <VideoModal
          videoId={activeVideo.videoId}
          title={activeVideo.title}
          onClose={handleCloseModal}
        />
      )}

      {/* Page Header */}
      <section className="video-page-header">
        <div className="section-container">
          <div className="video-page-header-inner">
            <h1 className="video-page-title">{content.pageTitle}</h1>
            {content.pageSubtitle && (
              <p className="video-page-subtitle">{content.pageSubtitle}</p>
            )}
          </div>
        </div>
      </section>

      {/* Featured Video Section */}
      {embedUrl && content.featuredVideoTitle && (
        <section className="video-featured-section">
          <div className="section-container">
            <div className="video-featured-layout">
              <div className="video-featured-embed">
                <iframe
                  src={embedUrl}
                  title={content.featuredVideoTitle}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="video-featured-info">
                <h2 className="video-featured-title">{content.featuredVideoTitle}</h2>
                {content.featuredVideoDescription && (
                  <p className="video-featured-description">
                    {content.featuredVideoDescription}
                  </p>
                )}
                <div className="video-featured-socials">
                  {content.socialFacebook && (
                    <a href={content.socialFacebook} target="_blank" rel="noopener noreferrer" className="video-social-link" aria-label="Facebook">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                    </a>
                  )}
                  {content.socialTwitter && (
                    <a href={content.socialTwitter} target="_blank" rel="noopener noreferrer" className="video-social-link" aria-label="Twitter">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
                    </a>
                  )}
                  {content.socialLinkedin && (
                    <a href={content.socialLinkedin} target="_blank" rel="noopener noreferrer" className="video-social-link" aria-label="LinkedIn">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Playlist Sections */}
      {content.playlists && content.playlists.length > 0 && (
        <>
          {content.playlists.map((playlist, i) => (
            <PlaylistCarousel
              key={playlist.playlistId || i}
              playlist={playlist}
              onPlayVideo={handlePlayVideo}
            />
          ))}
        </>
      )}
    </div>
  );
}
