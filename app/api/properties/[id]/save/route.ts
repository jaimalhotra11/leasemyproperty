import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { UserProfile } from '@/models/UserProfile';
import { requireAuth } from '@/lib/auth';
import { Types } from 'mongoose';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { profile } = await requireAuth();
    if (!profile) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (!params.id || !Types.ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: 'Invalid property ID' }, { status: 400 });
    }

    const propertyId = new Types.ObjectId(params.id);
    const userId = new Types.ObjectId(profile.id);

    const user = await UserProfile.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const savedProperties = user.saved_properties || [];
    const isSaved = savedProperties.some((id: any) => id.toString() === params.id);

    if (isSaved) {
      // Remove from saved
      await UserProfile.updateOne(
        { _id: userId },
        { $pull: { saved_properties: propertyId } }
      );
      return NextResponse.json({ saved: false });
    } else {
      // Add to saved
      await UserProfile.updateOne(
        { _id: userId },
        { $addToSet: { saved_properties: propertyId } }
      );
      return NextResponse.json({ saved: true });
    }
  } catch (error) {
    console.error('Error toggling saved property:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
