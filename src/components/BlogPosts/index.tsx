'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { lt } from 'date-fns/locale';
import { ScrollAnimation } from '../ScrollAnimation';

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
  postsPerPage?: number;
}

export default function BlogPosts({ posts, postsPerPage = 12 }: BlogPostsProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [displayedPosts, setDisplayedPosts] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
    if (!posts || posts.length === 0) return;
    
    // Ensure we show exactly 12 posts initially
    const initialPosts = posts.slice(0, postsPerPage);
    setDisplayedPosts(initialPosts);
    setCurrentPage(1);
  }, [posts, postsPerPage]);

  if (!posts || posts.length === 0) {
    return null;
  }

  const handleLoadMore = () => {
    const startIndex = currentPage * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const newPosts = posts.slice(startIndex, endIndex);
    setDisplayedPosts(prev => [...prev, ...newPosts]);
    setCurrentPage(prev => prev + 1);
  };

  const hasMorePosts = currentPage * postsPerPage < posts.length;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPosts.map((post, index) => {
          const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
          const formattedDate = format(new Date(post.date), 'yyyy-MM-dd', { locale: lt });

          return (
            <ScrollAnimation
              key={post.id}
              delay={index * 0.1}
              duration={0.5}
              offset={30}
            >
              <Link 
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block group hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300"
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
                  <h3 className="text-lg font-medium text-gray-900 line-clamp-2 mb-2" 
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
                  />
                  <p className="text-sm text-gray-500">{formattedDate}</p>
                </div>
              </Link>
            </ScrollAnimation>
          );
        })}
      </div>
      
      {hasMorePosts && (
        <div className="mt-8 flex justify-center">
          <ScrollAnimation delay={0.2} duration={0.5} offset={30}>
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 bg-[#FF4500] text-white rounded-full text-base font-medium border-2 border-black hover:bg-[#FF5722] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              Rodyti daugiau
            </button>
          </ScrollAnimation>
        </div>
      )}
    </div>
  );
} 