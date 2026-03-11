import './LegalScreen.css';

const tocItems = [
  { id: 'who-we-are', label: 'Who We Are And How To Contact Us' },
  { id: 'acceptance', label: 'Acceptance of Terms and Notification of Changes' },
  { id: 'collection', label: 'Collection of Information' },
  { id: 'refund', label: 'Refund & Cancellation Policy' },
  { id: 'return', label: 'Return Policy' },
  { id: 'linked-websites', label: 'Linked Websites' },
  { id: 'sale-of-assets', label: 'Sale of Assets' },
  { id: 'security', label: 'Security' },
];

export default function TermsAndConditionsScreen() {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="legal-hero-inner">
          <span className="legal-hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14,2 14,8 20,8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10,9 9,9 8,9" />
            </svg>
            Legal
          </span>
          <h1>Terms and Conditions</h1>
          <p className="legal-hero-subtitle">Please read these terms and conditions carefully before using the Astera website and services.</p>
        </div>
      </section>

      <div className="legal-content-wrap">
        <div className="legal-toc">
          <div className="legal-toc-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h12" />
            </svg>
            Table of Contents
          </div>
          <ol>
            {tocItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ol>
        </div>

        <div className="legal-section" id="who-we-are">
          <h2>1. Who We Are And How To Contact Us</h2>
          <p>
            Astera Software (&quot;Astera&quot;) is committed to protecting your privacy. Visitors may access the Astera website while remaining anonymous and without revealing any personal information (except as referred to below under &quot;Cookies&quot;). In order to provide relevant, desired information concerning products or services, Astera may occasionally request personal information from you.
          </p>
          <p>
            As an Astera website user or registrant, you are always entitled to update your personal information or ask questions about these Terms by contacting us at <a href="mailto:sales@astera.com">sales@astera.com</a>, or:
          </p>
          <p>Astera Software, 143 Triunfo Canyon Rd., Ste. 203, Westlake Village, CA 91361</p>
          <p>
            Because Astera respects your privacy, we will not sell, rent or otherwise disclose this information to any third party, except as described in this Privacy Policy. However, personal information may be disclosed under the limited circumstances described below. By submitting your personal information, you agree that Astera may do so.
          </p>
          <p>
            Astera commits to being GDPR compliant and our updated privacy policy accounts for the new EU data laws. Through this policy, we aim to provide you more transparency, access and control over your data and better understanding of how and where it is used.
          </p>
        </div>

        <div className="legal-section" id="acceptance">
          <h2>2. Acceptance of Terms and Notification of Changes</h2>
          <p>
            By using <a href="https://www.astera.com">www.astera.com</a>, you consent to our use of your data as stated in these Terms. Astera may revise these Terms from time to time and reserves the right to do so.
          </p>
          <p>
            If Astera decides to make material changes to these Terms, the company will post the new terms on our website and will notify our registered users via email. If at any point Astera decides to use personally identifiable information in a manner different from that stated at the time it was collected, Astera will notify users by way of an email to obtain their consent as a condition of doing so. You will still have the opportunity to elect not to have Astera use your information in this different manner. Astera will not use your information other than in accordance with the Terms under which it was collected.
          </p>
        </div>

        <div className="legal-section" id="collection">
          <h2>3. Collection of Information</h2>

          <h3>3.1 Personal Information</h3>
          <p>
            Astera collects varying amounts of personal information to encourage you to participate in certain resources and services on our website. When submitting forms for demos, free trials, whitepapers and pricing, you provide us with contact information (name, email address, phone number) and extended profile information (company, company size, job title).
          </p>

          <h3>3.2 Cookies</h3>
          <p>
            When you visit our website, Astera may place a &quot;cookie&quot; on your hard drive in order to recognize you and improve your experience by optimizing the information presented based on your demonstrated areas of interest. Cookies may also be used to compile information about website usage.
          </p>
          <p>
            You can disable the cookies by adjusting the settings on your web browser. However, please note that this might affect the performance of the website as some cookies are essential for certain features to work.
          </p>

          <h3>3.3 Automatic Data Collection</h3>
          <p>
            Astera may collect information during your visit to our website through automatic data collection tools, which may include Web beacons, embedded Web links, and other commonly used information-gathering tools. These tools collect certain standard information that your browser sends to our website such as your browser type and language, access times, and the address of the website from which you arrived at our website.
          </p>
        </div>

        <div className="legal-section" id="refund">
          <h2>4. Refund &amp; Cancellation Policy</h2>
          <p>
            You can cancel your subscription at any time through your account settings, unless otherwise stated in your contract. Please note that refunds are not provided unless specified in your contract.
          </p>
          <p>
            If you experience any issues with our service, please contact our support team within 7 days, and we will review your case on an individual basis.
          </p>
        </div>

        <div className="legal-section" id="return">
          <h2>5. Return Policy</h2>
          <p>
            As our products are digital, we do not accept returns unless specified in your contract. If you have any concerns, please reach out to our customer service team for assistance.
          </p>
        </div>

        <div className="legal-section" id="linked-websites">
          <h2>6. Linked Websites</h2>
          <p>
            This website contains links to other websites. Please be aware that Astera is not responsible for the privacy practices of other websites. Astera encourages users to be aware when they leave our website and to read the privacy statements of each website they visit that collects personal information. While Astera carefully chooses the websites we link to, these Terms apply solely to information collected on Astera&apos;s own website.
          </p>
        </div>

        <div className="legal-section" id="sale-of-assets">
          <h2>7. Sale of Assets</h2>
          <p>
            In the event of an acquisition, merger, sale or change in control, Astera reserves the right to transfer its database, including personal information contained therein. Any third party who acquires all or substantially all of the assets or stock of Astera will have the right to use your data but will still be governed by these terms.
          </p>
        </div>

        <div className="legal-section" id="security">
          <h2>8. Security</h2>
          <p>
            Astera employs industry-standard security procedures and processes to safeguard the confidentiality of users&apos; personal information. Astera, or agents and partners on behalf of Astera, do everything within our reasonable control to protect your information. Where one of Astera&apos;s partners or agents has access to or maintains sensitive personal information, the company enters into confidentiality agreements in order to ensure the privacy of such user information.
          </p>
          <p>
            Internally, access to all users&apos; and registrants&apos; personally identifiable information is restricted to a need-to-know basis. Furthermore, Astera employees who deal with user information are kept up to date on various security and privacy practice issues as they arise.
          </p>
          <p>
            The servers for the website are stored in a physically secured, offsite facility. Beyond the physical security of your information, Astera also backs up servers regularly to prevent loss of data. While the goal is to safeguard users&apos; and members&apos; personal information, Astera cannot ensure or warrant the security of any transmission and your information is submitted at your own risk.
          </p>
        </div>

        <div className="legal-last-updated">
          Last updated: November 25, 2025
        </div>
      </div>
    </div>
  );
}
