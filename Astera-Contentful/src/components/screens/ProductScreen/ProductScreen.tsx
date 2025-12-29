import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from './ProductScreen.module.css';
import type { ProductPageContent } from '@/types/contentful';

interface ProductScreenProps {
  content: ProductPageContent;
}

export function ProductScreen({ content }: ProductScreenProps) {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeIcon}>🚀</span>
              {content.heroSectionBadge}
            </div>
            <h1 className={styles.heroTitle}>
              {documentToReactComponents(content.heroSectionHeading)}
            </h1>
            <p className={styles.heroDescription}>
              {content.heroSectionDescription}
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primaryCTA}>{content.heroSectionPrimaryCta}</button>
              <button className={styles.secondaryCTA}>{content.heroSectionSecondaryCta}</button>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroImageWrapper}>
              <img 
                src="https://cdn-ajfbi.nitrocdn.com/GuYcnotRkcKfJXshTEEKnCZTOtUwxDnm/assets/images/optimized/rev-cdc4f02/www.astera.com/wp-content/uploads/2025/07/ADPB.png"
                alt="AI Data Platform"
                className={styles.heroImage}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className={styles.productsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.productsSectionTitle}</h2>
            <p className={styles.sectionDescription}>
              {content.productsSectionDescription}
            </p>
          </div>
          <div className={styles.productsGrid}>
            {content.products.map((product, index) => {
              // Icon mapping for products
              const productIcons = [
                <svg key="p1" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0b63e5" stroke="#0b63e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" fill="#60a5fa" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                <svg key="p2" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="#0b63e5" stroke="#0b63e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                <svg key="p3" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="7" fill="#0b63e5" opacity="0.1"/>
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ];

              return (
                <div key={product.name} className={styles.productCard}>
                  {product.badge && (
                    <div className={styles.productBadge}>{product.badge}</div>
                  )}
                  <div className={styles.productIcon}>
                    {productIcons[index % productIcons.length]}
                  </div>
                  <h3 className={styles.productTitle}>{product.name}</h3>
                  <p className={styles.productDescription}>
                    {product.description}
                  </p>
                  <div className={styles.productHighlight}>
                    {product.highlights.map((highlight) => (
                      <span key={highlight} className={styles.highlightText}>{highlight}</span>
                    ))}
                  </div>
                  <button className={styles.productButton}>Learn More →</button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.productFeaturesSectionTitle}</h2>
            <p className={styles.sectionDescription}>
              {content.productFeaturesSectionDescription}
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {content.productFeatures.map((feature, index) => {
              // Icon mapping for product features
              const featureIcons = [
                <svg key="f1" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="#0b63e5" stroke="#0b63e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                <svg key="f2" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#0b63e5" stroke="#0b63e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                <svg key="f3" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#0b63e5" opacity="0.1"/>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                <svg key="f4" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12H16M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" fill="#0b63e5" opacity="0.1"/>
                </svg>
              ];

              return (
                <div key={feature.title} className={styles.featureItem}>
                  <div className={styles.featureIcon}>
                    {featureIcons[index % featureIcons.length]}
                  </div>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureText}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{content.ctaSectionTitle}</h2>
            <p className={styles.ctaDescription}>
              {content.ctaSectionDescription}
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>{content.ctaSectionPrimaryCta}</button>
              <button className={styles.secondaryButton}>{content.ctaSectionSecondaryCta}</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

