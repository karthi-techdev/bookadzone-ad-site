import { NextResponse } from 'next/server';

interface FormData {
  fullName: string;
  profileType: string;
  companyName: string;
  position: string;
  email: string;
}

function validateFormData(data: FormData) {
  const errors: Record<string, string> = {};

  // Validate Full Name
  if (!data.fullName || data.fullName.trim() === '') {
    errors.fullName = 'Full name must be at least 2 characters long';
  } else if (data.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters long';
  }

  // Validate Profile Type
  if (!data.profileType || data.profileType === 'Select Advertiser or Agency') {
    errors.profileType = 'Please select your profile type';
  }

  // Validate Company Name
  if (!data.companyName || data.companyName.trim() === '') {
    errors.companyName = 'Company name must be at least 2 characters long';
  } else if (data.companyName.trim().length < 2) {
    errors.companyName = 'Company name must be at least 2 characters long';
  }

  // Validate Position
  if (!data.position || data.position.trim() === '') {
    errors.position = 'Please enter your position';
  }

  // Validate Email
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Please enter your email';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  return errors;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationErrors = validateFormData(body);

    // If there are validation errors
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json(
        { success: false, errors: validationErrors },
        { status: 400 }
      );
    }

    // If validation passes
    return NextResponse.json({
      success: true,
      data: body
    });

  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
