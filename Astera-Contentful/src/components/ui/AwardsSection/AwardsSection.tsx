'use client';

import Image from 'next/image';
import './AwardsSection.css';

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

  const renderAward = (award: AwardItem, index: number) =>
    award.image ? (
      <div key={`${award.title}-${index}`} className="awards-carousel-item">
        <Image
          src={award.image}
          alt={award.title}
          width={140}
          height={140}
          className="object-contain"
          loading="lazy"
        />
      </div>
    ) : (
      <div key={`${award.title}-${index}`} className="awards-carousel-item awards-carousel-text-item">
        <p>{award.title}</p>
      </div>
    );

  return (
    <section className="awards-carousel-section">
      <div className="section-container text-center">
        <span className="inline-block w-10 h-1 bg-[#005CCC] rounded-full mb-6" />
        <h2 className="awards-carousel-heading">{heading}</h2>
        {subtitle && <p className="awards-carousel-subtitle">{subtitle}</p>}
        <div className="awards-carousel-track-wrapper">
          <div className="awards-carousel-track">
            {awards.map((a, i) => renderAward(a, i))}
            {awards.map((a, i) => renderAward(a, i + awards.length))}
          </div>
        </div>
      </div>
    </section>
  );
}
