import { MetadataRoute } from 'next';
import { getAllBlogPosts, getAllEbooks, getAllIndustries, getAllWebinars, getAllWhitepapers, getAllDatasheets, getAllNewsPosts } from '@/lib/contentful/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use environment variable or fallback to localhost for development
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 
                  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 
                  'http://localhost:3000';
  
  try {
    const [blogPosts, ebooks, industries, webinars, whitepapers, datasheets, newsPosts] = await Promise.all([
      getAllBlogPosts().catch(() => []),
      getAllEbooks().catch(() => []),
      getAllIndustries().catch(() => []),
      getAllWebinars().catch(() => []),
      getAllWhitepapers().catch(() => []),
      getAllDatasheets().catch(() => []),
      getAllNewsPosts().catch(() => []),
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
        url: `${baseUrl}/e-books`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/webinars`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/resources/whitepapers`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}/data-sheet`,
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
      {
        url: `${baseUrl}/news`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
    ];

    // Blog posts
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
      url: `${baseUrl}/type/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // eBooks
    const ebookPages: MetadataRoute.Sitemap = ebooks.map((ebook) => ({
      url: `${baseUrl}/type/e-book/${ebook.slug}`,
      lastModified: new Date(ebook.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    // Webinars
    const webinarPages: MetadataRoute.Sitemap = webinars.map((webinar) => ({
      url: `${baseUrl}/type/webinars/${webinar.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    // Whitepapers
    const whitepaperPages: MetadataRoute.Sitemap = whitepapers.map((wp) => ({
      url: `${baseUrl}/type/whitepaper/${wp.slug}`,
      lastModified: new Date(wp.updatedAt),
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

    const datasheetPages: MetadataRoute.Sitemap = datasheets.map((ds) => ({
      url: `${baseUrl}/type/data-sheet/${ds.slug}`,
      lastModified: new Date(ds.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    const newsPages: MetadataRoute.Sitemap = newsPosts.map((post) => ({
      url: `${baseUrl}/news/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...staticPages, ...blogPages, ...ebookPages, ...datasheetPages, ...webinarPages, ...whitepaperPages, ...industryPages, ...newsPages];
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
