import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Enquiry } from '@/models/Enquiry';
import { requireAuth } from '@/lib/auth';
import { Types } from 'mongoose';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { profile } = await requireAuth();
    if (!profile || profile.role !== 'admin') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const filter: any = {};
    if (status) filter.status = status;
    const docs = await Enquiry.find(filter).populate({ path: 'propertyId', select: 'title' }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(docs.map((e: any) => ({
    id: e._id.toString(),
    property_id: e.propertyId?._id?.toString() || '',
    visitor_id: e.visitorId.toString(),
    company_name: e.company_name,
    contact_name: e.contact_name,
    contact_email: e.contact_email,
    contact_phone: e.contact_phone,
    message: e.message,
    status: e.status,
    admin_notes: e.admin_notes,
    created_at: e.createdAt?.toISOString() || '',
    updated_at: e.updatedAt?.toISOString() || '',
    properties: { title: e.propertyId?.title },
  })));
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { profile } = await requireAuth();
    if (!profile || profile.role !== 'visitor') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await req.json();
    
    // Validate required fields
    if (!body.property_id || !body.company_name || !body.contact_name || !body.contact_email || !body.contact_phone || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Validate property ID
    if (!Types.ObjectId.isValid(body.property_id)) {
      return NextResponse.json({ error: 'Invalid property ID' }, { status: 400 });
    }

    // Convert string IDs to ObjectId for MongoDB
    const propertyId = new Types.ObjectId(body.property_id);
    const visitorId = new Types.ObjectId(profile.id);

    const exists = await Enquiry.findOne({ propertyId, visitorId }).lean();
    if (exists) {
      return NextResponse.json({ error: 'You have already submitted an enquiry for this property' }, { status: 409 });
    }
    const doc = await Enquiry.create({
    propertyId,
    visitorId,
    company_name: body.company_name,
    contact_name: body.contact_name,
    contact_email: body.contact_email,
    contact_phone: body.contact_phone,
    message: body.message,
    status: 'pending',
  });
    return NextResponse.json({ id: doc._id.toString() }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating enquiry:', error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: 'Validation error: ' + Object.values(error.errors).map((e: any) => e.message).join(', ') }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}