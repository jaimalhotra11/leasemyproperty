import { Schema, model, models, Types } from 'mongoose';

const PropertyReviewSchema = new Schema(
  {
    propertyId: { type: Types.ObjectId, ref: 'Property', required: true },
    userId: { type: Types.ObjectId, ref: 'UserProfile', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, required: true },
    comment: { type: String, required: true },
    is_verified: { type: Boolean, default: false },
    landlord_response: { type: String },
    landlord_response_date: { type: Date },
    helpful_count: { type: Number, default: 0 },
    is_approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

PropertyReviewSchema.index({ propertyId: 1, userId: 1 }, { unique: true });
PropertyReviewSchema.index({ propertyId: 1, rating: 1 });

export const PropertyReview = (models.PropertyReview as any) || model('PropertyReview', PropertyReviewSchema);
