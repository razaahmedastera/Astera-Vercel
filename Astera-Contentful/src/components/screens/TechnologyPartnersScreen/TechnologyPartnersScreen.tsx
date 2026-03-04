'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { TechnologyPartnersPageContent, TechnologyPartner } from '@/types/contentful';

interface TechnologyPartnersScreenProps {
  content: TechnologyPartnersPageContent | null;
}

const DEFAULTS: TechnologyPartnersPageContent = {
  slug: 'technology-partners',
  heroBadge: 'Technology Partners',
  heroTitle: "Let's Build An Integrated Data Ecosystem Together",
  heroImage: undefined,
  sectionTitle: 'Meet our technology partners',
  sectionDescription:
    "There's no limit to what we and our technology partners cannot achieve together!",
  partners: [
    { name: 'Microsoft', logo: '', detailUrl: '/tech-partner-microsoft/' },
    { name: 'Google Cloud', logo: '', detailUrl: '/tech-partner-google/' },
    { name: 'Amazon', logo: '', detailUrl: '/tech-partner-amazon/' },
    { name: 'Snowflake', logo: '', detailUrl: '/tech-partner-snowflake/' },
    { name: 'Oracle', logo: '', detailUrl: '/tech-partner-oracle/' },
  ],
  ctaTitle: "Let's Talk",
  ctaDescription:
    'Want to learn how Astera can help you build an integrated data ecosystem with our technology partners? Set up a call with the Astera team to get started.',
};

function PartnerCard({ partner }: { partner: TechnologyPartner }) {
  return (
    <Link
      href={partner.detailUrl}
      className="group block rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:shadow-lg hover:border-[#005CCC]/30"
    >
      <div className="flex items-center gap-4 mb-5">
        <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden">
          <Image
            src="/images/astera-logo.svg"
            alt="Astera"
            width={24}
            height={24}
            className="object-contain"
          />
        </div>
        {partner.logo ? (
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden p-1">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={32}
              height={32}
              className="object-contain w-full h-full"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-gray-500">
              {partner.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{partner.name}</h3>
      <span className="inline-flex items-center gap-1 text-sm text-gray-500 group-hover:text-[#005CCC] transition-colors">
        View Partner Details
        <svg
          className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}

export default function TechnologyPartnersScreen({ content }: TechnologyPartnersScreenProps) {
  const s = content || DEFAULTS;

  const heroBadge = s.heroBadge || DEFAULTS.heroBadge;
  const heroTitle = s.heroTitle || DEFAULTS.heroTitle!;
  const heroImage = s.heroImage;
  const sectionTitle = s.sectionTitle || DEFAULTS.sectionTitle;
  const sectionDescription = s.sectionDescription || DEFAULTS.sectionDescription;
  const partners = s.partners?.length ? s.partners : DEFAULTS.partners;
  const ctaTitle = s.ctaTitle || DEFAULTS.ctaTitle;
  const ctaDescription = s.ctaDescription || DEFAULTS.ctaDescription;

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              {heroBadge && (
                <span className="inline-block text-xs font-bold tracking-widest uppercase text-[#005CCC] mb-4">
                  {heroBadge}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold leading-tight text-gray-900">
                {heroTitle}
              </h1>
            </div>
            <div className="flex justify-center lg:justify-end">
              {heroImage ? (
                <Image
                  src={heroImage}
                  alt={heroTitle}
                  width={478}
                  height={509}
                  className="w-full max-w-md h-auto rounded-2xl object-cover"
                  priority
                />
              ) : (
                <div className="w-full max-w-md aspect-[478/509] rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <Image
                    src="/images/astera-logo.svg"
                    alt="Astera"
                    width={120}
                    height={40}
                    className="opacity-30"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section Heading */}
      {sectionTitle && (
        <section className="pb-12 md:pb-16">
          <div className="section-container">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900">
              {sectionTitle}
            </h2>
          </div>
        </section>
      )}

      {/* Partners Grid */}
      <section className="pb-20 md:pb-28">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: Description + Play */}
            <div className="lg:col-span-4">
              {sectionDescription && (
                <p className="text-base text-gray-600 leading-relaxed mb-6">
                  {sectionDescription}
                </p>
              )}
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-3 group"
              >
                <span className="w-12 h-12 rounded-full border-2 border-[#005CCC] flex items-center justify-center group-hover:bg-[#005CCC] transition-colors">
                  <svg
                    className="w-5 h-5 text-[#005CCC] group-hover:text-white transition-colors ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </Link>
            </div>

            {/* Right: Partner Cards Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {partners.map((partner) => (
                  <PartnerCard key={partner.name} partner={partner} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {ctaTitle && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
          <div className="section-container max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              {ctaTitle}
            </h2>
            {ctaDescription && (
              <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                {ctaDescription}
              </p>
            )}
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-[#005CCC] text-white font-semibold text-sm hover:bg-[#004AAD] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
