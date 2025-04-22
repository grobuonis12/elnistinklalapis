'use client';

import React from 'react';
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

type ColorScheme = {
  text: string;
  border: string;
  bg: string;
  hoverBg: string;
};

export const WordPressBlogComponent: React.FC<Props> = ({ posts = [], postsPerPage = 12, wordpressUrl }) => {
  const [blogPosts, setBlogPosts] = React.useState<Post[]>([]);
  const [displayedPosts, setDisplayedPosts] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState(!posts.length);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const colors: readonly ColorScheme[] = [
    { text: 'text-[#20B2AA]', border: 'border-[#20B2AA]', bg: 'bg-[#20B2AA]/5', hoverBg: 'hover:bg-[#20B2AA]' },          // Teal
    { text: 'text-[#FF69B4]', border: 'border-[#FF69B4]', bg: 'bg-[#FF69B4]/5', hoverBg: 'hover:bg-[#FF69B4]' },  // Pink/Magenta
    { text: 'text-[#E6B800]', border: 'border-[#E6B800]', bg: 'bg-[#E6B800]/5', hoverBg: 'hover:bg-[#E6B800]' },    // Soft Gold
  ] as const;

  const getAccentColor = (index: number): ColorScheme => {
    const colorIndex = Math.abs(index) % colors.length;
    // Since colors.length is 3 and we're using modulo, colorIndex will always be valid
    return colors[colorIndex] as ColorScheme;
  };

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

  const handlePostClick = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    // Force a full page reload to the blog post
    window.location.href = `/blogas/${slug}`;
  };

  const handleLoadMore = () => {
    if (loadingMore) return;
    setLoadingMore(true);
    const startIndex = displayedPosts.length;
    const endIndex = startIndex + 12;
    const nextPosts = blogPosts.slice(startIndex, endIndex);
    setDisplayedPosts(prev => [...prev, ...nextPosts]);
    setCurrentPage(prev => prev + 1);
    setLoadingMore(false);
  };

  // Log the wordpressUrl for debugging
  React.useEffect(() => {
    console.log('WordPressBlog component initialized with URL:', wordpressUrl);
    console.log('Initial posts count:', posts.length);
  }, [wordpressUrl, posts.length]);

  React.useEffect(() => {
    if (!posts.length) {
      console.log('No posts provided to WordPressBlog component');
      return;
    }
    
    console.log('Setting blog posts:', posts.length);
    setBlogPosts(posts);
    setDisplayedPosts(posts.slice(0, postsPerPage));
    setLoading(false);
  }, [posts, postsPerPage]);

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
      <div className="flex justify-center mt-6 md:mt-8 mb-6 md:mb-8">
        <div className="inline-block px-8 py-3 bg-[#FFDE59] rounded-full text-3xl md:text-4xl font-bold text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] tracking-wider">
          Blogas
        </div>
      </div>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        {displayedPosts.map((post, index) => {
          const imageUrl = getImageUrl(post);
          const { text: textColor, border: borderColor, bg } = getAccentColor(index);
          return (
            <ScrollAnimation
              key={`post-${post.id}`}
              delay={Math.min(index * 0.1, 1)}
              duration={0.5}
              offset={30}
            >
              <a 
                href={`/blogas/${post.slug}`}
                onClick={(e) => handlePostClick(e, post.slug)}
                className={`block rounded-lg border-2 ${borderColor} ${bg} p-5 flex flex-col group transition-all duration-300 ease-in-out hover:-translate-y-5 hover:shadow-lg shadow-md h-full`}
              >
                {imageUrl && (
                  <div className="relative w-full aspect-[16/9] mb-3 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-10" />
                    <Image
                      src={imageUrl}
                      alt={getImageAlt(post)}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <h2 className="mb-3 text-lg font-semibold font-['Inter']">
                  <span className={`${textColor} block relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-current after:origin-left after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300 line-clamp-2`}
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </h2>
                <div
                  className="prose prose-sm text-[#333333] flex-grow line-clamp-3 font-['Inter'] text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <div className={`mt-4 pt-4 border-t border-opacity-50 ${borderColor} flex justify-between items-center`}>
                  <time className="text-xs text-[#666666] italic">
                    {new Date(post.date).toLocaleDateString('lt-LT', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span className={`${textColor} font-medium text-sm transition-all duration-200 group-hover:text-base hover:text-white ${getAccentColor(index).hoverBg} px-4 py-2 rounded`}>
                    Skaityti daugiau
                  </span>
                </div>
              </a>
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
              className="px-6 py-3 text-white rounded-full text-base font-bold tracking-wider bg-[#FF4500] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingMore ? 'Kraunama...' : 'Įkelti daugiau'}
            </button>
          </ScrollAnimation>
        </div>
      )}
    </div>
  );
};