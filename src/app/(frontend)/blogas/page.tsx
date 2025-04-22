import { Metadata } from 'next';
import { WordPressBlogComponent } from '@/components/WordPressBlog';

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
    // Use environment variable for the WordPress API URL
    const wordpressApiUrl = process.env.WORDPRESS_API_URL || 'https://www.elnis.lt/wp-json/wp/v2/posts';
    
    console.log('Fetching posts from:', wordpressApiUrl); // Debug log
    
    const res = await fetch(`${wordpressApiUrl}?_embed&per_page=100`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      console.error(`Response headers:`, Object.fromEntries(res.headers.entries()));
      throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('Fetched all posts with media:', data); // Debug log
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
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
            wordpressUrl={process.env.WORDPRESS_API_URL || 'https://www.elnis.lt/wp-json/wp/v2/posts'}
          />
        )}
      </div>
    </div>
  );
} 