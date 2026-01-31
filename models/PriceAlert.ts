import { Schema, model, models } from 'mongoose';

const PriceAlertSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    propertyId: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
    target_price: { type: Number, required: true },
    current_price: { type: Number, required: true },
    is_active: { type: Boolean, default: true },
    notified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const PriceAlert = (models.PriceAlert as any) || model('PriceAlert', PriceAlertSchema);
