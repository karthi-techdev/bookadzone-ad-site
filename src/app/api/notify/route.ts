import { NextResponse } from 'next/server';
import { NotificationSignup } from '@/models/NotificationSignup';
import { connectToDatabase } from '@/lib/db';

export async function POST(request: Request) {
  try {
    // Debug database connection
    console.log('Attempting database connection with URI:', 
      process.env.MONGODB_URI ? 
      process.env.MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@') : 
      'Not set');
    
    // First connect to the database
    await connectToDatabase();
    
    const data = await request.json();
    
    // Enhanced validation
    const requiredFields = ['email', 'fullName', 'companyName', 'position', 'profileType'];
    const missingFields = requiredFields.filter(field => !data[field] || !data[field].trim());
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          error: 'Missing required fields',
          fields: missingFields
        },
        { status: 400 }
      );
    }

    // Check for existing email before attempting to save
    const existingSignup = await NotificationSignup.findOne({ 
      email: data.email.toLowerCase().trim() 
    }).exec();

    if (existingSignup) {
      return NextResponse.json(
        { error: 'This email is already registered for notifications' },
        { status: 409 }
      );
    }

    // Create new notification signup
    const notification = new NotificationSignup({
      fullName: data.fullName.trim(),
      companyName: data.companyName.trim(),
      position: data.position.trim(),
      email: data.email.toLowerCase().trim(),
      profileType: data.profileType,
    });

    // Save to database with validation
    await notification.save();

    try {
      // Import the sendNotificationEmail function
      const { sendNotificationEmail } = await import('@/lib/mail');
      
      // Send welcome email
      await sendNotificationEmail(
        notification.email,
        notification.fullName
      );

      return NextResponse.json({
        success: true,
        message: 'Successfully registered for notifications'
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Return success even if email fails, but log the error
      return NextResponse.json({
        success: true,
        message: 'Successfully registered for notifications',
        warning: 'Confirmation email could not be sent'
      });
    }
  } catch (error) {
    // Detailed error logging
    console.error('Error in notification signup:', {
      error,
      stack: error instanceof Error ? error.stack : undefined,
      message: error instanceof Error ? error.message : 'Unknown error'
    });

    // Handle Mongoose validation errors
    if (error instanceof Error && 'name' in error && error.name === 'ValidationError') {
      return NextResponse.json(
        { 
          error: 'Invalid form data',
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
      console.error('Database connection error:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
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
