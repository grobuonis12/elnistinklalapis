import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Post {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  date: string;
}

interface Props {
  params: {
    slug: string;
  };
}

async function getPost(slug: string): Promise<Post> {
  const res = await fetch(`https://www.elnis.lt/wp-json/wp/v2/posts?slug=${slug}`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  const posts = await res.json();
  return posts[0];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await getPost(params.slug);
    return {
      title: `${post.title.rendered} - Elnis Blog`,
      description: post.content.rendered.slice(0, 160).replace(/<[^>]*>/g, ''),
    };
  } catch {
    return {
      title: 'Post Not Found - Elnis Blog',
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  let post: Post;

  try {
    post = await getPost(params.slug);
  } catch {
    notFound();
  }

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString('lt-LT', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1
          className="mb-4 text-4xl font-bold text-gray-900"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <time className="mb-8 block text-sm text-gray-600">{formattedDate}</time>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </article>
  );
} 