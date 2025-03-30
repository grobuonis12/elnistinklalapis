'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WordPressBlogType } from '@/blocks/WordPressBlog/config';

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
    
    // Restore displayed posts and current page from session storage
    const savedDisplayedPosts = sessionStorage.getItem('blogDisplayedPosts');
    const savedCurrentPage = sessionStorage.getItem('blogCurrentPage');
    const savedScrollPosition = sessionStorage.getItem('blogScrollPosition');

    if (savedDisplayedPosts && savedCurrentPage) {
      const parsedPosts = JSON.parse(savedDisplayedPosts);
      setDisplayedPosts(parsedPosts);
      setCurrentPage(parseInt(savedCurrentPage));
    } else {
      setDisplayedPosts(posts.slice(0, postsPerPage));
    }

    setBlogPosts(posts);
    setLoading(false);

    // Restore scroll position if it exists
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
  }, [posts, postsPerPage]);

  // Save state to session storage when it changes
  React.useEffect(() => {
    if (displayedPosts.length > 0) {
      sessionStorage.setItem('blogDisplayedPosts', JSON.stringify(displayedPosts));
      sessionStorage.setItem('blogCurrentPage', currentPage.toString());
    }
  }, [displayedPosts, currentPage]);

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
    const startIndex = currentPage * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const newPosts = blogPosts.slice(startIndex, endIndex);
    setDisplayedPosts(prev => [...prev, ...newPosts]);
    setCurrentPage(prev => prev + 1);
    setLoadingMore(false);
  };

  const handlePostClick = (postId: number) => {
    // Save current scroll position before navigating
    const scrollPosition = window.scrollY;
    sessionStorage.setItem('blogScrollPosition', scrollPosition.toString());
  };

  const hasMore = currentPage * postsPerPage < blogPosts.length;

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
    <div className="container mx-auto px-4">
      <h1 className="mt-4 md:mt-8 mb-6 md:mb-8 text-3xl md:text-4xl font-bold text-gray-900 text-center">Blogas</h1>
      <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {displayedPosts.map((post) => {
          const imageUrl = getImageUrl(post);
          return (
            <article
              key={post.id}
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
          );
        })}
      </div>
      
      {hasMore && (
        <div className="mt-6 md:mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loadingMore ? 'Kraunama...' : 'Įkelti daugiau'}
          </button>
        </div>
      )}
    </div>
  );
}; 