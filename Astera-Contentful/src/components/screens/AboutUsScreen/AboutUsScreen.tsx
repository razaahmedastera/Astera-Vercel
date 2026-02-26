'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, Document } from '@contentful/rich-text-types';
import AwardsSection from '@/components/ui/AwardsSection/AwardsSection';
import type { AboutUsPageContent } from '@/types/contentful';

const PLACEHOLDER_TEAM_IMAGES = [
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
];

const PLACEHOLDER_HERO_IMAGES = [
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80',
];

const PLACEHOLDER_STORY_IMAGES = [
  'https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=700&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=500&q=80',
];

const richTextOptions = {
  renderMark: {
    [MARKS.ITALIC]: (text: React.ReactNode) => (
      <span className="italic">{text}</span>
    ),
    [MARKS.BOLD]: (text: React.ReactNode) => (
      <span className="font-semibold">{text}</span>
    ),
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: any, children: React.ReactNode) => (
      <p className="text-base text-[#4b5563] leading-relaxed">{children}</p>
    ),
  },
};

function AnimatedCounter({ end, suffix, label, unit }: { end: number; suffix: string; label: string; unit: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const step = Math.ceil(end / (duration / 16));
          let current = 0;
          const interval = setInterval(() => {
            current += step;
            if (current >= end) { current = end; clearInterval(interval); }
            setCount(current);
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-[#005CCC] leading-none">
        {count}{suffix}
      </p>
      {unit && <p className="text-sm text-[#1a1a1a] mt-1 font-semibold">{unit}</p>}
      <p className="text-sm text-[#4b5563] mt-1">{label}</p>
    </div>
  );
}

interface AboutUsScreenProps {
  data: AboutUsPageContent;
}

export default function AboutUsScreen({ data }: AboutUsScreenProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const team = data.teamMembers;
  const openModal = useCallback((i: number) => { setActiveIndex(i); setModalOpen(true); }, []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const goPrev = useCallback(() => setActiveIndex((i) => (i === 0 ? team.length - 1 : i - 1)), [team.length]);
  const goNext = useCallback(() => setActiveIndex((i) => (i === team.length - 1 ? 0 : i + 1)), [team.length]);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [modalOpen, closeModal, goPrev, goNext]);

  const member = team[activeIndex];
  const nextMember = team[(activeIndex + 1) % team.length];

  const heroImages = data.heroImages.length > 0 ? data.heroImages : PLACEHOLDER_HERO_IMAGES;
  const storyImages = data.storyImages.length > 0 ? data.storyImages : PLACEHOLDER_STORY_IMAGES;

  const getTeamPhoto = (m: typeof team[number], idx: number) =>
    m.photo || PLACEHOLDER_TEAM_IMAGES[idx % PLACEHOLDER_TEAM_IMAGES.length];

  const awardsForSection = data.awards.map((a) => ({
    title: a.title,
    image: a.image,
    accent: a.accentColor,
  }));

  return (
    <div className="min-h-screen bg-white">

      {/* ───── HERO ───── */}
      <section className="relative min-h-[520px] md:min-h-[600px] flex items-center overflow-hidden bg-gradient-to-br from-[#EFF5FF] via-[#E0EDFF] to-[#D4E6FF]">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 10% 90%, rgba(0,92,204,0.08) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 90% 10%, rgba(0,92,204,0.06) 0%, transparent 50%)' }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #005CCC 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="section-container relative z-10 py-32 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="w-full">
              {data.heroBadge && (
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#005CCC]/10 text-xs font-semibold text-[#005CCC] tracking-wide uppercase mb-6 border border-[#005CCC]/15">
                  {data.heroBadge}
                </span>
              )}
              {data.heroHeading && (
                <h1 className="text-4xl md:text-5xl lg:text-[52px] font-bold text-[#0f1c2e] leading-[1.1] tracking-tight mb-6">
                  {data.heroHeading.split('data management').map((part, i, arr) =>
                    i < arr.length - 1 ? (
                      <span key={i}>
                        {part}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#005CCC] to-[#3b8ef5]">
                          data management
                        </span>
                      </span>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </h1>
              )}
              {data.heroDescription && (
                <p className="text-lg md:text-xl text-[#4b5563] leading-relaxed">
                  {data.heroDescription}
                </p>
              )}
            </div>
            <div className="hidden lg:grid grid-cols-5 gap-3 w-full">
              <div className="col-span-3 row-span-2 relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-[#005CCC]/10">
                <Image src={heroImages[0]} alt="Team" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
              {heroImages[1] && (
                <div className="col-span-2 relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg shadow-[#005CCC]/10">
                  <Image src={heroImages[1]} alt="Office" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 25vw" />
                </div>
              )}
              {heroImages[2] && (
                <div className="col-span-2 relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg shadow-[#005CCC]/10">
                  <Image src={heroImages[2]} alt="Collaboration" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 25vw" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───── STATS BAR ───── */}
      {data.stats.length > 0 && (
        <section className="relative -mt-16 z-20">
          <div className="section-container">
            <div className="relative bg-[#EFF5FF] rounded-2xl px-8 py-10 md:py-12 border border-[#005CCC]/10 overflow-hidden">
              <svg className="absolute right-0 top-0 h-full w-auto opacity-[0.08]" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="150" r="100" stroke="#005CCC" strokeWidth="1.5" />
                <circle cx="200" cy="150" r="60" stroke="#005CCC" strokeWidth="1" />
                <circle cx="200" cy="150" r="140" stroke="#005CCC" strokeWidth="0.8" />
                <line x1="100" y1="150" x2="300" y2="150" stroke="#005CCC" strokeWidth="0.8" />
                <line x1="200" y1="50" x2="200" y2="250" stroke="#005CCC" strokeWidth="0.8" />
                <circle cx="200" cy="150" r="6" fill="#005CCC" />
                <circle cx="260" cy="90" r="4" fill="#005CCC" />
                <circle cx="140" cy="210" r="4" fill="#005CCC" />
                <circle cx="300" cy="150" r="4" fill="#005CCC" />
                <circle cx="100" cy="150" r="4" fill="#005CCC" />
                <line x1="200" y1="150" x2="260" y2="90" stroke="#005CCC" strokeWidth="0.8" />
                <line x1="200" y1="150" x2="140" y2="210" stroke="#005CCC" strokeWidth="0.8" />
                <circle cx="320" cy="80" r="30" stroke="#005CCC" strokeWidth="0.6" />
                <circle cx="80" cy="220" r="25" stroke="#005CCC" strokeWidth="0.6" />
                <path d="M150 50 Q200 20 250 50" stroke="#005CCC" strokeWidth="0.6" fill="none" />
                <path d="M150 250 Q200 280 250 250" stroke="#005CCC" strokeWidth="0.6" fill="none" />
              </svg>
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
                {data.stats.map((s, i) => (
                  <div key={s.id} className={`${i > 0 ? 'md:border-l md:border-[#005CCC]/15' : ''}`}>
                    <AnimatedCounter end={s.value} suffix={s.suffix || ''} label={s.label} unit={s.unit || ''} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ───── VISION ───── */}
      {(data.visionTitle || data.visionDescription) && (
        <section className="py-20 md:py-28">
          <div className="section-container">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block w-10 h-1 bg-[#005CCC] rounded-full mb-6" />
              {data.visionTitle && (
                <h2 className="text-3xl md:text-[40px] font-bold text-[#1a1a1a] leading-tight mb-6">
                  {data.visionTitle}
                </h2>
              )}
              {data.visionDescription && (
                <p className="text-lg text-[#4b5563] leading-relaxed">
                  {data.visionDescription}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ───── STORY ───── */}
      {(data.storyTitle || data.storyContent) && (
        <section className="py-20 md:py-28 bg-[#f8fafc]">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="relative max-w-[480px] lg:max-w-none">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image src={storyImages[0]} alt="Astera office" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                {storyImages[1] && (
                  <div className="absolute -bottom-8 -right-4 md:-right-8 w-[55%] aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                    <Image src={storyImages[1]} alt="Team meeting" fill className="object-cover" sizes="260px" />
                  </div>
                )}
                <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-[#005CCC]/20 rounded-xl -z-10" />
              </div>

              <div className="lg:pl-4">
                <span className="inline-block w-10 h-1 bg-[#005CCC] rounded-full mb-5" />
                {data.storyTitle && (
                  <h2 className="text-3xl md:text-[40px] font-bold text-[#1a1a1a] leading-tight mb-6">
                    {data.storyTitle}
                  </h2>
                )}
                {data.storyContent ? (
                  <div className="space-y-5">
                    {documentToReactComponents(data.storyContent as Document, richTextOptions)}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ───── AWARDS ───── */}
      {awardsForSection.length > 0 && (
        <AwardsSection
          heading={data.awardsTitle}
          subtitle={data.awardsSubtitle}
          awards={awardsForSection}
        />
      )}

      {/* ───── MEET THE TEAM ───── */}
      {team.length > 0 && (
        <section className="py-20 md:py-28 bg-[#f8fafc]">
          <div className="section-container text-center">
            <span className="inline-block w-10 h-1 bg-[#005CCC] rounded-full mb-6" />
            {data.teamTitle && (
              <h2 className="text-3xl md:text-[40px] font-bold text-[#1a1a1a] leading-tight mb-4">
                {data.teamTitle}
              </h2>
            )}
            {data.teamSubtitle && (
              <p className="text-[#6b7280] mb-12 max-w-md mx-auto">{data.teamSubtitle}</p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {team.map((person, i) => (
                <button
                  key={person.id}
                  onClick={() => openModal(i)}
                  className="group flex flex-col items-center text-center bg-transparent border-none outline-none cursor-pointer"
                >
                  <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
                    <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#005CCC] to-[#89c3ff] z-10" />
                    <Image src={getTeamPhoto(person, i)} alt={person.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="192px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <p className="text-sm font-bold text-[#1a1a1a] group-hover:text-[#005CCC] transition-colors duration-200">{person.name}</p>
                  <p className="text-xs text-[#005CCC] mt-0.5 font-medium">{person.title}</p>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ───── TEAM MODAL ───── */}
      {modalOpen && member && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" onClick={closeModal}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_200ms_ease]" />
          <div
            className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto animate-[slideUp_300ms_ease]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 md:px-8 pt-6 md:pt-8">
              <div className="flex items-center gap-3">
                <span className="w-8 h-0.5 bg-[#005CCC]" />
                <span className="text-sm text-[#4b5563] font-medium">Meet the team</span>
              </div>
              <button onClick={closeModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f1f5f9] transition-colors text-[#6b7280] hover:text-[#1a1a1a]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 md:gap-10 p-6 md:p-8">
              <div className="relative aspect-[3/4] w-full max-w-[280px] mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-lg">
                <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#005CCC] to-[#89c3ff] z-10" />
                <Image src={getTeamPhoto(member, activeIndex)} alt={member.name} fill className="object-cover" sizes="280px" />
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-1">{member.name}</h3>
                <p className="text-sm text-[#6b7280] mb-5 font-medium">{member.title}</p>
                {member.bio && (
                  <p className="text-[15px] text-[#4b5563] leading-relaxed mb-6">{member.bio}</p>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#0077b5] hover:text-[#005CCC] transition-colors w-fit">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between px-6 md:px-8 pb-6 md:pb-8">
              <div className="flex gap-2">
                {team.map((_, i) => (
                  <button key={i} onClick={() => setActiveIndex(i)} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-8 bg-[#005CCC]' : 'w-4 bg-[#e5e7eb] hover:bg-[#cbd5e1]'}`} />
                ))}
              </div>
              {nextMember && (
                <button onClick={goNext} className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-[#e5e7eb] hover:border-[#005CCC]/30 hover:bg-[#f8fafc] transition-all group">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#1a1a1a] group-hover:text-[#005CCC] transition-colors">{nextMember.name}</p>
                    <p className="text-xs text-[#6b7280]">{nextMember.title}</p>
                  </div>
                  <svg className="w-5 h-5 text-[#005CCC] group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(24px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
      `}</style>
    </div>
  );
}
