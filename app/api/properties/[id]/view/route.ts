import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Property } from '@/models/Property';
import { Types } from 'mongoose';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    
    if (!params.id || !Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid property ID' }, { status: 400 });
    }

    await Property.updateOne(
      { _id: params.id },
      { $inc: { views_count: 1 } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
