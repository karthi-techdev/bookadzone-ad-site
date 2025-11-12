import nodemailer from 'nodemailer';

export async function sendNotificationEmail(userEmail: string, userName: string) {
  try {
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

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || '"BookAdZone" <noreply@bookadzone.com>',
      to: userEmail,
      subject: 'Welcome to BookAdZone - Launch Notification Registration',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7F6AF7;">Welcome to BookAdZone!</h2>
          <p>Hello ${userName},</p>
          <p>Thank you for registering to receive updates about our launch. We're thrilled to have you on board!</p>
          <p>You'll be among the first to know when we launch our platform.</p>
          <div style="margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 5px;">
            <p style="margin: 0; color: #666;">What's next?</p>
            <ul style="color: #666;">
              <li>You'll receive exclusive updates about our launch</li>
              <li>Get early access to special features</li>
              <li>Be the first to know about promotional offers</li>
            </ul>
          </div>
          <p>Stay tuned for more updates!</p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">Best regards,<br>The BookAdZone Team</p>
        </div>
      `,
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