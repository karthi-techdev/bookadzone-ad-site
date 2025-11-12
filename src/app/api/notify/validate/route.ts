import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const errors: { [key: string]: string } = {};

    // Validate required fields
    const requiredFields = ['fullName', 'companyName', 'position', 'email', 'profileType'];
    requiredFields.forEach(field => {
      if (!data[field] || data[field].trim() === '') {
        errors[field] = `${field === 'profileType' ? 'Profile type' : field} is required`;
      }
    });

    // Validate email format
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Validate name lengths
    if (data.fullName && data.fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters long';
    }
    if (data.companyName && data.companyName.trim().length < 2) {
      errors.companyName = 'Company name must be at least 2 characters long';
    }

    // Validate profile type
    if (data.profileType === 'Select Advertiser or Agency') {
      errors.profileType = 'Please select a profile type';
    }

    // Return validation result
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}
