import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';
import { validateFields } from '@/lib/validate';
import { sendContactAutoReply, sendAdminNotification } from '@/lib/email';

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

    if (db) {
      const { error } = await db.from('contacts').insert(submission);
      if (error) {
        console.error('Failed to insert contact into DB:', error);
      }
    } else {
      console.log('[Contact - no DB configured]', JSON.stringify(submission, null, 2));
    }

    // Send emails (non-blocking)
    const firstName = submission.name?.split(' ')[0] || 'there';
    Promise.all([
      sendContactAutoReply(submission.email, firstName),
      sendAdminNotification(`New Contact Message: ${submission.subject}`, {
        Name: submission.name,
        Email: submission.email,
        Message: submission.message,
      })
    ]).catch((err) => console.error('Failed to send notification emails', err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send message.' }, { status: 500 });
  }
}
