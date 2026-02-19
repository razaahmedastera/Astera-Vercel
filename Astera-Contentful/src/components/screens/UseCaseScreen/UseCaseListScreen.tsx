'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { UseCaseSummary } from '@/types/contentful';
import './UseCaseScreen.css';

interface Props {
  useCases?: UseCaseSummary[];
}

// Mock data - minimum 9 use cases (fallback if no Contentful data)
const mockUseCases: UseCaseSummary[] = [
  {
    id: '1',
    slug: 'mortgage-data-extraction',
    title: 'Mortgage Data Extraction',
    description: 'Consolidate mortgage data extraction and cut down on multiple workflows.',
    icon: 'mortgage',
    category: 'Finance',
    featured: true,
  },
  {
    id: '2',
    slug: 'customer-360-view',
    title: 'Customer 360 View',
    description: 'Integrate data from diverse sources into a single, unified platform.',
    icon: 'customer',
    category: 'CRM',
  },
  {
    id: '3',
    slug: 'sales-reporting',
    title: 'Sales Reporting',
    description: 'Consolidate sales data from multiple sources quickly. Evaluate your performance by looking at your data.',
    icon: 'sales',
    category: 'Analytics',
  },
  {
    id: '4',
    slug: 'omnichannel-data-integration',
    title: 'Omnichannel Data Integration',
    description: 'Consolidate data from numerous sales channels, integrating it into a single system.',
    icon: 'integration',
    category: 'Integration',
  },
  {
    id: '5',
    slug: 'shipping-document-processing',
    title: 'Shipping Document Processing',
    description: 'Get all of the work done regarding your shipping document processing.',
    icon: 'shipping',
    category: 'Logistics',
  },
  {
    id: '6',
    slug: 'legacy-systems-healthcare',
    title: 'Legacy Systems in Healthcare',
    description: 'Embrace modern, cloud-based solutions.',
    icon: 'healthcare',
    category: 'Healthcare',
  },
  {
    id: '7',
    slug: 'clinical-data-warehousing',
    title: 'Clinical Data Warehousing',
    description: 'Centralize patient data. Make faster, smarter healthcare decisions.',
    icon: 'clinical',
    category: 'Healthcare',
  },
  {
    id: '8',
    slug: 'clinical-trials-tracking',
    title: 'Test Tracking Clinical Trials with Data Preparation',
    description: 'Cleanse, filter, and validate your data to pave the way for reliable results in clinical trials.',
    icon: 'trials',
    category: 'Healthcare',
  },
  {
    id: '9',
    slug: 'legacy-systems-retail',
    title: 'Modernizing Legacy Systems in Retail',
    description: 'Step into a digital future. Upgrade outdated, legacy systems.',
    icon: 'retail',
    category: 'Retail',
  },
  {
    id: '10',
    slug: 'account-reconciliation',
    title: 'Simplify Account Reconciliation',
    description: 'Effortlessly reduce errors, detect fraud, and ensure the accuracy of your financial records with Astera Intelligence.',
    icon: 'reconciliation',
    category: 'Finance',
  },
  {
    id: '11',
    slug: 'bank-statement-extraction',
    title: 'Bank Statement Data Extraction',
    description: 'Accurately extract bank statement data. Do hours of work in seconds.',
    icon: 'bank',
    category: 'Finance',
  },
  {
    id: '12',
    slug: 'policy-underwriting',
    title: 'Effortless Policy Underwriting',
    description: 'Accurately determine risk. Quickly write policies.',
    icon: 'insurance',
    category: 'Insurance',
  },
];

const ITEMS_PER_PAGE = 9;

// Icon component helper
function UseCaseIcon({ iconType, iconImage }: { iconType?: string; iconImage?: string }) {
  // Use Contentful icon image if available
  if (iconImage) {
    return (
      <div className="use-case-icon">
        <img src={iconImage} alt="" className="use-case-icon-image" />
      </div>
    );
  }

  // Fallback to SVG icons
  const iconMap: Record<string, JSX.Element> = {
    mortgage: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="16" height="14" rx="2" stroke="#005CCC" strokeWidth="2" fill="none"/>
        <path d="M8 10h8M8 14h6" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 2L4 6v2h16V6L12 2Z" stroke="#005CCC" strokeWidth="2" strokeLinejoin="round" fill="#EFF5FF"/>
      </svg>
    ),
    customer: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="8" r="4" stroke="#005CCC" strokeWidth="2" fill="#EFF5FF"/>
        <path d="M6 21c0-4 2.5-6 6-6s6 2 6 6" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 12l4 4m0-4l-4 4" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    sales: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="16" height="12" rx="2" stroke="#005CCC" strokeWidth="2" fill="none"/>
        <path d="M4 10h16M8 14h8" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
        <path d="M6 18l2-2 2 2 4-4 2 2" stroke="#005CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    integration: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#005CCC" strokeWidth="2" strokeLinejoin="round" fill="#EFF5FF"/>
        <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#005CCC" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    ),
    shipping: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="8" width="20" height="12" rx="2" stroke="#005CCC" strokeWidth="2" fill="none"/>
        <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#005CCC" strokeWidth="2"/>
        <circle cx="7" cy="18" r="2" fill="#005CCC"/>
        <circle cx="17" cy="18" r="2" fill="#005CCC"/>
      </svg>
    ),
    healthcare: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="#005CCC" strokeWidth="2" fill="none"/>
        <path d="M12 8v8M8 12h8" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 2L15 8l6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1L12 2Z" stroke="#005CCC" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    clinical: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="2" stroke="#005CCC" strokeWidth="2" fill="none"/>
        <path d="M8 8h8v8H8z" stroke="#005CCC" strokeWidth="2"/>
        <path d="M12 4v16M4 12h16" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    trials: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 2v20M15 2v20M3 12h18" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="9" cy="7" r="2" fill="#005CCC"/>
        <circle cx="15" cy="17" r="2" fill="#005CCC"/>
      </svg>
    ),
    retail: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6z" stroke="#005CCC" strokeWidth="2" strokeLinejoin="round" fill="#EFF5FF"/>
        <path d="M3 6h18M9 10v6M15 10v6" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    reconciliation: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="16" height="12" rx="2" stroke="#005CCC" strokeWidth="2" fill="none"/>
        <path d="M8 10h8M8 14h6" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 18l2-2 4-4" stroke="#005CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M15 18l2-2" stroke="#005CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bank: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="6" width="16" height="12" rx="2" stroke="#005CCC" strokeWidth="2" fill="none"/>
        <path d="M8 10h8M8 14h6" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 2L4 6v2h16V6L12 2Z" stroke="#005CCC" strokeWidth="2" strokeLinejoin="round" fill="#EFF5FF"/>
      </svg>
    ),
    insurance: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 7v5c0 4 4 7 8 10 4-3 8-6 8-10V7L12 2Z" stroke="#005CCC" strokeWidth="2" strokeLinejoin="round" fill="#EFF5FF"/>
        <path d="M9 12l2 2 4-4" stroke="#005CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  };

  return (
    <div className="use-case-icon">
      {(iconType && iconMap[iconType]) ? iconMap[iconType] : iconMap.mortgage}
    </div>
  );
}

export default function UseCaseListScreen({ useCases = [] }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Use Contentful data or fallback to mock data
  const allUseCases = useCases.length > 0 ? useCases : mockUseCases;

  // Filter use cases based on search
  const filteredUseCases = useMemo(() => {
    if (!searchTerm) return allUseCases;
    const term = searchTerm.toLowerCase();
    return allUseCases.filter(
      (useCase) =>
        useCase.title.toLowerCase().includes(term) ||
        useCase.description.toLowerCase().includes(term) ||
        useCase.category?.toLowerCase().includes(term)
    );
  }, [searchTerm, allUseCases]);

  // Get featured use case (first featured one)
  const featuredUseCase = allUseCases.find((uc) => uc.featured) || allUseCases[0];

  // Pagination
  const totalPages = Math.ceil(filteredUseCases.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUseCases = filteredUseCases.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

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
      <section className="use-case-featured">
        <div className="section-container">
          <div className="use-case-featured-card">
            <div className="use-case-featured-icon-wrapper">
              <UseCaseIcon iconType={featuredUseCase.icon} iconImage={featuredUseCase.iconImage} />
            </div>
            <div className="use-case-featured-content">
              <h2 className="use-case-featured-title">{featuredUseCase.title}</h2>
              <p className="use-case-featured-description">{featuredUseCase.description}</p>
              <Link href={`/use-cases/${featuredUseCase.slug}`} prefetch={true} className="use-case-featured-link">
                Read Use Case
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="use-case-featured-indicators">
              <div className="use-case-indicator active"></div>
              <div className="use-case-indicator"></div>
              <div className="use-case-indicator"></div>
              <div className="use-case-indicator"></div>
              <div className="use-case-indicator"></div>
            </div>
            <button className="use-case-featured-nav" aria-label="Next featured">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

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
          <div className="use-case-grid">
            {paginatedUseCases.map((useCase) => (
              <Link
                key={useCase.id}
                href={`/use-cases/${useCase.slug}`}
                prefetch={true}
                className="use-case-card"
              >
                <div className="use-case-card-icon">
                  <UseCaseIcon iconType={useCase.icon} iconImage={useCase.iconImage} />
                </div>
                <h3 className="use-case-card-title">{useCase.title}</h3>
                <p className="use-case-card-description">{useCase.description}</p>
              </Link>
            ))}
          </div>

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

          {/* View More Button (if more items available) */}
          {filteredUseCases.length > ITEMS_PER_PAGE && currentPage < totalPages && (
            <div className="use-case-view-more">
              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                className="btn-primary use-case-view-more-btn"
              >
                View More
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
            <button className="btn-primary use-case-cta-button">Let&apos;s Chat</button>
          </div>
        </div>
      </section>
    </div>
  );
}
