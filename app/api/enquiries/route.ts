import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Enquiry } from '@/models/Enquiry';
import { requireAuth } from '@/lib/auth';

export async function GET(req: Request) {
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
}

export async function POST(req: Request) {
  await connectDB();
  const { profile } = await requireAuth();
  if (!profile || profile.role !== 'visitor') return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  const exists = await Enquiry.findOne({ propertyId: body.property_id, visitorId: profile.id }).lean();
  if (exists) {
    return NextResponse.json({ error: 'You have already submitted an enquiry for this property' }, { status: 409 });
  }
  const doc = await Enquiry.create({
    propertyId: body.property_id,
    visitorId: profile.id,
    company_name: body.company_name,
    contact_name: body.contact_name,
    contact_email: body.contact_email,
    contact_phone: body.contact_phone,
    message: body.message,
    status: 'pending',
  });
  return NextResponse.json({ id: doc._id.toString() }, { status: 201 });
}