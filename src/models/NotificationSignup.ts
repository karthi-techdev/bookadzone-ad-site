import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const NotificationSignupSchema = new Schema({
  fullName: { 
    type: String, 
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Full name must be at least 2 characters long']
  },
  profileType: { 
    type: String, 
    required: [true, 'Profile type is required'],
    enum: {
      values: ['Select Advertiser or Agency', 'Advertiser', 'Agency'],
      message: 'Invalid profile type selected'
    }
  },
  companyName: { 
    type: String, 
    required: [true, 'Company name is required'],
    trim: true,
    minlength: [2, 'Company name must be at least 2 characters long']
  },
  position: { 
    type: String, 
    required: [true, 'Position is required'],
    trim: true,
    minlength: [2, 'Position must be at least 2 characters long']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    index: true
  },
  signupDate: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true,
  collection: 'notificationSignups'
});

export const NotificationSignup = mongoose.models.NotificationSignup || 
  mongoose.model('NotificationSignup', NotificationSignupSchema);