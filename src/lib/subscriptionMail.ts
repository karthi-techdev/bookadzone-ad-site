import nodemailer from 'nodemailer';

export async function sendSubscriptionEmail(userEmail: string) {
  try {
    // Log the configuration being used
    console.log('Subscription email config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE,
      user: process.env.SMTP_USER ? '***' : 'undefined',
    });

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Email content with modern, engaging design
    const mailOptions = {
      from: process.env.SMTP_FROM || '"BookAdZone" <noreply@bookadzone.com>',
      to: userEmail,
      subject: 'Welcome to BookAdZone Newsletter! 🎉',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0D0D0D; color: #FFFFFF; padding: 30px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #7F6AF7; margin-bottom: 10px;">Thanks for Subscribing!</h1>
            <p style="color: #98A9B8; font-size: 16px; line-height: 1.5;">
              Welcome to the BookAdZone community! You're now part of our growing network of outdoor advertising enthusiasts.
            </p>
          </div>

          <div style="background-color: #1A1A1A; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h2 style="color: #FFFFFF; font-size: 18px; margin-bottom: 15px;">What to Expect:</h2>
            <ul style="color: #98A9B8; list-style: none; padding: 0;">
              <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                ✨ Exclusive advertising opportunities
              </li>
              <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                🎯 Industry insights and trends
              </li>
              <li style="margin-bottom: 10px; padding-left: 20px; position: relative;">
                💡 Tips for effective outdoor advertising
              </li>
              <li style="padding-left: 20px; position: relative;">
                🎉 Special subscriber-only offers
              </li>
            </ul>
          </div>

          <div style="background-color: #7F6AF7; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 25px;">
            <p style="color: #FFFFFF; font-size: 16px; margin: 0;">
              Stay tuned for our platform launch - you'll be among the first to know!
            </p>
          </div>

          <div style="border-top: 1px solid #333333; padding-top: 20px; margin-top: 20px; text-align: center;">
            <p style="color: #98A9B8; font-size: 14px; margin-bottom: 5px;">
              Follow us on social media for more updates:
            </p>
            <div style="margin-top: 15px;">
              <a href="#" style="color: #7F6AF7; text-decoration: none; margin: 0 10px;">Twitter</a>
              <a href="#" style="color: #7F6AF7; text-decoration: none; margin: 0 10px;">LinkedIn</a>
              <a href="#" style="color: #7F6AF7; text-decoration: none; margin: 0 10px;">Instagram</a>
            </div>
          </div>

          <div style="margin-top: 30px; text-align: center; color: #98A9B8; font-size: 12px;">
            <p>BookAdZone - Revolutionizing Outdoor Advertising</p>
            <p style="margin-top: 5px;">
              Questions? Email us at 
              <a href="mailto:contact@bookadzone.com" style="color: #7F6AF7; text-decoration: none;">
                contact@bookadzone.com
              </a>
            </p>
          </div>
        </div>
      `,
    };

    // Send email
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
    // Return false instead of throwing to prevent the subscription process from failing
    return false;
  }
}