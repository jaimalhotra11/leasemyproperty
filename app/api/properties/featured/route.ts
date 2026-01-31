import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Property } from '@/models/Property';
import { Types } from 'mongoose';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '6');
    const city = searchParams.get('city');

    const filter: any = {
      is_approved: true,
      availability_status: 'available',
      $or: [
        { is_featured: true },
        { is_premium: true }
      ]
    };

    // If featured_until exists, check if it's still valid
    filter.$or.push({
      featured_until: { $gte: new Date() }
    });

    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }

    const docs = await Property.find(filter)
      .sort({ 
        is_premium: -1, 
        is_featured: -1, 
        views_count: -1,
        createdAt: -1 
      })
      .limit(limit)
      .lean() as any[];

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
      blurred_images: p.blurred_images || [],
      is_approved: p.is_approved,
      is_featured: p.is_featured,
      is_premium: p.is_premium,
      views_count: p.views_count || 0,
      enquiries_count: p.enquiries_count || 0,
      virtual_tour_url: p.virtual_tour_url,
      video_url: p.video_url,
      created_at: p.createdAt?.toISOString() || '',
      updated_at: p.updatedAt?.toISOString() || '',
    })));
  } catch (error) {
    console.error('Error fetching featured properties:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
