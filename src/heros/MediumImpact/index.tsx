import React from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const MediumImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mobile-safe-area">
      <div className="container mb-6 sm:mb-8">
        {richText && (
          <RichText 
            className="mb-6 mobile-text" 
            data={richText} 
            enableGutter={false} 
          />
        )}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6">
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
      <div className="container">
        {media && typeof media === 'object' && (
          <div className="rounded-lg sm:rounded-xl overflow-hidden">
            <Media
              className="-mx-4 sm:-mx-0"
              imgClassName="w-full"
              priority
              resource={media}
            />
            {media?.caption && (
              <div className="mt-3 px-4 sm:px-0">
                <RichText 
                  data={media.caption} 
                  enableGutter={false}
                  className="mobile-text text-sm sm:text-base text-gray-600"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
