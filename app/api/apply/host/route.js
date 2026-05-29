import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log('[Host Application]', JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Host application error:', error);
    return NextResponse.json({ success: false, error: 'Failed to submit host request.' }, { status: 500 });
  }
}
