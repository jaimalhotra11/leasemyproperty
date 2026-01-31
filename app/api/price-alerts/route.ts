import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { PriceAlert } from '@/models/PriceAlert';
import { Property } from '@/models/Property';
import { requireAuth } from '@/lib/auth';
import { Types } from 'mongoose';

export async function GET(req: Request) {
  try {
    await connectDB();
    const { profile } = await requireAuth();
    if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const alerts = await PriceAlert.find({ 
      userId: new Types.ObjectId(profile.id),
      is_active: true 
    })
      .populate('propertyId', 'title city state price_monthly')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(alerts.map((a: any) => ({
      id: a._id.toString(),
      property_id: a.propertyId?._id?.toString() || '',
      property: a.propertyId ? {
        title: a.propertyId.title,
        city: a.propertyId.city,
        state: a.propertyId.state,
        price_monthly: a.propertyId.price_monthly,
      } : null,
      target_price: a.target_price,
      current_price: a.current_price,
      is_active: a.is_active,
      notified: a.notified,
      created_at: a.createdAt?.toISOString() || '',
    })));
  } catch (error) {
    console.error('Error fetching price alerts:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { profile } = await requireAuth();
    if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    if (!body.property_id || !body.target_price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const property = await Property.findById(body.property_id);
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    const existing = await PriceAlert.findOne({
      userId: new Types.ObjectId(profile.id),
      propertyId: new Types.ObjectId(body.property_id),
      is_active: true,
    });

    if (existing) {
      return NextResponse.json({ error: 'Price alert already exists for this property' }, { status: 409 });
    }

    const alert = await PriceAlert.create({
      userId: new Types.ObjectId(profile.id),
      propertyId: new Types.ObjectId(body.property_id),
      target_price: body.target_price,
      current_price: property.price_monthly,
      is_active: true,
    });

    return NextResponse.json({ id: alert._id.toString() }, { status: 201 });
  } catch (error) {
    console.error('Error creating price alert:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
