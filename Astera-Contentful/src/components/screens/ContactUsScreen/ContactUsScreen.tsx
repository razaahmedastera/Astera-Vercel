'use client';

import ContactUsHubSpotForm from '@/components/ui/HubSpotForm/ContactUsHubSpotForm';
import './ContactUsScreen.css';

export function ContactUsScreen() {
  return (
    <div className="contact-us-page">
      {/* Hero Section with Split Design */}
      <section className="contact-us-hero">
        <div className="contact-us-hero-background">
          <div className="contact-us-hero-shape shape-1"></div>
          <div className="contact-us-hero-shape shape-2"></div>
          <div className="contact-us-hero-shape shape-3"></div>
        </div>
        <div className="section-container">
          <div className="contact-us-hero-wrapper">
            {/* Left Content Section */}
            <div className="contact-us-hero-content">
              <div className="contact-us-badge">
                <span className="contact-us-badge-dot"></span>
                <span>Get in Touch</span>
              </div>
              <h1 className="contact-us-title">
                We&apos;re here for <span className="contact-us-title-highlight">you!</span>
              </h1>
              <p className="contact-us-description">
                We are here to answer any queries you may have about our products. Please complete this form and we will respond to you as soon as we can.
              </p>
              <div className="contact-us-features">
                <div className="contact-us-feature-item">
                  <div className="contact-us-feature-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <span>Quick Response</span>
                </div>
                <div className="contact-us-feature-item">
                  <div className="contact-us-feature-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <span>Expert Support</span>
                </div>
                <div className="contact-us-feature-item">
                  <div className="contact-us-feature-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                  </div>
                  <span>24/7 Available</span>
                </div>
              </div>
            </div>

            {/* Right Form Section */}
            <div className="contact-us-form-section">
              <div className="contact-us-form-card">
                <div className="contact-us-form-header">
                  <h2 className="contact-us-form-title">Send us a message</h2>
                  <p className="contact-us-form-subtitle">Fill out the form below and we&apos;ll get back to you</p>
                </div>
                <ContactUsHubSpotForm
                  formId="57530c31-b16f-40c9-947f-baeac0891a2f"
                  containerId="hubspot-contact-us-form-container"
                  showLabels={true}
                  submitButtonAlign="right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information Cards Section */}
      <section className="contact-us-info">
        <div className="section-container">
          <div className="contact-us-info-header">
            <h2 className="contact-us-info-title">Other ways to reach us</h2>
            <p className="contact-us-info-intro">
              If you prefer to speak with a representative, give us a call between 8:30am and 5:30pm Pacific time
            </p>
          </div>
          
          <div className="contact-us-cards-grid">
            {/* Phone Card */}
            <div className="contact-us-card">
              <div className="contact-us-card-icon phone-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div className="contact-us-card-content">
                <h3 className="contact-us-card-title">Phone</h3>
                <p className="contact-us-card-text">Toll-Free Telephone: +1 888-77-ASTERA</p>
                <p className="contact-us-card-text">ASTERA Telephone: +1 805-579-0004</p>
              </div>
            </div>

            {/* Location Card */}
            <div className="contact-us-card">
              <div className="contact-us-card-icon location-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="contact-us-card-content">
                <h3 className="contact-us-card-title">Location</h3>
                <p className="contact-us-card-text">
                  You can also reach out to us at:<br />
                  2555 Townsgate Road, Suite 200<br />
                  Westlake Village, CA 91361
                </p>
              </div>
            </div>

            {/* Sales Email Card */}
            <div className="contact-us-card">
              <div className="contact-us-card-icon email-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="contact-us-card-content">
                <h3 className="contact-us-card-title">Sales</h3>
                <p className="contact-us-card-text">
                  For booking a demo, email at<br />
                  <a href="mailto:sales@astera.com" className="contact-us-card-link">sales@astera.com</a>
                </p>
              </div>
            </div>

            {/* Careers Email Card */}
            <div className="contact-us-card">
              <div className="contact-us-card-icon careers-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div className="contact-us-card-content">
                <h3 className="contact-us-card-title">Careers</h3>
                <p className="contact-us-card-text">
                  For queries related to career opportunities, email us at<br />
                  <a href="mailto:employment@astera.com" className="contact-us-card-link">employment@astera.com</a>
                </p>
              </div>
            </div>

            {/* Support Email Card */}
            <div className="contact-us-card">
              <div className="contact-us-card-icon support-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
              </div>
              <div className="contact-us-card-content">
                <h3 className="contact-us-card-title">Support</h3>
                <p className="contact-us-card-text">
                  For all other queries, email us at<br />
                  <a href="mailto:support@astera.com" className="contact-us-card-link">support@astera.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
