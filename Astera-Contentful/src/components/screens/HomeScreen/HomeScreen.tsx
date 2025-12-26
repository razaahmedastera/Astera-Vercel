import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styles from './HomeScreen.module.css';
import type { HomePageContent } from '@/types/contentful';

interface HomeScreenProps {
  content: HomePageContent;
}

export function HomeScreen({ content }: HomeScreenProps) {
  return (
    <>
      {/* Hero Section - Dynamic from Contentful */}
      <section className={styles.heroSection} id="home">
        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className={styles.badgeIcon}>🤖</span>
              AI-Powered Data Platform
            </div>
            <h1 className={styles.heroTitle}>
              {documentToReactComponents(content.heroSectionHeading)}
            </h1>
            <p className={styles.heroDescription}>
              {content.heroSectionParagraph}
            </p>
            <div className={styles.heroActions}>
              <button className={styles.primaryCTA}>Start Free Trial</button>
              <button className={styles.secondaryCTA}>Watch Demo</button>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.softwareScreenshot}>
              <div className={styles.screenshotHeader}>
                <div className={styles.windowControls}>
                  <span className={styles.controlDot} style={{ background: '#ef4444' }}></span>
                  <span className={styles.controlDot} style={{ background: '#f59e0b' }}></span>
                  <span className={styles.controlDot} style={{ background: '#10b981' }}></span>
                </div>
                <div className={styles.windowTitle}>Astera AI Data Filter</div>
              </div>
              <div className={styles.screenshotContent}>
                <div className={styles.filterPanel}>
                  <div className={styles.panelHeader}>
                    <span className={styles.aiBadge}>🤖 AI Filtering Active</span>
                  </div>
                  <div className={styles.dataTable}>
                    <div className={styles.tableHeader}>
                      <div className={styles.tableCell}>Source</div>
                      <div className={styles.tableCell}>Records</div>
                      <div className={styles.tableCell}>Status</div>
                      <div className={styles.tableCell}>Filtered</div>
                    </div>
                    <div className={styles.tableRow}>
                      <div className={styles.tableCell}>Database 1</div>
                      <div className={styles.tableCell}>1,250,000</div>
                      <div className={styles.tableCell}>
                        <span className={styles.statusBadge} style={{ background: '#dbeafe', color: '#1e40af' }}>Processing</span>
                      </div>
                      <div className={styles.tableCell}>875,000</div>
                    </div>
                    <div className={styles.tableRow}>
                      <div className={styles.tableCell}>API Source</div>
                      <div className={styles.tableCell}>850,000</div>
                      <div className={styles.tableCell}>
                        <span className={styles.statusBadge} style={{ background: '#d1fae5', color: '#065f46' }}>Complete</span>
                      </div>
                      <div className={styles.tableCell}>680,000</div>
                    </div>
                    <div className={styles.tableRow}>
                      <div className={styles.tableCell}>CSV File</div>
                      <div className={styles.tableCell}>2,100,000</div>
                      <div className={styles.tableCell}>
                        <span className={styles.statusBadge} style={{ background: '#dbeafe', color: '#1e40af' }}>Processing</span>
                      </div>
                      <div className={styles.tableCell}>1,470,000</div>
                    </div>
                  </div>
                  <div className={styles.filterStats}>
                    <div className={styles.statBox}>
                      <div className={styles.statLabel}>Total Records</div>
                      <div className={styles.statValue}>4.2M</div>
                    </div>
                    <div className={styles.statBox}>
                      <div className={styles.statLabel}>AI Filtered</div>
                      <div className={styles.statValue}>3.0M</div>
                    </div>
                    <div className={styles.statBox}>
                      <div className={styles.statLabel}>Accuracy</div>
                      <div className={styles.statValue}>98.5%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection} id="features">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>AI-Powered Features</h2>
            <p className={styles.sectionDescription}>
              Intelligent data processing capabilities that transform your big data into actionable insights
            </p>
          </div>
          <div className={styles.grid}>
            <div className={styles.gridCard}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Smart Data Filtering</h3>
              <p className={styles.cardText}>
                AI algorithms automatically identify and filter relevant data from massive datasets, 
                reducing noise and improving data quality by 95%.
              </p>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Real-Time Processing</h3>
              <p className={styles.cardText}>
                Process streaming data in real-time with AI-powered insights. Make decisions faster 
                with automated pattern recognition and anomaly detection.
              </p>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Pattern Recognition</h3>
              <p className={styles.cardText}>
                Machine learning models identify patterns, trends, and correlations in your data 
                that would take humans weeks to discover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How It Works</h2>
            <p className={styles.sectionDescription}>
              Three simple steps to transform your raw data into actionable insights
            </p>
          </div>
          <div className={styles.stepsWrapper}>
            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Connect Data Sources</h3>
                <p className={styles.stepText}>
                  Connect to any data source - databases, APIs, files, or cloud storage. 
                  Our AI automatically detects data structure and format.
                </p>
              </div>
            </div>
            <div className={styles.stepConnector}></div>
            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>AI Processing & Filtering</h3>
                <p className={styles.stepText}>
                  Our AI engine analyzes, filters, and cleans your data automatically. 
                  Machine learning models identify patterns and remove noise.
                </p>
              </div>
            </div>
            <div className={styles.stepConnector}></div>
            <div className={styles.stepItem}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>Get Clean Data</h3>
                <p className={styles.stepText}>
                  Receive filtered, validated, and enriched data ready for analysis. 
                  Export to your preferred tools or use our built-in analytics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className={styles.useCasesSection} id="use-cases">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Browse Our Use Cases</h2>
            <p className={styles.sectionDescription}>
              Discover how organizations leverage AI-powered data filtering to solve real-world challenges
            </p>
          </div>
          <div className={styles.grid}>
            <div className={styles.gridCard}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>E-Commerce Data Integration</h3>
              <p className={styles.cardText}>
                Filter and process millions of product listings, customer reviews, and transaction data 
                from multiple e-commerce platforms. Automatically identify duplicates, validate product 
                information, and maintain data consistency across channels.
              </p>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Financial Data Processing</h3>
              <p className={styles.cardText}>
                Process and filter financial transactions, market data, and regulatory reports with 
                AI-powered validation. Ensure compliance, detect anomalies, and maintain data accuracy 
                for critical financial operations and reporting.
              </p>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Healthcare Data Management</h3>
              <p className={styles.cardText}>
                Filter patient records, medical claims, and clinical data while maintaining HIPAA 
                compliance. AI algorithms automatically identify and remove sensitive information, 
                ensuring data privacy and regulatory adherence.
              </p>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Supply Chain Optimization</h3>
              <p className={styles.cardText}>
                Process and filter supply chain data from multiple vendors, logistics providers, and 
                inventory systems. AI identifies bottlenecks, validates shipment data, and ensures 
                accurate inventory tracking across the entire supply chain.
              </p>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Customer Data Unification</h3>
              <p className={styles.cardText}>
                Consolidate customer data from CRM systems, marketing platforms, and support tools. 
                AI filters duplicate records, merges profiles, and creates a unified customer view 
                for better personalization and service delivery.
              </p>
            </div>
            <div className={styles.gridCard}>
              <div className={styles.cardIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>IoT Data Processing</h3>
              <p className={styles.cardText}>
                Filter and process massive streams of IoT sensor data in real-time. AI algorithms 
                identify relevant events, filter noise, and extract actionable insights from 
                millions of data points generated by connected devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Transform Your Data with AI?</h2>
            <p className={styles.ctaDescription}>
              Join thousands of companies using AI to filter and process their big data faster and more accurately.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.primaryButton}>Start Free Trial</button>
              <button className={styles.secondaryButton}>Schedule Demo</button>
            </div>
            <p className={styles.ctaNote}>No credit card required • 14-day free trial</p>
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

