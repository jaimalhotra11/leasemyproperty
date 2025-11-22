import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Property } from '@/models/Property';
import { requireAuth } from '@/lib/auth';
import { Types } from 'mongoose';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const p = await Property.findById(params.id).lean() as any;
  if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({
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
    blurred_images: p.blurred_images || [],
    is_approved: p.is_approved,
    created_at: p.createdAt?.toISOString() || '',
    updated_at: p.updatedAt?.toISOString() || '',
  });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const { profile } = await requireAuth();
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const p = await Property.findById(params.id);
  if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const isOwner = p.landlordId.toString() === profile.id;
  const isAdmin = profile.role === 'admin';
  if (!isOwner && !isAdmin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  await Property.deleteOne({ _id: p._id });
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connectDB();
  const { profile } = await requireAuth();
  if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body = await req.json();
  if (profile.role === 'admin' && typeof body.is_approved === 'boolean') {
    await Property.updateOne({ _id: params.id }, { $set: { is_approved: body.is_approved } });
    return NextResponse.json({ ok: true });
  }
  if (profile.role === 'admin' && body.availability_status) {
    await Property.updateOne({ _id: params.id }, { $set: { availability_status: body.availability_status } });
    return NextResponse.json({ ok: true });
  }
  if (profile.role === 'admin' && (Array.isArray(body.blurred_images) || Array.isArray(body.front_images))) {
    const update: any = {};
    if (Array.isArray(body.blurred_images)) update.blurred_images = body.blurred_images;
    if (Array.isArray(body.front_images)) update.front_images = body.front_images;
    await Property.updateOne({ _id: params.id }, { $set: update });
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}