import styles from './ProductScreen.module.css';

export function ProductScreen() {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeIcon}>🚀</span>
              Our Products
            </div>
            <h1 className={styles.heroTitle}>AI-Powered Data Products</h1>
            <p className={styles.heroDescription}>
              Comprehensive suite of data management tools designed to transform how you process, 
              filter, and analyze your data with cutting-edge AI technology.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primaryCTA}>Explore Products</button>
              <button className={styles.secondaryCTA}>Watch Demo</button>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroImageWrapper}>
              <img 
                src="https://cdn-ajfbi.nitrocdn.com/GuYcnotRkcKfJXshTEEKnCZTOtUwxDnm/assets/images/optimized/rev-cdc4f02/www.astera.com/wp-content/uploads/2025/07/ADPB.png"
                alt="AI Data Platform"
                className={styles.heroImage}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className={styles.productsSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Product Suite</h2>
            <p className={styles.sectionDescription}>
              Everything you need to manage, process, and analyze your data efficiently
            </p>
          </div>
          <div className={styles.productsGrid}>
            <div className={styles.productCard}>
              <div className={styles.productBadge}>Most Popular</div>
              <div className={styles.productIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#0b63e5" stroke="#0b63e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" fill="#60a5fa" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.productTitle}>Data Warehouse Builder</h3>
              <p className={styles.productDescription}>
                Build and manage your data warehouse with a visual, no-code approach. 
                Connect to any source, transform data on the fly, and load into your target warehouse.
              </p>
              <div className={styles.productHighlight}>
                <span className={styles.highlightText}>Visual Modeling</span>
                <span className={styles.highlightText}>No-Code ETL</span>
                <span className={styles.highlightText}>Real-Time Sync</span>
              </div>
              <button className={styles.productButton}>Learn More →</button>
            </div>

            <div className={styles.productCard}>
              <div className={styles.productIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="#0b63e5" stroke="#0b63e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.productTitle}>API Designer</h3>
              <p className={styles.productDescription}>
                Create RESTful APIs from your data sources without coding. Design endpoints, 
                define transformations, and deploy APIs in minutes.
              </p>
              <div className={styles.productHighlight}>
                <span className={styles.highlightText}>No-Code API</span>
                <span className={styles.highlightText}>Auto Docs</span>
                <span className={styles.highlightText}>Secure</span>
              </div>
              <button className={styles.productButton}>Learn More →</button>
            </div>

            <div className={styles.productCard}>
              <div className={styles.productBadge}>AI-Powered</div>
              <div className={styles.productIcon}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10" cy="10" r="7" fill="#0b63e5" opacity="0.1"/>
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.productTitle}>Unstructured Data Extraction</h3>
              <p className={styles.productDescription}>
                Extract structured data from PDFs, emails, invoices, and other unstructured formats 
                using AI-powered recognition and validation.
              </p>
              <div className={styles.productHighlight}>
                <span className={styles.highlightText}>AI Parsing</span>
                <span className={styles.highlightText}>Multi-Format</span>
                <span className={styles.highlightText}>Batch Process</span>
              </div>
              <button className={styles.productButton}>Learn More →</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why Choose Our Products?</h2>
            <p className={styles.sectionDescription}>
              Built for modern data teams who need powerful, flexible, and easy-to-use tools
            </p>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" fill="#0b63e5" stroke="#0b63e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>No-Code Interface</h3>
              <p className={styles.featureText}>
                Build complex data pipelines without writing a single line of code. 
                Drag-and-drop interface makes it accessible to everyone.
              </p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="#0b63e5" stroke="#0b63e5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Lightning Fast</h3>
              <p className={styles.featureText}>
                Process millions of records in seconds. Optimized for performance 
                and scalability to handle your growing data needs.
              </p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#0b63e5" opacity="0.1"/>
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Enterprise Security</h3>
              <p className={styles.featureText}>
                SOC 2, GDPR, and HIPAA compliant. End-to-end encryption and 
                enterprise-grade security built into every product.
              </p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12H16M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" fill="#0b63e5" opacity="0.1"/>
                </svg>
              </div>
              <h3 className={styles.featureTitle}>Universal Connectivity</h3>
              <p className={styles.featureText}>
                Connect to any data source - databases, APIs, cloud storage, 
                files, and more. Pre-built connectors for popular platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaDescription}>
              Start your free trial today and experience the power of AI-driven data management
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>Start Free Trial</button>
              <button className={styles.secondaryButton}>Schedule Demo</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>
              <img 
                src="https://www.astera.com/wp-content/uploads/2024/09/Astera-logo.svg" 
                alt="Astera Logo" 
                className={styles.footerLogoImage}
              />
            </div>
            <p className={styles.footerTagline}>AI-Powered Data Platform</p>
            <p className={styles.footerCopyright}>© 2024 Astera. All rights reserved.</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerTitle}>Product</h4>
              <a href="#" className={styles.footerLink}>Features</a>
              <a href="#" className={styles.footerLink}>Pricing</a>
              <a href="#" className={styles.footerLink}>API</a>
              <a href="#" className={styles.footerLink}>Documentation</a>
            </div>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerTitle}>Company</h4>
              <a href="#" className={styles.footerLink}>About</a>
              <a href="#" className={styles.footerLink}>Blog</a>
              <a href="#" className={styles.footerLink}>Careers</a>
              <a href="#" className={styles.footerLink}>Contact</a>
            </div>
            <div className={styles.footerColumn}>
              <h4 className={styles.footerTitle}>Resources</h4>
              <a href="#" className={styles.footerLink}>Help Center</a>
              <a href="#" className={styles.footerLink}>Community</a>
              <a href="#" className={styles.footerLink}>Privacy</a>
              <a href="#" className={styles.footerLink}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

