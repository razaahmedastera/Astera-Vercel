'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { IndustryData } from '@/data/industries';
import './IndustryScreen.css';

interface Props {
  industry: IndustryData;
}

/**
 * Convert YouTube URL to embed format
 */
function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';
  
  if (url.includes('youtube.com/embed/')) {
    return url.replace('?autoplay=1', '').replace('&autoplay=1', '');
  }
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }
  
  return url;
}

export default function IndustryScreen({ industry }: Props) {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['hero']));

  // Intersection Observer for scroll animations
  useEffect(() => {
    const sections = document.querySelectorAll('[data-animate-section]');
    const featuresSection = document.querySelector('.industry-features');
    
    setTimeout(() => {
      sections.forEach((section) => {
        section.classList.add('js-enabled');
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          section.classList.add('visible');
        }
      
      
      if (featuresSection) {
        featuresSection.classList.add('js-enabled');
        const rect = featuresSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          featuresSection.classList.add('visible');
        }
      }
    }, 100);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    });

    sections.forEach((section) => observer.observe(section));
    if (featuresSection) observer.observe(featuresSection);

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      if (featuresSection) observer.unobserve(featuresSection);
    };
  }, []);

  return (
    <div className="industry-page">
      {/* Hero Section */}
      <section className="industry-hero">
        <div className="section-container">
          <div className="industry-hero-layout">
            <div className="industry-hero-content">
              <span className="industry-hero-label">Industry Solutions</span>
              <h1 className="industry-hero-title">{industry.name}</h1>
              <p className="industry-hero-subtitle">{industry.subtitle}</p>
              <Link href={industry.ctaLink} prefetch={true} className="industry-hero-cta">
                {industry.ctaText}
              </Link>
            </div>
            <div className="industry-hero-image-wrapper">
              <Image
                src={industry.heroImage}
                alt={industry.name}
                fill
                className="industry-hero-img"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      {industry.videoUrl && (
        <section className="industry-video" id="video" data-animate-section>
          <div className="section-container">
            <div className="industry-video-container">
              <div className="industry-video-player">
                <iframe
                  src={getYouTubeEmbedUrl(industry.videoUrl)}
                  title={industry.videoTitle || 'Video'}
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-iframe"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="industry-features" id="features" data-animate-section>
        <div className="section-container">
          <div className="industry-features-grid">
            <div className="industry-features-header">
              <h2 className="industry-features-title">{industry.featuresSectionTitle}</h2>
              <div className="industry-features-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            {industry.features.map((feature) => (
              <div key={feature.id} className="industry-feature-card">
                {feature.iconImage ? (
                  <div className="feature-icon-image">
                    <Image
                      src={feature.iconImage}
                      alt={feature.title}
                      width={72}
                      height={72}
                      className="feature-icon-img"
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="industry-case-study" id="case-study" data-animate-section>
        <div className="section-container">
          <div className="industry-case-study-layout">
            <div className="industry-case-study-content">
              <span className="case-study-label">{industry.caseStudy.label}</span>
              <h2 className="case-study-title">{industry.caseStudy.title}</h2>
              <blockquote className="case-study-quote">
                {industry.caseStudy.quote}
              </blockquote>
              <div className="case-study-author">
                <span className="author-name">{industry.caseStudy.author}</span>
                <span className="author-role">{industry.caseStudy.authorRole} at {industry.caseStudy.company}</span>
              </div>
              <Link href={industry.caseStudy.ctaLink} prefetch={true} className="case-study-cta">
                {industry.caseStudy.ctaText}
              </Link>
            </div>
            <div className="industry-case-study-image">
              <Image
                src={industry.caseStudy.image}
                alt={industry.caseStudy.title}
                fill
                className="case-study-img"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="industry-final-cta" id="final-cta" data-animate-section>
        <div className="section-container">
          <div className="industry-final-cta-content">
            <h2 className="final-cta-title">{industry.finalCtaTitle}</h2>
            <p className="final-cta-subtitle">{industry.finalCtaSubtitle}</p>
            <Link href={industry.finalCtaButtonLink} prefetch={true} className="final-cta-button">
              {industry.finalCtaButtonText}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

