import { Resend } from 'resend';

// Only initialize if API key is present to prevent breaking local dev if missing
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Determine sender domain. In testing, you often have to use a verified domain or onboarding@resend.dev
// Change this to your actual verified domain when ready (e.g. hello@popupco.com)
const SENDER_EMAIL = process.env.EMAIL_SENDER || 'PopUpCo <onboarding@resend.dev>';

// Admin email to receive notifications
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'hello@popupco.com';

/**
 * Helper to log or send email depending on environment configuration.
 */
async function sendEmail(payload) {
  if (!resend) {
    console.log('[Email Stub - No RESEND_API_KEY]', payload);
    return { success: true, stub: true };
  }

  try {
    const data = await resend.emails.send(payload);
    return { success: true, data };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error };
  }
}

/**
 * ── VENDOR EMAILS ──────────────────────────────────────────────
 */

export async function sendVendorWelcomeEmail(email, firstName) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #ea580c;">Welcome to PopUpCo!</h2>
      <p>Hi ${firstName},</p>
      <p>Thanks for expressing interest in joining PopUpCo's early access network.</p>
      <p>We are currently onboarding early vendors. We'll review your details and reach out to you as soon as we have a strong-fit opportunity that matches your category and setup needs.</p>
      <p>If you have any questions in the meantime, feel free to reply directly to this email.</p>
      <br />
      <p>Best,</p>
      <p>The PopUpCo Team</p>
    </div>
  `;

  return sendEmail({
    from: SENDER_EMAIL,
    to: email,
    subject: 'Welcome to PopUpCo Early Access',
    html,
  });
}

/**
 * ── HOST EMAILS ────────────────────────────────────────────────
 */

export async function sendHostWelcomeEmail(email, firstName, eventName) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #ea580c;">Host Request Received</h2>
      <p>Hi ${firstName},</p>
      <p>Thanks for submitting your host request for <strong>${eventName}</strong>.</p>
      <p>PopUpCo is currently in early access. We will review your event concept and vendor needs, and we'll be in touch shortly to discuss next steps and how we can help you organize the best possible pop-up.</p>
      <br />
      <p>Best,</p>
      <p>The PopUpCo Team</p>
    </div>
  `;

  return sendEmail({
    from: SENDER_EMAIL,
    to: email,
    subject: `PopUpCo Host Request: ${eventName}`,
    html,
  });
}

/**
 * ── VENUE EMAILS ───────────────────────────────────────────────
 */

export async function sendVenueWelcomeEmail(email, firstName, venueName) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #ea580c;">Venue Submission Received</h2>
      <p>Hi ${firstName},</p>
      <p>Thanks for submitting <strong>${venueName}</strong> to the PopUpCo network.</p>
      <p>We are always looking for great spaces for our hosts and vendors. We'll review your space's location, capacity, and amenities, and reach out to you when there is a matching pop-up concept looking for a home.</p>
      <br />
      <p>Best,</p>
      <p>The PopUpCo Team</p>
    </div>
  `;

  return sendEmail({
    from: SENDER_EMAIL,
    to: email,
    subject: `PopUpCo Venue Submission: ${venueName}`,
    html,
  });
}

/**
 * ── CONTACT EMAILS ─────────────────────────────────────────────
 */

export async function sendContactAutoReply(email, name) {
  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #ea580c;">We received your message!</h2>
      <p>Hi ${name},</p>
      <p>Thanks for reaching out to PopUpCo. We have received your message and our team will get back to you as soon as possible.</p>
      <br />
      <p>Best,</p>
      <p>The PopUpCo Team</p>
    </div>
  `;

  return sendEmail({
    from: SENDER_EMAIL,
    to: email,
    subject: 'We received your message',
    html,
  });
}

/**
 * ── ADMIN NOTIFICATIONS ────────────────────────────────────────
 */

export async function sendAdminNotification(subject, details) {
  // Convert details object to HTML list
  const detailsHtml = Object.entries(details)
    .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
    .join('');

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #1e293b;">New Submission: ${subject}</h2>
      <ul style="line-height: 1.6;">
        ${detailsHtml}
      </ul>
      <p style="margin-top: 20px; font-size: 12px; color: #666;">This is an automated notification from PopUpCo.</p>
    </div>
  `;

  return sendEmail({
    from: SENDER_EMAIL,
    to: ADMIN_EMAIL,
    subject: `[PopUpCo Admin] ${subject}`,
    html,
  });
}
