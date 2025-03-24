'use client';

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'

interface TagCloudButton {
  text: string;
  link: string;
  hexColor: string;
  id?: string | null;
}

interface FooterPost {
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

const FooterComponent = ({ footer }: { footer: Footer }) => {
  const [posts, setPosts] = useState<FooterPost[]>([]);
  const navItems = footer?.navItems || []
  const sections = footer?.sections || []

  // Find the tag cloud section
  const tagCloudSection = sections.find(section => section.type === 'tag_cloud')

  useEffect(() => {
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
    <footer className="bg-black">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-20">
          {/* Left side - Logo and description */}
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-6 inline-block">
              <Image 
                src="/media/elnislogofooter.png" 
                alt="Elnis" 
                width={140}
                height={56}
                className="w-auto h-auto"
                priority
              />
            </Link>
            <p className="text-white/60 text-sm mb-4 max-w-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in libero justo. 
              Interdum et Phasellus in libero justo.
            </p>
            <p className="text-white/40 text-sm">
              @ELNIS, 2025
            </p>
          </div>
  
          {/* Middle - Recent Posts */}
          <div className="flex flex-col items-start">
            <h2 className="text-white text-xl font-medium mb-6">Naujausi straipsniai</h2>
            <div className="space-y-6">
              {posts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blogas/${post.slug}`}
                  className="group flex items-start gap-5 relative"
                >
                  {/* Starburst number */}
                  <div className="absolute -top-3 -left-3 w-7 h-7 flex items-center justify-center z-10">
                    <svg 
                      viewBox="0 0 512 512" 
                      className="absolute w-7 h-7" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="white"
                    >
                      <path d="M256 0l36 108 100-72-12 120 120-12-72 100 108 36-108 36 72 100-120-12 12 120-100-72-36 108-36-108-100 72 12-120-120 12 72-100-108-36 108-36-72-100 120 12-12-120 100 72 36-108z"/>
                    </svg>
                    <span className="relative z-10 text-black text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  
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
          </div>
  
          {/* Right side - Tag Cloud */}
          <div className="flex flex-col items-start">
            <h2 className="text-white text-xl font-medium mb-6">Žymų debesis</h2>
            <div className="flex flex-wrap gap-4">
              {tagCloudSection?.buttons?.map((button, index) => (
                <Link 
                  key={button.id || index} 
                  href={button.link}
                  className="flex justify-center"
                >
                  <div
                    className="flex items-center space-x-2 px-4 py-2 bg-white text-black border-2 border-black rounded-[20px] hover:scale-105 transition-all cursor-pointer whitespace-nowrap"
                    style={{
                      boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {/* Hexagon with contour */}
                    <div className="relative w-[12px] h-[12px] flex-shrink-0" style={{ transform: 'rotate(-15deg)' }}>
                      {/* Black contour */}
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundColor: 'black',
                          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                        }}
                      ></div>
                      {/* Colored hexagon */}
                      <div
                        className="absolute inset-[1px]"
                        style={{
                          backgroundColor: button.hexColor || "#FF5733",
                          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                        }}
                      ></div>
                    </div>

                    {/* Button Text */}
                    <span className="text-xs uppercase tracking-[0.2em] font-medium">
                      {button.text}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
  
};

export default FooterComponent;
