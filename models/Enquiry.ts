import { Schema, model, models, Types } from 'mongoose';

const EnquirySchema = new Schema(
  {
    propertyId: { type: Types.ObjectId, ref: 'Property', required: true },
    visitorId: { type: Types.ObjectId, ref: 'UserProfile', required: true },
    company_name: { type: String, required: true },
    contact_name: { type: String, required: true },
    contact_email: { type: String, required: true },
    contact_phone: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'reviewing', 'forwarded', 'closed'], default: 'pending' },
    admin_notes: { type: String },
  },
  { timestamps: true }
);

EnquirySchema.index({ propertyId: 1, visitorId: 1 }, { unique: true });

export const Enquiry = (models.Enquiry as any) || model('Enquiry', EnquirySchema);