import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
}): Promise<Metadata> => {
  const { doc } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const serverUrl = getServerSideURL()
  const path = Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/'
  const fullUrl = `${serverUrl}${path}`

  const title = doc?.meta?.title
    ? doc?.meta?.title + ' | Payload Website Template'
    : 'Payload Website Template'

  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: doc?.meta?.description,
    url: fullUrl,
    ...(ogImage && {
      image: {
        '@type': 'ImageObject',
        url: ogImage,
      },
    }),
    ...(doc?.meta?.image && {
      thumbnailUrl: getImageURL(doc.meta.image),
    }),
  }

  return {
    metadataBase: new URL(serverUrl),
    title,
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: path,
    }),
    twitter: {
      card: 'summary_large_image',
      title,
      description: doc?.meta?.description || '',
      images: ogImage ? [ogImage] : undefined,
    },
    alternates: {
      canonical: fullUrl,
    },
    other: {
      'application/ld+json': JSON.stringify(structuredData),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }
}
