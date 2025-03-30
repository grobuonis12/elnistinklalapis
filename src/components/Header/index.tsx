"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utilities/ui';
import { usePathname, useRouter } from 'next/navigation';

// Komponentas navigacijos nuorodoms
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    // If it's not a section link, just navigate normally
    if (!href.startsWith('#')) {
      router.push(href);
      return;
    }
    
    // Get the section ID without the #
    const sectionId = href === '#atsiliepimai' ? 'atsiliepimai' :
                     href === '#musu-klientai' ? 'logoStrip' :
                     href === '#kontaktai' ? 'kontaktai' : '';
    
    // If we're not on the home page, navigate there first
    if (pathname !== '/') {
      // Store the target section in sessionStorage
      sessionStorage.setItem('scrollTarget', sectionId);
      router.push('/');
      return;
    }
    
    // If we're already on the home page, just scroll
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Link 
      href={href} 
      onClick={handleClick}
      className="text-black hover:text-gray-600 transition-colors duration-200 text-base py-2 touch-target-min font-bold tracking-wider"
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const [showNotification, setShowNotification] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll to section when navigating from another page
  useEffect(() => {
    if (pathname === '/') {
      // First, ensure we're at the top of the page
      window.scrollTo(0, 0);

      // Check for stored scroll target
      const scrollTarget = sessionStorage.getItem('scrollTarget');
      if (scrollTarget) {
        // Clear the stored target
        sessionStorage.removeItem('scrollTarget');
        
        // Add a delay to ensure the page is loaded and we start from the top
        setTimeout(() => {
          const section = document.getElementById(scrollTarget);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500); // Increased delay to ensure smooth transition
      }
    }
  }, [pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {showNotification && (
        <div className="w-full bg-pink-400 text-center py-2 text-sm relative">
          <span>Pasinaudokite skaičiuokle ir sužinokite savo projekto kainą.</span>
          <button 
            onClick={() => setShowNotification(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-lg p-2 hover:opacity-75 touch-target-min"
          >
            &times;
          </button>
        </div>
      )}
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
              <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
                <Image
                  src="/media/elnislogoheader.png"
                  alt="Elnis"
                  width={100}
                  height={40}
                  className="w-[125px] h-[37px]"
                  priority
                />
              </Link>
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