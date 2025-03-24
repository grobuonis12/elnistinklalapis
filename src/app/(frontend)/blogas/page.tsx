import { Metadata } from 'next';
import { WordPressBlogComponent } from '@/blocks/WordPressBlog/Component';

interface Post {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
}

export const metadata: Metadata = {
  title: 'Blog - Elnis',
  description: 'Read our latest blog posts and articles',
};

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch('https://www.elnis.lt/wp-json/wp/v2/posts?_embed', {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Fetched posts with media:', data); // Debug log to check media
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return []; // Return empty array instead of throwing
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  // Debug log
  console.log('Rendering BlogPage with posts:', posts);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4">
        {posts.length === 0 ? (
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
            Įrašų nerasta. Patikrinkite interneto ryšį ir bandykite dar kartą.
          </div>
        ) : (
          <WordPressBlogComponent 
            blockType="wordPressBlog" 
            posts={posts} 
            wordpressUrl="https://www.elnis.lt/wp-json/wp/v2/posts"
          />
        )}
      </div>
    </div>
  );
} 