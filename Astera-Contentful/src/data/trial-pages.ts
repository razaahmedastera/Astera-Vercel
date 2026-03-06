import type { TrialDemoPage } from '@/types/contentful';

/**
 * @deprecated — This file is kept as a reference. Pages now fetch from Contentful.
 * Run `node scripts/migrate-trial-demo-pages.mjs` to seed the content type.
 */

const sharedTrustLogos: TrialDemoPage['trustLogos'] = [
  { src: 'https://www.astera.com/wp-content/uploads/2024/07/volvo.svg', alt: 'Volvo' },
  { src: 'https://www.astera.com/wp-content/uploads/2024/07/nissan.svg', alt: 'Nissan' },
  { src: 'https://www.astera.com/wp-content/uploads/2024/07/dex-logo.svg', alt: 'DEX' },
  { src: 'https://www.astera.com/wp-content/uploads/2024/07/paylocity.svg', alt: 'Paylocity' },
  { src: 'https://www.astera.com/wp-content/uploads/2024/07/cogent.svg', alt: 'CogentLight' },
];

const sharedTestimonials: TrialDemoPage['testimonials'] = [
  {
    quote: 'It is a good thing to have Astera, and while we bought it mainly for data migration, I see a lot more opportunities to use it. And that\'s, of course, a winning situation.',
    author: 'Patrick Van Vlierberghe',
    title: 'IT Manager, CRC Industries',
  },
  {
    quote: 'On top of the hours and weeks it has saved the data reporting team, it has actually increased our revenue by over $100,000 because of the higher accuracy of data sent to the state.',
    author: 'Amanda Moede',
    title: 'Health Plan Data Analyst, Chorus Community Health Plans',
  },
];

const trialFaqs: TrialDemoPage['faqs'] = [
  {
    question: 'How do I sign up for a free trial?',
    answer: 'You can register for a free 14-day trial on this page. Once registered, a sales representative will reach out to help you set up the tool and guide you through the next steps.',
  },
  {
    question: 'What happens after I register for the trial?',
    answer: 'After registering, a sales representative will contact you to discuss your requirements, help with the setup, and guide you through the trial process.',
  },
  {
    question: 'Can I test multiple Astera products during my trial?',
    answer: 'Yes, let our team know which products you\'re interested in, and they will guide you on the best approach to explore them.',
  },
  {
    question: 'How long does the trial last?',
    answer: 'The trial lasts for 14 days.',
  },
  {
    question: 'Is there any support available during the trial?',
    answer: 'Yes, our team will provide assistance throughout your trial to ensure you get the most out of our products.',
  },
  {
    question: 'Can I get a demo before starting the trial?',
    answer: 'Yes, we offer demos to help you understand how our tools work before you start your trial.',
  },
  {
    question: 'What if I need additional guidance during the trial?',
    answer: 'You can reach out to our team anytime for assistance or refer to our documentation for setup instructions, best practices, and troubleshooting guidance.',
  },
];

const demoFaqs: TrialDemoPage['faqs'] = [
  {
    question: 'How do I request a demo?',
    answer: 'Simply fill out the form on this page. A product specialist will reach out to schedule a personalized demo at your convenience.',
  },
  {
    question: 'What happens after I request a demo?',
    answer: 'A product specialist will contact you to understand your use case, walk you through the product, and answer any technical questions.',
  },
  {
    question: 'How long does the demo take?',
    answer: 'Demos typically last 30-45 minutes, but can be customized based on your requirements and the areas you want to explore.',
  },
  {
    question: 'Can I see a demo of multiple products?',
    answer: 'Yes, let our team know which products you\'re interested in and they will tailor the demo to cover all relevant solutions.',
  },
  {
    question: 'Is there any support available after the demo?',
    answer: 'Absolutely. Our team will follow up with additional resources, documentation, and next steps to help you evaluate the product.',
  },
  {
    question: 'Can I get a free trial after the demo?',
    answer: 'Yes, we offer free 14-day trials for our products. Your demo specialist can help you get started right after the demo.',
  },
];

const reportMinerResources: TrialDemoPage['resources'] = [
  {
    title: '90% faster Data Extraction with Astera AI Document Extraction',
    type: 'Video',
    url: 'https://www.youtube.com/watch?v=3gGqQ1z0Mzk',
    image: 'https://i.ytimg.com/vi/3gGqQ1z0Mzk/mqdefault.jpg',
  },
  {
    title: 'Data Extraction Success Stories with Astera',
    type: 'Video',
    url: 'https://www.youtube.com/watch?v=BAMiSyJ3HKc',
    image: 'https://i.ytimg.com/vi/BAMiSyJ3HKc/mqdefault.jpg',
  },
  {
    title: 'Learn to Automate Your Claims Processing with Astera',
    type: 'Video',
    url: 'https://www.youtube.com/watch?v=py4E8iljUW8',
    image: 'https://i.ytimg.com/vi/py4E8iljUW8/mqdefault.jpg',
  },
  {
    title: 'Using Field Verification in Astera ReportMiner',
    type: 'Video',
    url: 'https://www.youtube.com/watch?v=nNJ9r5DZ5bE',
    image: 'https://i.ytimg.com/vi/nNJ9r5DZ5bE/mqdefault.jpg',
  },
];

/**
 * All trial and demo landing pages.
 * Key = URL slug (the part after astera.com/ in the live URL).
 */
export const landingPages: Record<string, Omit<TrialDemoPage, 'id' | 'entryTitle'>> = {

  /* ────────────────────────── TRIAL PAGES ────────────────────────── */

  'astera-reportminer-trial': {
    pageType: 'trial',
    productName: 'Astera ReportMiner',
    eyebrow: 'Access Free Trial',
    heading: 'Astera ReportMiner',
    description: 'Request a free 14-day trial of our end-to-end data extraction solution. Extract, transform, and convert unstructured data into a format compatible with your systems.',
    hubspotFormId: '90d42bb3-def9-466e-9261-213d43ab22f1',
    trustHeading: 'Trusted by Global Industry Leaders',
    trustLogos: sharedTrustLogos,
    faqs: trialFaqs,
    testimonialHeading: 'Don\'t take our word for it.',
    testimonials: sharedTestimonials,
    resourcesBadge: 'Learning',
    resourcesHeading: 'Resources',
    resources: reportMinerResources,
  },

  'dataprep-trial-page': {
    pageType: 'trial',
    productName: 'Astera DataPrep',
    eyebrow: 'Get Instant Access',
    heading: 'Astera DataPrep',
    description: 'Get a free trial of Astera DataPrep — self-service data preparation for business users. Choose between a lightweight local install or cloud deployment with collaboration features.',
    hubspotFormId: '65d6052c-9d50-4f2c-b1e7-dadc1cd2efe5',
    onSubmitActions: [
      {
        type: 'redirect',
        triggerField: 'product_selection',
        triggerValue: 'DataPrep Cloud',
        url: 'https://cloudastera.com/',
      },
      {
        type: 'download',
        triggerField: 'product_selection',
        triggerValue: 'Dataprep Express',
        url: 'https://download.astera.com/Downloads/Builds/12/0/1/18/DataprepExpress.exe',
        downloadFilename: 'Astera-Dataprep-Express-Setup.exe',
      },
    ],
    trustHeading: 'Trusted by Global Industry Leaders',
    trustLogos: sharedTrustLogos,
    faqs: [
      {
        question: 'What packages are available other than the free trial?',
        answer: 'Astera DataPrep is available in Express, Standard, and Enterprise versions. For more details, check out the Pricing page.',
      },
      {
        question: 'How do I sign up for a free trial?',
        answer: 'Just sign up and you\'ll be redirected to our cloud portal where you can start using the product for free.',
      },
      {
        question: 'What happens after I register for the free trial?',
        answer: 'After you sign up, you\'ll be redirected to the product where you can start using it instantly.',
      },
      {
        question: 'Can I test multiple Astera products during my trial?',
        answer: 'If you\'re interested in our other products or Astera DataPrep Enterprise, you can connect with our sales team.',
      },
      {
        question: 'How long does the trial last?',
        answer: 'The trial lasts for 14 days. You get instant access to our core features, albeit with limited processing and querying.',
      },
      {
        question: 'Can I connect to a database during the trial?',
        answer: 'Yes, you can connect to cloud databases during the free trial.',
      },
      {
        question: 'Can I upgrade the package after the free trial finishes?',
        answer: 'Yes, you can seamlessly switch between packages.',
      },
      {
        question: 'What if I need additional guidance during the trial?',
        answer: 'You can reach out to our team anytime for assistance at trial@astera.com, or refer to our documentation for setup instructions, best practices, and troubleshooting guidance.',
      },
    ],
    testimonialHeading: 'Don\'t take our word for it.',
    testimonials: sharedTestimonials,
    resourcesBadge: 'Learning',
    resourcesHeading: 'Resources',
    resources: reportMinerResources,
  },

  /* ────────────────────────── DEMO PAGES ────────────────────────── */

  'astera-reportminer-demo': {
    pageType: 'demo',
    productName: 'Astera ReportMiner',
    eyebrow: 'Video Demo',
    heading: 'Discover Astera ReportMiner',
    description: 'Automate data extraction from a variety of unstructured sources — PDF forms, TXT, PRN, RTF, XLS, XLSX, and COBOL — with simple AI-powered report models.',
    hubspotFormId: '371dfffd-bcd4-4d76-86af-7bed242c5480',
    trustHeading: 'Trusted by Global Industry Leaders',
    trustLogos: sharedTrustLogos,
    faqs: demoFaqs,
    testimonialHeading: 'Don\'t take our word for it.',
    testimonials: [
      {
        quote: 'Excellent Tool! ReportMiner is a very helpful tool, which makes our jobs much easier. We definitely recommend it!',
        author: 'EDI Administrator',
        title: 'Telamon Corp.',
      },
      {
        quote: 'ReportMiner is a great product. It\'s extremely customizable to meet many different needs, and customer service has always been outstanding when I\'ve needed help.',
        author: 'Prof. Services Analyst',
        title: 'Xerox',
      },
      {
        quote: 'We get PDF reports that have one record of information on multiple lines. With ReportMiner we can easily harvest the information we need and put it in Excel. It saves us time.',
        author: 'Pro Advisor',
        title: 'Troutt Beeman and Co.',
      },
    ],
    resourcesBadge: 'Learning',
    resourcesHeading: 'Resources',
    resources: reportMinerResources,
  },

  'astera-centerprise-demo': {
    pageType: 'demo',
    productName: 'Astera Centerprise',
    eyebrow: 'Request a Demo',
    heading: 'Astera Centerprise',
    description: 'See our end-to-end data integration platform in action. Build data pipelines, automate ETL workflows, and manage enterprise data — all with a no-code interface.',
    hubspotFormId: '07a701d2-90e6-4123-a9b7-b648cd33b879',
    trustHeading: 'Trusted by Global Industry Leaders',
    trustLogos: sharedTrustLogos,
    faqs: demoFaqs,
    testimonialHeading: 'Don\'t take our word for it.',
    testimonials: [
      {
        quote: 'Centerprise is user friendly enough that I am able to maintain the system with minimal experience. It has been very reliable.',
        author: 'Administrator',
        title: 'Investment Management',
      },
      {
        quote: 'Visual capabilities, great support, easy to learn, excellent reliability, actively developed and great price. Way cheaper than Informatica.',
        author: 'ETL Lead',
        title: 'Vanderbilt Office of Investments',
      },
      {
        quote: 'I wrote a lot of SSIS in the past, and I always dreaded it. Centerprise is a much different experience and makes developing ETL fun.',
        author: 'Database Administrator',
        title: 'Goddard Systems',
      },
    ],
    resourcesBadge: 'Learning',
    resourcesHeading: 'Resources',
    resources: [],
  },

  'astera-edi-connect-demo': {
    pageType: 'demo',
    productName: 'Astera EDI Connect',
    eyebrow: 'Request a Demo',
    heading: 'Astera EDI Connect',
    description: 'Enjoy frictionless B2B data exchange with our enterprise-ready EDI software. Request a personalized demo to see Astera EDI Connect in action.',
    hubspotFormId: '1dd508cc-efc8-4afe-aee8-3f9b19550732',
    trustHeading: 'Trusted by Global Industry Leaders',
    trustLogos: sharedTrustLogos,
    faqs: demoFaqs,
    testimonialHeading: 'What Customers are Saying',
    testimonials: [
      {
        quote: 'Centerprise has been the essential ETL tool for the past 5 years within our data mapping and conversion teams.',
        author: 'Data Analyst',
        title: 'Financial Services',
      },
      ...sharedTestimonials,
    ],
    resourcesBadge: 'Learning',
    resourcesHeading: 'Resources',
    resources: [],
  },
};

/**
 * Lookup by URL slug.
 */
export function getLandingPageBySlug(slug: string) {
  return landingPages[slug] || null;
}
