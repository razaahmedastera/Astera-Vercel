import { notFound } from 'next/navigation';
import BlogPostScreen from '@/components/screens/BlogScreen/BlogPostScreen';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/contentful/api';

export async function generateStaticParams() {
  try {
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  try {
    console.log(`[BlogPostPage] Loading blog post with slug: "${slug}"`);
    const post = await getBlogPostBySlug(slug);
    if (!post) {
      console.warn(`[BlogPostPage] Blog post with slug "${slug}" not found.`);
      return notFound();
    }
    console.log(`[BlogPostPage] Successfully loaded blog post: "${post.title}"`);
    return <BlogPostScreen post={post} />;
  } catch (error) {
    console.error(`[BlogPostPage] Error loading blog post with slug "${slug}":`, error);
    if (error instanceof Error) {
      console.error('[BlogPostPage] Error details:', error.message);
      console.error('[BlogPostPage] Error stack:', error.stack);
    }
    return notFound();
  }
}
