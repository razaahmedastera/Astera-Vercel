'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import type { ProductPageSummary } from '@/types/contentful';
import { MegaMenu, defaultFeaturedContent, defaultWhatsNew, getIconForSlug } from './MegaMenu';
import type { Solution } from './MegaMenu';
import './MegaMenu.css';

interface HeaderProps {
  products: ProductPageSummary[];
}

export function Header({ products }: HeaderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  
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
    router.push(`/product?slug=${slug}`);
    setIsSolutionsOpen(false);
  };

  const currentProduct = products.find(p => p.slug === currentSlug);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-gray-200 py-3 sm:py-4 shadow-sm m-0" style={{ backgroundColor: '#fff' }}>
        <div className="section-container flex items-center gap-4 sm:gap-6 lg:gap-8">
          <div className="flex items-center h-10">
            <Link href="/">
              <img 
                src="/images/astera-logo.svg" 
                alt="Astera Logo" 
                className="h-10 w-auto object-contain cursor-pointer transition-opacity hover:opacity-80"
                loading="eager"
                width="120"
                height="32"
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
            
            <Link 
              href="/blog" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/blog' || pathname?.startsWith('/blog/')
                  ? 'text-[#005CCC]' 
                  : 'text-gray-600 hover:text-[#005CCC]'
              }`}
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-4 ml-auto">
            <button className="px-6 py-2.5 rounded-lg text-sm font-semibold border-none cursor-pointer transition-all bg-[#005CCC] text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#005CCC]/30">
              Contact Us
            </button>
     
          </div> 
        </div>
    </header>
  );
}

