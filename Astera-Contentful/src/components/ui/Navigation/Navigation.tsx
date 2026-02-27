'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import type { ProductPageSummary, Industry } from '@/types/contentful';
import { MegaMenu, defaultFeaturedContent, defaultWhatsNew, getIconForSlug } from './MegaMenu';
import type { Solution } from './MegaMenu';
import './MegaMenu.css';

interface HeaderProps {
  products: ProductPageSummary[];
  industries: Industry[];
}

export function Header({ products, industries = [] }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isCustomersOpen, setIsCustomersOpen] = useState(false);
  
  const currentSlug = searchParams.get('slug') || 'reportminer';

  // Convert products to solutions format with icons (computed from props, no useEffect needed)
  const solutions = useMemo(() => {
    return products.map((product: ProductPageSummary) => ({
      name: product.productName,
      slug: product.slug,
      icon: getIconForSlug(product.slug),
    })) as Solution[];
  }, [products]);

  const handleProductSelect = (slug: string) => {
    // Prefetch the route before navigation for instant loading
    router.prefetch(`/product?slug=${slug}`);
    router.push(`/product?slug=${slug}`);
    setIsSolutionsOpen(false);
  };

  const currentProduct = products.find(p => p.slug === currentSlug);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-gray-200 py-3 sm:py-4 shadow-sm m-0 bg-white">
        <div className="section-container flex items-center gap-4 sm:gap-6 lg:gap-8">
          <div className="flex items-center h-10">
            <Link href="/" prefetch={true}>
              <Image 
                src="/images/astera-logo.svg" 
                alt="Astera Logo" 
                width={120}
                height={32}
                className="h-10 w-auto object-contain cursor-pointer transition-opacity hover:opacity-80"
                priority
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
            {/* Solutions Mega Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  isSolutionsOpen || pathname === '/product'
                    ? 'text-[#005CCC] bg-[#EFF5FF]' 
                    : 'text-gray-600 hover:text-[#005CCC]'
                } px-3 py-2 rounded-md`}
              >
                Solutions
                <svg 
                  className={`w-4 h-4 transition-transform ${isSolutionsOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
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
                  className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                    isIndustriesOpen || pathname?.startsWith('/industry-solutions/') || pathname === '/financial-services'
                      ? 'text-[#005CCC] bg-[#EFF5FF]' 
                      : 'text-gray-600 hover:text-[#005CCC]'
                  } px-3 py-2 rounded-md`}
                >
                  Industries
                  <svg 
                    className={`w-4 h-4 transition-transform ${isIndustriesOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Industries Dropdown Menu - 2 Columns */}
                {isIndustriesOpen && (
                  <div 
                    className="absolute top-full left-0 pt-2 w-96 z-50"
                    onMouseEnter={() => setIsIndustriesOpen(true)}
                    onMouseLeave={() => setIsIndustriesOpen(false)}
                  >
                    {/* Hoverable bridge area */}
                    <div className="h-2 w-full"></div>
                    {/* Dropdown content */}
                    <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-4">
                      <div className="grid grid-cols-2 gap-2">
                      {industries.map((industry) => {
                        // Determine icon based on industry name
                        const getIndustryIcon = () => {
                          const name = industry.name.toLowerCase();
                          if (name.includes('financial')) {
                            return (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="#005CCC" opacity="0.1"/>
                                <path d="M12 6V18M8 10H16M8 14H16" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            );
                          } else if (name.includes('healthcare') || name.includes('health')) {
                            return (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="#005CCC" opacity="0.1"/>
                                <path d="M12 8V16M8 12H16" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
                                <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke="#005CCC" strokeWidth="1.5" fill="none"/>
                              </svg>
                            );
                          } else if (name.includes('education')) {
                            return (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="#005CCC" opacity="0.1"/>
                                <path d="M12 6L4 10L12 14L20 10L12 6Z" stroke="#005CCC" strokeWidth="2" strokeLinejoin="round"/>
                                <path d="M4 10V18L12 22L20 18V10" stroke="#005CCC" strokeWidth="2" strokeLinejoin="round"/>
                              </svg>
                            );
                          } else if (name.includes('logistics')) {
                            return (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="#005CCC" opacity="0.1"/>
                                <rect x="4" y="8" width="16" height="10" rx="1" stroke="#005CCC" strokeWidth="2"/>
                                <path d="M4 10H20M8 14H16" stroke="#005CCC" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            );
                          } else if (name.includes('insurance')) {
                            return (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="10" fill="#005CCC" opacity="0.1"/>
                                <path d="M12 2L4 7V12C4 16 8 19 12 22C16 19 20 16 20 12V7L12 2Z" stroke="#005CCC" strokeWidth="2" strokeLinejoin="round"/>
                                <path d="M9 12L11 14L15 10" stroke="#005CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            );
                          }
                          // Default icon
                          return (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="10" fill="#005CCC" opacity="0.1"/>
                              <rect x="6" y="6" width="12" height="12" rx="1" stroke="#005CCC" strokeWidth="2"/>
                            </svg>
                          );
                        };

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
                            <div className="flex-shrink-0">
                              {getIndustryIcon()}
                            </div>
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
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  isResourcesOpen || pathname === '/blog' || pathname?.startsWith('/type/blog/') || pathname === '/data-sheet' || pathname?.startsWith('/type/data-sheet/') || pathname === '/e-book' || pathname?.startsWith('/type/e-book/') || pathname === '/videos' || pathname === '/webinars' || pathname?.startsWith('/type/webinars/') || pathname === '/whitepaper' || pathname?.startsWith('/type/whitepaper/')
                    ? 'text-[#005CCC] bg-[#EFF5FF]' 
                    : 'text-gray-600 hover:text-[#005CCC]'
                } px-3 py-2 rounded-md`}
              >
                Resources
                <svg 
                  className={`w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Resources Dropdown Menu */}
              {isResourcesOpen && (
                <div 
                  className="absolute top-full left-0 pt-2 w-48 z-50"
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                >
                  {/* Hoverable bridge area */}
                  <div className="h-2 w-full"></div>
                  {/* Dropdown content */}
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <Link 
                    href="/blog" 
                    prefetch={true}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === '/blog' || pathname?.startsWith('/type/blog/')
                        ? 'text-[#005CCC] bg-[#EFF5FF]' 
                        : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Blog
                  </Link>
                  <Link 
                    href="/data-sheet" 
                    prefetch={true}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === '/data-sheet' || pathname?.startsWith('/type/data-sheet/')
                        ? 'text-[#005CCC] bg-[#EFF5FF]' 
                        : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Data Sheets
                  </Link>
                  <Link 
                    href="/e-book" 
                    prefetch={true}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === '/e-book' || pathname?.startsWith('/type/e-book/')
                        ? 'text-[#005CCC] bg-[#EFF5FF]' 
                        : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    eBook
                  </Link>
                  <Link 
                    href="/videos" 
                    prefetch={true}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === '/videos'
                        ? 'text-[#005CCC] bg-[#EFF5FF]' 
                        : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Videos
                  </Link>
                  <Link 
                    href="/webinars" 
                    prefetch={true}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === '/webinars' || pathname?.startsWith('/type/webinars/')
                        ? 'text-[#005CCC] bg-[#EFF5FF]' 
                        : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Webinars
                  </Link>
                  <Link 
                    href="/whitepaper" 
                    prefetch={true}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      pathname === '/whitepaper' || pathname?.startsWith('/type/whitepaper/')
                        ? 'text-[#005CCC] bg-[#EFF5FF]' 
                        : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsResourcesOpen(false)}
                  >
                    Whitepapers
                  </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Use Cases Link */}
            <Link
              href="/use-cases"
              prefetch={true}
              className={`text-sm font-medium transition-colors px-3 py-2 rounded-md ${
                pathname === '/use-cases' || pathname?.startsWith('/use-cases/')
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
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  isCustomersOpen || pathname?.startsWith('/customers/')
                    ? 'text-[#005CCC] bg-[#EFF5FF]' 
                    : 'text-gray-600 hover:text-[#005CCC]'
                } px-3 py-2 rounded-md`}
              >
                Customers
                <svg 
                  className={`w-4 h-4 transition-transform ${isCustomersOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isCustomersOpen && (
                <div 
                  className="absolute top-full left-0 pt-2 w-48 z-50"
                  onMouseEnter={() => setIsCustomersOpen(true)}
                  onMouseLeave={() => setIsCustomersOpen(false)}
                >
                  <div className="h-2 w-full"></div>
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

            {/* Company Dropdown (About Us, News) */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCompanyOpen(true)}
              onMouseLeave={() => setIsCompanyOpen(false)}
            >
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  isCompanyOpen || pathname === '/company/about-us' || pathname === '/news' || pathname?.startsWith('/news/') || pathname === '/awards-and-recognitions'
                    ? 'text-[#005CCC] bg-[#EFF5FF]' 
                    : 'text-gray-600 hover:text-[#005CCC]'
                } px-3 py-2 rounded-md`}
              >
                Company
                <svg 
                  className={`w-4 h-4 transition-transform ${isCompanyOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isCompanyOpen && (
                <div 
                  className="absolute top-full left-0 pt-2 w-48 z-50"
                  onMouseEnter={() => setIsCompanyOpen(true)}
                  onMouseLeave={() => setIsCompanyOpen(false)}
                >
                  <div className="h-2 w-full"></div>
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Link 
                      href="/company/about-us" 
                      prefetch={true}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        pathname === '/company/about-us'
                          ? 'text-[#005CCC] bg-[#EFF5FF]' 
                          : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                      }`}
                      onClick={() => setIsCompanyOpen(false)}
                    >
                      About Us
                    </Link>
                    <Link 
                      href="/news" 
                      prefetch={true}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        pathname === '/news' || pathname?.startsWith('/news/')
                          ? 'text-[#005CCC] bg-[#EFF5FF]' 
                          : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                      }`}
                      onClick={() => setIsCompanyOpen(false)}
                    >
                      News
                    </Link>
                    <Link 
                      href="/awards-and-recognitions" 
                      prefetch={true}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        pathname === '/awards-and-recognitions'
                          ? 'text-[#005CCC] bg-[#EFF5FF]' 
                          : 'text-gray-600 hover:text-[#005CCC] hover:bg-gray-50'
                      }`}
                      onClick={() => setIsCompanyOpen(false)}
                    >
                      Awards & Recognitions
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>
          <div className="flex items-center gap-4 ml-auto">
            <Link
              href="/contact-us"
              prefetch={true}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold border-none cursor-pointer transition-all bg-[#005CCC] text-white hover:bg-[#0047a3] hover:text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#005CCC]/30"
            >
              Contact Us
            </Link>
     
          </div> 
        </div>
    </header>
  );
}

