import nodemailer from 'nodemailer';

export async function sendSubscriptionEmail(userEmail: string) {
  try {
    // simple HTML escape for insertion into template
    const escapeHtml = (s: string) => String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#039;');

    // Use the email address prefix as a display name fallback (before the @)
    const displayName = String(userEmail).split('@')[0] || 'Subscriber';

    // Log config (masked) for debugging
    console.log('Subscription email config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER ? '***' : 'undefined',
    });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Reuse the same design used elsewhere (dark themed)
    const mailOptions = {
      from: process.env.SMTP_FROM || '"BookAdZone" <noreply@bookadzone.com>',
      to: userEmail,
      subject: 'Thanks for subscribing to BookAdZone',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to BookAdZone</title>
  <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600;700&display=swap" rel="stylesheet" />
</head>
<body style="margin:0; padding:0; background-color:#080411; color:#FFFFFF; font-family:'Urbanist', Arial, sans-serif;">
  <center style="width:100%; background-color:#080411; padding:30px 0;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; background-color:#080411; border-radius:16px;">
      <tr>
        <td align="center" style="padding:20px 30px;">
          <!-- Logo -->
          <img src="https://www.bookadzone.com/_next/static/media/bookadzone-logo.3e77d101.png" alt="BookAdZone Logo" width="180" style="display:block; margin-bottom:20px;" />
          <h1 style="font-size:26px; font-weight:700; color:#7F6AF7; margin:0;">We're Launching Soon!</h1>
          <p style="font-size:14px; color:#98A9B8; margin:10px 0 25px;">Be the first to know when we go live</p>
        </td>
      </tr>

      <tr>
        <td style="background-color:#0a0718; border:1px solid #98a9b882; border-radius:12px; padding:25px 20px;">
          <p style="font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:15px;">Hello ${escapeHtml(displayName)},</p>
          <p style="font-size:13px; color:#98A9B8; margin-bottom:12px; line-height:1.6;">
            Thank you for joining the Bookadzone newsletter. We'll share launch updates and useful insights.
          </p>
        </td>
      </tr>

      <tr>
        <td align="center" style="padding:30px 20px;">
          <a href="https://bookadzone.com" style="display:inline-block; background-color:#7F6AF7; color:#FFFFFF; text-decoration:none; padding:12px 32px; border-radius:30px; font-size:14px; font-weight:600;">
            Learn More About Bookadzone
          </a>
        </td>
      </tr>

      <tr>
        <td align="center" style="border-top:1px solid #98a9b882; padding:30px 20px;">
          <p style="color:#98A9B8; font-size:11px;">© 2025 Bookadzone. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Subscription confirmation email sent:', info.messageId);
    return true;
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error('Error sending subscription email:', {
      error: err.message,
      stack: err.stack,
      name: err.name,
      code: (error as Record<string, unknown>)?.code,
    });
    return false;
  }
}