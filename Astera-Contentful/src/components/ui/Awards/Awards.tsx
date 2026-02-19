'use client';

import Image from 'next/image';

interface Award {
  image: string;
  alt: string;
}

interface AwardsProps {
  title?: string;
  awards?: Award[];
  className?: string;
}

export function Awards({ 
  title = 'Honored for Delivering Results for You',
  awards,
  className = ''
}: AwardsProps) {
  // Don't render the section if no awards data is available
  if (!awards || awards.length === 0) return null;

  return (
    <section id="awards" className={`awards-section py-10 sm:py-12 lg:py-16 bg-white ${className}`}>
      <div className="section-container">
        {/* Section Header */}
        <h2 className="section-title mb-6 sm:mb-8 lg:mb-10">
          {title}
        </h2>
        
        {/* Awards Grid */}
        <div className="flex flex-wrap sm:flex-nowrap justify-center sm:justify-between items-center gap-6 sm:gap-8 lg:gap-10 w-full">
          {awards.map((award, index) => (
            <div 
              key={index} 
              className="award-card flex justify-center items-center flex-1 min-w-[100px] max-w-[160px] sm:max-w-none transition-transform duration-300 hover:scale-110"
            >
              <Image 
                src={award.image} 
                alt={award.alt}
                width={160}
                height={96}
                className="h-16 sm:h-20 lg:h-24 w-auto object-contain max-w-full"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Awards;
