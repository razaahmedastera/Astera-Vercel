'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

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
              href="/product" 
              className={`text-sm font-medium transition-colors ${
                pathname === '/product' 
                  ? 'text-[#005CCC]' 
                  : 'text-gray-600 hover:text-[#005CCC]'
              }`}
            >
              Products
            </Link>
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

