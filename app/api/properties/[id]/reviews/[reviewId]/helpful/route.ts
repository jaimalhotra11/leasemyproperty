import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { PropertyReview } from '@/models/PropertyReview';
import { Types } from 'mongoose';

export async function POST(
  _: Request,
  { params }: { params: { id: string; reviewId: string } }
) {
  try {
    await connectDB();
    if (!params.reviewId || !Types.ObjectId.isValid(params.reviewId)) {
      return NextResponse.json({ error: 'Invalid review ID' }, { status: 400 });
    }

    await PropertyReview.findByIdAndUpdate(
      params.reviewId,
      { $inc: { helpful_count: 1 } }
    );

    return NextResponse.json({ message: 'Marked as helpful' });
  } catch (error) {
    console.error('Error marking helpful:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
