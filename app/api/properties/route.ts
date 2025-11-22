import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Property } from '@/models/Property';
import { requireAuth } from '@/lib/auth';
import { Types } from 'mongoose';

export async function GET(req: Request) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') || '0');
  const landlordId = searchParams.get('landlordId');
  const isApprovedParam = searchParams.get('is_approved');
  const availability = searchParams.get('availability_status');

  const filter: any = {};
  if (landlordId) filter.landlordId = new Types.ObjectId(landlordId);
  if (isApprovedParam !== null) filter.is_approved = isApprovedParam === 'true';
  if (availability) filter.availability_status = availability;

  const query = Property.find(filter).sort({ createdAt: -1 }).lean();
  const docs = (limit > 0 ? await query.limit(limit) : await query) as any[];
  return NextResponse.json(docs.map((p: any) => ({
    id: p._id.toString(),
    landlord_id: (p.landlordId as Types.ObjectId).toString(),
    title: p.title,
    description: p.description,
    property_type: p.property_type,
    address_line1: p.address_line1,
    address_line2: p.address_line2,
    city: p.city,
    state: p.state,
    postal_code: p.postal_code,
    country: p.country,
    latitude: p.latitude,
    longitude: p.longitude,
    size_sqft: p.size_sqft,
    price_monthly: p.price_monthly,
    availability_status: p.availability_status,
    legal_requirements: p.legal_requirements,
    amenities: p.amenities,
    front_images: p.front_images,
    interior_images: p.interior_images,
    is_approved: p.is_approved,
    created_at: p.createdAt?.toISOString() || '',
    updated_at: p.updatedAt?.toISOString() || '',
  })));
}

export async function POST(req: Request) {
  await connectDB();
  const { profile } = await requireAuth();
  if (!profile || profile.role !== 'landlord') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const doc = await Property.create({
    landlordId: new Types.ObjectId(profile.id),
    title: body.title,
    description: body.description,
    property_type: body.property_type,
    address_line1: body.address_line1,
    address_line2: body.address_line2 || undefined,
    city: body.city,
    state: body.state,
    postal_code: body.postal_code,
    country: body.country,
    size_sqft: body.size_sqft,
    price_monthly: body.price_monthly,
    legal_requirements: body.legal_requirements || undefined,
    amenities: body.amenities || [],
    front_images: body.front_images || [],
    interior_images: body.interior_images || [],
    availability_status: 'available',
    is_approved: false,
  });
  return NextResponse.json({ id: doc._id.toString() }, { status: 201 });
}