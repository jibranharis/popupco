import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    if (body.action === 'login') {
      const password = process.env.ADMIN_PASSWORD || 'admin123';
      if (body.password === password) {
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (body.action === 'fetch') {
      // TODO: Connect to a real database.
      // For now return empty arrays so the admin page renders.
      return NextResponse.json({
        success: true,
        data: { vendors: [], venues: [], contacts: [] },
      });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Admin error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
