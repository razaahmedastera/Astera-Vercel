'use client';

interface Award {
  image: string;
  alt: string;
}

interface AwardsProps {
  title?: string;
  awards?: Award[];
  className?: string;
}

// Default awards data - Contentful-ready
const defaultAwards: Award[] = [
  { image: '/images/awards/best-support.png', alt: 'Best Support Winter 2024' },
  { image: '/images/awards/momentum-leader.png', alt: 'Momentum Leader Spring 2024' },
  { image: '/images/awards/stevie-award.png', alt: 'Silver Stevie Award Winner' },
  { image: '/images/awards/top-performer-2024.png', alt: 'Customer Success Top Performer 2024' },
  { image: '/images/awards/top-rated-2023.png', alt: 'TrustRadius Top Rated 2023' },
  { image: '/images/awards/big-innovation-2023.png', alt: 'Big Innovation Award 2023' }
];

export function Awards({ 
  title = 'Honored for Delivering Results for You',
  awards = defaultAwards,
  className = ''
}: AwardsProps) {
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
              <img 
                src={award.image} 
                alt={award.alt}
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

