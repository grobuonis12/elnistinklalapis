'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WordPressBlogType } from '@/blocks/WordPressBlog/config';
import { ScrollAnimation } from '../ScrollAnimation';

interface Post {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
      media_details?: {
        sizes?: {
          medium?: {
            source_url: string;
          };
          full?: {
            source_url: string;
          };
        };
      };
    }>;
  };
  featured_media?: number;
  better_featured_image?: {
    source_url: string;
    alt_text?: string;
  };
}

interface Props extends WordPressBlogType {
  posts?: Post[];
}

export const WordPressBlogComponent: React.FC<Props> = ({ posts = [], postsPerPage = 12, wordpressUrl }) => {
  const [blogPosts, setBlogPosts] = React.useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(!posts.length);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Restore state from session storage on mount
  React.useEffect(() => {
    if (!posts.length) return;
    
    // Store all posts for pagination
    setBlogPosts(posts);
    // Always show first 12 posts initially
    setDisplayedPosts(posts.slice(0, 12));
    setCurrentPage(1);
    setLoading(false);

    // Restore scroll position if it exists
    const savedScrollPosition = sessionStorage.getItem('blogScrollPosition');
    if (savedScrollPosition) {
      // Use setTimeout to ensure content is rendered
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScrollPosition),
          behavior: 'instant'
        });
        // Clear the saved scroll position after restoring it
        sessionStorage.removeItem('blogScrollPosition');
      }, 100);
    }
  }, [posts]);

  const getImageUrl = (post: Post): string | undefined => {
    // Try different possible locations for the featured image URL
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || // Standard WP REST API
           post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url || // Medium size
           post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full?.source_url || // Full size
           post.better_featured_image?.source_url; // Better Featured Image plugin
  };

  const getImageAlt = (post: Post): string => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.alt_text ||
           post.better_featured_image?.alt_text ||
           post.title.rendered;
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    const startIndex = displayedPosts.length;
    const endIndex = startIndex + 12;
    const nextPosts = blogPosts.slice(startIndex, endIndex);
    setDisplayedPosts(prev => [...prev, ...nextPosts]);
    setCurrentPage(prev => prev + 1);
    setLoadingMore(false);
  };

  const handlePostClick = (postId: number) => {
    // Save current scroll position before navigating
    const scrollPosition = window.scrollY;
    sessionStorage.setItem('blogScrollPosition', scrollPosition.toString());
  };

  const hasMore = displayedPosts.length < blogPosts.length;

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 ${!hasMore ? 'mb-12' : ''}`}>
      <h1 className="mt-4 md:mt-8 mb-6 md:mb-8 text-3xl md:text-4xl font-bold text-gray-900 text-center">Blogas</h1>
      <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {displayedPosts.map((post, index) => {
          const imageUrl = getImageUrl(post);
          return (
            <ScrollAnimation
              key={`post-${post.id}`}
              delay={Math.min(index * 0.1, 1)}
              duration={0.5}
              offset={30}
            >
              <article
                className="rounded-lg border border-gray-200 p-4 md:p-6 transition-shadow hover:shadow-lg flex flex-col group"
              >
                {imageUrl && (
                  <Link 
                    href={`/blogas/${post.slug}`} 
                    className="block relative w-full aspect-[16/9] mb-3 md:mb-4 rounded-lg overflow-hidden"
                    onClick={() => handlePostClick(post.id)}
                  >
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10" />
                    <Image
                      src={imageUrl}
                      alt={getImageAlt(post)}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </Link>
                )}
                <h2 className="mb-3 md:mb-4 text-lg md:text-xl font-semibold">
                  <Link
                    href={`/blogas/${post.slug}`}
                    className="text-gray-900 hover:text-blue-600 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    onClick={() => handlePostClick(post.id)}
                  />
                </h2>
                <div
                  className="prose prose-sm text-gray-600 flex-grow line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <time className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString('lt-LT', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                </div>
              </article>
            </ScrollAnimation>
          );
        })}
      </div>
      
      {hasMore && (
        <div className="mt-6 md:mt-8 mb-8 flex justify-center">
          <ScrollAnimation delay={0.2} duration={0.5} offset={30}>
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              className="px-6 py-3 bg-[#FF4500] text-white rounded-full text-base font-medium border-2 border-black hover:bg-[#FF5722] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? 'Kraunama...' : 'Įkelti daugiau'}
            </button>
          </ScrollAnimation>
        </div>
      )}
    </div>
  );
}; 