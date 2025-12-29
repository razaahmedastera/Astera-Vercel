import React from 'react';
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
            <h2 className={styles.sectionTitle}>{content.featuresSectionTitle}</h2>
            <p className={styles.sectionDescription}>
              {content.featuresSectionDescription}
            </p>
          </div>
          <div className={styles.grid}>
            {content.features.map((feature, index) => {
              // Icon mapping based on index or title
              const icons = [
                <svg key="icon1" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                <svg key="icon2" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 10V3L4 14H11V21L20 10H13Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                <svg key="icon3" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ];
              
              return (
                <div key={feature.title} className={styles.gridCard}>
                  <div className={styles.cardIcon}>
                    {icons[index % icons.length]}
                  </div>
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                  <p className={styles.cardText}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={styles.howItWorksSection}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.stepsSectionTitle}</h2>
            <p className={styles.sectionDescription}>
              {content.stepsSectionDescription}
            </p>
          </div>
          <div className={styles.stepsWrapper}>
            {content.steps.map((step, index) => (
              <React.Fragment key={step.stepNumber}>
                <div className={styles.stepItem}>
                  <div className={styles.stepNumber}>{step.stepNumber}</div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepText}>
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < content.steps.length - 1 && (
                  <div className={styles.stepConnector}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className={styles.useCasesSection} id="use-cases">
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.useCasesSectionTitle}</h2>
            <p className={styles.sectionDescription}>
              {content.useCasesSectionDescription}
            </p>
          </div>
          <div className={styles.grid}>
            {content.useCases.map((useCase, index) => {
              // Icon mapping for use cases
              const useCaseIcons = [
                <svg key="uc1" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                <svg key="uc2" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                <svg key="uc3" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                <svg key="uc4" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12H15V22" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                <svg key="uc5" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>,
                <svg key="uc6" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="#0b63e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ];
              
              return (
                <div key={useCase.title} className={styles.gridCard}>
                  <div className={styles.cardIcon}>
                    {useCaseIcons[index % useCaseIcons.length]}
                  </div>
                  <h3 className={styles.cardTitle}>{useCase.title}</h3>
                  <p className={styles.cardText}>
                    {useCase.description}
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
            <p className={styles.ctaNote}>{content.ctaSectionNote}</p>
          </div>
        </div>
      </section>
    </>
  );
}

