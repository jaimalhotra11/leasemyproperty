import { Schema, model, models, Types } from 'mongoose';

const PropertySchema = new Schema(
  {
    landlordId: { type: Types.ObjectId, ref: 'UserProfile', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    property_type: { type: String, enum: ['commercial', 'retail', 'office', 'warehouse', 'showroom'], required: true },
    address_line1: { type: String, required: true },
    address_line2: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postal_code: { type: String, required: true },
    country: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    size_sqft: { type: Number, required: true },
    price_monthly: { type: Number, required: true },
    availability_status: { type: String, enum: ['available', 'rented', 'pending'], default: 'available' },
    legal_requirements: { type: String },
    amenities: { type: [String], default: [] },
    front_images: { type: [String], default: [] },
    interior_images: { type: [String], default: [] },
    blurred_images: { type: [String], default: [] },
    is_approved: { type: Boolean, default: false },
    is_featured: { type: Boolean, default: false },
    is_premium: { type: Boolean, default: false },
    featured_until: { type: Date },
    views_count: { type: Number, default: 0 },
    enquiries_count: { type: Number, default: 0 },
    virtual_tour_url: { type: String },
    video_url: { type: String },
  },
  { timestamps: true }
);

export const Property = (models.Property as any) || model('Property', PropertySchema);