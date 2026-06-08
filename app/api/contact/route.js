import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { validateFields } from '@/lib/validate';

export async function POST(request) {
  try {
    const data = await request.json();
    const submission = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    };
    const validationError = validateFields(submission, {
      name: { required: true, max: 200, label: 'Name' },
      email: { required: true, max: 320, email: true, label: 'Email' },
      subject: { required: true, max: 200, label: 'Subject' },
      message: { required: true, max: 5000, label: 'Message' },
    });
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

    const db = getServiceClient();

    if (!db) {
      console.log('[Contact - no DB]', JSON.stringify(data, null, 2));
      return NextResponse.json({ success: true });
    }

    const { error } = await db.from('contacts').insert(submission);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send message.' }, { status: 500 });
  }
}
