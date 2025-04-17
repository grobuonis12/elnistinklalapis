import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config: configPromise });
    const pages = await payload.find({
      collection: 'pages',
      depth: 1,
      where: {
        'layout.blockType': {
          equals: 'internalPage'
        }
      }
    });

    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { pageId, chatbot } = await request.json();
    
    if (!pageId || !chatbot) {
      return NextResponse.json(
        { error: 'Page ID and Chatbot are required' },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config: configPromise });
    const page = await payload.findByID({
      collection: 'pages',
      id: pageId,
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Update the specific internal page block with the chatbot
    const updatedPage = await payload.update({
      collection: 'pages',
      id: pageId,
      data: {
        layout: page.layout.map((block: any) => {
          if (block.blockType === 'internalPage') {
            return {
              ...block,
              chatbot,
            };
          }
          return block;
        }),
      },
    });

    return NextResponse.json(updatedPage);
  } catch (error) {
    console.error('Error updating page:', error);
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { pageId } = await request.json();
    
    if (!pageId) {
      return NextResponse.json(
        { error: 'Page ID is required' },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config: configPromise });
    const page = await payload.findByID({
      collection: 'pages',
      id: pageId,
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // Remove the chatbot from the internal page block
    const updatedPage = await payload.update({
      collection: 'pages',
      id: pageId,
      data: {
        layout: page.layout.map((block: any) => {
          if (block.blockType === 'internalPage') {
            const { chatbot, ...rest } = block;
            return rest;
          }
          return block;
        }),
      },
    });

    return NextResponse.json(updatedPage);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove chatbot' },
      { status: 500 }
    );
  }
} 