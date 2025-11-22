import { Schema, model, models } from 'mongoose';

const UserProfileSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    full_name: { type: String, required: true },
    role: { type: String, enum: ['visitor', 'landlord', 'admin'], required: true },
    phone: { type: String },
    company_name: { type: String },
    password_hash: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserProfile = (models.UserProfile as any) || model('UserProfile', UserProfileSchema);