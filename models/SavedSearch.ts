import { Schema, model, models } from 'mongoose';

const SavedSearchSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    name: { type: String, required: true },
    filters: {
      city: String,
      state: String,
      property_type: String,
      minPrice: Number,
      maxPrice: Number,
      minSize: Number,
      maxSize: Number,
    },
    email_alerts: { type: Boolean, default: true },
    sms_alerts: { type: Boolean, default: false },
    last_notified_at: { type: Date },
  },
  { timestamps: true }
);

export const SavedSearch = (models.SavedSearch as any) || model('SavedSearch', SavedSearchSchema);
