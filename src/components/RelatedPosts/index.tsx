'use client';

import React from 'react';
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

interface RelatedPostsProps {
  posts: Post[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  const handlePostClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    // Force a full page reload to the blog post
    window.location.href = `/blogas/${slug}`;
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Kiti Straipsniai</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => {
          const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
          return (
            <a
              key={post.id}
              href={`/blogas/${post.slug}`}
              onClick={(e) => handlePostClick(e, post.slug)}
              className="group block hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300"
            >
              {featuredImage && (
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <Image
                    src={featuredImage}
                    alt=""
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 
                  className="text-lg font-medium text-gray-900 line-clamp-2 mb-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
                <time className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString('lt-LT', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
} 