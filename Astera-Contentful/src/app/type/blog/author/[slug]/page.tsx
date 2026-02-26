import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAuthorBySlug, getBlogPostsByAuthor, getAllAuthors } from '@/lib/contentful/api';
import { AuthorScreen } from '@/components/screens/AuthorScreen/AuthorScreen';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const authors = await getAllAuthors();
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return { title: 'Author Not Found' };
  }

  return {
    title: `${author.name} - Blog Author | Astera`,
    description: author.bio || `Articles and insights by ${author.name}`,
    openGraph: {
      title: `${author.name} - Blog Author | Astera`,
      description: author.bio || `Articles and insights by ${author.name}`,
      images: author.avatar ? [{ url: author.avatar }] : [],
      type: 'profile',
    },
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = await getBlogPostsByAuthor(author.id);

  return <AuthorScreen author={author} posts={posts} />;
}
