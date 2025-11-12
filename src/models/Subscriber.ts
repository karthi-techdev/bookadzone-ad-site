import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const SubscriberSchema = new Schema({
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    index: true
  },
  fullName: { 
    type: String, 
    trim: true,
    minlength: [2, 'Full name must be at least 2 characters long']
  },
  profileType: { 
    type: String, 
    enum: {
      values: ['Advertiser', 'Agency'],
      message: 'Invalid profile type selected'
    }
  },
  companyName: { 
    type: String, 
    trim: true
  },
  position: { 
    type: String, 
    trim: true
  },
  subscriptionType: {
    type: String,
    enum: ['newsletter', 'notification'],
    required: true,
    default: 'newsletter'
  },
  signupDate: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

export const Subscriber = mongoose.models.Subscriber || 
  mongoose.model('Subscriber', SubscriberSchema);