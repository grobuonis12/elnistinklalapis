import { cn } from '@/utilities/ui'
import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

import { CMSLink } from '../../components/Link'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns } = props

  const colsSpanClasses = {
    full: '12',
    half: '6',
    oneThird: '4',
    twoThirds: '8',
  }

  return (
    <div className="container px-4 sm:px-6 lg:px-8 my-8 sm:my-12 lg:my-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-y-6 sm:gap-y-8 lg:gap-y-12 gap-x-6 sm:gap-x-8 lg:gap-x-16">
        {columns &&
          columns.length > 0 &&
          columns.map((col, index) => {
            const { enableLink, link, richText, size } = col

            return (
              <div
                className={cn(
                  'col-span-1',
                  {
                    'sm:col-span-2 lg:col-span-12': size === 'full',
                    'lg:col-span-6': size === 'half',
                    'lg:col-span-4': size === 'oneThird',
                    'lg:col-span-8': size === 'twoThirds',
                  },
                )}
                key={index}
              >
                {richText && (
                  <RichText 
                    data={richText} 
                    enableGutter={false}
                    className="mobile-text"
                  />
                )}

                {enableLink && (
                  <div className="mt-4">
                    <CMSLink 
                      {...link} 
                      className="touch-target-min mobile-tap-highlight inline-block"
                    />
                  </div>
                )}
              </div>
            )
          })}
      </div>
    </div>
  )
}
