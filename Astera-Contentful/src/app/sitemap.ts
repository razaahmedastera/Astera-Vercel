import { MetadataRoute } from 'next';
import { getAllBlogPosts, getAllEbooks, getAllIndustries } from '@/lib/contentful/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use environment variable or fallback to localhost for development
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                  'http://localhost:3000';
  
  try {
    const [blogPosts, ebooks, industries] = await Promise.all([
      getAllBlogPosts().catch(() => []),
      getAllEbooks().catch(() => []),
      getAllIndustries().catch(() => []),
    ]);

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/ebook`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/product`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
    ];

    // Blog posts
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // eBooks
    const ebookPages: MetadataRoute.Sitemap = ebooks.map((ebook) => ({
      url: `${baseUrl}/ebook/${ebook.slug}`,
      lastModified: new Date(ebook.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Industry pages
    const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
      url: `${baseUrl}/industry-solutions/${industry.slug}`,
      lastModified: new Date(industry.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

    return [...staticPages, ...blogPages, ...ebookPages, ...industryPages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return at least static pages if dynamic content fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}
