import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.match(/^\S+@\S+\.\S+$/)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    try {
      // Subscribe to Omnisend
      const response = await fetch('https://api.omnisend.com/v3/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': process.env.OMNISEND_API_KEY || '',
        },
        body: JSON.stringify({
          email: email,
          status: 'subscribed',
          source: 'Website Newsletter',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to subscribe');
      }

      return NextResponse.json(
        { message: 'Successfully subscribed to newsletter' },
        { status: 200 }
      );
    } catch (error: any) {
      console.error('Error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to subscribe to newsletter' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 