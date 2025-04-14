"use client";

import React from 'react';
import Image from 'next/image';

interface LogoStripProps {
  logos?: Array<{
    logo: {
      url: string;
      alt?: string;
    }
  }>;
}

export default function LogoStrip({ logos = [] }: LogoStripProps) {
  const firstLogo = logos[0]?.logo;
  if (!firstLogo?.url) return null;

  return (
    <div id="logoStrip" className="w-full bg-white py-4 overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        <div className="animate-marquee whitespace-nowrap flex">
          {/* First set of logos */}
          <div className="inline-flex min-w-fit mr-48">
            <Image
              src={firstLogo.url}
              alt={firstLogo.alt || 'Logos'}
              width={3000}
              height={50}
              className="h-[50px] w-auto object-contain"
              style={{ minWidth: 'max-content' }}
              priority
            />
          </div>
          
          {/* antras logo png */}
          <div className="inline-flex min-w-fit mr-48">
            <Image
              src={firstLogo.url}
              alt={firstLogo.alt || 'Logos'}
              width={3000}
              height={50}
              className="h-[50px] w-auto object-contain"
              style={{ minWidth: 'max-content' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
