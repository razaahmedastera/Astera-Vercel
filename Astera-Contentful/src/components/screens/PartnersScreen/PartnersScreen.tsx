import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { PartnersPageContent, PartnerType, PartnerTier, PartnerBenefitCategory } from '@/types/contentful';

interface PartnersScreenProps {
  content: PartnersPageContent | null;
}

const DEFAULTS: PartnersPageContent = {
  slug: 'partners',
  heroTitle: "Let's work together",
  heroHighlightWord: 'together',
  heroBadgeText: 'Partners',
  heroDescription: 'Join the Astera Partner Program and grow your business with industry-leading data management solutions.',
  heroCtaText: 'Become a Partner',
  heroCtaLink: '/contact-us',
  heroImage: undefined,
  partnerTypes: [],
  tiers: [],
  benefitCategories: [],
  benefitsTitle: 'Partner Benefits',
  ctaTitle: 'Ready to Partner with Astera?',
  ctaDescription: 'Join our partner ecosystem and unlock new revenue opportunities while delivering world-class data management solutions.',
  ctaPrimaryText: "Let's Talk",
  ctaPrimaryLink: '/contact-us',
  ctaSecondaryText: 'Learn More',
  ctaSecondaryLink: '/product',
};

const PARTNER_ICONS: Record<string, React.ReactNode> = {
  reseller: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="14" fill="#005CCC" fillOpacity="0.08" />
      <path d="M16 32V20L24 14L32 20V32" stroke="#005CCC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 32V26H27V32" stroke="#005CCC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 21L24 13L34 21" stroke="#005CCC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  integrator: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="14" fill="#005CCC" fillOpacity="0.08" />
      <circle cx="24" cy="17" r="3.5" stroke="#005CCC" strokeWidth="1.8" />
      <circle cx="15" cy="29" r="3.5" stroke="#005CCC" strokeWidth="1.8" />
      <circle cx="33" cy="29" r="3.5" stroke="#005CCC" strokeWidth="1.8" />
      <path d="M24 20.5V23M19.5 25L17 27M28.5 25L31 27" stroke="#005CCC" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
  oem: (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="48" height="48" rx="14" fill="#005CCC" fillOpacity="0.08" />
      <rect x="14" y="16" width="20" height="16" rx="2.5" stroke="#005CCC" strokeWidth="1.8" />
      <path d="M19 21H29M19 26H25" stroke="#005CCC" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 16V13.5H30V16" stroke="#005CCC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function PartnerTypeCard({ partner }: { partner: PartnerType }) {
  return (
    <div className="group bg-white border border-[#e5e7eb] rounded-2xl p-7 flex flex-col transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,92,204,0.08)] hover:-translate-y-1 hover:border-[#005CCC]/15">
      <div className="mb-5">
        {PARTNER_ICONS[partner.icon] || PARTNER_ICONS.reseller}
      </div>
      <h3 className="text-lg font-bold text-[#1a1a1a] mb-3 group-hover:text-[#005CCC] transition-colors">
        {partner.title}
      </h3>
      <p className="text-[13px] text-[#4b5563] leading-relaxed">
        {partner.description}
      </p>
    </div>
  );
}

function TierBadge({ tier }: { tier: PartnerTier }) {
  const colorMap: Record<string, { bg: string; ring: string; text: string }> = {
    Silver: { bg: 'bg-gradient-to-b from-[#e2e8f0] to-[#cbd5e1]', ring: 'ring-[#94a3b8]/30', text: 'text-[#475569]' },
    Gold: { bg: 'bg-gradient-to-b from-[#fde68a] to-[#f59e0b]', ring: 'ring-[#f59e0b]/30', text: 'text-[#92400e]' },
    Platinum: { bg: 'bg-gradient-to-b from-[#c7d2fe] to-[#6366f1]', ring: 'ring-[#6366f1]/30', text: 'text-[#3730a3]' },
  };
  const style = colorMap[tier.name] || colorMap.Silver;

  return (
    <div className="flex flex-col items-center gap-2 min-w-[100px]">
      <div className={`w-14 h-14 rounded-full ${style.bg} ring-4 ${style.ring} flex items-center justify-center shadow-sm`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      </div>
      <span className={`text-sm font-bold ${style.text}`}>{tier.name}</span>
      <span className="text-[11px] text-[#6b7280]">{tier.priceRange}</span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#005CCC" fillOpacity="0.1" />
      <path d="M6 10.5L8.5 13L14 7" stroke="#005CCC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="10" fill="#f3f4f6" />
      <path d="M7 10H13" stroke="#d1d5db" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BenefitsTable({ tiers, categories }: { tiers: PartnerTier[]; categories: PartnerBenefitCategory[] }) {
  return (
    <div className="overflow-x-auto -mx-4 sm:mx-0">
      <table className="w-full max-w-5xl mx-auto border-collapse table-fixed min-w-[600px]">
        <colgroup>
          <col className="w-[46%]" />
          <col className="w-[18%]" />
          <col className="w-[18%]" />
          <col className="w-[18%]" />
        </colgroup>
        <thead>
          <tr>
            <th className="py-6 px-4" />
            {tiers.map((tier) => (
              <th key={tier.name} className="py-6 px-3">
                <div className="flex justify-center">
                  <TierBadge tier={tier} />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <React.Fragment key={cat.category}>
              <tr>
                <td
                  colSpan={4}
                  className="text-sm font-bold text-[#e8590c] pt-8 pb-3 px-4 border-b border-[#e8590c]/15"
                >
                  {cat.category}
                </td>
              </tr>
              {cat.benefits.map((b) => (
                <tr key={b.name} className="border-b border-[#f3f4f6] hover:bg-[#fafbfc] transition-colors">
                  <td className="py-3.5 px-4 text-[13px] text-[#374151] font-medium">{b.name}</td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center justify-center">{b.silver ? <CheckIcon /> : <DashIcon />}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center justify-center">{b.gold ? <CheckIcon /> : <DashIcon />}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center justify-center">{b.platinum ? <CheckIcon /> : <DashIcon />}</div>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HeroImage({ src }: { src: string }) {
  return (
    <div className="w-full">
      <Image
        src={src}
        alt="Astera Partners"
        width={600}
        height={400}
        className="w-full h-auto rounded-2xl object-cover"
        priority
      />
    </div>
  );
}

export default function PartnersScreen({ content }: PartnersScreenProps) {
  const s = { ...DEFAULTS, ...content };

  const heroTitleParts = s.heroHighlightWord
    ? s.heroTitle.split(s.heroHighlightWord)
    : [s.heroTitle];

  const hasHeroImage = !!s.heroImage;

  return (
    <div className="bg-white">
      {/* ───── HERO ───── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="section-container">
          <div className={`flex flex-col ${hasHeroImage ? 'lg:flex-row lg:items-center lg:gap-16' : ''}`}>
            <div className={hasHeroImage ? 'lg:w-1/2 mb-12 lg:mb-0' : 'max-w-3xl mx-auto text-center'}>
              {s.heroBadgeText && (
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#005CCC]/5 text-xs font-semibold text-[#005CCC] border border-[#005CCC]/10 mb-6">
                  {s.heroBadgeText}
                </span>
              )}
              <h1 className="text-3xl md:text-[44px] lg:text-[48px] font-bold text-[#1a1a1a] leading-tight mb-5">
                {s.heroHighlightWord && heroTitleParts.length > 1 ? (
                  <>
                    {heroTitleParts[0]}
                    <br className="hidden sm:block" />
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
                <p className={`text-base md:text-lg text-[#4b5563] leading-relaxed mb-8 ${hasHeroImage ? 'max-w-lg' : 'max-w-2xl mx-auto'}`}>
                  {s.heroDescription}
                </p>
              )}
              {s.heroCtaText && s.heroCtaLink && (
                <Link
                  href={s.heroCtaLink}
                  className="inline-flex items-center gap-2 h-[51px] px-7 rounded-[10px] bg-[#005CCC] text-white text-[15px] font-semibold no-underline transition-all duration-200 hover:bg-[#004ba3] hover:-translate-y-0.5"
                >
                  {s.heroCtaText}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 8h10M9 4l4 4-4 4" />
                  </svg>
                </Link>
              )}
            </div>

            {hasHeroImage && (
              <div className="lg:w-1/2">
                <HeroImage src={s.heroImage!} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───── PARTNER TYPES ───── */}
      {s.partnerTypes.length > 0 && (
        <section className="py-16 md:py-24 bg-[#fafbfc]">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {s.partnerTypes.map((pt) => (
                <PartnerTypeCard key={pt.title} partner={pt} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── BENEFITS TABLE ───── */}
      {s.benefitCategories.length > 0 && s.tiers.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="section-container">
            <div className="text-center mb-12">
              <span className="inline-block w-10 h-1 bg-[#005CCC] rounded-full mb-6" />
              {s.benefitsTitle && (
                <h2 className="text-2xl md:text-[36px] font-bold text-[#1a1a1a] leading-tight mb-3">
                  {s.benefitsTitle}
                </h2>
              )}
            </div>
            <div className="max-w-5xl mx-auto">
              <BenefitsTable tiers={s.tiers} categories={s.benefitCategories} />
            </div>
          </div>
        </section>
      )}

      {/* ───── CTA ───── */}
      {s.ctaTitle && (
        <section
          className="py-16 md:py-20"
          style={{ background: 'linear-gradient(135deg, #005CCC 0%, #0070F3 50%, #005CCC 100%)' }}
        >
          <div className="section-container text-center">
            <h2 className="text-2xl md:text-[36px] font-bold text-white leading-tight mb-4">
              {s.ctaTitle}
            </h2>
            {s.ctaDescription && (
              <p className="text-white/80 max-w-xl mx-auto mb-8 text-base">{s.ctaDescription}</p>
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
