import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectToDatabase } from '@/lib/db';
import { NotificationSignup } from '@/models/NotificationSignup';

// Email template for welcome message (dark themed design)
const escapeHtml = (s: string) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/\"/g, '&quot;')
  .replace(/'/g, '&#039;');

const getWelcomeEmailTemplate = (name: string) => `<!DOCTYPE html>
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
          <p style="font-size:16px; font-weight:600; color:#FFFFFF; margin-bottom:15px;">Hello ${escapeHtml(name || '')},</p>
          <p style="font-size:13px; color:#98A9B8; margin-bottom:12px; line-height:1.6;">
            Thank you for joining the Bookadzone waitlist! We're thrilled to have you on board as we prepare to revolutionize outdoor advertising.
          </p>
          <p style="font-size:13px; color:#98A9B8; margin-bottom:20px; line-height:1.6;">
            You've taken the first step toward simplifying your ad space booking process, and we can't wait to show you how BookAdZone will transform the way you manage billboards, digital screens, and hoardings.
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
          <p style="color:#98A9B8; font-size:11px;">© ${new Date().getFullYear()} Bookadzone. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received form data:', data);
    
    const { fullName, profileType, companyName, position, email } = data;

    // Basic validation
    if (!fullName || !profileType || !companyName || !position || !email) {
      console.error('Missing required fields:', { fullName, profileType, companyName, position, email });
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    console.log('Attempting to connect to MongoDB...');
    await connectToDatabase();
    console.log('Successfully connected to MongoDB');

    // Check if email already exists
    const existingSignup = await NotificationSignup.findOne({ email: email.toLowerCase() });
    if (existingSignup) {
      return NextResponse.json(
        { error: 'This email is already registered for notifications' },
        { status: 409 }
      );
    }

    // Save to database
    console.log('Attempting to save notification signup...');
    const notificationSignup = new NotificationSignup({
      fullName,
      profileType,
      companyName,
      position,
      email: email.toLowerCase()
    });

    const savedSignup = await notificationSignup.save();
    console.log('Successfully saved to database:', savedSignup);

    // Send welcome email
    console.log('Sending welcome email...');
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@bookadzone.com',
      to: email,
      subject: 'Welcome to BookAdZone!',
      html: getWelcomeEmailTemplate(fullName),
    });
    console.log('Welcome email sent successfully');

    return NextResponse.json(
      { 
        message: 'Successfully registered for notifications',
        data: savedSignup
      },
      { status: 200 }
    );
    } catch (error: unknown) {
        // Normalize unknown error to an Error instance
        const err = error instanceof Error ? error : new Error(String(error));

            console.error('Detailed error in notification signup:', {
                message: err.message,
                stack: err.stack,
                name: err.name
            });

        // Return more specific error messages
        if (err.name === 'ValidationError') {
            return NextResponse.json(
                { error: 'Validation failed', details: err.message },
                { status: 400 }
            );
        } else if (err.name === 'MongoError' || err.name === 'MongoServerError') {
            return NextResponse.json(
                { error: 'Database error', details: err.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to process signup', details: err.message },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectToDatabase();

        // Defaults requested by the UI
        const defaultAdvertisers = 356;
        const defaultAgencies = 127;

        // Aggregate counts from NotificationSignup collection
        const advertisersCount = await NotificationSignup.countDocuments({ profileType: 'Advertiser' });
        const agenciesCount = await NotificationSignup.countDocuments({ profileType: 'Agency' });

        return NextResponse.json({
            advertisers: defaultAdvertisers + (advertisersCount || 0),
            agencies: defaultAgencies + (agenciesCount || 0),
        }, { status: 200 });
    } catch (error: unknown) {
        const err = error instanceof Error ? error : new Error(String(error));
        console.error('Failed to get notify counts:', err.message);
        // Return defaults if DB unavailable
        return NextResponse.json({ advertisers: 356, agencies: 127 }, { status: 200 });
    }
}