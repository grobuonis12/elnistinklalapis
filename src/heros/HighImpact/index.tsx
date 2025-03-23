'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]"
      data-theme="dark"
    >
      <div className="container px-4 sm:px-6 lg:px-8 mb-8 z-10 relative flex items-center justify-center">
        <div className="w-full max-w-[36.5rem] text-center">
          {richText && (
            <RichText 
              className="mb-6 mobile-text text-shadow-sm" 
              data={richText} 
              enableGutter={false} 
            />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              {links.map(({ link }, i) => {
                return (
                  <li key={i} className="w-full sm:w-auto">
                    <CMSLink 
                      {...link} 
                      className="w-full sm:w-auto touch-target-min mobile-tap-highlight block text-center"
                    />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="absolute inset-0 select-none">
        {media && typeof media === 'object' && (
          <Media 
            fill 
            imgClassName="-z-10 object-cover brightness-75" 
            priority 
            resource={media} 
          />
        )}
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>
    </div>
  )
} 