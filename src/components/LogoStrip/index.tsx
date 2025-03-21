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
  // Get the first logo if available
  const firstLogo = logos[0]?.logo;
  if (!firstLogo?.url) return null;

  return (
    <div id="logoStrip" className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <Image
          src={firstLogo.url}
          alt={firstLogo.alt || 'Logo'}
          width={1200}
          height={200}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
