import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import LogoStripComponent from '@/components/LogoStrip'
import TestimonialSlider from '@/components/Testimonials/TestimonialSlider'
import KontaktaiComponent from '@/components/KontaktaiComponent'
import WelcomeBlockComponent from '@/components/WelcomeBackComponent'
import InternalPageComponent from '@/components/InternalPageComponent'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

type PageType = RequiredDataFromCollectionSlug<'pages'> & {
  logos?: Array<{
    logo: {
      url: string;
      alt?: string;
    }
  }>;
}

type BlockType = {
  blockType: string;
  [key: string]: any;
}

type PageRendererProps = {
  pageData: {
    layout: BlockType[];
  };
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: PageType | null

  page = await queryPageBySlug({
    slug,
  })
  
  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { layout, logos } = page

  return (
    <article className="pb-24">
      <PageClient />
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={layout} />
      <LogoStripComponent logos={logos || []} />
      <PageRenderer pageData={{ layout }} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      layout: true,
      logos: true, 
    },
  })

  return result.docs?.[0] || null
})

// rodymui

export function PageRenderer({ pageData }: PageRendererProps) {
  return (
    <div>
      {pageData.layout.map((block: BlockType, index: number) => {
        switch (block.blockType) {
          case "logoStrip":
            return <LogoStripComponent key={index} logos={block.logos} />;
          case "testimonials":
            return <TestimonialSlider key={index} testimonials={block.testimonials} />;
          case "kontaktai":
            return <KontaktaiComponent companyName={''} companyCode={''} vatCode={''} bankAccount={''} bankName={''} phone={''} email={''} key={index} {...block} />;
          case "welcomeBlock":
            return <WelcomeBlockComponent key={index} title={block.title || ''} buttons={block.buttons || []} {...block} />;
          case "internalPage":
            return <InternalPageComponent key={index} title={block.title} description={block.description} embedForm={block.embedForm} />;
          default:
            return null;
        }
      })}
    </div>
  );
}