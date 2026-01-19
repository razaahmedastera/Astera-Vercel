'use client';

import { useEffect, useState } from 'react';
import { ProductScreenNew } from './ProductScreenNew';
import { getProductPageContentBrowser } from '@/lib/contentful/api-browser';
import type { ProductPageContent } from '@/types/contentful';

export function ProductScreenNewClient() {
  const [content, setContent] = useState<ProductPageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getProductPageContentBrowser();
        setContent(data);
      } catch (err: any) {
        console.error('Failed to fetch content:', err);
        const errorMessage = err?.message || 'Failed to load content. Please refresh the page.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '1.2rem',
        color: '#64748b'
      }}>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <p style={{ color: '#ef4444', fontSize: '1.2rem' }}>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#005CCC',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return <ProductScreenNew content={content} />;
}

