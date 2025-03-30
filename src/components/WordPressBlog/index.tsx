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
      <h1 className="mt-8 mb-8 text-4xl font-bold text-gray-900 text-center">Blogas</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayedPosts.map((post) => {
          const imageUrl = getImageUrl(post);
          return (
            <article
              key={post.id}
              className="rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-lg flex flex-col group"
            >
              {imageUrl && (
                <Link 
                  href={`/blogas/${post.slug}`} 
                  className="block relative w-full aspect-[16/9] mb-4 rounded-lg overflow-hidden"
                  onClick={() => handlePostClick(post.id)}
                >
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10" />
                  <Image
                    src={imageUrl}
                    alt={getImageAlt(post)}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              )}
              <h2 className="mb-4 text-xl font-semibold">
                <Link
                  href={`/blogas/${post.slug}`}
                  className="text-gray-900 hover:text-blue-600"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  onClick={() => handlePostClick(post.id)}
                />
              </h2>
              <div
                className="prose prose-sm text-gray-600 flex-grow"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <Link
                href={`/blogas/${post.slug}`}
                className="mt-4 inline-block text-blue-600 hover:underline"
                onClick={() => handlePostClick(post.id)}
              >
                Skaityti daugiau →
              </Link>
            </article>
          );
        })}
      </div>
      
      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loadingMore ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Kraunama...
              </span>
            ) : (
              'Rodyti daugiau įrašų'
            )}
          </button>
        </div>
      )}
    </div>
  );
}; 