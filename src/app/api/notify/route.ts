import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { connectToDatabase } from '@/lib/db';
import { NotificationSignup } from '@/models/NotificationSignup';
import axios from 'axios';

// ---------- Utility: Escape HTML ----------
const escapeHtml = (s: string) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#039;');

// ---------- Email Template ----------
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
          <img src="https://www.bookadzone.com/_next/static/media/bookadzone-logo.3e77d101.png" alt="BookAdZone Logo" width="180" style="display:block; margin-bottom:20px;" />
          <h1 style="font-size:26px; font-weight:700; color:#7F6AF7; margin:0;">We're Launching Soon!</h1>
          <p style="font-size:14px; color:#98A9B8; margin:10px 0 25px;">Be the first to know when we go live</p>
        </td>
      </tr>

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

      <tr>
        <td align="center" style="padding:30px 20px;">
          <a href="https://bookadzone.com" style="display:inline-block; background-color:#7F6AF7; color:#FFFFFF; text-decoration:none; padding:12px 32px; border-radius:30px; font-size:14px; font-weight:600;">
            Learn More About Bookadzone
          </a>
        </td>
      </tr>

      <tr>
        <td align="center" style="background-color:#ffffff1f; padding:15px 10px;">
          <p style="font-size:12px; color:#98A9B8; margin:0;">
            Join <span style="color:#7F6AF7; font-weight:600;">356 Advertisers</span> and 
            <span style="color:#7F6AF7; font-weight:600;">127 Agencies</span> who have already subscribed
          </p>
        </td>
      </tr>

      <tr>
        <td align="center" style="border-top:1px solid #98a9b882; padding:30px 20px;">
          <p style="color:#98A9B8; font-size:11px;">© ${new Date().getFullYear()} Bookadzone. All rights reserved.</p>
        </td>
      </tr>
    </table>
  </center>
</body>
</html>`;

// ---------- Email Transporter ----------
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

// ---------- Get Client IP (Vercel/Cloudflare) ----------
const getClientIp = (request: Request): string => {
  const headers = request.headers;
  return (
    headers.get('cf-connecting-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    headers.get('x-real-ip') ||
    'unknown'
  );
};

// ---------- Get Location from IP (Server-Side) ----------
interface ILocation {
  city: string;
  region: string;
  country: string;
  isp?: string;
  lat?: number;
  lon?: number;
}

const getLocationFromIp = async (ip: string): Promise<ILocation> => {
  if (!ip || ip === 'unknown' || ip.startsWith('127.') || ip === '::1') {
    return { city: 'Localhost', country: 'Local', region: 'Local' };
  }

  try {
    const { data } = await axios.get(`http://ip-api.com/json/${ip}?fields=status,city,regionName,country,isp,lat,lon`);
    if (data.status === 'success') {
      return {
        city: data.city || 'Unknown',
        region: data.regionName || 'Unknown',
        country: data.country || 'Unknown',
        isp: data.isp || 'Unknown',
        lat: data.lat,
        lon: data.lon,
      };
    }
  } catch (err: unknown) {
  const error = err instanceof Error ? err : new Error(String(err));
  console.warn("GeoIP lookup failed:", error.message);
}


  return { city: 'Unknown', country: 'Unknown', region: 'Unknown' };
};

// ========== POST: Handle Signup ==========
export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log('Received form data:', data);

    const { fullName, profileType, companyName, position, email, clientLocation } = data;

    // --- Validation ---
    if (!fullName || !profileType || !companyName || !position || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // --- Connect to DB ---
    await connectToDatabase();

    // --- Check duplicate ---
    const existingSignup = await NotificationSignup.findOne({ email: email.toLowerCase() });
    if (existingSignup) {
      return NextResponse.json(
        { error: 'This email is already registered for notifications' },
        { status: 409 }
      );
    }

    // --- Get IP & Location ---
    const ipAddress = getClientIp(request);
    const serverLocation = await getLocationFromIp(ipAddress);

    // Prefer client location if valid
    const finalLocation: ILocation =
      clientLocation?.city && clientLocation.city !== 'Unknown'
        ? clientLocation
        : serverLocation;

    // --- Save to DB ---
    const notificationSignup = new NotificationSignup({
      fullName: fullName.trim(),
      profileType,
      companyName: companyName.trim(),
      position: position.trim(),
      email: email.toLowerCase().trim(),
      ipAddress,
      location: finalLocation,
      status: 'active',
      isDeleted: false,
    });

    const savedSignup = await notificationSignup.save();
    console.log('Saved with location:', savedSignup);

    // --- Send Email ---
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@bookadzone.com',
      to: email,
      subject: 'Welcome to BookAdZone!',
      html: getWelcomeEmailTemplate(fullName),
    });

    return NextResponse.json(
      {
        message: 'Successfully registered for notifications',
        data: savedSignup,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error('Signup error:', {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });

    if (err.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation failed', details: err.message },
        { status: 400 }
      );
    }

    if (err.name === 'MongoError' || err.name === 'MongoServerError') {
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

// ========== GET: Return Counts ==========
export async function GET() {
  try {
    await connectToDatabase();

    const defaultAdvertisers = 356;
    const defaultAgencies = 127;

    const advertisersCount = await NotificationSignup.countDocuments({ profileType: 'Advertiser' });
    const agenciesCount = await NotificationSignup.countDocuments({ profileType: 'Agency' });

    return NextResponse.json(
      {
        advertisers: defaultAdvertisers + (advertisersCount || 0),
        agencies: defaultAgencies + (agenciesCount || 0),
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Failed to get counts:', error);
    return NextResponse.json(
      { advertisers: 356, agencies: 127 },
      { status: 200 }
    );
  }
}