import Image from 'next/image';
import Link from 'next/link';

interface Award {
  title: string;
  org: string;
  description: string;
  image?: string;
  link?: string;
  year: string;
  category: string;
}

const AWARDS: Award[] = [
  {
    title: 'Best Data Integration Tool',
    org: 'Data Management Insight Awards',
    description: 'Astera Won Best Data Integration Tool Award USA 2024.',
    image: 'https://www.astera.com/wp-content/uploads/2024/04/DMI-award-1.png',
    link: 'https://www.astera.com/news/astera-wins-best-data-integration-tool-award/',
    year: '2024',
    category: 'Data Integration',
  },
  {
    title: 'Fastest Growing Products',
    org: 'Software Suggest',
    description: 'Astera Won Fastest Growing Products Award for Winter 2024 by SoftwareSuggest.',
    image: 'https://www.astera.com/wp-content/uploads/2024/06/ss-fastest-growing.png',
    link: '',
    year: '2024',
    category: 'Growth',
  },
  {
    title: 'Easy Usability Award',
    org: 'Software Suggest',
    description: 'Astera Won Easy Usability Award for Winter 2024 by SoftwareSuggest.',
    image: 'https://www.astera.com/wp-content/uploads/2024/06/ss-easy-usability.png',
    link: '',
    year: '2024',
    category: 'Usability',
  },
  {
    title: 'DataIQ AI Awards Finalist',
    org: 'DataIQ AI Awards',
    description: 'Astera has been named a finalist for the Most Innovative Use of AI at the 2024 DataIQ AI Awards.',
    image: 'https://www.astera.com/wp-content/uploads/2024/08/DataIQ-badge.png',
    link: 'https://www.astera.com/news/astera-named-finalist-at-dataiq-awards/',
    year: '2024',
    category: 'AI & Innovation',
  },
  {
    title: 'Momentum Leader',
    org: 'G2 Spring Report 2024',
    description: 'Astera Named a Momentum Leader in G2 Spring Report 2024.',
    image: 'https://www.astera.com/wp-content/uploads/2024/04/g2-momentum-leader-1.png',
    link: '',
    year: '2024',
    category: 'Data Integration',
  },
  {
    title: 'Best Support Mid-Market',
    org: 'G2 Spring Report 2024',
    description: 'Astera Named a Best Support in On-Premise Data Integration — Mid-Market in G2 Spring Report 2024.',
    image: 'https://www.astera.com/wp-content/uploads/2024/04/g2-best-support-1.png',
    link: '',
    year: '2024',
    category: 'Customer Support',
  },
  {
    title: 'High Performer',
    org: 'G2 Winter 2024',
    description: 'Astera Named a High Performer in G2 Winter Report 2024.',
    image: 'https://www.astera.com/wp-content/uploads/2024/01/g2-high-performer.png',
    link: '',
    year: '2024',
    category: 'Data Integration',
  },
  {
    title: 'Top Performer',
    org: 'Featured Customers',
    description: 'Astera recognized as Top Performer by Featured Customers.',
    image: 'https://www.astera.com/wp-content/uploads/2024/04/featured-customers-1.png',
    link: '',
    year: '2024',
    category: 'Customer Success',
  },
  {
    title: 'Data Breakthrough Award',
    org: 'Data Breakthrough',
    description: 'Astera won the G2 Platform of the Year Award at Data Breakthrough.',
    image: 'https://www.astera.com/wp-content/uploads/2024/04/data-breakthrough-1.png',
    link: '',
    year: '2024',
    category: 'Platform',
  },
  {
    title: 'Globee Awards Gold Winner',
    org: 'Globee Awards',
    description: 'Astera won Gold at the Globee Awards for AI Achievement in Data Analytics.',
    image: 'https://www.astera.com/wp-content/uploads/2024/06/globee-2024-gold.png',
    link: 'https://www.astera.com/news/astera-wins-gold-at-globee-awards/',
    year: '2024',
    category: 'AI & Innovation',
  },
  {
    title: 'Stevie Awards Silver Winner',
    org: 'Stevie Awards',
    description: 'Astera won Silver at the Stevie Awards for innovation in technology.',
    image: 'https://www.astera.com/wp-content/uploads/2024/06/stevie-2024-silver.png',
    link: '',
    year: '2024',
    category: 'Innovation',
  },
  {
    title: 'Leader in Data Integration',
    org: 'G2 Fall 2023',
    description: 'Astera recognized as a Leader in Data Integration Tools by G2 Fall 2023.',
    image: 'https://www.astera.com/wp-content/uploads/2023/10/g2-leader-fall-2023.png',
    link: '',
    year: '2023',
    category: 'Data Integration',
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(AWARDS.map((a) => a.category)))];

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

function AwardCard({ award }: { award: Award }) {
  const inner = (
    <div className="group relative bg-white border border-[#e5e7eb] rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,92,204,0.10)] hover:-translate-y-1 hover:border-[#005CCC]/20 h-full">
      {/* Year badge */}
      <span className="absolute top-4 right-4 text-[11px] font-bold text-[#005CCC] bg-[#EFF5FF] px-2.5 py-1 rounded-full">
        {award.year}
      </span>

      {/* Image */}
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

      {/* Content */}
      <h3 className="text-base font-bold text-[#1a1a1a] mb-1 leading-snug group-hover:text-[#005CCC] transition-colors duration-200">
        {award.title}
      </h3>
      <p className="text-[13px] font-medium text-[#005CCC] mb-3">{award.org}</p>
      <p className="text-[13px] text-[#6b7280] leading-relaxed flex-1">{award.description}</p>

      {/* Link indicator */}
      {award.link && (
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#005CCC] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Learn More
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </span>
      )}
    </div>
  );

  if (award.link) {
    return (
      <Link href={award.link} className="block no-underline" target="_blank" rel="noopener noreferrer">
        {inner}
      </Link>
    );
  }

  return inner;
}

export default function AwardsPageScreen() {
  return (
    <div className="bg-white">
      {/* ───── HERO ───── */}
      <section
        className="relative py-16 md:py-24 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #EFF5FF 0%, #E0EDFF 50%, #D4E6FF 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-[-60px] right-[-60px] w-[240px] h-[240px] rounded-full bg-[#005CCC]/5 blur-2xl pointer-events-none" />
        <div className="absolute bottom-[-80px] left-[-40px] w-[200px] h-[200px] rounded-full bg-[#005CCC]/5 blur-2xl pointer-events-none" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur text-xs font-semibold text-[#005CCC] border border-[#005CCC]/10 mb-6 shadow-sm">
              <TrophyIcon />
              Recognition & Excellence
            </span>
            <h1 className="text-3xl md:text-[48px] font-bold text-[#1a1a1a] leading-tight mb-5">
              Awards &{' '}
              <span className="bg-gradient-to-r from-[#005CCC] to-[#3b8ef5] bg-clip-text text-transparent">
                Recognitions
              </span>
            </h1>
            <p className="text-base md:text-lg text-[#4b5563] max-w-2xl mx-auto leading-relaxed mb-8">
              Astera&apos;s commitment to innovation and relentless pursuit of customer satisfaction makes it a leader in the industry. We are honored to receive these recognitions for delivering exceptional solutions.
            </p>
            <Link
              href="/product"
              className="inline-flex items-center gap-2 h-[51px] px-7 rounded-[10px] bg-[#005CCC] text-white text-[15px] font-semibold no-underline transition-all duration-200 hover:bg-[#004ba3] hover:-translate-y-0.5 shadow-lg shadow-[#005CCC]/20"
            >
              Explore Our Award Winning Platform
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ───── TRUST BAR ───── */}
      <section className="py-10 border-b border-[#e5e7eb]">
        <div className="section-container">
          <p className="text-center text-sm text-[#6b7280] mb-6">
            Astera is honored to receive these recognitions and awards for delivering exceptional customer service and helping customers to unlock value from data.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
              <span
                key={cat}
                className="px-3.5 py-1.5 rounded-full bg-[#f8faff] border border-[#e5e7eb] text-xs font-medium text-[#4b5563]"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───── AWARDS GRID ───── */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="inline-block w-10 h-1 bg-[#005CCC] rounded-full mb-6" />
            <h2 className="text-2xl md:text-[36px] font-bold text-[#1a1a1a] leading-tight mb-3">
              Our Achievements
            </h2>
            <p className="text-[#6b7280] max-w-lg mx-auto">
              Industry leaders and analysts continue to recognize Astera for innovation and excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {AWARDS.map((award) => (
              <AwardCard key={`${award.title}-${award.org}`} award={award} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section
        className="py-16 md:py-20"
        style={{
          background: 'linear-gradient(135deg, #005CCC 0%, #0070F3 50%, #005CCC 100%)',
        }}
      >
        <div className="section-container text-center">
          <h2 className="text-2xl md:text-[36px] font-bold text-white leading-tight mb-4">
            Ready to See Why Astera Leads?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8 text-base">
            Join thousands of organizations that trust Astera to manage, integrate, and unlock value from their data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/product"
              className="inline-flex items-center justify-center h-[51px] px-7 rounded-[10px] bg-white text-[#005CCC] text-[15px] font-semibold no-underline transition-all duration-200 hover:bg-[#f0f5ff] hover:-translate-y-0.5 shadow-lg"
            >
              Explore Products
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center h-[51px] px-7 rounded-[10px] bg-transparent text-white text-[15px] font-semibold no-underline border-2 border-white/40 transition-all duration-200 hover:bg-white/10 hover:-translate-y-0.5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
