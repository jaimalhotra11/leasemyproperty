import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Enquiry } from '@/models/Enquiry';
import { requireAuth } from '@/lib/auth';
import { Types } from 'mongoose';

export async function GET() {
  try {
    await connectDB();
    const { profile } = await requireAuth();
    if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    // Convert string ID to ObjectId for MongoDB query
    const visitorId = new Types.ObjectId(profile.id);
    const docs = await Enquiry.find({ visitorId })
      .populate({ path: 'propertyId', select: 'title city state' })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(docs.map((e: any) => ({
    id: e._id.toString(),
    property_id: e.propertyId?._id?.toString() || '',
    visitor_id: profile.id,
    company_name: e.company_name,
    contact_name: e.contact_name,
    contact_email: e.contact_email,
    contact_phone: e.contact_phone,
    message: e.message,
    status: e.status,
    admin_notes: e.admin_notes,
    created_at: e.createdAt?.toISOString() || '',
    updated_at: e.updatedAt?.toISOString() || '',
    properties: {
      title: e.propertyId?.title,
      city: e.propertyId?.city,
      state: e.propertyId?.state,
    },
  })));
  } catch (error) {
    console.error('Error fetching user enquiries:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
export const dynamic = 'force-dynamic'