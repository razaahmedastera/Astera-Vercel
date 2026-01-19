import type { BlogPost } from '@/types/contentful';

export const posts: BlogPost[] = [
  {
    id: '1',
    title: 'AI Data Preparation: 5 Steps to Smarter Machine Learning',
    slug: 'ai-data-preparation-steps',
    excerpt: 'Up to 80% of an AI project&apos;s timeline gets consumed by data preparation. Learn how to automate this critical process and unlock faster time-to-insight.',
    coverImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
    featuredImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Some AI initiatives deliver breakthrough results. Others barely survive the pilot phase. The difference isn\'t in the algorithms or computing power—it\'s in something that happens long before models have entered the training phase.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Up to 80% of an AI project\'s timeline gets consumed by a single activity: data preparation. Not model architecture. Not hyperparameter tuning. Not deployment. The unglamorous work of cleaning messy datasets, standardizing inconsistent formats, merging information from scattered sources, and transforming raw data into something machine learning algorithms can actually use. This leaves only 20% for analytics—a disparity so prevalent it\'s become known as the Pareto principle or the infamous 80/20 rule.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Despite being the foundation of every successful AI initiative, AI data preparation—the process of collecting, cleaning, structuring, and validating data for machine learning applications—has typically been the most time-consuming bottleneck organizations face. Data engineers spend weeks writing transformation scripts. Business analysts wait in queue for IT resources.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Meanwhile, competitors who\'ve automated their AI data preprocessing workflows are already extracting insights and building competitive advantages.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'The challenge compounds across three dimensions: manual preparation processes that don\'t scale, inconsistent data formats across systems, and information trapped in departmental silos. Each adds friction. Each slows iteration. Each creates opportunities for error.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Automating the AI data preparation process is an operational necessity. Organizations that master efficient, automated data preparation unlock faster time-to-insight, more accurate models, and the agility to iterate as business needs evolve.',
            },
          ],
        },
        {
          nodeType: 'heading-2',
          content: [
            {
              nodeType: 'text',
              value: 'What Is AI Data Preparation?',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'AI data preparation transforms raw data into the precise inputs that machine learning algorithms require. It\'s the translation layer between the messy reality of operational systems and the structured consistency that enables statistical learning.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'The process flows through five essential stages. Data ingestion collects information from multiple sources—databases, APIs, spreadsheets, sensor logs. Cleaning scrubs away errors, duplicates, and inconsistencies. Transformation involves reshaping, normalizing, and preparing data for analysis. Validation ensures everything meets quality standards. Delivery sends prepared data to ML pipelines or analytics platforms.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Machine learning data preparation differs fundamentally from traditional ETL in three ways. First, feature engineering becomes critical—creating variables that help models learn patterns more effectively. A customer\'s birth date matters less than their age group, purchase frequency, or lifetime value.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Second, semantic consistency carries more weight because AI models amplify subtle variations. "N/A," "null," "missing," and blank cells all mean the same thing to humans but represent different signals to algorithms.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Third, rapid iteration is essential. AI projects require constant experimentation with different data configurations, making repeatable, version-controlled preparation workflows invaluable.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Consider the transformations required: converting categorical variables like color names into numerical encodings that algorithms process. Handling missing values through imputation techniques that preserve statistical properties. Normalizing text by standardizing case, removing special characters, and tokenizing sentences. Resizing and normalizing images so computer vision models receive consistent inputs.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Each transformation builds toward one goal: creating AI-ready datasets that maximize model accuracy while minimizing bias and error.',
            },
          ],
        },
        {
          nodeType: 'heading-2',
          content: [
            {
              nodeType: 'text',
              value: 'Why Data Quality Defines AI Success',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Training a fraud detection model on transaction data where customer IDs occasionally swap, dates use inconsistent formats, and dollar amounts sometimes include currency symbols produces a model that learns patterns from noise rather than signal. The predictions become unreliable at best, dangerously misleading at worst.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Data quality for AI directly determines whether machine learning initiatives deliver business value or consume resources without meaningful returns. Every inconsistency becomes a potential source of model degradation.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Incorrect joins between datasets mislabel entire segments of training data. Merge customer records improperly with transaction histories, and your recommendation engine suggests products to wrong demographic groups entirely. Inconsistent date formats wreck time-series predictions—when some records use MM/DD/YYYY while others use DD/MM/YYYY, forecasting models can\'t distinguish seasonal patterns from data entry errors. Missing values handled carelessly introduce systematic bias. Simply deleting all incomplete records might remove edge cases that are precisely what models need to learn.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Research indicates that poor data quality can cost businesses around 15–25% of their operating budgets, with annual losses often amounting to as much as $15 million. For AI initiatives specifically, the costs multiply rapidly through failed projects, delayed deployments, and inaccurate predictions that drive poor business decisions.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'No amount of advanced neural network architecture overcomes training data filled with errors and inconsistencies. That means ensuring clean data for machine learning isn\'t a technical checkbox—it\'s a business imperative that determines whether AI investments generate returns or drain budgets.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Systematic profiling and validation tools have become non-negotiable. Organizations need automated ways to detect anomalies, flag quality issues, and ensure consistency before data ever reaches ML pipelines.',
            },
          ],
        },
        {
          nodeType: 'heading-2',
          content: [
            {
              nodeType: 'text',
              value: 'Why AI Begins with Data Preparation',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'The foundation of every successful AI initiative starts long before model training begins. Data preparation isn\'t just a preliminary step—it\'s the critical phase that determines whether your AI project will deliver value or consume resources without meaningful outcomes.',
            },
          ],
        },
      ],
    } as any,
    category: { id: 'features', name: 'Features', slug: 'features', title: 'Features' },
    authorName: 'Usman Hasan Khan',
    tags: ['data-governance', 'government', 'analytics', 'security', 'governance'],
    publishedAt: '2024-09-12',
    createdAt: '2024-09-12',
    updatedAt: '2024-09-12',
  },
  {
    id: '2',
    title: 'Why AI Begins with Data Preparation: The 80/20 Rule of Machine Learning',
    slug: 'why-ai-begins-with-data-preparation',
    excerpt: 'Some AI initiatives deliver breakthrough results. Others barely survive the pilot phase. The difference isn&apos;t in the algorithms—it&apos;s in data preparation.',
    coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    featuredImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Some AI initiatives deliver breakthrough results. Others barely survive the pilot phase. The difference isn\'t in the algorithms or computing power—it\'s in something that happens long before models have entered the training phase.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Up to 80% of an AI project\'s timeline gets consumed by a single activity: data preparation. Not model architecture. Not hyperparameter tuning. Not deployment. The unglamorous work of cleaning messy datasets, standardizing inconsistent formats, merging information from scattered sources, and transforming raw data into something machine learning algorithms can actually use. This leaves only 20% for analytics—a disparity so prevalent it\'s become known as the Pareto principle or the infamous 80/20 rule.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Despite being the foundation of every successful AI initiative, AI data preparation—the process of collecting, cleaning, structuring, and validating data for machine learning applications—has typically been the most time-consuming bottleneck organizations face. Data engineers spend weeks writing transformation scripts. Business analysts wait in queue for IT resources.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Meanwhile, competitors who\'ve automated their AI data preprocessing workflows are already extracting insights and building competitive advantages.',
            },
          ],
        },
        {
          nodeType: 'heading-2',
          content: [
            {
              nodeType: 'text',
              value: 'Why AI Begins with Data Preparation',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'The challenge compounds across three dimensions: manual preparation processes that don\'t scale, inconsistent data formats across systems, and information trapped in departmental silos. Each adds friction. Each slows iteration. Each creates opportunities for error.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Automating the AI data preparation process is an operational necessity. Organizations that master efficient, automated data preparation unlock faster time-to-insight, more accurate models, and the agility to iterate as business needs evolve.',
            },
          ],
        },
        {
          nodeType: 'heading-2',
          content: [
            {
              nodeType: 'text',
              value: 'What Is AI Data Preparation?',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'AI data preparation transforms raw data into the precise inputs that machine learning algorithms require. It\'s the translation layer between the messy reality of operational systems and the structured consistency that enables statistical learning.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'The process flows through five essential stages. Data ingestion collects information from multiple sources—databases, APIs, spreadsheets, sensor logs. Cleaning scrubs away errors, duplicates, and inconsistencies. Transformation involves reshaping, normalizing, and preparing data for analysis. Validation ensures everything meets quality standards. Delivery sends prepared data to ML pipelines or analytics platforms.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Machine learning data preparation differs fundamentally from traditional ETL in three ways. First, feature engineering becomes critical—creating variables that help models learn patterns more effectively. A customer\'s birth date matters less than their age group, purchase frequency, or lifetime value.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Second, semantic consistency carries more weight because AI models amplify subtle variations. "N/A," "null," "missing," and blank cells all mean the same thing to humans but represent different signals to algorithms.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Third, rapid iteration is essential. AI projects require constant experimentation with different data configurations, making repeatable, version-controlled preparation workflows invaluable.',
            },
          ],
        },
        {
          nodeType: 'heading-2',
          content: [
            {
              nodeType: 'text',
              value: 'Why Data Quality Defines AI Success',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Training a fraud detection model on transaction data where customer IDs occasionally swap, dates use inconsistent formats, and dollar amounts sometimes include currency symbols produces a model that learns patterns from noise rather than signal. The predictions become unreliable at best, dangerously misleading at worst.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Data quality for AI directly determines whether machine learning initiatives deliver business value or consume resources without meaningful returns. Every inconsistency becomes a potential source of model degradation.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Research indicates that poor data quality can cost businesses around 15–25% of their operating budgets, with annual losses often amounting to as much as $15 million. For AI initiatives specifically, the costs multiply rapidly through failed projects, delayed deployments, and inaccurate predictions that drive poor business decisions.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'No amount of advanced neural network architecture overcomes training data filled with errors and inconsistencies. That means ensuring clean data for machine learning isn\'t a technical checkbox—it\'s a business imperative that determines whether AI investments generate returns or drain budgets.',
            },
          ],
        },
      ],
    } as any,
    category: { id: 'features', name: 'Features', slug: 'features', title: 'Features' },
    authorName: 'Usman Hasan Khan',
    tags: ['artificial-intelligence', 'automation', 'data-governance'],
    publishedAt: '2024-07-14',
    createdAt: '2024-07-14',
    updatedAt: '2024-07-14',
  },
  {
    id: '3',
    title: 'Data Quality Defines AI Success: Why Clean Data Matters',
    slug: 'data-quality-defines-ai-success',
    excerpt: 'Training a fraud detection model on messy data produces unreliable predictions. Learn why data quality is the foundation of successful AI initiatives.',
    coverImage: 'https://images.unsplash.com/photo-1556745750-8d76bdb6984b?auto=format&fit=crop&w=1200&q=80',
    featuredImage: 'https://images.unsplash.com/photo-1556745750-8d76bdb6984b?auto=format&fit=crop&w=1200&q=80',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Training a fraud detection model on transaction data where customer IDs occasionally swap, dates use inconsistent formats, and dollar amounts sometimes include currency symbols produces a model that learns patterns from noise rather than signal. The predictions become unreliable at best, dangerously misleading at worst.',
            },
          ],
        },
        {
          nodeType: 'heading-2',
          content: [
            {
              nodeType: 'text',
              value: 'Why Data Quality Defines AI Success',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Data quality for AI directly determines whether machine learning initiatives deliver business value or consume resources without meaningful returns. Every inconsistency becomes a potential source of model degradation.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Incorrect joins between datasets mislabel entire segments of training data. Merge customer records improperly with transaction histories, and your recommendation engine suggests products to wrong demographic groups entirely. Inconsistent date formats wreck time-series predictions—when some records use MM/DD/YYYY while others use DD/MM/YYYY, forecasting models can\'t distinguish seasonal patterns from data entry errors. Missing values handled carelessly introduce systematic bias. Simply deleting all incomplete records might remove edge cases that are precisely what models need to learn.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Research indicates that poor data quality can cost businesses around 15–25% of their operating budgets, with annual losses often amounting to as much as $15 million. For AI initiatives specifically, the costs multiply rapidly through failed projects, delayed deployments, and inaccurate predictions that drive poor business decisions.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'No amount of advanced neural network architecture overcomes training data filled with errors and inconsistencies. That means ensuring clean data for machine learning isn\'t a technical checkbox—it\'s a business imperative that determines whether AI investments generate returns or drain budgets.',
            },
          ],
        },
        {
          nodeType: 'heading-2',
          content: [
            {
              nodeType: 'text',
              value: 'What Is AI Data Preparation?',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'AI data preparation transforms raw data into the precise inputs that machine learning algorithms require. It\'s the translation layer between the messy reality of operational systems and the structured consistency that enables statistical learning.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'The process flows through five essential stages. Data ingestion collects information from multiple sources—databases, APIs, spreadsheets, sensor logs. Cleaning scrubs away errors, duplicates, and inconsistencies. Transformation involves reshaping, normalizing, and preparing data for analysis. Validation ensures everything meets quality standards. Delivery sends prepared data to ML pipelines or analytics platforms.',
            },
          ],
        },
        {
          nodeType: 'heading-2',
          content: [
            {
              nodeType: 'text',
              value: 'Why AI Begins with Data Preparation',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Some AI initiatives deliver breakthrough results. Others barely survive the pilot phase. The difference isn\'t in the algorithms or computing power—it\'s in something that happens long before models have entered the training phase.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Up to 80% of an AI project\'s timeline gets consumed by a single activity: data preparation. Not model architecture. Not hyperparameter tuning. Not deployment. The unglamorous work of cleaning messy datasets, standardizing inconsistent formats, merging information from scattered sources, and transforming raw data into something machine learning algorithms can actually use.',
            },
          ],
        },
        {
          nodeType: 'paragraph',
          content: [
            {
              nodeType: 'text',
              value: 'Systematic profiling and validation tools have become non-negotiable. Organizations need automated ways to detect anomalies, flag quality issues, and ensure consistency before data ever reaches ML pipelines.',
            },
          ],
        },
      ],
    } as any,
    category: { id: 'features', name: 'Features', slug: 'features', title: 'Features' },
    authorName: 'Usman Hasan Khan',
    tags: ['data-governance', 'data-quality', 'analytics', 'machine-learning'],
    publishedAt: '2024-06-02',
    createdAt: '2024-06-02',
    updatedAt: '2024-06-02',
  },
  // Add remaining posts with empty content for now
  {
    id: '4',
    title: 'Data Challenges for Sales Managers & How to Overcome Them',
    slug: 'data-challenges-sales',
    excerpt: 'A practical guide to capturing, cleaning, and activating sales data without slowing down your reps.',
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    featuredImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: 'Content coming soon.' }],
        },
      ],
    } as any,
    category: { id: 'sales', name: 'Sales', slug: 'sales', title: 'Sales' },
    authorName: 'Astera Team',
    tags: ['data-prep', 'bi', 'analytics', 'sales', 'finance'],
    publishedAt: '2024-08-01',
    createdAt: '2024-08-01',
    updatedAt: '2024-08-01',
  },
  {
    id: '5',
    title: 'Aircall Expands Global Executive Team',
    slug: 'aircall-expands-exec-team',
    excerpt: 'New leadership to accelerate customer success and product innovation.',
    coverImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    featuredImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: 'Content coming soon.' }],
        },
      ],
    } as any,
    category: { id: 'news', name: 'News', slug: 'news', title: 'News' },
    authorName: 'Astera Team',
    tags: ['news', 'retail', 'cloud'],
    publishedAt: '2024-03-08',
    createdAt: '2024-03-08',
    updatedAt: '2024-03-08',
  },
  {
    id: '6',
    title: 'Call Recording Feature Works Best with These Playbooks',
    slug: 'call-recording-playbooks',
    excerpt: 'Feature spotlight: how to instrument, measure, and coach using modern call recordings.',
    coverImage: 'https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?auto=format&fit=crop&w=1200&q=80',
    featuredImage: 'https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?auto=format&fit=crop&w=1200&q=80',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: 'Content coming soon.' }],
        },
      ],
    } as any,
    category: { id: 'features', name: 'Features', slug: 'features', title: 'Features' },
    authorName: 'Astera Team',
    tags: ['api-management', 'automation', 'features'],
    publishedAt: '2024-03-09',
    createdAt: '2024-03-09',
    updatedAt: '2024-03-09',
  },
  {
    id: '7',
    title: 'HubSpot Integration: Playbooks for RevOps',
    slug: 'hubspot-integration-revops',
    excerpt: 'Learn how to sync CRM + telephony data for cleaner reporting and faster handoffs.',
    coverImage: 'https://images.unsplash.com/photo-1473181488821-2d23949a045a?auto=format&fit=crop&w=1200&q=80',
    featuredImage: 'https://images.unsplash.com/photo-1473181488821-2d23949a045a?auto=format&fit=crop&w=1200&q=80',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: 'Content coming soon.' }],
        },
      ],
    } as any,
    category: { id: 'integrations', name: 'Integrations', slug: 'integrations', title: 'Integrations' },
    authorName: 'Astera Team',
    tags: ['connectors', 'data-mapping', 'integrations', 'github'],
    publishedAt: '2024-02-28',
    createdAt: '2024-02-28',
    updatedAt: '2024-02-28',
  },
  {
    id: '8',
    title: 'Customer Experience: Handling High Call Volumes Gracefully',
    slug: 'customer-experience-high-volume',
    excerpt: 'Playbooks for staffing, automation, and QA to keep CSAT high.',
    coverImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    featuredImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: 'Content coming soon.' }],
        },
      ],
    } as any,
    category: { id: 'support', name: 'Support', slug: 'support', title: 'Support' },
    authorName: 'Astera Team',
    tags: ['education', 'automation', 'support'],
    publishedAt: '2024-02-15',
    createdAt: '2024-02-15',
    updatedAt: '2024-02-15',
  },
  {
    id: '9',
    title: 'AI + Voice: How to Coach Reps in Real Time',
    slug: 'ai-voice-coaching',
    excerpt: 'Use AI signals, snippets, and workflows to coach without slowing deals.',
    coverImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
    featuredImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: 'Content coming soon.' }],
        },
      ],
    } as any,
    category: { id: 'features', name: 'Features', slug: 'features', title: 'Features' },
    authorName: 'Astera Team',
    tags: ['artificial-intelligence', 'machine-learning', 'natural-language-processing', 'features'],
    publishedAt: '2024-01-20',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
  },
  {
    id: '10',
    title: 'Data Residency and Compliance for Global Teams',
    slug: 'data-residency-compliance',
    excerpt: 'What to know about storing and processing data across regions.',
    coverImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    featuredImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: 'Content coming soon.' }],
        },
      ],
    } as any,
    category: { id: 'news', name: 'News', slug: 'news', title: 'News' },
    authorName: 'Astera Team',
    tags: ['data-governance', 'insurance', 'news'],
    publishedAt: '2023-12-12',
    createdAt: '2023-12-12',
    updatedAt: '2023-12-12',
  },
  {
    id: '11',
    title: 'Customer Stories: How Teams Cut Handle Time by 30%',
    slug: 'customer-stories-handle-time',
    excerpt: 'Real-world plays to shrink handle time without hurting quality.',
    coverImage: 'https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?auto=format&fit=crop&w=1200&q=80',
    featuredImage: 'https://images.unsplash.com/photo-1525186402429-b4ff38bedbec?auto=format&fit=crop&w=1200&q=80',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: 'Content coming soon.' }],
        },
      ],
    } as any,
    category: { id: 'support', name: 'Support', slug: 'support', title: 'Support' },
    authorName: 'Astera Team',
    tags: ['healthcare', 'data-extraction', 'support', 'stories'],
    publishedAt: '2023-11-01',
    createdAt: '2023-11-01',
    updatedAt: '2023-11-01',
  },
  {
    id: '12',
    title: 'Platform Reliability at Scale: Behind the Scenes',
    slug: 'platform-reliability-scale',
    excerpt: 'How we design for resilience, monitoring, and graceful degradation.',
    coverImage: 'https://images.unsplash.com/photo-1473181488821-2d23949a045a?auto=format&fit=crop&w=1200&q=80',
    featuredImage: 'https://images.unsplash.com/photo-1473181488821-2d23949a045a?auto=format&fit=crop&w=1200&q=80',
    content: {
      nodeType: 'document',
      content: [
        {
          nodeType: 'paragraph',
          content: [{ nodeType: 'text', value: 'Content coming soon.' }],
        },
      ],
    } as any,
    category: { id: 'engineering', name: 'Engineering', slug: 'engineering', title: 'Engineering' },
    authorName: 'Astera Team',
    tags: ['data-warehousing', 'dimensional-modeling', 'engineering', 'cloud'],
    publishedAt: '2023-10-10',
    createdAt: '2023-10-10',
    updatedAt: '2023-10-10',
  },
];
