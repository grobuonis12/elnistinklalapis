"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import { usePathname, useRouter } from 'next/navigation';

// Komponentas navigacijos nuorodoms
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const pathname = usePathname();
  
  // For section links, we need to handle them differently
  if (href.startsWith('#')) {
    const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      
      // Get the section ID without the #
      const sectionId = href === '#atsiliepimai' ? 'atsiliepimai' :
                       href === '#musu-klientai' ? 'logoStrip' :
                       href === '#kontaktai' ? 'kontaktai' : '';
      
      // If we're not on the home page, navigate there first
      if (pathname !== '/') {
        // Store the target section in sessionStorage
        sessionStorage.setItem('scrollTarget', sectionId);
        // Use window.location for hard navigation to home page
        window.location.href = '/';
        return;
      }
      
      // If we're already on the home page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        // Add a small delay to ensure smooth scrolling
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };

    return (
      <Link 
        href={href} 
        onClick={handleSectionClick}
        className="text-black hover:text-gray-600 transition-colors duration-200 text-base py-2 touch-target-min font-bold tracking-wider"
      >
        {children}
      </Link>
    );
  }
  
  // For regular links, use standard Next.js Link with prefetch
  return (
    <Link 
      href={href} 
      prefetch={true}
      className="text-black hover:text-gray-600 transition-colors duration-200 text-base py-2 touch-target-min font-bold tracking-wider"
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Handle logo click
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate there
    if (pathname !== '/') {
      window.location.href = '/';
      return;
    }
    
    // If we're already on the home page, scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="w-full bg-white border-t-2 border-b-2 border-black">
        <nav className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Mobile menu button */}
            <div className="md:hidden self-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 touch-target-min"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-0.5 bg-black mb-1.5"></div>
                <div className="w-6 h-0.5 bg-black mb-1.5"></div>
                <div className="w-6 h-0.5 bg-black"></div>
              </button>
            </div>

            {/* Left navigation elements - hidden on mobile */}
            <div className="hidden md:flex flex-1 justify-end pr-8 items-center">
              <div className="mt-2">
                <NavLink href="#kontaktai">Kontaktai</NavLink>
              </div>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <a 
                href="/"
                onClick={handleLogoClick}
                className="hover:opacity-80 transition-opacity duration-200"
                aria-label="Go to homepage"
              >
                <Image
                  src="/media/elnislogos/headerlogo.png"
                  alt="Elnis Logo"
                  width={120}
                  height={40}
                  className="w-auto h-10"
                  priority
                />
              </a>
            </div>

            {/* Right navigation elements - hidden on mobile */}
            <div className="hidden md:flex flex-1 justify-start pl-8 items-center">
              <div className="mt-2">
                <NavLink href="/blogas">Blogas</NavLink>
              </div>
            </div>

            {/* Empty div to maintain layout on mobile */}
            <div className="md:hidden w-10 self-center"></div>
          </div>

          {/* Mobile menu panel */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t-2 border-black">
              <div className="py-2 space-y-1">
                <div className="block px-3 py-2">
                  <NavLink href="#kontaktai">Kontaktai</NavLink>
                </div>
                <div className="block px-3 py-2">
                  <NavLink href="/blogas">Blogas</NavLink>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>
    </>
  );
} 