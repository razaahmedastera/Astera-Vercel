import Image from 'next/image';
import Link from 'next/link';
import AwardsSection from '@/components/ui/AwardsSection/AwardsSection';
import type { AwardEntryItem } from '@/types/contentful';
import './ProfessionalServicesScreen.css';

const TRAINING_SERVICES = [
  {
    title: 'Onsite',
    description:
      'Astera provides instructor-led onsite training live at a location of your choosing. This course helps employees gain an understanding of the product, data mapping, transformation, and more.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'Online',
    description:
      'Eliminate travel costs and time away from the office with online training services which include live sessions with an expert and hands on exercises.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

const PACKAGES = [
  {
    title: 'Proof of Concept',
    description:
      'The proof of concept package includes product licensing and support services for X months. Astera will help you implement a solution for a targeted use case, so you can realize the value of the product.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: 'Fast Track Implementation',
    description:
      "Astera will provide the initial support and training to get your project off the ground. We'll install the software, configure sources and destinations, and help develop data workflows.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: 'Full Implementation',
    description:
      'Astera will deploy a complete integration solution, so you can focus on your core business needs. We will develop workflows set up a data validation process, and implement automation where possible.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

interface ProfessionalServicesScreenProps {
  awards: AwardEntryItem[];
}

export default function ProfessionalServicesScreen({ awards }: ProfessionalServicesScreenProps) {
  return (
    <div>
      {/* ─── Hero ─── */}
      <section className="ps-hero">
        <div className="section-container">
          <div className="ps-hero-grid">
            <div>
              <span className="ps-hero-badge">Professional Services</span>
              <h1>
                Personalized guidance for your custom needs.
              </h1>
              <p className="ps-hero-subtitle">
                Our professional services team helps you achieve your data goals faster with expert guidance,
                hands-on training, and tailored implementation packages.
              </p>
            </div>
            <div>
              <Image
                src="/images/services/awards-recognition.png"
                alt="Astera Awards and Recognition"
                width={600}
                height={400}
                className="ps-hero-img"
                priority
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Awards ─── */}
      <AwardsSection
        heading="Awards & Recognition"
        awards={awards.map((a) => ({
          title: a.title,
          image: a.image,
        }))}
      />

      {/* ─── Training Services ─── */}
      <section className="ps-training">
        <div className="section-container">
          <p className="ps-section-label">Training Services</p>
          <h2 className="ps-section-title">Expert-Led Training</h2>
          <p className="ps-section-desc">
            Get your team up to speed with flexible training options tailored to your schedule and location.
          </p>
          <div className="ps-training-grid">
            {TRAINING_SERVICES.map((item) => (
              <div key={item.title} className="ps-training-card">
                <div className="ps-training-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Offered Packages ─── */}
      <section className="ps-packages">
        <div className="section-container">
          <p className="ps-section-label">Offered Packages</p>
          <h2 className="ps-section-title">Implementation Packages</h2>
          <p className="ps-packages-contact">
            To get a quote or learn more, contact{' '}
            <a href="mailto:sales@astera.com">sales@astera.com</a> or call{' '}
            <a href="tel:18887727837">1-888-77-ASTERA</a>
          </p>
          <div className="ps-packages-grid">
            {PACKAGES.map((pkg) => (
              <div key={pkg.title} className="ps-package-card">
                <div className="ps-package-icon">{pkg.icon}</div>
                <h3>{pkg.title}</h3>
                <p>{pkg.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Turnkey Data Warehouse ─── */}
      <section className="ps-turnkey">
        <div className="section-container">
          <div className="ps-turnkey-grid">
            <div className="ps-turnkey-content">
              <h2>Turnkey Data Warehouse Solution</h2>
              <p>
                With our end-to-end turnkey data warehouse service, Astera enables enterprises to focus on
                their business objectives, while they build a fully functional data warehouse in mere weeks.
                From selecting the ideal platforms for deployment to engineering in-depth data models, we handle
                the heavy lifting that goes into building a customized data warehouse to suit your use case.
              </p>
              <p>
                With a Turnkey Data Warehouse solution, leverage the benefits & power of a data warehouse
                while focusing your time on more pressing decisions.
              </p>
              <Link href="/contact-us" className="ps-turnkey-btn">
                Learn More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div>
              <Image
                src="/images/services/turnkey-dw-illustration.svg"
                alt="Turnkey Data Warehouse Solution"
                width={600}
                height={400}
                className="ps-turnkey-img"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="ps-cta">
        <div className="section-container">
          <div className="ps-cta-inner">
            <h2>Let&apos;s Talk</h2>
            <p>
              At Astera, we know that every organization has unique data needs. Set up a call with our team
              of experts today so that we can create a custom plan for all your data management needs!
            </p>
            <Link href="/contact-us" className="ps-cta-btn">
              Contact Us
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
