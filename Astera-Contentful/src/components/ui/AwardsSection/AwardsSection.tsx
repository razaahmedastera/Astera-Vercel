'use client';

import Image from 'next/image';

export interface AwardItem {
  title: string;
  image?: string;
  accent?: string;
}

interface AwardsSectionProps {
  heading?: string;
  subtitle?: string;
  awards: AwardItem[];
}

export default function AwardsSection({
  heading = 'Awards & Recognition',
  subtitle = 'Industry leaders and analysts continue to recognize Astera for innovation and excellence.',
  awards,
}: AwardsSectionProps) {
  if (!awards || awards.length === 0) return null;

  return (
    <section className="py-20 md:py-28">
      <div className="section-container text-center">
        <span className="inline-block w-10 h-1 bg-[#005CCC] rounded-full mb-6" />
        <h2 className="text-3xl md:text-[40px] font-bold text-[#1a1a1a] leading-tight mb-4">
          {heading}
        </h2>
        {subtitle && (
          <p className="text-[#6b7280] mb-10 max-w-md mx-auto">{subtitle}</p>
        )}
        <div className="flex flex-wrap justify-center items-center gap-5 md:gap-6">
          {awards.map((award) =>
            award.image ? (
              <div
                key={award.title}
                className="relative w-[120px] h-[120px] md:w-[140px] md:h-[140px] flex items-center justify-center transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={award.image}
                  alt={award.title}
                  width={140}
                  height={140}
                  className="object-contain"
                />
              </div>
            ) : (
              <div
                key={award.title}
                className="relative w-[130px] h-[130px] md:w-[140px] md:h-[140px] rounded-full bg-white border border-[#e5e7eb] flex flex-col items-center justify-center text-center px-4 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-transparent group"
                style={{ '--accent': award.accent || '#005CCC' } as React.CSSProperties}
              >
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: `0 0 0 2px ${award.accent || '#005CCC'}` }}
                />
                <p className="text-[10px] md:text-[11px] font-bold text-[#1a1a1a] leading-tight whitespace-pre-line group-hover:text-[var(--accent)] transition-colors">
                  {award.title}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
