import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// Sub-schema for location
const LocationSchema = new Schema({
  city: {
    type: String,
    default: 'Unknown',
  },
  region: {
    type: String,
    default: 'Unknown',
  },
  country: {
    type: String,
    default: 'Unknown',
  },
  isp: {
    type: String,
    default: 'Unknown',
  },
  lat: {
    type: Number,
  },
  lon: {
    type: Number,
  },
}, { _id: false });

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
  },

  // --- NEW FIELDS (from Express logic) ---
  ipAddress: {
    type: String,
    trim: true,
  },
  location: {
    type: LocationSchema,
    default: () => ({
      city: 'Unknown',
      region: 'Unknown',
      country: 'Unknown',
      isp: 'Unknown',
    }),
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  collection: 'notificationSignups'
});

// Indexes for efficient filtering
NotificationSignupSchema.index({ status: 1 });
NotificationSignupSchema.index({ isDeleted: 1 });
NotificationSignupSchema.index({ 'location.country': 1 });
NotificationSignupSchema.index({ 'location.city': 1 });
NotificationSignupSchema.index({ ipAddress: 1 });

export const NotificationSignup = mongoose.models.NotificationSignup || 
  mongoose.model('NotificationSignup', NotificationSignupSchema);