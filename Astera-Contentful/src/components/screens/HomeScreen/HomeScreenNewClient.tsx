'use client';

import { useEffect, useState } from 'react';
import { HomeScreenNew } from './HomeScreenNew';
import { getHomePageContentBrowser } from '@/lib/contentful/api-browser';
import type { HomePageContent } from '@/types/contentful';

export function HomeScreenNewClient() {
  const [content, setContent] = useState<HomePageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        setError(null);
        
        const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
        const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;
        
        console.log('Fetching content...', { spaceId: spaceId ? 'Set' : 'Missing', accessToken: accessToken ? 'Set' : 'Missing' });
        
        if (!spaceId || !accessToken) {
          throw new Error('Contentful credentials not found. Please rebuild with NEXT_PUBLIC_CONTENTFUL_* environment variables.');
        }
        
        // Add timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout after 10 seconds')), 10000)
        );
        
        const dataPromise = getHomePageContentBrowser();
        const data = await Promise.race([dataPromise, timeoutPromise]) as any;
        
        console.log('Content fetched successfully:', data);
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
            backgroundColor: '#0b63e5',
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
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <p style={{ color: '#64748b', fontSize: '1.2rem' }}>No content available</p>
        <button 
          onClick={() => window.location.reload()} 
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#0b63e5',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Reload
        </button>
      </div>
    );
  }

  return <HomeScreenNew content={content} />;
}

