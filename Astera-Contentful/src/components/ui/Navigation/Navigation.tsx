'use client';

import { useMemo, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { ProductPageSummary, Industry } from '@/types/contentful';
import { MegaMenu, defaultFeaturedContent, defaultWhatsNew, getIconForSlug } from './MegaMenu';
import type { Solution } from './MegaMenu';
import './MegaMenu.css';

interface HeaderProps {
  products: ProductPageSummary[];
  industries: Industry[];
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function getIndustryIcon(name: string) {
  const n = name.toLowerCase();
  if (n.includes('financial')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#005CCC" opacity="0.1"/>
        <path d="M12 6V18M8 10H16M8 14H16" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (n.includes('healthcare') || n.includes('health')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#005CCC" opacity="0.1"/>
        <path d="M12 8V16M8 12H16" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke="#005CCC" strokeWidth="1.5" fill="none"/>
      </svg>
    );
  }
  if (n.includes('education')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#005CCC" opacity="0.1"/>
        <path d="M12 6L4 10L12 14L20 10L12 6Z" stroke="#005CCC" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M4 10V18L12 22L20 18V10" stroke="#005CCC" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    );
  }
  if (n.includes('logistics')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#005CCC" opacity="0.1"/>
        <rect x="4" y="8" width="16" height="10" rx="1" stroke="#005CCC" strokeWidth="2"/>
        <path d="M4 10H20M8 14H16" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    );
  }
  if (n.includes('insurance')) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" fill="#005CCC" opacity="0.1"/>
        <path d="M12 2L4 7V12C4 16 8 19 12 22C16 19 20 16 20 12V7L12 2Z" stroke="#005CCC" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M9 12L11 14L15 10" stroke="#005CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#005CCC" opacity="0.1"/>
      <rect x="6" y="6" width="12" height="12" rx="1" stroke="#005CCC" strokeWidth="2"/>
    </svg>
  );
}

export function Header({ products, industries = [] }: HeaderProps) {
  const pathname = usePathname();

  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);

  const solutions = useMemo(() => {
    return products.map((product: ProductPageSummary) => ({
      name: product.productName,
      slug: product.slug,
      icon: getIconForSlug(product.slug),
    })) as Solution[];
  }, [products]);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    setMobileAccordion(null);
  }, []);

  useEffect(() => {
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const toggleAccordion = (key: string) => {
    setMobileAccordion((prev) => (prev === key ? null : key));
  };

  const isResourceActive = pathname === '/blog' || pathname?.startsWith('/type/blog/') || pathname === '/data-sheet' || pathname?.startsWith('/type/data-sheet/') || pathname === '/e-books' || pathname?.startsWith('/type/e-book/') || pathname === '/videos' || pathname === '/webinars' || pathname?.startsWith('/type/webinars/') || pathname === '/whitepaper' || pathname?.startsWith('/type/whitepaper/');
  const isCompanyActive = pathname === '/company/about-us' || pathname === '/news' || pathname?.startsWith('/news/') || pathname === '/awards-and-recognitions' || pathname === '/partners' || pathname === '/technology-partners';

  const resourceLinks = [
    { href: '/blog', label: 'Blog', active: pathname === '/blog' || pathname?.startsWith('/type/blog/') },
    { href: '/data-sheet', label: 'Data Sheets', active: pathname === '/data-sheet' || pathname?.startsWith('/type/data-sheet/') },
    { href: '/e-books', label: 'eBooks', active: pathname === '/e-books' || pathname?.startsWith('/type/e-book/') },
    { href: '/videos', label: 'Videos', active: pathname === '/videos' },
    { href: '/webinars', label: 'Webinars', active: pathname === '/webinars' || pathname?.startsWith('/type/webinars/') },
    { href: '/whitepaper', label: 'Whitepapers', active: pathname === '/whitepaper' || pathname?.startsWith('/type/whitepaper/') },
  ];

  const companyLinks = [
    { href: '/company/about-us', label: 'About Us', active: pathname === '/company/about-us' },
    { href: '/news', label: 'News', active: pathname === '/news' || pathname?.startsWith('/news/') },
    { href: '/awards-and-recognitions', label: 'Awards & Recognitions', active: pathname === '/awards-and-recognitions' },
    { href: '/partners', label: 'Partners', active: pathname === '/partners' },
    { href: '/technology-partners', label: 'Technology Partners', active: pathname === '/technology-partners' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-gray-200 shadow-sm bg-white">
      <div className="section-container flex items-center h-[60px] sm:h-[68px]">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <Link href="/" prefetch={true}>
            <Image
              src="/images/astera-logo.svg"
              alt="Astera Logo"
              width={120}
              height={32}
              className="h-8 sm:h-10 w-auto object-contain cursor-pointer transition-opacity hover:opacity-80"
              priority
            />
          </Link>
        </div>

        {/* ─── DESKTOP NAV ─── */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 ml-6 xl:ml-10">
          {/* Solutions Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setIsSolutionsOpen(true)}
            onMouseLeave={() => setIsSolutionsOpen(false)}
          >
            <button
              className={`text-[13px] xl:text-sm font-medium transition-colors flex items-center gap-0.5 whitespace-nowrap ${
                isSolutionsOpen || pathname === '/product'
                  ? 'text-[#005CCC] bg-[#EFF5FF]'
                  : 'text-gray-600 hover:text-[#005CCC]'
              } px-2.5 xl:px-3 py-2 rounded-md`}
            >
              Solutions
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            <MegaMenu
              solutions={solutions}
              featuredContent={defaultFeaturedContent}
              whatsNew={defaultWhatsNew}
              isOpen={isSolutionsOpen}
              onClose={() => setIsSolutionsOpen(false)}
            />
          </div>

          {/* Industries Dropdown */}
          {industries.length > 0 && (
            <div
              className="relative"
              onMouseEnter={() => setIsIndustriesOpen(true)}
              onMouseLeave={() => setIsIndustriesOpen(false)}
            >
              <button
                className={`text-[13px] xl:text-sm font-medium transition-colors flex items-center gap-0.5 whitespace-nowrap ${
                  isIndustriesOpen || pathname?.startsWith('/industry-solutions/')
                    ? 'text-[#005CCC] bg-[#EFF5FF]'
                    : 'text-gray-600 hover:text-[#005CCC]'
                } px-2.5 xl:px-3 py-2 rounded-md`}
              >
                Industries
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isIndustriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {isIndustriesOpen && (
                <div
                  className="absolute top-full left-0 pt-2 w-96 z-50"
                  onMouseEnter={() => setIsIndustriesOpen(true)}
                  onMouseLeave={() => setIsIndustriesOpen(false)}
                >
                  <div className="h-2 w-full" />
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-4">
                    <div className="grid grid-cols-2 gap-2">
                      {industries.map((industry) => {
                        const industryPath = `/industry-solutions/${industry.slug}`;
                        return (
                          <Link
                            key={industry.id}
                            href={industryPath}
                            prefetch={true}
                            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                              pathname === industryPath || pathname?.includes(industry.slug)
                                ? 'text-[#005CCC] bg-[#EFF5FF]'
                                : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                            }`}
                            onClick={() => setIsIndustriesOpen(false)}
                          >
                            <div className="flex-shrink-0">{getIndustryIcon(industry.name)}</div>
                            <span className="text-sm font-medium">{industry.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsResourcesOpen(true)}
            onMouseLeave={() => setIsResourcesOpen(false)}
          >
            <button
              className={`text-[13px] xl:text-sm font-medium transition-colors flex items-center gap-0.5 whitespace-nowrap ${
                isResourcesOpen || isResourceActive
                  ? 'text-[#005CCC] bg-[#EFF5FF]'
                  : 'text-gray-600 hover:text-[#005CCC]'
              } px-2.5 xl:px-3 py-2 rounded-md`}
            >
              Resources
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`} />
            </button>

            {isResourcesOpen && (
              <div
                className="absolute top-full left-0 pt-2 w-48 z-50"
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
              >
                <div className="h-2 w-full" />
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={true}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        link.active
                          ? 'text-[#005CCC] bg-[#EFF5FF]'
                          : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                      }`}
                      onClick={() => setIsResourcesOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Use Cases */}
          <Link
            href="/by-use-case"
            prefetch={true}
            className={`text-[13px] xl:text-sm font-medium transition-colors px-2.5 xl:px-3 py-2 rounded-md whitespace-nowrap ${
              pathname === '/by-use-case' || pathname?.startsWith('/by-use-case/')
                ? 'text-[#005CCC] bg-[#EFF5FF]'
                : 'text-gray-600 hover:text-[#005CCC]'
            }`}
          >
            Use Cases
          </Link>

          {/* Customers Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCustomersOpen(true)}
            onMouseLeave={() => setIsCustomersOpen(false)}
          >
            <button
              className={`text-[13px] xl:text-sm font-medium transition-colors flex items-center gap-0.5 whitespace-nowrap ${
                isCustomersOpen || pathname?.startsWith('/customers/')
                  ? 'text-[#005CCC] bg-[#EFF5FF]'
                  : 'text-gray-600 hover:text-[#005CCC]'
              } px-2.5 xl:px-3 py-2 rounded-md`}
            >
              Customers
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCustomersOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCustomersOpen && (
              <div
                className="absolute top-full left-0 pt-2 w-48 z-50"
                onMouseEnter={() => setIsCustomersOpen(true)}
                onMouseLeave={() => setIsCustomersOpen(false)}
              >
                <div className="h-2 w-full" />
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <Link
                    href="/customers/user-reviews"
                    prefetch={true}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === '/customers/user-reviews'
                        ? 'text-[#005CCC] bg-[#EFF5FF]'
                        : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsCustomersOpen(false)}
                  >
                    User Reviews
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Company Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCompanyOpen(true)}
            onMouseLeave={() => setIsCompanyOpen(false)}
          >
            <button
              className={`text-[13px] xl:text-sm font-medium transition-colors flex items-center gap-0.5 whitespace-nowrap ${
                isCompanyOpen || isCompanyActive
                  ? 'text-[#005CCC] bg-[#EFF5FF]'
                  : 'text-gray-600 hover:text-[#005CCC]'
              } px-2.5 xl:px-3 py-2 rounded-md`}
            >
              Company
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isCompanyOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCompanyOpen && (
              <div
                className="absolute top-full left-0 pt-2 w-48 z-50"
                onMouseEnter={() => setIsCompanyOpen(true)}
                onMouseLeave={() => setIsCompanyOpen(false)}
              >
                <div className="h-2 w-full" />
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={true}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        link.active
                          ? 'text-[#005CCC] bg-[#EFF5FF]'
                          : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                      }`}
                      onClick={() => setIsCompanyOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right side: CTA + Hamburger */}
        <div className="flex items-center gap-3 ml-auto">
          <Link
            href="/contact-us"
            prefetch={true}
            className="hidden sm:inline-flex px-5 xl:px-6 py-2 xl:py-2.5 rounded-lg text-sm font-semibold border-none cursor-pointer transition-all bg-[#005CCC] text-white hover:bg-[#0047a3] hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#005CCC]/30"
          >
            Contact Us
          </Link>

          {/* Hamburger — visible below lg */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ─── MOBILE / TABLET DRAWER ─── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-[60px] sm:top-[68px] bg-black/30 z-[999] lg:hidden"
            onClick={closeMobile}
          />

          {/* Drawer */}
          <nav className="fixed top-[60px] sm:top-[68px] left-0 right-0 bottom-0 z-[1000] bg-white overflow-y-auto lg:hidden">
            <div className="px-5 py-4 space-y-1">
              {/* Solutions accordion */}
              <div>
                <button
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                    pathname === '/product' ? 'text-[#005CCC] bg-[#EFF5FF]' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => toggleAccordion('solutions')}
                >
                  Solutions
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'solutions' ? 'rotate-180' : ''}`} />
                </button>
                {mobileAccordion === 'solutions' && (
                  <div className="pl-4 pb-2 space-y-0.5">
                    {solutions.map((sol) => (
                      <Link
                        key={sol.slug}
                        href={`/products/${sol.slug}`}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-[#005CCC] hover:bg-gray-50 transition-colors"
                        onClick={closeMobile}
                      >
                        <span className="w-5 h-5 flex items-center justify-center shrink-0">{sol.icon}</span>
                        {sol.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Industries accordion */}
              {industries.length > 0 && (
                <div>
                  <button
                    className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                      pathname?.startsWith('/industry-solutions/') ? 'text-[#005CCC] bg-[#EFF5FF]' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => toggleAccordion('industries')}
                  >
                    Industries
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'industries' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileAccordion === 'industries' && (
                    <div className="pl-4 pb-2 space-y-0.5">
                      {industries.map((industry) => (
                        <Link
                          key={industry.id}
                          href={`/industry-solutions/${industry.slug}`}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                            pathname?.includes(industry.slug) ? 'text-[#005CCC] bg-[#EFF5FF]' : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                          }`}
                          onClick={closeMobile}
                        >
                          <div className="w-5 h-5 flex items-center justify-center shrink-0">{getIndustryIcon(industry.name)}</div>
                          {industry.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Resources accordion */}
              <div>
                <button
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                    isResourceActive ? 'text-[#005CCC] bg-[#EFF5FF]' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => toggleAccordion('resources')}
                >
                  Resources
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'resources' ? 'rotate-180' : ''}`} />
                </button>
                {mobileAccordion === 'resources' && (
                  <div className="pl-4 pb-2 space-y-0.5">
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          link.active ? 'text-[#005CCC] bg-[#EFF5FF]' : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                        }`}
                        onClick={closeMobile}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Use Cases (direct link) */}
              <Link
                href="/by-use-case"
                className={`block px-3 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                  pathname === '/by-use-case' || pathname?.startsWith('/by-use-case/')
                    ? 'text-[#005CCC] bg-[#EFF5FF]'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={closeMobile}
              >
                Use Cases
              </Link>

              {/* Customers accordion */}
              <div>
                <button
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                    pathname?.startsWith('/customers/') ? 'text-[#005CCC] bg-[#EFF5FF]' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => toggleAccordion('customers')}
                >
                  Customers
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'customers' ? 'rotate-180' : ''}`} />
                </button>
                {mobileAccordion === 'customers' && (
                  <div className="pl-4 pb-2 space-y-0.5">
                    <Link
                      href="/customers/user-reviews"
                      className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        pathname === '/customers/user-reviews' ? 'text-[#005CCC] bg-[#EFF5FF]' : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                      }`}
                      onClick={closeMobile}
                    >
                      User Reviews
                    </Link>
                  </div>
                )}
              </div>

              {/* Company accordion */}
              <div>
                <button
                  className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                    isCompanyActive ? 'text-[#005CCC] bg-[#EFF5FF]' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => toggleAccordion('company')}
                >
                  Company
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileAccordion === 'company' ? 'rotate-180' : ''}`} />
                </button>
                {mobileAccordion === 'company' && (
                  <div className="pl-4 pb-2 space-y-0.5">
                    {companyLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          link.active ? 'text-[#005CCC] bg-[#EFF5FF]' : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                        }`}
                        onClick={closeMobile}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <Link
                  href="/contact-us"
                  className="flex items-center justify-center w-full px-6 py-3 rounded-lg text-[15px] font-semibold bg-[#005CCC] text-white hover:bg-[#0047a3] transition-colors"
                  onClick={closeMobile}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

