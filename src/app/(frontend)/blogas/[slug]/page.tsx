import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

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
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
      media_details?: {
        sizes?: {
          full?: {
            source_url: string;
          };
        };
      };
    }>;
  };
}

interface Props {
  params: {
    slug: string;
  };
}

async function getPost(slug: string): Promise<Post> {
  const res = await fetch(
    `https://www.elnis.lt/wp-json/wp/v2/posts?slug=${slug}&_embed`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }

  const posts = await res.json();
  return posts[0];
}

async function getRelatedPosts(currentSlug: string): Promise<Post[]> {
  const res = await fetch(
    `https://www.elnis.lt/wp-json/wp/v2/posts?_embed&per_page=10`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch related posts');
  }

  const posts = await res.json();
  // Filter out the current post and get 3 random posts
  return posts
    .filter((post: Post) => post.slug !== currentSlug)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
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
  let relatedPosts: Post[];

  try {
    [post, relatedPosts] = await Promise.all([
      getPost(params.slug),
      getRelatedPosts(params.slug)
    ]);
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

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const imageAlt = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered;

  return (
    <article className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        {featuredImage && (
          <div className="relative w-full aspect-[21/9] mb-8 rounded-xl overflow-hidden">
            <Image
              src={featuredImage}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <h1
          className="mb-4 text-4xl font-bold text-gray-900"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <time className="mb-8 block text-sm text-gray-600">{formattedDate}</time>
        <div
          className="prose prose-lg max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Kiti Straipsniai Section */}
        <div className="mt-16 border-t pt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Kiti Straipsniai</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => {
              const relatedFeaturedImage = relatedPost._embedded?.['wp:featuredmedia']?.[0]?.source_url;
              return (
                <Link
                  key={relatedPost.id}
                  href={`/blogas/${relatedPost.slug}`}
                  className="group block hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300"
                >
                  {relatedFeaturedImage && (
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image
                        src={relatedFeaturedImage}
                        alt=""
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 
                      className="text-lg font-medium text-gray-900 line-clamp-2 mb-2"
                      dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                    />
                    <time className="text-sm text-gray-500">
                      {new Date(relatedPost.date).toLocaleDateString('lt-LT', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
} 