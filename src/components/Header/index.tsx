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
      className="text-black hover:text-gray-600 transition-colors duration-200 text-xs uppercase tracking-wider"
    >
      {children}
    </Link>
  );
};

export default function Header() {
  const [showNotification, setShowNotification] = useState(true);
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

  return (
    <>
      {showNotification && (
        <div className="w-full bg-pink-400 text-center py-1 text-xs relative">
          <span>Pasinaudokite skaičiuokle ir sužinokite savo projekto kainą.</span>
          <button 
            onClick={() => setShowNotification(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-sm hover:opacity-75"
          >
            &times;
          </button>
        </div>
      )}
      <header className="w-full bg-white border-t border-b border-black mb-0">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Kairės pusės navigacijos elementai */}
            <div className="flex space-x-6">
              <NavLink href="#atsiliepimai">Atsiliepimai</NavLink>
              <NavLink href="/projektai">Projektai</NavLink>
              <NavLink href="#musu-klientai">Mūsų klientai</NavLink>
            </div>

            {/* Logotipas */}
            <div className="flex-shrink-0">
              <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
                <Image
                  src="/media/elnislogoheader.png"
                  alt="Elnis"
                  width={80}
                  height={30}
                  className="w-auto h-auto"
                  priority
                />
              </Link>
            </div>

            {/* Dešinės pusės navigacijos elementai */}
            <div className="flex space-x-6">
              <NavLink href="#kontaktai">Kontaktai</NavLink>
              <NavLink href="/blogas">Blogas</NavLink>
              <NavLink href="/klausimai">Klausimai</NavLink>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
} 