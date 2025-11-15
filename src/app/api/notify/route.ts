import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectToDatabase } from '@/lib/db';
import { NotificationSignup } from '@/models/NotificationSignup';

// Type for location data from client
interface LocationData {
  city: string;
  region: string;
  country: string;
  isp: string;
  lat?: number;
  lon?: number;
}

// Email template for welcome message
const getWelcomeEmailTemplate = (name: string) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="format-detection" content="telephone=no" />
    <meta name="format-detection" content="date=no" />
    <meta name="format-detection" content="address=no" />
    <meta name="format-detection" content="email=no" />
    <title>Welcome to Bookadzone</title>
    <style type="text/css">
        .ExternalClass {width: 100%;}
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {line-height: 100%;}
        body, table, td, p, a, li, blockquote {-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}
        body {margin: 0; padding: 0;}
        table {border-spacing: 0;}
    </style>
</head>
<body bgcolor="#f4f4f4" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
    <div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
        Welcome to Bookadzone - Your journey to effective advertising begins here!
    </div>

    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%; background-color: #f4f4f4;">
        <tr>
            <td align="center" valign="top" style="padding: 20px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" class="wrapper" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                    <tr>
                        <td align="center" class="bg-[var(--light-dark-color)]" style="background-color: var(--light-dark-color); padding: 40px 20px; border-radius: 8px 8px 0 0;">
                            <img src="https://bookadzone.com/media/images/bookadzone-logo.png" alt="BookAdZone Logo" style="max-width: 200px; height: auto;">
                        </td>
                    </tr>

                    <tr>
                        <td bgcolor="#ffffff" style="padding: 40px 30px;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td style="padding-bottom: 20px; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                                        Hello <strong>${name}</strong>,
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 20px; font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333;">
                                        Thank you for signing up to be notified about BookAdZone's launch! We're excited to have you join our community of forward-thinking advertisers and publishers.
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                            <tr>
                                                <td style="font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding-bottom: 10px;">
                                                    As one of our early supporters, you'll be among the first to:
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0 0 20px 20px;">
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                                        <tr>
                                                            <td style="font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding: 5px 0;">
                                                                • Access our innovative advertising platform
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding: 5px 0;">
                                                                • Explore exclusive launch offers
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td style="font-family: Arial, sans-serif; font-size: 16px; line-height: 24px; color: #333333; padding: 5px 0;">
                                                                • Connect with industry leaders
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td align="center" style="padding: 30px 0;">
                                        <table border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="center" bgcolor="#7C3AED" style="border-radius: 4px;">
                                                    <a href="https://bookadzone.com" target="_blank" style="font-family: Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; padding: 15px 30px; border: 1px solid #7C3AED; display: inline-block; font-weight: bold;">Visit Our Website</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td bgcolor="#f8f9fa" style="padding: 20px 30px; border-radius: 0 0 8px 8px; border-top: 1px solid #dee2e6;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" style="font-family: Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666666;">
                                        <p style="margin: 0;">Follow us on 
                                            <a href="https://linkedin.com/company/bookadzone" style="color: #7C3AED; text-decoration: none;">LinkedIn</a> | 
                                            <a href="https://twitter.com/bookadzone" style="color: #7C3AED; text-decoration: none;">Twitter</a>
                                        </p>
                                        <p style="margin: 10px 0 0 0; font-size: 12px;">This email was sent to you because you signed up for BookAdZone launch notifications.</p>
                                        <p style="margin: 10px 0 0 0;">&copy; ${new Date().getFullYear()} Bookadzone. All rights reserved.</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;

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

    const { fullName, profileType, companyName, position, email, location } = data;

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

    // Prepare location data from client
    const clientLocation: LocationData = location || {
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown',
      isp: 'Unknown',
    };

    // Save to database with client location data
    console.log('Attempting to save notification signup...');
    const notificationSignup = new NotificationSignup({
      fullName,
      profileType,
      companyName,
      position,
      email: email.toLowerCase(),
      location: {
        city: clientLocation.city,
        region: clientLocation.region,
        country: clientLocation.country,
        isp: clientLocation.isp,
        lat: clientLocation.lat,
        lon: clientLocation.lon,
      },
      ipAddress: 'Client-based', // Indicate this is from client
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
