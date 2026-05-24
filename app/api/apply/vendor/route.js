import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    // TODO: Replace with a real database (Vercel Postgres, Supabase, etc.)
    // For now, log the submission and return success so the site can be shared.
    console.log('[Vendor Application]', JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Vendor application error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit application.' }, { status: 500 });
  }
}
