import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    // TODO: Replace with a real database (Vercel Postgres, Supabase, etc.)
    console.log('[Contact Message]', JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send message.' }, { status: 500 });
  }
}
