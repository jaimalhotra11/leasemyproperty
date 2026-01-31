import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { UserProfile } from '@/models/UserProfile';
import { Property } from '@/models/Property';
import { requireAuth } from '@/lib/auth';
import { Types } from 'mongoose';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { profile } = await requireAuth();
    if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await UserProfile.findById(profile.id).populate('saved_properties').lean();
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const savedIds = (user.saved_properties || []).map((id: any) => 
      typeof id === 'object' ? id._id : id
    );

    const properties = await Property.find({ _id: { $in: savedIds } }).lean();

    return NextResponse.json(properties.map((p: any) => ({
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
      is_featured: p.is_featured,
      is_premium: p.is_premium,
      created_at: p.createdAt?.toISOString() || '',
      updated_at: p.updatedAt?.toISOString() || '',
    })));
  } catch (error) {
    console.error('Error fetching saved properties:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
