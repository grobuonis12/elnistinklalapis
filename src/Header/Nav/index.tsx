'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    window.location.href = href;
  };

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        const href = link?.url || '/';
        return (
          <a
            key={i}
            href={href}
            onClick={(e) => handleLinkClick(e, href)}
            className="text-black hover:text-gray-600 transition-colors duration-200 text-base py-2 touch-target-min font-bold tracking-wider"
          >
            {link?.label}
          </a>
        );
      })}
      <a 
        href="/search"
        onClick={(e) => handleLinkClick(e, '/search')}
        className="text-black hover:text-gray-600 transition-colors duration-200"
      >
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </a>
    </nav>
  )
}
