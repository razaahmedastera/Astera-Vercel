'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { getAllProductPagesBrowser } from '@/lib/contentful/api-browser';
import type { ProductPageSummary } from '@/types/contentful';

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<ProductPageSummary[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const currentSlug = searchParams.get('slug') || 'reportminer';

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productList = await getAllProductPagesBrowser();
        setProducts(productList);
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
    setIsDropdownOpen(false);
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
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                  pathname === '/product' 
                    ? 'text-[#005CCC]' 
                    : 'text-gray-600 hover:text-[#005CCC]'
                }`}
              >
                Products
                <svg 
                  className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    {loading ? (
                      <div className="px-4 py-2 text-sm text-gray-500">Loading...</div>
                    ) : products.length === 0 ? (
                      <div className="px-4 py-2 text-sm text-gray-500">No products found</div>
                    ) : (
                      products.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleProductSelect(product.slug)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-[#EFF5FF] ${
                            product.slug === currentSlug
                              ? 'text-[#005CCC] font-medium bg-[#EFF5FF]'
                              : 'text-gray-700'
                          }`}
                        >
                          {product.productName}
                        </button>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
            <Link href="#use-cases" className="text-sm font-medium text-gray-600 hover:text-[#005CCC] transition-colors">
              Use Cases
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

