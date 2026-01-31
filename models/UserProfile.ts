import { Schema, model, models } from 'mongoose';

const UserProfileSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    role: { type: String, enum: ['visitor', 'landlord', 'admin'], required: true },
    phone: { type: String },
    company_name: { type: String },
    password_hash: { type: String, required: true },
    subscription_plan: { type: String, enum: ['free', 'basic', 'premium', 'enterprise'], default: 'free' },
    subscription_expires_at: { type: Date },
    referral_code: { type: String, unique: true, sparse: true },
    referred_by: { type: String },
    credits: { type: Number, default: 0 },
    saved_searches: { type: [Object], default: [] },
    saved_properties: { type: [Schema.Types.ObjectId], ref: 'Property', default: [] },
  },
  { timestamps: true }
);

export const UserProfile = (models.UserProfile as any) || model('UserProfile', UserProfileSchema);