export interface CategoryDefinition {
  slug: string;
  name: string;
  description: string;
  group: 'topic' | 'industry' | 'product' | 'knowledge-center' | 'type' | 'other';
}

/**
 * All WordPress blog categories mapped by slug.
 * When migrating posts from WordPress, the content team adds
 * matching slugs to the `tags` field on each blog post in Contentful.
 * The /category/[slug] pages filter posts by these tag values.
 */
export const CATEGORIES: Record<string, CategoryDefinition> = {
  // ── Topic ──
  'api-management': {
    slug: 'api-management',
    name: 'API Management',
    description: 'Articles on API management, API design, and building code-free APIs with Astera.',
    group: 'topic',
  },
  'automated-data-extraction': {
    slug: 'automated-data-extraction',
    name: 'Automated Data Extraction',
    description: 'Learn about automated data extraction from PDFs, documents, and unstructured sources.',
    group: 'topic',
  },
  'application-integration': {
    slug: 'application-integration',
    name: 'Application Integration',
    description: 'Insights on integrating enterprise applications and building seamless data flows.',
    group: 'topic',
  },
  'artificial-intelligence': {
    slug: 'artificial-intelligence',
    name: 'Artificial Intelligence',
    description: 'Explore how AI and machine learning are transforming data management and integration.',
    group: 'topic',
  },
  'connectors': {
    slug: 'connectors',
    name: 'Connectors',
    description: 'Articles on data connectors, sources, and destinations for integration workflows.',
    group: 'topic',
  },
  'data-integration': {
    slug: 'data-integration',
    name: 'Data Integration',
    description: 'Best practices, guides, and trends in data integration for modern enterprises.',
    group: 'topic',
  },
  'data-integration-in-the-cloud': {
    slug: 'data-integration-in-the-cloud',
    name: 'Data Integration in the Cloud',
    description: 'Cloud-based data integration strategies and best practices.',
    group: 'topic',
  },
  'data-management': {
    slug: 'data-management',
    name: 'Data Management',
    description: 'Comprehensive guides on managing enterprise data assets effectively.',
    group: 'topic',
  },
  'data-mapping': {
    slug: 'data-mapping',
    name: 'Data Mapping',
    description: 'Techniques and tools for mapping data between different formats and systems.',
    group: 'topic',
  },
  'data-migration': {
    slug: 'data-migration',
    name: 'Data Migration',
    description: 'Strategies for migrating data between systems, databases, and cloud platforms.',
    group: 'topic',
  },
  'data-preparation': {
    slug: 'data-preparation',
    name: 'Data Preparation',
    description: 'Articles on preparing and cleaning data for analytics and business intelligence.',
    group: 'topic',
  },
  'data-services': {
    slug: 'data-services',
    name: 'Data Services',
    description: 'Insights on data-as-a-service and enterprise data service architectures.',
    group: 'topic',
  },
  'data-standardization': {
    slug: 'data-standardization',
    name: 'Data Standardization',
    description: 'Best practices for standardizing data formats and ensuring data quality.',
    group: 'topic',
  },
  'data-synchronization': {
    slug: 'data-synchronization',
    name: 'Data Synchronization',
    description: 'Guides on keeping data synchronized across multiple systems and platforms.',
    group: 'topic',
  },
  'data-transformation': {
    slug: 'data-transformation',
    name: 'Data Transformation',
    description: 'Techniques for transforming data between formats, structures, and schemas.',
    group: 'topic',
  },
  'data-virtualization': {
    slug: 'data-virtualization',
    name: 'Data Virtualization',
    description: 'Articles on data virtualization and accessing data without physical movement.',
    group: 'topic',
  },
  'data-warehouse-automation': {
    slug: 'data-warehouse-automation',
    name: 'Data Warehouse Automation',
    description: 'Automate your data warehouse development with modern tools and techniques.',
    group: 'topic',
  },
  'data-warehousing': {
    slug: 'data-warehousing',
    name: 'Data Warehousing',
    description: 'Articles on building, optimizing, and managing enterprise data warehouses.',
    group: 'topic',
  },
  'data-extraction': {
    slug: 'data-extraction',
    name: 'Data Extraction',
    description: 'Guides and best practices for extracting data from various sources and formats.',
    group: 'topic',
  },
  'data-strategy': {
    slug: 'data-strategy',
    name: 'Data Strategy',
    description: 'Strategic approaches to enterprise data management and data-driven decision making.',
    group: 'topic',
  },
  'electronic-data-interchange': {
    slug: 'electronic-data-interchange',
    name: 'Electronic Data Interchange',
    description: 'Guides on EDI standards, implementation, and transaction set management.',
    group: 'topic',
  },
  'hierarchical-data-integration': {
    slug: 'hierarchical-data-integration',
    name: 'Hierarchical Data Integration',
    description: 'Integrating complex hierarchical data structures like XML and JSON.',
    group: 'topic',
  },
  'legacy-data-modernization': {
    slug: 'legacy-data-modernization',
    name: 'Legacy Data Modernization',
    description: 'Modernize legacy systems and transform outdated data architectures.',
    group: 'topic',
  },
  'template-based-data-extraction': {
    slug: 'template-based-data-extraction',
    name: 'Template-based Data Extraction',
    description: 'Extract data from documents using intelligent template-based approaches.',
    group: 'topic',
  },

  // ── Industry ──
  'education': {
    slug: 'education',
    name: 'Education',
    description: 'Data management solutions and insights for the education sector.',
    group: 'industry',
  },
  'energy': {
    slug: 'energy',
    name: 'Energy',
    description: 'Data integration and management solutions for the energy industry.',
    group: 'industry',
  },
  'finance': {
    slug: 'finance',
    name: 'Finance',
    description: 'Data solutions for finance, banking, and financial services organizations.',
    group: 'industry',
  },
  'financial-services': {
    slug: 'financial-services',
    name: 'Financial Services',
    description: 'Data integration and management for financial services companies.',
    group: 'industry',
  },
  'government': {
    slug: 'government',
    name: 'Government',
    description: 'Data management solutions for government agencies and public sector.',
    group: 'industry',
  },
  'healthcare': {
    slug: 'healthcare',
    name: 'Healthcare',
    description: 'Healthcare data integration, EDI, and patient data management solutions.',
    group: 'industry',
  },
  'insurance': {
    slug: 'insurance',
    name: 'Insurance',
    description: 'Data solutions for insurance companies and insurtech organizations.',
    group: 'industry',
  },
  'manufacturing': {
    slug: 'manufacturing',
    name: 'Manufacturing',
    description: 'Data management and integration solutions for the manufacturing industry.',
    group: 'industry',
  },
  'media-communications': {
    slug: 'media-communications',
    name: 'Media & Communications',
    description: 'Data solutions for media, communications, and entertainment industries.',
    group: 'industry',
  },
  'non-profit': {
    slug: 'non-profit',
    name: 'Non-Profit',
    description: 'Data management solutions for non-profit organizations.',
    group: 'industry',
  },
  'retail': {
    slug: 'retail',
    name: 'Retail',
    description: 'Data integration and analytics solutions for the retail industry.',
    group: 'industry',
  },
  'transportation': {
    slug: 'transportation',
    name: 'Transportation',
    description: 'Data solutions for transportation and logistics companies.',
    group: 'industry',
  },
  'supply-chain': {
    slug: 'supply-chain',
    name: 'Supply Chain',
    description: 'Data management solutions for supply chain optimization.',
    group: 'industry',
  },

  // ── Product ──
  'astera-centerprise': {
    slug: 'astera-centerprise',
    name: 'Astera Centerprise',
    description: 'Articles and tutorials for Astera Centerprise data integration platform.',
    group: 'product',
  },
  'astera-data-stack': {
    slug: 'astera-data-stack',
    name: 'Astera Data Stack',
    description: 'Learn about Astera Data Stack and its unified data management capabilities.',
    group: 'product',
  },
  'astera-data-stack-product': {
    slug: 'astera-data-stack-product',
    name: 'Astera Data Stack',
    description: 'Product insights and case studies for Astera Data Stack.',
    group: 'product',
  },
  'astera-data-warehouse': {
    slug: 'astera-data-warehouse',
    name: 'Astera Data Warehouse Builder',
    description: 'Articles about Astera DW Builder for automated data warehouse development.',
    group: 'product',
  },
  'astera-data-prep': {
    slug: 'astera-data-prep',
    name: 'Astera Data Prep',
    description: 'Guides and insights for Astera Data Prep, the self-service data preparation tool.',
    group: 'product',
  },
  'api-management-product': {
    slug: 'api-management-product',
    name: 'Astera API Management',
    description: 'Product insights and tutorials for Astera API Management.',
    group: 'product',
  },
  'astera-cloud': {
    slug: 'astera-cloud',
    name: 'Astera Cloud',
    description: 'Articles about Astera Cloud deployment and cloud-based data management.',
    group: 'product',
  },
  'centerprise-data-integrator': {
    slug: 'centerprise-data-integrator',
    name: 'Centerprise Data Integrator',
    description: 'Tutorials and guides for Centerprise Data Integrator.',
    group: 'product',
  },
  'dw-builder': {
    slug: 'dw-builder',
    name: 'DW Builder',
    description: 'Articles and tutorials for Astera DW Builder.',
    group: 'product',
  },
  'ediconnect': {
    slug: 'ediconnect',
    name: 'EDIConnect',
    description: 'Guides and articles for Astera EDIConnect EDI management solution.',
    group: 'product',
  },
  'reportminer': {
    slug: 'reportminer',
    name: 'ReportMiner',
    description: 'Articles and tutorials for Astera ReportMiner data extraction tool.',
    group: 'product',
  },

  // ── Knowledge Center Sub-Categories ──
  'data-extraction-knowledge-center': {
    slug: 'data-extraction-knowledge-center',
    name: 'Data Extraction',
    description: 'Knowledge center articles on data extraction techniques and best practices.',
    group: 'knowledge-center',
  },
  'data-integration-knowledge-center': {
    slug: 'data-integration-knowledge-center',
    name: 'Data Integration',
    description: 'Knowledge center articles on data integration concepts and best practices.',
    group: 'knowledge-center',
  },
  'data-warehousing-knowledge-center': {
    slug: 'data-warehousing-knowledge-center',
    name: 'Data Warehousing',
    description: 'Knowledge center articles on data warehousing concepts and best practices.',
    group: 'knowledge-center',
  },
  'api-management-knowledge-center': {
    slug: 'api-management-knowledge-center',
    name: 'API Management',
    description: 'Knowledge center articles on API management concepts and best practices.',
    group: 'knowledge-center',
  },

  // ── Type Categories ──
  'case-study': {
    slug: 'case-study',
    name: 'Case Study',
    description: 'Real-world case studies showcasing how organizations use Astera solutions.',
    group: 'type',
  },
  'e-book': {
    slug: 'e-book',
    name: 'E-Book',
    description: 'Downloadable e-books on data management, integration, and best practices.',
    group: 'type',
  },
  'whitepaper': {
    slug: 'whitepaper',
    name: 'Whitepaper',
    description: 'In-depth whitepapers on data management strategies and solutions.',
    group: 'type',
  },
  'webinars': {
    slug: 'webinars',
    name: 'Webinars',
    description: 'On-demand and upcoming webinars on data management topics.',
    group: 'type',
  },
  'video': {
    slug: 'video',
    name: 'Video',
    description: 'Video tutorials, product demos, and educational content.',
    group: 'type',
  },
  'infographic': {
    slug: 'infographic',
    name: 'Infographic',
    description: 'Visual infographics on data management concepts and statistics.',
    group: 'type',
  },
  'data-sheet': {
    slug: 'data-sheet',
    name: 'Data Sheet',
    description: 'Product data sheets with technical specifications and capabilities.',
    group: 'type',
  },
  'edi-transaction-set': {
    slug: 'edi-transaction-set',
    name: 'EDI Transaction Set',
    description: 'Guides on EDI transaction sets, standards, and implementation.',
    group: 'type',
  },
  'product-updates': {
    slug: 'product-updates',
    name: 'Product Updates',
    description: 'Latest product updates, releases, and new features from Astera.',
    group: 'type',
  },
  'brochure': {
    slug: 'brochure',
    name: 'Brochure',
    description: 'Product brochures and marketing materials.',
    group: 'type',
  },
  'presentation': {
    slug: 'presentation',
    name: 'Presentation',
    description: 'Presentations on data management topics and Astera solutions.',
    group: 'type',
  },
  'tutorial': {
    slug: 'tutorial',
    name: 'Tutorial',
    description: 'Step-by-step tutorials for Astera products and data management techniques.',
    group: 'type',
  },
  'events': {
    slug: 'events',
    name: 'Events',
    description: 'Upcoming and past events, conferences, and trade shows.',
    group: 'type',
  },

  // ── Other / Structural ──
  'blog': {
    slug: 'blog',
    name: 'Blog',
    description: 'The latest data trends, insights, and best practices from the Astera blog.',
    group: 'other',
  },
  'knowledge-center': {
    slug: 'knowledge-center',
    name: 'Knowledge Center',
    description: 'In-depth articles and guides on data management, integration, and strategy.',
    group: 'other',
  },
  'astera-news-and-views': {
    slug: 'astera-news-and-views',
    name: 'Astera News and Views',
    description: 'Company news, press releases, and industry perspectives from Astera.',
    group: 'other',
  },
  'astera-technical-blog': {
    slug: 'astera-technical-blog',
    name: 'Astera Technical Blog',
    description: 'Technical deep dives and engineering insights from the Astera team.',
    group: 'other',
  },
  'getting-started': {
    slug: 'getting-started',
    name: 'Getting Started',
    description: 'Getting started guides and quick-start tutorials for Astera products.',
    group: 'other',
  },
  'miscellaneous': {
    slug: 'miscellaneous',
    name: 'Miscellaneous',
    description: 'Miscellaneous articles on data management and technology topics.',
    group: 'other',
  },
  'transformations': {
    slug: 'transformations',
    name: 'Transformations',
    description: 'Articles on data transformations and ETL processes.',
    group: 'other',
  },
  'sources': {
    slug: 'sources',
    name: 'Sources',
    description: 'Articles on connecting to various data sources.',
    group: 'other',
  },
  'destinations': {
    slug: 'destinations',
    name: 'Destinations',
    description: 'Articles on configuring data destinations and output targets.',
    group: 'other',
  },
  'workflows-subflows': {
    slug: 'workflows-subflows',
    name: 'Workflows/Subflows',
    description: 'Articles on building workflows and subflows in Astera.',
    group: 'other',
  },
  'product-overviews': {
    slug: 'product-overviews',
    name: 'Product Overviews',
    description: 'High-level overviews of Astera products and their capabilities.',
    group: 'other',
  },
};

/**
 * Look up a category by its slug.
 * Returns undefined if the slug is not a known category.
 */
export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return CATEGORIES[slug];
}

/**
 * Get all categories for a specific group.
 */
export function getCategoriesByGroup(group: CategoryDefinition['group']): CategoryDefinition[] {
  return Object.values(CATEGORIES).filter((c) => c.group === group);
}

/**
 * Get all category slugs (useful for generating static params).
 */
export function getAllCategorySlugs(): string[] {
  return Object.keys(CATEGORIES);
}
