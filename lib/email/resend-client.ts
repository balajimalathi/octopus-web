import { Resend } from 'resend';

// TODO: Email integration will be added later
// For now, create a stub client that won't throw errors

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@octopus.com';
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Octopus';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * Stub email sending function
 * TODO: Replace with actual implementation when integrating emails
 */
export async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend) {
    console.log('[STUB] sendEmail:', params.subject, 'to:', params.to);
    return { id: 'stub-email-id' };
  }

  return resend.emails.send({
    from: FROM_EMAIL,
    ...params,
  });
}
