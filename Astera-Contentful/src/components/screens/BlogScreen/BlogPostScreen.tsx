'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { BlogPost } from '@/types/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { BlogCtaSection } from './BlogCtaSection';
import { KeyTakeawaysSection } from './KeyTakeawaysSection';
import { FAQSection } from './FAQSection';
import './BlogPostScreen.css';

type Props = {
  post: BlogPost;
};

type TocItem = { id: string; text: string };

const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80';

function formatDate(value?: string) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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

function extractHeadings(content: any): TocItem[] {
  if (!content?.content || !Array.isArray(content.content)) return [];
  try {
    return content.content
      .filter((node: any) => node && node.nodeType === BLOCKS.HEADING_2)
      .map((node: any, idx: number) => {
        if (!node.content || !Array.isArray(node.content)) {
          return { id: `section-${idx + 1}`, text: `Section ${idx + 1}` };
        }
        const text = node.content
          .filter((c: any) => c && c.value)
          .map((c: any) => c.value || '')
          .join(' ')
          .trim() || `section-${idx + 1}`;
        return { id: slugify(text), text };
      });
  } catch (error) {
    console.error('Error extracting headings:', error);
    return [];
  }
}

// Debug function to log all embedded entries in content
function logAllEmbeddedEntries(content: any) {
  if (!content?.content || !Array.isArray(content.content)) {
    console.log('[logAllEmbeddedEntries] No content to traverse');
    return;
  }
  
  console.log('[logAllEmbeddedEntries] Starting to traverse content...');
  let entryCount = 0;
  let assetCount = 0;
  
  const traverse = (nodes: any[], depth = 0) => {
    if (!Array.isArray(nodes)) return;
    
    for (const node of nodes) {
      if (!node) continue;
      
      // Check for embedded entry
      if (node.nodeType === BLOCKS.EMBEDDED_ENTRY) {
        entryCount++;
        const entry = node.data?.target;
        console.log(`[logAllEmbeddedEntries] ✅ Found EMBEDDED_ENTRY #${entryCount}:`, {
          contentType: entry?.sys?.contentType?.sys?.id,
          entryId: entry?.sys?.id,
          fields: Object.keys(entry?.fields || {}),
          allFields: JSON.stringify(entry?.fields, null, 2)
        });
      }
      
      // Check for embedded asset
      if (node.nodeType === BLOCKS.EMBEDDED_ASSET) {
        assetCount++;
        const asset = node.data?.target;
        console.log(`[logAllEmbeddedEntries] ✅ Found EMBEDDED_ASSET #${assetCount}:`, {
          assetId: asset?.sys?.id,
          fields: Object.keys(asset?.fields || {}),
          fileUrl: asset?.fields?.file?.url
        });
      }
      
      // Recursively traverse nested content
      if (node.content && Array.isArray(node.content)) {
        traverse(node.content, depth + 1);
      }
    }
  };
  
  traverse(content.content);
  console.log(`[logAllEmbeddedEntries] Summary: ${entryCount} embedded entries, ${assetCount} embedded assets`);
}

// Extract blogKeyPoints embedded entries from rich text content
function extractKeyPoints(content: any): string[] {
  console.log('[extractKeyPoints] Starting extraction');
  console.log('[extractKeyPoints] Content structure:', {
    hasContent: !!content,
    hasContentArray: !!content?.content,
    isArray: Array.isArray(content?.content),
    arrayLength: content?.content?.length
  });
  
  if (!content?.content || !Array.isArray(content.content)) {
    console.log('[extractKeyPoints] ❌ No valid content array');
    return [];
  }
  
  const keyPoints: string[] = [];
  let blogKeyPointsFound = 0;
  
  try {
    // Recursive function to traverse the content tree
    const traverse = (nodes: any[]) => {
      if (!Array.isArray(nodes)) return;
      
      for (const node of nodes) {
        if (!node) continue;
        
        // Check if this is an embedded entry
        if (node.nodeType === BLOCKS.EMBEDDED_ENTRY) {
          const entry = node.data?.target;
          const contentType = entry?.sys?.contentType?.sys?.id;
          
          console.log('[extractKeyPoints] Found embedded entry:', {
            nodeType: node.nodeType,
            contentType: contentType,
            entryId: entry?.sys?.id,
            fullSys: entry?.sys
          });
          
          // Check if it's a blogKeyPoints entry (case-insensitive, handle variations)
          const isBlogKeyPoints = contentType && (
            contentType === 'blogKeyPoints' ||
            contentType.toLowerCase() === 'blogkeypoints' ||
            contentType === 'blog-key-points' ||
            contentType === 'blog_key_points'
          );
          
          if (isBlogKeyPoints) {
            blogKeyPointsFound++;
            const fields = entry.fields || {};
            
            console.log(`[extractKeyPoints] ✅ blogKeyPoints entry #${blogKeyPointsFound} found!`);
            console.log('[extractKeyPoints] All field keys:', Object.keys(fields));
            console.log('[extractKeyPoints] All fields:', JSON.stringify(fields, null, 2));
            
            // Try to find the key point text field - check ALL fields
            const fieldKeys = Object.keys(fields);
            let keyPoint: any = null;
            
            // First, try common field names (including exact Contentful field name)
            const commonNames = [
              'Key TakeawaysOne', // Exact field name from Contentful
              'keyTakeawaysOne',
              'keyTakeaways',
              'blogKeyPoint',
              'keyPoint',
              'point',
              'text',
              'value',
              'title',
              'description',
              'takeaway'
            ];
            
            for (const name of commonNames) {
              if (fields[name] !== undefined && fields[name] !== null && fields[name] !== '') {
                keyPoint = fields[name];
                console.log(`[extractKeyPoints] Found key point in field "${name}":`, keyPoint);
                break;
              }
            }
            
            // If not found, try case-insensitive match (handles spaces)
            if (!keyPoint) {
              for (const key of fieldKeys) {
                for (const name of commonNames) {
                  // Normalize both for comparison (lowercase, remove spaces)
                  const normalizedKey = key.toLowerCase().replace(/\s+/g, '');
                  const normalizedName = name.toLowerCase().replace(/\s+/g, '');
                  if (normalizedKey === normalizedName) {
                    keyPoint = fields[key];
                    console.log(`[extractKeyPoints] Found key point in field "${key}" (normalized match):`, keyPoint);
                    break;
                  }
                }
                if (keyPoint) break;
              }
            }
            
            // If still not found, try to use ANY string field found
            if (!keyPoint) {
              console.warn('[extractKeyPoints] ⚠️ No key point found in common field names. Checking all fields:');
              for (const key of fieldKeys) {
                const value = fields[key];
                console.log(`  - ${key}:`, {
                  type: typeof value,
                  value: typeof value === 'string' ? value : JSON.stringify(value),
                  isArray: Array.isArray(value)
                });
                
                // If this is a string field, use it
                if (typeof value === 'string' && value.trim()) {
                  keyPoint = value;
                  console.log(`[extractKeyPoints] ✅ Using string field: "${key}" = "${value.trim()}"`);
                  break;
                }
                // If it's an array of strings, use the array
                else if (Array.isArray(value) && value.length > 0) {
                  const firstItem = value[0];
                  if (typeof firstItem === 'string' && firstItem.trim()) {
                    keyPoint = value; // Use the whole array
                    console.log(`[extractKeyPoints] ✅ Using array field: "${key}" with ${value.length} items`);
                    break;
                  }
                }
              }
            }
            
            if (keyPoint) {
              // If it's a string, add it directly
              if (typeof keyPoint === 'string' && keyPoint.trim()) {
                keyPoints.push(keyPoint.trim());
                console.log(`[extractKeyPoints] ✅ Added key point: "${keyPoint.trim()}"`);
              }
              // If it's an array, add all string items
              else if (Array.isArray(keyPoint)) {
                const validPoints = keyPoint.filter((item: any) => item && typeof item === 'string' && item.trim());
                keyPoints.push(...validPoints.map((p: string) => p.trim()));
                console.log(`[extractKeyPoints] ✅ Added ${validPoints.length} key points from array`);
              }
            }
          }
        }
        
        // Recursively traverse nested content
        if (node.content && Array.isArray(node.content)) {
          traverse(node.content);
        }
      }
    };
    
    traverse(content.content);
    
    console.log(`[extractKeyPoints] Summary: Found ${blogKeyPointsFound} blogKeyPoints entries, extracted ${keyPoints.length} key points`);
    console.log('[extractKeyPoints] Extracted key points:', keyPoints);
    
  } catch (error) {
    console.error('[extractKeyPoints] Error:', error);
  }
  
  return keyPoints;
}

function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>) {
  const target = e.currentTarget;
  if (target.src !== FALLBACK_COVER) {
    target.src = FALLBACK_COVER;
  }
}


// Icon grid for promotional section
const PromoIcons = () => {
  const icons = [
    // Row 1: API, Database, Analytics, Cloud
    <svg key="api" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 9h16M4 15h16M12 3v18" />
    </svg>,
    <svg key="db" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>,
    <svg key="chart" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22 6 13.5 14.5 8.5 9.5 2 18" />
      <polyline points="16 6 22 6 22 12" />
    </svg>,
    <svg key="cloud" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>,
    // Row 2: Funnel, Gear, Integration, Pipeline
    <svg key="funnel" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>,
    <svg key="gear" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
    </svg>,
    <svg key="integration" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12h8M12 8v8" />
    </svg>,
    <svg key="pipeline" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M2 12h20M6 6h12M6 18h12" />
    </svg>,
    // Row 3: Transform, Validate, Export, Monitor
    <svg key="transform" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 3l3 3-3 3M6 21l-3-3 3-3M3 6v12M21 6v12" />
    </svg>,
    <svg key="validate" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>,
    <svg key="export" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>,
    <svg key="monitor" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>,
  ];

  return (
    <div className="promo-icon-grid">
      {icons.map((icon, i) => (
        <div key={i} className="promo-icon-circle">
          {icon}
        </div>
      ))}
    </div>
  );
};

function authorSlugFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function BlogPostScreen({ post }: Props) {
  // Use featuredImage from Contentful field ID "featuredImage" for hero image
  const cover = post.featuredImage || post.coverImage || FALLBACK_COVER;
  const authorName = post.authorName || post.author?.name || 'Astera Team';
  const authorRole = (post as any).authorRole || post.author?.role || post.author?.jobTitle || 'Product Marketing Specialist';
  const authorSlug = post.author?.slug || authorSlugFromName(authorName);
  
  // Normalize content to ensure it matches Contentful's expected format
  const rawContent = post.content as any;
  const contentData = rawContent ? normalizeContent(rawContent) : null;
  
  // Debug: Log content structure
  if (process.env.NODE_ENV === 'development') {
    console.log('BlogPostScreen - Post slug:', post.slug);
    console.log('BlogPostScreen - Has content:', !!contentData);
    console.log('BlogPostScreen - Content nodeType:', contentData?.nodeType);
    console.log('BlogPostScreen - Content array length:', contentData?.content?.length);
    
    // Debug: Log all embedded entries
    if (contentData) {
      logAllEmbeddedEntries(contentData);
    }
  }
  
  const hasRichText = 
    contentData && 
    contentData.nodeType === 'document' && 
    Array.isArray(contentData.content) && 
    contentData.content.length > 0;
  
  const [activeTocId, setActiveTocId] = useState<string>('');
  const sidebarRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Add class to aside when scrolling and maintain horizontal position
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let initialLeft: number | null = null;
    let isFixed = false;
    let thresholdScroll = 0;

    const updatePosition = (): number | null => {
      const sidebar = sidebarRef.current;
      if (!sidebar) return null;

      // Get the grid container to calculate proper position
      const gridContainer = sidebar.closest('.grid') || sidebar.closest('.section-container');
      if (!gridContainer) return null;

      const gridRect = gridContainer.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();
      
      // Calculate left position relative to viewport
      // The sidebar is in the second column of the grid
      const gridLeft = gridRect.left;
      const gridWidth = gridRect.width;
      // Sidebar is in the right column, so calculate its position
      const sidebarLeft = gridLeft + (gridWidth - sidebarRect.width - 40); // 40px for gap
      
      return sidebarLeft;
    };

    const calculateThreshold = (): number => {
      const sidebar = sidebarRef.current;
      if (!sidebar) return 0;

      // Get the TOC container inside the sidebar
      const tocContainer = sidebar.querySelector('.blog-toc-container');
      if (!tocContainer) {
        // Fallback: use sidebar's own position
        const rect = sidebar.getBoundingClientRect();
        return Math.max(0, rect.top + window.scrollY - 100); // 100px for header height
      }

      // Calculate when header (100px from top) would touch the TOC
      const tocRect = tocContainer.getBoundingClientRect();
      const tocTop = tocRect.top + window.scrollY;
      // When TOC top reaches 100px from viewport top (header position)
      // This is the scroll position where header will touch TOC
      return Math.max(0, tocTop - 100);
    };

    const handleScroll = () => {
      const sidebar = sidebarRef.current;
      if (!sidebar) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Calculate threshold on first scroll or if not set
      if (thresholdScroll === 0) {
        thresholdScroll = calculateThreshold();
      }
      
      // Add 'is-fixed' class when header touches TOC - keep it fixed throughout scroll
      if (scrollTop > thresholdScroll) {
        if (!isFixed) {
          // Capture position before adding class
          const leftPos = updatePosition();
          if (leftPos !== null) {
            initialLeft = leftPos;
            
            sidebar.classList.add('is-fixed');
            
            // Set position with smooth transition
            sidebar.style.setProperty('left', `${initialLeft}px`, 'important');
            sidebar.style.setProperty('top', '100px', 'important');
            sidebar.style.setProperty('position', 'fixed', 'important');
            sidebar.style.setProperty('right', 'auto', 'important');
            
            // Hide promo container when TOC becomes sticky
            const promoContainer = sidebar.querySelector('.blog-promo-container');
            if (promoContainer) {
              (promoContainer as HTMLElement).style.display = 'none';
            }
            
            isFixed = true;
          }
        } else {
          // Update position if already fixed (for resize or scroll) - keep it fixed smoothly
          const leftPos = updatePosition();
          if (leftPos !== null && initialLeft !== leftPos) {
            initialLeft = leftPos;
            sidebar.style.setProperty('left', `${initialLeft}px`, 'important');
          }
          // Keep promo container hidden when already fixed
          const promoContainer = sidebar.querySelector('.blog-promo-container');
          if (promoContainer) {
            (promoContainer as HTMLElement).style.display = 'none';
          }
        }
      } else {
        if (isFixed) {
          sidebar.classList.remove('is-fixed');
          sidebar.style.removeProperty('left');
          sidebar.style.removeProperty('top');
          sidebar.style.removeProperty('position');
          sidebar.style.removeProperty('right');
          initialLeft = null;
          isFixed = false;
          thresholdScroll = 0; // Reset to recalculate on next scroll
          
          // Show promo container when TOC is not sticky
          const promoContainer = sidebar.querySelector('.blog-promo-container');
          if (promoContainer) {
            (promoContainer as HTMLElement).style.display = '';
          }
        }
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    const handleResize = () => {
      // Recalculate position on resize
      if (isFixed && sidebarRef.current) {
        const leftPos = updatePosition();
        if (leftPos !== null) {
          initialLeft = leftPos;
          sidebarRef.current.style.setProperty('left', `${initialLeft}px`, 'important');
        }
      }
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    handleScroll(); // Check initial state
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toc = useMemo(() => {
    if (!contentData) return [];
    return extractHeadings(contentData);
  }, [contentData]);

  // Extract key points from embedded blogKeyPoints entries in rich text content
  const keyTakeaways = useMemo(() => {
    if (post.keyPoints && post.keyPoints.length > 0) {
      return post.keyPoints;
    }
    // Extract from rich text content if not found in post.keyPoints
    if (contentData) {
      return extractKeyPoints(contentData);
    }
    return [];
  }, [post.keyPoints, contentData]);


  // Track active TOC section on scroll - highlight the heading user is currently reading
  useEffect(() => {
    if (toc.length === 0) return;

    const updateActiveToc = () => {
      const scrollPosition = window.scrollY + 150; // Offset for header + some padding
      let activeId = '';

      // Find the heading that's closest to the top of the viewport
      for (let i = toc.length - 1; i >= 0; i--) {
        const element = document.getElementById(toc[i].id);
        if (element) {
          const elementTop = element.offsetTop;
          if (elementTop <= scrollPosition) {
            activeId = toc[i].id;
            break;
          }
        }
      }

      // If no heading found, use the first one
      if (!activeId && toc.length > 0) {
        activeId = toc[0].id;
      }

      setActiveTocId(activeId);

      // Auto-scroll active TOC item into view
      if (activeId) {
        const activeLink = document.querySelector(`.blog-toc-link[href="#${activeId}"]`) as HTMLElement;
        if (activeLink) {
          const tocList = activeLink.closest('.blog-toc-list') as HTMLElement;
          if (tocList) {
            const linkRect = activeLink.getBoundingClientRect();
            const listRect = tocList.getBoundingClientRect();
            
            // Check if link is outside visible area
            if (linkRect.top < listRect.top || linkRect.bottom > listRect.bottom) {
              activeLink.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
              });
            }
          }
        }
      }
    };

    // Initial check
    updateActiveToc();

    // Update on scroll
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveToc();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateActiveToc);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateActiveToc);
    };
  }, [toc]);

  // Handle smooth scroll to heading when TOC is clicked
  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

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
          <h2 id={id} className="blog-post-h2">
            {children}
          </h2>
        );
      },
      // Table support
      [BLOCKS.TABLE]: (node: any, children: any) => {
        return (
          <div className="blog-post-table-wrapper">
            <table className="blog-post-table">
              {children}
            </table>
          </div>
        );
      },
      [BLOCKS.TABLE_ROW]: (node: any, children: any) => {
        return <tr className="blog-post-table-row">{children}</tr>;
      },
      [BLOCKS.TABLE_HEADER_CELL]: (node: any, children: any) => {
        return <th className="blog-post-table-header">{children}</th>;
      },
      [BLOCKS.TABLE_CELL]: (node: any, children: any) => {
        return <td className="blog-post-table-cell">{children}</td>;
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        const entry = node.data.target;
        const contentType = entry?.sys?.contentType?.sys?.id;
        
        // Skip blogKeyPoints entries in content - they are displayed separately via keyTakeaways field
        if (contentType === 'blogKeyPoints') {
          // Don't render Key Takeaways inline in content since we have a separate keyTakeaways field
          return null;
        }
        
        // Check if it's a blogCta entry
        if (contentType === 'blogCta') {
          const fields = entry.fields || {};
          
          // Helper function to find field by multiple possible names (case-insensitive search)
          const findField = (possibleNames: string[]): any => {
            for (const name of possibleNames) {
              if (fields[name] !== undefined && fields[name] !== null && fields[name] !== '') {
                return fields[name];
              }
            }
            // Try case-insensitive match
            const fieldKeys = Object.keys(fields);
            for (const key of fieldKeys) {
              for (const name of possibleNames) {
                if (key.toLowerCase() === name.toLowerCase()) {
                  return fields[key];
                }
              }
            }
            return '';
          };
          
          // Try multiple possible field ID formats
          // Based on actual Contentful fields:
          // - "Blog CTA Text" -> ctaButtonText
          // - "Blog CTA link (url)" -> blogCtaLinkUrl
          const cta = {
            id: entry.sys.id,
            title: findField(['blogCtaTitle', 'title', 'Blog CTA Title']),
            description: findField(['blogCtaDescription', 'description', 'Blog CTA Description']),
            text: findField([
              'ctaButtonText', // Actual field name from Contentful
              'blogCtaText', 
              'text', 
              'Blog CTA Text',
              'buttonText',
              'ctaText'
            ]),
            link: findField([
              'blogCtaLinkUrl', // Actual field name from Contentful
              'blogCtaLink', 
              'link', 
              'Blog CTA link',
              'Blog CTA Link',
              'blogCtalink',
              'url',
              'href',
              'buttonUrl',
              'ctaLink'
            ]),
          };
          
          // Debug: log fields to see what we're getting
          console.log('[BlogPostScreen] CTA entry fields keys:', Object.keys(fields));
          console.log('[BlogPostScreen] CTA entry sys:', entry.sys);
          console.log('[BlogPostScreen] CTA all fields:', JSON.stringify(fields, null, 2));
          console.log('[BlogPostScreen] Mapped CTA:', cta);
          
          // Only render if we have at least title or text
          if (cta.title || cta.text) {
            return <BlogCtaSection key={entry.sys.id} cta={cta} />;
          }
        }
        
        // Fallback for other embedded entries
        return null;
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = node.data.target;
        if (asset?.fields?.file?.url) {
          const url = asset.fields.file.url.startsWith('//') 
            ? `https:${asset.fields.file.url}` 
            : asset.fields.file.url.startsWith('http') 
              ? asset.fields.file.url 
              : `https:${asset.fields.file.url}`;
          
          const alt = asset.fields.title || asset.fields.description || '';
          
          console.log('[BlogPostScreen] Embedded image found:', {
            url,
            alt,
            assetFields: Object.keys(asset.fields || {})
          });
          
          return (
            <figure className="blog-post-embedded-image">
              <Image
                src={url}
                alt={alt}
                width={1200}
                height={675}
                className="blog-post-content-image"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              {asset.fields.description && (
                <figcaption className="blog-post-image-caption">
                  {asset.fields.description}
                </figcaption>
              )}
            </figure>
          );
        }
        return null;
      },
    },
  };

  return (
    <article className="bg-white">
      <section
        className="py-12 sm:py-14 lg:py-16"
        style={{
          background: 'linear-gradient(180deg, #f4f7ff 0%, #f9fbff 50%, #ffffff 100%)',
        }}
      >
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10">
            {/* Main Content */}
            <div ref={contentRef} className="flex flex-col gap-8 max-w-4xl min-w-0">
            {/* Title */}
            <h1 className="blog-post-title">{post.title}</h1>

            {/* Author and Date Section - After title in one row */}
            <div className="blog-author-section-main">
              <Link href={`/type/blog/author/${authorSlug}`} className="blog-author-avatar blog-author-avatar-link" prefetch={true}>
                {(authorName || 'A').slice(0, 1).toUpperCase()}
              </Link>
              <div className="blog-author-info">
                <Link href={`/type/blog/author/${authorSlug}`} className="blog-author-name blog-author-name-link" prefetch={true}>
                  {authorName}
                </Link>
                <div className="blog-author-role">{authorRole}</div>
              </div>
              <div className="blog-author-date">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </div>

            {/* Hero Image - Moved after title */}
            <div className="blog-hero-image-container">
              <Image
                src={cover}
                alt={post.title}
                fill
                className="blog-hero-image"
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                onError={handleImageError}
              />
              <div className="blog-hero-overlay" />
            </div>

            {/* Key Takeaways Section - Add after hero image, before content */}
            {post.keyTakeaways && (
              <KeyTakeawaysSection 
                keyTakeaways={post.keyTakeaways} 
                authorName={authorName}
              />
            )}

            {/* Content */}
            {hasRichText || post.excerpt ? (
              <div className="blog-post-content">
                {hasRichText ? (
                  <div>
                    {(() => {
                      try {
                        return documentToReactComponents(contentData, renderOptions);
                      } catch (error) {
                        console.error('Error rendering rich text content:', error, contentData);
                        return <div className="text-red-500">Error rendering content. Check console.</div>;
                      }
                    })()}
                  </div>
                ) : (
                  <div>
                    {post.excerpt && (
                      <>
                        <p className="text-gray-500 mb-4">Content preview:</p>
                        <p>{post.excerpt}</p>
                      </>
                    )}
                  </div>
                )}
              </div>
            ) : null}

            {/* FAQs Section - At the end of blog content */}
            {post.faQss && (
              <FAQSection faqSection={post.faQss} />
            )}
          </div>

          {/* Sidebar */}
          <aside ref={sidebarRef} className="hidden lg:block space-y-6 blog-sidebar">
            {/* Table of Contents */}
            <div className="blog-toc-container">
              <h3 className="blog-toc-title">Table of Content</h3>
              <ul className="blog-toc-list">
                {toc.length === 0 && <li className="blog-toc-item">No sections yet</li>}
                {toc.map((item) => (
                  <li key={item.id} className="blog-toc-item">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleTocClick(e, item.id)}
                      className={`blog-toc-link ${activeTocId === item.id ? 'blog-toc-link-active' : ''}`}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Promotional Section */}
            <div className="blog-promo-container">
              <PromoIcons />
              <h3 className="blog-promo-title">The Automated, No-Code Data Stack</h3>
              <p className="blog-promo-description">
                Learn how Astera Data Stack can simplify and streamline your enterprise&apos;s data management.
              </p>
              <a href="/product" className="blog-promo-button">
                Start Your Free Trial
              </a>
            </div>
          </aside>
          </div>
        </div>
      </section>
    </article>
  );
}

export default BlogPostScreen;
