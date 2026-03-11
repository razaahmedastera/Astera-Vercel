import './LegalScreen.css';

const tocItems = [
  { id: 'who-we-are', label: 'Who We Are And How To Contact Us' },
  { id: 'acceptance', label: 'Acceptance of Privacy Policy and Notification of Changes' },
  { id: 'collection', label: 'Collection of Information' },
  { id: 'where-we-use', label: 'Where We Use Your Information' },
  { id: 'how-we-use', label: 'How Astera Uses Personal Information' },
  { id: 'what-shared', label: 'What Information is Shared' },
  { id: 'linked-websites', label: 'Linked Websites' },
  { id: 'sale-of-assets', label: 'Sale of Assets' },
  { id: 'security', label: 'Security' },
];

export default function PrivacyPolicyScreen() {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="legal-hero-inner">
          <span className="legal-hero-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Legal
          </span>
          <h1>Privacy Policy</h1>
          <p className="legal-hero-subtitle">Your privacy is important to us. This policy describes how Astera Software collects, uses, and protects your personal information.</p>
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
            As an Astera website user or registrant, you are always entitled to update your personal information or ask questions about this Privacy Policy by contacting us at <a href="mailto:sales@astera.com">sales@astera.com</a>, or:
          </p>
          <p>Astera Software, 143 Triunfo Canyon Rd., Ste. 203, Westlake Village, CA 91361</p>
          <p>
            Because Astera respects your privacy, we will not sell, rent, or otherwise disclose this information to any third party except as described in this Privacy Policy. However, personal information may be disclosed under the limited circumstances described below. By submitting your personal information, you agree that Astera may do so.
          </p>
          <p>
            Astera commits to being GDPR compliant, and our updated privacy policy accounts for the new EU data laws. Through this policy, we aim to provide you with more transparency, access, and control over your data and a better understanding of how and where it is used.
          </p>
        </div>

        <div className="legal-section" id="acceptance">
          <h2>2. Acceptance of Privacy Policy and Notification of Changes</h2>
          <p>
            By using <a href="https://www.astera.com">www.astera.com</a>, you consent to our use of your data as stated here in this Privacy Policy. Astera may revise this Privacy Policy from time to time and reserves the right to do so.
          </p>
          <p>
            If Astera decides to make material changes to this Privacy Policy, the company will post the new policy on our website and will notify our registered users via email. If, at any point, Astera decides to use personally identifiable information in a manner different from that stated at the time it was collected, Astera will notify users by way of an email to obtain their consent as a condition of doing so. You will still have the opportunity to elect not to have Astera use your information in this different manner. Astera will not use your information other than in accordance with the Privacy Policy under which it was collected.
          </p>
        </div>

        <div className="legal-section" id="collection">
          <h2>3. Collection of Information</h2>

          <h3>3.1 Personal Information</h3>
          <p>
            Astera collects varying amounts of personal information to encourage you to participate in certain resources and services on our website. They are listed below.
          </p>

          <h4>3.1.1 Forms for demos, free trials, whitepapers and pricing</h4>
          <p>When submitting these forms, you provide us the following details:</p>
          <p>
            <strong>Contact Information:</strong> This includes your name, email address and your phone number. We use this for communication purposes.
          </p>
          <p>
            <strong>Extended profile:</strong> This includes your company, company size and job title. This helps us understand your business and your needs and allows us to provide you more tailored services.
          </p>
          <p>
            <strong>Registering via social accounts:</strong> Currently, we offer sign-ins from Facebook and Twitter accounts. We only collect the information required in our form, from your public profile.
          </p>

          <h4>3.1.2 Information About Children</h4>
          <p>
            The Astera website is not intended for or targeted at children under the age of 16 and does not collect information of children under the age of 16. If you believe that we may have done so, please send us an email at <a href="mailto:sales@astera.com">sales@astera.com</a> so we may delete it.
          </p>

          <h4>3.1.3 Additional Information</h4>
          <p>
            We use LinkedIn Insight tags and Twitter tags to improve the relevance of our ads and measure our conversions. Astera may also collect information during your visit to our website through our automatic data collection tools, which may include Web beacons, embedded Web links, and other commonly used information-gathering tools. These tools collect certain standard information that your browser sends to our website such as your browser type and language, access times, and the address of the website from which you arrived at our website.
          </p>
          <p>
            They may also collect information about your Internet Protocol (IP) address, clickstream behavior (i.e. the pages you view, the links you click, and other actions you take in connection with the Astera website) and product information. Astera may also use some of these automatic data collection tools in connection with certain emails sent from Astera and therefore may collect information using these tools when you open the email or click on a link contained in the email.
          </p>

          <h3>3.2 Cookies</h3>

          <h4>3.2.1 What Are Cookies?</h4>
          <p>
            A &quot;cookie&quot; is a small piece of data stored on a user&apos;s browser and contains non-personally identifiable information about the user.
          </p>

          <h4>3.2.2 How We Use Cookies</h4>
          <p>
            When you visit our website, Astera may place a &quot;cookie&quot; on your hard drive in order to recognize you and improve your experience by optimizing the information presented based on your demonstrated areas of interest. Cookies may also be used to compile information about website usage. This information can be used to enhance the content of the website and make your experience more informative.
          </p>
          <p>
            If you subsequently provide us with personal information such as your email address, we will associate any cookies on your browser with that information such that you will no longer be an anonymous visitor to the site.
          </p>
          <p>
            If you&apos;ve set your browser to reject cookies, you can still use this website, but you may need to re-enter information that would normally be obtained from the cookie (for example, your email address). You can also set your browser to warn you before accepting cookies. If you do, you will receive a warning message each time the website attempts to place a cookie on your hard drive.
          </p>

          <h4>3.2.3 Disabling Cookies</h4>
          <p>
            You can disable the cookies by adjusting the settings on your web browser (<a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a>, <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Firefox</a>, <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a>, and <a href="https://support.microsoft.com/en-us/windows/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">Microsoft Edge</a>). However, please note that this might affect the performance of the website as some cookies are essential for certain features to work.
          </p>

          <h4>3.2.4 Third Party Cookies</h4>
          <p>
            Astera also sets third-party cookies from trusted parties to provide functionality. These are used to measure and analyze the performance of our web pages and page visits. We also use them to support our live chat with our support teams.
          </p>
          <p>
            The social media plugins/buttons on our website allow you to connect with us via your social accounts. These plugins set their own cookies as outlined in their privacy policies.
          </p>
          <p>
            Information about your use of our website is shared with trusted social media, advertising, and analytics partners in order to customize content and advertising, to provide social media features, and to analyze traffic to our website.
          </p>

          <h3>3.3 Social Sharing Features</h3>
          <p>
            Astera offers social sharing features and other integrated tools, such as the Facebook &quot;Like&quot; button. The use of such features enables the sharing of information with your friends or the public, depending on the settings you establish with the entity that provides the social sharing feature. For more information about the purpose and scope of data collection and processing in connection with social sharing features, please visit the privacy policies of the entities that provide these features.
          </p>
        </div>

        <div className="legal-section" id="where-we-use">
          <h2>4. Where We Use Your Information</h2>
          <p>
            We use your information to communicate with you, to improve your experience with us, to promote our products and services in accordance with your preferences and needs. We also use your information for marketing, analytics and legal needs.
          </p>

          <h3>4.1 Third Parties We Share Information With</h3>

          <h4>4.1.1 Customer Support and Analytics</h4>
          <p>
            We use Zendesk in order to provide integrated personal support to you and address your concerns as soon as possible. We also use Google to monitor and analyze our performance and conversions.
          </p>

          <h4>4.1.2 Marketing and Communication</h4>
          <p>
            We use Hubspot and Microsoft Dynamics to create and manage email campaigns. We use your name, email and industry information to send relevant information and guides to you and to better understand what you need.
          </p>
          <p>
            We use Live Chat to connect with the visitors on our website in real-time and address their queries without delay. We use the data you provide to drive insights that can be used to further improve your customer experience.
          </p>

          <h4>4.1.3 Technology Features</h4>
          <p>
            In order to offer features in our products that make it convenient for our customers to use our products in their specific use cases, we partner with technology providers. To obtain verification of the successful implementation of our products and company, our technology partners require customer data of a maximum of 2 legitimate customers, which we only provide after obtaining consent from the said customers. No other customer data is shared with our technology partners.
          </p>
          <p>We share customer references with these technology partners:</p>
          <ul>
            <li>Oracle, IBM, Salesforce, Microsoft, Netezza, Teradata, Tableau and Microsoft PowerBI.</li>
          </ul>
        </div>

        <div className="legal-section" id="how-we-use">
          <h2>5. How Astera Uses Personal Information</h2>
          <p>
            Astera uses your personal information to better meet your unique needs, to respond to specific requests for information, to send promotional materials, and to make you aware of new or similar products or offerings in which you might be interested.
          </p>
          <p>
            Astera reserves the right to call or send registrants email communications from time to time regarding product and company updates, technical or administrative issues, legal notices, promotional offers, or other important information about our website and products and services that we consider valuable or essential to your continued ability to use those products and services properly. Astera does not intentionally send unsolicited emails to anyone who has requested that Astera not contact them.
          </p>

          <h3>5.1 Promotional Communications</h3>
          <p>
            You may opt out of receiving promotional communications from Astera by following the instructions provided in those communications or by sending an email to <a href="mailto:unsubscribe@astera.com">unsubscribe@astera.com</a>. Please note that if you opt out of receiving promotional communications, we may still send you transactional or relationship messages about your account or our ongoing business relations.
          </p>
        </div>

        <div className="legal-section" id="what-shared">
          <h2>6. What Information is Shared</h2>
          <p>
            Astera does share general information from which individuals cannot be identified with third parties for business purposes, such as consultants and advisors to the company. Astera will not disclose personal information to any third parties without your consent except in the following very limited circumstances.
          </p>

          <h3>6.1 Partners and Agents</h3>
          <p>
            Astera shares information with trusted agents who provide specific services you have requested and/or administer information offered on the Astera website, for example, service providers who help manage, track and respond to customer inquiries, information requests, etc. Astera may also share information with authorized resellers and integration partners, who may be better suited to reply directly in response to your specific inquiries about Astera products and services. Any company with which Astera shares personally identifiable information will have executed a confidentiality agreement, requiring that they keep all data received confidential.
          </p>

          <h3>6.2 Third Party Vendors</h3>
          <p>
            We occasionally hire other companies to provide limited services on our behalf such as processing registrations or sending emails. We will only provide those companies the information they need to deliver the service, and they are prohibited from using that information for any other purpose.
          </p>

          <h3>6.3 Analytics Services Provided by Others</h3>
          <p>
            We may allow others to provide analytics services on our behalf. These entities may use cookies, web beacons, and other technologies to collect information about your use of our services, including your IP address, web browser, pages viewed, time spent on pages, and links clicked. This information may be used by Astera to analyze and track data, determine the popularity of certain content, and better understand your online activity.
          </p>

          <h3>6.4 Legal Requirements and Investigations</h3>
          <p>
            Astera will disclose your personal information to a third party if required to do so by law or if, in good faith, Astera believes that such action is necessary to:
          </p>
          <ul>
            <li>Protect the personal safety or property of personnel, users, or the public.</li>
            <li>Protect the company against abuse, misuse, or unauthorized use of Astera&apos;s products or services.</li>
            <li>Protect and defend the company&apos;s rights and property or prevent fraud.</li>
            <li>Comply with the law or with legal process.</li>
          </ul>
          <p>
            If you provide false or deceptive registration information or attempt to pose as someone else, information about you including your computer&apos;s IP address may be disclosed to a third party (including the recipient of an email) as part of any type of investigation into your actions.
          </p>
        </div>

        <div className="legal-section" id="linked-websites">
          <h2>7. Linked Websites</h2>
          <p>
            This website contains links to other websites. Please be aware that Astera is not responsible for the privacy practices of other websites. Astera encourages users to be aware when they leave our website and to read the privacy statements of each website they visit that collects personal information. While Astera carefully chooses the websites we link to, this Privacy Policy applies solely to information collected on Astera&apos;s own website.
          </p>
        </div>

        <div className="legal-section" id="sale-of-assets">
          <h2>8. Sale of Assets</h2>
          <p>
            In the event of an acquisition, merger, sale or change in control, Astera reserves the right to transfer its database, including personal information contained therein. Any third party who acquires all or substantially all of the assets or stock of Astera will have the right to use your data but will still be governed by this privacy policy.
          </p>
        </div>

        <div className="legal-section" id="security">
          <h2>9. Security</h2>
          <p>
            Astera employs industry-standard security procedures and processes to safeguard the confidentiality of users&apos; personal information. Astera, or agents and partners on behalf of Astera, do everything within our reasonable control to protect your information. Where one of Astera&apos;s partners or agents has access to or maintains sensitive personal information, the company enters into confidentiality agreements in order to ensure the privacy of such user information. Internally, access to all users&apos; and registrants&apos; personally identifiable information is restricted to a need-to-know basis.
          </p>
          <p>
            Furthermore, Astera employees who deal with user information are kept up to date on various security and privacy practice issues as they arise.
          </p>
          <p>
            Finally, the servers for the website are stored in a physically secured, offsite facility. Beyond the physical security of your information, Astera also backs up servers regularly to prevent loss of data. While the goal is to safeguard users&apos; and members&apos; personal information, Astera cannot ensure or warrant the security of any transmission and your information is submitted at your own risk.
          </p>
        </div>

        <div className="legal-last-updated">
          Last updated: April 8, 2025
        </div>
      </div>
    </div>
  );
}
