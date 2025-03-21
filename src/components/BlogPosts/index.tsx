'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { lt } from 'date-fns/locale';

interface BlogPost {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  link: string;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

interface BlogPostsProps {
  posts: BlogPost[];
}

export default function BlogPosts({ posts }: BlogPostsProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 w-[300px] bg-white shadow-lg rounded-lg mt-2 p-4 z-50">
      {posts.map((post) => {
        const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
        const formattedDate = format(new Date(post.date), 'yyyy-MM-dd', { locale: lt });

        return (
          <Link 
            key={post.id} 
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mb-4 last:mb-0 hover:bg-gray-50 rounded-lg p-2 transition-colors"
          >
            <div className="flex gap-3">
              {featuredImage && (
                <div className="flex-shrink-0">
                  <Image
                    src={featuredImage}
                    alt=""
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2" 
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
                />
                <p className="text-xs text-gray-500 mt-1">{formattedDate}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
} 