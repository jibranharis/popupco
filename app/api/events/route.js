import { NextResponse } from 'next/server';
import { PLACEHOLDER_EVENTS } from '@/lib/data';

export async function GET() {
  try {
    return NextResponse.json({ data: PLACEHOLDER_EVENTS });
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}
