import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Property } from '@/models/Property';
import { Types } from 'mongoose';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
  const city = searchParams.get('city') || '';
  const type = searchParams.get('type') || '';
  const minSize = parseInt(searchParams.get('minSize') || '0');
  const maxSize = parseInt(searchParams.get('maxSize') || '0');
  const minPrice = parseInt(searchParams.get('minPrice') || '0');
  const maxPrice = parseInt(searchParams.get('maxPrice') || '0');
  const q = searchParams.get('q') || '';
  const isApprovedParam = searchParams.get('is_approved');
  const landlordId = searchParams.get('landlordId');
  const availability = searchParams.get('availability_status');

  const filter: any = {};
  if (isApprovedParam !== null) filter.is_approved = isApprovedParam === 'true';
  if (availability) filter.availability_status = availability;
  if (landlordId && Types.ObjectId.isValid(landlordId)) {
    filter.landlordId = new Types.ObjectId(landlordId);
  }
  if (city) filter.city = { $regex: city, $options: 'i' };
  if (type) filter.property_type = type;
  if (minSize > 0 || maxSize > 0) {
    filter.size_sqft = {};
    if (minSize > 0) filter.size_sqft.$gte = minSize;
    if (maxSize > 0) filter.size_sqft.$lte = maxSize;
  }
  if (minPrice > 0 || maxPrice > 0) {
    filter.price_monthly = {};
    if (minPrice > 0) filter.price_monthly.$gte = minPrice;
    if (maxPrice > 0) filter.price_monthly.$lte = maxPrice;
  }
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { description: { $regex: q, $options: 'i' } },
      { city: { $regex: q, $options: 'i' } },
    ];
  }

  const docs = (await Property.find(filter).sort({ createdAt: -1 }).lean()) as any[];
  return NextResponse.json(docs.map((p: any) => ({
    id: p._id.toString(),
    landlord_id: p.landlordId.toString(),
    title: p.title,
    description: p.description,
    property_type: p.property_type,
    address_line1: p.address_line1,
    address_line2: p.address_line2,
    city: p.city,
    state: p.state,
    postal_code: p.postal_code,
    country: p.country,
    size_sqft: p.size_sqft,
    price_monthly: p.price_monthly,
    availability_status: p.availability_status,
    legal_requirements: p.legal_requirements,
    amenities: p.amenities,
    front_images: p.front_images,
    interior_images: p.interior_images,
    blurred_images: p.blurred_images || [],
    is_approved: p.is_approved,
    created_at: p.createdAt?.toISOString() || '',
    updated_at: p.updatedAt?.toISOString() || '',
  })));
  } catch (error) {
    console.error('Error searching properties:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic'