import { NextResponse } from 'next/server';
import { Subscriber } from '@/models/Subscriber';
import { connectToDatabase } from '@/lib/db';

export async function POST(request: Request) {
  try {
    // First connect to the database
    await connectToDatabase();
    
    const data = await request.json();
    
    // Validate email
    if (!data.email || !data.email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const email = data.email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check for existing subscriber
    const existingSubscriber = await Subscriber.findOne({ email }).exec();

    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already subscribed' },
        { status: 409 }
      );
    }

    // Create new subscriber
    const subscriber = new Subscriber({
      email,
      subscriptionDate: new Date(),
    });

    // Save to database
    await subscriber.save();

    try {
      // Import the sendSubscriptionEmail function
      const { sendSubscriptionEmail } = await import('@/lib/subscriptionMail');
      
      // Send welcome email
      await sendSubscriptionEmail(email);

      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter'
      });
    } catch (emailError) {
      console.error('Failed to send subscription email:', emailError);
      // Return success even if email fails, but log the error
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter',
        warning: 'Confirmation email could not be sent'
      });
    }
  } catch (error) {
    console.error('Error in newsletter subscription:', {
      error,
      stack: error instanceof Error ? error.stack : undefined,
      message: error instanceof Error ? error.message : 'Unknown error'
    });

    // Handle Mongoose validation errors
    if (error instanceof Error && 'name' in error && error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          error: 'Invalid subscription data',
          details: error.message 
        },
        { status: 400 }
      );
    }

    // Handle MongoDB connection errors
    if (error instanceof Error && 
       (error.message.includes('MONGODB_URI') || 
        error.message.includes('connect') || 
        error.name === 'MongoError' ||
        error.name === 'MongoServerError')) {
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined
        },
        { status: 500 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { 
        error: 'Server error occurred',
        details: process.env.NODE_ENV === 'development' ? 
          (error instanceof Error ? error.message : String(error)) : 
          undefined
      },
      { status: 500 }
    );
  }
}