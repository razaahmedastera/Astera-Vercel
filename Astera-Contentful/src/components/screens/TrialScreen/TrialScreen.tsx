'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import ContactUsHubSpotForm from '@/components/ui/HubSpotForm/ContactUsHubSpotForm';
import type { TrialDemoPage } from '@/types/contentful';
import './TrialScreen.css';

interface TrialScreenProps {
  content: TrialDemoPage;
}

export default function TrialScreen({ content }: TrialScreenProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = content.testimonials.length;

  const goToSlide = useCallback((index: number) => {
    if (isSliding || total <= 1) return;
    setIsSliding(true);
    setActiveTestimonial(index);
    setTimeout(() => setIsSliding(false), 500);
  }, [isSliding, total]);

  const nextSlide = useCallback(() => {
    goToSlide((activeTestimonial + 1) % total);
  }, [activeTestimonial, total, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide((activeTestimonial - 1 + total) % total);
  }, [activeTestimonial, total, goToSlide]);

  useEffect(() => {
    if (total <= 1) return;
    autoPlayRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % total);
    }, 6000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [total]);

  const resetAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % total);
    }, 6000);
  }, [total]);

  const handleFormSubmit = useCallback(() => {
    const actions = content.onSubmitActions;
    if (!actions?.length) return;

    for (const action of actions) {
      const field =
        document.querySelector<HTMLSelectElement>(`#trial-hubspot-form select[name="${action.triggerField}"]`) ||
        document.querySelector<HTMLInputElement>(`#trial-hubspot-form input[name="${action.triggerField}"]`);

      if (!field) continue;
      const value = field.value?.trim();
      if (value !== action.triggerValue) continue;

      if (action.type === 'redirect') {
        window.location.href = action.url;
      } else if (action.type === 'download') {
        const link = document.createElement('a');
        link.href = action.url;
        if (action.downloadFilename) link.download = action.downloadFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      break;
    }
  }, [content.onSubmitActions]);

  return (
    <div>
      {/* ─── Hero Section ─── */}
      <section className="trial-hero py-16 sm:py-20 lg:py-24">
        <div className="section-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            {/* Left: Content */}
            <div>
              <span className="inline-block text-[#005CCC] text-sm font-semibold tracking-wide uppercase mb-4">
                {content.eyebrow}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#0f1c2e] leading-[1.15] mb-5">
                {content.heading}
              </h1>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg mb-8">
                {content.description}
              </p>
              {content.heroImage && (
                <div className="relative w-full max-w-[380px] h-[220px] sm:h-[260px]">
                  <Image
                    src={content.heroImage}
                    alt={content.productName}
                    fill
                    className="object-contain"
                    sizes="380px"
                  />
                </div>
              )}
            </div>

            {/* Right: HubSpot Form */}
            <div className="trial-form-card p-6 sm:p-8 lg:p-10">
              <ContactUsHubSpotForm
                formId={content.hubspotFormId}
                containerId="trial-hubspot-form"
                showLabels={false}
                submitButtonAlign="center"
                submitButtonFullWidth={true}
                onFormSubmit={content.onSubmitActions?.length ? handleFormSubmit : undefined}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trusted By Section ─── */}
      {content.trustLogos.length > 0 && (
        <section className="py-12 sm:py-14 bg-white border-b border-gray-100">
          <div className="section-container">
            <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-8">
              {content.trustHeading}
            </p>
            <div className="trial-trust-logos">
              {content.trustLogos.map((logo, i) => (
                <img key={i} src={logo.src} alt={logo.alt} loading="lazy" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── FAQ Section ─── */}
      {content.faqs.length > 0 && (
        <section className="trial-faq-section py-16 sm:py-20">
          <div className="section-container max-w-3xl mx-auto">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#0f1c2e] mb-3">
              Frequently Asked <span className="text-[#005CCC]">Questions</span>
            </h2>
            <p className="text-center text-gray-500 text-sm mb-10">
              Everything you need to know about the trial
            </p>
            <div className="space-y-3">
              {content.faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`trial-faq-item ${activeFaq === i ? 'active' : ''}`}
                >
                  <button
                    className="trial-faq-trigger"
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    aria-expanded={activeFaq === i}
                  >
                    <span>{faq.question}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div className="trial-faq-content">
                    <p className="trial-faq-answer">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Testimonials Slider ─── */}
      {content.testimonials.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#f8fafc]">
          <div className="section-container">
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#0f1c2e] mb-12">
              {content.testimonialHeading}
            </h2>
            <div className="trial-slider-wrapper max-w-2xl mx-auto">
              <div className="flex items-center gap-4">
                {/* Prev Arrow */}
                <button
                  onClick={() => { prevSlide(); resetAutoPlay(); }}
                  className="trial-slider-arrow flex-shrink-0"
                  aria-label="Previous testimonial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                {/* Slide Container */}
                <div className="trial-slider-track overflow-hidden flex-1">
                  <div
                    className="trial-slider-slides flex"
                    style={{
                      transform: `translateX(-${activeTestimonial * 100}%)`,
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    {content.testimonials.map((t, i) => (
                      <div key={i} className="trial-slider-slide w-full flex-shrink-0 px-2">
                        <div className="trial-testimonial-card text-center">
                          <svg className="w-10 h-10 text-[#005CCC]/15 mx-auto mb-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                          </svg>
                          <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-8 italic">
                            &ldquo;{t.quote}&rdquo;
                          </p>
                          <div className="flex flex-col items-center">
                            <p className="text-sm font-semibold text-[#0f1c2e]">{t.author}</p>
                            <p className="text-xs text-gray-500 mt-1">{t.title}</p>
                            {t.logo && (
                              <img
                                src={t.logo}
                                alt={t.author}
                                className="h-6 w-auto opacity-50 mt-4"
                                loading="lazy"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Next Arrow */}
                <button
                  onClick={() => { nextSlide(); resetAutoPlay(); }}
                  className="trial-slider-arrow flex-shrink-0"
                  aria-label="Next testimonial"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </div>

              {/* Dots */}
              {total > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  {content.testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { goToSlide(i); resetAutoPlay(); }}
                      className={`trial-slider-dot ${activeTestimonial === i ? 'active' : ''}`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── Resources Section ─── */}
      {content.resources.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="section-container">
            {content.resourcesBadge && (
              <p className="text-center text-[#005CCC] text-sm font-semibold uppercase tracking-wider mb-2">
                {content.resourcesBadge}
              </p>
            )}
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#0f1c2e] mb-12">
              {content.resourcesHeading}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
              {content.resources.map((r, i) => (
                <a
                  key={i}
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trial-resource-card group no-underline"
                >
                  <div className="relative overflow-hidden">
                    <img src={r.image} alt={r.title} loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-semibold text-[#005CCC] uppercase tracking-wide">
                      {r.type}
                    </span>
                    <h3 className="text-sm font-medium text-[#0f1c2e] mt-1.5 leading-snug line-clamp-2">
                      {r.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
