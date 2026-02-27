import Image from 'next/image';
import Link from 'next/link';
import type { AwardsPageSettings, AwardEntryItem } from '@/types/contentful';

interface AwardsPageScreenProps {
  settings: AwardsPageSettings | null;
  awards: AwardEntryItem[];
}

function TrophyIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="14" fill="#005CCC" fillOpacity="0.08" />
      <path
        d="M17 16H31V22C31 25.866 27.866 29 24 29C20.134 29 17 25.866 17 22V16Z"
        stroke="#005CCC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M24 29V33" stroke="#005CCC" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 33H28" stroke="#005CCC" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M31 18H33C34.1046 18 35 18.8954 35 20V21C35 22.6569 33.6569 24 32 24H31"
        stroke="#005CCC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 18H15C13.8954 18 13 18.8954 13 20V21C13 22.6569 14.3431 24 16 24H17"
        stroke="#005CCC"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AwardCard({ award }: { award: AwardEntryItem }) {
  const inner = (
    <div className="group relative bg-white border border-[#e5e7eb] rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,92,204,0.10)] hover:-translate-y-1 hover:border-[#005CCC]/20 h-full">
      {award.year && (
        <span className="absolute top-4 right-4 text-[11px] font-bold text-[#005CCC] bg-[#EFF5FF] px-2.5 py-1 rounded-full">
          {award.year}
        </span>
      )}

      <div className="w-[120px] h-[120px] flex items-center justify-center mb-5 shrink-0">
        {award.image ? (
          <Image
            src={award.image}
            alt={award.title}
            width={120}
            height={120}
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <TrophyIcon />
        )}
      </div>

      <h3 className="text-base font-bold text-[#1a1a1a] mb-1 leading-snug group-hover:text-[#005CCC] transition-colors duration-200">
        {award.title}
      </h3>
      <p className="text-[13px] font-medium text-[#005CCC] mb-3">{award.organization}</p>
      {award.description && (
        <p className="text-[13px] text-[#6b7280] leading-relaxed flex-1">{award.description}</p>
      )}

      {award.learnMoreUrl && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#005CCC] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Learn More
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      )}
    </div>
  );

  if (award.learnMoreUrl) {
    return (
      <Link href={award.learnMoreUrl} className="block no-underline" target="_blank" rel="noopener noreferrer">
        {inner}
      </Link>
    );
  }

  return inner;
}

const DEFAULTS = {
  heroTitle: 'Awards & Recognitions',
  heroHighlightWord: 'Recognitions',
  heroBadgeText: 'Recognition & Excellence',
  heroDescription: "Astera's commitment to innovation and relentless pursuit of customer satisfaction makes it a leader in the industry. We are honored to receive these recognitions for delivering exceptional solutions.",
  heroCtaText: 'Explore Our Award Winning Platform',
  heroCtaLink: '/product',
  gridTitle: 'Our Achievements',
  gridSubtitle: 'Industry leaders and analysts continue to recognize Astera for innovation and excellence.',
  ctaTitle: 'Ready to See Why Astera Leads?',
  ctaDescription: 'Join thousands of organizations that trust Astera to manage, integrate, and unlock value from their data.',
  ctaPrimaryText: 'Explore Products',
  ctaPrimaryLink: '/product',
  ctaSecondaryText: 'Contact Us',
  ctaSecondaryLink: '/contact-us',
};

export default function AwardsPageScreen({ settings, awards }: AwardsPageScreenProps) {
  const s = { ...DEFAULTS, ...settings };

  const heroTitleParts = s.heroHighlightWord
    ? s.heroTitle.split(s.heroHighlightWord)
    : [s.heroTitle];

  return (
    <div className="bg-white">
      {/* ───── HERO ───── */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #EFF5FF 0%, #E0EDFF 50%, #D4E6FF 100%)',
        }}
      >
        <div className="absolute top-[-60px] right-[-60px] w-[240px] h-[240px] rounded-full bg-[#005CCC]/5 blur-2xl pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-40px] w-[200px] h-[200px] rounded-full bg-[#005CCC]/5 blur-2xl pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {s.heroBadgeText && (
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur text-xs font-semibold text-[#005CCC] border border-[#005CCC]/10 mb-6 shadow-sm">
                <TrophyIcon />
                {s.heroBadgeText}
              </span>
            )}
            <h1 className="text-3xl md:text-[48px] font-bold text-[#1a1a1a] leading-tight mb-5">
              {s.heroHighlightWord && heroTitleParts.length > 1 ? (
                <>
                  {heroTitleParts[0]}
                  <span className="bg-gradient-to-r from-[#005CCC] to-[#3b8ef5] bg-clip-text text-transparent">
                    {s.heroHighlightWord}
                  </span>
                  {heroTitleParts[1]}
                </>
              ) : (
                s.heroTitle
              )}
            </h1>
            {s.heroDescription && (
              <p className="text-base md:text-lg text-[#4b5563] max-w-2xl mx-auto leading-relaxed mb-8">
                {s.heroDescription}
              </p>
            )}
            {s.heroCtaText && s.heroCtaLink && (
              <Link
                href={s.heroCtaLink}
                className="inline-flex items-center gap-2 h-[51px] px-7 rounded-[10px] bg-[#005CCC] text-white text-[15px] font-semibold no-underline transition-all duration-200 hover:bg-[#004ba3] hover:-translate-y-0.5 shadow-lg shadow-[#005CCC]/20"
              >
                {s.heroCtaText}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ───── AWARDS GRID ───── */}
      {awards.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center mb-12">
              <span className="inline-block w-10 h-1 bg-[#005CCC] rounded-full mb-6" />
              {s.gridTitle && (
                <h2 className="text-2xl md:text-[36px] font-bold text-[#1a1a1a] leading-tight mb-3">
                  {s.gridTitle}
                </h2>
              )}
              {s.gridSubtitle && (
                <p className="text-[#6b7280] max-w-lg mx-auto">
                  {s.gridSubtitle}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {awards.map((award) => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── CTA ───── */}
      {s.ctaTitle && (
        <section
          className="py-16 md:py-20"
          style={{
            background: 'linear-gradient(135deg, #005CCC 0%, #0070F3 50%, #005CCC 100%)',
          }}
        >
          <div className="section-container text-center">
            <h2 className="text-2xl md:text-[36px] font-bold text-white leading-tight mb-4">
              {s.ctaTitle}
            </h2>
            {s.ctaDescription && (
              <p className="text-white/80 max-w-xl mx-auto mb-8 text-base">
                {s.ctaDescription}
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {s.ctaPrimaryText && s.ctaPrimaryLink && (
                <Link
                  href={s.ctaPrimaryLink}
                  className="inline-flex items-center justify-center h-[51px] px-7 rounded-[10px] bg-white text-[#005CCC] text-[15px] font-semibold no-underline transition-all duration-200 hover:bg-[#f0f5ff] hover:-translate-y-0.5 shadow-lg"
                >
                  {s.ctaPrimaryText}
                </Link>
              )}
              {s.ctaSecondaryText && s.ctaSecondaryLink && (
                <Link
                  href={s.ctaSecondaryLink}
                  className="inline-flex items-center justify-center h-[51px] px-7 rounded-[10px] bg-transparent text-white text-[15px] font-semibold no-underline border-2 border-white/40 transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
                >
                  {s.ctaSecondaryText}
                </Link>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
