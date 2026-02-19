'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import dynamic from 'next/dynamic';
import type { HomePageContent } from '@/types/contentful';
import { Awards } from '@/components/ui/Awards/Awards';

// Lazy load Lottie to improve initial page load
const Lottie = dynamic(
  () => import('lottie-react'),
  { 
    ssr: false,
    loading: () => <div className="w-full h-full bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl flex items-center justify-center"><div className="text-2xl font-semibold text-primary-500/50">Loading...</div></div>
  }
);

interface HomeScreenNewProps {
  content: HomePageContent;
}

export function HomeScreenNew({ content }: HomeScreenNewProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [animationData, setAnimationData] = useState<any>(null);
  const [isMetricsVisible, setIsMetricsVisible] = useState(false);
  
  // Get tabs from content
  const tabs = useMemo(() => {
    return content.featureTabs.map(tab => tab.tabName);
  }, [content.featureTabs]);

  // Get tab content from Contentful
  const tabContent = useMemo(() => {
    return content.featureTabs;
  }, [content.featureTabs]);

  // Initialize counters dynamically from content metrics
  const initialCounters = useMemo(() => {
    const counters: Record<string, number> = {};
    content.metrics.forEach(metric => {
      counters[metric.id] = 0;
    });
    return counters;
  }, [content.metrics]);

  const [counters, setCounters] = useState(initialCounters);

  // Optimize Lottie loading - only load when component mounts
  useEffect(() => {
    let isMounted = true;
    
    // Use static Lottie file
    fetch('/lottie/headerv2.json')
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) setAnimationData(data);
      })
      .catch((error) => {
        if (isMounted) console.error('Error loading Lottie animation:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Optimize Intersection Observer - only create once
  useEffect(() => {
    if (isMetricsVisible) return; // Already visible, no need to observe

    const metricsSection = document.getElementById('achieve-more');
    if (!metricsSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !isMetricsVisible) {
          setIsMetricsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(metricsSection);

    return () => {
      observer.disconnect();
    };
  }, [isMetricsVisible]);

  // Optimize counter animation with requestAnimationFrame for smoother performance
  useEffect(() => {
    if (!isMetricsVisible) return;

    // Build targets from content metrics
    const targets: Record<string, number> = {};
    content.metrics.forEach(metric => {
      targets[metric.id] = metric.value;
    });

    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const newCounters: Record<string, number> = {};
      content.metrics.forEach(metric => {
        newCounters[metric.id] = Math.floor(metric.value * progress);
      });
      setCounters(newCounters);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCounters(targets);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isMetricsVisible, content.metrics]);

  return (
    <>
      {/* Hero Section */}
      <section 
        id="hero-section"
        className="hero-section py-12 sm:py-16 lg:py-20 flex items-center relative"
        style={{
          backgroundImage: "url('/images/hero-background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/95 to-white/90 z-0"></div>
        <div className="hero-section-container section-container grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8 lg:gap-16 items-center relative z-10">
          <div className="hero-section-content animate-[fadeInLeft_0.6s_ease-out]">
            <div className="hero-section-badge inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-br from-primary-50 to-primary-100 text-primary-500 rounded-full text-sm font-semibold mb-6">
              {content.heroSectionBadge}
            </div>
            <h1 className="hero-section-heading font-semibold text-[#000] mb-4 sm:mb-6 tracking-tight text-left" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', lineHeight: 'clamp(32px, 8vw, 60px)' }}>
              {documentToReactComponents(content.heroSectionHeading)}
            </h1>
            <p className="hero-section-description text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 mb-6 sm:mb-8 lg:mb-10 max-w-[600px] text-left">
              {content.heroSectionDescription}
            </p>
            <div className="hero-section-cta flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a 
                href={content.heroSectionPrimaryCtaUrl}
                className="px-5 py-2.5 sm:px-6 sm:py-2 rounded-lg sm:rounded-[10px] text-sm sm:text-base font-medium sm:font-semibold border-none cursor-pointer transition-all bg-[#005CCC] text-white shadow-[#005CCC]/1 hover:-translate-y-0.3 hover:shadow-xl hover:shadow-[#005CCC]/20 w-full sm:w-auto text-center no-underline"
              >
                {content.heroSectionPrimaryCta}
              </a>
              <a 
                href={content.heroSectionSecondaryCtaUrl}
                className="px-5 py-2.5 sm:px-6 sm:py-2 rounded-lg sm:rounded-[10px] text-sm sm:text-base font-medium sm:font-semibold border-2 border-[#005CCC] cursor-pointer transition-all bg-white text-[#005CCC] hover:border-[#004ba3] hover:text-[#004ba3] w-full sm:w-auto text-center no-underline"
              >
                {content.heroSectionSecondaryCta}
              </a>
            </div>
          </div>
          <div className="hero-section-animation animate-[fadeInRight_0.6s_ease-out]">
            <div className="hero-section-lottie-container relative w-full h-[300px] sm:h-[400px] lg:h-[500px] flex items-center justify-center">
              {animationData ? (
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  className="hero-section-lottie w-full h-full max-w-[600px] max-h-[500px]"
                  style={{ willChange: 'transform' }}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* AI-Driven Data Stack Section */}
      {content.aiStackSectionTitle && content.aiStackVideoUrl && (
        <section id="ai-driven-data-stack" className="ai-driven-data-stack-section py-12 sm:py-16 lg:py-20 bg-gradient-to-br  to-white">
          <div className="ai-driven-data-stack-container section-container">
            {content.aiStackSectionTitle && (
              <h2 className="section-title mb-4 sm:mb-6">
                {content.aiStackSectionTitle}
              </h2>
            )}
            {content.aiStackSectionDescription && (
              <p className="section-desc mb-6 sm:mb-8 lg:mb-10">
                {content.aiStackSectionDescription}
              </p>
            )}
            {content.aiStackVideoUrl && (
              <div className="ai-driven-data-stack-video-container max-w-[900px] mx-auto">
                <div className="ai-driven-data-stack-video-wrapper relative w-full pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-2xl">
                  <iframe
                    id="product-tour-video"
                    className="ai-driven-data-stack-video absolute top-0 left-0 w-full h-full border-none rounded-2xl"
                    src={content.aiStackVideoUrl.replace('watch?v=', 'embed/')}
                    title={content.aiStackSectionTitle || 'Product Tour'}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Feature Tabs Section */}
      {content.featureTabs && content.featureTabs.length > 0 && (
      <section id="simplifying-data-management" className="feature-tabs-section simplifying-data-management-section py-12 sm:py-16 lg:py-20" style={{ backgroundColor: '#EFF5FF' }}>
        <div className="feature-tabs-container section-container bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 shadow-sm">
          <h2 className="section-title mb-6 sm:mb-8">
            {content.featureTabsSectionTitle}
          </h2>
          <div className="feature-tabs-nav flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 lg:mb-16 flex-wrap w-full overflow-x-auto pb-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                id={`feature-tab-${index}`}
                className={`feature-tab-button px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium sm:font-semibold border-2 transition-all whitespace-nowrap flex-shrink-0 ${
                  activeTab === index
                    ? 'bg-[#005CCC] text-white border-[#005CCC] shadow-sm'
                    : 'bg-white text-[#005CCC] border-[#005CCC] hover:bg-[#e6f0ff]'
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="feature-tabs-content grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start w-full">
            <div className="feature-tabs-text">
              <h3 className="feature-tabs-title text-xl sm:text-2xl lg:text-3xl font-semibold text-[#000] mb-3 sm:mb-4 text-left leading-tight">
                {tabContent[activeTab].title}
              </h3>
              <p className="feature-tabs-description text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 mb-6 sm:mb-8 text-left">
                {tabContent[activeTab].description}
              </p>
              <ul className="feature-tabs-list list-none p-0 m-0 flex flex-col gap-2 sm:gap-3 mb-6 sm:mb-8">
                {tabContent[activeTab].features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-[#000] leading-relaxed">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#005CCC" className="mt-0.5 flex-shrink-0" style={{ minWidth: '18px' }}>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href={tabContent[activeTab].learnMoreUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#005CCC] font-medium sm:font-semibold text-sm sm:text-base no-underline transition-colors hover:text-[#004ba3]">
                Learn More <span>→</span>
              </a>
            </div>
            <div className="feature-tabs-visual w-full">
              <div className="feature-tabs-card bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="relative w-full h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] flex items-center justify-center p-4 sm:p-6">
                  <Image 
                    src={tabContent[activeTab].image}
                    alt={tabContent[activeTab].title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain rounded-lg"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Metrics Section */}
      {content.metrics && content.metrics.length > 0 && (
      <section id="achieve-more" className="metrics-section achieve-more-section py-12 sm:py-16 lg:py-20">
        <div className="metrics-container section-container">
          <h2 className="section-title mb-8 sm:mb-10 lg:mb-12">
            {content.metricsSectionTitle}
          </h2>
          <div className="metrics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.metrics.map((metric, index) => (
              <div key={metric.id} id={`metric-${metric.id}`} className="metric-card rounded-xl p-8 text-center transition-all duration-300 hover:bg-[#E8F0FF] hover:shadow-md hover:-translate-y-1 cursor-pointer" style={{ backgroundColor: '#EFF5FF' }}>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#005CCC] mb-2 transition-all duration-300">
                  {counters[metric.id]}{metric.unit}
                </div>
                <div className="text-base sm:text-lg font-semibold text-[#000] mb-2">{metric.title}</div>
                <div className="text-xs sm:text-sm text-[#000] leading-relaxed">{metric.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Product Offerings Section */}
      {content.productOfferings && content.productOfferings.length > 0 && (
      <section id="transform-integrate-scale" className="product-offerings-section transform-integrate-scale-section py-12 sm:py-16 lg:py-24 bg-white">
        <div className="product-offerings-container section-container">
          <h2 className="section-title mb-8 sm:mb-12 lg:mb-16">
            {content.productOfferingsSectionTitle}
          </h2>
          <div className="product-offerings-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {content.productOfferings.map((product, index) => (
              <div 
                key={index} 
                id={`product-offering-${index}`} 
                className="product-offering-card bg-white rounded-2xl p-6 border border-gray-100 transition-all duration-300 hover:border-[#005CCC] hover:shadow-xl hover:-translate-y-1 cursor-pointer group"
              >
                <h3 className="product-offering-title text-lg font-semibold text-[#000] mb-3 leading-tight group-hover:text-[#005CCC] transition-colors">
                  {product.title}
                </h3>
                <p className="product-offering-description text-sm leading-relaxed text-gray-600 mb-5">
                  {product.description}
                </p>
                <a 
                  href={product.learnMoreUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="product-offering-link text-[#005CCC] font-semibold text-sm no-underline transition-all hover:text-[#004ba3] inline-flex items-center gap-2 group-hover:gap-3"
                >
                  Learn More 
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Awards Section - Global Component */}
      <Awards 
        title={content.awardsSectionTitle} 
        awards={content.awards} 
      />

      {/* Resources Section */}
      {content.resources && content.resources.length > 0 && (
      <section id="resources" className="resources-section py-12 sm:py-16 lg:py-28 bg-gradient-to-br from-primary-50 to-white">
        <div className="resources-container section-container">
          <h2 className="section-title mb-8 sm:mb-12 lg:mb-16">
            {content.resourcesSectionTitle}
          </h2>
          <div className="resources-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.resources.map((resource, index) => (
              <a 
                key={index} 
                href={resource.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                id={`resource-${resource.type.toLowerCase()}-${index}`} 
                className="resource-card bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                {/* Top Section - Image */}
                <div className="resource-image-container relative h-56 overflow-hidden flex items-center justify-center">
                  {resource.image ? (
                    <Image 
                      src={resource.image} 
                      alt={resource.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#005CCC] to-[#004ba3]"></div>
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#005CCC]/30"></div>
                    </>
                  )}
                </div>
                {/* Bottom Section - Content */}
                <div className="resource-content p-6">
                  <div className="resource-type inline-block px-3 py-1 sm:px-4 sm:py-1.5 bg-[#005CCC] text-white rounded-full text-xs font-medium sm:font-semibold mb-3 sm:mb-4">
                    {resource.type}
                  </div>
                  <h3 className="resource-title text-sm sm:text-base font-semibold text-[#000] leading-relaxed line-clamp-3 group-hover:text-[#005CCC] transition-colors">
                    {resource.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Final CTA Section */}
      {content.finalCtaCards && content.finalCtaCards.length > 0 && (
      <section id="final-cta" className="final-cta-section py-12 sm:py-16 lg:py-28" style={{ backgroundColor: 'transparent', backgroundImage: 'linear-gradient(180deg, #EFF5FF 0%, #FFFFFF 100%)' }}>
        <div className="final-cta-container section-container">
          <h2 className="section-title mb-4 sm:mb-6">
            {content.finalCtaSectionTitle}
          </h2>
          <p className="section-desc mb-8 sm:mb-12 lg:mb-16">
            {content.finalCtaSectionDescription}
          </p>
          <div className="final-cta-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {content.finalCtaCards.map((card, index) => (
              <div key={index} id={`cta-${index}`} className="cta-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col" style={{ backgroundColor: '#EFF5FF' }}>
                <div className="relative z-10 flex flex-col flex-grow">
                  <h3 className="cta-title text-lg sm:text-xl font-semibold text-[#000] mb-3 sm:mb-4">{card.title}</h3>
                  <p className="cta-description text-xs sm:text-sm leading-relaxed text-gray-600 mb-4 sm:mb-6 flex-grow">{card.description}</p>
                  <a href={card.buttonUrl} target={card.buttonUrl.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className="cta-button inline-block w-full px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-medium sm:font-semibold text-center bg-[#005CCC] text-white hover:bg-[#004ba3] transition-colors mt-auto">
                    {card.buttonText}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}
    </>
  );
}

