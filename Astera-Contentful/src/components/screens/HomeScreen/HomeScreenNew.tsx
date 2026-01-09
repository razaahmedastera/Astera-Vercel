'use client';

import { useState, useEffect, useMemo } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import dynamic from 'next/dynamic';
import type { HomePageContent } from '@/types/contentful';
import { Awards } from '@/components/ui/Awards';

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
  const [counters, setCounters] = useState({ efficiency: 0, timeToMarket: 0, accuracy: 0, costReduction: 0 });

  // Memoize static data to prevent unnecessary re-renders
  const tabs = useMemo(() => [
    'Unstructured Data Management',
    'Astera Dataprep',
    'Data Pipeline',
    'Astera Data Warehouse Builder',
    'EDI Management'
  ], []);

  const tabContent = useMemo(() => [
    {
      title: 'Manage Unstructured Data Effortlessly with AI',
      description: 'Automated and accurate data extraction and management powered by LLM-driven features and AI workflows.',
      features: [
        'Automate data ingestion, extraction, processing, and loading to your destinations',
        'Extract from different file types, varying formats, and inconsistent layouts using AI-powered features',
        'Build and validate data extraction workflows effortlessly with a visual interface'
      ],
      image: '/images/tabs/rm.png',
      learnMore: 'https://www.astera.com/products/report-miner/'
    },
    {
      title: 'AI-Powered, Chat-Based Data Preparation for Everyone',
      description: 'Clean, transform, and prepare data using natural language through a simple chat-based interface.',
      features: [
        'Use simple prompts to perform complex data prep and manipulation',
        'Clean, combine, and calculate data from multiple sources',
        'Automate routine prep tasks to focus on analysis and decision-making',
        'Cloud-based architecture that scales easily with your workload'
      ],
      image: '/images/tabs/dataprep.png',
      learnMore: 'https://www.astera.com/products/astera-data-prep/'
    },
    {
      title: 'Build Customized Data Pipelines',
      description: 'Quickly create, visualize, and automate data pipelines in a no-code environment using AI, pre-built connectors, transformations, data profiling, and validation features.',
      features: [
        'AI-powered data pipelines simplify ETL and ELT using a conversational interface',
        'Orchestrate processes and schedule time-based or event-based reruns',
        'Connect to 50+ databases, files, APIs, and cloud services',
        'Enable code-free API development and lifecycle management'
      ],
      image: '/images/tabs/ADPB.png',
      learnMore: 'https://www.astera.com/products/centerprise-data/'
    },
    {
      title: 'Go from Prompt to Production-Ready Data Warehouse in Record Time',
      description: 'Share your requirements in simple prompts and let Astera\'s agentic platform design models, build pipelines, and deploy instantly.',
      features: [
        'AI-driven automation across the entire data warehouse lifecycle',
        'Natural language, no-code interface replaces complex configuration',
        'Rapid iteration with AI-powered data modeling',
        'Metadata-driven architecture keeps models aligned with business needs'
      ],
      image: '/images/tabs/adwb-1.png',
      learnMore: 'https://www.astera.com/products/data-warehouse-builder/'
    },
    {
      title: 'Automate and Optimize EDI Transactions',
      description: 'Automate the transfer and translation of EDI messages for seamless connectivity with trading partners.',
      features: [
        'Support for X12, EDIFACT, HL7, and other EDI formats',
        'Ensure compliance with standard and custom validation rules',
        'Seamless integration with ERP, CRM, and enterprise systems',
        'Automated file transfers, acknowledgments, and error handling'
      ],
      image: '/images/tabs/EDI-management.svg',
      learnMore: 'https://www.astera.com/products/ediconnect/'
    }
  ], []);

  // Optimize Lottie loading - only load when component mounts
  useEffect(() => {
    let isMounted = true;
    
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

    const targets = { efficiency: 90, timeToMarket: 90, accuracy: 95, costReduction: 80 };
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setCounters({
        efficiency: Math.floor(targets.efficiency * progress),
        timeToMarket: Math.floor(targets.timeToMarket * progress),
        accuracy: Math.floor(targets.accuracy * progress),
        costReduction: Math.floor(targets.costReduction * progress),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCounters(targets);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isMetricsVisible]);

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
              {content.heroSectionBadge || '#AsteraAI'}
            </div>
            <h1 className="hero-section-heading font-semibold text-[#000] mb-4 sm:mb-6 tracking-tight text-left" style={{ fontSize: 'clamp(1.75rem, 5vw, 3rem)', lineHeight: 'clamp(32px, 8vw, 60px)' }}>
              {documentToReactComponents(content.heroSectionHeading)}
            </h1>
            <p className="hero-section-description text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 mb-6 sm:mb-8 lg:mb-10 max-w-[600px] text-left">
              {content.heroSectionDescription}
            </p>
            <div className="hero-section-cta flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="px-5 py-2.5 sm:px-6 sm:py-2 rounded-lg sm:rounded-[10px] text-sm sm:text-base font-medium sm:font-semibold border-none cursor-pointer transition-all bg-[#005CCC] text-white shadow-[#005CCC]/1 hover:-translate-y-0.3 hover:shadow-xl hover:shadow-[#005CCC]/20 w-full sm:w-auto">
                {content.heroSectionPrimaryCta || 'Request Demo →'}
              </button>
              <button className="px-5 py-2.5 sm:px-6 sm:py-2 rounded-lg sm:rounded-[10px] text-sm sm:text-base font-medium sm:font-semibold border-2 border-[#005CCC] cursor-pointer transition-all bg-white text-[#005CCC] hover:border-[#004ba3] hover:text-[#004ba3] w-full sm:w-auto">
                {content.heroSectionSecondaryCta || 'Get Instant Access For 14 Days →'}
              </button>
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
      <section id="ai-driven-data-stack" className="ai-driven-data-stack-section py-12 sm:py-16 lg:py-20 bg-gradient-to-br  to-white">
        <div className="ai-driven-data-stack-container section-container">
          <h2 className="section-title mb-4 sm:mb-6">
            An AI-Driven Data Stack That <br className="hidden sm:block" />Simplifies How You <span className="highlight">Manage Data</span>
          </h2>
          <p className="section-desc mb-6 sm:mb-8 lg:mb-10">
            Move from raw data to insights with simple prompts and agentic workflows.
          </p>
          <div className="ai-driven-data-stack-video-container max-w-[900px] mx-auto">
            <div className="ai-driven-data-stack-video-wrapper relative w-full pb-[56.25%] h-0 overflow-hidden rounded-2xl shadow-2xl">
              <iframe
                id="product-tour-video"
                className="ai-driven-data-stack-video absolute top-0 left-0 w-full h-full border-none rounded-2xl"
                src="https://www.youtube.com/embed/Pa3_VH-WiIA"
                title="PRODUCT TOUR Astera Data Stack"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Tabs Section */}
      <section id="simplifying-data-management" className="feature-tabs-section simplifying-data-management-section py-12 sm:py-16 lg:py-20" style={{ backgroundColor: '#EFF5FF' }}>
        <div className="feature-tabs-container section-container bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 shadow-sm">
          <h2 className="section-title mb-6 sm:mb-8">
            Simplifying <span className="highlight">Data Management</span> with Astera
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
                {tabContent[activeTab]?.title || tabContent[0].title}
              </h3>
              <p className="feature-tabs-description text-sm sm:text-base lg:text-lg leading-relaxed text-gray-600 mb-6 sm:mb-8 text-left">
                {tabContent[activeTab]?.description || tabContent[0].description}
              </p>
              <ul className="feature-tabs-list list-none p-0 m-0 flex flex-col gap-2 sm:gap-3 mb-6 sm:mb-8">
                {(tabContent[activeTab]?.features || tabContent[0].features).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-[#000] leading-relaxed">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#005CCC" className="mt-0.5 flex-shrink-0" style={{ minWidth: '18px' }}>
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href={tabContent[activeTab]?.learnMore || tabContent[0].learnMore} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#005CCC] font-medium sm:font-semibold text-sm sm:text-base no-underline transition-colors hover:text-[#004ba3]">
                Learn More <span>→</span>
              </a>
            </div>
            <div className="feature-tabs-visual w-full">
              <div className="feature-tabs-card bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                <div className="relative w-full h-full min-h-[250px] sm:min-h-[300px] lg:min-h-[400px] flex items-center justify-center p-4 sm:p-6">
                  <img 
                    src={tabContent[activeTab]?.image || tabContent[0].image}
                    alt={tabContent[activeTab]?.title || tabContent[0].title}
                    className="w-full h-auto object-contain rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section id="achieve-more" className="metrics-section achieve-more-section py-12 sm:py-16 lg:py-20">
        <div className="metrics-container section-container">
          <h2 className="section-title mb-8 sm:mb-10 lg:mb-12">
            Achieve More in Less Time and Effort with <span className="highlight">Astera AI</span>
          </h2>
          <div className="metrics-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div id="metric-operational-efficiency" className="metric-card rounded-xl p-8 text-center transition-all duration-300 hover:bg-[#E8F0FF] hover:shadow-md hover:-translate-y-1 cursor-pointer" style={{ backgroundColor: '#EFF5FF' }}>
              <div className="mb-4 flex justify-center transition-transform duration-300 hover:scale-110">
                <img src="/images/tabs/Group-34-1.png" alt="Operational Efficiency" className="w-12 h-12 object-contain" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#005CCC] mb-2 transition-all duration-300">{counters.efficiency}%</div>
              <div className="text-base sm:text-lg font-semibold text-[#000] mb-2">Operational Efficiency</div>
              <div className="text-xs sm:text-sm text-[#000] leading-relaxed">Boost in operational efficiency, freeing up time for strategic focus.</div>
            </div>
            <div id="metric-time-to-market" className="metric-card rounded-xl p-8 text-center transition-all duration-300 hover:bg-[#E8F0FF] hover:shadow-md hover:-translate-y-1 cursor-pointer" style={{ backgroundColor: '#EFF5FF' }}>
              <div className="mb-4 flex justify-center transition-transform duration-300 hover:scale-110">
                <img src="/images/tabs/Layer-2-1.svg" alt="Faster Time to Market" className="w-12 h-12 object-contain" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#005CCC] mb-2 transition-all duration-300">{counters.timeToMarket}%</div>
              <div className="text-base sm:text-lg font-semibold text-[#000] mb-2">Faster Time to Market</div>
              <div className="text-xs sm:text-sm text-[#000] leading-relaxed">Faster time to market, enabling quicker product launches and execution.</div>
            </div>
            <div id="metric-data-accuracy" className="metric-card rounded-xl p-8 text-center transition-all duration-300 hover:bg-[#E8F0FF] hover:shadow-md hover:-translate-y-1 cursor-pointer" style={{ backgroundColor: '#EFF5FF' }}>
              <div className="mb-4 flex justify-center transition-transform duration-300 hover:scale-110">
                <img src="/images/tabs/Group-8.svg" alt="Data Accuracy" className="w-12 h-12 object-contain" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#005CCC] mb-2 transition-all duration-300">{counters.accuracy}%</div>
              <div className="text-base sm:text-lg font-semibold text-[#000] mb-2">Data Accuracy</div>
              <div className="text-xs sm:text-sm text-[#000] leading-relaxed">Improved data accuracy, ensuring decisions are based on precise, reliable data.</div>
            </div>
            <div id="metric-cost-reduction" className="metric-card rounded-xl p-8 text-center transition-all duration-300 hover:bg-[#E8F0FF] hover:shadow-md hover:-translate-y-1 cursor-pointer" style={{ backgroundColor: '#EFF5FF' }}>
              <div className="mb-4 flex justify-center transition-transform duration-300 hover:scale-110">
                <img src="/images/tabs/Vector-5.svg" alt="Cost Reduction" className="w-12 h-12 object-contain" />
              </div>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#005CCC] mb-2 transition-all duration-300">{counters.costReduction}%</div>
              <div className="text-base sm:text-lg font-semibold text-[#000] mb-2">Cost Reduction</div>
              <div className="text-xs sm:text-sm text-[#000] leading-relaxed">Cost reduction in operations through AI-powered data management.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Offerings Section */}
      <section id="transform-integrate-scale" className="product-offerings-section transform-integrate-scale-section py-12 sm:py-16 lg:py-24 bg-white">
        <div className="product-offerings-container section-container">
          <h2 className="section-title mb-8 sm:mb-12 lg:mb-16">
            <span className="highlight">Transform, Integrate, and Scale</span> Your Data Effortlessly
          </h2>
          <div className="product-offerings-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[
                {
                  title: 'Data Pipeline Builder',
                  description: 'Create, integrate, and automate ETL workflows with an AI-powered, chat-based interface.',
                  learnMore: 'https://www.astera.com/products/centerprise-data/'
                },
                {
                  title: 'Unstructured Data Management',
                  description: 'Transform unstructured data into insights using AI-powered features.',
                  learnMore: 'https://www.astera.com/products/report-miner/'
                },
                {
                  title: 'Astera Dataprep',
                  description: 'Prep your data in seconds with Astera\'s AI-powered chat-based data prep.',
                  learnMore: 'https://www.astera.com/products/astera-data-prep/'
                },
                {
                  title: 'Data Warehouse Builder',
                  description: 'Build your data warehouse with prompts using AI-powered features.',
                  learnMore: 'https://www.astera.com/products/data-warehouse-builder/'
                },
                {
                  title: 'Electronic Data Interchange (EDI)',
                  description: 'Simplify B2B transactions with powerful electronic data interchange capabilities.',
                  learnMore: 'https://www.astera.com/products/ediconnect/'
                },
                {
                  title: 'AI Agent Builder',
                  description: 'Design, test, and launch intelligent AI agents in just hours with a drag-and-drop visual builder.',
                  learnMore: 'https://www.astera.com/ai-agent-builder/'
                }
              ].map((product, index) => (
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
                    href={product.learnMore} 
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

      {/* Awards Section - Global Component */}
      <Awards />

      {/* Resources Section */}
      <section id="resources" className="resources-section py-12 sm:py-16 lg:py-28 bg-gradient-to-br from-primary-50 to-white">
        <div className="resources-container section-container">
          <h2 className="section-title mb-8 sm:mb-12 lg:mb-16">Explore Our <span className="highlight">Resources</span></h2>
          <div className="resources-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                type: 'WEBINAR', 
                title: 'Astera AI Agent Builder — Build AI Agents That Work for You',
                image: '/images/resources/webinar.jpg',
                link: 'https://www.astera.com/type/webinars/astera-ai-agent-builder/'
              },
              { 
                type: 'EBOOK', 
                title: 'The New Frontier of AI in Data Management: 5 Trends To Look Out For in 2025',
                image: '/images/resources/ebook.png',
                link: 'https://www.astera.com/type/e-book/ai-in-data-management/'
              },
              { 
                type: 'BLOG', 
                title: 'Why Data Teams Are Best-Positioned For Agentic AI Success With Data Integration and MCPs',
                image: '/images/resources/blog.png',
                link: 'https://www.astera.com/type/blog/roadmap-to-agentic-ai-success/'
              },
              { 
                type: 'WHITEPAPER', 
                title: 'Introduction to Generative AI and its Role in Unstructured Data Extraction Automation',
                image: '/images/resources/whitepaper.png',
                link: 'https://www.astera.com/type/whitepaper/generative-ai-and-data-extraction-automation/'
              }
            ].map((resource, index) => (
              <a 
                key={index} 
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                id={`resource-${resource.type.toLowerCase()}-${index}`} 
                className="resource-card bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                {/* Top Section - Image */}
                <div className="resource-image-container relative h-56 bg-gradient-to-br from-[#005CCC] to-[#004ba3] overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#005CCC]/30"></div>
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
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

      {/* Final CTA Section */}
      <section id="final-cta" className="final-cta-section py-12 sm:py-16 lg:py-28" style={{ backgroundColor: 'transparent', backgroundImage: 'linear-gradient(180deg, #EFF5FF 0%, #FFFFFF 100%)' }}>
        <div className="final-cta-container section-container">
          <h2 className="section-title mb-4 sm:mb-6">
            Leverage the Power of <span className="highlight">Data + Agentic AI</span> Today!
          </h2>
          <p className="section-desc mb-8 sm:mb-12 lg:mb-16">
            Join the ranks of forward-thinking businesses leveraging AI to drive success with data.
          </p>
          <div className="final-cta-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            <div id="get-demo" className="cta-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col" style={{ backgroundColor: '#EFF5FF' }}>
              <div className="relative z-10 flex flex-col flex-grow">
                <h3 className="cta-title text-lg sm:text-xl font-semibold text-[#000] mb-3 sm:mb-4">Request Free Demo</h3>
                <p className="cta-description text-xs sm:text-sm leading-relaxed text-gray-600 mb-4 sm:mb-6 flex-grow">See Astera Data Stack in Action.</p>
                <a href="#" className="cta-button inline-block w-full px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-medium sm:font-semibold text-center bg-[#005CCC] text-white hover:bg-[#004ba3] transition-colors mt-auto">
                  Sign Up
                </a>
              </div>
              <div className="absolute -right-6 -top-6 opacity-20">
                <img 
                  src="/images/Group-13-2-1.png" 
                  alt="Demo Icon"
                  className="w-24 h-24 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            <div id="cta-talk-to-expert" className="cta-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col" style={{ backgroundColor: '#EFF5FF' }}>
              <div className="relative z-10 flex flex-col flex-grow">
                <h3 className="cta-title text-lg sm:text-xl font-semibold text-[#000] mb-3 sm:mb-4">Talk to an Expert</h3>
                <p className="cta-description text-xs sm:text-sm leading-relaxed text-gray-600 mb-4 sm:mb-6 flex-grow">Schedule a quick call, and let us show you how our solution can effortlessly enhance your specific use case.</p>
                <a href="https://www.astera.com/contact/" target="_blank" rel="noopener noreferrer" className="cta-button inline-block w-full px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-medium sm:font-semibold text-center bg-[#005CCC] text-white hover:bg-[#004ba3] transition-colors mt-auto">
                  Contact Us
                </a>
              </div>
              <div className="absolute -right-6 -top-6 opacity-20">
                <img 
                  src="/images/Mask-group-17-2.png" 
                  alt="Expert Icon"
                  className="w-24 h-24 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
            <div id="cta-newsletter" className="cta-card rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col" style={{ backgroundColor: '#EFF5FF' }}>
              <div className="relative z-10 flex flex-col flex-grow">
                <h3 className="cta-title text-lg sm:text-xl font-semibold text-[#000] mb-3 sm:mb-4">Newsletter</h3>
                <p className="cta-description text-xs sm:text-sm leading-relaxed text-gray-600 mb-4 sm:mb-6 flex-grow">Get the latest news & stay updated about the latest AI, data integration, extraction, warehousing, & data management features and trends.</p>
                <a href="#" className="cta-button inline-block w-full px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg text-xs sm:text-sm font-medium sm:font-semibold text-center bg-[#005CCC] text-white hover:bg-[#004ba3] transition-colors mt-auto">
                  Subscribe
                </a>
              </div>
              <div className="absolute -right-6 -top-6 opacity-20">
                <img 
                  src="/images/Mask-group-18-2.png" 
                  alt="Newsletter Icon"
                  className="w-24 h-24 object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

