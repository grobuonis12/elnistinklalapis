'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export const LatestPosts = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  React.useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await fetch('https://www.elnis.lt/wp-json/wp/v2/posts?per_page=3&_embed');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      }
    };

    fetchLatestPosts();
  }, []);

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <Link
          key={post.id}
          href={`/blogas/${post.slug}`}
          className="group flex items-start gap-5"
        >
          <div className="relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-white/10">
            {post._embedded?.['wp:featuredmedia']?.[0]?.source_url ? (
              <Image
                src={post._embedded['wp:featuredmedia'][0].source_url}
                alt=""
                fill
                className="object-cover transition-transform group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-white/10" />
            )}
          </div>
          <div className="flex flex-col">
            <h3 
              className="text-white/90 group-hover:text-white text-base font-medium mb-1 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <time className="text-white/60 text-xs">
              {new Date(post.date).toLocaleDateString('lt-LT', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
              }).replace(/\//g, '-')}
            </time>
          </div>
        </Link>
      ))}
    </div>
  );
}; 