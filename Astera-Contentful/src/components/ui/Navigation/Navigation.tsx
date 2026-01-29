'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { getAllProductPagesBrowser } from '@/lib/contentful/api-browser';
import type { ProductPageSummary } from '@/types/contentful';
import { MegaMenu, defaultFeaturedContent, defaultWhatsNew, getIconForSlug } from './MegaMenu';
import type { Solution } from './MegaMenu';
import './MegaMenu.css';

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<ProductPageSummary[]>([]);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const currentSlug = searchParams.get('slug') || 'reportminer';

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productList = await getAllProductPagesBrowser();
        setProducts(productList);
        
        // Convert products to solutions format with icons
        const solutionsList: Solution[] = productList.map(product => ({
          name: product.productName,
          slug: product.slug,
          icon: getIconForSlug(product.slug),
        }));
        setSolutions(solutionsList);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleProductSelect = (slug: string) => {
    router.push(`/product?slug=${slug}`);
    setIsSolutionsOpen(false);
  };

  const currentProduct = products.find(p => p.slug === currentSlug);

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] border-b border-gray-200 py-3 sm:py-4 shadow-sm m-0" style={{ backgroundColor: '#fff' }}>
        <div className="section-container flex items-center justify-between gap-4 sm:gap-6 lg:gap-8">
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
          <nav className="hidden md:flex items-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8 flex-1 justify-center">
            <Link 
              href="/centerprise" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/centerprise' 
                  ? 'text-[#005CCC]' 
                  : 'text-gray-600 hover:text-[#005CCC]'
              }`}
            >
              Centerprise
            </Link>
            
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
              href="/use-cases" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/use-cases' 
                  ? 'text-[#005CCC]' 
                  : 'text-gray-600 hover:text-[#005CCC]'
              }`}
            >
              Use Cases
            </Link>
            
            <Link 
              href="/industries" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/industries' 
                  ? 'text-[#005CCC]' 
                  : 'text-gray-600 hover:text-[#005CCC]'
              }`}
            >
              Industries
            </Link>
            
            <Link 
              href="/services" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/services' 
                  ? 'text-[#005CCC]' 
                  : 'text-gray-600 hover:text-[#005CCC]'
              }`}
            >
              Services
            </Link>
            
            <Link 
              href="/resources" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/resources' 
                  ? 'text-[#005CCC]' 
                  : 'text-gray-600 hover:text-[#005CCC]'
              }`}
            >
              Resources
            </Link>
            
            <Link 
              href="/company" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/company' 
                  ? 'text-[#005CCC]' 
                  : 'text-gray-600 hover:text-[#005CCC]'
              }`}
            >
              Company
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <button className="px-6 py-2.5 rounded-lg text-sm font-semibold border-none cursor-pointer transition-all bg-[#005CCC] text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#005CCC]/30">
              Contact Us
            </button>
     
          </div> 
        </div>
    </header>
  );
}

