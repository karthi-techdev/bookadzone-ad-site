// models/NotificationSignup.ts
import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  city: { type: String, default: 'Unknown' },
  region: { type: String, default: 'Unknown' },
  country: { type: String, default: 'Unknown' },
  isp: { type: String },
  lat: { type: Number },
  lon: { type: Number },
}, { _id: false });

const NotificationSignupSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, minlength: 2 },
  profileType: { 
    type: String, 
    required: true,
    enum: ['Advertiser', 'Agency', 'Select Advertiser or Agency']
  },
  companyName: { type: String, required: true, trim: true, minlength: 2 },
  position: { type: String, required: true, trim: true, minlength: 2 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  ipAddress: { type: String },
  location: { type: LocationSchema },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  isDeleted: { type: Boolean, default: false },
  signupDate: { type: Date, default: Date.now },
}, { timestamps: true });

export const NotificationSignup = mongoose.models.NotificationSignup ||
  mongoose.model('NotificationSignup', NotificationSignupSchema);