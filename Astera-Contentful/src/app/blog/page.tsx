'use client';

import BlogListClient from '@/components/screens/BlogScreen/BlogListClient';
import { getAllBlogPosts } from '@/lib/contentful/api';

// Webhook-only revalidation: Pages are cached indefinitely until webhook triggers revalidation
// This means content updates instantly when published in Contentful (via webhook)
// Safety net: If webhook fails, content will update after 1 hour (fallback revalidation)
export const revalidate = 3600; // 1 hour fallback (webhooks handle instant updates)

export default async function BlogPage() {
  try {
    // Fetch blog posts from Contentful
    const posts = await getAllBlogPosts();

    console.log(`[BlogPage] Loaded ${posts.length} blog post(s)`);
    if (posts.length > 0) {
      console.log(`[BlogPage] Available slugs:`, posts.map(p => p.slug));
    } else {
      console.warn('[BlogPage] No blog posts found in Contentful');
    }

// Use static "All" category only (skip Contentful categories for now)
const allCategories = [
  { id: 'all', name: 'All', slug: 'all', title: 'All' },
];

export default function BlogPage() {
  // BlogListClient will fetch posts client-side for real-time updates
  // Pass empty array as initialPosts - it will fetch fresh data on mount
  return <BlogListClient initialPosts={[]} categories={allCategories} pageSize={9} />;
}
