'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { ProductPageContent } from '@/types/contentful';
import ContactUsHubSpotForm from '@/components/ui/HubSpotForm/ContactUsHubSpotForm';

interface ProductScreenNewProps {
  content: ProductPageContent;
}

export function ProductScreenNew({ content }: ProductScreenNewProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMetricsVisible, setIsMetricsVisible] = useState(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredUseCaseId, setHoveredUseCaseId] = useState<number | null>(null);
  const [isUseCasesHovered, setIsUseCasesHovered] = useState(false);
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const useCasesScrollRef = useRef<HTMLDivElement>(null);
  
  // Contentful data
  const testimonialsData = content.testimonials || [];
  const useCasesData = content.useCases || [];
  const powerfulFeaturesData = content.powerfulFeatures || [];
  const metricsData = content.metrics || [];
  const resourcesData = content.resources || [];
  const whyAsteraCards = content.whyThisProductSectionCards || [];

  // Memoize rich text rendering to avoid re-computation on state changes
  const renderedHeroHeading = useMemo(() => content.heroSectionHeading ? documentToReactComponents(content.heroSectionHeading) : null, [content.heroSectionHeading]);
  const renderedWhyTitle = useMemo(() => content.whyThisProductSectionTitle ? documentToReactComponents(content.whyThisProductSectionTitle) : null, [content.whyThisProductSectionTitle]);
  const renderedTestimonialsTitle = useMemo(() => content.testimonialsSectionTitle ? documentToReactComponents(content.testimonialsSectionTitle) : null, [content.testimonialsSectionTitle]);
  const renderedUseCasesTitle = useMemo(() => content.useCasesSectionTitle ? documentToReactComponents(content.useCasesSectionTitle) : null, [content.useCasesSectionTitle]);
  const renderedFaqTitle = useMemo(() => content.faqSectionTitle ? documentToReactComponents(content.faqSectionTitle) : null, [content.faqSectionTitle]);
  const renderedContactTitle = useMemo(() => content.contactFormSectionTitle ? documentToReactComponents(content.contactFormSectionTitle) : null, [content.contactFormSectionTitle]);

  // Initialize counters state dynamically from metricsData
  const initialCounters = metricsData.reduce((acc, metric) => {
    acc[metric.id] = 0;
    return acc;
  }, {} as Record<string, number>);
  
  const [counters, setCounters] = useState(initialCounters);

  // Defer IntersectionObserver to avoid blocking main thread during hydration
  useEffect(() => {
    if (isMetricsVisible) return;

    const timerId = setTimeout(() => {
      const metricsSection = document.getElementById('product-metrics');
      if (!metricsSection) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setIsMetricsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
      );

      observer.observe(metricsSection);
      cleanupRef.current = () => observer.disconnect();
    }, 0);

    const cleanupRef = { current: () => {} };
    return () => {
      clearTimeout(timerId);
      cleanupRef.current();
    };
  }, [isMetricsVisible]);

  // Counter animation for metrics - Dynamic from JSON
  useEffect(() => {
    if (!isMetricsVisible) return;

    // Build targets from metricsData
    const targets = metricsData.reduce((acc, metric) => {
      acc[metric.id] = metric.value;
      return acc;
    }, {} as Record<string, number>);

    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Update all counters dynamically
      const newCounters = metricsData.reduce((acc, metric) => {
        acc[metric.id] = Math.floor(metric.value * progress);
        return acc;
      }, {} as Record<string, number>);
      
      setCounters(newCounters);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCounters(targets);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isMetricsVisible]);

  // Use Cases continuous ultra-smooth auto-scroll effect
  useEffect(() => {
    if (!useCasesScrollRef.current) return;
    
    const container = useCasesScrollRef.current;
    const speed = 0.8; // pixels per frame
    
    let animationFrameId: number;
    let currentPosition = container.scrollLeft;
    
    const animate = () => {
      if (isUseCasesHovered) {
        // Pause but keep the animation loop running
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      // Smooth increment
      currentPosition += speed;
      
      // Handle infinite loop - reset seamlessly
      const totalWidth = container.scrollWidth;
      const singleSetWidth = totalWidth / 2;
      
      if (currentPosition >= singleSetWidth) {
        currentPosition = currentPosition - singleSetWidth;
      }
      
      // Apply smooth scrolling with sub-pixel precision
      container.scrollLeft = currentPosition;
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Sync initial position
    currentPosition = container.scrollLeft;
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isUseCasesHovered]);

  // Scroll animation observer - animate sections on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);


  return (
    <>
      {/* Hero Section - Matching Design */}
      <section 
        id="product-hero-section"
        className="product-hero-section py-10 sm:py-12 lg:py-16 flex items-center relative min-h-[600px] sm:min-h-[700px]"
        style={{
          backgroundImage: "url('/images/product-hero-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 z-0"></div>
        <div className="product-hero-container section-container grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-16 items-center relative z-10">
          <div className="product-hero-content pr-0 lg:pr-10">
            {/* Small Heading */}
            <div className="text-[#005CCC] uppercase font-semibold text-sm sm:text-base mb-4 sm:mb-6 tracking-wide">
              {content.heroSectionBadge}
            </div>
            
            {/* Main Heading */}
            <h1 className="font-semibold text-[#000] mb-4 sm:mb-6 tracking-tight text-left" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', lineHeight: 'clamp(32px, 8vw, 60px)' }}>
              {renderedHeroHeading}
            </h1>
            
            {/* Paragraph */}
            <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 mb-6 sm:mb-8 lg:mb-10 max-w-[600px] text-left">
              {content.heroSectionDescription}
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href={content.heroSectionPrimaryCtaUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary w-full sm:w-auto text-center no-underline"
              >
                {content.heroSectionPrimaryCta}
              </a>
              <a 
                href={content.heroSectionSecondaryCtaUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary w-full sm:w-auto text-center no-underline"
              >
                {content.heroSectionSecondaryCta}
              </a>
            </div>

            {/* Trust Badges */}
            {content.heroSectionTrustBadges && content.heroSectionTrustBadges.length > 0 && (
              <div className="trust-badges mt-8">
                {content.heroSectionTrustBadges.map((badge, index) => (
                  <div key={index} className="trust-badge">
                    <div dangerouslySetInnerHTML={{ __html: badge.iconSvg }} />
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Right Side - Media */}
          <div className="product-hero-visual">
            <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center">
              {/* Image - Hidden when video is playing */}
              <div className={`absolute inset-0 transition-opacity duration-0 ${isVideoPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                {content.heroImage && (
                  <Image 
                    src={content.heroImage}
                    alt={content.productName}
                    fill
                    className="object-contain"
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )}
                {/* Play Icon Overlay - Just the icon, no button background */}
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                  aria-label="Play video"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-[#005CCC] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group-hover:bg-[#004ba3] z-10">
                    <svg 
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white ml-1" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </button>
              </div>
              
              {/* Video - Preloaded and ready, shown instantly */}
              <div className={`absolute inset-0 w-full flex items-center justify-center transition-opacity duration-0 ${isVideoPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="w-full max-w-full" style={{ aspectRatio: '16/9', maxHeight: '100%' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    src={isVideoPlaying ? content.heroSectionVideoUrl : (content.heroSectionVideoUrl || '').replace('autoplay=1&', '')}
                    title={`${content.productName} Demo`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                    style={{ aspectRatio: '16/9' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Astera ReportMiner Section - Modern SaaS Grid (6 cards) */}
      {content.whyThisProductSectionTitle && content.whyThisProductSectionCards && content.whyThisProductSectionCards.length > 0 && (
        <section
          id="why-astera-reportminer"
          className="why-astera-section py-16 sm:py-20 lg:py-24"
          style={{
            background: 'linear-gradient(180deg, #f3f6ff 0%, #f9fbff 45%, #ffffff 100%)'
          }}
        >
          <div className="section-container">
            {/* Section Header */}
            <div className="text-center mb-12 sm:mb-16 lg:mb-18">
              {content.whyThisProductSectionTitle && (
                <h2 className="section-title mb-3">
                  {renderedWhyTitle}
                </h2>
              )}
              {content.whyThisProductSectionDescription && (
                <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
                  {content.whyThisProductSectionDescription}
                </p>
              )}
            </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {whyAsteraCards.slice(0, 6).map((card, index) => (
              <div
                key={card.id}
                className="group relative rounded-2xl p-7 bg-white shadow-[0_12px_30px_-18px_rgba(0,0,0,0.25)] hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1.5"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#e8f1ff] text-[#005CCC] shadow-inner">
                      {card.iconImage ? (
                        <Image
                          src={card.iconImage}
                          alt=""
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                          <path d="M2 17l10 5 10-5"/>
                          <path d="M2 12l10 5 10-5"/>
                        </svg>
                      )}
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="text-[15px] sm:text-base font-semibold text-slate-800 leading-snug mb-3">
                    {card.text.split('. ')[0]}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-grow">
                    {card.text.includes('. ')
                      ? card.text.substring(card.text.indexOf('. ') + 2)
                      : card.text}
                  </p>

                  {/* CTA */}
                  <div className="mt-5">
                    <button className="inline-flex items-center gap-2 text-[#005CCC] text-sm font-semibold transition-all duration-200 group-hover:gap-3">
                      {card.linkText || 'Read details'}
                      <span className="inline-block">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="M13 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Metrics Section - Clean Simple Design */}
      {metricsData.length > 0 && (
      <>
      <div className="wave-divider bg-white">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path fill="#EFF5FF" d="M0,0 C480,60 960,60 1440,0 L1440,60 L0,60 Z"/>
        </svg>
      </div>
      <section id="product-metrics" className="product-metrics-section py-10 sm:py-12 lg:py-16 bg-[#EFF5FF] animate-on-scroll">
        <div className="section-container">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-16">
            {metricsData.map((metric, index) => (
              <div key={metric.id} className="flex items-center gap-8 sm:gap-12 lg:gap-16">
                {/* Metric */}
                <div className="flex-1 text-center">
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#005CCC] mb-2 transition-all duration-300">
                    {counters[metric.id] || 0}{metric.unit}
                  </div>
                  <div className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                    {metric.title.toLowerCase()}
                  </div>
                </div>

                {/* Vertical Dotted Separator - show after all except last */}
                {index < metricsData.length - 1 && (
                  <div className="hidden sm:block w-px h-16 bg-gray-300" style={{
                    backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 4px, #d1d5db 4px, #d1d5db 8px)',
                    backgroundSize: '1px 8px'
                  }}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      </>
      )}

      {/* Powerful Features Accordion Section */}
      {powerfulFeaturesData.length > 0 && (
      <section id="powerful-features" className="powerful-features-section py-10 sm:py-12 lg:py-16 bg-white animate-on-scroll">
        <div className="section-container">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-[#005CCC] to-[#0070F3] rounded-t-2xl py-5 px-8 shadow-lg shadow-blue-500/20">
            <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-semibold text-center tracking-tight">
              {content.powerfulFeaturesSectionTitle}
            </h2>
          </div>

          {/* Accordion */}
          <div className="bg-[#F8FAFF] rounded-b-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            {powerfulFeaturesData.map((feature, index) => (
              <div 
                key={feature.id}
                className={`transition-all duration-500 border-b border-slate-200/80 last:border-b-0 ${
                  activeFeatureTab === index ? 'bg-white' : 'bg-[#F8FAFF] hover:bg-[#E8F0FE]'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => setActiveFeatureTab(activeFeatureTab === index ? index : index)}
                  className="w-full flex items-center justify-between py-6 sm:py-7 px-6 sm:px-10 text-left transition-all duration-300 group"
                >
                  <span 
                    className={`transition-colors duration-300 ${
                      activeFeatureTab === index ? 'text-[#005CCC]' : 'text-[#1a1a1a] group-hover:text-[#005CCC]'
                    }`}
                    style={{
                      fontSize: '24px',
                      fontWeight: 500,
                      lineHeight: '1.3'
                    }}
                  >
                    {feature.title}
                  </span>
                  <span className={`ml-4 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    activeFeatureTab === index 
                      ? 'bg-[#005CCC] rotate-180' 
                      : 'bg-slate-100 group-hover:bg-[#005CCC]/10'
                  }`}>
                    <svg 
                      className={`w-5 h-5 transition-colors duration-300 ${
                        activeFeatureTab === index ? 'text-white' : 'text-slate-500 group-hover:text-[#005CCC]'
                      }`} 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Accordion Content - Smooth expand/collapse */}
                <div 
                  className={`grid transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    activeFeatureTab === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 sm:px-10 pb-8 pt-2">
                      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                        {/* Left Content */}
                        <div className="flex-1" style={{ fontSize: '18px', fontWeight: 400, lineHeight: '31px', color: '#303030' }}>
                          <p className="mb-5">
                            {feature.description}
                          </p>
                          <p className="mb-5">
                            {feature.subDescription}
                          </p>
                          <ul className="space-y-3 mb-6">
                            {feature.bulletPoints.map((point, idx) => (
                              <li key={idx} className="flex items-start group/item">
                                <span className="w-6 h-6 rounded-full bg-[#005CCC]/10 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                                  <svg className="w-3.5 h-3.5 text-[#005CCC]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span>
                                  <strong className="text-[#1a1a1a]" style={{ fontWeight: 600 }}>{point.label}</strong>
                                  <span className="text-slate-600"> {point.text}</span>
                                </span>
                              </li>
                            ))}
                          </ul>
                          <p className="mb-6 text-slate-600">
                            {feature.footer}
                          </p>
                          <a 
                            href={feature.linkUrl}
                            className="inline-flex items-center gap-2 bg-[#005CCC] text-white px-6 py-3 rounded-full font-medium text-base hover:bg-[#004ba3] hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
                          >
                            {feature.linkText}
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </a>
                        </div>
                        {/* Right Image */}
                        {feature.image && (
                          <div className="lg:w-[50%] flex-shrink-0">
                            <div className="relative group/image">
                              <div className="absolute inset-0 bg-gradient-to-br from-[#005CCC]/20 to-[#0070F3]/20 rounded-2xl blur-xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-500"></div>
                              <div className="relative bg-white rounded-2xl p-3 shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
                                <Image 
                                  src={feature.image} 
                                  alt={feature.title}
                                  width={600}
                                  height={400}
                                  className="w-full h-auto rounded-xl transition-transform duration-500 group-hover/image:scale-[1.02]"
                                  sizes="(max-width: 1024px) 100vw, 600px"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Testimonials Slider Section */}
      {testimonialsData.length > 0 && (
      <section id="testimonials" className="testimonials-section py-10 sm:py-12 lg:py-16 bg-[#F8FAFF] animate-on-scroll">
        <div className="section-container">
          {/* Section Header */}
          <h2 className="section-title mb-8 sm:mb-10">
            {renderedTestimonialsTitle}
          </h2>

          {/* Testimonial Slider */}
          <div className="relative max-w-5xl mx-auto">
            {/* Navigation Arrows */}
            <button
              onClick={() => setActiveTestimonial(prev => prev === 0 ? testimonialsData.length - 1 : prev - 1)}
              className="absolute left-0 sm:-left-4 lg:-left-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#005CCC] flex items-center justify-center text-[#005CCC] hover:bg-[#005CCC] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => setActiveTestimonial(prev => prev === testimonialsData.length - 1 ? 0 : prev + 1)}
              className="absolute right-0 sm:-right-4 lg:-right-16 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-[#005CCC] flex items-center justify-center text-[#005CCC] hover:bg-[#005CCC] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Testimonial Card */}
            <div className="overflow-hidden px-8 sm:px-16 lg:px-0">
              <div 
                className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonialsData.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-2">
                    <div className="bg-[#F8FAFF] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm border border-slate-100">
                      <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">
                        {/* Image */}
                        {testimonial.image && (
                          <div className="w-full lg:w-[280px] flex-shrink-0">
                            <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-[4/5]">
                              <Image 
                                src={testimonial.image} 
                                alt={`${testimonial.company} testimonial`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 280px"
                              />
                            </div>
                          </div>
                        )}

                        {/* Content */}
                        <div className="flex-1 text-center lg:text-left">
                          {/* Quote */}
                          <blockquote 
                            className="text-[#303030] mb-6"
                            style={{ 
                              fontSize: 'clamp(16px, 2vw, 20px)', 
                              fontWeight: 400, 
                              lineHeight: '1.7'
                            }}
                          >
                            &ldquo;{testimonial.quote}&rdquo;
                          </blockquote>

                          {/* Attribution */}
                          <div className="mb-6">
                            <p 
                              className="text-[#1a1a1a] font-semibold"
                              style={{ 
                                fontSize: '18px',
                                fontWeight: 600
                              }}
                            >
                              {testimonial.author}, {testimonial.title}
                            </p>
                            <p 
                              className="text-[#005CCC]"
                              style={{ 
                                fontSize: '16px',
                                fontWeight: 500
                              }}
                            >
                              at {testimonial.company}
                            </p>
                          </div>

                          {/* CTA Link */}
                          <a 
                            href={testimonial.caseStudyUrl}
                            className="inline-flex items-center gap-2 text-[#005CCC] font-medium hover:gap-3 transition-all duration-300 group"
                            style={{ 
                              fontSize: '16px',
                              fontWeight: 500
                            }}
                          >
                            <span className="border-b-2 border-[#005CCC]">Read the full case study here</span>
                            <svg 
                              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor" 
                              strokeWidth={2}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonialsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    activeTestimonial === index 
                      ? 'bg-[#005CCC] w-8' 
                      : 'bg-slate-300 hover:bg-[#005CCC]/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Use Cases Section - Carousel with Flip Cards */}
      {useCasesData.length > 0 && (
      <section id="use-cases" className="use-cases-section py-10 sm:py-12 lg:py-16 bg-white overflow-hidden animate-on-scroll">
        <div className="section-container mb-12">
          {/* Section Header */}
          <h2 className="section-title mb-4">
            {renderedUseCasesTitle}
          </h2>
          <p className="section-desc">
            {content.useCasesSectionDescription}
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          ref={useCasesScrollRef}
          className="w-full overflow-x-auto cursor-grab active:cursor-grabbing"
          style={{ 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            willChange: 'scroll-position',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseEnter={() => setIsUseCasesHovered(true)}
          onMouseLeave={() => {
            setIsUseCasesHovered(false);
            setHoveredUseCaseId(null);
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex gap-6 px-6 sm:px-8 lg:px-12 py-4" style={{ minWidth: 'max-content', transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
            {/* First Set of Cards */}
            {useCasesData.map((useCase) => (
              <div
                key={useCase.id}
                className="relative flex-shrink-0 cursor-pointer group"
                style={{ width: '280px', height: '380px', perspective: '1000px' }}
                onMouseEnter={() => setHoveredUseCaseId(useCase.id)}
                onMouseLeave={() => setHoveredUseCaseId(null)}
              >
                {/* Card Inner - Flips on Hover */}
                <div 
                  className="relative w-full h-full transition-transform duration-500 ease-out"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: hoveredUseCaseId === useCase.id ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front Face - Image with Title */}
                  <div 
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {useCase.image ? (
                      <Image 
                        src={useCase.image} 
                        alt={useCase.title}
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#005CCC] to-[#0070F3]" />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    {/* Title on Front */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 
                        className="text-white font-semibold"
                        style={{  fontSize: '20px', lineHeight: '1.3' }}
                      >
                        {useCase.title}
                      </h3>
                    </div>
                  </div>

                  {/* Back Face - Content */}
                  <div 
                    className="absolute inset-0 rounded-2xl bg-white border-2 border-[#005CCC] shadow-xl p-6 flex flex-col"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <h3 
                      className="text-[#005CCC] font-semibold mb-4"
                      style={{  fontSize: '22px', lineHeight: '1.3' }}
                    >
                      {useCase.title}
                    </h3>
                    <p 
                      className="text-gray-600 flex-grow mb-4"
                      style={{  fontSize: '15px', lineHeight: '1.6' }}
                    >
                      {useCase.description}
                    </p>
                    <a 
                      href={useCase.linkUrl}
                      className="inline-flex items-center text-[#005CCC] font-medium hover:gap-2 transition-all duration-300 group/link"
                      style={{  fontSize: '15px' }}
                    >
                      Learn more
                      <svg 
                        className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/link:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Duplicate Set for Infinite Loop */}
            {useCasesData.map((useCase) => (
              <div
                key={`dup-${useCase.id}`}
                className="relative flex-shrink-0 cursor-pointer group"
                style={{ width: '280px', height: '380px', perspective: '1000px' }}
                onMouseEnter={() => setHoveredUseCaseId(useCase.id + 100)}
                onMouseLeave={() => setHoveredUseCaseId(null)}
              >
                <div 
                  className="relative w-full h-full transition-transform duration-500 ease-out"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: hoveredUseCaseId === useCase.id + 100 ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Front Face */}
                  <div 
                    className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    {useCase.image ? (
                      <Image 
                        src={useCase.image} 
                        alt={useCase.title}
                        fill
                        className="object-cover"
                        sizes="280px"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#005CCC] to-[#0070F3]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 
                        className="text-white font-semibold"
                        style={{  fontSize: '20px', lineHeight: '1.3' }}
                      >
                        {useCase.title}
                      </h3>
                    </div>
                  </div>

                  {/* Back Face */}
                  <div 
                    className="absolute inset-0 rounded-2xl bg-white border-2 border-[#005CCC] shadow-xl p-6 flex flex-col"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <h3 
                      className="text-[#005CCC] font-semibold mb-4"
                      style={{  fontSize: '22px', lineHeight: '1.3' }}
                    >
                      {useCase.title}
                    </h3>
                    <p 
                      className="text-gray-600 flex-grow mb-4"
                      style={{  fontSize: '15px', lineHeight: '1.6' }}
                    >
                      {useCase.description}
                    </p>
                    <a 
                      href={useCase.linkUrl}
                      className="inline-flex items-center text-[#005CCC] font-medium hover:gap-2 transition-all duration-300 group/link"
                      style={{  fontSize: '15px' }}
                    >
                      Learn more
                      <svg 
                        className="w-4 h-4 ml-1 transition-transform duration-300 group-hover/link:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* FAQ Section */}
      {content.faqs && content.faqs.length > 0 && (
      <section id="faqs" className="py-10 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-[#f8fafc] animate-on-scroll">
        <div className="section-container max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10">
            <span 
              className="inline-block px-4 py-2 rounded-full text-sm font-medium mb-4"
              style={{ 
                backgroundColor: 'var(--icon-blue-3)', 
                color: 'var(--azure-blue)'
              }}
            >
              {content.faqSectionBadge}
            </span>
            <h2 className="section-title">
              {renderedFaqTitle}
            </h2>
            <p className="section-desc mt-4">
              {content.faqSectionDescription}
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-3">
            {content.faqs.map((faq, index) => {
              const isActive = activeFaqIndex === index;
              return (
                <div 
                  key={faq.id}
                  className={`faq-item rounded-2xl overflow-hidden transition-all duration-300 ease-out ${
                    isActive 
                      ? 'bg-white shadow-lg shadow-blue-100/50 ring-1 ring-blue-100' 
                      : 'bg-[#EFF5FF] hover:bg-[#E8F2FF] hover:shadow-md'
                  }`}
                  style={{ 
                    transform: isActive ? 'scale(1.01)' : 'scale(1)',
                  }}
                >
                  <button
                    className="w-full flex items-center gap-4 p-5 sm:p-6 text-left group"
                    onClick={() => setActiveFaqIndex(isActive ? null : index)}
                  >
                    {/* Question Number */}
                    <span 
                      className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#005CCC] text-white' 
                          : 'bg-white/70 text-[#005CCC] group-hover:bg-white'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    
                    {/* Question Text */}
                    <span 
                      className="flex-1 pr-2 transition-colors duration-300"
                      style={{ 
                        fontSize: 'clamp(15px, 2vw, 17px)',
                        fontWeight: 600,
                        color: isActive ? '#005CCC' : '#1a1a1a'
                      }}
                    >
                      {faq.question}
                    </span>
                    
                    {/* Toggle Icon */}
                    <div 
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#005CCC] rotate-180' 
                          : 'bg-white/70 rotate-0 group-hover:bg-white group-hover:shadow-sm'
                      }`}
                    >
                      <svg 
                        className="w-5 h-5 transition-colors duration-300" 
                        fill="none" 
                        stroke={isActive ? 'white' : '#005CCC'}
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {/* Answer */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-out ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ 
                      maxHeight: isActive ? '400px' : '0px',
                    }}
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-0">
                      <div className="pl-12 border-l-2 border-[#005CCC]/20">
                        <p
                          style={{
                            fontSize: '15px',
                            fontWeight: 400,
                            lineHeight: '26px',
                            color: '#4b5563'
                          }}
                        >
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Explore Our Resources Section */}
      {resourcesData.length > 0 && content.resourcesSectionTitle && (
        <section id="explore-resources" className="product-resources-section animate-on-scroll">
          <div className="section-container">
            {/* Section Header */}
            <div className="product-resources-header">
              <span className="product-resources-badge">{content.resourcesSectionBadge || 'Resources'}</span>
              <h2 className="section-title mb-4">
                {content.resourcesSectionTitle}
              </h2>
              {content.resourcesSectionDescription && (
                <p className="section-desc">
                  {content.resourcesSectionDescription}
                </p>
              )}
            </div>

            {/* Resource Cards Grid */}
            <div className="product-resources-grid">
              {resourcesData.map((resource) => (
                <a 
                  key={resource.id} 
                  href={resource.linkUrl}
                  className="product-resource-card group"
                >
                  {/* Card Image */}
                  <div className="product-resource-card-image">
                    {resource.image ? (
                      <Image 
                        src={resource.image} 
                        alt={resource.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    ) : (
                      <div className="product-resource-card-image-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#005CCC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                          <polyline points="14 2 14 8 20 8"/>
                          <line x1="16" y1="13" x2="8" y2="13"/>
                          <line x1="16" y1="17" x2="8" y2="17"/>
                          <polyline points="10 9 9 9 8 9"/>
                        </svg>
                      </div>
                    )}
                    {/* Type Badge */}
                    <span className="product-resource-type-badge">
                      {resource.type}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="product-resource-card-content">
                    <h3 className="product-resource-card-title">{resource.title}</h3>
                    <p className="product-resource-card-desc">{resource.description}</p>
                    <span className="product-resource-card-link">
                      {resource.linkText || 'Read more'}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Form Section with HubSpot */}
      {content.contactFormSectionTitle && content.hubspotFormId && (
      <section id="contact-form" className="py-10 sm:py-12 lg:py-16 bg-[#f8fafc]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column - Content */}
            <div className="lg:sticky lg:top-8">
              <h2 className="section-title-left mb-4">
                {renderedContactTitle}
              </h2>
              
              <h3 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-[#005CCC] mb-6">
                {content.contactFormSectionSubtitle}
              </h3>
              
              <p className="section-desc-left mb-7">
                {content.contactFormSectionDescription}
              </p>
              
              <p className="text-[15px] font-semibold text-gray-900 mb-4">
                {content.contactFormSectionWhyTitle}
              </p>
              
              <ul className="space-y-4 mb-8">
                {content.contactFormSectionBenefits.map((benefit) => (
                  <li key={benefit.id} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#005CCC] mt-2.5 flex-shrink-0"></div>
                    <span className="card-desc">
                      {benefit.text.split(benefit.highlightedText).map((part, idx, arr) => (
                        <span key={idx}>
                          {part}
                          {idx < arr.length - 1 && <strong className="text-gray-900">{benefit.highlightedText}</strong>}
                        </span>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
              
              <p className="text-sm text-gray-500">
                {content.contactFormSectionFooterText}
              </p>
            </div>
            
            {/* Right Column - HubSpot Form */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-gray-100 w-full">
              <ContactUsHubSpotForm
                formId={content.hubspotFormId}
                containerId="hubspot-form-container"
                showLabels={true}
                submitButtonAlign="right"
              />
            </div>
          </div>
        </div>
      </section>
      )}

      {/* CTA Section - Enhanced with Gradient */}
      {content.ctaSectionTitle && (
      <section id="product-cta" className="product-cta-section py-16 sm:py-20 lg:py-24 gradient-cta relative overflow-hidden animate-on-scroll">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="product-cta-container section-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-white text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8">
              {content.ctaSectionTitle}
            </h2>
            <p className="text-white/90 text-base sm:text-lg mb-8 sm:mb-10 max-w-2xl mx-auto">
              {content.ctaSectionDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={content.ctaSectionPrimaryUrl}
                className="inline-flex items-center justify-center h-[51px] px-8 bg-white text-[#005CCC] font-semibold rounded-lg transition-all duration-200 hover:bg-gray-100 hover:scale-105 shadow-lg no-underline"
              >
                {content.ctaSectionPrimaryText}
              </a>
              <a 
                href={content.ctaSectionSecondaryUrl}
                className="inline-flex items-center justify-center h-[51px] px-8 bg-transparent text-white font-semibold rounded-lg border-2 border-white transition-all duration-200 hover:bg-white/10 no-underline"
              >
                {content.ctaSectionSecondaryText}
              </a>
            </div>
          </div>
        </div>
      </section>
      )}
    </>
  );
}

