'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import type { Header as HeaderType } from '@/payload-types'
import { SearchIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  const router = useRouter()

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    router.push(href);
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
