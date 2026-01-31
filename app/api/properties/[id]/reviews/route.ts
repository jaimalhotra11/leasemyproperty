import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { PropertyReview } from '@/models/PropertyReview';
import { Property } from '@/models/Property';
import { requireAuth } from '@/lib/auth';
import { Types } from 'mongoose';

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    if (!params.id || !Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid property ID' }, { status: 400 });
    }

    const reviews = await PropertyReview.find({
      propertyId: new Types.ObjectId(params.id),
      is_approved: true,
    })
      .populate('userId', 'full_name email')
      .sort({ createdAt: -1 })
      .lean();

    // Calculate average rating
    const ratings = reviews.map((r: any) => r.rating);
    const averageRating = ratings.length > 0
      ? ratings.reduce((a: number, b: number) => a + b, 0) / ratings.length
      : 0;

    return NextResponse.json({
      reviews: reviews.map((r: any) => ({
        id: r._id.toString(),
        userId: r.userId._id.toString(),
        userName: r.userId.full_name || 'Anonymous',
        rating: r.rating,
        title: r.title,
        comment: r.comment,
        is_verified: r.is_verified,
        landlord_response: r.landlord_response,
        helpful_count: r.helpful_count,
        created_at: r.createdAt?.toISOString() || '',
      })),
      averageRating: Math.round(averageRating * 10) / 10,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { profile } = await requireAuth();
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!params.id || !Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid property ID' }, { status: 400 });
    }

    const body = await req.json();
    const { rating, title, comment } = body;

    if (!rating || !title || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
    }

    // Check if user already reviewed this property
    const existingReview = await PropertyReview.findOne({
      propertyId: new Types.ObjectId(params.id),
      userId: new Types.ObjectId(profile.id),
    });

    if (existingReview) {
      return NextResponse.json({ error: 'You have already reviewed this property' }, { status: 409 });
    }

    // Verify property exists
    const property = await Property.findById(params.id);
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    const review = await PropertyReview.create({
      propertyId: new Types.ObjectId(params.id),
      userId: new Types.ObjectId(profile.id),
      rating,
      title,
      comment,
      is_verified: profile.role === 'visitor', // Auto-verify visitors
      is_approved: true, // Auto-approve for now
    });

    return NextResponse.json({
      id: review._id.toString(),
      message: 'Review submitted successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
