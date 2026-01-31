import { Schema, model, models, Types } from 'mongoose';

const ReferralSchema = new Schema(
  {
    referrerId: { type: Types.ObjectId, ref: 'UserProfile', required: true },
    referredUserId: { type: Types.ObjectId, ref: 'UserProfile', required: true },
    referral_code: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'rewarded'], default: 'pending' },
    reward_type: { type: String, enum: ['credit', 'discount', 'cash'], default: 'credit' },
    reward_amount: { type: Number, default: 0 },
    reward_given: { type: Boolean, default: false },
    reward_date: { type: Date },
  },
  { timestamps: true }
);

ReferralSchema.index({ referrerId: 1, referredUserId: 1 }, { unique: true });
ReferralSchema.index({ referral_code: 1 });

export const Referral = (models.Referral as any) || model('Referral', ReferralSchema);
