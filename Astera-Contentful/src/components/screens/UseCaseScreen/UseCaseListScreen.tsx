'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { UseCaseSummary } from '@/types/contentful';
import './UseCaseScreen.css';

interface Props {
  useCases?: UseCaseSummary[];
}

const ITEMS_PER_PAGE = 9;

function UseCaseIcon({ iconImage, title }: { iconImage?: string; title: string }) {
  if (iconImage) {
    return (
      <div className="use-case-icon">
        <Image
          src={iconImage}
          alt={title}
          width={48}
          height={48}
          className="use-case-icon-image"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="use-case-icon">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="16" height="14" rx="2" stroke="#005CCC" strokeWidth="2" fill="none"/>
        <path d="M8 10h8M8 14h6" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

export default function UseCaseListScreen({ useCases = [] }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUseCases = useMemo(() => {
    if (!searchTerm) return useCases;
    const term = searchTerm.toLowerCase();
    return useCases.filter(
      (uc) =>
        uc.title.toLowerCase().includes(term) ||
        uc.description.toLowerCase().includes(term) ||
        uc.category?.toLowerCase().includes(term)
    );
  }, [searchTerm, useCases]);

  const featuredUseCase = useCases.find((uc) => uc.featured) || useCases[0];

  const totalPages = Math.ceil(filteredUseCases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUseCases = filteredUseCases.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (useCases.length === 0) {
    return (
      <div className="use-case-list-page">
        <section className="use-case-header">
          <div className="section-container">
            <div className="use-case-header-content">
              <h1 className="use-case-header-title">Browse Our Use Cases</h1>
              <p className="use-case-header-subtitle">
                Use cases coming soon. Please check back later.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="use-case-list-page">
      {/* Header Section */}
      <section className="use-case-header">
        <div className="section-container">
          <div className="use-case-header-content">
            <h1 className="use-case-header-title">Browse Our Use Cases</h1>
            <p className="use-case-header-subtitle">
              Explore how our solution can make a difference at your company.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Use Case Section */}
      {featuredUseCase && (
        <section className="use-case-featured">
          <div className="section-container">
            <div className="use-case-featured-card">
              <div className="use-case-featured-icon-wrapper">
                <UseCaseIcon iconImage={featuredUseCase.iconImage} title={featuredUseCase.title} />
              </div>
              <div className="use-case-featured-content">
                <h2 className="use-case-featured-title">{featuredUseCase.title}</h2>
                <p className="use-case-featured-description">{featuredUseCase.description}</p>
                <Link href={`/by-use-case/${featuredUseCase.slug}`} prefetch={true} className="use-case-featured-link">
                  Read Use Case
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search Section */}
      <section className="use-case-search">
        <div className="section-container">
          <div className="use-case-search-wrapper">
            <svg className="use-case-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Search Use Case"
              value={searchTerm}
              onChange={handleSearchChange}
              className="use-case-search-input"
            />
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section className="use-case-grid-section">
        <div className="section-container">
          {paginatedUseCases.length > 0 ? (
            <div className="use-case-grid">
              {paginatedUseCases.map((useCase) => (
                <Link
                  key={useCase.id}
                  href={`/by-use-case/${useCase.slug}`}
                  prefetch={true}
                  className="use-case-card"
                >
                  <div className="use-case-card-icon">
                    <UseCaseIcon iconImage={useCase.iconImage} title={useCase.title} />
                  </div>
                  <h3 className="use-case-card-title">{useCase.title}</h3>
                  <p className="use-case-card-description">{useCase.description}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="use-case-no-results">
              <p>No use cases found matching &ldquo;{searchTerm}&rdquo;</p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="use-case-pagination">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="use-case-pagination-btn"
                aria-label="Previous page"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Prev
              </button>

              <div className="use-case-pagination-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`use-case-pagination-number ${currentPage === page ? 'active' : ''}`}
                    aria-label={`Page ${page}`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="use-case-pagination-btn"
                aria-label="Next page"
              >
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="use-case-cta">
        <div className="section-container">
          <div className="use-case-cta-content">
            <h2 className="use-case-cta-title">Get Started for Free!</h2>
            <p className="use-case-cta-subtitle">Contact Us Today for a Free Personalized Demo</p>
            <Link href="/contact-us" className="btn-primary use-case-cta-button">Let&apos;s Chat</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
