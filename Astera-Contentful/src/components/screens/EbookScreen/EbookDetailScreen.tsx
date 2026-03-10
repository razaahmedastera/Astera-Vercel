'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import type { Ebook } from '@/types/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, type Document } from '@contentful/rich-text-types';
import ContactUsHubSpotForm from '@/components/ui/HubSpotForm/ContactUsHubSpotForm';
import './EbookScreen.css';

interface Props {
  ebook: Ebook;
}

// Helper function to extract URL from Contentful Asset object (fallback)
function extractUrlFromAsset(asset: any): string {
  if (typeof asset === 'string') {
    return asset;
  }
  if (asset?.fields?.file?.url) {
    const url = asset.fields.file.url;
    return url.startsWith('//') ? `https:${url}` : (url.startsWith('http') ? url : `https:${url}`);
  }
  if (asset?.file?.url) {
    const url = asset.file.url;
    return url.startsWith('//') ? `https:${url}` : (url.startsWith('http') ? url : `https:${url}`);
  }
  return '';
}

// Custom download function - downloads PDF from Contentful eBook URL
function createDownloadFunction(pdfUrl: string | any) {
  return function() {
    console.log('[EbookDetailScreen] Form submitted - attempting to download PDF');
    console.log('[EbookDetailScreen] PDF URL value:', pdfUrl);
    console.log('[EbookDetailScreen] PDF URL type:', typeof pdfUrl);
    
    // Extract URL if it's still an asset object (shouldn't happen, but just in case)
    let finalUrl = '';
    if (typeof pdfUrl === 'string') {
      finalUrl = pdfUrl.trim();
    } else if (pdfUrl && typeof pdfUrl === 'object') {
      // Fallback: extract from asset object if API didn't convert it
      finalUrl = extractUrlFromAsset(pdfUrl);
      console.log('[EbookDetailScreen] Extracted URL from asset object:', finalUrl);
    }
    
    if (!finalUrl || finalUrl === '') {
      console.error('[EbookDetailScreen] PDF URL not available for download');
      console.error('[EbookDetailScreen] PDF URL value:', pdfUrl);
      console.error('[EbookDetailScreen] PDF URL structure:', JSON.stringify(pdfUrl, null, 2));
      
      // Show user-friendly message instead of alert
      const formContainer = document.getElementById('hubspot-ebook-form');
      if (formContainer) {
        // Remove any existing error messages
        const existingError = formContainer.querySelector('.ebook-pdf-error');
        if (existingError) existingError.remove();
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'ebook-pdf-error';
        errorMessage.style.cssText = 'padding: 16px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c33; margin-top: 16px;';
        errorMessage.innerHTML = '<strong>PDF Not Available</strong><br>This eBook PDF is currently being updated. Please check back later or contact support.';
        formContainer.appendChild(errorMessage);
      }
      
      // Only show alert in development mode
      if (process.env.NODE_ENV === 'development') {
        console.warn('[EbookDetailScreen] PDF URL not found. Please ensure the "eBook URL" field is set in Contentful.');
      }
      return;
    }
    
    // Ensure URL is absolute (add https:// if missing)
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      if (finalUrl.startsWith('//')) {
        finalUrl = 'https:' + finalUrl;
      } else {
        console.error('[EbookDetailScreen] PDF URL is not a valid absolute URL:', finalUrl);
        
        // Show user-friendly message
        const formContainer = document.getElementById('hubspot-ebook-form');
        if (formContainer) {
          // Remove any existing error messages
          const existingError = formContainer.querySelector('.ebook-pdf-error');
          if (existingError) existingError.remove();
          
          const errorMessage = document.createElement('div');
          errorMessage.className = 'ebook-pdf-error';
          errorMessage.style.cssText = 'padding: 16px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c33; margin-top: 16px;';
          errorMessage.innerHTML = '<strong>PDF Error</strong><br>The PDF link is invalid. Please contact support.';
          formContainer.appendChild(errorMessage);
        }
        
        // Only show alert in development
        if (process.env.NODE_ENV === 'development') {
          console.warn('[EbookDetailScreen] PDF URL is not valid. Please check the eBook URL field in Contentful.');
        }
        return;
      }
    }
    
    console.log('[EbookDetailScreen] Opening PDF URL:', finalUrl);
    // Open PDF in new tab for download
    window.open(finalUrl, '_blank');
  };
}

// Helper function to check if description is a Rich Text Document
function isRichTextDocument(description: Document | string): description is Document {
  return typeof description === 'object' && description !== null && 'nodeType' in description && description.nodeType === 'document';
}

// Normalize content structure to match Contentful's expected format
function normalizeContent(content: any): any {
  if (!content || typeof content !== 'object') return null;
  
  if (!content.nodeType) return null;
  
  // Ensure data property exists
  const normalized: any = {
    nodeType: content.nodeType,
    data: content.data || {},
  };
  
  // Handle content array
  if (content.content) {
    if (!Array.isArray(content.content)) {
      return normalized;
    }
    
    normalized.content = content.content
      .filter((node: any) => node && typeof node === 'object')
      .map((node: any) => {
        if (node.nodeType === 'text') {
          return {
            nodeType: 'text',
            value: node.value || '',
            marks: node.marks || [],
            data: node.data || {},
          };
        }
        // Recursively normalize nested nodes
        return normalizeContent(node) || node;
      })
      .filter((node: any) => node !== null);
  }
  
  return normalized;
}

// Helper function to slugify text for h2 IDs
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function EbookDetailScreen({ ebook }: Props) {
  // Render options for Rich Text
  const renderOptions = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node: any, children: any) => {
        const rawText =
          (node.content || [])
            .map((c: any) => c.value || '')
            .join(' ')
            .trim() || 'section';
        const id = slugify(rawText);
        return (
          <h2 id={id} className="ebook-detail-content-h2">
            {children}
          </h2>
        );
      },
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
        return <p className="ebook-detail-content-p">{children}</p>;
      },
      [BLOCKS.UL_LIST]: (node: any, children: any) => {
        return <ul className="ebook-detail-content-ul">{children}</ul>;
      },
      [BLOCKS.OL_LIST]: (node: any, children: any) => {
        return <ol className="ebook-detail-content-ol">{children}</ol>;
      },
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => {
        return <li className="ebook-detail-content-li">{children}</li>;
      },
    },
  };

  // Create download function with eBook PDF URL
  const downloadFunction = useCallback(() => {
    return createDownloadFunction(ebook.pdfUrl)();
  }, [ebook.pdfUrl]);

  // Function to apply form layout styles directly to form elements (eBook specific)
  const applyFormLayout = useCallback(() => {
    const form = document.getElementById('hubspot-ebook-form');
    if (!form) return;

    const allFields = form.querySelectorAll('.hs-form-field');
    allFields.forEach((field) => {
      (field as HTMLElement).style.cssText = 'display: block !important; width: 100% !important; float: none !important; margin-right: 0 !important;';
    });

    const fieldsets = form.querySelectorAll('fieldset');
    fieldsets.forEach((fs) => {
      (fs as HTMLElement).style.cssText = 'display: flex !important; flex-direction: column !important; width: 100% !important;';
    });
  }, []);

  // Handle form submit - trigger PDF download
  const handleFormSubmit = useCallback(() => {
    // Only trigger download if PDF URL exists
    if (ebook.pdfUrl) {
      downloadFunction();
    } else {
      // Show error message in form
      const formContainer = document.getElementById('hubspot-ebook-form');
      if (formContainer) {
        // Remove any existing error messages
        const existingError = formContainer.querySelector('.ebook-pdf-error');
        if (existingError) existingError.remove();
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'ebook-pdf-error';
        errorMessage.style.cssText = 'padding: 16px; background: #fee; border: 1px solid #fcc; border-radius: 8px; color: #c33; margin-top: 16px;';
        errorMessage.innerHTML = '<strong>PDF Not Available</strong><br>Thank you for your interest! The PDF is currently being updated. We\'ll notify you when it\'s ready.';
        formContainer.appendChild(errorMessage);
      }
    }
  }, [ebook.pdfUrl, downloadFunction]);

  // Handle form ready - apply custom layout
  const handleFormReady = useCallback(($form: any) => {
    // Apply layout after form is ready
    setTimeout(() => {
      applyFormLayout();
      // Also observe for any dynamic changes
      const observer = new MutationObserver(() => {
        applyFormLayout();
      });
      const form = document.getElementById('hubspot-ebook-form');
      if (form) {
        observer.observe(form, { childList: true, subtree: true });
        // Reapply after a short delay
        setTimeout(() => {
          applyFormLayout();
          observer.disconnect();
        }, 1000);
      }
    }, 200);
  }, [applyFormLayout]);

  // Structured Data (JSON-LD) for SEO
  // Use environment variable or fallback to localhost for development
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
  const ebookSchema = {
    '@context': 'https://schema.org',
    '@type': ebook.schemaType || 'Book',
    name: ebook.title,
    description: typeof ebook.description === 'string' ? ebook.description.substring(0, 200) : '',
    image: ebook.ogImage || ebook.coverImage || '',
    url: `${baseUrl}/type/e-book/${ebook.slug}`,
    datePublished: ebook.createdAt,
    dateModified: ebook.updatedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Astera',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    ...(ebook.pdfUrl && {
      distribution: {
        '@type': 'DataDownload',
        contentUrl: ebook.pdfUrl,
        encodingFormat: 'application/pdf',
      },
    }),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'eBooks',
        item: `${baseUrl}/e-books`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: ebook.title,
        item: `${baseUrl}/type/e-book/${ebook.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ebookSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <div className="ebook-detail-page">
        {/* Hero Section with Title and Cover */}
        <section className="ebook-detail-hero">
        <div className="section-container">
          <div className="ebook-detail-hero-layout">
            {/* Left: Title Only */}
            <div className="ebook-detail-hero-content">
              <span className="ebook-detail-label">{ebook.heroLabel || 'Download'}</span>
              <h1 className="ebook-detail-title">{ebook.title}</h1>
            </div>

            {/* Right: eBook Cover */}
            <div className="ebook-detail-hero-cover">
              {ebook.coverImage ? (
                <div className="ebook-cover-image-wrapper">
                  <Image
                    src={ebook.coverImage}
                    alt={ebook.title}
                    width={464}
                    height={300}
                    className="ebook-cover-image"
                    priority
                  />
                </div>
              ) : (
                <div className="ebook-cover-stack">
                  <div className="ebook-cover-back"></div>
                  <div className="ebook-cover-main">
                    <div className="ebook-cover-label">e-BOOK</div>
                    <div className="ebook-cover-gradient"></div>
                    <div className="ebook-cover-shapes"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="ebook-detail-main">
        <div className="section-container">
          <div className="ebook-detail-grid">
            <div className="ebook-detail-content">
              {isRichTextDocument(ebook.description) ? (
                <div className="ebook-detail-description">
                  {(() => {
                    try {
                      const normalizedContent = normalizeContent(ebook.description);
                      return documentToReactComponents(normalizedContent, renderOptions);
                    } catch (error) {
                      console.error('Error rendering rich text content:', error, ebook.description);
                      return <div className="text-red-500">Error rendering content. Check console.</div>;
                    }
                  })()}
                </div>
              ) : (
                <p className="ebook-detail-description">{ebook.description}</p>
              )}
              
              {ebook.topics && ebook.topics.length > 0 && (
                <div className="ebook-topics-section">
                  <h2 className="ebook-topics-title">Inside, you&apos;ll discover:</h2>
                  <ul className="ebook-topics-list">
                    {ebook.topics.map((topic, index) => (
                      <li key={index} className="ebook-topic-item">
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {ebook.conclusion && (
                <p className="ebook-detail-conclusion">
                  {ebook.conclusion}
                </p>
              )}
            </div>

            <div className="ebook-detail-sidebar">
              <div className="ebook-form-wrapper">
                <div className="ebook-form-header">
                  <h2 className="ebook-form-title">{ebook.formTitle || 'Download this eBook'}</h2>
                  <p className="ebook-form-subtitle">{ebook.formSubtitle || 'Fill in your details to get instant access'}</p>
                </div>
                {!ebook.pdfUrl && (
                  <div className="ebook-pdf-warning" style={{
                    padding: '16px',
                    background: '#fff3cd',
                    border: '1px solid #ffc107',
                    borderRadius: '8px',
                    color: '#856404',
                    marginBottom: '16px',
                    fontSize: '14px'
                  }}>
                    <strong>⚠️ PDF Currently Unavailable</strong>
                    <br />
                    <span style={{ fontSize: '13px' }}>This eBook PDF is being updated. Please check back later.</span>
                  </div>
                )}
                <ContactUsHubSpotForm
                  formId={ebook.hubspotFormId || '3e8efa89-ed65-4c01-9a0f-8d1c84cf5a7b'}
                  containerId="hubspot-ebook-form"
                  showLabels={false}
                  submitButtonAlign="center"
                  submitButtonFullWidth={true}
                  onFormSubmit={handleFormSubmit}
                  onFormReady={handleFormReady}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}
