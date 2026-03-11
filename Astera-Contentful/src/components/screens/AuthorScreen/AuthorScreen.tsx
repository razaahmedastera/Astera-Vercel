import Link from 'next/link';
import Image from 'next/image';
import type { BlogAuthor, BlogPost } from '@/types/contentful';
import './AuthorScreen.css';

type Props = {
  author: BlogAuthor;
  posts: BlogPost[];
};

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80';

function formatDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Social media icons
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function WebsiteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}

function ArticleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

export function AuthorScreen({ author, posts }: Props) {
  const initials = (author.name || 'A').charAt(0).toUpperCase();
  const hasSocials = author.socialLinkedin || author.socialTwitter || author.socialWebsite;

  return (
    <div>
      {/* Hero Section */}
      <section className="author-hero">
        <div className="section-container">
          <div className="author-hero-content">
            {/* Avatar */}
            <div className="author-avatar-wrapper">
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={160}
                  height={160}
                  className="author-avatar-large"
                  priority
                />
              ) : (
                <div className="author-avatar-placeholder">
                  {initials}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="author-info">
              <h1 className="author-name">{author.name}</h1>
              {author.jobTitle && (
                <p className="author-job-title">{author.jobTitle}</p>
              )}
              {!author.jobTitle && author.role && (
                <p className="author-job-title">{author.role}</p>
              )}
              {author.bio && (
                <p className="author-bio">{author.bio}</p>
              )}

              {/* Social Links */}
              {hasSocials && (
                <div className="author-social-links">
                  {author.socialLinkedin && (
                    <a
                      href={author.socialLinkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="author-social-link"
                      title="LinkedIn"
                    >
                      <LinkedInIcon />
                    </a>
                  )}
                  {author.socialTwitter && (
                    <a
                      href={author.socialTwitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="author-social-link"
                      title="Twitter / X"
                    >
                      <TwitterIcon />
                    </a>
                  )}
                  {author.socialWebsite && (
                    <a
                      href={author.socialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="author-social-link"
                      title="Website"
                    >
                      <WebsiteIcon />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Long Bio Section */}
      {author.longBio && (
        <section className="author-long-bio-section">
          <div className="section-container">
            <h2 className="author-long-bio-title">About {author.name}</h2>
            <p className="author-long-bio-text">{author.longBio}</p>
          </div>
        </section>
      )}

      {/* Blog Posts Section */}
      <section className="author-posts-section">
        <div className="section-container">
          <div className="author-posts-header">
            <h2 className="author-posts-title">
              Articles by {author.name}
            </h2>
            <span className="author-posts-count">
              {posts.length} {posts.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          {posts.length > 0 ? (
            <div className="author-posts-grid">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/type/blog/${post.slug}`}
                  className="author-post-card"
                  prefetch={true}
                >
                  {/* Image */}
                  <div className="author-post-card-image">
                    {post.featuredImage ? (
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div className="author-post-card-image-placeholder">
                        <ArticleIcon />
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="author-post-card-body">
                    {post.category?.name && (
                      <span className="author-post-card-category">
                        {post.category.name}
                      </span>
                    )}
                    <h3 className="author-post-card-title">{post.title}</h3>
                    {post.excerpt && (
                      <p className="author-post-card-excerpt">{post.excerpt}</p>
                    )}

                    {/* Footer */}
                    <div className="author-post-card-footer">
                      <span className="author-post-card-date">
                        <CalendarIcon />
                        {formatDate(post.publishedAt)}
                      </span>
                      <span className="author-post-card-read">
                        Read more <ArrowIcon />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="author-posts-empty">
              <div className="author-posts-empty-icon">
                <ArticleIcon />
              </div>
              <h3 className="author-posts-empty-title">No articles yet</h3>
              <p className="author-posts-empty-text">
                {author.name} hasn&apos;t published any articles yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default AuthorScreen;
