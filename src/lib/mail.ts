import nodemailer from 'nodemailer';

export async function sendNotificationEmail(userEmail: string, userName: string) {
  try {
    // simple HTML escape for insertion into template
    const escapeHtml = (s: string) => String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#039;');

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content using the provided dark-styled template
    const mailOptions = {
      from: process.env.SMTP_FROM || '"BookAdZone" <noreply@bookadzone.com>',
      to: userEmail,
      subject: 'Welcome to BookAdZone - Launch Notification Registration',
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

      <!-- Highlight Box -->
      <tr>
        <td style="background-color:#0a0718; border:1px solid #98a9b882; border-radius:12px; padding:25px 20px;">
          <p style="font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:15px;">Hello ${escapeHtml(userName || '')},</p>
          <p style="font-size:13px; color:#98A9B8; margin-bottom:12px; line-height:1.6;">
            Thank you for joining the Bookadzone waitlist! We're thrilled to have you on board as we prepare to revolutionize outdoor advertising.
          </p>
          <p style="font-size:13px; color:#98A9B8; margin-bottom:20px; line-height:1.6;">
            You've taken the first step toward simplifying your ad space booking process, and we can't wait to show you how BookAdZone will transform the way you manage billboards, digital screens, and hoardings.
          </p>

          <!-- Features -->
          <table width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;">
            <tr>
              <td style="padding-bottom:10px;">
                <span style="color:#7F6AF7; font-weight:bold;">✓</span>
                <span style="color:#FFFFFF; font-weight:600;"> Instant Booking</span><br>
                <span style="font-size:12px; color:#98A9B8;">Book premium outdoor ad spaces in minutes, not weeks</span>
              </td>
            </tr>
            <tr>
              <td style="padding-bottom:10px;">
                <span style="color:#7F6AF7; font-weight:bold;">✓</span>
                <span style="color:#FFFFFF; font-weight:600;"> Real-Time Availability</span><br>
                <span style="font-size:12px; color:#98A9B8;">See which ad spaces are available right now across multiple locations</span>
              </td>
            </tr>
            <tr>
              <td>
                <span style="color:#7F6AF7; font-weight:bold;">✓</span>
                <span style="color:#FFFFFF; font-weight:600;"> Transparent Pricing</span><br>
                <span style="font-size:12px; color:#98A9B8;">No hidden fees with clear, upfront costs for all ad spaces</span>
              </td>
            </tr>
          </table>

          <p style="font-size:13px; color:#98A9B8; margin-top:10px; line-height:1.6;">
            We're working hard to launch Bookadzone and will notify you as soon as we're live. Keep an eye on your inbox for exclusive previews and early access.
          </p>
        </td>
      </tr>

      <!-- CTA Button -->
      <tr>
        <td align="center" style="padding:30px 20px;">
          <a href="https://bookadzone.com" style="display:inline-block; background-color:#7F6AF7; color:#FFFFFF; text-decoration:none; padding:12px 32px; border-radius:30px; font-size:14px; font-weight:600;">
            Learn More About Bookadzone
          </a>
        </td>
      </tr>

      <!-- Stats -->
      <tr>
        <td align="center" style="background-color:#ffffff1f; padding:15px 10px;">
          <p style="font-size:12px; color:#98A9B8; margin:0;">
            Join <span style="color:#7F6AF7; font-weight:600;">356 Advertisers</span> and 
            <span style="color:#7F6AF7; font-weight:600;">127 Agencies</span> who have already subscribed
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" style="border-top:1px solid #98a9b882; padding:30px 20px;">
          <table cellspacing="0" cellpadding="0" border="0">
            <tr>
              <td align="center" style="padding:0 5px;">
                <a href="https://facebook.com" style="display:inline-block; background-color:#7F6AF7; width:36px; height:36px; border-radius:50%; text-align:center;">
                  <img src="https://img.icons8.com/?size=100&id=118466&format=png&color=FFFFFF" alt="Facebook" width="18" height="18" style="margin-top:9px;" />
                </a>
              </td>
              <td align="center" style="padding:0 5px;">
                <a href="https://twitter.com" style="display:inline-block; background-color:#7F6AF7; width:36px; height:36px; border-radius:50%; text-align:center;">
                  <img src="https://img.icons8.com/?size=100&id=YfCbGWCWcuar&format=png&color=FFFFFF" alt="X" width="18" height="18" style="margin-top:9px;" />
                </a>
              </td>
              <td align="center" style="padding:0 5px;">
                <a href="https://instagram.com" style="display:inline-block; background-color:#7F6AF7; width:36px; height:36px; border-radius:50%; text-align:center;">
                  <img src="https://img.icons8.com/?size=100&id=85140&format=png&color=FFFFFF" alt="Instagram" width="18" height="18" style="margin-top:9px;" />
                </a>
              </td>
              <td align="center" style="padding:0 5px;">
                <a href="https://linkedin.com" style="display:inline-block; background-color:#7F6AF7; width:36px; height:36px; border-radius:50%; text-align:center;">
                  <img src="https://img.icons8.com/?size=100&id=8808&format=png&color=FFFFFF" alt="LinkedIn" width="18" height="18" style="margin-top:9px;" />
                </a>
              </td>
            </tr>
          </table>

          <p style="margin:20px 0 10px; color:#98A9B8; font-size:12px;">
            <a href="#" style="color:#98A9B8; text-decoration:none; margin:0 5px;">Home</a> •
            <a href="#" style="color:#98A9B8; text-decoration:none; margin:0 5px;">Features</a> •
            <a href="#" style="color:#98A9B8; text-decoration:none; margin:0 5px;">How It Works</a> •
            <a href="#" style="color:#98A9B8; text-decoration:none; margin:0 5px;">FAQ</a> •
            <a href="mailto:contact@bookadzone.com" style="color:#98A9B8; text-decoration:none; margin:0 5px;">Contact</a>
          </p>

          <p style="color:#98A9B8; font-size:11px; margin-top:10px;">© 2025 Bookadzone. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    // Return false instead of throwing to prevent the whole registration from failing
    return false;
  }
}