import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { UserProfile } from '@/models/UserProfile';
import { requireAuth } from '@/lib/auth';
import { Types } from 'mongoose';
import crypto from 'crypto';

export async function POST(_: Request) {
  try {
    await connectDB();
    const { profile } = await requireAuth();
    if (!profile) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await UserProfile.findById(profile.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Generate unique referral code if doesn't exist
    if (!user.referral_code) {
      const code = `${user.full_name.substring(0, 3).toUpperCase()}${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
      user.referral_code = code;
      await user.save();
    }

    return NextResponse.json({
      referral_code: user.referral_code,
      referral_link: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/auth/register?ref=${user.referral_code}`,
    });
  } catch (error) {
    console.error('Error generating referral code:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
