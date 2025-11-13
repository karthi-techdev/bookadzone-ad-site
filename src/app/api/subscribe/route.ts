import { NextResponse } from 'next/server';
import Subscriber from '@/models/Subscriber';
import { connectToDatabase } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email format
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Check if email already exists
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json(
        { success: false, error: 'This email is already subscribed' },
        { status: 409 }
      );
    }

    // Create new subscriber
    const subscriber = new Subscriber({ email });
    await subscriber.save();

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed!' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}