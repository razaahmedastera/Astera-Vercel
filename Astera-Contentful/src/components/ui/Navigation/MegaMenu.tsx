'use client';

import React from 'react';
import Link from 'next/link';

export interface Solution {
  name: string;
  slug: string;
  icon: React.ReactNode;
}

interface FeaturedContent {
  title: string;
  description: string;
  link: string;
  linkText: string;
}

interface WhatsNew {
  title: string;
  description: string;
}

interface MegaMenuProps {
  solutions: Solution[];
  featuredContent: FeaturedContent;
  whatsNew: WhatsNew[];
  isOpen: boolean;
  onClose: () => void;
}

// Icon components for solutions
const DataprepIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="2" fill="#005CCC" opacity="0.1"/>
    <rect x="6" y="6" width="12" height="12" rx="1" stroke="#005CCC" strokeWidth="2"/>
    <line x1="6" y1="10" x2="18" y2="10" stroke="#005CCC" strokeWidth="2"/>
    <line x1="6" y1="14" x2="18" y2="14" stroke="#005CCC" strokeWidth="2"/>
  </svg>
);

const AIAgentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="10" r="6" fill="#005CCC" opacity="0.1" stroke="#005CCC" strokeWidth="2"/>
    <circle cx="12" cy="10" r="3" fill="#005CCC"/>
    <path d="M8 18L12 14L16 18" stroke="#005CCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DataStackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="6" width="16" height="4" rx="1" fill="#005CCC" opacity="0.1" stroke="#005CCC" strokeWidth="2"/>
    <rect x="4" y="12" width="16" height="4" rx="1" fill="#005CCC" opacity="0.1" stroke="#005CCC" strokeWidth="2"/>
    <rect x="4" y="18" width="16" height="4" rx="1" fill="#005CCC" opacity="0.1" stroke="#005CCC" strokeWidth="2"/>
  </svg>
);

const UnstructuredDataIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#005CCC" opacity="0.1" stroke="#005CCC" strokeWidth="2"/>
  </svg>
);

const EDIConnectIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="2" fill="#005CCC" opacity="0.1" stroke="#005CCC" strokeWidth="2"/>
    <line x1="8" y1="8" x2="16" y2="8" stroke="#005CCC" strokeWidth="2"/>
    <line x1="8" y1="12" x2="16" y2="12" stroke="#005CCC" strokeWidth="2"/>
    <circle cx="10" cy="16" r="1" fill="#005CCC"/>
    <circle cx="14" cy="16" r="1" fill="#005CCC"/>
  </svg>
);

// Helper function to get icon based on slug (must be after icon definitions)
export function getIconForSlug(slug: string): React.ReactNode {
  const iconMap: Record<string, React.ReactNode> = {
    'dataprep': React.createElement(DataprepIcon),
    'ai-agent-builder': React.createElement(AIAgentIcon),
    'data-stack': React.createElement(DataStackIcon),
    'unstructured-data': React.createElement(UnstructuredDataIcon),
    'edi-connect': React.createElement(EDIConnectIcon),
  };
  
  // Try exact match first
  if (iconMap[slug]) {
    return iconMap[slug];
  }
  
  // Try partial match (e.g., "reportminer" contains "miner")
  const matchedKey = Object.keys(iconMap).find(key => slug.includes(key) || key.includes(slug));
  if (matchedKey) {
    return iconMap[matchedKey];
  }
  
  // Default icon
  return React.createElement(DataStackIcon);
}

export function MegaMenu({ solutions, featuredContent, whatsNew, isOpen, onClose }: MegaMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="mega-menu-backdrop"
        onClick={onClose}
      />
      
      {/* Mega Menu */}
      <div 
        className="mega-menu-container"
        onMouseEnter={(e) => e.stopPropagation()}
        onMouseLeave={onClose}
      >
        <div className="mega-menu-content">
          {/* Left Column - Solutions */}
          <div className="mega-menu-solutions">
            <h3 className="mega-menu-section-title">Solutions</h3>
            <ul className="mega-menu-solutions-list">
              {solutions.map((solution) => (
                <li key={solution.slug}>
                  <Link 
                    href={`/product?slug=${solution.slug}`}
                    prefetch={true}
                    className="mega-menu-solution-item"
                    onClick={onClose}
                  >
                    <div className="mega-menu-solution-icon">
                      {solution.icon}
                    </div>
                    <span className="mega-menu-solution-name">{solution.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Featured & What's New */}
          <div className="mega-menu-featured">
            {/* Featured Content */}
            <div className="mega-menu-featured-content">
              <h3 className="mega-menu-featured-title">{featuredContent.title}</h3>
              <p className="mega-menu-featured-description">{featuredContent.description}</p>
              <Link 
                href={featuredContent.link}
                prefetch={true}
                className="mega-menu-featured-link"
                onClick={onClose}
              >
                {featuredContent.linkText} →
              </Link>
            </div>

            {/* What's New */}
            <div className="mega-menu-whats-new">
              <h3 className="mega-menu-whats-new-title">WHAT&apos;S NEW</h3>
              <ul className="mega-menu-whats-new-list">
                {whatsNew.map((item, index) => (
                  <li key={index} className="mega-menu-whats-new-item">
                    <h4 className="mega-menu-whats-new-item-title">{item.title}</h4>
                    <p className="mega-menu-whats-new-item-description">{item.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Default data - create solutions array with icons using React.createElement
export const defaultSolutions: Solution[] = [
  { name: 'Astera Dataprep', slug: 'dataprep', icon: React.createElement(DataprepIcon) },
  { name: 'AI Agent Builder', slug: 'ai-agent-builder', icon: React.createElement(AIAgentIcon) },
  { name: 'Astera Data Stack', slug: 'data-stack', icon: React.createElement(DataStackIcon) },
  { name: 'Unstructured Data Management', slug: 'unstructured-data', icon: React.createElement(UnstructuredDataIcon) },
  { name: 'EDI Connect', slug: 'edi-connect', icon: React.createElement(EDIConnectIcon) },
];

export const defaultFeaturedContent: FeaturedContent = {
  title: 'Astera AI Agent Builder: Build AI Agents That Work for You',
  description: 'AI experts offer an exclusive look at how agents are built with Astera AI Agent Builder.',
  link: '/webinar/ai-agent-builder',
  linkText: 'Watch Webinar',
};

export const defaultWhatsNew: WhatsNew[] = [
  {
    title: 'Astera Dataprep is Here',
    description: 'Chat for data prep using natural language. Try it now for free!',
  },
  {
    title: 'Introducing ReportMiner 12.0',
    description: 'Featuring newly-added AI capabilities and more!',
  },
  {
    title: "Astera Recognized in G2's Winter 2025 Report",
    description: 'Astera is proud to receive the Momentum Leader and High Performer awards.',
  },
];
