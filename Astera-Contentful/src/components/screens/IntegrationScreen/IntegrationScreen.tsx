'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './IntegrationScreen.css';

type Integration = {
  name: string;
  logo: string;
  category: string;
  comingSoon?: boolean;
};

const categories = [
  'All',
  'Cloud Storage',
  'Data Warehouses',
  'Databases',
  'Applications',
  'File Formats',
  'APIs',
  'Visualization Platforms',
  'CAPI Connectors',
  'Others',
];

const img = (file: string) => `/images/integrations/${file}`;

const integrations: Integration[] = [
  // APIs
  { name: 'REST', logo: img('integration-icon-01.png'), category: 'APIs' },
  { name: 'SOAP', logo: img('integration-icon-02.png'), category: 'APIs' },
  { name: 'OData', logo: img('integration-icon-03.png'), category: 'APIs' },

  // Applications
  { name: 'Dynamics CRM', logo: img('integration-icon-04.png'), category: 'Applications' },
  { name: 'Salesforce', logo: img('integration-icon-05.png'), category: 'Applications' },
  { name: 'Azure Blob Storage', logo: img('integration-icon-06.png'), category: 'Applications' },
  { name: 'Cloud Storage', logo: img('integration-icon-07.png'), category: 'Cloud Storage', comingSoon: true },
  { name: 'SharePoint', logo: img('integration-icon-08.png'), category: 'Applications', comingSoon: true },

  // Cloud Storage
  { name: 'FTP', logo: img('integration-icon-09.png'), category: 'Cloud Storage' },
  { name: 'SCP', logo: img('integration-icon-10.png'), category: 'Cloud Storage' },
  { name: 'HDFS', logo: img('integration-icon-11.png'), category: 'Cloud Storage' },
  { name: 'Amazon S3', logo: img('integration-icon-12.png'), category: 'Cloud Storage' },

  // Data Warehouses
  { name: 'Amazon Redshift', logo: img('integration-icon-13.png'), category: 'Data Warehouses' },
  { name: 'Snowflake', logo: img('integration-icon-14.png'), category: 'Data Warehouses' },
  { name: 'Amazon Aurora', logo: img('integration-icon-15.png'), category: 'Data Warehouses' },
  { name: 'IBM DB2', logo: img('integration-icon-16.png'), category: 'Data Warehouses' },

  // Databases
  { name: 'MariaDB', logo: img('integration-icon-17.png'), category: 'Databases' },
  { name: 'Oracle', logo: img('integration-icon-19.png'), category: 'Databases' },
  { name: 'PostgreSQL', logo: img('integration-icon-20.png'), category: 'Databases' },
  { name: 'SQL Server', logo: img('integration-icon-21.png'), category: 'Databases' },
  { name: 'Vertica', logo: img('integration-icon-23.png'), category: 'Databases' },
  { name: 'MS Access', logo: img('integration-icon-24.png'), category: 'Databases' },
  { name: 'Cloud SQL', logo: img('integration-icon-25.png'), category: 'Databases' },
  { name: 'MS Azure', logo: img('integration-icon-26.png'), category: 'Databases' },
  { name: 'Teradata', logo: img('integration-icon-27.png'), category: 'Databases' },
  { name: 'SAP HANA', logo: img('sap-hana.jpg'), category: 'Databases' },
  { name: 'SQL Anywhere', logo: img('sqlevery.png'), category: 'Databases', comingSoon: true },
  { name: 'SAP BAPI', logo: img('sapbap.png'), category: 'Databases' },
  { name: 'SQLite', logo: img('integration-icon-28.png'), category: 'Databases' },
  { name: 'Netezza', logo: img('integration-icon-29.png'), category: 'Databases' },
  { name: 'Amazon RDS', logo: img('integration-icon-30.png'), category: 'Databases' },
  { name: 'MySQL', logo: img('integration-icon-31.png'), category: 'Databases' },
  { name: 'MongoDB', logo: img('integration-icon-32.png'), category: 'Databases' },

  // File Formats
  { name: 'Fixed Length', logo: img('integration-icon-33.png'), category: 'File Formats' },
  { name: 'PDFs', logo: img('integration-icon-34.png'), category: 'File Formats' },
  { name: 'Microsoft Excel', logo: img('integration-icon-35.png'), category: 'File Formats' },
  { name: 'Delimited Files', logo: img('integration-icon-36.png'), category: 'File Formats' },
  { name: 'XML', logo: img('integration-icon-37.png'), category: 'File Formats' },
  { name: 'JSON', logo: img('integration-icon-38.png'), category: 'File Formats' },
  { name: 'COBOL', logo: img('integration-icon-39.png'), category: 'File Formats' },
  { name: 'Apache Parquet', logo: img('integration-icon-40.png'), category: 'File Formats', comingSoon: true },

  // Visualization Platforms
  { name: 'Tableau', logo: img('integration-icon-41.png'), category: 'Visualization Platforms' },
  { name: 'Email', logo: img('integration-icon-42.png'), category: 'Others' },

  // Others
  { name: 'ADO.Net', logo: img('integration-icon-43.png'), category: 'Others' },
  { name: 'ODBC', logo: img('integration-icon-44.png'), category: 'Others' },
  { name: 'OLE DB', logo: img('integration-icon-45.png'), category: 'Others' },
  { name: 'EDI', logo: img('integration-icon-46.png'), category: 'Others' },
  { name: 'AS2', logo: img('integration-icon-47.png'), category: 'Others' },
  { name: 'ODP', logo: img('integration-icon-48.png'), category: 'CAPI Connectors' },

  // CAPI Connectors
  { name: 'CMS', logo: img('CMS.png'), category: 'CAPI Connectors' },
  { name: 'Zendesk', logo: img('Zendesk-sell.png'), category: 'CAPI Connectors' },
  { name: 'Zoho', logo: img('Zoho-Inventory.png'), category: 'CAPI Connectors' },
  { name: 'ADA Fruit', logo: img('ADA-fruit.png'), category: 'CAPI Connectors' },
  { name: 'Agile CRM', logo: img('AgileCRM.png'), category: 'CAPI Connectors' },
  { name: 'Avaza', logo: img('Avaza.png'), category: 'CAPI Connectors' },
  { name: 'Box', logo: img('box.png'), category: 'CAPI Connectors' },
  { name: 'CMS Beneficiary', logo: img('CMS-Beneficiary.png'), category: 'CAPI Connectors' },
  { name: 'Clever Cloud', logo: img('Clever-cloud.png'), category: 'CAPI Connectors' },
  { name: 'Daniweb Connect', logo: img('daniweb-connect.png'), category: 'CAPI Connectors' },
  { name: 'Etsy', logo: img('etsy.png'), category: 'CAPI Connectors' },
  { name: 'Google Drive', logo: img('Google-Drive.png'), category: 'CAPI Connectors' },
  { name: 'IMDB', logo: img('IMDB.png'), category: 'CAPI Connectors' },
  { name: 'Mouser', logo: img('Mouser.png'), category: 'CAPI Connectors' },
  { name: 'Shopify', logo: img('Shopify.png'), category: 'CAPI Connectors' },
  { name: 'Slack', logo: img('Slack.png'), category: 'CAPI Connectors' },
  { name: 'Square Connect', logo: img('Square-connect.png'), category: 'CAPI Connectors' },
  { name: 'Stripe', logo: img('Stripe.png'), category: 'CAPI Connectors' },
  { name: 'Swagger Petstore', logo: img('Swagger-Petstore.png'), category: 'CAPI Connectors' },
  { name: 'Twitter', logo: img('Twitter.png'), category: 'CAPI Connectors' },
  { name: 'Zoom', logo: img('Zoom.png'), category: 'CAPI Connectors' },
];

export default function IntegrationScreen() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? integrations
    : integrations.filter((i) => i.category === active);

  return (
    <div className="integ-page">
      <section className="integ-hero">
        <div className="integ-hero-inner">
          <span className="integ-hero-badge">By Integration</span>
          <h1>
            Build An <span>Integrated<br />Data Ecosystem</span>
          </h1>
          <p className="integ-hero-subtitle">
            Establish code-free connectivity with your enterprise applications, databases, and cloud
            applications to integrate all your data points and create a holistic view of your data.
          </p>
        </div>
      </section>

      <section className="integ-section">
        <div className="integ-container">
          <div className="integ-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`integ-tab${active === cat ? ' active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="integ-grid">
            {filtered.map((item) => (
              <div key={item.name + item.category} className="integ-card">
                {item.comingSoon && <span className="integ-card-coming">Coming Soon</span>}
                <Image
                  src={item.logo}
                  alt={item.name}
                  width={64}
                  height={48}
                  className="integ-card-logo"
                  loading="lazy"
                />
                <span className="integ-card-name">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="integ-cta">
        <div className="integ-cta-inner">
          <p>Don&apos;t see the desired connector listed here?</p>
          <Link href="/contact-us">
            Contact Us
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
